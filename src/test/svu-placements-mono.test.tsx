import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import SvuCareerRecords from "@/components/site/SvuCareerRecords";
import SvuPages from "@/components/site/SvuPages";
import { MemoryRouter } from "react-router-dom";
import { svuPlacements } from "@/data/svuCareer";

/** Placements follow the client's sleek monochrome brief (4 November 2026): an oversized
 * headline with an italic final word, then hairline-ruled record rows — no filled bands,
 * crest badges, pills or tilted cards. Every approved record still renders in order. */

describe("SVU placements monochrome presentation", () => {
  it("shows the headline with its italic final word and a hairline record ledger", () => {
    const { container } = render(<SvuCareerRecords kind="placements" />);
    expect(container.querySelector(".svu-career-records--mono")).not.toBeNull();
    expect(container.querySelector(".svu-career-title-card > h1 > em")?.textContent).toBe("Placements");
    expect(container.querySelector(".svu-mono-ledger")).not.toBeNull();
    expect(container.querySelectorAll(".svu-mono-row")).toHaveLength(11);
  });

  it("retires the navy band, crest badge and pill batch chip", () => {
    const { container } = render(<SvuCareerRecords kind="placements" />);
    expect(container.querySelector(".svu-service-band")).toBeNull();
    expect(container.querySelector(".svu-offer-crest")).toBeNull();
    expect(container.querySelector(".svu-offer-head")).toBeNull();
    expect(container.querySelector(".svu-offer-fields")).toBeNull();
    expect(container.querySelector(".svu-offer-batch")).toBeNull();
    expect(container.querySelector(".svu-career-records-heading")?.textContent).toBe("Placement Records");
  });

  it("keeps every approved placement record, in order, inside its own row", () => {
    const { container } = render(<SvuCareerRecords kind="placements" />);
    const shown = [...container.querySelectorAll(".svu-mono-row")].map(row => [
      row.querySelector(".svu-outcome-org")?.textContent?.trim(),
      row.querySelector("h3")?.textContent?.trim(),
      row.querySelector(".svu-outcome-role")?.textContent?.trim(),
      row.querySelector(".svu-outcome-batch")?.textContent?.trim(),
    ]);
    expect(shown).toEqual(svuPlacements.map(record => [record.organisation, record.student, record.designation, `Batch ${record.batch}`]));
  });

  it("renders the ledger on the placements page without internship material", () => {
    const { container } = render(<MemoryRouter><SvuPages section="placements" /></MemoryRouter>);
    expect(container.querySelector("h1")?.textContent).toBe("Placements");
    expect(container.querySelectorAll("#placements .svu-mono-row")).toHaveLength(11);
    expect(container.querySelector(".svu-internship-update")).toBeNull();
    expect(container.querySelector(".svu-career-title-card > h2 > em")?.textContent).toBe("Placements");
  });
});
