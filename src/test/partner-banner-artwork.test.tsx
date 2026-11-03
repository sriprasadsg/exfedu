import { cleanup, render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { afterEach, describe, expect, it } from "vitest";
import IbmPages from "@/components/site/IbmPages";
import XimeProgramme from "@/components/site/XimeProgramme";

/* Client brief, 3 November 2026: the two supplied renders become the banner artwork on the
   IBM and XIME pages — the isometric technology campus on IBM, the AI-FinTech platform on
   XIME. Each page shows its own render and never the other's. */
afterEach(cleanup);

const imgSrc = (container: HTMLElement, selector: string) =>
  container.querySelector<HTMLImageElement>(selector)?.getAttribute("src") ?? "";

describe("partner page banner artwork", () => {
  it("shows the supplied technology campus render on the IBM page", () => {
    const { container } = render(<MemoryRouter><IbmPages /></MemoryRouter>);
    expect(imgSrc(container, ".ibm-intro-art img")).toContain("ibm-collaboration-campus-v2.png");
  });

  it("shows the supplied AI-FinTech platform render on the XIME page", () => {
    const { container } = render(<MemoryRouter><XimeProgramme /></MemoryRouter>);
    expect(imgSrc(container, ".programme-intro-art img")).toContain("xime-fintech-platform-v2.png");
  });

  it("keeps the two renders on their own pages", () => {
    const ibm = render(<MemoryRouter><IbmPages /></MemoryRouter>).container;
    const xime = render(<MemoryRouter><XimeProgramme /></MemoryRouter>).container;
    expect(imgSrc(ibm, ".ibm-intro-art img")).not.toContain("xime-fintech-platform.png");
    expect(imgSrc(xime, ".programme-intro-art img")).not.toContain("ibm-collaboration-campus.png");
  });

  it("keeps the XIME introduction's approved wording beside its new artwork", () => {
    const { container } = render(<MemoryRouter><XimeProgramme /></MemoryRouter>);
    expect(container.querySelector(".programme-intro h1")).not.toBeNull();
    expect(container.querySelector(".programme-intro .programme-detail-logo")).not.toBeNull();
    expect(container.querySelectorAll(".programme-intro-art").length).toBe(1);
  });
});
