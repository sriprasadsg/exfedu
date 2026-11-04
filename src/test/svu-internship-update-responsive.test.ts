import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

// Client brief, 4 November 2026: the internship update box on the SVU internships page must
// respond to its own width — the four highlights stack when the box itself cannot fit two.
const css = readFileSync(resolve(process.cwd(), "src/styles/programmes.css"), "utf8");

describe("SVU internship update box responds to its own width", () => {
  it("registers the update box as a size container", () => {
    const rule = css.slice(css.indexOf(".svu-career-records--upskill .svu-internship-update {"));
    expect(rule.slice(0, rule.indexOf("}") + 1)).toContain("container-type: inline-size");
  });

  it("stacks the highlights to one column when the box is narrow", () => {
    const start = css.indexOf("@container (max-width: 400px)");
    expect(start).toBeGreaterThan(-1);
    const block = css.slice(start, start + 500);
    expect(block).toContain(".svu-career-records--upskill .svu-internship-update-highlights { grid-template-columns: minmax(0, 1fr); }");
    expect(block).toContain(".svu-career-records--upskill .svu-internship-update-highlights li { padding: 0; border-left: 0; }");
  });
});
