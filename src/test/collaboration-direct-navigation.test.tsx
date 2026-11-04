import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { afterEach, describe, expect, it } from "vitest";
import Header from "@/components/layout/Header";
import ContentPage from "@/pages/ContentPage";

afterEach(cleanup);

describe("direct collaboration navigation", () => {
  it("opens each partner directly without a combined-page menu link", () => {
    const { container } = render(<MemoryRouter><Header /></MemoryRouter>);
    fireEvent.click(screen.getByRole("button", { name: "Our Collaboration Network" }));
    expect(screen.getByRole("link", { name: "1. Sri Venkateswara University" }).getAttribute("href")).toBe("/collaboration-network/svu");
    expect(screen.getByRole("link", { name: "2. IBM" }).getAttribute("href")).toBe("/collaboration-network/ibm");
    expect(container.querySelector('a[href="/collaboration-network"]')).toBeNull();
  });

  it("forwards the removed overview to the first partner page", () => {
    render(<MemoryRouter initialEntries={["/collaboration-network"]}><Routes><Route path="/collaboration-network" element={<ContentPage />} /><Route path="/collaboration-network/svu" element={<div>SVU destination</div>} /></Routes></MemoryRouter>);
    expect(screen.getByText("SVU destination")).toBeTruthy();
  });
});