import { describe, expect, it } from "vitest";
import { ximeProgrammeContent } from "@/data/xime";
import { organisationPath } from "@/lib/programmeNavigation";

describe("XIME source and internal destination", () => {
  it("uses the approved XIME source while keeping visitors on the internal page", () => {
    expect(ximeProgrammeContent.source).toBe("https://www.ximecexfedu.in");
    expect(organisationPath("XIME")).toBe("/collaboration-network/xime");
  });
  it("does not invent unverified programme facts or a brochure", () => {
    expect(Object.keys(ximeProgrammeContent)).toEqual(["source"]);
    expect(ximeProgrammeContent.brochure).toBeUndefined();
  });
});