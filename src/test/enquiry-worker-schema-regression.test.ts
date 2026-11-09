import { describe, expect, it } from "vitest";
import { enquiryRequestSchema } from "../../infrastructure/enquiry-worker/schema";

const shared = {
  organisation: "Test Institution",
  contactPerson: "Test Person",
  email: "test@example.org",
  phone: "+91 9876543210",
  location: "Chittoor",
  audience: "Undergraduate students",
  participants: "40",
  schedule: "",
  consent: "on",
};

const envelope = (data: unknown) => ({
  to: "contact@exafluence.com",
  sourcePage: "/collaboration-network/ibm",
  data,
});

describe("IBM enquiry contract compatibility", () => {
  it("accepts current programme titles supplied by the IBM programme catalogue", () => {
    const result = enquiryRequestSchema.safeParse(envelope({
      kind: "ibm-institutional",
      ...shared,
      programmeInterest: "A newly published IBM programme title",
    }));

    expect(result.success).toBe(true);
  });

  it("accepts the optional empty schedule shown by the IBM form", () => {
    const result = enquiryRequestSchema.safeParse(envelope({
      kind: "ibm-institutional",
      ...shared,
      programmeInterest: "Value-Added Courses",
    }));

    expect(result.success).toBe(true);
  });

  it("continues accepting brochure forms with optional empty notes", () => {
    const result = enquiryRequestSchema.safeParse(envelope({
      kind: "brochure",
      name: "Test Person",
      institution: "Test Institution",
      email: "test@example.org",
      phone: "+91 9876543210",
      designation: "Dean",
      location: "Chittoor",
      notes: "",
      programme: "M.S. Data Science",
    }));

    expect(result.success).toBe(true);
  });
});
