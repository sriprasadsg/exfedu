// Client brief, 2 November 2026: the "13 programmes" count line above the directory
// is not wanted, and the column headings should read as colourful labelled columns.
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";
import ProgrammeDirectory from "@/components/site/ProgrammeDirectory";

const renderDirectory = () => render(<MemoryRouter><ProgrammeDirectory /></MemoryRouter>);

describe("programme directory header", () => {
  it("shows no record count above the table", () => {
    const { container } = renderDirectory();
    expect(container.querySelector(".programme-count")).toBeNull();
    expect(screen.queryByText(/^\d+ programmes?$/)).toBeNull();
  });

  it("labels every column once, in order", () => {
    const { container } = renderDirectory();
    const headings = [...container.querySelectorAll(".programme-table-head .programme-head-cell > span")]
      .map(cell => cell.textContent?.trim());
    expect(headings).toEqual(["Programme", "Duration", "Delivery Mode", "Intake", "View Details"]);
  });

  it("pairs every column heading with its own icon", () => {
    const { container } = renderDirectory();
    const cells = [...container.querySelectorAll(".programme-table-head .programme-head-cell")];
    expect(cells).toHaveLength(5);
    cells.forEach(cell => expect(cell.querySelector("svg")).toBeTruthy());
  });
});
