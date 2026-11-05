import { afterEach, describe, expect, it, vi } from "vitest";
import { buildEnquiryPayload, enquiryConfig, submitEnquiry } from "@/lib/enquiryDelivery";

afterEach(() => { enquiryConfig.endpoint = ""; vi.unstubAllGlobals(); });
describe("production enquiry delivery", () => {
  it("routes enquiries to contact@exafluence.com", () => {
    expect(buildEnquiryPayload({ kind: "partner" }, "/contact").to).toBe("contact@exafluence.com");
  });
  it("never simulates success without an endpoint", async () => {
    const fetcher = vi.fn(); vi.stubGlobal("fetch", fetcher);
    await expect(submitEnquiry({})).rejects.toThrow("not configured");
    expect(fetcher).not.toHaveBeenCalled();
  });
  it("posts the real payload and accepts a durable receipt", async () => {
    enquiryConfig.endpoint = "https://enquiry.example.test/submit";
    const fetcher = vi.fn().mockResolvedValue(new Response(JSON.stringify({ success: true, id: "receipt-123" })));
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
    await expect(submitEnquiry({})).rejects.toThrow("503");
  });
});