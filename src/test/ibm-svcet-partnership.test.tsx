import { cleanup, render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { afterEach, describe, expect, it } from "vitest";
import IbmPages from "@/components/site/IbmPages";

// Client brief, 5 November 2026: a collaboration card sits under the IBM page's
// institutions section with the SVCET wording kept word for word.
afterEach(cleanup);

const open = () => render(<MemoryRouter><IbmPages /></MemoryRouter>);

const TITLE = "Exafluence Education and IBM Join Hands with SVCET";
const BODY = "Exafluence Education, in collaboration with IBM, has introduced “Generative AI Using IBM watsonx” at Sri Venkateswara College of Engineering and Technology (Autonomous), Chittoor, as a value-added programme for all final-year B.Tech students, helping them gain practical knowledge and skills in Generative AI. Students who successfully complete the programme will receive a joint certificate.";

describe("IBM SVCET collaboration card", () => {
  it("prints the approved title and content exactly as supplied", () => {
    const { container } = open();
    const card = container.querySelector("section.ibm-partnership");
    expect(card).toBeTruthy();
    expect(card!.querySelector("h3")?.textContent).toBe(TITLE);
    expect(card!.querySelector("p")?.textContent).toBe(BODY);
  });

  it("sits under the institutions section and above the learner section", () => {
    const { container } = open();
    const sections = Array.from(container.querySelectorAll(".ibm-flow > section"));
    const position = (name: string) => sections.findIndex(s => s.classList.contains(name));
    expect(position("ibm-institution")).toBeGreaterThanOrEqual(0);
    expect(position("ibm-institution")).toBeLessThan(position("ibm-partnership"));
    expect(position("ibm-partnership")).toBeLessThan(position("ibm-learner"));
  });
});
