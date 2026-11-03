import { describe, expect, it } from "vitest";
import { render } from "@testing-library/react";
import BannerStory from "@/components/home/BannerStory";

/* Client brief, 3 November 2026: the XIME banner carries an original four-layer
   AI–FinTech composition. The layer names and their supporting lines are the brief's exact
   wording; the stack builds Financial Data -> AI & Machine Learning -> FinTech Applications
   -> Business Insights; the artwork is static, conceptual, and compact on a phone. */

const LAYERS: [string, string][] = [
  ["Business Insights", "Dashboard and decision indicators"],
  ["FinTech Applications", "Payments, risk and financial analytics"],
  ["AI & Machine Learning", "Connected nodes and predictive models"],
  ["Financial Data", "Transactions, tables and data streams"],
];

const view = () => render(<BannerStory organisation="XIME" active />);

describe("XIME AI-FinTech layers banner", () => {
  it("labels every platform with the approved wording", () => {
    const { container } = view();
    const full = container.querySelector(".xl-full")!;
    expect([...full.querySelectorAll(".xl-title")].map((t) => t.textContent)).toEqual(LAYERS.map(([t]) => t));
    expect([...full.querySelectorAll(".xl-sub")].map((t) => t.textContent)).toEqual(LAYERS.map(([, s]) => s));
    expect(full.getAttribute("role")).toBe("img");
    expect(full.getAttribute("aria-label")).toContain("four stacked platforms");
  });

  it("stacks four equal platforms, each with one icon and vertical supports", () => {
    const { container } = view();
    const full = container.querySelector(".xl-full")!;
    const tops = [...full.querySelectorAll(".xl-top")];
    expect(tops).toHaveLength(4);
    // Equal platforms: every top face is the same rhombus, only shifted down the stack.
    expect(new Set(tops.map((p) => (p.getAttribute("d") ?? "").replace(/-?\d+(\.\d+)?/g, "#"))).size).toBe(1);
    expect(full.querySelectorAll(".xl-icon")).toHaveLength(4);
    expect(full.querySelectorAll(".xl-link")).toHaveLength(6);
    expect(full.querySelectorAll(".xl-edge")).toHaveLength(2);
  });

  it("stays static and keeps the phone version compact", () => {
    const { container } = view();
    expect(container.querySelector(".bs-replay")).toBeNull();
    const compact = container.querySelector(".xl-compact")!;
    expect(compact.querySelectorAll(".xl-title")).toHaveLength(4);
    expect(compact.querySelectorAll(".xl-sub")).toHaveLength(0);
    expect(compact.getAttribute("viewBox")).toBe("0 0 380 320");
  });
});
