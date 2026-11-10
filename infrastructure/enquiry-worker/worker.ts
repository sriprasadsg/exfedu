import { enquiryRequestSchema } from "./schema";
import { microsoftConfigured, MicrosoftEmailError, sendMicrosoftEmail, type MicrosoftEnv } from "./microsoft365";

export interface Env extends MicrosoftEnv {
  ALLOWED_ORIGINS: string;
}
const MAX_BYTES = 16384;

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
  // Exact production origin is always permitted; additional origins remain explicitly configured.
  const allowed = new Set([
    "https://exfedu.exafluence.workers.dev",
    ...(env.ALLOWED_ORIGINS || "").split(",").map(v => v.trim()).filter(Boolean),
  ]);
  const permitted = !!origin && allowed.has(origin);
  const headers: Record<string, string> = { "Content-Type": "application/json", "Cache-Control": "no-store", Vary: "Origin", "X-Content-Type-Options": "nosniff" };
  if (permitted && origin) headers["Access-Control-Allow-Origin"] = origin;
  const reply = (status: number, body: unknown) => new Response(JSON.stringify(body), { status, headers });
  const path = new URL(request.url).pathname;
  // This reports configuration presence only; it does not test Microsoft credentials or inbox delivery.
  if (path === "/health" && request.method === "GET") return reply(200, {
    status: "ok", service: "exfedu-enquiries", emailConfigured: microsoftConfigured(env),
  });
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
  if (!parsed.success) return reply(400, {
    error: "Invalid enquiry",
    fields: parsed.error.issues.map(issue => issue.path.join(".") || "request"),
    details: parsed.error.issues.map(issue => ({
      field: issue.path.join(".") || "request",
      code: issue.code,
      message: issue.message,
    })),
  });
  if (!microsoftConfigured(env)) return reply(503, { error: "Email delivery is not configured" });
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 10000);
  try {
    const { providerRequestId } = await sendMicrosoftEmail(parsed.data, env, send, controller.signal);
    // `id` is generated here as a support trace reference; it is not a Microsoft message ID.
    const id = crypto.randomUUID();
    console.log(JSON.stringify({ event: "enquiry_accepted", id, providerRequestId }));
    return reply(200, { success: true, id, ...(providerRequestId ? { providerRequestId } : {}) });
  } catch (error) {
    return reply(502, { error: "Microsoft 365 acceptance is unconfirmed", code: "acceptance_unconfirmed", ...(error instanceof MicrosoftEmailError ? { providerStatus: error.providerStatus } : {}) });
  }
  finally { clearTimeout(timer); }
}

export default { fetch(request: Request, env: Env) { return handleRequest(request, env); } };
