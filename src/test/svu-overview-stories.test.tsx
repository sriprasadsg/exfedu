import { cleanup, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { afterEach, describe, expect, it } from "vitest";
import { SvuOverviewContent } from "@/components/site/SvuReviewedContent";

const open = () => render(<MemoryRouter><SvuOverviewContent /></MemoryRouter>);

afterEach(cleanup);

// 2 Nov 2026 brief: the innovation band is two stacked story cards — photograph first
// (35% on desktop), then heading and description, with no caption repeating the text.
describe("SVU Student Innovation and Achievements story cards", () => {
  it("renders two stacked cards with the photograph ahead of heading and description", () => {
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

  it("keeps both photographs labelled and drops the repeating captions", () => {
    open();
    const images = document.querySelectorAll(".svu-overview-story img");
    expect(images).toHaveLength(2);
    expect(images[0].getAttribute("alt")).toContain("Student innovation presentation");
    expect(images[1].getAttribute("alt")).toContain("PanIIT Andhra Pradesh Summit 2026");
    expect(document.querySelectorAll(".svu-overview-story figcaption")).toHaveLength(0);
  });
});
