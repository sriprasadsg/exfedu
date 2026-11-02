import { describe, expect, it } from "vitest";
import { filterSvuCareerRecords, svuInternships, svuPlacements } from "@/data/svuCareer";

describe("approved SVU career records", () => {
  it("preserves eleven placements and their batch allocation", () => {
    expect(svuPlacements).toHaveLength(11);
    expect(filterSvuCareerRecords(svuPlacements, "", "I · 2023–2025")).toHaveLength(6);
    expect(filterSvuCareerRecords(svuPlacements, "", "II · 2024–2026")).toHaveLength(5);
  });
  it("preserves supplied designation counts", () => {
    expect(svuPlacements.filter(r => r.designation === "Associate Data Scientist")).toHaveLength(5);
    expect(svuPlacements.filter(r => r.designation === "Data Scientist – Trainee")).toHaveLength(2);
    expect(svuPlacements.filter(r => r.designation === "Trainee")).toHaveLength(2);
    expect(svuPlacements.filter(r => r.designation === "AI Engineer")).toHaveLength(2);
  });
  it("preserves all eleven internships in the supplied first batch", () => {
    expect(svuInternships).toHaveLength(11);
    expect(new Set(svuInternships.map(r => r.batch))).toEqual(new Set(["I · 2023–2025"]));
    expect(svuInternships.filter(r => r.organisation === "NARL, Gadanki")).toHaveLength(9);
    expect(svuInternships[9]).toEqual({ student: "P Prabhas Raj", batch: "I · 2023–2025", organisation: "SHAR, Sriharikota" });
    expect(svuInternships[10].organisation).toBe("Vikram Sarabhai Space Centre, Thiruvananthapuram");
  });
  it("combines case-insensitive search and batch filtering", () => {
    expect(filterSvuCareerRecords(svuPlacements, " shortfundly ", "II · 2024–2026").map(r => r.student)).toEqual(["Kamatam Meghana", "Muthyala Bharadwaj"]);
    expect(filterSvuCareerRecords(svuPlacements, "shortfundly", "I · 2023–2025")).toEqual([]);
    expect(filterSvuCareerRecords(svuInternships, "sriharikota", "all").map(r => r.student)).toEqual(["P Prabhas Raj"]);
  });
  it("orders records batch-wise, then alphabetically by student", () => {
    expect(filterSvuCareerRecords(svuPlacements, "", "all").map(r => r.student)).toEqual([
      "G V Sumanth", "Jonnalagadda Sahithya", "K Mounika", "K Vinay", "Vemuri Bharath Kumar", "Yaram Lakshmi Nisoka",
      "Kamatam Meghana", "Muthyala Bharadwaj", "Muvvala Rajeswari", "Sri Tulasi Satya Saketh Raprolu", "Veeravalli Sri Satya",
    ]);
    expect(filterSvuCareerRecords(svuInternships, "", "all").map(r => r.student)).toEqual([
      "Bandarupalli Madhuri", "G Mohana Priya", "G V Sumanth", "Jonnalagadda Sahithya", "K Vinay", "M Sreelekha",
      "Myleri Deepa", "Naguru Navya Nikitha", "P Prabhas Raj", "Talupula Keerthi", "Vemuri Bharath Kumar",
    ]);
    // the supplied source arrays keep their original order
    expect(svuPlacements[0].student).toBe("G V Sumanth");
    expect(svuInternships[0].student).toBe("G Mohana Priya");
  });
});