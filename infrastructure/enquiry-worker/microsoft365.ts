import { z } from "zod";
import { buildOwnerEmail, type enquiryRequestSchema } from "./schema";

export interface MicrosoftEnv {
  EMAIL_FROM: string;
  M365_TENANT_ID: string;
  M365_CLIENT_ID: string;
  M365_CLIENT_SECRET: string;
}
const uuid = z.string().uuid();
export function microsoftConfigured(env: MicrosoftEnv): boolean {
  const from = z.string().trim().email().safeParse(env.EMAIL_FROM);
  return from.success && from.data.split("@")[1]?.toLowerCase() === "exafluence.com"
    && uuid.safeParse(env.M365_TENANT_ID).success && uuid.safeParse(env.M365_CLIENT_ID).success
    && !!env.M365_CLIENT_SECRET?.trim();
}
export class MicrosoftEmailError extends Error {
  constructor(public readonly providerStatus: number) { super("Microsoft 365 acceptance unconfirmed"); }
}

/** The receipt is Microsoft's send request ID, not a message ID or delivery proof. */
export async function sendMicrosoftEmail(
  input: z.infer<typeof enquiryRequestSchema>, env: MicrosoftEnv, send: typeof fetch, signal: AbortSignal,
): Promise<string> {
  const tokenResponse = await send(`https://login.microsoftonline.com/${env.M365_TENANT_ID}/oauth2/v2.0/token`, {
    method: "POST", signal, redirect: "error",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ client_id: env.M365_CLIENT_ID, client_secret: env.M365_CLIENT_SECRET,
      scope: "https://graph.microsoft.com/.default", grant_type: "client_credentials" }).toString(),
  });
  if (!tokenResponse.ok) throw new MicrosoftEmailError(tokenResponse.status);
  const token = z.object({ access_token: z.string().min(1), token_type: z.string().refine(v => v.toLowerCase() === "bearer") })
    .safeParse(await tokenResponse.json());
  if (!token.success) throw new MicrosoftEmailError(502);
  const email = buildOwnerEmail(input, env.EMAIL_FROM.trim());
  const response = await send(`https://graph.microsoft.com/v1.0/users/${encodeURIComponent(email.from)}/sendMail`, {
    method: "POST", signal, redirect: "error",
    headers: { Authorization: `Bearer ${token.data.access_token}`, "Content-Type": "application/json" },
    body: JSON.stringify({ message: {
      subject: email.subject, body: { contentType: "Text", content: email.text },
      toRecipients: email.to.map(address => ({ emailAddress: { address } })),
      replyTo: [{ emailAddress: { address: email.reply_to } }],
    }, saveToSentItems: true }),
  });
  if (response.status !== 202) throw new MicrosoftEmailError(response.status);
  const receipt = uuid.safeParse(response.headers.get("request-id"));
  if (!receipt.success) throw new MicrosoftEmailError(502);
  return receipt.data;
}