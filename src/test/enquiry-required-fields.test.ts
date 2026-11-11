import { describe, expect, it, vi } from "vitest";
import { enquirySchema } from "@/components/home/PartnerEnquiry";
import { studentEnquirySchema } from "@/components/site/StudentEnquiry";
import { institutionalSchema } from "@/components/site/IbmInstitutionalEnquiry";
import { institutionBrochureSchema } from "@/components/site/InstitutionBrochureForm";
import { enquiryRequestSchema } from "../../infrastructure/enquiry-worker/schema";
import { handleRequest } from "../../infrastructure/enquiry-worker/worker";

const contact = { email: "test@example.org", phone: "+91 9876543210", location: "Chittoor" };
const forms = [
  { schema: enquirySchema, affiliation: "organisation", required: ["phone", "email"], data: { kind: "partner", ...contact, name: "Test Person", organisation: "Test Institution", type: "Academic Collaboration", message: "Test enquiry", consent: "on" } },
  { schema: studentEnquirySchema, affiliation: "institution", required: ["phone", "email", "institution", "location"], data: { kind: "student-programme", ...contact, name: "Test Person", institution: "Test Institution", programme: "masters-data-science", status: "Student", message: "Test enquiry", consent: "on" } },
  { schema: institutionalSchema, affiliation: "organisation", required: ["phone", "email", "organisation", "location"], data: { kind: "ibm-institutional", ...contact, organisation: "Test Institution", contactPerson: "Test Person", programmeInterest: "Value-Added Courses", audience: "Undergraduate students", participants: "40", schedule: "", consent: "on" } },
  { schema: institutionBrochureSchema, affiliation: "institution", required: ["phone", "email", "institution", "location"], data: { kind: "brochure", ...contact, name: "Test Person", institution: "Test Institution", designation: "Dean", programme: "M.S. Data Science", notes: "" } },
];
const envelope = (data: unknown) => ({ sourcePage: "/contact", data });

describe("partner optional fields", () => {
  const partner = forms[0].data;
  it.each(["organisation", "location"])("accepts an empty %s on website and server", field => {
    const valid = { ...partner, [field]: "" };
    expect(enquirySchema.safeParse(valid).success).toBe(true);
    expect(enquiryRequestSchema.safeParse(envelope(valid)).success).toBe(true);
  });
});

for (const { schema, affiliation, required, data } of forms) {
  describe(`${data.kind} mandatory fields`, () => {
    it("accepts all four supplied fields on website and server", () => {
      expect(schema.safeParse(data).success).toBe(true);
      expect(enquiryRequestSchema.safeParse(envelope(data)).success).toBe(true);
    });
    it.each(required)("requires %s on website and server", async field => {
      for (const value of [undefined, "", "   "]) {
        const invalid = { ...data, [field]: value };
        expect(schema.safeParse(invalid).success).toBe(false);
        const send = vi.fn<typeof fetch>();
        const response = await handleRequest(new Request("https://worker.example.org/api/enquiries", {
          method: "POST", headers: { Origin: "https://exfedu.exafluence.workers.dev", "Content-Type": "application/json" }, body: JSON.stringify(envelope(invalid)),
        }), { ALLOWED_ORIGINS: "https://exfedu.exafluence.workers.dev", EMAIL_FROM: "contact@exafluence.com", M365_TENANT_ID: "11111111-1111-4111-8111-111111111111", M365_CLIENT_ID: "22222222-2222-4222-8222-222222222222", M365_CLIENT_SECRET: "test-only" }, send);
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