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
  it("rejects a receipt that is not Microsoft's request UUID", async () => {
    enquiryConfig.endpoint = "https://enquiry.example.test/submit";
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(new Response(JSON.stringify({ success: true, id: "receipt-123" }))));
    await expect(submitEnquiry({})).rejects.toMatchObject({ outcome: "unconfirmed" });
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
  it("describes acceptance and retained entries without claiming inbox delivery or saved data", () => {
    expect(ENQUIRY_ACCEPTED_MESSAGE).toContain("acceptance only, not inbox delivery");
    expect(enquiryErrorMessage(new Error("unknown"))).toContain("could not confirm");
    expect(enquiryErrorMessage(new Error("unknown"))).toContain("entries remain in this form");
    expect(enquiryErrorMessage(new Error("unknown"))).toContain("no website enquiry record was saved");
  });
});