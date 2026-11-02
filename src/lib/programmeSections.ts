import { Award, BookOpen, CalendarDays, Clock3, GraduationCap, Layers, Sparkles, type LucideIcon } from "lucide-react";
import { PENDING, type Programme, type Tone } from "@/data/site";

/** Approved programme detail reading order (client, 29 October 2026):
 * Overview → Eligibility → Duration & Delivery → Programme Features → Curriculum →
 * Admission Process → Brochure & Enquiry. Fields with no verified source render PENDING. */
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

export { PENDING };
