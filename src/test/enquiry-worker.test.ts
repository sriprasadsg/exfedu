import { webcrypto } from "node:crypto";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import worker, { handleRequest, type Env } from "../../infrastructure/enquiry-worker/worker";
import { buildOwnerEmail, enquiryRequestSchema } from "../../infrastructure/enquiry-worker/schema";

const origin = "https://exfedu.exafluence.workers.dev";
const env: Env = { ALLOWED_ORIGINS: origin, EMAIL_FROM: "contact@exafluence.com", M365_TENANT_ID: "11111111-1111-4111-8111-111111111111", M365_CLIENT_ID: "22222222-2222-4222-8222-222222222222", M365_CLIENT_SECRET: "test-only-not-a-credential" };
export const formFixtures = [
  { kind: "partner", name: "Test Person", organisation: "Test Institution", email: "test@example.org", phone: "+91 9876543210", location: "Chittoor", type: "Academic Collaboration", message: "Test enquiry", consent: "on" },
  { kind: "student-programme", programme: "masters-data-science", programmeTitle: "M.S. Data Science", name: "Test Person", institution: "Test Institution", email: "test@example.org", phone: "+91 9876543210", location: "Chittoor", status: "Student", message: "Test enquiry", consent: "on" },
  { kind: "ibm-institutional", organisation: "Test Institution", contactPerson: "Test Person", email: "test@example.org", phone: "+91 9876543210", location: "Chittoor", programmeInterest: "Value-Added Courses", audience: "Undergraduate students", participants: "40", schedule: "", consent: "on" },
  { kind: "brochure", name: "Test Person", institution: "Test Institution", email: "test@example.org", phone: "+91 9876543210", designation: "Dean", location: "Chittoor", notes: "", programme: "M.S. Data Science" },
];
const envelope = (data: unknown) => ({ to: "contact@exafluence.com", sourcePage: "/contact", data });
const request = (data: unknown, from = origin) => new Request("https://worker.example.org/api/enquiries", { method: "POST", headers: { Origin: from, "Content-Type": "application/json" }, body: JSON.stringify(envelope(data)) });
const receiptId = "33333333-3333-4333-8333-333333333333";
const tokenResponse = () => new Response(JSON.stringify({ access_token: "test-access-token", token_type: "Bearer" }));
const accepted = () => vi.fn<typeof fetch>().mockImplementation(async url => String(url).includes("login.microsoftonline.com")
  ? tokenResponse() : new Response(null, { status: 202, headers: { "request-id": receiptId } }));
beforeEach(() => vi.stubGlobal("crypto", webcrypto));
afterEach(() => vi.unstubAllGlobals());

describe("Cloudflare enquiry API", () => {
  it.each(formFixtures)("routes $kind to contact@exafluence.com only after provider acceptance", async data => {
    const send = accepted();
    const response = await handleRequest(request(data), env, send);
    expect(response.status).toBe(200);
    const receipt = await response.json();
    expect(receipt).toMatchObject({ success: true, providerRequestId: receiptId });
    expect(receipt.id).toMatch(/^[0-9a-f-]{36}$/);
    expect(receipt.id).not.toBe(receiptId);
    const [url, options] = send.mock.calls[1];
    expect(url).toBe("https://graph.microsoft.com/v1.0/users/contact%40exafluence.com/sendMail");
    const body = JSON.parse(String(options?.body));
    expect(body.message.toRecipients).toEqual([{ emailAddress: { address: "contact@exafluence.com" } }]);
    expect(body.message.body.contentType).toBe("Text");
    expect(body.message.body.content).toContain(data.kind === "ibm-institutional" ? "contactPerson: Test Person" : "name: Test Person");
    expect(body.message.replyTo).toEqual([{ emailAddress: { address: "test@example.org" } }]);
    expect(body.saveToSentItems).toBe(true);
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
    const response = await handleRequest(request(formFixtures[0]), { ...env, M365_CLIENT_SECRET: "" }, send);
    expect(response.status).toBe(503);
    expect(response.headers.get("Access-Control-Allow-Origin")).toBe(origin);
    expect(send).not.toHaveBeenCalled();
  });
  it("restricts origins and permits preflight only for the deployed website", async () => {
    const send = accepted();
    expect((await handleRequest(request(formFixtures[0], "https://other.example.org"), env, send)).status).toBe(403);
    const preflight = await handleRequest(new Request("https://worker.example.org/api/enquiries", { method: "OPTIONS", headers: { Origin: origin } }), env, send);
    expect(preflight.status).toBe(204);
    expect(preflight.headers.get("Access-Control-Allow-Origin")).toBe(origin);
    expect(preflight.headers.get("Access-Control-Allow-Methods")).toBe("POST, OPTIONS");
    expect(preflight.headers.get("Access-Control-Allow-Headers")).toBe("Content-Type, Accept");
    expect(preflight.headers.get("Vary")).toBe("Origin");
    expect(send).not.toHaveBeenCalled();
  });
  it("allows the canonical production website even when the dashboard allowlist is stale", async () => {
    const send = accepted();
    const staleEnv = { ...env, ALLOWED_ORIGINS: "https://old-preview.example.org" };
    const preflight = await handleRequest(new Request("https://worker.example.org/api/enquiries", {
      method: "OPTIONS",
      headers: {
        Origin: origin,
        "Access-Control-Request-Method": "POST",
        "Access-Control-Request-Headers": "content-type",
      },
    }), staleEnv, send);
    expect(preflight.status).toBe(204);
    expect(preflight.headers.get("Access-Control-Allow-Origin")).toBe(origin);
    expect(preflight.headers.get("Access-Control-Allow-Methods")).toBe("POST, OPTIONS");
    expect(preflight.headers.get("Access-Control-Allow-Headers")).toBe("Content-Type, Accept");
    expect(send).not.toHaveBeenCalled();
  });
  it("rejects oversized input before provider access", async () => {
    const send = accepted();
    expect((await handleRequest(request({ ...formFixtures[0], message: "x".repeat(17000) }), env, send)).status).toBe(413);
    expect(send).not.toHaveBeenCalled();
  });
  it.each([401, 429, 500])("reports provider %s without false success or secrets", async status => {
    const send = vi.fn<typeof fetch>().mockResolvedValueOnce(tokenResponse()).mockResolvedValueOnce(new Response("private-provider-error", { status }));
    const response = await handleRequest(request(formFixtures[0]), env, send);
    expect(response.status).toBe(502);
    const body = await response.text();
    expect(body).toContain(String(status));
    expect(body).toContain("acceptance_unconfirmed");
    expect(response.headers.get("Access-Control-Allow-Origin")).toBe(origin);
    expect(body).not.toContain(env.M365_CLIENT_SECRET);
    expect(body).not.toContain("test-access-token");
    expect(body).not.toContain("private-provider-error");
  });
  it("accepts Graph 202 even when the diagnostic request-id header is absent", async () => {
    const send = vi.fn<typeof fetch>().mockResolvedValueOnce(tokenResponse()).mockResolvedValueOnce(new Response(null, { status: 202 }));
    const response = await handleRequest(request(formFixtures[0]), env, send);
    expect(response.status).toBe(200);
    const receipt = await response.json();
    expect(receipt.success).toBe(true);
    expect(receipt.id).toMatch(/^[0-9a-f-]{36}$/);
    expect(receipt).not.toHaveProperty("providerRequestId");
  });
  it("accepts Graph 202 with a non-UUID diagnostic request-id and passes it through", async () => {
    const send = vi.fn<typeof fetch>().mockResolvedValueOnce(tokenResponse()).mockResolvedValueOnce(new Response(null, { status: 202, headers: { "request-id": "req-abc_123" } }));
    const response = await handleRequest(request(formFixtures[0]), env, send);
    expect(response.status).toBe(200);
    expect(await response.json()).toMatchObject({ success: true, providerRequestId: "req-abc_123" });
  });
  it("rejects a sender outside exafluence.com", async () => {
    const send = accepted();
    expect((await handleRequest(request(formFixtures[0]), { ...env, EMAIL_FROM: "forms@example.org" }, send)).status).toBe(503);
    expect(send).not.toHaveBeenCalled();
  });
  it("uses tenant-specific app credentials and the Graph scope", async () => {
    const send = accepted();
    await handleRequest(request(formFixtures[0]), env, send);
    expect(send.mock.calls[0][0]).toBe(`https://login.microsoftonline.com/${env.M365_TENANT_ID}/oauth2/v2.0/token`);
    const params = new URLSearchParams(String(send.mock.calls[0][1]?.body));
    expect(params.get("scope")).toBe("https://graph.microsoft.com/.default");
    expect(params.get("grant_type")).toBe("client_credentials");
    expect(params.get("client_id")).toBe(env.M365_CLIENT_ID);
  });
  it("does not call sendMail when token acquisition fails", async () => {
    const send = vi.fn<typeof fetch>().mockResolvedValue(new Response("private-token-error", { status: 401 }));
    const response = await handleRequest(request(formFixtures[0]), env, send);
    expect(response.status).toBe(502);
    expect(send).toHaveBeenCalledTimes(1);
    expect(await response.text()).not.toContain("private-token-error");
  });
  it("does not retry a send whose outcome is ambiguous", async () => {
    const send = vi.fn<typeof fetch>().mockResolvedValueOnce(tokenResponse()).mockRejectedValueOnce(new Error("timeout"));
    expect((await handleRequest(request(formFixtures[0]), env, send)).status).toBe(502);
    expect(send).toHaveBeenCalledTimes(2);
  });
  it.each([200, 201, 204])("never treats HTTP %s as sendMail acceptance", async status => {
    const send = vi.fn<typeof fetch>().mockResolvedValueOnce(tokenResponse()).mockResolvedValueOnce(new Response(null, { status, headers: { "request-id": receiptId } }));
    expect((await handleRequest(request(formFixtures[0]), env, send)).status).toBe(502);
  });
  it("Worker entry point accepts the Cloudflare execution context argument", async () => {
    // The entry point must not treat Cloudflare's third argument as a fetch function.
    const response = await worker.fetch(new Request("https://worker.example.org/health"), env);
    expect(response.status).toBe(200);
  });
});