import { cleanup, render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { afterEach, describe, expect, it } from "vitest";
import type { ReactElement } from "react";
import IbmPages from "@/components/site/IbmPages";
import OrganisationProgrammes from "@/components/site/OrganisationProgrammes";
import ProgrammeDetail from "@/components/site/ProgrammeDetail";
import SvuPages from "@/components/site/SvuPages";
import { programmes } from "@/data/site";

// Client brief, 2 November 2026: the "Our Collaboration Network" breadcrumb link is
// removed from every partner page, replaced by a colourful back button at the top.
afterEach(cleanup);

const open = (ui: ReactElement) => render(<MemoryRouter>{ui}</MemoryRouter>);

const position = (root: HTMLElement, selector: string) => {
  const node = root.querySelector(selector);
  return node ? Array.from(root.querySelectorAll("*")).indexOf(node) : -1;
};

const expectNetworkBack = (container: HTMLElement) => {
  const back = container.querySelector("a.network-back");
  expect(back?.getAttribute("href")).toBe("/collaboration-network");
  expect(back?.textContent).toBe("Back to Our Collaboration Network");
  // the first link on the page is the back button, so it really is the topmost one
  expect(container.querySelector("a")?.classList.contains("network-back")).toBe(true);
  const crumb = container.querySelector("nav[aria-label='Breadcrumb']");
  expect(crumb?.textContent ?? "").not.toContain("Our Collaboration Network");
  if (crumb) {
    expect(position(container, "a.network-back")).toBeLessThan(
      position(container, "nav[aria-label='Breadcrumb']"),
    );
  }
};

const ibmProgramme = programmes.find(p => p.organisation === "IBM")!;
const svuProgramme = programmes.find(p => p.organisation === "SVU")!;

describe("collaboration partner back button", () => {
  it("sits above the SVU section pages without a network breadcrumb link", () => {
    const { container } = open(<SvuPages section="overview" />);
    expectNetworkBack(container);
  });

  it("sits above the IBM page without a network breadcrumb link", () => {
    const { container } = open(<IbmPages />);
    expectNetworkBack(container);
  });

  it("sits above an IBM programme page without a network breadcrumb link", () => {
    const { container } = open(<ProgrammeDetail programme={ibmProgramme} organisationOverview />);
    expectNetworkBack(container);
  });

  it("sits above a partner programme listing without a network breadcrumb link", () => {
    const { container } = open(<OrganisationProgrammes organisation="SVU" />);
    expectNetworkBack(container);
  });

  it("omits the unnecessary network back button from SVU programme pages", () => {
    const { container } = open(<ProgrammeDetail programme={svuProgramme} />);
    expect(container.querySelector("a.network-back")).toBeNull();
    expect(container.querySelector("nav[aria-label='Breadcrumb']")).toBeTruthy();
  });
});
