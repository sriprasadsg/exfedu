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
  it("lists the two partners as text links to their own pages", () => {
    const { container } = open();
    const partners = [...container.querySelectorAll<HTMLAnchorElement>("a.footer-partner")];
    expect(partners.map((a) => a.textContent?.trim())).toEqual([
      "Sri Venkateswara University",
      "IBM",
    ]);
    expect(partners.map((a) => a.getAttribute("href"))).toEqual([
      "/collaboration-network/svu",
      "/collaboration-network/ibm",
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
    expect(columns[2].querySelectorAll("a")).toHaveLength(1);
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

  // Client, 3 Nov 2026: the footer logo links to the parent company site,
  // "bring html link on the footer logo of exafluence site — www.exafluence.com".
  it("links the footer logo to the parent company site in a new tab", () => {
    const { container } = open();
    const link = container.querySelector<HTMLAnchorElement>("a.footer-company-link");
    expect(link).not.toBeNull();
    expect(link?.getAttribute("href")).toBe("https://www.exafluence.com");
    expect(link?.getAttribute("target")).toBe("_blank");
    expect(link?.getAttribute("rel")).toContain("noopener");
    expect(link?.querySelector("img")?.alt).toBe("Exafluence — Data Driven Influence");
  });

  it("offers only the agreed main destinations", () => {
    const { container } = open();
    const destinations = [...container.querySelectorAll<HTMLAnchorElement>("a")].map(a => a.getAttribute("href"));
    expect(destinations).toEqual([
      "/collaboration-network",
      "/collaboration-network/svu", "/collaboration-network/ibm",
      "/about", "/skillshone", "/#partner-enquiry",
      "https://www.exafluence.com",
      "/privacy-policy", "/terms-and-conditions",
    ]);
  });

  // Client, 3 Nov 2026: "remove the colourful dots for the categories list from the footer" —
  // neither category list may carry a coloured marker on any entry.
  it("keeps the category lists free of coloured dot markers", () => {
    const { container } = open();
    const entries = [...container.querySelectorAll<HTMLAnchorElement>(".footer-list a")];
    expect(entries).toHaveLength(5);
    expect(entries.filter((a) => a.classList.contains("footer-list-link"))).toHaveLength(4);
    for (const a of entries) {
      expect(a.className).not.toMatch(/tint/i);
      expect(a.getAttribute("style")).toBeNull();
    }
    expect(container.querySelectorAll(".footer-list [class*='tint']")).toHaveLength(0);
  });

  // Client, 4 Nov 2026: the single office line is replaced by the headquarters list —
  // a map marker before every address, a small country flag beside each country name.
  it("lists the four headquarters addresses as plain text with map markers", () => {
    const { container } = open();
    expect(container.querySelector("address.footer-address")).toBeNull();
    expect(container.querySelector(".footer-locations-title")?.textContent).toBe("Headquarters");
    const offices = [...container.querySelectorAll<HTMLElement>(".footer-office")];
    expect(offices.map((o) => o.querySelector(".footer-office-label")?.textContent)).toEqual([
      "Texas",
      "New Jersey",
      "Corporate Address - Tirupati",
      "Registered Address - Bangalore",
    ]);
    const text = container.querySelector(".footer-locations")?.textContent ?? "";
    for (const part of [
      "400 Stonebrook Pkwy, #905",
      "Frisco, Texas - 75036",
      "Ph: +1 7328373764",
      "5 Independence Way",
      "Princeton, New Jersey - 08540",
      "#210, Ecco Greens Tech Hub",
      "Upadhyaya Nagar, Tirupati - 517507",
      "Phone: 0877 - 222675",
      "HM Towers, 5th floor, Brigade Road Off",
      "MG Road, Bangalore - 560001",
    ]) expect(text).toContain(part);
    expect(offices.every((o) => o.querySelector("svg.footer-office-pin") !== null)).toBe(true);
    for (const o of offices) expect(o.querySelector("a")).toBeNull();
  });

  it("names each country once, with a small flag beside it", () => {
    const { container } = open();
    const countries = [...container.querySelectorAll<HTMLElement>(".footer-country-name")];
    expect(countries.map((c) => c.textContent?.trim())).toEqual(["USA", "India"]);
    const flags = container.querySelectorAll("svg.footer-flag");
    expect(flags).toHaveLength(2);
    for (const flag of flags) expect(flag.getAttribute("aria-hidden")).toBe("true");
    expect(container.querySelectorAll("img.footer-flag")).toHaveLength(0);
  });
});
