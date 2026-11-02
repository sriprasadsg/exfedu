import { cleanup, fireEvent, render, screen, within } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { afterEach, describe, expect, it } from "vitest";
import SkillShonePage from "@/components/site/SkillShonePage";
import { pages } from "@/data/site";

const page = pages.find((p) => p.path === "/skillshone")!;
const open = () => render(<MemoryRouter><SkillShonePage page={page} breadcrumb={null} /></MemoryRouter>);

afterEach(cleanup);

// The client retracted the bottom strip (27 Oct 2026): nothing may rise from the
// bottom edge of the screen. Every detail sits on the page, and FAQ answers open
// inline under their own question, one at a time.
describe("SkillShone inline detail", () => {
  it("shows feature and journey detail on the page with nothing clicked", () => {
    open();
    expect(screen.getByText(/Curated real-world challenges, complete with datasets/)).toBeInTheDocument();
    expect(screen.getByText(/Build with project-aware AI assistance\./)).toBeInTheDocument();
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    expect(document.querySelector(".ss-sheet")).toBeNull();
    expect(screen.queryByLabelText("Contact name")).not.toBeInTheDocument();
  });

  it("renders the six journey steps as square grid boxes and the features on the timeline", () => {
    open();
    const cards = Array.from(document.querySelectorAll(".ss-journey-card"));
    expect(cards.length).toBe(6);
    cards.forEach((card) => {
      const tile = card.querySelector(".ss-journey-tile")!;
      expect(tile.className).toMatch(/ss-tone-(blue|teal|violet|amber)/);
      expect(tile.querySelector("svg")).not.toBeNull();
      expect(card.querySelector("h3")).not.toBeNull();
    });
    const rows = Array.from(document.querySelectorAll(".ss-tl-row"));
    expect(rows.length).toBe(6);
    rows.forEach((row) => {
      const tile = row.querySelector(".ss-tl-tile")!;
      expect(tile.className).toMatch(/ss-tone-(blue|teal|violet|amber)/);
      const img = tile.querySelector("img")!;
      expect(img.getAttribute("src")).toMatch(/ss-feat-(problems|datasets|llm|mentor|review|certificate)/);
      const card = row.querySelector(".ss-tl-card")!;
      expect(card.querySelector("h3")).not.toBeNull();
    });
  });




  it("keeps a FAQ answer closed until its own question is clicked", () => {
    open();
    const answer = screen.getByText(/AI-powered industry project learning platform/);
    expect(answer).toHaveAttribute("hidden");
    fireEvent.click(screen.getByRole("button", { name: /What is SkillShone\?/ }));
    expect(answer).not.toHaveAttribute("hidden");
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("opens one answer at a time and closes it again from the same question", () => {
    open();
    const answer = screen.getByText(/AI-powered industry project learning platform/);
    const first = screen.getByRole("button", { name: /What is SkillShone\?/ });
    const second = screen.getByRole("button", { name: /What types of projects/ });
    fireEvent.click(first);
    expect(first).toHaveAttribute("aria-expanded", "true");
    expect(within(first.closest("li")!).getByText(/AI-powered industry project learning platform/)).toBeInTheDocument();
    fireEvent.click(second);
    expect(first).toHaveAttribute("aria-expanded", "false");
    expect(second).toHaveAttribute("aria-expanded", "true");
    expect(answer).toHaveAttribute("hidden");
    fireEvent.click(second);
    expect(second).toHaveAttribute("aria-expanded", "false");
  });

  // Client, 2 Nov 2026: the audience-benefit answer is approved wording in three groups.
  it("shows the audience-benefit answer as three groups with two points each, closed until clicked", () => {
    open();
    const row = screen.getByText("How do these programmes benefit freshers, mid-career professionals and experienced specialists?").closest("li")!;
    const panel = row.querySelector(".ss-faq-a")!;
    expect(panel).toHaveAttribute("hidden");
    fireEvent.click(screen.getByRole("button", { name: /How do these programmes benefit/ }));
    expect(panel).not.toHaveAttribute("hidden");
    const groups = Array.from(panel.querySelectorAll(".ss-faq-group"));
    expect(groups.map((g) => g.querySelector("h5")!.textContent)).toEqual([
      "Freshers and Early-Career Learners",
      "Mid-Career Professionals",
      "Experienced Professionals and Domain Experts",
    ]);
    groups.forEach((g) => expect(g.querySelectorAll("li").length).toBe(2));
    expect(screen.getByText("Build technical foundations through practical exercises and projects.")).toBeInTheDocument();
  });

  // Client, 2 Nov 2026: the two summary boxes repeated the capsule above them, so they are gone.
  it("drops the repeated student/institution summary boxes below the capsule", () => {
    open();
    expect(document.querySelectorAll(".ss-foot-card").length).toBe(0);
    expect(screen.queryByText("For students")).not.toBeInTheDocument();
    expect(screen.queryByText(/Strengthen coding, analytical and problem-solving skills/)).not.toBeInTheDocument();
    expect(screen.queryByText(/Structured, application-based learning through industry problems/)).not.toBeInTheDocument();
    // the capsule itself still carries both sides
    expect(document.querySelectorAll(".ss-cap").length).toBe(2);
    expect(screen.getByText("Undergraduate & postgraduate students")).toBeInTheDocument();
    expect(screen.getByText("Academic–industry engagement")).toBeInTheDocument();
  });

  // Client, 2 Nov 2026: the pill capsule became a rounded two-partition panel, centre artwork gone.
  it("presents learners and institutions as two partitions with no centre illustration", () => {
    open();
    expect(document.querySelector(".ss-cap-core")).toBeNull();
    expect(document.querySelector(".ss-cap--left")).not.toBeNull();
    expect(document.querySelector(".ss-cap--right")).not.toBeNull();
    expect(document.querySelector(".ss-cap--left .ss-cap-badge svg")).not.toBeNull();
    expect(document.querySelector(".ss-cap--right .ss-cap-badge svg")).not.toBeNull();
    expect(document.querySelector(".ss-cap--left .ss-cap-side")!.textContent).toBe("Learners");
    expect(document.querySelector(".ss-cap--right .ss-cap-side")!.textContent).toBe("Institutions");
  });


  it("sends Enquire Now to the contact page instead of opening a panel", () => {
    open();
    expect(screen.getByRole("link", { name: "Enquire Now" })).toHaveAttribute("href", "/contact");
  });
});
