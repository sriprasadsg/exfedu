import { z } from "zod";

export const OWNER_EMAIL = "contact@exafluence.com";
const line = (max: number, min = 1) => z.string().trim().min(min).max(max).regex(/^[^\r\n\u0000]*$/);
const email = line(255).email();
const phone = line(20).regex(/^\+?[0-9 ()-]+$/).refine(v => {
  const digits = v.replace(/\D/g, "").length;
  return digits >= 7 && digits <= 15;
});
const optionalLine = (max: number) => z.string().trim().max(max);
const message = z.string().trim().min(1).max(1000);
const consent = z.literal("on");

const dataSchema = z.discriminatedUnion("kind", [
  z.object({ kind: z.literal("partner"), name: line(100), organisation: line(150), email, phone, location: line(150),
    type: z.enum(["Academic Collaboration", "Industry Collaboration", "Technology Collaboration", "Programme Partnership", "Research Collaboration", "Internship / Placement Collaboration", "Other"]), message, consent }).strict(),
  z.object({ kind: z.literal("student-programme"), programme: z.enum(["masters-data-science", "pg-diploma-data-science", "python-ai-ml-genai", "data-visualization"]), programmeTitle: line(200).optional(),
    name: line(100), email, phone, institution: line(150), location: line(150), status: z.enum(["Student", "Recent graduate", "Working professional", "Other"]), message, consent }).strict(),
  z.object({ kind: z.literal("ibm-institutional"), organisation: line(150), contactPerson: line(100), email, phone, location: line(150),
    // Programme choices are sourced dynamically from the approved IBM catalogue on the website.
    programmeInterest: line(200),
    audience: z.enum(["Undergraduate students", "Postgraduate students", "Faculty development", "Working professionals", "Mixed group", "Other"]),
    participants: z.string().trim().regex(/^[1-9][0-9]{0,4}$/), schedule: optionalLine(200), consent }).strict(),
  z.object({ kind: z.literal("brochure"), name: line(100, 2), institution: line(150), email, phone, designation: line(100, 2), location: line(150),
    notes: optionalLine(1000).optional(), programme: line(200) }).strict(),
]);

export const enquiryRequestSchema = z.object({
  // The recipient remains fixed server-side; retain the legacy envelope for compatibility.
  to: z.literal(OWNER_EMAIL).optional(),
  sourcePage: line(500).startsWith("/"),
  data: dataSchema,
}).strict();
export type EnquiryRequest = z.infer<typeof enquiryRequestSchema>;

export function buildOwnerEmail(enquiry: EnquiryRequest, from: string) {
  const labels = { partner: "Partnership enquiry", "student-programme": "Student programme enquiry", "ibm-institutional": "IBM institutional enquiry", brochure: "Institutional brochure request" };
  const data = enquiry.data;
  const fields = Object.entries(data).filter(([key]) => key !== "kind")
    .map(([key, value]) => key + ": " + (value || "Not supplied")).join("\n");
  return {
    from, to: [OWNER_EMAIL], subject: "Exafluence Education — " + labels[data.kind],
    text: labels[data.kind] + "\nSource page: " + enquiry.sourcePage + "\n\n" + fields,
    ...("email" in data ? { reply_to: data.email } : {}),
  };
}
