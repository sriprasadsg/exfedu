import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

// Client brief, 4 November 2026: on the faculty pages only the names are dark navy,
// and every card box sizes itself to the width available instead of a fixed column count.
const css = readFileSync(resolve(process.cwd(), "src/styles/programmes.css"), "utf8");

const find = (selector: string) => {
  const start = css.indexOf(selector);
  if (start < 0) return "";
  const end = css.indexOf("}", start);
  return css.slice(start, end + 1);
};

describe("SVU faculty cards", () => {
  it("keeps dark navy on the names alone", () => {
    expect(find(".fd .fd-name {")).toContain("color: hsl(var(--navy-900))");
    const desc = find(".fd .fd-desc {");
    expect(desc).toContain("color: hsl(var(--muted-foreground))");
    expect(desc).not.toContain("--primary");
    expect(find(".fd .fd-role {")).toContain("muted-foreground");
    expect(find(".fd {")).not.toContain("--primary");
  });

  it("gives every card box the same shape and size at each width", () => {
    const grid = find(".fd .fd-grid {");
    expect(grid).toContain("repeat(4, minmax(0, 1fr))");
    expect(grid).toContain("grid-auto-rows: 1fr");
    expect(css).toContain("@media (max-width: 1099px) { .fd .fd-grid { grid-template-columns: repeat(3, minmax(0, 1fr)); } }");
    expect(css).toContain("@media (max-width: 859px) { .fd .fd-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); } }");
    expect(css).toContain("@media (max-width: 599px) { .fd .fd-grid { grid-template-columns: minmax(0, 1fr); } }");
    expect(css).toContain("@media (min-width: 600px) { .fd-cell { min-height: 208px; } }");
  });
});
