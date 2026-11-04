import { describe, expect, it } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import SvuPages from "@/components/site/SvuPages";
import type { SvuPageId } from "@/lib/programmeNavigation";

const open = (section: SvuPageId) =>
  render(<MemoryRouter><SvuPages section={section} /></MemoryRouter>);

describe("SVU pages", () => {
  it("student innovations & internships shows two photo stories, the group photo once, and the hackathon result", () => {
    const { container } = open("innovations");
    expect(container.querySelectorAll(".svu-story")).toHaveLength(2);
    expect(container.querySelectorAll('img[src*="svu-paniit-delegation"]')).toHaveLength(1);
    expect([...container.querySelectorAll(".svu-story h3")].map(h => h.textContent)).toEqual([
      "Student Participation at PanIIT Andhra Pradesh Summit",
      "Student Innovation at Ratan Tata Innovation Hub",
    ]);
    expect(container.querySelectorAll(".svu-story p")).toHaveLength(3);
    expect(container.textContent).toContain("Prof. Tata Narasinga Rao");
    expect(container.textContent).toContain("Prof. G. Anjan Babu");
    const champion = container.querySelector(".svu-champion");
    expect(champion).toBeTruthy();
    expect(container.querySelectorAll(".svu-champion")).toHaveLength(1);
    expect(champion!.querySelector(".svu-champion-title")!.textContent).toBe("SVU\u2013Exafluence MS Data Science Students Win First Prize at Quantum Hackathon Semi-Finals");
    expect(champion!.querySelector(".svu-champion-standfirst")!.textContent).toBe("Applying quantum computing and data science to financial market forecasting.");
    const lines = [...champion!.querySelectorAll(".svu-champion-line")].map(p => p.textContent!.replace(/\u00A0/g, " "));
    expect(lines).toHaveLength(3);
    expect(lines[0]).toBe("Students from the MS Data Science programme offered through Sri Venkateswara University and Exafluence Education secured first prize in the semi-finals of the AP Quantum Hackathon 2025 for their project, \u201cQuantum Wave Forecast.\u201d");
    expect(lines[1]).toBe("Competing against approximately 50 teams from Tirupati, Nellore and Kadapa districts, the team developed a hybrid quantum\u2013classical model to predict FTSE 100 market trends. The project combined Quantum Fourier Transform, a Variational Quantum Classifier and Explainable AI.");
    expect(lines[2]).toBe("Our students were congratulated by SVU\u2019s Vice-Chancellor, Prof. Apparao, along with the Registrar and faculty members.");
    expect(champion!.querySelector("a.svu-champion-link")).toBeNull();

    expect(container.querySelector(".svu-highlight")).toBeNull();

    expect(container.querySelectorAll("h1")).toHaveLength(1);
  });
  it("tab bar links to five pages", () => {
    const { container } = open("overview");
    const hrefs = [...container.querySelectorAll(".svu-tabbar a")].map(a => a.getAttribute("href"));
    expect(hrefs).toEqual([
      "/collaboration-network/svu",
      "/collaboration-network/svu/outcomes",
      "/collaboration-network/svu/innovations",
      "/collaboration-network/svu/placements",
      "/collaboration-network/svu/faculty",
    ]);
  });
  it("overview carries the programmes and one h1", () => {
    const { container } = open("overview");
    expect(container.querySelector("#programmes")).not.toBeNull();
    expect(container.querySelectorAll(".svu-directory-row").length).toBeGreaterThan(0);
    expect(container.querySelectorAll("h1")).toHaveLength(1);
  });
  it("faculty page lists all 12 mentors and 5 technical faculty", () => {
    const { container } = open("faculty");
    expect(container.querySelectorAll(".fd-cell")).toHaveLength(17);
    expect(container.querySelectorAll("h1")).toHaveLength(1);
  });
  it("projects show six at a time with pagination and no public approval note", () => {
    const { container } = open("outcomes");
    expect(container.querySelectorAll(".svu-project-list article")).toHaveLength(6);
    expect(container.textContent).not.toContain("Approved Content Required");
    fireEvent.click(screen.getByRole("button", { name: "Next" }));
    expect(container.querySelector("#svu-project-7")).not.toBeNull();
  });
  it("placements keep all 11 records on their own page", () => {
    const { container } = open("placements");
    expect(container.querySelectorAll("#placements .svu-outcome")).toHaveLength(11);
    expect(container.querySelectorAll("h1")).toHaveLength(1);
  });
  it("internships keep all 11 records on the innovations page", () => {
    const { container } = open("innovations");
    expect(container.querySelectorAll("#internships .svu-intern-card")).toHaveLength(11);
    expect(container.querySelectorAll("h1")).toHaveLength(1);
  });
  it("uses G V Sumanth consistently", () => {
    const { container } = open("innovations");
    expect(container.textContent).toContain("G V Sumanth");
    expect(container.textContent).not.toContain("Sumanth G V");
  });
});
