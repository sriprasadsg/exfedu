import { describe, expect, it, vi } from "vitest";
import { enquirySchema } from "@/components/home/PartnerEnquiry";
import { studentEnquirySchema } from "@/components/site/StudentEnquiry";
import { institutionalSchema } from "@/components/site/IbmInstitutionalEnquiry";
import { institutionBrochureSchema } from "@/components/site/InstitutionBrochureForm";
import { enquiryRequestSchema } from "../../infrastructure/enquiry-worker/schema";
import { handleRequest } from "../../infrastructure/enquiry-worker/worker";

const contact = { email: "test@example.org", phone: "+91 9876543210", location: "Chittoor" };
const forms = [
  { schema: enquirySchema, affiliation: "organisation", data: { kind: "partner", ...contact, name: "Test Person", organisation: "Test Institution", type: "Academic Collaboration", message: "Test enquiry", consent: "on" } },
  { schema: studentEnquirySchema, affiliation: "institution", data: { kind: "student-programme", ...contact, name: "Test Person", institution: "Test Institution", programme: "masters-data-science", status: "Student", message: "Test enquiry", consent: "on" } },
  { schema: institutionalSchema, affiliation: "organisation", data: { kind: "ibm-institutional", ...contact, organisation: "Test Institution", contactPerson: "Test Person", programmeInterest: "Value-Added Courses", audience: "Undergraduate students", participants: "40", schedule: "", consent: "on" } },
  { schema: institutionBrochureSchema, affiliation: "institution", data: { kind: "brochure", ...contact, name: "Test Person", institution: "Test Institution", designation: "Dean", programme: "M.S. Data Science", notes: "" } },
];
const envelope = (data: unknown) => ({ sourcePage: "/contact", data });

for (const { schema, affiliation, data } of forms) {
  describe(`${data.kind} mandatory fields`, () => {
    it("accepts all four supplied fields on website and server", () => {
      expect(schema.safeParse(data).success).toBe(true);
      expect(enquiryRequestSchema.safeParse(envelope(data)).success).toBe(true);
    });
    it.each(["phone", "email", affiliation, "location"])("requires %s on website and server", async field => {
      for (const value of [undefined, "", "   "]) {
        const invalid = { ...data, [field]: value };
        expect(schema.safeParse(invalid).success).toBe(false);
        const send = vi.fn<typeof fetch>();
        const response = await handleRequest(new Request("https://worker.example.org/api/enquiries", {
          method: "POST", headers: { Origin: "https://exfedu.exafluence.workers.dev", "Content-Type": "application/json" }, body: JSON.stringify(envelope(invalid)),
        }), { ALLOWED_ORIGINS: "https://exfedu.exafluence.workers.dev", EMAIL_FROM: "forms@example.org", RESEND_API_KEY: "test-only" }, send);
        expect(response.status).toBe(400);
        expect(send).not.toHaveBeenCalled();
      }
    });
    it.each([
      ["phone", "-------"], ["phone", "123"], ["phone", "1234567890123456"], ["phone", "+91\n9876543210"],
      ["email", "invalid"], ["email", "test@example.org\nBcc: attacker@example.org"],
      [affiliation, "x".repeat(151)], ["location", "x".repeat(151)], ["location", "City\nInjected"],
    ])("rejects invalid %s in both validators", (field, value) => {
      const invalid = { ...data, [field]: value };
      expect(schema.safeParse(invalid).success).toBe(false);
      expect(enquiryRequestSchema.safeParse(envelope(invalid)).success).toBe(false);
    });
  });
}