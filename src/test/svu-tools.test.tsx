import { describe, expect, it } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import SvuPages from "@/components/site/SvuPages";

/* Client, 3 November 2026: the SVU Overview technologies section is titled "Technologies You
   Work With" and sits between "Applied AI and Data Science" and "Research and Technical
   Exploration". It shows logos only — each in its own cell — rising one after
   another in a vertical strip in the section's corner. The list is fixed by the brief, and the
   wording must never imply that every item is covered in every programme. */

const EXPECTED = [
  "Python", "Java", "PHP",
  "MySQL", "MongoDB", "SQL",
  "NumPy", "Apache Spark", "Apache Hive", "Apache Kafka", "Apache Hadoop",
  "Amazon Web Services (AWS)", "Microsoft Azure", "Google Cloud",
  "TensorFlow",
  "Power BI", "Tableau",
  "Git",
  "Artificial Intelligence", "Natural Language Processing (NLP)", "Generative AI", "Quantum Computing",
];
const NO_PRODUCT_MARK: Record<string, string> = {
  "SQL": "SQL",
  "Artificial Intelligence": "AI",
  "Natural Language Processing (NLP)": "NLP",
  "Generative AI": "Gen AI",
  "Quantum Computing": "Quantum",
};

const overview = () => render(<MemoryRouter><SvuPages section="overview" /></MemoryRouter>);
const primaryCells = (root: ParentNode) => [...root.querySelectorAll(".svu-tech-grid:not([aria-hidden]) .svu-tech-cell")];
const cellName = (cell: Element) =>
  cell.querySelector("img")?.getAttribute("alt") ?? cell.querySelector(".sr-only")?.textContent?.trim();

describe("SVU Overview — Technologies You Work With", () => {
  it("is titled as the client asked and sits between Applied AI and Research, keeping the coverage caveat", () => {
    const { container } = overview();
    const headings = [...container.querySelectorAll(".svu-flow .svu-block h2")].map(h => h.textContent!.trim());
    expect(headings).not.toContain("Tools, Platforms & Technologies");
    expect(headings.indexOf("Technologies You Work With")).toBe(headings.indexOf("Applied AI and Data Science") + 1);
    expect(headings.indexOf("Research and Technical Exploration")).toBe(headings.indexOf("Technologies You Work With") + 1);
    expect(container.querySelector(".svu-tech .svu-reading")?.textContent).toBe(
      "Explore the tools, platforms and emerging technologies featured across SVU\u2013Exafluence programmes. Coverage varies by programme and curriculum.",
    );
  });

  it("shows logos only, one technology per numbered cell, in brief order", () => {
    const { container } = overview();
    const section = container.querySelector(".svu-tech")!;
    // No category rows or printed technology names any more.
    expect(section.querySelector(".svu-tool-row, .svu-tool-label, .svu-tool-name, h3")).toBeNull();

    const cells = primaryCells(section);
    expect(cells).toHaveLength(22);
    expect(cells.map(cellName)).toEqual(EXPECTED);
    // No index numbers in the corners of the cells (client, 3 November 2026).
    expect(section.querySelectorAll(".svu-tech-index")).toHaveLength(0);
    cells.forEach((cell) => {
      const name = cellName(cell)!;
      const visibleText = [...cell.querySelectorAll(".svu-tech-short")].map(n => n.textContent).join("");
      expect(cell.textContent?.replace(cell.querySelector(".sr-only")?.textContent ?? "", "")).toBe(visibleText);
      if (NO_PRODUCT_MARK[name]) {
        expect(cell.querySelector("img")).toBeNull();
        expect(cell.querySelector(".svu-tech-glyph svg")).toBeTruthy();
        expect(cell.querySelector(".svu-tech-short")?.textContent).toBe(NO_PRODUCT_MARK[name]);
      } else {
        expect(cell.querySelector("img.svu-tech-logo")?.getAttribute("src")).toBeTruthy();
      }
    });
  });

  it("scrolls as a seamless vertical strip whose repeat copy is hidden from screen readers", () => {
    const { container } = overview();
    const section = container.querySelector(".svu-tech")!;
    expect(section.classList.contains("is-scrolling")).toBe(true);
    const grids = [...section.querySelectorAll(".svu-tech-track > .svu-tech-grid")];
    expect(grids).toHaveLength(2);
    expect(grids[0].hasAttribute("aria-hidden")).toBe(false);
    expect(grids[1].getAttribute("aria-hidden")).toBe("true");
    expect([...grids[1].querySelectorAll("img")].every(img => img.getAttribute("alt") === "")).toBe(true);
    expect(grids[1].querySelectorAll(".svu-tech-cell")).toHaveLength(22);
    expect((section.querySelector(".svu-tech-track") as HTMLElement).style.getPropertyValue("--tech-duration")).toBe("28.6s");
  });

  it("keeps the strip scrolling with no show-all control beside it", () => {
    const { container } = overview();
    const section = container.querySelector(".svu-tech")!;
    expect(section.querySelectorAll("button")).toHaveLength(0);
    expect(section.textContent).not.toMatch(/Show all technologies|Resume scrolling/);
    expect(section.classList.contains("is-scrolling")).toBe(true);
    expect(section.querySelectorAll(".svu-tech-track > .svu-tech-grid")).toHaveLength(2);
  });
});
