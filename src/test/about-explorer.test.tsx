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

// Visibility here comes from a stylesheet class, so assert on the class the
// component toggles rather than on computed styles jsdom does not apply.
const copyOf = (text: string) => screen.getByText(text).closest(".about-explorer-copy");

describe("About Us explorer", () => {
  it("opens with no topic selected and the idle copy shown", () => {
    render(<AboutStory data={data} />);
    expect(copyOf("Idle opening")).toHaveClass("about-explorer-copy--active");
    expect(copyOf("First topic detail.")).not.toHaveClass("about-explorer-copy--active");
    for (const pill of screen.getAllByRole("button")) expect(pill).toHaveAttribute("aria-pressed", "false");
  });

  it("shows a hovered topic and keeps it after the pointer leaves", () => {
    render(<AboutStory data={data} />);
    const pill = screen.getByRole("button", { name: /Core Expertise/ });
    fireEvent.mouseEnter(pill);
    expect(copyOf("Second topic detail.")).toHaveClass("about-explorer-copy--active");
    fireEvent.mouseLeave(pill);
    expect(copyOf("Second topic detail.")).toHaveClass("about-explorer-copy--active");
    expect(pill).toHaveAttribute("aria-pressed", "true");
  });

  it("selects a topic from keyboard focus", () => {
    render(<AboutStory data={data} />);
    fireEvent.focus(screen.getByRole("button", { name: /Global Presence/ }));
    expect(copyOf("Third topic detail.")).toHaveClass("about-explorer-copy--active");
  });

  it("moves selection with arrow keys, wrapping at both ends", () => {
    render(<AboutStory data={data} />);
    const first = screen.getByRole("button", { name: /Exafluence Inc./ });
    fireEvent.keyDown(first, { key: "ArrowLeft" });
    expect(screen.getByRole("button", { name: /Global Presence/ })).toHaveFocus();
    expect(copyOf("Third topic detail.")).toHaveClass("about-explorer-copy--active");
    fireEvent.keyDown(screen.getByRole("button", { name: /Global Presence/ }), { key: "ArrowRight" });
    expect(first).toHaveFocus();
    expect(copyOf("First topic detail.")).toHaveClass("about-explorer-copy--active");
  });
});
