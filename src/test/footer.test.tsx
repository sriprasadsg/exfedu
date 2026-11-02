import { cleanup, render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { afterEach, describe, expect, it } from "vitest";
import Footer from "@/components/layout/Footer";

afterEach(cleanup);

const open = () => render(<MemoryRouter><Footer /></MemoryRouter>);

// The client asked for partner names as plain text in the footer: "not logos
// required, mention only text" (23 Oct 2026), but wants the original SkillShone
// logo kept there in a reduced size, and the Exafluence footer mark smaller too.
describe("Footer collaboration network", () => {
  it("lists the three partners as text links to their own pages", () => {
    const { container } = open();
    const partners = [...container.querySelectorAll<HTMLAnchorElement>("a.footer-partner")];
    expect(partners.map((a) => a.textContent?.trim())).toEqual([
      "Sri Venkateswara University",
      "IBM",
      "XIME Chennai",
    ]);
    expect(partners.map((a) => a.getAttribute("href"))).toEqual([
      "/collaboration-network/svu",
      "/collaboration-network/ibm",
      "/collaboration-network/xime",
    ]);
    for (const a of partners) expect(a.querySelector("img")).toBeNull();
  });

  // The client confirmed the SVU menu order on 2 Nov 2026 and asked for the same
  // structure in the footer: "Adjust the same in the footer also."
  it("repeats the agreed SVU section order under the SVU link only", () => {
    const { container } = open();
    const groups = [...container.querySelectorAll<HTMLElement>(".footer-partner-group")];
    expect(groups).toHaveLength(3);
    expect(groups.map((g) => g.querySelector(".footer-partner")?.textContent?.trim())).toEqual([
      "Sri Venkateswara University",
      "IBM",
      "XIME Chennai",
    ]);

    const svuLinks = [...groups[0].querySelectorAll<HTMLAnchorElement>("a.footer-partner-section")];
    expect(svuLinks.map((a) => a.textContent?.trim())).toEqual([
      "Overview",
      "Programmes",
      "Projects & Research",
      "Internships",
      "Placements",
    ]);
    expect(svuLinks.map((a) => a.getAttribute("href"))).toEqual([
      "/collaboration-network/svu#overview",
      "/collaboration-network/svu#programmes",
      "/collaboration-network/svu#projects-research",
      "/collaboration-network/svu#internships",
      "/collaboration-network/svu#placements",
    ]);

    for (const group of groups.slice(1)) {
      expect(group.querySelectorAll("a.footer-partner-section")).toHaveLength(0);
    }
  });

  it("keeps the original SkillShone logo in the pill and shows only the company mark image", () => {
    const { container } = open();
    const pill = container.querySelector<HTMLAnchorElement>("a.footer-featured");
    expect(pill).not.toBeNull();
    expect(pill?.getAttribute("href")).toBe("/skillshone");
    const logo = pill?.querySelector<HTMLImageElement>("img.footer-featured-logo");
    expect(logo?.getAttribute("src")).toContain("skillshone-original.png");
    expect(logo?.alt).toBe("SkillShone");

    const images = [...container.querySelectorAll<HTMLImageElement>("img")];
    expect(images).toHaveLength(2);
    expect(images.map((i) => i.alt)).toEqual(["SkillShone", "Exafluence — Data Driven Influence"]);
  });
});
