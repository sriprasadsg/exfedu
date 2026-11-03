import { describe, expect, it } from "vitest";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import SvuPages from "@/components/site/SvuPages";

/* Client brief, 3 November 2026: the SVU Overview page carries a "Tools, Platforms &
   Technologies" list between "Applied AI and Data Science" and "Research and Technical
   Exploration". The list and its wording are fixed by the brief, and it must never imply
   that every item is covered in every programme. */

const EXPECTED: Record<string, string[]> = {
  "Programming": ["Python", "Java", "PHP"],
  "Databases & Querying": ["MySQL", "MongoDB", "SQL"],
  "Data Processing & Engineering": ["NumPy", "Apache Spark", "Apache Hive", "Apache Kafka", "Apache Hadoop"],
  "Cloud Platforms": ["Amazon Web Services (AWS)", "Microsoft Azure", "Google Cloud"],
  "Machine Learning": ["TensorFlow"],
  "Business Intelligence & Visualisation": ["Power BI", "Tableau"],
  "Version Control": ["Git"],
  "Emerging Technologies & Learning Areas": [
    "Artificial Intelligence", "Natural Language Processing (NLP)", "Generative AI", "Quantum Computing",
  ],
};

const overview = () => render(<MemoryRouter><SvuPages section="overview" /></MemoryRouter>);

describe("SVU Overview tools, platforms and technologies", () => {
  it("renders every category in order with its exact technologies", () => {
    const { container } = overview();
    const rows = [...container.querySelectorAll(".svu-tool-row")];
    expect(rows.map(r => r.querySelector(".svu-tool-label")?.textContent?.trim())).toEqual(Object.keys(EXPECTED));
    rows.forEach((row) => {
      const label = row.querySelector(".svu-tool-label")!.textContent!.trim();
      const names = [...row.querySelectorAll(".svu-tool-name")].map(n => n.textContent!.trim());
      expect(names).toEqual(EXPECTED[label]);
    });
    expect(container.querySelectorAll(".svu-tool")).toHaveLength(22);
  });

  it("shows a mark and a name for every technology, keeping broad areas as plain icons", () => {
    const { container } = overview();
    const chips = [...container.querySelectorAll(".svu-tool")];
    chips.forEach((chip) => {
      expect(chip.querySelector(".svu-tool-name")).toBeTruthy();
      expect(chip.querySelector("img.svu-tool-logo") || chip.querySelector(".svu-tool-icon")).toBeTruthy();
    });
    const iconNames = [...container.querySelectorAll(".svu-tool")]
      .filter(c => c.querySelector(".svu-tool-icon"))
      .map(c => c.querySelector(".svu-tool-name")!.textContent!.trim());
    expect(iconNames).toEqual([
      "SQL", "Artificial Intelligence", "Natural Language Processing (NLP)", "Generative AI", "Quantum Computing",
    ]);
  });

  it("sits between Applied AI and Data Science and Research, with the approved wording", () => {
    const { container } = overview();
    const headings = [...container.querySelectorAll(".svu-flow .svu-block h2")].map(h => h.textContent!.trim());
    expect(headings.indexOf("Tools, Platforms & Technologies"))
      .toBe(headings.indexOf("Applied AI and Data Science") + 1);
    expect(headings.indexOf("Research and Technical Exploration"))
      .toBe(headings.indexOf("Tools, Platforms & Technologies") + 1);

    const section = container.querySelector(".svu-tools")!;
    expect(section.querySelector("h2")?.textContent).toBe("Tools, Platforms & Technologies");
    expect(section.querySelector(".svu-reading")?.textContent).toBe(
      "Explore the tools, platforms and emerging technologies featured across SVU\u2013Exafluence programmes. Coverage varies by programme and curriculum.",
    );
    // The list stays visible in full: no carousel, no auto-scroll, no scroll region.
    expect(section.querySelector("[aria-roledescription='carousel'], .swiper, [data-carousel]")).toBeNull();
    expect(getComputedStyle(section).overflowY).not.toBe("scroll");
  });
});
