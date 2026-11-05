# Release verification — 5 November 2026

## Passed

- Isolated clean npm installation: `npm ci`, Node.js 22.23.4 / npm 10.9.9; exit 0, 522 packages installed.
- Complete source test run: `npm test`; exit 0, 47 test files, 228 tests passed.
- Production build: `npm run build`; exit 0, Vite production output generated in 7.68 seconds.
- Real enquiry-client unit checks: missing configuration fails; payload is posted to the configured URL; only a successful response with a submission id is accepted; HTTP errors and missing receipts are rejected.
- Live desktop/phone form check: completed the partnership form with QA input; absent delivery configuration showed an error, retained the form, and displayed no success status. Phone width 390px had no horizontal overflow.
- Seven uploaded assets downloaded byte-for-byte from their existing published paths, matching advertised sizes/content types (23,668,541 bytes total). Included in source `public/` and the production output, not just remote pointers.
- Actual production output rendered in a browser: SVU overview loaded 39 images with no page errors; desktop/phone screenshots inspected, no phone horizontal overflow.
- Both ZIP archives were inspected for excluded files and passed ZIP integrity checks. The production ZIP has 58 entries, including all seven uploaded assets; the source ZIP has 408 entries.

## Warnings / not verified

- The npm production audit reports **14 advisories: 12 high, 2 moderate, 0 critical** in the resolved dependency tree. Review the included `npm-production-audit.json`. Dependency security remediation/major-version migrations are not completed by this lockfile consistency fix.
- Build emits a large-JavaScript-chunk warning (about 931 kB minified / 270 kB gzip). Build succeeds; no code-splitting/design refactor was introduced.
- Tests emit existing React Router future-flag notices and jsdom browser-method warnings; there were no failing tests.
- No Cloudflare resources, deployment configuration, hosting, backend persistence or email delivery were created or verified.
- No enquiry service URL has been supplied. **Forms are not operational for real leads until infrastructure is configured.** The production ZIP intentionally fails closed for enquiries.
- Managed AI/service authorization from a future hosting origin, hosted account settings and remote data inventory remain unverified.
- The source release excludes `.git` at every depth, `.env`, editor metadata, dependencies, alternate Bun locks, generated TypeScript build information and build output. The separate production archive contains build output only. Existing public managed service configuration is compiled into the production JavaScript; no private key is embedded.
- Website presentation/styles and approved content were not changed; only enquiry delivery/status handling and package lock consistency were modified.

See HANDOFF.md for the service contract and infrastructure checklist. Passing client tests is not proof of email delivery.