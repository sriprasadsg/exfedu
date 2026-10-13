# Architecture rules
- Keep homepage hub positioning and connector geometry together in a dedicated infographic component so every section stays visibly connected to the central education brand.
- Hub arms declare their priority and single-line subtitle in shared site data, so desktop radial and tablet/mobile connected layouts use identical content.
- Partner enquiry is presentation-only until a delivery service is connected; never display a successful submission without sending or saving it.
- All pages, programmes, hub arms and gallery photos are data in src/data/site.ts rendered by shared block components via one catch-all route, so approved content can be added without new layouts.
- Unconfirmed claims render as "Approved Content Required" placeholders; never invent partnership, placement, ranking or certification content.
