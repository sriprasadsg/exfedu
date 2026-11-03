import { cleanup, render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { afterEach, describe, expect, it } from "vitest";
import IbmPages from "@/components/site/IbmPages";

/* Client brief, 3 November 2026: the supplied isometric technology campus render is the
   banner artwork on the IBM page. XIME is removed from the network, so no XIME page or
   artwork may render anywhere. */
afterEach(cleanup);

const imgSrc = (container: HTMLElement, selector: string) =>
  container.querySelector<HTMLImageElement>(selector)?.getAttribute("src") ?? "";

describe("partner page banner artwork", () => {
  it("shows the supplied technology campus render on the IBM page", () => {
    const { container } = render(<MemoryRouter><IbmPages /></MemoryRouter>);
    expect(imgSrc(container, ".ibm-intro-art img")).toContain("ibm-collaboration-campus-v2.png");
  });

  it("keeps the XIME fintech render off the IBM page", () => {
    const ibm = render(<MemoryRouter><IbmPages /></MemoryRouter>).container;
    expect(imgSrc(ibm, ".ibm-intro-art img")).not.toContain("xime-fintech-platform");
  });
});
