import { cleanup, fireEvent, render, screen, within } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { afterEach, describe, expect, it } from "vitest";
import SkillShonePage from "@/components/site/SkillShonePage";
import { pages } from "@/data/site";

const page = pages.find((p) => p.path === "/skillshone")!;
const open = () => render(<MemoryRouter><SkillShonePage page={page} breadcrumb={null} /></MemoryRouter>);

afterEach(cleanup);

// The client asked for pop-ups on click (27 Oct 2026): feature cards, journey
// steps, FAQ questions and the enquiry button each open a bottom sheet, so the
// page itself never carries the long detail.
describe("SkillShone click pop-ups", () => {
  it("holds feature detail back until the card is clicked", () => {
    open();
    expect(screen.queryByText(/toy tutorials/)).not.toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: /Industry Problem Statements/ }));
    const dialog = screen.getByRole("dialog");
    expect(within(dialog).getByText(/toy tutorials/)).toBeInTheDocument();
  });

  it("opens the matching journey step with its full explanation", () => {
    open();
    expect(screen.queryByText(/Step 3 of 6/)).not.toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: /Develop Your Solution/ }));
    const dialog = screen.getByRole("dialog");
    expect(within(dialog).getByText("Step 3 of 6")).toBeInTheDocument();
    expect(within(dialog).getByText(/assistant trained on your own project/)).toBeInTheDocument();
  });

  it("shows a FAQ answer only inside the pop-up, never inline", () => {
    open();
    const answer = "AI-powered industry project learning platform";
    expect(screen.queryByText(new RegExp(answer))).not.toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: /What is SkillShone\?/ }));
    const dialog = screen.getByRole("dialog");
    expect(within(dialog).getByRole("heading", { name: "What is SkillShone?" })).toBeInTheDocument();
    expect(within(dialog).getByText(new RegExp(answer))).toBeInTheDocument();
  });

  it("opens the test-only enquiry form from the hero button", () => {
    open();
    expect(screen.queryByLabelText("Contact name")).not.toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "Enquire Now" }));
    const dialog = screen.getByRole("dialog");
    expect(within(dialog).getByRole("heading", { name: "Enquire about SkillShone" })).toBeInTheDocument();
    expect(within(dialog).getByText(/no details will be sent/)).toBeInTheDocument();
    expect(within(dialog).getByLabelText("Contact name")).toBeInTheDocument();
    expect((window as unknown as { __enquiryTestSubmissions?: number }).__enquiryTestSubmissions).toBeUndefined();
  });

  it("closes the pop-up from the close button and returns to the page", () => {
    open();
    fireEvent.click(screen.getByRole("button", { name: /Curated Datasets/ }));
    expect(screen.getByRole("dialog")).toBeInTheDocument();
    fireEvent.click(within(screen.getByRole("dialog")).getByRole("button", { name: "Close" }));
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });
});
