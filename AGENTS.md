# Architecture rules
- Render homepage capabilities through a dedicated live component with content in site.ts and separate illustration assets; container queries switch its flow grid between radial, two-column and single-column layouts so text never depends on absolute positioning.
- Partner enquiry runs in test mode: validate with zod, simulate submission, show success/error, never persist or send. Production delivery will be Exafluence AWS Cloud (not Lovable Cloud); keep endpoint, storage, email routing and env vars configurable via enquiryConfig in PartnerEnquiry.tsx.
- All pages, programmes, hub arms and gallery photos are data in src/data/site.ts rendered by shared block components via one catch-all route, so approved content can be added without new layouts.
- Unconfirmed claims render as "Approved Content Required" placeholders; never invent partnership, placement, ranking or certification content.
- Brand-wording checker rules live in src/lib/brandCheck.ts; AI review only via brandCheckConfig.endpoint on Exafluence AWS so the AI key never reaches the browser.
- Website AI features call a project-hosted server function that holds the key; the browser never carries a key. Keep each feature's endpoint override in one config object so the same request can later be repointed to Exafluence-hosted delivery without touching UI code.
