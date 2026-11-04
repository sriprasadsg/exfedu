import { cleanup, render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { afterEach, describe, expect, it } from "vitest";
import SvuPages from "@/components/site/SvuPages";
import { svuLegacyRedirect, svuSectionPath } from "@/lib/programmeNavigation";

// Client brief, 4 November 2026: student innovations & internships and placements
// are separate pages, not sections stacked on one outcomes page.
afterEach(cleanup);

const open = (section: "innovations" | "placements") =>
  render(<MemoryRouter><SvuPages section={section} /></MemoryRouter>);

describe("SVU innovations and placements pages", () => {
  it("innovations & internships carries stories, the internship update and records, but no placements", () => {
    const { container } = open("innovations");
    expect(container.querySelector("h1")?.textContent).toBe("Student Innovations & Internships");
    expect(container.querySelector(".svu-internship-update")).not.toBeNull();
    expect(container.querySelectorAll("#internships .svu-intern-card")).toHaveLength(11);
    expect(container.querySelectorAll("#internships [data-label='Batch']").length).toBe(11);
    expect(container.querySelector(".svu-outcomes")).toBeNull();
  });

  it("placements carries only the placement records and no internship update", () => {
    const { container } = open("placements");
    expect(container.querySelector("h1")?.textContent).toBe("Placements");
    expect(container.querySelectorAll("#placements .svu-outcome")).toHaveLength(11);
    expect(container.querySelector(".svu-internship-update")).toBeNull();
    expect(container.querySelector(".svu-career-table")).toBeNull();
    expect(container.querySelectorAll("h1")).toHaveLength(1);
  });

  it("points section links and legacy URLs at the new pages without a redirect loop", () => {
    expect(svuSectionPath("internships")).toBe("/collaboration-network/svu/innovations#internships");
    expect(svuSectionPath("placements")).toBe("/collaboration-network/svu/placements");
    expect(svuLegacyRedirect("/collaboration-network/svu/internships")).toBe("/collaboration-network/svu/innovations#internships");
    expect(svuLegacyRedirect("/collaboration-network/svu/placements")).toBeUndefined();
  });
});
