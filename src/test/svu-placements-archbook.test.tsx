import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";
import { svuPlacements } from "@/data/svuCareer";
import SvuCareerRecords from "@/components/site/SvuCareerRecords";

/* Archbook landing-page brief (client, 4 November 2026): the placements page follows the
   template's presentation — a wash hero with two buttons, a copy/artwork split, a navy record
   band and the records as cards. All eleven approved records and their wording are unchanged. */
const placements = () => render(<MemoryRouter><SvuCareerRecords kind="placements" /></MemoryRouter>);

describe("SVU placements on the Archbook model", () => {
  it("keeps the internship destination available from placements", () => {
    const { container } = placements();
    const hero = container.querySelector(".svu-career-title-card");
    expect(hero?.textContent).toContain("Student Placements");
    expect(hero?.querySelector(".svu-career-subtitle")?.textContent).toBe("Career outcomes in data science, artificial intelligence and technology.");
    expect(hero?.querySelector("a.svu-hero-secondary")?.getAttribute("href")).toBe("/collaboration-network/svu/innovations#internships");
  });

  it("pairs the approved introduction with the collaboration artwork", () => {
    const { container } = placements();
    const split = container.querySelector(".svu-pl-split");
    expect(split?.querySelector("p")?.textContent).toContain("SVU–Exafluence MS Data Science programme");
    expect(split?.querySelector("img")?.getAttribute("src")).toContain("svu-laptop-dashboard-v2");
    expect(split?.querySelector("a.svu-pl-link")?.getAttribute("href")).toBe("/collaboration-network/svu#programmes");
  });

  it("rules the records under a navy band and keeps all eleven approved records", () => {
    const { container } = placements();
    expect(container.querySelector(".svu-pl-band .svu-career-records-heading")?.textContent).toBe("Placement Records");
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
  });

  it("leaves the internships page on its own layout", () => {
    const { container } = render(<MemoryRouter><SvuCareerRecords kind="internships" /></MemoryRouter>);
    expect(container.querySelector(".svu-pl-split")).toBeNull();
    expect(container.querySelector(".svu-pl-band")).toBeNull();
    expect(container.querySelector(".svu-intern-card")).not.toBeNull();
    expect(container.querySelector(".svu-internship-update")).not.toBeNull();
  });
});
