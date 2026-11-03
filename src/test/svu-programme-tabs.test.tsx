import { cleanup, render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { afterEach, describe, expect, it } from "vitest";
import ProgrammeDetail from "@/components/site/ProgrammeDetail";
import { programmes } from "@/data/site";

// Client brief, 2 November 2026: on SVU programme pages the order is
// breadcrumb → SVU navigation → programme title → introduction → programme details,
// and the navigation's left edge meets the title rather than sitting further in.
const programme = programmes.find((p) => p.slug === "masters-data-science")!;
const open = () => render(<MemoryRouter><ProgrammeDetail programme={programme} /></MemoryRouter>);

/** Returns the position of `selector` in document order, or -1 when absent. */
const at = (root: HTMLElement, selector: string) => {
  const node = root.querySelector(selector);
  return node ? Array.from(root.querySelectorAll("*")).indexOf(node) : -1;
};

afterEach(cleanup);

describe("SVU programme page navigation order", () => {
  it("places the tabs between the breadcrumb and the programme title", () => {
    const { container } = open();
    const crumb = at(container, "nav[aria-label='Breadcrumb']");
    const tabs = at(container, "nav[aria-label='Sri Venkateswara University sections']");
    const title = at(container, ".programme-intro h1");
    const intro = at(container, ".programme-intro h1 + p");
    const firstSection = at(container, ".programme-detail-section h2");

    expect(crumb).toBeGreaterThan(-1);
    expect(tabs).toBeGreaterThan(crumb);
    expect(title).toBeGreaterThan(tabs);
    expect(intro).toBeGreaterThan(title);
    expect(firstSection).toBeGreaterThan(intro);
  });

  it("keeps Overview & Programmes the active tab and aligns the bar with the page container", () => {
    const { container } = open();
    const bar = container.querySelector("nav[aria-label='Sri Venkateswara University sections']")!;
    const inner = bar.firstElementChild as HTMLElement;

    expect(inner.classList.contains("container")).toBe(true);
    expect(inner.classList.contains("svu-container")).toBe(false);
    expect(bar.querySelector("a.is-active")?.textContent).toBe("Overview & Programmes");
    expect(bar.querySelector("[aria-current='page']")?.textContent).toBe("Overview & Programmes");
  });

  it("leaves other partners' programme pages untouched", () => {
    const ibm = programmes.find((p) => p.organisation === "IBM")!;
    const { container } = render(<MemoryRouter><ProgrammeDetail programme={ibm} /></MemoryRouter>);
    const crumb = container.querySelector("nav[aria-label='Breadcrumb']")!;

    expect(container.querySelector("nav[aria-label='Sri Venkateswara University sections']")).toBeNull();
    // The breadcrumb stays inside the opening band, directly above the title.
    expect(crumb.parentElement?.parentElement?.className).toContain("programme-intro");
  });
});
