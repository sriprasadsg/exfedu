import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";
import ProgrammeDetail from "@/components/site/ProgrammeDetail";
import { programmes } from "@/data/site";
import { svuProgrammeUsp } from "@/lib/programmeSections";
import { svuSectionPath } from "@/lib/programmeNavigation";

const msds = programmes.find(p => p.slug === "masters-data-science")!;
const diploma = programmes.find(p => p.slug === "python-ai-ml-genai")!;

const renderPage = (programme: typeof msds) =>
  render(<MemoryRouter><ProgrammeDetail programme={programme} /></MemoryRouter>);

const headings = (container: HTMLElement) =>
  [...container.querySelectorAll(".programme-detail-section h2")].map(h => h.textContent?.trim());

const uspText = (programme: typeof msds) =>
  renderPage(programme).container.querySelector(".programme-usp")?.textContent ?? "";

describe("SVU programme USP presentation (client brief, 2 November 2026)", () => {
  it("opens with Built Around Practical Learning before the details", () => {
    const { container } = renderPage(msds);
    expect(headings(container)[0]).toBe("Built Around Practical Learning");
    expect(headings(container)).not.toContain("Overview");
  });

  it("lists all five strengths where the 80:20 split is confirmed", () => {
    expect(svuProgrammeUsp(msds).map(point => point.label)).toEqual([
      "80% Practical Learning · 20% Theoretical Foundations",
      "Industry Mentoring",
      "Case Studies",
      "Applied Projects",
      "Final-Semester Capstone",
    ]);
    expect(uspText(msds)).toContain("80% Practical Learning · 20% Theoretical Foundations");
  });

  it("keeps the unconfirmed 80:20 split off other SVU programmes", () => {
    const usp = uspText(diploma);
    expect(usp).not.toContain("80%");
    expect(usp).toContain("Industry Mentoring");
    expect(usp).toContain("Final-Semester Capstone");
  });

  it("ends the USP block with a link to student projects", () => {
    const { container } = renderPage(diploma);
    const link = container.querySelector<HTMLAnchorElement>(".programme-usp a");
    expect(link?.textContent).toContain("Explore Student Projects");
    expect(link?.getAttribute("href")).toBe(svuSectionPath("projects-research"));
  });

  it("offers the approved brochure on SVU programme pages, without a source link", () => {
    const { container } = renderPage(msds);
    expect(container.textContent).toMatch(/Download Brochure/);
    expect(container.textContent).not.toMatch(/Programme source/);
    expect(container.textContent).toContain("Enquire Now");
  });
});
