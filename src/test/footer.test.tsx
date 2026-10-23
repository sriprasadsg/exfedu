import { cleanup, render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { afterEach, describe, expect, it } from "vitest";
import Footer from "@/components/layout/Footer";

afterEach(cleanup);

const open = () => render(<MemoryRouter><Footer /></MemoryRouter>);

// The client asked for partner names as plain text in the footer: "not logos
// required, mention only text" (23 Oct 2026). Assert the links and that no
// partner or SkillShone logo image sneaks back into the footer.
describe("Footer collaboration network", () => {
  it("lists the three partners as text links to their own pages", () => {
    const { container } = open();
    const partners = [...container.querySelectorAll<HTMLAnchorElement>("a.footer-partner")];
    expect(partners.map((a) => a.textContent?.trim())).toEqual([
      "Sri Venkateswara University",
      "XIME Chennai",
      "IBM",
    ]);
    expect(partners.map((a) => a.getAttribute("href"))).toEqual([
      "/collaboration-network/svu",
      "/collaboration-network/xime",
      "/collaboration-network/ibm",
    ]);
    for (const a of partners) expect(a.querySelector("img")).toBeNull();
  });

  it("keeps the SkillShone entry as a text pill and shows only the company mark image", () => {
    const { container } = open();
    const pill = container.querySelector<HTMLAnchorElement>("a.footer-featured");
    expect(pill).not.toBeNull();
    expect(pill?.getAttribute("href")).toBe("/skillshone");
    expect(pill?.textContent?.trim()).toBe("SkillShone");
    expect(pill?.querySelector("img")).toBeNull();

    const images = [...container.querySelectorAll<HTMLImageElement>("img")];
    expect(images).toHaveLength(1);
    expect(images[0].alt).toBe("Exafluence — Data Driven Influence");
  });
});
