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

  // Client, 2 Nov 2026: the expanded SVU submenu made the footer taller than its
  // content needs; those five section links stay inside the SVU page navigation.
  it("keeps no sub-list under any partner", () => {
    const { container } = open();
    expect(container.querySelectorAll(".footer-partner-group")).toHaveLength(0);
    expect(container.querySelectorAll("a.footer-partner-section")).toHaveLength(0);
    const hrefs = [...container.querySelectorAll<HTMLAnchorElement>("a")].map(a => a.getAttribute("href"));
    expect(hrefs.filter(h => h?.startsWith("/collaboration-network/svu/"))).toEqual([]);
    expect(hrefs.filter(h => h === "/collaboration-network/svu")).toHaveLength(1);
  });

  it("sits in three top-aligned columns with the brand mark last", () => {
    const { container } = open();
    const columns = [...container.querySelectorAll<HTMLElement>(".footer-columns > div")];
    expect(columns).toHaveLength(3);
    expect(columns[0].textContent).toContain("Our Collaboration Network");
    expect(columns[1].textContent).toContain("Quick Links");
    expect(columns[1].textContent).toContain("About Us");
    expect(columns[1].textContent).toContain("Enquire Now");
    expect(columns[2].querySelector("img")).not.toBeNull();
    expect(columns[2].querySelectorAll("a")).toHaveLength(0);
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

  it("keeps the copyright in its own slim row below the columns", () => {
    const { container } = open();
    const legal = container.querySelectorAll(".footer-legal");
    expect(legal).toHaveLength(1);
    expect(legal[0].querySelector("p")?.textContent).toContain("Exafluence Education");
    expect(legal[0].querySelector("button[aria-label='Back to top']")).not.toBeNull();
    expect(container.querySelector(".footer-columns")?.contains(legal[0])).toBe(false);
  });

  it("offers only the agreed main destinations", () => {
    const { container } = open();
    const destinations = [...container.querySelectorAll<HTMLAnchorElement>("a")].map(a => a.getAttribute("href"));
    expect(destinations).toEqual([
      "/collaboration-network",
      "/collaboration-network/svu", "/collaboration-network/ibm", "/collaboration-network/xime",
      "/about", "/skillshone", "/#partner-enquiry",
      "/privacy-policy", "/terms-and-conditions",
    ]);
  });

  // Client, 3 Nov 2026: "remove the colourful dots for the categories list from the footer" —
  // neither category list may carry a coloured marker on any entry.
  it("keeps the category lists free of coloured dot markers", () => {
    const { container } = open();
    const entries = [...container.querySelectorAll<HTMLAnchorElement>(".footer-list a")];
    expect(entries).toHaveLength(6);
    expect(entries.filter((a) => a.classList.contains("footer-list-link"))).toHaveLength(5);
    for (const a of entries) {
      expect(a.className).not.toMatch(/tint/i);
      expect(a.getAttribute("style")).toBeNull();
    }
    expect(container.querySelectorAll(".footer-list [class*='tint']")).toHaveLength(0);
  });

  // Client, 3 Nov 2026: "footer address: SRICHAKRA EDEN GREENS APARTMENTS, UPADYAYA NAGAR,
  // TIRUPATI, Andhra Pradesh-517501" — shown in the footer as plain text, never a link.
  it("shows the Tirupati office address as plain text in the brand column", () => {
    const { container } = open();
    const address = container.querySelector<HTMLElement>("address.footer-address");
    expect(address).not.toBeNull();
    expect(address?.textContent).toContain("SRICHAKRA EDEN GREENS APARTMENTS");
    expect(address?.textContent).toContain("UPADYAYA NAGAR, TIRUPATI");
    expect(address?.textContent).toContain("Andhra Pradesh");
    expect(address?.textContent).toContain("517501");
    expect(address?.querySelector("a")).toBeNull();
    expect(container.querySelector(".footer-brand")?.contains(address)).toBe(true);
  });
});
