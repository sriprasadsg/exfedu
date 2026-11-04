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
      "Student Participation at PanIIT Andhra Pradesh Summit",
      "Student Innovation at Ratan Tata Innovation Hub",
    ]);
    expect(svuOverviewAchievements[0].photo).toContain("svu-paniit-delegation.jpg");
    expect(svuOverviewAchievements[1].photo).toContain("svu-innovation-hub.png");
    expect(svuOverviewAchievements[0].paragraphs).toEqual([
      "MS Data Science students M Jayalakshmi and Telapalli Sai Sukrutha represented the SVU\u2013Exafluence programme at the PanIIT Andhra Pradesh Summit 2026 in Vijayawada, gaining exposure to advanced technologies and industry perspectives.",
      "SVU Vice-Chancellor Prof. Tata Narasinga Rao and Prof. G. Anjan Babu, Chairman, Board of Studies in Computer Science, appreciated their participation and encouraged them to pursue further learning and networking opportunities.",
    ]);
    expect(svuOverviewAchievements[1].paragraphs).toEqual([
      "Exafluence Education students showcased their product at the Ratan Tata Innovation Hub, Tirupati. SVU Vice-Chancellor Prof. Appa Rao, along with SVU officials, appreciated the students\u2019 innovation and practical application of technology.",
    ]);
  });

});