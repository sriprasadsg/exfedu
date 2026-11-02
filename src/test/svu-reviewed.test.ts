import { describe, expect, it } from "vitest";
import { svuProjects, svuPublications, svuResearchMetrics, svuFaculty, svuSupport, svuReviewedCurricula } from "@/data/svuReviewed";

describe("reviewed SVU folder records", () => {
  it("preserves all 47 student project records", () => {
    expect(svuProjects).toHaveLength(47);
    expect(svuProjects.find(p => p.student === "ABBURI SRAVANI")?.title).toBe("Smart Attendance System Using Real-Time Facial Recognition and Deformation Handling");
  });
  it("keeps journal and conference certificate counts separate", () => {
    expect(svuResearchMetrics.map(m => m.value)).toEqual([13, 46, 37, 73]);
    expect(svuPublications).toHaveLength(13);
    expect(new Set(svuPublications.map(p => p.href)).size).toBe(13);
  });
  it("preserves twelve faculty and five programme support profiles", () => {
    expect(svuFaculty).toHaveLength(12);
    expect(svuSupport).toHaveLength(5);
  });
  it("maps source curricula to the five SVU programmes only", () => {
    expect(Object.keys(svuReviewedCurricula)).toEqual(["masters-data-science", "pg-diploma-data-science", "python-ai-ml-genai", "data-visualization", "cloud-technologies"]);
  });
});