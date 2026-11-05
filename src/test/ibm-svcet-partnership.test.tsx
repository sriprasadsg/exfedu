import { cleanup, fireEvent, render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { afterEach, describe, expect, it } from "vitest";
import IbmPages from "@/components/site/IbmPages";

// Client brief, 5 November 2026: the SVCET collaboration card sits under "Explore the
// Programmes" and follows the internship-update presentation — the closing sentence opens
// on click, and every word stays exactly as supplied.
afterEach(cleanup);

const open = () => render(<MemoryRouter><IbmPages /></MemoryRouter>);

const TITLE = "Exafluence Education and IBM Join Hands with SVCET";
const SUMMARY = "Exafluence Education, in collaboration with IBM, has introduced “Generative AI Using IBM watsonx” at Sri Venkateswara College of Engineering and Technology (Autonomous), Chittoor, as a value-added programme for all final-year B.Tech students, helping them gain practical knowledge and skills in Generative AI.";
const MORE = "Students who successfully complete the programme will receive a joint certificate.";
const WHOLE = `${SUMMARY} ${MORE}`;

describe("IBM SVCET collaboration card", () => {
  it("sits directly under the programmes section", () => {
    const { container } = open();
    const sections = Array.from(container.querySelectorAll(".ibm-flow > section"));
    const position = (name: string) => sections.findIndex(s => s.classList.contains(name));
    expect(position("ibm-partnership")).toBe(position("ibm-block") + 1);
    expect(sections[position("ibm-partnership") - 1].id).toBe("programmes");
  });

  it("shows the approved title, pill and opening sentence without the closing one", () => {
    const { container } = open();
    const card = container.querySelector("section.ibm-partnership")!;
    expect(card.querySelector("h3")?.textContent).toBe(TITLE);
    expect(card.querySelector(".ibm-partnership-status")?.textContent).toBe("Value-Added Programme");
    expect(card.querySelector(".ibm-partnership-summary")?.textContent).toBe(SUMMARY);
    expect(Array.from(card.querySelectorAll(".ibm-partnership-details li")).map(li => li.textContent))
      .toEqual(["Generative AI", "IBM watsonx", "Chittoor", "Joint certificate"]);
    expect(card.querySelector(".ibm-partnership-extra")?.hasAttribute("hidden")).toBe(true);
  });

  it("opens the closing sentence on click and closes it again", () => {
    const { container } = open();
    const card = container.querySelector("section.ibm-partnership")!;
    const toggle = card.querySelector(".ibm-partnership-toggle")!;
    const extra = card.querySelector(".ibm-partnership-extra")!;
    expect(toggle.getAttribute("aria-expanded")).toBe("false");

    fireEvent.click(toggle);
    expect(extra.hasAttribute("hidden")).toBe(false);
    expect(extra.textContent).toBe(MORE);
    expect(toggle.textContent).toContain("Hide Collaboration Details");
    expect(toggle.getAttribute("aria-expanded")).toBe("true");
    // The two halves together are still the wording the client supplied, word for word.
    expect(`${card.querySelector(".ibm-partnership-summary")!.textContent} ${extra.textContent}`).toBe(WHOLE);

    fireEvent.click(toggle);
    expect(extra.hasAttribute("hidden")).toBe(true);
    expect(toggle.textContent).toContain("View Collaboration Details");
  });
});
