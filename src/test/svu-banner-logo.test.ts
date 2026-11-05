import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

// Client brief, 5 November 2026: inside the SVU Overview & Programmes banner the university
// mark must read as a small emblem tucked to the left edge, not the full-size plate used on
// other pages. The rule below is what keeps it there.
const css = readFileSync(resolve(process.cwd(), "src/styles/programmes.css"), "utf8");

const ruleFor = (selector: string) => {
  const start = css.indexOf(selector);
  expect(start).toBeGreaterThan(-1);
  return css.slice(start, css.indexOf("}", start) + 1);
};

describe("SVU banner keeps its university mark small and left-tucked", () => {
  it("shrinks the mark below the site-wide programme-page size", () => {
    const bannerMark = ruleFor(".svu-banner-copy .programme-detail-logo {");
    expect(bannerMark).toContain("max-width: 186px");
    expect(bannerMark).toContain("height: 54px");
    // The page-standard wide logo stays 300 x 88 everywhere else.
    expect(ruleFor(".programme-detail-logo.logo-wide {")).toContain("max-width: 300px");
  });

  it("holds the mark to the left edge of the banner face", () => {
    const bannerMark = ruleFor(".svu-banner-copy .programme-detail-logo {");
    expect(bannerMark).toContain("margin-right: auto");
    // object-position: left comes from the base .programme-detail-logo rule.
    expect(ruleFor(".programme-detail-logo {")).toContain("object-position: left");
  });

  it("keeps a smaller mark on phones", () => {
    const phone = css.indexOf("@media (max-width: 760px)");
    const mark = css.slice(phone, css.indexOf(".svu-ca-link {", phone));
    expect(mark).toContain(".svu-banner-copy .programme-detail-logo { max-width: 150px; height: 44px; }");
  });
});
