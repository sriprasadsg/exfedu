import { describe, expect, it } from "vitest";
import { svuOverviewAchievements, svuProjectAreas } from "@/data/svuOverview";
import { svuProjects } from "@/data/svuReviewed";

describe("approved SVU overview associations", () => {
  it("links each area to a relevant reviewed project without duplicating the list", () => {
    expect(svuProjectAreas.map(area => svuProjects[area.projectIndex]?.title)).toEqual([
      "Interactive Data Lineage Tracker for Source-to-Target Mapping",
      "Intelligent Campus Assistance Chatbot",
      "Predictive Demand forecasting Analysis",
      "Parking Detection System using AI and Computer Vision",
    ]);
  });
  it("does not assign summit or innovation photographs to the hackathon recognition", () => {
    expect(svuOverviewAchievements[1].photo).toBeUndefined();
    expect(svuOverviewAchievements[0].photo).toContain("svu-innovation-hub.png");
    expect(svuOverviewAchievements[2].photo).toContain("svu-paniit-students.jpg");
  });
});