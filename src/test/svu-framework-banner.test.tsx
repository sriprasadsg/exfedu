import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { afterEach, describe, expect, it } from "vitest";
import SvuPages from "@/components/site/SvuPages";
import diagram from "@/assets/svu-framework-royal-blue.png";

afterEach(cleanup);

describe("SVU framework enlargement", () => {
  it("opens the existing diagram in an enlarged view and closes it again", () => {
    render(<MemoryRouter><SvuPages section="overview" /></MemoryRouter>);
    expect(screen.queryByRole("dialog")).toBeNull();
    fireEvent.click(screen.getByRole("button", { name: "Enlarge technology framework image" }));
    expect(screen.getByRole("dialog")).toBeTruthy();
    expect(screen.getByAltText("Enlarged Exafluence Education technology framework").getAttribute("src")).toBe(diagram);
    fireEvent.click(screen.getByRole("button", { name: "Close" }));
    expect(screen.queryByRole("dialog")).toBeNull();
  });
});