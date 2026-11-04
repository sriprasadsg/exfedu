import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";
import SvuPages from "@/components/site/SvuPages";
import { FacultyDirectory } from "@/components/site/FacultyDirectory";
import { svuFaculty, svuSupport } from "@/data/svuReviewed";

/** Nexora profile-card model (client, 4 November 2026): the faculty page opens with a pill
 * badge, a heavy headline carrying one blue phrase and two buttons; every person then sits in
 * a white card led by a tinted tile carrying their initials — never a photo or placeholder art. */
describe("SVU faculty page on the Nexora model", () => {
  it("opens with a pill badge, an accented headline and two buttons", () => {
    const { container } = render(<MemoryRouter><SvuPages section="faculty" /></MemoryRouter>);
    expect(container.querySelector(".svu-hero-badge")?.textContent).toBe("Academic & Industry Guidance");
    expect(container.querySelector(".svu-hero-accent")?.textContent).toBe("Industry Practitioners");
    expect(container.querySelector(".svu-hero-primary")?.getAttribute("href")).toBe("/contact");
    expect(container.querySelector(".svu-hero-secondary")?.getAttribute("href")).toBe("/collaboration-network/svu/overview#programmes");
    expect(container.querySelector("h1")?.textContent).toBe("A Community of Academic Scholars & Industry Practitioners");
  });

  it("leads every card with an initials tile and keeps the approved details", () => {
    const { container } = render(<FacultyDirectory page cols={4} title="Faculty & Industry Mentors" people={svuFaculty} />);
    const cells = [...container.querySelectorAll(".fd-cell")];
    expect(cells).toHaveLength(12);
    expect(cells.map(cell => cell.querySelector(".fd-mark")?.textContent)).toEqual(
      ["AB", "MR", "GK", "PA", "LA", "KA", "SM", "SB", "VP", "PT", "BA", "AK"],
    );
    expect(container.querySelector(".fd-grid")?.getAttribute("data-cols")).toBe("4");
    expect(container.querySelector(".fd-cell img, .fd-cell svg")).toBeNull();
    expect(cells[0].querySelector(".fd-name")?.textContent).toBe("Anjan Babu");
    expect(cells[0].querySelector(".fd-role")?.textContent).toBe("Professor & Coordinator");
  });

  it("gives the smaller technical group its own three-column row", () => {
    const { container } = render(<FacultyDirectory page cols={3} title="Technical Mentors & Lab Faculty" people={svuSupport} />);
    expect(container.querySelectorAll(".fd-cell")).toHaveLength(5);
    expect(container.querySelector(".fd-grid")?.getAttribute("data-cols")).toBe("3");
  });
});
