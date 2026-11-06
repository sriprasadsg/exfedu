import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import PartnerEnquiry, { enquirySchema } from "@/components/home/PartnerEnquiry";

afterEach(cleanup);

describe("sequential partner enquiry", () => {
  it("hides completed fields and preserves their answers when returning", () => {
    render(<PartnerEnquiry />);
    fireEvent.change(screen.getByLabelText("Contact name"), { target: { value: "Example Partner" } });
    fireEvent.click(screen.getByRole("button", { name: "Continue" }));
    expect(screen.queryByLabelText("Contact name")).not.toBeInTheDocument();
    expect(screen.getByLabelText("Organisation / Institution")).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "Previous field" }));
    expect(screen.getByLabelText("Contact name")).toHaveValue("Example Partner");
  });

  it("does not advance before the current required field is valid", () => {
    render(<PartnerEnquiry />);
    fireEvent.click(screen.getByRole("button", { name: "Continue" }));
    expect(screen.getByLabelText("Contact name")).toBeInTheDocument();
    expect(screen.queryByLabelText("Organisation / Institution")).not.toBeInTheDocument();
  });

  it("requires a phone number and contact permission", () => {
    const answers = { name: "Example", organisation: "Example Institution", email: "partner@example.org", phone: "+91 9876543210", location: "Chittoor", type: "Academic Collaboration", message: "Research collaboration", consent: "on" };
    expect(enquirySchema.safeParse(answers).success).toBe(true);
    expect(enquirySchema.safeParse({ ...answers, phone: "" }).success).toBe(false);
    expect(enquirySchema.safeParse({ ...answers, consent: "" }).success).toBe(false);
  });
});