import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Contact from "@/pages/Contact";
import ProgrammeDetail from "@/components/site/ProgrammeDetail";
import { programmes } from "@/data/site";
import { privacyPolicy, termsAndConditions } from "@/data/legal";

const at = (url: string) => render(<MemoryRouter initialEntries={[url]}><Contact /></MemoryRouter>);

describe("Refinement pass (3 November 2026)", () => {
  it("opens the student form with the selected programme kept", () => {
    const p = programmes.find(x => x.organisation === "SVU")!;
    at(`/contact?programme=${p.slug}`);
    expect(screen.getByRole("form", { name: "Student programme enquiry" })).toBeTruthy();
    expect(screen.getByText(new RegExp(`Selected programme: ${p.title}`))).toBeTruthy();
    expect(screen.queryByRole("form", { name: "Partner enquiry" })).toBeNull();
  });
  it("sends IBM and institution enquiries to the institutional form", () => {
    const ibm = programmes.find(x => x.organisation === "IBM")!;
    at(`/contact?programme=${ibm.slug}`);
    expect(screen.getByRole("form", { name: "Partner enquiry" })).toBeTruthy();
  });
  it("never shows a placeholder certification section", () => {
    const missing = programmes.find(x => !x.recognition && x.organisation !== "IBM")!;
    const { container } = render(<MemoryRouter><ProgrammeDetail programme={missing} /></MemoryRouter>);
    expect(container.textContent).not.toContain("Approved Content Required");
    expect(container.textContent).not.toContain("Joint Certification on Completion");
  });
  it("dates both policies 2 November 2026", () => {
    expect(privacyPolicy.lastUpdated).toBe("2 November 2026");
    expect(termsAndConditions.lastUpdated).toBe("2 November 2026");
  });
});
