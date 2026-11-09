import { z } from "zod";

/** Only public configuration belongs here. Email credentials belong on the server. */
export const DEFAULT_ENQUIRY_ENDPOINT = "https://exfedu-enquiries.exafluence.workers.dev/api/enquiries";

export const enquiryConfig = {
  mode: "production" as const,
  endpoint: import.meta.env.VITE_ENQUIRY_API_URL || DEFAULT_ENQUIRY_ENDPOINT,
  recipient: "contact@exafluence.com",
};

export const recipientFor = (_path: string): string => enquiryConfig.recipient;
export const buildEnquiryPayload = (data: unknown, path: string) => ({
  to: recipientFor(path), sourcePage: path, data,
});

const receiptSchema = z.object({ success: z.literal(true), id: z.string().uuid() }).strict();

export const ENQUIRY_ACCEPTED_MESSAGE = "Microsoft 365 accepted your enquiry for sending to contact@exafluence.com. This confirms acceptance only, not inbox delivery.";
const ENQUIRY_REJECTED_MESSAGE = "The enquiry service did not accept your request. Your entries remain in this form; no website enquiry record was saved. Please try again or email contact@exafluence.com.";
const ENQUIRY_UNCONFIRMED_MESSAGE = "We could not confirm whether Microsoft 365 accepted your enquiry. Your entries remain in this form; no website enquiry record was saved. Before retrying, contact contact@exafluence.com to avoid a duplicate.";

export class EnquiryDeliveryError extends Error {
  constructor(message: string, public readonly outcome: "rejected" | "unconfirmed") {
    super(message);
    this.name = "EnquiryDeliveryError";
  }
}

export function enquiryErrorMessage(error: unknown): string {
  return error instanceof EnquiryDeliveryError && error.outcome === "rejected"
    ? ENQUIRY_REJECTED_MESSAGE
    : ENQUIRY_UNCONFIRMED_MESSAGE;
}

/** A receipt proves provider acceptance, not arrival in the owner's inbox. */
export async function submitEnquiry(data: unknown): Promise<void> {
  if (!enquiryConfig.endpoint) throw new EnquiryDeliveryError("Enquiry delivery is not configured yet.", "rejected");
  let endpoint: URL;
  try {
    endpoint = new URL(enquiryConfig.endpoint, window.location.origin);
  } catch {
    throw new EnquiryDeliveryError("Enquiry delivery requires a valid API URL.", "rejected");
  }
  const loopback = ["localhost", "127.0.0.1", "[::1]"].includes(endpoint.hostname);
  if (endpoint.username || endpoint.password || endpoint.hash || (endpoint.protocol !== "https:" && !(endpoint.protocol === "http:" && loopback))) {
    throw new EnquiryDeliveryError("Enquiry delivery requires a secure API URL.", "rejected");
  }
  const path = typeof window !== "undefined" ? window.location.pathname : "/";
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 15000);
  try {
    let response: Response;
    try {
      response = await fetch(endpoint.toString(), {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(buildEnquiryPayload(data, path)),
        signal: controller.signal,
        credentials: "omit",
      });
    } catch {
      throw new EnquiryDeliveryError("Microsoft 365 acceptance is unconfirmed.", "unconfirmed");
    }
    if (!response.ok) {
      let code = "";
      try {
        const body: unknown = await response.json();
        code = typeof body === "object" && body !== null && "code" in body && typeof body.code === "string" ? body.code : "";
      } catch { /* A non-JSON error response still has an HTTP outcome. */ }
      const unconfirmed = code === "acceptance_unconfirmed" || response.status === 502 || (response.status >= 500 && response.status !== 503);
      throw new EnquiryDeliveryError(`Enquiry service returned ${response.status}.`, unconfirmed ? "unconfirmed" : "rejected");
    }
    try {
      const receipt = receiptSchema.safeParse(await response.json());
      if (!receipt.success) throw new EnquiryDeliveryError("The enquiry service did not confirm receipt.", "unconfirmed");
    } catch (error) {
      if (error instanceof EnquiryDeliveryError) throw error;
      throw new EnquiryDeliveryError("The enquiry service did not confirm receipt.", "unconfirmed");
    }
  } finally {
    clearTimeout(timer);
  }
}