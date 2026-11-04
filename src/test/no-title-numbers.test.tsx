import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { afterEach, describe, expect, it } from "vitest";
import Header from "@/components/layout/Header";
import SvuPages from "@/components/site/SvuPages";
import { SvuResearchContent } from "@/components/site/SvuReviewedContent";

afterEach(cleanup);

describe("no numeric labels beside titles (client, 4 November 2026)", () => {
  it("shows SVU programme categories without 01/02/03 indexes", () => {
    const { container } = render(<MemoryRouter><SvuPages section="overview" /></MemoryRouter>);
    const headings = [...container.querySelectorAll(".svu-category-heading")];
    expect(headings.length).toBeGreaterThan(0);
    expect(container.querySelector(".svu-category-index")).toBeNull();
    expect(headings.every(h => !/\b0\d\b/.test(h.textContent ?? ""))).toBe(true);
  });

  it("shows student projects without numbered badges", () => {
    const { container } = render(<MemoryRouter><SvuPages section="projects-research" /></MemoryRouter>);
    expect(container.querySelector(".svu-project-number")).toBeNull();
    const { container: reviewed } = render(<MemoryRouter><SvuResearchContent /></MemoryRouter>);
    expect(reviewed.querySelector(".svu-project-number")).toBeNull();
  });

  it("shows the collaboration menu without numeric prefixes", () => {
    render(<MemoryRouter><Header /></MemoryRouter>);
    fireEvent.click(screen.getByRole("button", { name: "Our Collaboration Network" }));
    const names = screen.getAllByRole("link").map(a => a.textContent?.trim());
    expect(names).toContain("Sri Venkateswara University");
    expect(names.some(name => /^\d+\./.test(name ?? ""))).toBe(false);
  });
});
