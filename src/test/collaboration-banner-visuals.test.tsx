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

  it("shows the client artwork on all three slides", () => {
    const { container } = view();
    const slides = [...container.querySelectorAll(".network-slide")];
    expect(slides).toHaveLength(3);
    for (const slide of slides) {
      expect(slide.className).not.toContain("network-slide--text");
      expect(slide.querySelector(".network-visual .bs-static")).not.toBeNull();
    }
  });
});

describe("banner artwork availability", () => {
  it("uses the IBM campus and XIME fintech renders in the carousel", () => {
    expect(hasBannerStory("SVU")).toBe(true);
    expect(hasBannerStory("IBM")).toBe(true);
    expect(hasBannerStory("XIME")).toBe(true);
    const ibm = render(<BannerStory organisation="IBM" active />).container.querySelector("img");
    const xime = render(<BannerStory organisation="XIME" active />).container.querySelector("img");
    expect(ibm?.getAttribute("src")).toContain("ibm-collaboration-campus-v2");
    expect(xime?.getAttribute("src")).toContain("xime-fintech-platform-v2");
  });
});
