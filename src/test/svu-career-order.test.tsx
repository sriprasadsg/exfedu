import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import SvuCareerRecords from "@/components/site/SvuCareerRecords";

const placementOrder = [
  "G V Sumanth", "Jonnalagadda Sahithya", "K Mounika", "K Vinay", "Vemuri Bharath Kumar", "Yaram Lakshmi Nisoka",
  "Kamatam Meghana", "Muthyala Bharadwaj", "Muvvala Rajeswari", "Sri Tulasi Satya Saketh Raprolu", "Veeravalli Sri Satya",
];
const internshipOrder = [
  "Bandarupalli Madhuri", "G Mohana Priya", "G V Sumanth", "Jonnalagadda Sahithya", "K Vinay", "M Sreelekha",
  "Myleri Deepa", "Naguru Navya Nikitha", "P Prabhas Raj", "Talupula Keerthi", "Vemuri Bharath Kumar",
];

describe("SVU career records display order (client, 2 November 2026)", () => {
  it("shows placement cards batch-wise, then alphabetically", () => {
    const { container } = render(<SvuCareerRecords kind="placements" />);
    expect([...container.querySelectorAll(".svu-outcome h2")].map(h => h.textContent?.trim())).toEqual(placementOrder);
    expect([...container.querySelectorAll(".svu-outcome-batch")].map(b => b.textContent?.trim())).toEqual([
      ...Array(6).fill("Batch I · 2023–2025"), ...Array(5).fill("Batch II · 2024–2026"),
    ]);
  });

  it("numbers the internship rows 1 to 11 in that order", () => {
    const { container } = render(<SvuCareerRecords kind="internships" />);
    const rows = [...container.querySelectorAll("tbody tr")];
    expect(rows.map(row => row.querySelector("th")?.textContent?.trim())).toEqual(internshipOrder);
    expect(rows.map(row => row.querySelector("td")?.textContent?.trim())).toEqual(["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11"]);
  });
});
