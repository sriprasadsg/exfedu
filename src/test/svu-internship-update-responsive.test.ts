import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

// Client brief, 4-5 November 2026: the internship update box on the SVU internships page must
// respond to its own width — the four highlights spread four-across when the box is wide, hold
// two-across in the middle range, stack one under the other when it cannot fit two, and the
// students control spans the box instead of floating half-empty.
const css = readFileSync(resolve(process.cwd(), "src/styles/programmes.css"), "utf8");

const containerBlock = (selector: string) => {
  const start = css.indexOf(selector);
  expect(start).toBeGreaterThan(-1);
  return css.slice(start, start + 900);
};

describe("SVU internship update box responds to its own width", () => {
  it("registers the update box as a size container", () => {
    const rule = css.slice(css.indexOf(".svu-career-records--upskill .svu-internship-update {"));
    expect(rule.slice(0, rule.indexOf("}") + 1)).toContain("container-type: inline-size");
  });

  it("spreads the highlights four-across when the box is wide", () => {
    const block = containerBlock("@container (min-width: 620px)");
    expect(block).toContain(".svu-career-records--upskill .svu-internship-update-highlights { grid-template-columns: repeat(4, minmax(0, 1fr)); }");
  });

  it("stacks the highlights to one column when the box is narrow", () => {
    const block = containerBlock("@container (max-width: 399px)");
    expect(block).toContain(".svu-career-records--upskill .svu-internship-update-highlights { grid-template-columns: minmax(0, 1fr); gap: 0; }");
    expect(block).toContain(".svu-career-records--upskill .svu-internship-update-highlights li { padding: 0; border-left: 0; text-align: left; }");
  });

  it("keeps the students control spanning the box", () => {
    const rule = css.slice(css.indexOf(".svu-career-records--upskill .svu-internship-update-toggle {"));
    const body = rule.slice(0, rule.indexOf("}") + 1);
    expect(body).toContain("width: 100%");
    expect(body).toContain("justify-content: space-between");
  });
});
