import { cleanup, render, screen, within } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { afterEach, describe, expect, it } from "vitest";
import Header from "@/components/layout/Header";
import { SvuTabBar } from "@/components/site/SvuPages";
import { fireEvent } from "@testing-library/react";

afterEach(cleanup);

describe("admin & support team menu entry", () => {
  it("sits in the SVU section tab bar", () => {
    render(<MemoryRouter><SvuTabBar active="faculty" /></MemoryRouter>);
    const bar = within(screen.getByRole("navigation", { name: "Sri Venkateswara University sections" }));
    const link = bar.getByRole("link", { name: "Admin & Support Team" });
    expect(link.getAttribute("href")).toBe("/admin-support-team");
    expect(bar.getAllByRole("link").map(l => l.textContent)).toEqual([
      "Overview & Programmes", "Projects & Research", "Student Innovations & Internships",
      "Placements", "Faculty & Mentors", "Admin & Support Team",
    ]);
  });

  it("is offered once in the ☰ drawer", () => {
    render(<MemoryRouter><Header /></MemoryRouter>);
    fireEvent.click(screen.getByRole("button", { name: "Open menu" }));
    const drawer = within(screen.getByRole("navigation", { name: "Mobile navigation" }));
    const links = drawer.getAllByRole("link", { name: "Admin & Support Team" });
    expect(links).toHaveLength(1);
    expect(links[0].getAttribute("href")).toBe("/admin-support-team");
  });

  it("is not in the site top menu bar", () => {
    render(<MemoryRouter><Header /></MemoryRouter>);
    const bar = within(screen.getByRole("navigation", { name: "Main navigation" }));
    expect(bar.queryByRole("link", { name: "Admin & Support Team" })).toBeNull();
  });
});
