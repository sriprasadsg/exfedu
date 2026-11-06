import { describe, it, expect } from "vitest";
import { institutionBrochureSchema } from "@/components/site/InstitutionBrochureForm";
const ok = { name: "Asha Rao", institution: "ABC College", email: "test@example.org", phone: "+91 9876543210", designation: "Dean", location: "Chennai, Tamil Nadu", notes: "" };
describe("institutional brochure request", () => {
  it("accepts name, institution, designation and location with notes optional", () => {
    expect(institutionBrochureSchema.safeParse(ok).success).toBe(true);
  });
  it.each(["name", "email", "phone", "institution", "designation", "location"])("requires %s", key => {
    expect(institutionBrochureSchema.safeParse({ ...ok, [key]: "" }).success).toBe(false);
  });
});
