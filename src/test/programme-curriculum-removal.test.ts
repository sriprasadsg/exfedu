import { describe, expect, it } from "vitest";
import { programmes } from "@/data/site";
import { ibmProgrammeSections, programmeDetailSections } from "@/lib/programmeSections";

const sectionsFor = (programme: (typeof programmes)[number]) =>
  programme.organisation === "IBM" ? ibmProgrammeSections(programme) : programmeDetailSections(programme);

describe("programme curriculum removal", () => {
  it.each(programmes)("excludes curriculum for $slug", (programme) => {
    const sections = sectionsFor(programme);
    expect(sections.some(section => section.title === "Curriculum")).toBe(false);
    if (programme.curriculum?.length) expect(sections.some(section => section.items === programme.curriculum)).toBe(false);
  });
});

describe("programme repeated-section removal", () => {
  it.each(programmes)("drops the Duration & Delivery and Features repetitions on $slug", (programme) => {
    const sections = sectionsFor(programme);
    const titles = sections.map(section => section.title);
    expect(titles).not.toContain("Duration & Delivery");
    expect(titles).not.toContain("Features");
    // The repeated content must not resurface under another heading either.
    expect(sections.some(section => section.items === programme.features)).toBe(false);
    expect(sections.some(section => section.content === `${programme.duration} · ${programme.delivery}`)).toBe(false);
  });
});
