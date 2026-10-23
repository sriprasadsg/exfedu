import { describe, expect, it } from "vitest";
import { ximeProgrammeContent } from "@/data/xime";
import { organisationPath } from "@/lib/programmeNavigation";

describe("XIME source and internal destination", () => {
  it("uses the approved XIME source while keeping visitors on the internal page", () => {
    expect(ximeProgrammeContent.source).toBe("https://www.ximecexfedu.com");
    expect(organisationPath("XIME")).toBe("/collaboration-network/xime");
  });
  it("keeps the sourced duration and delivery", () => {
    expect(ximeProgrammeContent.duration).toBe("6 months");
    expect(ximeProgrammeContent.delivery).toMatch(/^Online/);
  });
  it("does not invent an admission process or a brochure", () => {
    expect(ximeProgrammeContent.admissions).toBeUndefined();
    expect(ximeProgrammeContent.brochure).toBeUndefined();
  });
});
