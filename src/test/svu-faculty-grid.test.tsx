import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { FacultyDirectory } from "@/components/site/FacultyDirectory";
import { svuFaculty, svuSupport } from "@/data/svuReviewed";

const renderBoth = () => render(<>
  <FacultyDirectory title="Faculty & Industry Mentors" people={svuFaculty} />
  <FacultyDirectory title="Technical Mentors & Lab Faculty" people={svuSupport} />
</>);

describe("SVU faculty profile grid (client brief, 3 November 2026)", () => {
  it("shows every profile directly as a card, in source order, with its role and description", () => {
    const { container } = renderBoth();
    const cells = [...container.querySelectorAll(".fd-cell")];
    expect(cells).toHaveLength(svuFaculty.length + svuSupport.length);
    expect(cells.map(cell => cell.querySelector(".fd-name")?.textContent?.trim())).toEqual(
      [...svuFaculty, ...svuSupport].map(person => person.name),
    );
    svuFaculty.forEach((person, i) => {
      expect(cells[i].querySelector(".fd-role")?.textContent?.trim()).toBe(person.role);
      expect(cells[i].querySelector(".fd-desc")?.textContent?.trim()).toBe(person.expertise);
    });
    svuSupport.forEach((person, i) => {
      const cell = cells[svuFaculty.length + i];
      expect(cell.querySelector(".fd-role")?.textContent?.trim()).toBe(person.role);
      expect(cell.querySelector(".fd-desc")?.textContent?.trim() ?? "").toBe(person.expertise);
    });
  });

  it("carries no selection panel, pills or invented portrait artwork", () => {
    const { container } = renderBoth();
    expect(container.querySelector("button")).toBeNull();
    expect(container.querySelector('[role="tablist"]')).toBeNull();
    expect(container.querySelector(".fd-tags")).toBeNull();
    expect(container.textContent).not.toMatch(/view profile|show all/i);
  });
});
