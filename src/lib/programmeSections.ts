import { Award, CalendarDays, FlaskConical, Gauge, GraduationCap, Presentation, Target, Users, type LucideIcon } from "lucide-react";
import { PENDING, type Programme, type Tone } from "@/data/site";
import { ibmFacts } from "@/data/ibm";

/** Approved programme detail reading order (client, 29 October 2026; amended
 * 4 November 2026): Overview → Eligibility → Admission Process → Enquiry.
 * "Duration & Delivery", "Features", any tools listing and the practical-learning
 * paragraph repeat the header facts, name specific products or restate the USP
 * block above, so they are not rendered as sections. Fields with no verified
 * source render PENDING. */
export type DetailSection = {
  title: string; icon: LucideIcon; tone: Tone;
  content?: string; items?: string[]; sub?: { label: string; items: string[] }; note?: string;
};

export const programmeDetailSections = (p: Programme): DetailSection[] => ([
  // The overview already opens the page header, so it is not repeated here.
  // The practical-learning wording is carried by the USP block above (client, 4 Nov 2026).
  { title: "Eligibility", icon: GraduationCap, tone: "teal", content: p.eligibility },
  { title: "Admission Process", icon: CalendarDays, tone: "teal", content: p.admissions },
  // Shown only with approved wording; never a placeholder or invented certificate.
  p.recognition ? { title: "Joint Certification on Completion", icon: Award, tone: "amber", content: p.recognition } : false,
] as (DetailSection | false)[]).filter((section): section is DetailSection => !!section);

/** IBM programme pages (client brief, 2 November 2026; amended 4 November 2026):
 * Overview → Learning Outcomes → Eligibility & Prerequisites →
 * Assessment & Certification → Enquiry. "Duration & Delivery", "Features" and
 * the tools-and-practical-activities listing repeat the header facts or name
 * specific products, so they are not rendered as sections.
 * A section the approved leaflets do not support is left out rather than filled in,
 * and the teaching role stays worded separately from the certificate issuer. */
export const ibmProgrammeSections = (p: Programme): DetailSection[] => {
  const facts = ibmFacts(p.slug);
  const sections: (DetailSection | false)[] = [
    facts.outcomes ? { title: "Learning Outcomes", icon: Target, tone: "teal", items: facts.outcomes } : false,
    p.eligibility ? { title: "Eligibility & Prerequisites", icon: GraduationCap, tone: "teal", content: p.eligibility } : false,
    facts.certification ? { title: "Assessment & Certification", icon: Award, tone: "amber", content: [facts.delivery, facts.certification].filter(Boolean).join(" ") } : false,
  ];
  return sections.filter((section): section is DetailSection => !!section);
};

/** USP presentation for SVU programme pages (client brief, 2 November 2026): the
 * programme's strengths are read immediately below the introduction, before the
 * detailed programme information. The 80 : 20 split renders only for programmes
 * whose approved source states it, so no page claims a ratio the university has
 * not confirmed. */
export type UspPoint = { label: string; icon: LucideIcon; tone: Tone; wide?: boolean };
export const svuProgrammeUsp = (p: Programme): UspPoint[] => {
  const points: UspPoint[] = [
    { label: "Industry Mentoring", icon: Users, tone: "teal" },
    { label: "Case Studies", icon: Presentation, tone: "violet" },
    { label: "Applied Projects", icon: FlaskConical, tone: "amber" },
    { label: "Final-Semester Capstone", icon: GraduationCap, tone: "blue" },
  ];
  if (/80% practical/i.test(`${p.features?.join(" ") ?? ""} ${p.practical ?? ""}`)) {
    points.unshift({ label: "80% Practical Learning · 20% Theoretical Foundations", icon: Gauge, tone: "blue", wide: true });
  }
  return points;
};

export { PENDING };
