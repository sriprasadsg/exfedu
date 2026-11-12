import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";
import { svuPlacements } from "@/data/svuCareer";
import SvuCareerRecords from "@/components/site/SvuCareerRecords";

describe("SVU verified placement records", () => {
  it("preserves every verified name, company, designation and batch exactly once", () => {
    const { container } = render(<MemoryRouter><SvuCareerRecords kind="placements" /></MemoryRouter>);
    const records = [...container.querySelectorAll(".svu-outcome")].map(row => ({
      student: row.querySelector("h3")?.textContent,
      organisation: row.querySelector(".svu-outcome-org")?.textContent,
      designation: row.querySelector(".svu-outcome-role")?.textContent,
      batch: row.querySelector(".svu-outcome-batch")?.textContent?.replace("Batch ", ""),
    }));
    expect(records).toHaveLength(11);
    for (const record of svuPlacements) expect(records.filter(item => item.student === record.student)).toEqual([record]);
  });
});
