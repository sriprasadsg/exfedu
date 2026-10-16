import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import AboutStory from "@/components/site/AboutStory";
import { pages } from "@/data/site";

const block = pages.find((page) => page.path === "/about")?.blocks[0];
if (block?.type !== "about-story") throw new Error("About topic data missing");
const data = block.data;

describe("About Us topic selection", () => {
  it("starts without a selected topic", () => {
    render(<AboutStory data={data} />);
    expect(screen.getAllByRole("button", { pressed: false })).toHaveLength(5);
  });

  it("keeps a clicked topic selected after pointer exit until another topic is clicked", () => {
    render(<AboutStory data={data} />);
    const first = screen.getAllByRole("button")[0];
    fireEvent.click(first);
    fireEvent.mouseLeave(first);
    expect(first).toHaveAttribute("aria-pressed", "true");
    const second = screen.getAllByRole("button")[1];
    fireEvent.click(second);
    expect(first).toHaveAttribute("aria-pressed", "false");
    expect(second).toHaveAttribute("aria-pressed", "true");
    expect(screen.getAllByRole("button", { pressed: true })).toHaveLength(1);
  });

  it("supports arrow navigation with wrapping and Home/End", () => {
    render(<AboutStory data={data} />);
    const buttons = screen.getAllByRole("button");
    fireEvent.keyDown(buttons[0], { key: "ArrowLeft" });
    expect(buttons[4]).toHaveFocus();
    expect(buttons[4]).toHaveAttribute("aria-pressed", "true");
    fireEvent.keyDown(buttons[4], { key: "Home" });
    expect(buttons[0]).toHaveFocus();
    fireEvent.keyDown(buttons[0], { key: "End" });
    expect(buttons[4]).toHaveFocus();
  });

  it("keeps hovered details and illustration selected after pointer exit", () => {
    render(<AboutStory data={data} />);
    const buttons = screen.getAllByRole("button");
    fireEvent.mouseEnter(buttons[1]);
    expect(buttons[1]).toHaveAttribute("aria-pressed", "true");
    expect(screen.getByRole("heading", { name: "Core Expertise" })).toBeVisible();
    expect(screen.getByRole("img")).toHaveAttribute("alt", "AI processor connected to data pipelines, databases and analytics nodes");
    fireEvent.mouseLeave(buttons[1]);
    expect(buttons[1]).toHaveAttribute("aria-pressed", "true");
    fireEvent.mouseEnter(buttons[2]);
    expect(buttons[1]).toHaveAttribute("aria-pressed", "false");
    expect(buttons[2]).toHaveAttribute("aria-pressed", "true");
    expect(screen.getByRole("heading", { name: "Global Presence" })).toBeVisible();
    expect(screen.getByRole("img")).toHaveAttribute("alt", "Silver and sky-blue globe with markers for USA, India, Dubai and Muscat offices");
  });

  it("selects the corresponding details and artwork on keyboard focus", () => {
    render(<AboutStory data={data} />);
    const button = screen.getByRole("button", { name: /Industry Domains/ });
    fireEvent.focus(button);
    expect(button).toHaveAttribute("aria-pressed", "true");
    expect(screen.getByRole("heading", { name: "Industry Domains" })).toBeVisible();
    expect(screen.getByRole("img")).toHaveAttribute("alt", "Connected finance, healthcare, retail, energy, telecommunications and manufacturing symbols");
  });
});