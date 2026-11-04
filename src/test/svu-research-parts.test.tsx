import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { afterEach, describe, expect, it } from "vitest";
import SvuPages from "@/components/site/SvuPages";
import { svuConferencePapers, svuPublications } from "@/data/svuReviewed";

afterEach(cleanup);

const openResearch = () =>
  render(<MemoryRouter initialEntries={["/collaboration-network/svu/outcomes"]}><SvuPages section="outcomes" /></MemoryRouter>);

// The client asked for the tab strip to go (4 November 2026): all three kinds of
// student work must read on the page itself, never behind a click.
describe("Projects & Research renders without the tab strip", () => {
  it("has no tab control at all", () => {
    const { container } = openResearch();
    expect(container.querySelector('[role="tablist"]')).toBeNull();
    expect(container.querySelector(".svu-research-tabs")).toBeNull();
  });

  it("shows all three kinds of student work under their own headings", () => {
    const { container } = openResearch();
    const headings = [...container.querySelectorAll(".svu-work-part > h3")].map(h => h.textContent);
    expect(headings).toEqual(["Student Projects", "Conference Presentations", "Research Papers"]);
    ["svu-student-projects", "svu-conference-presentations", "svu-research-papers"].forEach(id =>
      expect(container.querySelector(`#${id}`)).not.toBeNull(),
    );
  });

  it("keeps every conference presentation and research paper on the page", () => {
    const { container } = openResearch();
    expect(container.querySelectorAll("#svu-conference-presentations .svu-project-list article")).toHaveLength(svuConferencePapers.length);
    expect(container.querySelectorAll("#svu-research-papers .svu-publications a")).toHaveLength(svuPublications.length);
  });

  it("still searches and pages through projects without any tab switch", () => {
    const { container } = openResearch();
    fireEvent.click(screen.getByRole("button", { name: "Next" }));
    expect(container.querySelector("#svu-project-7")).not.toBeNull();
    fireEvent.change(screen.getByLabelText("Search student projects"), { target: { value: "zzzz" } });
    expect(screen.getByRole("status")).toBeInTheDocument();
  });
});
