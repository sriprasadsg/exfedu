# Architecture rules
- Render the homepage infographic through a dedicated component importing its CDN asset pointer, preserving the supplied artwork without rebuilding its geometry.
- Partner enquiry is presentation-only until a delivery service is connected; never display a successful submission without sending or saving it.
- All pages, programmes, hub arms and gallery photos are data in src/data/site.ts rendered by shared block components via one catch-all route, so approved content can be added without new layouts.
- Unconfirmed claims render as "Approved Content Required" placeholders; never invent partnership, placement, ranking or certification content.
