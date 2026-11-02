import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import SvuCareerRecords from "@/components/site/SvuCareerRecords";
import { svuInternshipIntroduction } from "@/data/svuCareer";

const renderPage = () => render(<SvuCareerRecords kind="internships" />);

const introLines = (container: HTMLElement) =>
  [...container.querySelectorAll(".svu-career-records > h1, .svu-career-records > p:not(.svu-career-count)")]
    .map(element => element.textContent?.trim() ?? "");

describe("SVU Internships introduction (client brief, 2 November 2026)", () => {
  it("shows the approved heading, subtitle and two paragraphs", () => {
    const intro = introLines(renderPage().container);
    expect(intro[0]).toBe("Student Internships");
    expect(intro[1]).toBe("From academic foundations to research and industry experience.");
    expect(intro.slice(2)).toEqual([
      "Exfedu proudly celebrates its students who have secured internships at NARL, Gadanki; SHAR, Sriharikota; and Vikram Sarabhai Space Centre, Thiruvananthapuram. Their achievements reflect an important step towards applying technical knowledge beyond the classroom.",
      "These internships provide opportunities to engage with practical challenges, develop analytical thinking and gain experience in research and professional environments.",
    ]);
    expect(svuInternshipIntroduction.paragraphs).toEqual(intro.slice(2));
  });

  it("keeps batches, years and guaranteed-outcome claims out of the introduction", () => {
    const intro = introLines(renderPage().container).join(" ");
    expect(intro).not.toMatch(/batch/i);
    expect(intro).not.toMatch(/\b(19|20)\d{2}\b/);
    expect(intro).not.toMatch(/guarantee|assur|ensure/i);
  });

  it("keeps all records without search or batch filter, and carrying no brochure", () => {
    const { container } = renderPage();
    expect(container.textContent).not.toMatch(/brochure|download/i);
    expect(container.querySelector("input[aria-label='Search internships']")).toBeNull();
    expect(container.querySelector("[aria-label='Student Internships batch']")).toBeNull();
    expect(container.textContent).not.toMatch(/of 11 records/);
    expect(container.querySelectorAll("[data-label='Batch']").length).toBe(11);
  });
});
