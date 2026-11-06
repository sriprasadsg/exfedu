import { webcrypto } from "node:crypto";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import worker, { handleRequest, type Env } from "../../infrastructure/enquiry-worker/worker";
import { buildOwnerEmail, enquiryRequestSchema } from "../../infrastructure/enquiry-worker/schema";

const origin = "https://exfedu.exafluence.workers.dev";
const env: Env = { ALLOWED_ORIGINS: origin, EMAIL_FROM: "forms@example.org", RESEND_API_KEY: "test-only-not-a-credential" };
export const formFixtures = [
  { kind: "partner", name: "Test Person", organisation: "Test Institution", email: "test@example.org", phone: "+91 9876543210", location: "Chittoor", type: "Academic Collaboration", message: "Test enquiry", consent: "on" },
  { kind: "student-programme", programme: "masters-data-science", programmeTitle: "M.S. Data Science", name: "Test Person", institution: "Test Institution", email: "test@example.org", phone: "+91 9876543210", location: "Chittoor", status: "Student", message: "Test enquiry", consent: "on" },
  { kind: "ibm-institutional", organisation: "Test Institution", contactPerson: "Test Person", email: "test@example.org", phone: "+91 9876543210", location: "Chittoor", programmeInterest: "Value-Added Courses", audience: "Undergraduate students", participants: "40", schedule: "", consent: "on" },
  { kind: "brochure", name: "Test Person", institution: "Test Institution", email: "test@example.org", phone: "+91 9876543210", designation: "Dean", location: "Chittoor", notes: "", programme: "M.S. Data Science" },
];
const envelope = (data: unknown) => ({ to: "contact@exafluence.com", sourcePage: "/contact", data });
const request = (data: unknown, from = origin) => new Request("https://worker.example.org/api/enquiries", { method: "POST", headers: { Origin: from, "Content-Type": "application/json" }, body: JSON.stringify(envelope(data)) });
const accepted = () => vi.fn<typeof fetch>().mockResolvedValue(new Response(JSON.stringify({ id: "provider-receipt" })));
beforeEach(() => vi.stubGlobal("crypto", webcrypto));
afterEach(() => vi.unstubAllGlobals());

describe("Cloudflare enquiry API", () => {
  it.each(formFixtures)("routes $kind to contact@exafluence.com only after provider acceptance", async data => {
    const send = accepted();
    const response = await handleRequest(request(data), env, send);
    expect(response.status).toBe(200);
    expect(await response.json()).toEqual({ success: true, id: "provider-receipt" });
    const [url, options] = send.mock.calls[0];
    expect(url).toBe("https://api.resend.com/emails");
    const body = JSON.parse(String(options?.body));
    expect(body.to).toEqual(["contact@exafluence.com"]);
    expect(body.from).toBe("forms@example.org");
    expect(body.text).toContain(data.kind === "ibm-institutional" ? "contactPerson: Test Person" : "name: Test Person");
    expect(body.reply_to).toBe("test@example.org");
  });
  it("never trusts a browser-selected recipient", async () => {
    const send = accepted();
    const req = new Request("https://worker.example.org/api/enquiries", { method: "POST", headers: { Origin: origin, "Content-Type": "application/json" }, body: JSON.stringify({ ...envelope(formFixtures[0]), to: "attacker@example.org" }) });
    expect((await handleRequest(req, env, send)).status).toBe(400);
    expect(send).not.toHaveBeenCalled();
    const parsed = enquiryRequestSchema.parse(envelope(formFixtures[0]));
    expect(buildOwnerEmail(parsed, env.EMAIL_FROM).to).toEqual(["contact@exafluence.com"]);
  });
  it("rejects missing required permission", async () => {
    const send = accepted();
    expect((await handleRequest(request({ ...formFixtures[0], consent: "" }), env, send)).status).toBe(400);
    expect(send).not.toHaveBeenCalled();
  });
  it("rejects invalid form fields without sending", async () => {
    const send = accepted();
    expect((await handleRequest(request({ ...formFixtures[1], email: "not-an-email" }), env, send)).status).toBe(400);
    expect((await handleRequest(request({ ...formFixtures[2], participants: "0" }), env, send)).status).toBe(400);
    expect(send).not.toHaveBeenCalled();
  });
  it("fails closed without email credentials", async () => {
    const send = accepted();
    expect((await handleRequest(request(formFixtures[0]), { ...env, RESEND_API_KEY: "" }, send)).status).toBe(503);
    expect(send).not.toHaveBeenCalled();
  });
  it("restricts origins and permits preflight only for the deployed website", async () => {
    const send = accepted();
    expect((await handleRequest(request(formFixtures[0], "https://other.example.org"), env, send)).status).toBe(403);
    const preflight = await handleRequest(new Request("https://worker.example.org/api/enquiries", { method: "OPTIONS", headers: { Origin: origin } }), env, send);
    expect(preflight.status).toBe(204);
    expect(preflight.headers.get("Access-Control-Allow-Origin")).toBe(origin);
    expect(send).not.toHaveBeenCalled();
  });
  it("rejects oversized input before provider access", async () => {
    const send = accepted();
    expect((await handleRequest(request({ ...formFixtures[0], message: "x".repeat(17000) }), env, send)).status).toBe(413);
    expect(send).not.toHaveBeenCalled();
  });
  it.each([401, 429, 500])("reports provider %s without false success or secrets", async status => {
    const send = vi.fn<typeof fetch>().mockResolvedValue(new Response("private-provider-error", { status }));
    const response = await handleRequest(request(formFixtures[0]), env, send);
    expect(response.status).toBe(502);
    const body = await response.text();
    expect(body).toContain(String(status));
    expect(body).not.toContain(env.RESEND_API_KEY);
    expect(body).not.toContain("private-provider-error");
  });
  it("rejects provider success without a receipt", async () => {
    const send = vi.fn<typeof fetch>().mockResolvedValue(new Response("{}"));
    expect((await handleRequest(request(formFixtures[0]), env, send)).status).toBe(502);
  });
  it("uses the same provider idempotency key for unchanged retries", async () => {
    const send = accepted();
    await handleRequest(request(formFixtures[0]), env, send);
    await handleRequest(request(formFixtures[0]), env, send);
    const header = (n: number) => new Headers(send.mock.calls[n][1]?.headers).get("Idempotency-Key");
    expect(header(0)).toMatch(/^exfedu-[0-9a-f]{64}$/);
    expect(header(1)).toBe(header(0));
  });
  it("Worker entry point accepts the Cloudflare execution context argument", async () => {
    // The entry point must not treat Cloudflare's third argument as a fetch function.
    const response = await worker.fetch(new Request("https://worker.example.org/health"), env);
    expect(response.status).toBe(200);
  });
});