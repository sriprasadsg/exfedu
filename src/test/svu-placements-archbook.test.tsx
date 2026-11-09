import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";
import { svuPlacements } from "@/data/svuCareer";
import SvuCareerRecords from "@/components/site/SvuCareerRecords";

/* Jobaaj Hall of Fame reference (client, 9 November 2026): a factual hero, supplied-portrait
   collage, organisation strip and compact achiever wall. No testimonials or metrics are invented. */
const placements = () => render(<MemoryRouter><SvuCareerRecords kind="placements" /></MemoryRouter>);

describe("SVU placements on the Hall of Fame model", () => {
  it("uses fresh factual wording and keeps both programme and internship destinations", () => {
    const { container } = placements();
    const hero = container.querySelector(".svu-hof-hero");
    expect(hero?.querySelector("#svu-hof-title")?.textContent).toBe("From learning tocareer momentum.");
    expect(hero?.querySelector(".svu-hof-lead")?.textContent).toContain("SVU–Exafluence MS Data Science programme");
    expect(hero?.querySelector("a.svu-hof-primary")?.getAttribute("href")).toBe("/collaboration-network/svu#programmes");
    expect(hero?.querySelector("a.svu-hof-secondary")?.getAttribute("href")).toBe("/collaboration-network/svu/innovations#internships");
    expect(hero?.querySelector(".svu-hof-facts")?.textContent).toContain("Data Science & AI");
    expect(hero?.querySelector(".svu-hof-facts")?.textContent).toContain("2023–2026");
  });

  it("builds the complete portrait display and organisation strip only from approved records", () => {
    const { container } = placements();
    const featured = [...container.querySelectorAll(".svu-hof-mini")];
    expect(featured).toHaveLength(svuPlacements.length);
    featured.forEach(card => {
      const student = card.querySelector("img")?.getAttribute("alt")?.replace("Portrait of ", "")
        ?? card.querySelector(".svu-hof-mini-fallback")?.getAttribute("aria-label")?.replace("Photograph not supplied for ", "");
      expect(svuPlacements.some(record => record.student === student)).toBe(true);
      expect(card.textContent).toBe("");
      expect(card.querySelector("strong, div")).toBeNull();
      if (student === "K Mounika") {
        expect(card.querySelector("img")).toBeNull();
        expect(card.querySelector(".svu-hof-mini-fallback")?.getAttribute("aria-label")).toBe("Photograph not supplied for K Mounika");
      } else {
        expect(card.querySelector("img")?.getAttribute("src")).toContain("/src/assets/placed-students/white/");
      }
    });
    expect(container.querySelector(".svu-hof-hero")?.textContent).not.toMatch(/\b(?:11|eleven)\b/i);
    const organisations = [...container.querySelectorAll(".svu-hof-organisations li")].map(item => item.textContent);
    expect(organisations).toHaveLength(3);
    organisations.forEach(organisation => expect(svuPlacements.some(record => record.organisation === organisation)).toBe(true));
  });

  it("keeps all eleven approved records in the achiever wall", () => {
    const { container } = placements();
    const rows = [...container.querySelectorAll(".svu-pl-card")];
    expect(rows).toHaveLength(svuPlacements.length);
    const rendered = rows.map(row => ({
      student: row.querySelector("h3")?.textContent ?? "",
      role: row.querySelector(".svu-outcome-role")?.textContent ?? "",
      org: row.querySelector(".svu-outcome-org")?.textContent ?? "",
      batch: row.querySelector(".svu-outcome-batch")?.textContent ?? "",
    }));
    svuPlacements.forEach(record => {
      expect(rendered).toContainEqual({
        student: record.student,
        role: record.designation ?? "",
        org: record.organisation,
        batch: `Batch ${record.batch}`,
      });
    });
    expect(new Set(rendered.map(row => row.student)).size).toBe(svuPlacements.length);
    expect(container.querySelectorAll(".svu-pl-placed")).toHaveLength(0);
    expect(container.querySelector(".svu-hof-status")?.textContent).toContain("Placed");
  });

  it("leaves the internships page on its own layout", () => {
    const { container } = render(<MemoryRouter><SvuCareerRecords kind="internships" /></MemoryRouter>);
    expect(container.querySelector(".svu-hof-hero")).toBeNull();
    expect(container.querySelector(".svu-hof-wall")).toBeNull();
    expect(container.querySelector(".svu-intern-card")).not.toBeNull();
    expect(container.querySelector(".svu-internship-update")).not.toBeNull();
  });
});
