import { describe, expect, it } from "vitest";
import { programmes } from "@/data/site";
import { ibmProgrammeSections, programmeDetailSections } from "@/lib/programmeSections";

describe("programme curriculum removal", () => {
  it.each(programmes)("excludes curriculum for $slug while retaining delivery details", (programme) => {
    const sections = programme.organisation === "IBM" ? ibmProgrammeSections(programme) : programmeDetailSections(programme);
    expect(sections.some(section => section.title === "Curriculum")).toBe(false);
    expect(sections.find(section => section.title === "Duration & Delivery")?.content).toBe(`${programme.duration} · ${programme.delivery}`);
    if (programme.curriculum?.length) expect(sections.some(section => section.items === programme.curriculum)).toBe(false);
  });
});