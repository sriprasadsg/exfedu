# Quantum programme developer notes

Verified 17 November 2026 from the **original** SVU Lovable project `63a3fc70-96ab-4339-9758-b3ba694ce9f1`, read-only snapshot commit `acbde4b7`.

- `src/pages/landing/programmes.ts`: Quantum record (lines 54–70), highlights, duration and admission rows (lines 14–21). The requested display mode `Hybrid (Offline / Online)` normalises the source's `Hybrid (online / offline)` without changing meaning.
- `src/pages/landing/admissions-content.ts`: domestic eligibility (B.Sc. Mathematics with the listed two subjects; B.Tech. CSE/IT/Electronics; BCA; UGC-recognised university) and online entrance examination (50 MCQs, 50 marks, no negative marking). These are domestic criteria, not an international-equivalence policy.
- `src/pages/landing/student-information.tsx`: confirms the admission email `admissions@svudatascience.in`.

Only Quantum facts were copied; unrelated source diplomas, institutions, routing and forms were not imported. Programme details are publicly attributed to SVU, but project IDs, snapshots and technical provenance remain developer-only. No source-preview or duplicate-site URLs are admission destinations.

## Implementation rule

Keep the Quantum offering in the shared programme catalogue and canonical SVU detail template; use explicit programme enquiry/admission metadata to avoid inheriting unverified generic strengths or the existing contact-form destination. The shared image-free feature band is reused in `/programmes` and SVU's `#programmes` area so facts and routes stay aligned. Existing enquiry service configuration is unchanged.