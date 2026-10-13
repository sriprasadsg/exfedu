# Architecture rules
- Render the homepage infographic through a dedicated component importing its CDN asset pointer, preserving the supplied artwork without rebuilding its geometry.
- Partner enquiry runs in test mode: validate with zod, simulate submission, show success/error, never persist or send. Production delivery will be Exafluence AWS Cloud (not Lovable Cloud); keep endpoint, storage, email routing and env vars configurable via enquiryConfig in PartnerEnquiry.tsx.
- All pages, programmes, hub arms and gallery photos are data in src/data/site.ts rendered by shared block components via one catch-all route, so approved content can be added without new layouts.
- Unconfirmed claims render as "Approved Content Required" placeholders; never invent partnership, placement, ranking or certification content.
