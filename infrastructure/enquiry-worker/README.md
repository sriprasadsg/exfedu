# Exafluence Education enquiry API — infrastructure handoff

Prepared 6 November 2026. **Not deployed; no production API URL or live email delivery is confirmed.** This package is a separate enquiry backend, not a deployment or migration of the website. Existing website: https://exfedu.exafluence.workers.dev/.

## What it does

All four existing forms use `src/lib/enquiryDelivery.ts`: student programme, partnership, IBM institutional and institutional brochure request. This Worker validates their existing JSON envelopes and sends plain-text notifications to **contact@exafluence.com**, fixed server-side. Visitors cannot change the recipient. The visitor's validated email becomes `reply_to`, never the sender. Phone number, email, institution (the `organisation` field on partnership/IBM forms) and location are mandatory in every form, including student and brochure requests. Deploy this updated Worker together with the updated website; the earlier API contract is incompatible. No confirmation email is sent to visitors, and no submissions database is added.

Email-only delivery has no separately stored lead copy. A stored copy would preserve leads if email delivery fails; add one only after owner approval. Until configuration is complete, the website reports failure rather than simulated success, retains entered details, and does not unlock gated brochures.

## Required decisions and configuration

| Value | Location | Required action |
| --- | --- | --- |
| `RESEND_API_KEY` | Worker secret only | Create a sending-only Resend key scoped to the verified sender domain; enter via Wrangler's secret prompt. Never use a `VITE_` name. |
| `EMAIL_FROM` | Worker `vars` | Set an actual Resend-verified sender email address owned by Exafluence. Left blank deliberately; do not use a visitor's email. |
| `ALLOWED_ORIGINS` | Worker `vars` | Defaults to `https://exfedu.exafluence.workers.dev` (no trailing slash). Comma-separated exact origins, no wildcard. Add staging origins only when needed. |
| Worker account and name | Infrastructure team's Cloudflare login/config | Choose the correct Cloudflare account; `exfedu-enquiries` is a proposed separate service name, not a confirmed deployment. |
| `VITE_ENQUIRY_API_URL` | Website's public build configuration | Set the **confirmed HTTPS Worker URL plus `/api/enquiries`**; rebuild/release the existing website. Blank until confirmed. All four forms read this one value. |

Resend is the supplied email adapter, not an already connected service. If your infrastructure uses another provider, replace the small server-only `send` block in `worker.ts`; preserve validation, fixed recipient, timeouts and receipt semantics. Worker usage and email sending may incur charges; check Cloudflare/Resend plans, quotas and sender verification before deployment.

## Deployment steps (infrastructure team)

1. Install Node.js 22 LTS or later and npm. Extract this package, enter `enquiry-worker/`, then:

   ```sh
   npm install
   npx wrangler login
   ```

2. Verify an Exafluence-owned sender domain in Resend. Add the provider's required DNS records through your normal infrastructure process and wait for verification. Create the scoped sending key. No DNS or Cloudflare account changes were made by Lovable.
3. Edit this package's `wrangler.jsonc`, not the website's root configuration: choose the service name/account if necessary, set `EMAIL_FROM` to the verified sender and review `ALLOWED_ORIGINS`.
4. Save the key through the interactive secret prompt (do not paste it into commands, source or documentation), then deploy:

   ```sh
   npx wrangler secret put RESEND_API_KEY
   npx wrangler deploy
   ```

   Wrangler may offer to create the new Worker while adding its first secret. This is a new, independent API; it must not overwrite the website Worker. If your account disallows `workers.dev`, configure an approved API custom domain through your normal process and disable `workers_dev`.
5. Record the URL Wrangler actually returns. `GET <confirmed-worker-origin>/health` confirms the service is reachable, **not** email readiness. The form endpoint is `<confirmed-worker-origin>/api/enquiries`; don't assume the account subdomain from the existing site URL.
6. Set `VITE_ENQUIRY_API_URL` to that complete endpoint in the existing website's build configuration. A same-origin `/api/enquiries` value is supported **only if your team has separately routed that path to this service**. Rebuild and release using your existing website process. This package contains no website hosting instructions.
7. From the deployed website, submit each of the four forms with clearly marked test details. Verify the API receipt, Resend's message event and actual arrival at **contact@exafluence.com**; check spam/quarantine too. Verify names, programme/source information and reply-to for all four forms. Confirm brochure access opens only after a successful receipt. Check phone and desktop, consent validation, CORS preflight, and failure retention before declaring activation complete.

## API contract

- `POST /api/enquiries`, JSON, browser `Origin` must be in `ALLOWED_ORIGINS`.
- Envelope: `{ "to": "contact@exafluence.com", "sourcePage": "/contact", "data": { "kind": "partner", ...formFields } }`. `to` may be omitted; a different recipient is rejected.
- Kinds: `partner`, `student-programme`, `ibm-institutional`, `brochure`. `schema.ts` is the full field contract; the frontend still validates its own fields. Update both when approved programmes/options change.
- Accepted: HTTP 200 `{ "success": true, "id": "<provider-message-id>" }`. The ID proves the email provider accepted the message, **not** that it reached the inbox. Do not substitute a generated ID or return success on provider failure.
- Failure: 400 invalid data/JSON; 403 missing/disallowed origin; 404 wrong path; 405 wrong method; 413 over 16 KiB; 415 non-JSON; 503 missing email configuration; 502 provider rejection/timeout/invalid receipt. Responses reveal no secrets or form contents. Provider rejection includes its HTTP status, not its potentially sensitive body.
- Server call timeout 10 seconds; browser timeout 15 seconds. No automatic retries. Identical validated notifications reuse a hashed provider idempotency key for Resend's 24-hour window: an unchanged retry avoids duplicate messages, but an intentionally identical repeat within that period is also deduplicated. Do not use the receipt as payment/admission/identity authorization.

## Operational and security checklist

- CORS is not authentication or spam prevention: a non-browser caller can forge an Origin header. This implementation has no rate limiting or CAPTCHA because these were not requested. Review abuse controls and sending caps before public activation; do not treat this API as an authenticated endpoint. Browser API secrets must never be added as a workaround.
- Keep request bodies and authorization headers out of Cloudflare/Resend debug logs. This code does not log visitor details or provider bodies. Monitor status counts and provider message IDs; use Resend's dashboard for bounce/rejection details.
- Resend acceptance can still be followed by bounce, spam filtering or mailbox rejection. Monitor delivery outcomes; there is no queue, persistence, automatic retry or bounce webhook in this handoff.
- For local development use `npx wrangler dev`; put a real key only in an ignored `.dev.vars` file if needed. Use a separate verified test sender/key. Never commit that file. Add `http://localhost:8080` to local-only allowed origins for browser testing; don't publish local settings by accident.
- This package needs no Lovable Cloud database, project credentials or service role key.

## Verification performed

Automated tests exercise all four contracts, owner routing, provider receipts, consent and malformed-input rejection, origin handling, payload limits, missing configuration, failure handling and retry keys. Frontend integration checks use a local test transport with a mocked email provider, not a real send. **Live delivery remains unverified** until the infrastructure team completes step 7.

## References

- https://developers.cloudflare.com/workers/configuration/integrations/apis/
- https://developers.cloudflare.com/workers/configuration/secrets/
- https://resend.com/docs/api-reference/emails/send-email
- https://resend.com/docs/dashboard/emails/idempotency-keys