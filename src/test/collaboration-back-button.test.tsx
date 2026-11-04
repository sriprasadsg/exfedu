import { cleanup, render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { afterEach, describe, expect, it } from "vitest";
import type { ReactElement } from "react";
import IbmPages from "@/components/site/IbmPages";
import OrganisationProgrammes from "@/components/site/OrganisationProgrammes";
import ProgrammeDetail from "@/components/site/ProgrammeDetail";
import SvuPages from "@/components/site/SvuPages";
import { programmes } from "@/data/site";

// Client brief, 4 November 2026: the "Back to Our Collaboration Network" pill is
// removed from every page — the combined page is retired, so breadcrumbs and
// partner navigation handle movement instead.
afterEach(cleanup);

const open = (ui: ReactElement) => render(<MemoryRouter>{ui}</MemoryRouter>);

const expectNoNetworkBack = (container: HTMLElement) => {
  expect(container.querySelector("a.network-back")).toBeNull();
  expect(container.textContent ?? "").not.toContain("Back to Our Collaboration Network");
};

const ibmProgramme = programmes.find(p => p.organisation === "IBM")!;
const svuProgramme = programmes.find(p => p.organisation === "SVU")!;

describe("collaboration back button", () => {
  it("is absent from the SVU section pages", () => {
    const { container } = open(<SvuPages section="overview" />);
    expectNoNetworkBack(container);
  });

  it("is absent from the IBM page", () => {
    const { container } = open(<IbmPages />);
    expectNoNetworkBack(container);
  });

  it("is absent from an IBM programme page", () => {
    const { container } = open(<ProgrammeDetail programme={ibmProgramme} organisationOverview />);
    expectNoNetworkBack(container);
  });

  it("is absent from a partner programme listing", () => {
    const { container } = open(<OrganisationProgrammes organisation="SVU" />);
    expectNoNetworkBack(container);
  });

  it("is absent from SVU programme pages while the breadcrumb stays", () => {
    const { container } = open(<ProgrammeDetail programme={svuProgramme} />);
    expectNoNetworkBack(container);
    expect(container.querySelector("nav[aria-label='Breadcrumb']")).toBeTruthy();
  });
});
