import { z } from "zod";

export const OWNER_EMAIL = "contact@exafluence.com";
const line = (max: number, min = 1) => z.string().trim().min(min).max(max).regex(/^[^\r\n\u0000]*$/);
const email = line(255).email();
const phone = line(20, 0).refine(v => v === "" || /^\+?[0-9\s\-()]{7,20}$/.test(v));
const message = z.string().trim().min(1).max(1000);
const consent = z.literal("on");

const dataSchema = z.discriminatedUnion("kind", [
  z.object({ kind: z.literal("partner"), name: line(100), organisation: line(150), email, phone,
    type: z.enum(["Academic Collaboration", "Industry Collaboration", "Technology Collaboration", "Programme Partnership", "Research Collaboration", "Internship / Placement Collaboration", "Other"]), message, consent }).strict(),
  z.object({ kind: z.literal("student-programme"), programme: z.enum(["masters-data-science", "pg-diploma-data-science", "python-ai-ml-genai", "data-visualization"]), programmeTitle: line(200).optional(),
    name: line(100), email, phone, status: z.enum(["Student", "Recent graduate", "Working professional", "Other"]), message, consent }).strict(),
  z.object({ kind: z.literal("ibm-institutional"), organisation: line(150), contactPerson: line(100), email,
    programmeInterest: z.enum(["Semester-Based Industry Learning", "Value-Added Courses", "Certificate Programme in Quantum Computing", "Project-Based Experiential Learning — PBEL", "Not sure yet"]),
    audience: z.enum(["Undergraduate students", "Postgraduate students", "Faculty development", "Working professionals", "Mixed group", "Other"]),
    participants: z.string().regex(/^[1-9][0-9]{0,4}$/), schedule: z.string().trim().max(200), consent }).strict(),
  z.object({ kind: z.literal("brochure"), name: line(100, 2), institution: line(150, 2), designation: line(100, 2), location: line(150, 2),
    notes: z.string().trim().max(1000).optional(), programme: line(200) }).strict(),
]);

export const enquiryRequestSchema = z.object({
  // Retain the existing frontend envelope, but never use it to select a recipient.
  to: z.literal(OWNER_EMAIL).optional(),
  sourcePage: line(500).startsWith("/"),
  data: dataSchema,
}).strict();
export type EnquiryRequest = z.infer<typeof enquiryRequestSchema>;

export function buildOwnerEmail(enquiry: EnquiryRequest, from: string) {
  const labels = { partner: "Partnership enquiry", "student-programme": "Student programme enquiry", "ibm-institutional": "IBM institutional enquiry", brochure: "Institutional brochure request" };
  const data = enquiry.data;
  const fields = Object.entries(data).filter(([key]) => key !== "kind")
    .map(([key, value]) => `${key}: ${value || "Not supplied"}`).join("\n");
  return {
    from, to: [OWNER_EMAIL], subject: `Exafluence Education — ${labels[data.kind]}`,
    text: `${labels[data.kind]}\nSource page: ${enquiry.sourcePage}\n\n${fields}`,
    ...("email" in data ? { reply_to: data.email } : {}),
  };
}