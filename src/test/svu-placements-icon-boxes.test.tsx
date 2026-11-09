import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";
import { svuPlacements } from "@/data/svuCareer";
import SvuCareerRecords from "@/components/site/SvuCareerRecords";

/* Client, 9 November 2026: supplied placed-student portraits lead the Hall of Fame profile
   cards. Role and organisation icons remain; no photograph is invented for K Mounika. */
const cards = () => {
  const { container } = render(<MemoryRouter><SvuCareerRecords kind="placements" /></MemoryRouter>);
  return [...container.querySelectorAll(".svu-pl-card")];
};

const iconClass = (element: Element | null | undefined) => element?.firstElementChild?.getAttribute("class") ?? "";

describe("SVU placement records as compact portrait profiles", () => {
  it("shows the ten supplied portraits against their approved student names", () => {
    const rows = cards();
    expect(rows).toHaveLength(svuPlacements.length);
    const portraits = rows.flatMap(card => {
      const image = card.querySelector(".svu-pl-portrait img");
      return image ? [{ student: card.querySelector("h3")?.textContent, alt: image.getAttribute("alt"), src: image.getAttribute("src"), loading: image.getAttribute("loading") }] : [];
    });
    expect(portraits).toHaveLength(10);
    portraits.forEach(portrait => {
      expect(portrait.alt).toBe(`Portrait of ${portrait.student}`);
      expect(portrait.src).toContain("/src/assets/placed-students/");
      expect(portrait.loading).toBe("lazy");
    });
    expect(portraits.some(portrait => portrait.student === "K Mounika")).toBe(false);
    expect(portraits.find(portrait => portrait.student === "Kamatam Meghana")?.src).toContain("kamatam-meghana.webp");
    expect(portraits.find(portrait => portrait.student === "Muthyala Bharadwaj")?.src).toContain("muthyala-bharadwaj.webp");
  });

  it("uses an honest icon fallback only for K Mounika's missing photograph", () => {
    const row = cards().find(card => card.querySelector("h3")?.textContent === "K Mounika");
    expect(row?.querySelector(".svu-pl-portrait img")).toBeNull();
    const fallback = row?.querySelector(".svu-pl-avatar");
    expect(fallback?.getAttribute("aria-label")).toBe("Photograph not supplied for K Mounika");
    expect(iconClass(fallback)).toContain("lucide-user-round");
  });

  it("leads every organisation with an industry icon", () => {
    cards().forEach(card => {
      const org = card.querySelector(".svu-outcome-org");
      expect(iconClass(org)).toContain("lucide-building2");
      expect(org?.textContent).toBe(svuPlacements.find(record => record.organisation === org?.textContent)?.organisation);
    });
  });

  it("matches the designation icon to the role", () => {
    const rows = cards();
    const roleIcon = (student: string) =>
      iconClass(rows.find(card => card.querySelector("h3")?.textContent === student)?.querySelector(".svu-outcome-role"));
    expect(roleIcon("G V Sumanth")).toContain("lucide-brain-circuit");
    expect(roleIcon("Kamatam Meghana")).toContain("lucide-cpu");
    expect(roleIcon("K Mounika")).toContain("lucide-graduation-cap");
    expect(roleIcon("Veeravalli Sri Satya")).toContain("lucide-brain-circuit");
    rows.forEach(card => expect(card.querySelectorAll(".svu-outcome-role svg, .svu-outcome-org svg")).toHaveLength(2));
  });

  it("keeps the internships page free of the placement profile cards", () => {
    const { container } = render(<MemoryRouter><SvuCareerRecords kind="internships" /></MemoryRouter>);
    expect(container.querySelector(".svu-pl-portrait")).toBeNull();
    expect(container.querySelector(".svu-pl-card")).toBeNull();
  });
});
