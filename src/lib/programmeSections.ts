import { Award, BookOpen, CalendarDays, Clock3, Cpu, GraduationCap, Layers, Sparkles, Target, type LucideIcon } from "lucide-react";
import { PENDING, type Programme, type Tone } from "@/data/site";
import { ibmFacts } from "@/data/ibm";

/** Approved programme detail reading order (client, 29 October 2026):
 * Overview → Eligibility → Duration & Delivery → Features → Curriculum →
 * Admission Process → Brochure & Enquiry. "Features" is the label on every
 * partner's programme pages. Fields with no verified source render PENDING. */
export type DetailSection = {
  title: string; icon: LucideIcon; tone: Tone;
  content?: string; items?: string[]; sub?: { label: string; items: string[] }; note?: string;
};

export const programmeDetailSections = (p: Programme): DetailSection[] => [
  { title: "Overview", icon: BookOpen, tone: "blue", content: p.overview, note: p.practical },
  { title: "Eligibility", icon: GraduationCap, tone: "teal", content: p.eligibility },
  { title: "Duration & Delivery", icon: Clock3, tone: "amber", content: `${p.duration} · ${p.delivery}` },
  { title: "Features", icon: Sparkles, tone: "violet", items: p.features },
  {
    title: "Curriculum", icon: Layers, tone: "blue", items: p.curriculum,
    sub: p.tools?.length ? { label: "Tools and technologies", items: p.tools } : undefined,
  },
  { title: "Admission Process", icon: CalendarDays, tone: "teal", content: p.admissions },
  { title: "Joint Certification on Completion", icon: Award, tone: "amber", content: p.recognition },
];

/** IBM programme pages (client brief, 2 November 2026): Overview → Learning Outcomes →
 * Eligibility & Prerequisites → Curriculum → Tools & Practical Activities →
 * Duration & Delivery → Features → Assessment & Certification → Enquiry.
 * A section the approved leaflets do not support is left out rather than filled in,
 * and the teaching role stays worded separately from the certificate issuer. */
export const ibmProgrammeSections = (p: Programme): DetailSection[] => {
  const facts = ibmFacts(p.slug);
  const sections: (DetailSection | false)[] = [
    { title: "Overview", icon: BookOpen, tone: "blue", content: p.overview },
    facts.outcomes ? { title: "Learning Outcomes", icon: Target, tone: "teal", items: facts.outcomes } : false,
    p.eligibility ? { title: "Eligibility & Prerequisites", icon: GraduationCap, tone: "teal", content: p.eligibility } : false,
    p.curriculum?.length ? { title: "Curriculum", icon: Layers, tone: "blue", items: p.curriculum } : false,
    p.tools?.length || p.practical ? { title: "Tools & Practical Activities", icon: Cpu, tone: "violet", items: p.tools, note: p.practical } : false,
    { title: "Duration & Delivery", icon: Clock3, tone: "amber", content: `${p.duration} · ${p.delivery}` },
    p.features?.length ? { title: "Features", icon: Sparkles, tone: "violet", items: p.features } : false,
    facts.certification ? { title: "Assessment & Certification", icon: Award, tone: "amber", content: [facts.delivery, facts.certification].filter(Boolean).join(" ") } : false,
  ];
  return sections.filter((section): section is DetailSection => !!section);
};

export { PENDING };
