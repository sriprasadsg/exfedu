import { describe, expect, it } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import SvuPages from "@/components/site/SvuPages";

const open = (section: "overview" | "projects-research" | "placements" | "internships" | "programmes") =>
  render(<MemoryRouter><SvuPages section={section} /></MemoryRouter>);

describe("SVU pages", () => {
  it("overview shows two photo stories, the group photo once, and the hackathon result", () => {
    const { container } = open("overview");
    expect(container.querySelectorAll(".svu-story")).toHaveLength(2);
    expect(container.querySelectorAll('img[src*="svu-paniit-delegation"]')).toHaveLength(1);
    const champion = container.querySelector(".svu-champion");
    expect(champion).toBeTruthy();
    expect(container.querySelectorAll(".svu-champion")).toHaveLength(1);
    const bold = champion!.querySelector("strong.svu-champion-bold");
    expect(bold?.textContent).toBe("First place in the AP Quantum Hackathon");
    const lineText = bold!.closest(".svu-champion-line")!.textContent!.replace(/\u00A0/g, " ");
    expect(lineText).toContain("First place in the AP Quantum Hackathon 2025 semi-finals. The student project applies quantum computing and explainable AI to FTSE 100 market forecasting.");

    expect(container.querySelector(".svu-highlight")).toBeNull();

    expect(container.querySelectorAll("h1")).toHaveLength(1);
  });
  it("tab bar links to five separate pages", () => {
    const { container } = open("overview");
    const hrefs = [...container.querySelectorAll(".svu-tabbar a")].map(a => a.getAttribute("href"));
    expect(hrefs).toEqual(["/collaboration-network/svu", "/collaboration-network/svu/programmes", "/collaboration-network/svu/projects-research", "/collaboration-network/svu/internships", "/collaboration-network/svu/placements"]);
  });
  it("projects show six at a time with pagination and no public approval note", () => {
    const { container } = open("projects-research");
    expect(container.querySelectorAll(".svu-project-list article")).toHaveLength(6);
    expect(container.textContent).not.toContain("Approved Content Required");
    fireEvent.click(screen.getByRole("button", { name: "Next" }));
    expect(container.querySelector("#svu-project-7")).not.toBeNull();
  });
  it("placements and internships keep all 11 records with one heading", () => {
    for (const kind of ["placements", "internships"] as const) {
      const { container, unmount } = open(kind);
      expect(container.querySelectorAll(kind === "placements" ? ".svu-outcome" : ".svu-career-table tbody tr")).toHaveLength(11);
      expect(container.querySelectorAll("h1")).toHaveLength(1);
      unmount();
    }
  });
  it("uses G V Sumanth consistently", () => {
    const { container } = open("internships");
    expect(container.textContent).toContain("G V Sumanth");
    expect(container.textContent).not.toContain("Sumanth G V");
  });
});
