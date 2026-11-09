# Exafluence Education enquiry API — Microsoft 365 handoff

Prepared 6 November 2026; configuration corrected 9 November 2026. **The website now defaults to the live API address and the Worker source sets contact@exafluence.com as sender and recipient. The corrected Worker still must be deployed. Microsoft credentials, effective mailbox permissions and actual inbox delivery remain unverified.** This is a separate enquiry API, not website hosting infrastructure. Existing website: https://exfedu.exafluence.workers.dev/.

## Sending architecture

All four existing forms share `src/lib/enquiryDelivery.ts` and POST to `/api/enquiries`. The Worker validates the JSON envelope, obtains a tenant-specific Microsoft Graph application token and calls `sendMail` from a configured Microsoft 365 mailbox on **exafluence.com**, the user-confirmed verified domain. Notifications are plain text and always addressed to **contact@exafluence.com**, fixed server-side. The visitor's validated email is Reply-To, never the sender. No Resend account or key is used.

Phone, email, institution (organisation on partnership/IBM forms) and location remain mandatory in all four forms. No visitor confirmation email or submissions database is added. Microsoft saves accepted sends in the sender's Sent Items; this is not a separately stored lead copy and does not preserve a request that fails before sending. A separate stored copy can be added only with owner approval.

## Required configuration

| Value | Location | Infrastructure action |
| --- | --- | --- |
| `EMAIL_FROM` | Worker vars | Configured as `contact@exafluence.com`. Confirm this is an existing Exchange Online mailbox and authorise the app for it. Do not replace it with an unprovisioned alias or visitor address. |
| `M365_TENANT_ID` | Worker vars | Directory/tenant UUID for the organisation's Microsoft 365 tenant. Non-secret. |
| `M365_CLIENT_ID` | Worker vars | Application/client UUID for a dedicated single-tenant Entra app. Non-secret. |
| `M365_CLIENT_SECRET` | Worker secret only | Client-secret **value**, not its ID. Set through the interactive secret prompt. Keep expiry/rotation under infrastructure control; never put in website configuration, chat or source. |
| `ALLOWED_ORIGINS` | Worker vars | Configured for the deployed website, published Lovable site and this project's preview origin. Comma-separated exact approved origins, no wildcard or trailing slashes. Remove test origins after acceptance if desired. |
| `VITE_ENQUIRY_API_URL` | Optional website public build override | The source defaults to `https://exfedu-enquiries.exafluence.workers.dev/api/enquiries`. Set this only for a different confirmed API URL, then rebuild/release the website. |

## Microsoft 365 administrator setup

1. Confirm exafluence.com is verified in your Microsoft 365 tenant, the proposed sender is an Exchange Online mailbox, and contact@exafluence.com can receive mail. Your domain ownership/verification was supplied by the user; no tenant access or independent verification was performed here. Keep the existing mail DNS; do not delegate the same sending subdomain to Lovable or add Resend DNS records for this adapter.
2. Register a dedicated **single-tenant** Microsoft Entra application. Record its tenant UUID and client UUID. Create a client secret and record the secret value securely. This Worker uses OAuth client credentials, not SMTP passwords or interactive sign-in. A certificate/federated-credential flow is preferable for high-assurance production but requires a different token adapter; do not assume it is implemented here.
3. Grant **Application Mail.Send** only for the chosen sender mailbox using **Exchange Online RBAC for Applications**, following Microsoft's official guide below. Create the Exchange service principal using the enterprise application's service-principal object ID (not the app-registration object ID), define a resource scope matching only the sender and assign the Application Mail.Send role to that scope. No Mail.ReadWrite permission is needed by this implementation.
4. Use `Test-ServicePrincipalAuthorization` and test effective access against the intended mailbox and an out-of-scope mailbox. The former must be allowed and the latter denied. **Do not combine mailbox-scoped RBAC with an unscoped Entra Graph Mail.Send application grant**: permissions are additive, so the broad Entra grant defeats the mailbox restriction. Remove overlapping tenant-wide grants before activation. Existing Application Access Policies are a legacy alternative for existing tenants, not the recommended new setup.
5. Review Exchange sending limits, mailbox licence requirements, anti-spam/quarantine policies and app-secret expiry. Domain verification does not guarantee delivery or bypass Microsoft policies. Cloudflare usage and Microsoft licensing may incur charges.

## Infrastructure deployment steps

1. Use Node.js 22 LTS or later and npm. From this standalone `enquiry-worker/` folder run:
   ```sh
   npm install
   npx wrangler login
   ```
2. Review this folder's `wrangler.jsonc`: choose the correct Cloudflare account/service name without overwriting the website Worker, and populate the non-secret vars above.
3. Set the Microsoft credential only through the secure interactive prompt, then deploy the separate API:
   ```sh
   npx wrangler secret put M365_CLIENT_SECRET
   npx wrangler deploy
   ```
   If updating a previously deployed Resend version, remove its unused credential after the Microsoft version has been deployed successfully:
   ```sh
   npx wrangler secret delete RESEND_API_KEY
   ```
   No account deployment or DNS changes were performed from this project. Wrangler may offer to create a new Worker while adding its first secret. Use an approved API custom domain if your account disallows workers.dev.
4. Record the actual URL returned by Wrangler. `GET <confirmed-worker-origin>/health` proves reachability only, **not Microsoft email readiness**. Do not guess the service URL from the website URL. The enquiry URL is `<confirmed-worker-origin>/api/enquiries`.
5. Rebuild/release the website so its new default API address is included. Set `VITE_ENQUIRY_API_URL` only if the deployed API URL differs from the default above. A relative `/api/enquiries` works only if that path is separately routed to this API. Website hosting is not part of this package.
6. Submit clearly labelled test enquiries through each of the four deployed forms: partnership, student programme, IBM institutional and brochure. Check the successful API response, sender Sent Items, Exchange Online **message trace** and actual arrival at **contact@exafluence.com** (including quarantine/spam). Check the subject, fields, source page and Reply-To. Verify phone layouts, required fields and consent, failure retention, and brochure unlocking only after acceptance.
7. Have the mailbox owner confirm actual receipt for every form. Do not call delivery verified merely because the API returned success. Share the confirmed enquiry API URL so the same deployed endpoint can be tested from the application.

## API and receipt semantics

- `POST /api/enquiries`, JSON, exact browser Origin must be allowed.
- Envelope: `{ "to": "contact@exafluence.com", "sourcePage": "/contact", "data": { "kind": "partner", ...fields } }`. Recipient may be omitted; a different recipient is rejected.
- Kinds: `partner`, `student-programme`, `ibm-institutional`, `brochure`. `schema.ts` holds the complete contract; preserve frontend/server validation consistency.
- Success: HTTP 200 `{ "success": true, "id": "<Microsoft-request-id>" }`, only after Graph `sendMail` returns **202 Accepted** and a valid provider-issued `request-id` header. Graph returns no message body or message ID. This ID is an acceptance **request correlation ID**, not an email ID or delivery receipt. Use it for support correlation, not as a message-trace message ID. No fabricated ID is substituted.
- Failure: 400 validation/JSON; 403 origin; 404 path; 405 method; 413 over 16 KiB; 415 non-JSON; 503 invalid/missing configuration; 502 token/send failure, invalid receipt or timeout. Microsoft failure responses include only the HTTP status, never credential/token/provider body or visitor data.
- One 10-second timeout covers token acquisition and sending; browser timeout is 15 seconds. No automatic retries, token persistence, queue, cron or send database.
- **Graph sendMail has no idempotency guarantee.** The earlier Resend hashed-key behaviour is removed. An uncertain timeout or missing response header can occur after acceptance; the UI must report unconfirmed acceptance. Check Sent Items/message trace before manual resubmission to avoid duplicates. Intentionally repeated submissions can send repeated emails. The acceptance response is never payment/admission/identity authorisation.

## Security and operations

- App credentials stay in the Cloudflare Worker, never the browser or Lovable project secrets. Do not paste secrets into chat. Use ignored `.dev.vars` only for local development and never include it in a handoff.
- CORS is not authentication or spam protection; non-browser callers can forge Origin. No new CAPTCHA or rate limit is included. Review public-form abuse controls and sending caps before activation; do not put an API secret in the browser as a workaround.
- Keep request bodies, credentials, tokens and authorisation headers out of logs. This code does not log them. Monitor safe status counts and correlation IDs; use Exchange message trace for delivery diagnostics.
- Graph acceptance can still be followed by rejection, quarantine or non-delivery. No bounce webhook or automatic retry is included. Rotate the client secret before expiry; deployment alone does not guarantee inbox arrival.
- Local development: `npx wrangler dev`, dedicated test mailbox/app and local-only allowed origin. Do not publish local origin settings accidentally.
- This package needs no Lovable Cloud email domain, database, API key or managed-project credentials.

## Live deployment finding — 9 November 2026

The deployed website bundle contained no enquiry API address. The service currently at the proposed API URL returned no `Access-Control-Allow-Origin` for the deployed website and rejected the prepared request envelope with `Name is required`; it does not match this Worker's contract. Deploy this corrected Worker over that service and release the rebuilt website together. Cloudflare deployment could not be performed from this workspace because Wrangler is not authenticated.

## Verification

Tests cover all four form-to-Worker flows using mocked Microsoft token and Graph responses, fixed recipient, the approved sender domain, required contact fields, consent, origin restrictions, payload size, token errors, provider rejection, missing request IDs and no ambiguous-send retries. These are not real email sends. Production testing remains blocked by Cloudflare deployment, credentials and scoped mailbox access.

## Official references

- https://learn.microsoft.com/en-us/graph/api/user-sendmail?view=graph-rest-1.0
- https://learn.microsoft.com/en-us/entra/identity-platform/v2-oauth2-client-creds-grant-flow
- https://learn.microsoft.com/en-us/exchange/permissions-exo/application-rbac
- https://learn.microsoft.com/en-us/exchange/permissions-exo/application-access-policies
- https://learn.microsoft.com/en-us/exchange/monitoring/trace-an-email-message/message-trace-modern-eac
- https://developers.cloudflare.com/workers/configuration/secrets/


## Cloudflare Dashboard deployment (recommended)

The API is a separate Worker from the website Worker. Do not connect the website's `exfedu` Worker to this subdirectory, and do not deploy this API source over the website Worker.

1. In Cloudflare Dashboard, open **Workers & Pages** and select the existing Worker named **`exfedu-enquiries`** (the name must match `name` in this folder's `wrangler.jsonc`).
2. Under **Settings → Variables and Secrets**, configure these runtime values:
   - `ALLOWED_ORIGINS` (Text): `https://exfedu.exafluence.workers.dev,https://exfedu.lovable.app,https://id-preview--6a6eef78-c02c-449d-a8d6-90f1dd4349d1.lovable.app`
   - `EMAIL_FROM` (Text): `contact@exafluence.com`
   - `M365_TENANT_ID` (Text): the Microsoft Entra tenant/directory ID.
   - `M365_CLIENT_ID` (Text): the dedicated single-tenant Entra application/client ID.
   - `M365_CLIENT_SECRET` (**Secret**): the client-secret value, never the secret ID. Do not paste it into GitHub, source files, build logs or chat.
3. Save/deploy the variables. Before allowing real submissions, the Microsoft Entra application must have mailbox-scoped Exchange Online **Application Mail.Send** permission for `contact@exafluence.com`, and the mailbox owner/infrastructure administrator must verify effective authorization. Avoid an unscoped tenant-wide Graph `Mail.Send` app grant.
4. Still on this Worker, open **Settings → Builds → Connect** and connect GitHub repository `sriprasadsg/exfedu`. Select production branch `main`.
5. Set the repository root/path to `.` (repository root), **Build command** to `npm ci && npm test && npm run build`, and **Deploy command** to `npx --yes wrangler@4 deploy --config infrastructure/enquiry-worker/wrangler.jsonc`. The explicit config path is important because the repository also contains the separate website configuration. The Vite build output is only a validation/build check here; the deploy command publishes only the enquiry Worker.
6. Save the build settings. After the fix is merged to `main`, the commit triggers a Worker build and deployment. Review the build log and confirm the deployed Worker name is `exfedu-enquiries`.

The Worker Wrangler config has `keep_vars: true` so dashboard-managed runtime variables are not erased by a code deployment. The sender and origin values are also documented in source as defaults; confirm that the live Worker settings contain the exact values above after deployment.

### Post-deployment smoke tests

Run from a terminal with public network access:

```sh
curl -i https://exfedu-enquiries.exafluence.workers.dev/health

curl -i -X OPTIONS \
  https://exfedu-enquiries.exafluence.workers.dev/api/enquiries \
  -H 'Origin: https://exfedu.exafluence.workers.dev' \
  -H 'Access-Control-Request-Method: POST' \
  -H 'Access-Control-Request-Headers: content-type'
```

Expected health response: HTTP 200 with `{"status":"ok","service":"exfedu-enquiries"}`. Expected preflight response: HTTP 204 and `Access-Control-Allow-Origin: https://exfedu.exafluence.workers.dev`.

Then submit one clearly labelled test from each of the four live forms. Confirm HTTP 200 with a non-empty receipt ID, then verify Exchange Online Sent Items, message trace and actual arrival in `contact@exafluence.com`. A Graph 202 acceptance receipt is not proof of mailbox delivery. Do not repeatedly retry an ambiguous timeout; check Sent Items/message trace first because Microsoft Graph sendMail has no idempotency guarantee.

If the HTTPS endpoint still shows `ERR_SSL_PROTOCOL_ERROR`, check **Workers & Pages → exfedu-enquiries → Settings → Domains & Routes** and verify that the `workers.dev` subdomain is enabled and the expected hostname is assigned to this Worker. Do not work around TLS by changing the browser request to HTTP. Also inspect the browser Network panel for the exact URL that raised the SSL error; the HTTPS API request and any other failing asset URL must be diagnosed independently.
