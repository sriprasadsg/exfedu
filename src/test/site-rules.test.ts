import { describe, expect, it } from "vitest";
import { arms, categories, homepageCapabilities, pages, programmes } from "@/data/site";

describe("approved website structure", () => {
  it("attributes dated corporate recognitions to Exafluence Inc., not Exfedu", () => {
    const overview = pages.find((page) => page.path === "/about")?.blocks.find((block) => block.type === "about-overview");
    if (!overview || overview.type !== "about-overview") throw new Error("About overview missing");
    expect(overview.data.milestones.recognitions.map(({ year, company }) => ({ year, company }))).toEqual([
      { year: 2022, company: "Exafluence Inc." },
      { year: 2023, company: "Exafluence Inc." },
    ]);
  });
  it("links About programme and contact actions to the existing destinations", () => {
    const overview = pages.find((page) => page.path === "/about")?.blocks.find((block) => block.type === "about-overview");
    if (!overview || overview.type !== "about-overview") throw new Error("About overview missing");
    expect(overview.data.explore.actions.map((action) => action.to)).toEqual(["/programmes", "/contact"]);
    for (const action of overview.data.explore.actions) expect(pages.some((page) => page.path === action.to)).toBe(true);
  });
  it("keeps academic partner and enquiry destinations on their existing pages", () => {
    const overview = pages.find((page) => page.path === "/academic-collaborations")?.blocks.find((block) => block.type === "academic-overview");
    if (!overview || overview.type !== "academic-overview") throw new Error("Academic overview missing");
    expect(overview.data.partners.map((partner) => partner.to)).toEqual(["/academic-collaborations/svu", "/academic-collaborations/xime"]);
    expect(overview.data.invitation.to).toBe("/contact");
    for (const partner of overview.data.partners) expect(pages.some((page) => page.path === partner.to)).toBe(true);
  });
  it("keeps eight homepage capability cards linked to existing pages", () => {
    expect(homepageCapabilities).toHaveLength(8);
    for (const card of homepageCapabilities) {
      expect(pages.some((page) => page.path === card.path)).toBe(true);
    }
  });
  it("keeps exactly four requested categories", () => {
    expect(categories.map((c) => c.title)).toEqual(["Core", "Academic Collaborations", "Industry & Technology Collaborations", "Learning & Student Ecosystem"]);
  });
  it("does not display unconfirmed future partners or industry networks", () => {
    const blocks = pages.flatMap((p) => p.blocks);
    const titles = blocks.flatMap((b) => "title" in b ? [b.title] : []);
    expect(titles).not.toContain("Future University Partners");
    expect(titles).not.toContain("Additional partners");
    expect(pages.some((p) => /industry-networks|other-technology-partners|future-university/.test(p.path))).toBe(false);
  });
  it("keeps programme specifics pending instead of inventing claims", () => {
    for (const programme of programmes) {
      const page = pages.find((p) => p.path === `/programmes/${programme.slug}`);
      expect(page?.blocks[0]).toMatchObject({ type: "pending", items: expect.arrayContaining(["Duration", "Delivery Mode", "Eligibility", "Certification", "Brochure"]) });
    }
  });
  it("connects all eleven ecosystem arms to existing pages", () => {
    expect(arms).toHaveLength(11);
    for (const arm of arms) expect(pages.some((p) => p.path === arm.path)).toBe(true);
  });
});