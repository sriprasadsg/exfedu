import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";
import SvuPages from "@/components/site/SvuPages";

const renderOverview = () =>
  render(<MemoryRouter><SvuPages section="overview" /></MemoryRouter>);

const cards = (container: HTMLElement) =>
  [...container.querySelectorAll<HTMLElement>("ol.svu-steps > li.svu-step")];

const stepTitles = (container: HTMLElement) =>
  cards(container).map(card => card.querySelector("strong")?.textContent?.trim() ?? "");

describe("SVU teaching approach flash cards (client brief, 2 November 2026)", () => {
  it("presents the three steps as flash cards in the approved order and wording", () => {
    const { container } = renderOverview();
    expect(stepTitles(container)).toEqual(["Understand", "Apply", "Present"]);
    expect(cards(container).map(card => card.querySelector(".svu-step-text")?.textContent?.trim())).toEqual([
      "Core concepts in data, methods and results, guided by faculty and industry professionals.",
      "Programming exercises, case studies and technical discussions.",
      "Explain how a solution works and why the approach was chosen.",
    ]);
  });

  it("gives every card its own colourful theme and a themed icon", () => {
    const { container } = renderOverview();
    const shown = cards(container);
    expect(shown).toHaveLength(3);
    expect(shown.map(card => card.classList.contains("svu-step--blue") || card.classList.contains("svu-step--teal") || card.classList.contains("svu-step--violet"))).toEqual([true, true, true]);
    expect(shown.map(card => card.querySelector(".svu-step-icon svg") !== null)).toEqual([true, true, true]);
  });

  it("shows no 01/02/03 numerics inside the cards", () => {
    const { container } = renderOverview();
    expect(container.querySelector("ol.svu-steps")).not.toBeNull();
    expect(container.querySelector(".svu-step-number")).toBeNull();
    expect(cards(container).every(card => !/\b0[123]\b/.test(card.textContent ?? ""))).toBe(true);
  });

  it("animates each card with a staggered entrance delay", () => {
    const { container } = renderOverview();
    expect(cards(container).map(card => card.style.getPropertyValue("--step-delay"))).toEqual(["0s", "0.12s", "0.24s"]);
  });
});
