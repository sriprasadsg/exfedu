import { describe, it, expect } from "vitest";
import { recipientFor, buildEnquiryPayload } from "@/components/home/PartnerEnquiry";
describe("enquiry routing", () => {
  it("SkillShone page goes to contact@skillshone.com", () => expect(recipientFor("/skillshone")).toBe("contact@skillshone.com"));
  it("other pages go to contact@exafluence.com", () => expect(recipientFor("/collaboration-network/ibm")).toBe("contact@exafluence.com"));
  it("payload carries recipient", () => expect(buildEnquiryPayload({a:1}, "/skillshone").to).toBe("contact@skillshone.com"));
});
