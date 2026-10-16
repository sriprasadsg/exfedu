import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import AboutStory, { type AboutStoryData } from "@/components/site/AboutStory";

const data: AboutStoryData = {
  title: "Idle opening",
  description: "Idle description.",
  topics: [
    { title: "Exafluence Inc.", lines: ["First topic detail."] },
    { title: "Core Expertise", lines: ["Second topic detail."] },
    { title: "Global Presence", lines: ["Third topic detail."] },
  ],
};

afterEach(cleanup);

describe("About Us explorer", () => {
  it("opens with no topic selected and the idle copy shown", () => {
    render(<AboutStory data={data} />);
    expect(screen.getByText("Idle opening")).toBeVisible();
    expect(screen.queryByText("First topic detail.")).not.toBeVisible();
    for (const pill of screen.getAllByRole("button")) expect(pill).toHaveAttribute("aria-pressed", "false");
  });

  it("shows a hovered topic and keeps it after the pointer leaves", () => {
    render(<AboutStory data={data} />);
    fireEvent.mouseEnter(screen.getByRole("button", { name: /Core Expertise/ }));
    expect(screen.getByText("Second topic detail.")).toBeVisible();
    fireEvent.mouseLeave(screen.getByRole("button", { name: /Core Expertise/ }));
    expect(screen.getByText("Second topic detail.")).toBeVisible();
    expect(screen.getByRole("button", { name: /Core Expertise/ })).toHaveAttribute("aria-pressed", "true");
  });

  it("selects a topic from keyboard focus", () => {
    render(<AboutStory data={data} />);
    fireEvent.focus(screen.getByRole("button", { name: /Global Presence/ }));
    expect(screen.getByText("Third topic detail.")).toBeVisible();
  });

  it("moves selection with arrow keys, wrapping at both ends", () => {
    render(<AboutStory data={data} />);
    const first = screen.getByRole("button", { name: /Exafluence Inc./ });
    fireEvent.keyDown(first, { key: "ArrowLeft" });
    expect(screen.getByRole("button", { name: /Global Presence/ })).toHaveFocus();
    expect(screen.getByText("Third topic detail.")).toBeVisible();
    fireEvent.keyDown(screen.getByRole("button", { name: /Global Presence/ }), { key: "ArrowRight" });
    expect(first).toHaveFocus();
    expect(screen.getByText("First topic detail.")).toBeVisible();
    fireEvent.keyDown(first, { key: "End" });
    expect(screen.getByRole("button", { name: /Global Presence/ })).toHaveFocus();
  });
});
