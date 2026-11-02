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
  it("keeps the two photograph story cards in approved order with their own pictures", () => {
    expect(svuOverviewAchievements.map(item => item.title)).toEqual([
      "Innovation Showcase",
      "Technology Community Participation",
    ]);
    expect(svuOverviewAchievements[0].photo).toContain("svu-innovation-hub.png");
    expect(svuOverviewAchievements[1].photo).toContain("svu-paniit-students.jpg");
    expect(svuOverviewAchievements.every(item => Boolean(item.photo) && Boolean(item.alt))).toBe(true);
  });

});