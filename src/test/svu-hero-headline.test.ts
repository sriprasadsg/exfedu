import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

// Client brief, 4 November 2026: the SVU overview headline ("Industry-Integrated Data
// Science, AI & Gen AI Education") must read as one line, so the size is derived from the
// column instead of letting the text wrap. Phones still wrap for legibility.
const css = readFileSync(new URL("../styles/programmes.css", import.meta.url), "utf8");

describe("SVU overview headline", () => {
  const hero = css.match(/\.svu-ca-hero h1 \{[^}]*\}/)?.[0] ?? "";

  it("keeps the headline on a single line on wide screens", () => {
    expect(hero).toContain("white-space: nowrap");
    expect(hero).toMatch(/font-size: min\(\d+px, calc\(\(100vw - \d+px\) \/ [\d.]+\)\)/);
    expect(hero).not.toMatch(/max-width: \d+px/);
  });

  it("lets the headline wrap again on phones", () => {
    const phone = css.match(/@media \(max-width: 760px\) \{ \.svu-ca-hero h1 \{[^}]*\}/)?.[0] ?? "";
    expect(phone).toContain("white-space: normal");
    expect(phone).toMatch(/font-size: clamp\(\d+px/);
  });
});
