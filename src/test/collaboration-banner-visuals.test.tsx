import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import CollaborationNetwork from "@/components/site/CollaborationNetwork";
import BannerStory, { hasBannerStory } from "@/components/home/BannerStory";

/* Client brief, 3 November 2026: the circular collaboration symbol and the XIME four-layer
   AI-FinTech illustration are removed from the site. Neither may render on the collaboration
   network page, while the SVU and IBM banners keep their approved artwork. */

const view = () => render(<MemoryRouter><CollaborationNetwork /></MemoryRouter>);

describe("removed collaboration visuals", () => {
  it("shows no circular symbol, labels or caption on the network page", () => {
    const { container } = view();
    expect(container.querySelector(".network-loop")).toBeNull();
    expect(container.querySelector(".loop-svg")).toBeNull();
    expect(container.querySelectorAll(".loop-label")).toHaveLength(0);
    expect(screen.queryByText("Academia \u00b7 Technology \u00b7 Applied Learning.")).toBeNull();
    expect(screen.queryByText("Collaborating Institutions")).toBeNull();
  });

  it("shows no XIME AI-FinTech layers illustration", () => {
    const { container } = view();
    expect(container.querySelector(".xl-svg")).toBeNull();
    expect(container.querySelectorAll(".xl-top, .xl-title, .xl-sub")).toHaveLength(0);
    for (const layer of ["Business Insights", "FinTech Applications", "AI & Machine Learning", "Financial Data"]) {
      expect(screen.queryByText(layer)).toBeNull();
    }
  });

  it("gives the XIME slide the full width and leaves the other banners untouched", () => {
    const { container } = view();
    const slides = [...container.querySelectorAll(".network-slide")];
    expect(slides).toHaveLength(3);
    expect(slides[2].className).toContain("network-slide--text");
    expect(slides[2].querySelector(".network-visual")).toBeNull();
    expect(slides[0].querySelector(".bs-static")).not.toBeNull();
    expect(slides[1].querySelector(".bs-svg")).not.toBeNull();
  });
});

describe("banner artwork availability", () => {
  it("renders nothing for XIME and still draws the SVU and IBM stories", () => {
    expect(hasBannerStory("XIME")).toBe(false);
    expect(hasBannerStory("SVU")).toBe(true);
    expect(hasBannerStory("IBM")).toBe(true);
    expect(render(<BannerStory organisation="XIME" active />).container.innerHTML).toBe("");
    expect(render(<BannerStory organisation="IBM" active />).container.querySelector(".bs-replay")).not.toBeNull();
  });
});
