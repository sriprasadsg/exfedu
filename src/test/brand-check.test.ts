import { describe, expect, it } from "vitest";
import { aiReviewAvailable, checkBrandWording } from "@/lib/brandCheck";

describe("brand wording rules", () => {
  it("flags misspelled Exfluence", () => {
    expect(checkBrandWording("Exfluence Inc.")[0].suggestion).toBe("Exafluence");
  });
  it("flags Skillshone spelling", () => {
    expect(checkBrandWording("Try Skillshone today")[0].suggestion).toBe("SkillShone");
  });
  it("flags old division wording", () => {
    expect(checkBrandWording("A Division of Exafluence Inc., USA").map((i) => i.suggestion)).toContain("An Edtech Division of Exafluence");
  });
  it("accepts approved wording", () => {
    expect(checkBrandWording("Exafluence Education, An Edtech Division of Exafluence Inc., USA. SkillShone.")).toEqual([]);
  });
  it("AI review stays off until AWS endpoint is set", () => {
    expect(aiReviewAvailable()).toBe(false);
  });
});
