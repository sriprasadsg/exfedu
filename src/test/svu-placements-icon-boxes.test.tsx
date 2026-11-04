import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";
import { svuPlacements } from "@/data/svuCareer";
import SvuCareerRecords from "@/components/site/SvuCareerRecords";

/* Client, 4 November 2026: placement records present as rectangular boxes in which a person
   icon leads the student's name, an icon matched to the designation leads the role, and an
   industry icon leads the organisation. Wording of all eleven approved records is unchanged. */
const cards = () => {
  const { container } = render(<MemoryRouter><SvuCareerRecords kind="placements" /></MemoryRouter>);
  return [...container.querySelectorAll(".svu-pl-card")];
};

const iconClass = (element: Element | null | undefined) => element?.firstElementChild?.getAttribute("class") ?? "";

describe("SVU placement records as icon-led rectangular boxes", () => {
  it("leads every student name with a person icon", () => {
    const rows = cards();
    expect(rows).toHaveLength(svuPlacements.length);
    rows.forEach(card => {
      const person = card.querySelector(".svu-pl-person");
      expect(person).not.toBeNull();
      expect(iconClass(person)).toContain("lucide-user-round");
      expect(person?.querySelector("h3")?.textContent?.trim()).toBeTruthy();
      expect(person?.querySelector("h3")?.textContent).toBe(
        svuPlacements.find(record => record.student === person?.querySelector("h3")?.textContent)?.student,
      );
    });
  });

  it("leads every organisation with an industry icon", () => {
    cards().forEach(card => {
      const org = card.querySelector(".svu-outcome-org");
      expect(iconClass(org)).toContain("lucide-building2");
      expect(org?.textContent).toBe(svuPlacements.find(record => record.organisation === org?.textContent)?.organisation);
    });
  });

  it("matches the designation icon to the role", () => {
    const rows = cards();
    const roleIcon = (student: string) =>
      iconClass(rows.find(card => card.querySelector("h3")?.textContent === student)?.querySelector(".svu-outcome-role"));
    expect(roleIcon("G V Sumanth")).toContain("lucide-brain-circuit"); // Associate Data Scientist
    expect(roleIcon("Kamatam Meghana")).toContain("lucide-cpu"); // AI Engineer
    expect(roleIcon("K Mounika")).toContain("lucide-graduation-cap"); // Trainee
    // A compound title keeps the icon of the role it trains for, not the trainee one.
    expect(roleIcon("Veeravalli Sri Satya")).toContain("lucide-brain-circuit");
    // Every box carries exactly the three icons: person, designation, industry.
    rows.forEach(card => expect(card.querySelectorAll("svg")).toHaveLength(3));
  });

  it("keeps the internships page free of the placement icon rows", () => {
    const { container } = render(<MemoryRouter><SvuCareerRecords kind="internships" /></MemoryRouter>);
    expect(container.querySelector(".svu-pl-person")).toBeNull();
    expect(container.querySelector(".svu-pl-card")).toBeNull();
  });
});
