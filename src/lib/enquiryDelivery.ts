import { z } from "zod";

/** Only public configuration belongs here. Email credentials belong on the server. */
export const enquiryConfig = {
  mode: "production" as const,
  endpoint: import.meta.env.VITE_ENQUIRY_API_URL || "",
  recipient: "contact@exafluence.com",
};

export const recipientFor = (_path: string): string => enquiryConfig.recipient;
export const buildEnquiryPayload = (data: unknown, path: string) => ({
  to: recipientFor(path), sourcePage: path, data,
});

const receiptSchema = z.object({ success: z.literal(true), id: z.string().min(1) });

/** A receipt proves provider acceptance, not arrival in the owner's inbox. */
export async function submitEnquiry(data: unknown): Promise<void> {
  if (!enquiryConfig.endpoint) throw new Error("Enquiry delivery is not configured yet.");
  const endpoint = new URL(enquiryConfig.endpoint, window.location.origin);
  const loopback = ["localhost", "127.0.0.1", "[::1]"].includes(endpoint.hostname);
  if (endpoint.username || endpoint.password || endpoint.hash || (endpoint.protocol !== "https:" && !(endpoint.protocol === "http:" && loopback))) {
    throw new Error("Enquiry delivery requires a secure API URL.");
  }
  const path = typeof window !== "undefined" ? window.location.pathname : "/";
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 15000);
  try {
    const response = await fetch(endpoint.toString(), {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify(buildEnquiryPayload(data, path)),
      signal: controller.signal,
      credentials: "omit",
    });
    if (!response.ok) throw new Error(`Enquiry service returned ${response.status}.`);
    const receipt = receiptSchema.safeParse(await response.json());
    if (!receipt.success) throw new Error("The enquiry service did not confirm receipt.");
  } finally {
    clearTimeout(timer);
  }
}