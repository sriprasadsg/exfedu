import { describe, expect, it } from "vitest";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import CollaborationLoop from "@/components/site/CollaborationLoop";

/* Client brief, 3 November 2026: the collaboration network page carries an original
   three-segment loop symbol. The three labels, their supporting lines and the caption are
   fixed by the brief. The institution segment must never name SVU or XIME, and official
   organisation logos stay outside the symbol. */

const view = () => render(<MemoryRouter><CollaborationLoop /></MemoryRouter>);

const LABELS: [string, string][] = [
  ["Collaborating Institutions", "Academic expertise & programme delivery"],
  ["IBM", "Technology knowledge & skills"],
  ["Exafluence Education", "Applied learning & industry mentoring"],
];

describe("collaboration network loop", () => {
  it("shows the three labels with their approved supporting lines", () => {
    const { container } = view();
    const labels = [...container.querySelectorAll(".loop-label")];
    expect(labels.map((l) => l.querySelector(".loop-title")?.textContent?.trim())).toEqual(LABELS.map(([t]) => t));
    labels.forEach((label, i) => expect(label.querySelector(".loop-line")?.textContent?.trim()).toBe(LABELS[i][1]));
    expect(container.querySelector(".loop-caption")?.textContent).toBe("Academia \u00b7 Technology \u00b7 Applied Learning.");
  });

  it("draws three equal segments on one circle around an open centre", () => {
    const { container } = view();
    const segments = [...container.querySelectorAll(".loop-seg")];
    expect(segments).toHaveLength(3);
    // Equal size: same stroke weight and the same arc radius on every segment.
    expect(segments.map((s) => s.getAttribute("stroke-width"))).toEqual(["22", "22", "22"]);
    expect(segments.every((s) => /A 88 88 /.test(s.getAttribute("d") ?? ""))).toBe(true);
    // Nothing fills the middle: the symbol carries no solid centre shape.
    expect(container.querySelectorAll(".loop-symbol rect, .loop-symbol ellipse")).toHaveLength(0);
  });

  it("keeps the institution segment unnamed and official logos out of the symbol", () => {
    const { container } = view();
    const institutions = container.querySelector(".loop-label[data-segment='institutions']")!.textContent ?? "";
    for (const banned of ["SVU", "Sri Venkateswara", "XIME"]) expect(institutions).not.toContain(banned);
    expect(container.querySelector(".loop-symbol img")).toBeNull();
    expect(container.querySelector(".loop-symbol svg")?.getAttribute("aria-hidden")).toBe("true");
  });
});
