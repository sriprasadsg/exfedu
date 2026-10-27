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

  it("presents each journey step and feature on the centre-line timeline with its own artwork", () => {
    open();
    const rows = Array.from(document.querySelectorAll(".ss-tl-row"));
    expect(rows.length).toBe(12);
    rows.slice(0, 6).forEach((row) => {
      const art = row.querySelector(".ss-tl-art")!;
      expect(art.className).toMatch(/ss-tone-(blue|teal|violet|amber)/);
      expect(art.querySelector("svg")).not.toBeNull();
      expect(row.querySelector(".ss-tl-card h3")).not.toBeNull();
      expect(row.querySelector(".ss-tl-node")).not.toBeNull();
    });
    const featureRows = rows.slice(6);
    expect(featureRows.length).toBe(6);
    featureRows.forEach((row) => {
      const art = row.querySelector(".ss-tl-art")!;
      expect(art.className).toMatch(/ss-tone-(blue|teal|violet|amber)/);
      const img = art.querySelector("img")!;
      expect(img.getAttribute("src")).toMatch(/ss-feat-(problems|datasets|llm|mentor|review|certificate)/);
      expect(row.querySelector(".ss-tl-card h3")).not.toBeNull();
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

  it("sends Enquire Now to the contact page instead of opening a panel", () => {
    open();
    expect(screen.getByRole("link", { name: "Enquire Now" })).toHaveAttribute("href", "/contact");
  });
});
