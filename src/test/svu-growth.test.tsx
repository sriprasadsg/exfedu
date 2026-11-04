import { describe, expect, it } from "vitest";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import SvuPages from "@/components/site/SvuPages";

/* Client copy, 4 November 2026: the tail of the SVU Overview page reads as one band —
   "Technology, Research & Professional Growth" with its introduction, then three parts in
   order: Tools & Technologies, Research & Innovation and Industry Exposure & Career
   Development. The wording is the client's and must stay verbatim, the three headings it
   replaces must not come back, and every existing destination must stay reachable. */

const overview = () => render(<MemoryRouter><SvuPages section="overview" /></MemoryRouter>);
const partText = (part: Element) => part.querySelector(".svu-reading")?.textContent;

describe("SVU Overview — Technology, Research & Professional Growth", () => {
  it("keeps the band heading and introduction word for word", () => {
    const { container } = overview();
    const head = container.querySelector(".svu-growth-head")!;
    expect(head.querySelector("h2")?.textContent).toBe("Technology, Research & Professional Growth");
    expect(partText(head)).toBe(
      "Building practical skills, encouraging innovation and connecting academic learning with industry experience.",
    );
  });

  it("shows the three parts in order with the client's paragraphs", () => {
    const { container } = overview();
    const parts = [...container.querySelectorAll(".svu-growth-part")];
    expect(parts.map(p => p.querySelector("h3")?.textContent)).toEqual([
      "Tools & Technologies",
      "Research & Innovation",
      "Industry Exposure & Career Development",
    ]);
    expect(partText(parts[0])).toBe(
      "Explore tools and technologies across data science, AI, Generative AI, cloud computing and quantum computing. Strengthen technical understanding through guided exercises and project work, with coverage tailored to each programme\u2019s curriculum.",
    );
    expect(partText(parts[1])).toBe(
      "Investigate technical challenges, explore new ideas and develop solutions through research and experimentation. Build analytical thinking and communicate findings through project demonstrations, research papers and conference presentations.",
    );
    expect(partText(parts[2])).toBe(
      "Connect technical knowledge with professional practice through industry case studies, mentor guidance and internship opportunities. Develop problem-solving, teamwork and communication skills to approach workplace challenges with confidence.",
    );
  });

  it("retires the three headings the band replaces", () => {
    const { container } = overview();
    const text = container.textContent ?? "";
    expect(text).not.toContain("Technologies You Work With");
    expect(text).not.toContain("Research and Technical Exploration");
    expect(text).not.toContain("Industry Exposure and Career Development");
    expect(text).not.toContain("Students investigate technical questions");
    expect(text).not.toContain("Industry case studies, mentor guidance and internship exposure connect");
  });

  it("keeps every existing destination reachable from the band", () => {
    const { container } = overview();
    const hrefs = [...container.querySelectorAll(".svu-growth a")].map(a => a.getAttribute("href") ?? "");
    expect(hrefs.some(h => /\/svu\/outcomes#projects$/.test(h))).toBe(true);
    expect(hrefs.some(h => /\/svu\/innovations#internships$/.test(h))).toBe(true);
    expect(hrefs.some(h => /\/svu\/placements$/.test(h))).toBe(true);
    expect(hrefs).toContain("/contact");
  });
});
