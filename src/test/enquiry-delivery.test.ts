import { afterEach, describe, expect, it, vi } from "vitest";
import { buildEnquiryPayload, DEFAULT_ENQUIRY_ENDPOINT, ENQUIRY_ACCEPTED_MESSAGE, enquiryConfig, enquiryErrorMessage, submitEnquiry } from "@/lib/enquiryDelivery";

const receiptId = "33333333-3333-4333-8333-333333333333";

afterEach(() => { enquiryConfig.endpoint = DEFAULT_ENQUIRY_ENDPOINT; vi.unstubAllGlobals(); });
describe("production enquiry delivery", () => {
  it("uses the live enquiry service when no build override is supplied", () => {
    expect(enquiryConfig.endpoint).toBe("https://exfedu-enquiries.exafluence.workers.dev/api/enquiries");
  });
  it("routes enquiries to contact@exafluence.com", () => {
    expect(buildEnquiryPayload({ kind: "partner" }, "/contact").to).toBe("contact@exafluence.com");
  });
  it("never simulates success without an endpoint", async () => {
    enquiryConfig.endpoint = "";
    const fetcher = vi.fn(); vi.stubGlobal("fetch", fetcher);
    await expect(submitEnquiry({})).rejects.toThrow("not configured");
    expect(fetcher).not.toHaveBeenCalled();
  });
  it("supports a same-origin API path once infrastructure supplies it", async () => {
    enquiryConfig.endpoint = "/api/enquiries";
    const fetcher = vi.fn().mockResolvedValue(new Response(JSON.stringify({ success: true, id: receiptId })));
    vi.stubGlobal("fetch", fetcher);
    await submitEnquiry({ kind: "partner" });
    expect(fetcher.mock.calls[0][0]).toBe(new URL("/api/enquiries", window.location.origin).toString());
  });
  it("does not send visitor data to an insecure remote endpoint", async () => {
    enquiryConfig.endpoint = "http://remote.example.org/api/enquiries";
    const fetcher = vi.fn(); vi.stubGlobal("fetch", fetcher);
    await expect(submitEnquiry({})).rejects.toThrow("secure API URL");
    expect(fetcher).not.toHaveBeenCalled();
  });
  it("posts the real payload and accepts a provider correlation receipt", async () => {
    enquiryConfig.endpoint = "https://enquiry.example.test/submit";
    const fetcher = vi.fn().mockResolvedValue(new Response(JSON.stringify({ success: true, id: receiptId })));
    vi.stubGlobal("fetch", fetcher);
    await submitEnquiry({ kind: "brochure", programme: "Data Science" });
    expect(fetcher).toHaveBeenCalledTimes(1);
    const [url, options] = fetcher.mock.calls[0];
    expect(url).toBe(enquiryConfig.endpoint);
    expect(options.method).toBe("POST");
    expect(JSON.parse(options.body).data.programme).toBe("Data Science");
  });
  it("rejects an HTTP 200 without confirmed receipt", async () => {
    enquiryConfig.endpoint = "https://enquiry.example.test/submit";
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(new Response(JSON.stringify({ success: false }))));
    await expect(submitEnquiry({})).rejects.toThrow("did not confirm");
  });
  it("rejects server errors without reporting success", async () => {
    enquiryConfig.endpoint = "https://enquiry.example.test/submit";
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(new Response("Unavailable", { status: 503 })));
    await expect(submitEnquiry({})).rejects.toMatchObject({ outcome: "rejected" });
  });
  it.each([
    ["no trace ID", { success: true }],
    ["a non-UUID trace ID", { success: true, id: "receipt-123" }],
    ["extra metadata", { success: true, id: receiptId, providerRequestId: "abc", status: "accepted", message: "Sent" }],
  ])("accepts explicit backend acceptance with %s", async (_label, body) => {
    enquiryConfig.endpoint = "https://enquiry.example.test/submit";
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(new Response(JSON.stringify(body))));
    await expect(submitEnquiry({})).resolves.toBeUndefined();
  });
  it.each([
    ["an empty 200", ""],
    ["an HTML 200", "<!doctype html><html><body>OK</body></html>"],
    ["success as a string", JSON.stringify({ success: "true" })],
    ["a body without a success flag", JSON.stringify({ ok: true, id: receiptId })],
    ["contradictory success and error", JSON.stringify({ success: true, error: "Failed to send enquiry" })],
    ["a JSON array", JSON.stringify([{ success: true }])],
  ])("never treats %s as acceptance", async (_label, body) => {
    enquiryConfig.endpoint = "https://enquiry.example.test/submit";
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(new Response(body, { status: 200 })));
    await expect(submitEnquiry({})).rejects.toMatchObject({ outcome: "unconfirmed" });
  });
  it("never treats an error status as acceptance even with success in the body", async () => {
    enquiryConfig.endpoint = "https://enquiry.example.test/submit";
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(new Response(JSON.stringify({ success: true }), { status: 500 })));
    await expect(submitEnquiry({})).rejects.toMatchObject({ outcome: "unconfirmed" });
  });
  it("reports a timed-out request as unconfirmed", async () => {
    vi.useFakeTimers();
    enquiryConfig.endpoint = "https://enquiry.example.test/submit";
    vi.stubGlobal("fetch", vi.fn((_url: string, init: RequestInit) => new Promise((_resolve, reject) => {
      init.signal?.addEventListener("abort", () => reject(new DOMException("Aborted", "AbortError")));
    })));
    const pending = expect(submitEnquiry({})).rejects.toMatchObject({ outcome: "unconfirmed" });
    await vi.advanceTimersByTimeAsync(15000);
    await pending;
    vi.useRealTimers();
  });
  it("marks provider acceptance failures as unconfirmed", async () => {
    enquiryConfig.endpoint = "https://enquiry.example.test/submit";
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(new Response(JSON.stringify({ code: "acceptance_unconfirmed" }), { status: 502 })));
    await expect(submitEnquiry({})).rejects.toMatchObject({ outcome: "unconfirmed" });
  });
  it("marks network failure as unconfirmed rather than claiming non-delivery", async () => {
    enquiryConfig.endpoint = "https://enquiry.example.test/submit";
    vi.stubGlobal("fetch", vi.fn().mockRejectedValue(new TypeError("Failed to fetch")));
    await expect(submitEnquiry({})).rejects.toMatchObject({ outcome: "unconfirmed" });
  });
  it("marks validation rejection as definite and never calls it uncertain", async () => {
    enquiryConfig.endpoint = "https://enquiry.example.test/submit";
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(new Response(JSON.stringify({ error: "Invalid enquiry" }), { status: 400 })));
    await expect(submitEnquiry({})).rejects.toMatchObject({ outcome: "rejected" });
  });
  it("rejects a malformed endpoint before sending visitor data", async () => {
    enquiryConfig.endpoint = "https://[invalid";
    const fetcher = vi.fn(); vi.stubGlobal("fetch", fetcher);
    await expect(submitEnquiry({})).rejects.toMatchObject({ outcome: "rejected" });
    expect(fetcher).not.toHaveBeenCalled();
  });
  it("shows the simple success wording without claiming inbox delivery or stored data", () => {
    expect(ENQUIRY_ACCEPTED_MESSAGE).toBe("Thank you. Your enquiry has been submitted successfully.");
    expect(enquiryErrorMessage(new Error("unknown"))).toContain("could not confirm");
    expect(enquiryErrorMessage(new Error("unknown"))).toContain("entries remain in this form");
  });
});