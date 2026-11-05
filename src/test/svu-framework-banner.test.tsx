import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { afterEach, describe, expect, it } from "vitest";
import SvuPages from "@/components/site/SvuPages";
import diagram from "@/assets/exafluence-education-program-diagram.png.asset.json";

afterEach(cleanup);

describe("SVU framework enlargement", () => {
  it("opens the existing diagram in an enlarged view and closes it again", () => {
    render(<MemoryRouter><SvuPages section="overview" /></MemoryRouter>);
    expect(screen.queryByRole("dialog")).toBeNull();
    fireEvent.click(screen.getByRole("button", { name: "Enlarge technology framework image" }));
    expect(screen.getByRole("dialog")).toBeTruthy();
    expect(screen.getByAltText("Enlarged Exafluence Education technology framework").getAttribute("src")).toBe(diagram.url);
    fireEvent.click(screen.getByRole("button", { name: "Close" }));
    expect(screen.queryByRole("dialog")).toBeNull();
  });
});