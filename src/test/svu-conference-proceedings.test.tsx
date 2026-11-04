import { cleanup, render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { afterEach, describe, expect, it } from "vitest";
import SvuPages from "@/components/site/SvuPages";
import { svuConferencePapers } from "@/data/svuReviewed";

afterEach(cleanup);

const open = () =>
  render(<MemoryRouter initialEntries={["/collaboration-network/svu/outcomes"]}><SvuPages section="outcomes" /></MemoryRouter>);

/** The client asked for the conference work to read differently from the ordinary list
 * (4 November 2026): presentations are grouped under the event they were given at. */
describe("conference presentations read as a proceedings board", () => {
  it("groups every presentation under its own event", () => {
    const { container } = open();
    const venues = [...new Set(svuConferencePapers.map(p => p.conference))];
    const bands = [...container.querySelectorAll("#svu-conference-presentations .svu-proceeding")];
    expect(bands).toHaveLength(venues.length);
    expect(bands.map(b => b.querySelector(".svu-proceeding-event")?.textContent)).toEqual(venues.map(v => v.split(" · ")[0]));
    expect(bands.map(b => b.querySelector(".svu-proceeding-place")?.textContent)).toEqual(venues.map(v => v.split(" · ")[1]));
  });

  it("keeps every approved presentation with its presenter named", () => {
    const { container } = open();
    const tiles = [...container.querySelectorAll("#svu-conference-presentations .svu-proceeding-paper")];
    expect(tiles).toHaveLength(svuConferencePapers.length);
    svuConferencePapers.forEach(paper => {
      const tile = tiles.find(t => t.querySelector(".svu-proceeding-title")?.textContent === paper.title);
      expect(tile, `missing presentation: ${paper.title}`).toBeTruthy();
      expect(tile!.querySelector(".svu-proceeding-by")?.textContent).toBe(`Presented by ${paper.student}`);
    });
  });

  it("drops the plain project-list treatment and adds no counts", () => {
    const { container } = open();
    expect(container.querySelector("#svu-conference-presentations .svu-project-list")).toBeNull();
    [...container.querySelectorAll("#svu-conference-presentations .svu-proceeding-head")].forEach(head =>
      expect(head.textContent).not.toMatch(/\d+\s+(presentation|presentations)/),
    );
  });
});
