# Exafluence Education infrastructure handoff

## Delivery status — 5 November 2026

The source and production build retain the existing design and approved page content. Enquiry status messages have changed because simulated delivery has been removed. **This is not a deployed Cloudflare backend or a Cloudflare-ready full-stack release.**

Cloudflare deployment of Lovable applications, including Pages/Workers hosting configuration and deployment infrastructure, is not supported by this integration. No Wrangler configuration, Pages Functions, Worker, D1 database, email service or DNS changes have been provisioned. For supported hosting, use Lovable's Publish flow. Your infrastructure team must independently assess and implement the requested Cloudflare deployment.

## Reproducible source build

Use Node.js 22 and npm 10. From the extracted source directory:

```sh
cp .env.example .env.local
# Fill the public values using your approved service configuration.
npm ci
npm test
npm run build
```

`dist/` is the Vite production output. `dist.zip` contains that output at the archive root. It contains no backend executable. Build-time `VITE_*` values are public and are embedded into JavaScript: never put private keys there. Changes to these values require a new build. No secret-bearing `.env`, installed dependencies or repository metadata is included in the source archive.

`package-lock.json` has been regenerated against `package.json`. The obsolete alternate Bun lockfiles are omitted from this npm-focused handoff to avoid conflicting dependency resolutions. The live editor may still use its own Bun lockfile.

## Enquiries: real client, service not yet supplied

All four forms now use `src/lib/enquiryDelivery.ts`:

- Student programme enquiry: `data.kind = student-programme`.
- Partnership enquiry: `data.kind = partner`.
- IBM institutional enquiry: `data.kind = ibm-institutional`.
- Institutional brochure request: `data.kind = brochure`.

Configure `VITE_ENQUIRY_API_URL` with the real service URL before building for production. Blank configuration fails with an error and retains answers; it never pretends a submission was received. Brochure requests unlock only after the service confirms receipt. SkillShone remains an external link and has no enquiry form.

### Service contract for the infrastructure team

The browser sends an unauthenticated JSON POST:

```json
{
  "to": "contact@exafluence.com",
  "sourcePage": "/contact",
  "data": { "kind": "partner", "...": "validated form fields" }
}
```

The service must return JSON `{ "success": true, "id": "durable-submission-id" }` with a successful HTTP status only after a submission is durably accepted. A receipt does **not** prove an email reached the inbox. Return a non-2xx response on failure. Requests time out after 15 seconds and are not automatically retried.

Required server responsibilities:

1. Validate the entire request server-side with bounded lengths and the same form rules; browser validation is not a security boundary. The four schemas are in PartnerEnquiry, StudentEnquiry, IbmInstitutionalEnquiry and InstitutionBrochureForm. Brochure requests deliberately do not collect an email address or consent checkbox; preserve those fields unless a separate approved change is made.
2. Fix the notification recipient server-side to `contact@exafluence.com`; do not trust the incoming `to`, `sourcePage`, programme labels or other user-controlled fields.
3. Store accepted submissions or durably queue them, then notify the inbox through your approved email service. Keep secrets on the server. Escape any HTML notification content and validate email headers.
4. Configure permitted website origins, JSON POST/OPTIONS handling, request-size limits, abuse protection and any CORS response headers. Origin checks alone do not prevent bot submissions.
5. Establish retention, restricted staff access, backups, monitoring and retry handling. Define duplicate-submission handling for retries after timeouts.
6. Verify all four submissions end-to-end against the real service: persisted receipt, mailbox delivery, error handling and no unwanted brochure unlocks. No real delivery or storage has been verified here because no service URL was supplied.

## Existing external dependencies

| Service / dependency | Current use | Keep or migrate |
| --- | --- | --- |
| `@supabase/supabase-js` | Programme recommender invokes the managed `programme-recommend` function | Retain the approved managed service and its public configuration, or implement and wire an independent compatible recommendation endpoint. Static hosting does not move the function. |
| Managed recommendation function | `supabase/functions/programme-recommend/index.ts` executes AI calls | Remains on Lovable Cloud unless separately migrated. Its source is included for review; it is not part of `dist.zip`. |
| Lovable AI Gateway | Recommendation function uses server-only `LOVABLE_API_KEY` with AI SDK npm imports | Continue using the existing managed function, or migrate to your own server-held AI provider credentials and billing. Never copy the managed key into frontend files. |
| Brand wording checker | Local rules work; AI review endpoint is blank | Local rules need no service. AI review and admin access still require a separately implemented, protected service. Earlier AWS comments describe a superseded destination. |
| Database / authentication | Empty Drizzle schema and journal; no application submissions table in source | No enquiry data migration is evidenced by source. Hosted auth/storage settings and any remote data were not audited and must be inventoried separately. Preview auth helpers are managed files, not a production admin login. |
| Asset storage | Seven `.asset.json` pointers refer to uploaded diagrams, emblem and brochures | The exported source and build include these bytes at their existing public paths. The editor still uses managed assets. Retain the included public files when serving the build. |
| Google Fonts | Existing Google Sans Flex / Figtree loading | Keep Google Fonts access or arrange a licensed self-hosted copy without changing typography. |
| Other external links/images | Source includes a Pexels image URL helper and outbound partner, research and social links | Review external availability and licensing. Outbound links are not backend services. |
| `lovable-tagger`, Playwright helper references, Drizzle tooling | Development/test tooling | Not deployed server services; the tagger is disabled in production builds. Managed Playwright helpers may need your team's local test setup. |

The current production ZIP retains the existing managed recommender's public configuration; it is **not independent of Lovable Cloud / Lovable AI**. The source environment example intentionally has no populated account values. Static pages and local keyword matching are not evidence that the hosted AI service will accept requests from a new origin: verify it separately.

## Infrastructure checklist: separately required

- Hosting account/project setup, production domain ownership, DNS, TLS, SPA deep-link fallback, cache policy and security headers. No Cloudflare deployment instructions or infrastructure files are generated in this handoff because that deployment path is unsupported here.
- A real enquiry endpoint implementing the contract above, restricted data access, retention/backup policy and delivery monitoring.
- Email provider/account, verified sender domain, SPF/DKIM/DMARC records as required by that provider, delivery permissions and an inbox test at `contact@exafluence.com`.
- Public build-time service values; all server-side secrets must be configured separately through your infrastructure's secret management.
- A decision to retain or migrate managed AI recommendations, provider billing, endpoint compatibility, allowed origins and operational tests. Local matching already exists but disabling AI is a separate functional decision.
- Review dependency advisories before release. The production dependency scan flagged React Router, Lodash via Recharts, and Zod in the editor's Bun resolution; consult the release's npm audit report too. This handoff is not a security certification or a dependency-major-version migration.
- Real-device testing and final production checks. Layout/content files have not been restyled for this handoff.

## Acceptance evidence

See `VERIFICATION.md` for exact install, test, build and archive results. Client tests use HTTP-response fixtures; they are not proof of Cloudflare persistence or real mailbox delivery. The unconfigured live preview should show an enquiry error, never a success.