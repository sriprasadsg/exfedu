import { z } from "zod";
import { buildOwnerEmail, enquiryRequestSchema } from "./schema";

export interface Env {
  ALLOWED_ORIGINS: string;
  EMAIL_FROM: string;
  RESEND_API_KEY: string;
}
const MAX_BYTES = 16384;
const providerReceipt = z.object({ id: z.string().trim().min(1).max(200) });

async function readJson(request: Request) {
  if (!request.body) throw new Error("empty");
  const reader = request.body.getReader();
  const chunks: Uint8Array[] = [];
  let size = 0;
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    size += value.byteLength;
    if (size > MAX_BYTES) { await reader.cancel(); throw new Error("too-large"); }
    chunks.push(value);
  }
  const bytes = new Uint8Array(size);
  let offset = 0;
  for (const chunk of chunks) { bytes.set(chunk, offset); offset += chunk.byteLength; }
  return JSON.parse(new TextDecoder().decode(bytes));
}

export async function handleRequest(request: Request, env: Env, send: typeof fetch = fetch): Promise<Response> {
  const origin = request.headers.get("Origin");
  const allowed = (env.ALLOWED_ORIGINS || "").split(",").map(v => v.trim()).filter(Boolean);
  const permitted = !!origin && allowed.includes(origin);
  const headers: Record<string, string> = { "Content-Type": "application/json", "Cache-Control": "no-store", Vary: "Origin", "X-Content-Type-Options": "nosniff" };
  if (permitted && origin) headers["Access-Control-Allow-Origin"] = origin;
  const reply = (status: number, body: unknown) => new Response(JSON.stringify(body), { status, headers });
  const path = new URL(request.url).pathname;
  if (path === "/health" && request.method === "GET") return reply(200, { status: "ok", service: "exfedu-enquiries" });
  if (path !== "/api/enquiries") return reply(404, { error: "Not found" });
  if (!permitted) return reply(403, { error: "Origin not allowed" });
  if (request.method === "OPTIONS") return new Response(null, { status: 204, headers: { ...headers,
    "Access-Control-Allow-Methods": "POST, OPTIONS", "Access-Control-Allow-Headers": "Content-Type, Accept", "Access-Control-Max-Age": "600" } });
  if (request.method !== "POST") return reply(405, { error: "Use POST" });
  if (!request.headers.get("Content-Type")?.toLowerCase().startsWith("application/json")) return reply(415, { error: "JSON required" });
  if (Number(request.headers.get("Content-Length")) > MAX_BYTES) return reply(413, { error: "Request too large" });
  let input: unknown;
  try { input = await readJson(request); }
  catch (error) { return reply(error instanceof Error && error.message === "too-large" ? 413 : 400, { error: "Invalid or oversized JSON" }); }
  const parsed = enquiryRequestSchema.safeParse(input);
  if (!parsed.success) return reply(400, { error: "Invalid enquiry", fields: parsed.error.issues.map(i => i.path.join(".")) });
  const from = z.string().trim().email().safeParse(env.EMAIL_FROM);
  if (!env.RESEND_API_KEY || !from.success) return reply(503, { error: "Email delivery is not configured" });
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 10000);
  try {
    const email = buildOwnerEmail(parsed.data, from.data);
    // Same validated request within the provider's 24-hour window reuses its receipt.
    const bytes = new TextEncoder().encode(JSON.stringify(email) + parsed.data.sourcePage);
    const hash = await crypto.subtle.digest("SHA-256", bytes);
    const key = Array.from(new Uint8Array(hash), v => v.toString(16).padStart(2, "0")).join("");
    const result = await send("https://api.resend.com/emails", { method: "POST", signal: controller.signal,
      headers: { Authorization: `Bearer ${env.RESEND_API_KEY}`, "Content-Type": "application/json", "Idempotency-Key": `exfedu-${key}` }, body: JSON.stringify(email) });
    if (!result.ok) {
      // Do not expose credentials, visitor details or the provider response body.
      return reply(502, { error: "Email provider did not accept the enquiry", providerStatus: result.status });
    }
    const receipt = providerReceipt.safeParse(await result.json());
    if (!receipt.success) return reply(502, { error: "Email provider did not confirm acceptance" });
    return reply(200, { success: true, id: receipt.data.id });
  } catch { return reply(502, { error: "Email service unavailable; acceptance is unconfirmed" }); }
  finally { clearTimeout(timer); }
}

export default { fetch(request: Request, env: Env) { return handleRequest(request, env); } };