import { describe, expect, it } from "vitest";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import SvuPages from "@/components/site/SvuPages";

/* Client, 3 November 2026: the SVU Overview technologies strip shows logos only — each in its
   own cell — rising one after another in a vertical strip in the section's corner.
   Client, 4 November 2026: that strip is now the "Tools & Technologies" part of the
   "Technology, Research & Professional Growth" band, so its heading is a part title (h3) and
   the introduction is the client's new wording. The list is fixed by the brief, and the
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

describe("SVU Overview — Tools & Technologies", () => {
  it("reads as the Tools & Technologies part of the growth band, keeping the coverage caveat", () => {
    const { container } = overview();
    const headings = [...container.querySelectorAll(".svu-flow .svu-block h2")].map(h => h.textContent!.trim());
    expect(headings).not.toContain("Tools, Platforms & Technologies");
    // Programmes now sit between Applied AI and the growth band (3 Nov 2026 page flow).
    // Programmes stand apart at the end of the page (client, 4 Nov 2026), not in the middle.
    expect(headings.indexOf("Technology, Research & Professional Growth")).toBe(headings.indexOf("Applied AI and Data Science") + 1);
    expect(headings.indexOf("Industry-Integrated Programmes")).toBe(headings.length - 1);
    expect(container.querySelector(".svu-tech h3")?.textContent).toBe("Tools & Technologies");
    expect(container.querySelector(".svu-tech .svu-reading")?.textContent).toBe(
      "Explore tools and technologies across data science, AI, Generative AI, cloud computing and quantum computing. Strengthen technical understanding through guided exercises and project work, with coverage tailored to each programme\u2019s curriculum.",
    );
  });

  it("shows logos only, one technology per cell, in brief order", () => {
    const { container } = overview();
    const section = container.querySelector(".svu-tech")!;
    // No category rows or printed technology names any more; the only heading is the part title.
    expect(section.querySelector(".svu-tool-row, .svu-tool-label, .svu-tool-name")).toBeNull();
    expect([...section.querySelectorAll("h3")].map(h => h.textContent)).toEqual(["Tools & Technologies"]);

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
