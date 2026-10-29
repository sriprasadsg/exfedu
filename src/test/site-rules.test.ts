import { describe, expect, it } from "vitest";
import { arms, categories, homepageCapabilities, pages, programmes, retiredPageDestinations, navPages, primaryNavigation, learningEcosystemPages, sidebarPages } from "@/data/site";

describe("approved website structure", () => {
  it("presents FIS Global, Snowflake and MongoDB together without award years", () => {
    const overview = pages.find((page) => page.path === "/about")?.blocks.find((block) => block.type === "about-overview");
    if (!overview || overview.type !== "about-overview") throw new Error("About overview missing");
    const paragraphs = overview.data.collaborations.paragraphs.join(" ");
    expect(paragraphs).toContain("FIS Global");
    expect(paragraphs).toContain("Snowflake Native Apps launch partner");
    expect(paragraphs).toContain("MongoDB");
    expect(JSON.stringify(overview.data.collaborations)).not.toMatch(/20(22|23)/);
  });
  it("keeps the founding year 2015 on the About industry foundation", () => {
    const overview = pages.find((page) => page.path === "/about")?.blocks.find((block) => block.type === "about-overview");
    if (!overview || overview.type !== "about-overview") throw new Error("About overview missing");
    expect(overview.data.foundation.paragraphs.join(" ")).toContain("Founded in 2015");
  });
  it("shows no About closing call-to-action section or buttons", () => {
    const about = pages.find((page) => page.path === "/about");
    const overview = about?.blocks.find((block) => block.type === "about-overview");
    if (!about || !overview || overview.type !== "about-overview") throw new Error("About overview missing");
    expect(about.blocks.some((block) => block.type === "cta")).toBe(false);
    expect("explore" in overview.data).toBe(false);
  });
  it("replaces Academic pages with one dedicated collaboration network", () => {
    expect(navPages("academic").map(p => p.path)).toEqual(["/collaboration-network"]);
    expect(pages.some(p => p.path.startsWith("/academic-collaborations"))).toBe(false);
    expect(pages.find(p => p.path === "/collaboration-network")?.blocks).toEqual([{ type: "collaboration-network" }]);
  });
  it("redirects retired academic URLs without duplicate content pages", () => {
    expect(retiredPageDestinations).toEqual({ "/academic-collaborations": "/collaboration-network", "/academic-collaborations/svu": "/collaboration-network/svu", "/academic-collaborations/xime": "/collaboration-network/xime" });
  });
  it("keeps eight homepage capability cards linked to existing pages", () => {
    expect(homepageCapabilities).toHaveLength(8);
    for (const card of homepageCapabilities) {
      expect(pages.some((page) => page.path === card.path)).toBe(true);
    }
  });
  it("keeps exactly four requested categories", () => {
    expect(categories.map((c) => c.title)).toEqual(["Core", "Our Collaboration Network", "Industry & Technology Collaborations", "Learning Ecosystem"]);
  });
  it("keeps the four approved desktop destinations in order", () => {
    expect(primaryNavigation.map(item => item.path)).toEqual(["/about", "/collaboration-network", "/skillshone", "/#partner-enquiry"]);
    expect(primaryNavigation.map(item => item.title)).toEqual(["About Us", "Our Collaboration Network", "SkillShone", "Enquire Now"]);
  });
  it("groups exactly five learning destinations in the phone menu", () => {
    expect(learningEcosystemPages.map(page => page.path)).toEqual(["/practical-learning", "/internships", "/career-development", "/research-innovation", "/student-success"]);
  });
  it("keeps the remaining student resources in the sidebar, outside the primary learning group", () => {
    expect(sidebarPages.map(page => page.path)).toEqual(["/students-corner", "/gallery", "/events-news"]);
    expect(learningEcosystemPages.some(page => sidebarPages.some(resource => resource.path === page.path))).toBe(false);
    expect(sidebarPages.some(page => page.path === "/skillshone")).toBe(false);
  });
  it("does not display unconfirmed future partners or industry networks", () => {
    const blocks = pages.flatMap((p) => p.blocks);
    const titles = blocks.flatMap((b) => "title" in b ? [b.title] : []);
    expect(titles).not.toContain("Future University Partners");
    expect(titles).not.toContain("Additional partners");
    expect(pages.some((p) => /industry-networks|other-technology-partners|future-university/.test(p.path))).toBe(false);
  });
  it("keeps unspecified certification and brochure claims pending", () => {
    for (const programme of programmes) {
      expect(programme.brochure).toBeUndefined();
      if (programme.organisation === "XIME") expect(programme.recognition).toMatch(/jointly issued by XIME Chennai and Exafluence Education/);
      else if (programme.slug !== "ibm-semester-industry-learning") expect(programme.recognition).toBeUndefined();
    }
  });
  it("connects all eleven ecosystem arms to existing pages", () => {
    expect(arms).toHaveLength(11);
    for (const arm of arms) expect(pages.some((p) => p.path === arm.path)).toBe(true);
  });
});