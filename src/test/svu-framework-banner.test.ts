import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

// Client brief, 5 November 2026: the SVU Overview & Programmes banner must carry the client's
// Exafluence Education technology framework diagram in place of the campus illustration it
// replaced. The diagram is text-dense, so it is shown whole and full width, and on phones it
// stays legible as a swipeable strip instead of shrinking to unreadable size.
const page = readFileSync(resolve(process.cwd(), "src/components/site/SvuPages.tsx"), "utf8");
const css = readFileSync(resolve(process.cwd(), "src/styles/programmes.css"), "utf8");
const pointer = JSON.parse(
  readFileSync(resolve(process.cwd(), "src/assets/exafluence-education-program-diagram.png.asset.json"), "utf8"),
);

describe("SVU Overview & Programmes banner shows the technology framework diagram", () => {
  it("imports the client's framework diagram from its stored asset", () => {
    expect(page).toContain('import svuProgramDiagram from "@/assets/exafluence-education-program-diagram.png.asset.json"');
    expect(pointer.url).toBe("/__l5e/assets-v1/35ccd268-429f-49ef-a4cf-e0c985031a73/exafluence-education-program-diagram.png");
  });

  it("renders the diagram in the banner and drops the campus illustration from this page", () => {
    const figure = page.slice(page.indexOf('<figure className="svu-banner-art">'));
    expect(figure.slice(0, 400)).toContain("src={svuProgramDiagram.url}");
    expect(figure.slice(0, 900)).toContain("technology framework");
    expect(page).not.toContain("svuCampusArtwork");
    expect(page).not.toContain("svu-partner-illustration");
  });

  it("keeps the diagram whole and full width on desktop", () => {
    const art = css.slice(css.indexOf(".svu-banner-art img {"));
    const rule = art.slice(0, art.indexOf("}") + 1);
    expect(rule).toContain("width: 100%");
    expect(rule).toContain("height: auto");
    expect(rule).not.toContain("max-height");
    expect(css).not.toContain(".svu-banner-layout");
  });

  it("keeps the diagram readable on phones as a swipeable strip", () => {
    const art = css.indexOf(".svu-banner-art { margin-top: 22px; overflow-x: auto;");
    expect(art).toBeGreaterThan(-1);
    // The strip rules live inside the phone media query, not at desktop width.
    expect(css.slice(0, art)).toContain("@media (max-width: 760px)");
    expect(css.slice(art, art + 220)).toContain(".svu-banner-art img { width: 760px; min-width: 760px; }");
  });
});
