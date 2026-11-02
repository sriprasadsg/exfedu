import { describe, expect, it } from "vitest";
import { arms, categories, collaborationSlides, homepageCapabilities, organisations, pages, programmes, retiredPageDestinations, navPages, primaryNavigation, organisationSections, svuOverviewBlocks, academicResources } from "@/data/site";

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
    expect(retiredPageDestinations).toEqual({ "/academic-collaborations": "/collaboration-network", "/academic-collaborations/svu": "/collaboration-network/svu", "/academic-collaborations/xime": "/collaboration-network/xime", "/industry-collaborations/ibm": "/collaboration-network/ibm" });
    // IBM keeps one home under Our Collaboration Network (client brief, 2 November 2026).
    expect(pages.some(p => p.path === "/industry-collaborations/ibm")).toBe(false);
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
  it("gives SVU exactly five approved sections in the collaboration menu", () => {
    expect(Object.keys(organisationSections)).toEqual(["SVU"]);
    expect(organisationSections.SVU?.map(section => section.title)).toEqual(["Overview", "Programmes", "Projects & Research", "Internships", "Placements"]);
    expect(organisationSections.SVU?.map(section => section.id)).toEqual(["overview", "programmes", "projects-research", "internships", "placements"]);
  });
  it("keeps Learning Ecosystem out of the desktop menu and flags only unresolved research after placement approval", () => {
    expect(primaryNavigation.map(item => item.title)).not.toContain("Learning Ecosystem");
    const unverified = organisationSections.SVU?.filter(section => section.pending) ?? [];
    expect(unverified.map(section => section.id)).toEqual(["projects-research"]);
  });
  it("moves achievements, events and gallery onto the SVU overview and academic resources onto programme pages", () => {
    expect(svuOverviewBlocks.map(block => block.title)).toEqual(["Student Achievements", "Events", "Gallery"]);
    expect(svuOverviewBlocks.every(block => block.pending.includes("await"))).toBe(true);
    expect(svuOverviewBlocks.map(block => block.link.path)).toEqual(["/student-success", "/events-news", "/gallery"]);
    expect(academicResources.link.path).toBe("/students-corner");
    expect(academicResources.items).toContain("Academic Resources");
    expect(pages.some(page => page.path === "/students-corner")).toBe(true);
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
  it("uses each uploaded partner illustration as the main banner artwork without a thumbnail", () => {
    const expected: Record<string, string> = {
      SVU: "svu-partner-illustration.png",
      XIME: "xime-partner-illustration.png",
      IBM: "ibm-partner-illustration.png",
    };
    expect(collaborationSlides).toHaveLength(3);
    for (const slide of collaborationSlides) {
      expect(slide.image).toContain(expected[slide.organisation]);
      expect("tile" in slide).toBe(false);
    }
    expect(new Set(collaborationSlides.map((slide) => slide.image)).size).toBe(3);
  });
  it("shows Sri Venkateswara University's supplied logo artwork in its wider slot", () => {
    expect(organisations.SVU.logo).toContain("c9ca94b2-e037-43af-8e7b-a9a0742353b0");
    expect(organisations.SVU.logoClass).toBe("logo-wide");
    expect(organisations.XIME.logoClass).toBe("");
    expect(organisations.IBM.logoClass).toBe("");
  });
});