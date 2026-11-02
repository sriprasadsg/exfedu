import { cleanup, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { afterEach, describe, expect, it } from "vitest";
import { SvuOverviewContent } from "@/components/site/SvuReviewedContent";
import { svuOverviewAchievements } from "@/data/svuOverview";

const open = () => render(<MemoryRouter><SvuOverviewContent /></MemoryRouter>);

afterEach(cleanup);

// 2 Nov 2026 brief: the two achievement cards sit side by side on desktop (stacked on phones),
// each with an equal-width image area, then its own heading and description. The PanIIT group
// photograph appears once, inside its card, and never again as a standalone figure.
describe("SVU Student Innovation and Achievements story cards", () => {
  it("renders two cards with the photograph ahead of heading and description", () => {
    open();
    const cards = document.querySelectorAll(".svu-overview-story");
    expect(cards).toHaveLength(2);
    cards.forEach(card => {
      expect(card.querySelector("figure")).toBe(card.firstElementChild);
      const text = card.querySelector(".svu-overview-story-text")!;
      expect(text.querySelector("h3")).toBe(text.firstElementChild);
      expect(text.querySelector("p")).toBe(text.lastElementChild);
    });
    expect(screen.getByRole("heading", { name: "Innovation Showcase" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Technology Community Participation" })).toBeInTheDocument();
  });

  it("shows the group photograph once, with its caption and no standalone duplicate", () => {
    open();
    const group = svuOverviewAchievements[1].photo;
    const images = [...document.querySelectorAll(".svu-overview-story img")];
    expect(images).toHaveLength(2);
    expect(images.filter(img => img.getAttribute("src") === group)).toHaveLength(1);
    expect(document.querySelectorAll(`img[src="${group}"]`)).toHaveLength(1);
    expect(document.querySelectorAll(".svu-overview-delegation")).toHaveLength(0);
    expect(screen.getByText("SVU\u2013Exafluence student participation at the PanIIT Andhra Pradesh Summit 2026.")).toBeInTheDocument();
  });
});
