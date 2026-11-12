import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import { svuSupport } from "@/data/svuReviewed";

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

  it("preserves existing technical expertise when adding the two supplied profiles", () => {
    expect(svuSupport.slice(0, 5).map(p => p.expertise)).toEqual([
      "AI/ML research, Industrial IoT and student project mentoring.",
      "Data Science, AI and software development.",
      "Full-stack development, AI and MSDS academic assistance.",
      "Generative AI, NLP, cloud deployments and LLM evaluation.",
      "Python, AI, Computer Vision and RAG applications.",
    ]);
  });
});
