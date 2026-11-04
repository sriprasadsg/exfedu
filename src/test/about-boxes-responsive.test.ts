import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

// Client, 4 November 2026: the About Us boxes must reflow like the student projects
// boxes instead of holding a fixed four/three-across layout that squeezes narrow screens.
const css = readFileSync(resolve(process.cwd(), "src/index.css"), "utf8");

const ruleFor = (selector: string) => {
  const start = css.indexOf(`${selector} {`);
  expect(start, `${selector} rule is present`).toBeGreaterThan(-1);
  return css.slice(start, css.indexOf("}", start));
};

describe("About Us boxes are responsive like the student projects boxes", () => {
  it("reflows both box groups to the width available", () => {
    for (const selector of [".about-editorial-industries", ".about-editorial-solutions"]) {
      const rule = ruleFor(selector);
      expect(rule).toContain("repeat(auto-fit");
      expect(rule).toContain("grid-auto-rows: 1fr");
    }
  });

  it("never forces a fixed column count that squeezes phones", () => {
    expect(css).not.toContain(".about-editorial-industries { grid-template-columns: repeat(2");
    expect(css).not.toContain(".about-editorial-industries { grid-template-columns: repeat(4");
    expect(css).not.toContain(".about-editorial-solutions { grid-template-columns: minmax(0, 1fr)");
    expect(css).not.toContain(".about-editorial-solutions { grid-template-columns: repeat(3");
  });
});
