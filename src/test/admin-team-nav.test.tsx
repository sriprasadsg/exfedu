import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { afterEach, describe, expect, it } from "vitest";
import Header from "@/components/layout/Header";

afterEach(cleanup);

describe("admin & support team menu entry", () => {
  it("is reachable from the ☰ drawer", () => {
    render(<MemoryRouter><Header /></MemoryRouter>);
    fireEvent.click(screen.getByRole("button", { name: "Open menu" }));
    const link = screen.getByRole("link", { name: "Admin & Support Team" });
    expect(link.getAttribute("href")).toBe("/admin-support-team");
  });
});
