import { describe, expect, it } from "vitest";
import { collaborationSlides, filterProgrammes, programmes } from "@/data/site";

describe("approved collaboration programme rules", () => {
  it("orders collaborations SVU, IBM", () => { expect(collaborationSlides.map(s => s.organisation)).toEqual(["SVU", "IBM"]); });
  it("uses the five approved SVU durations and modes", () => {
    expect(programmes.filter(p => p.organisation === "SVU").map(p => [p.duration, p.delivery])).toEqual([["2 years", "Regular, full-time hybrid"], ["1 year", "Part-time hybrid"], ["6 months", "Part-time hybrid"], ["6 months", "Part-time hybrid"], ["6 months", "Part-time hybrid"]]);
  });
  it("gives January and July intakes only to SVU diplomas", () => {
    expect(programmes.filter(p => p.organisation === "SVU" && p.level !== "Master's").map(p => p.intake)).toEqual(Array(4).fill("January and July"));
    expect(programmes.find(p => p.slug === "masters-data-science")?.intake).toBe("University admission cycle");
  });
  it("keeps IBM course hours distinct", () => { expect(programmes.filter(p => p.organisation === "IBM").map(p => p.duration)).toEqual(["45 hours", "45 hours", "60 hours", "90 hours"]); });
  it("limits 3 credits and 60/40 to semester-based learning", () => {
    expect(programmes.find(p => p.slug === "ibm-semester-industry-learning")?.recognition).toContain("3 academic credits");
    expect(programmes.filter(p => p.organisation === "IBM" && p.slug !== "ibm-semester-industry-learning").some(p => JSON.stringify(p).includes("3 academic credits") || JSON.stringify(p).includes("60%"))).toBe(false);
  });
  it("retains 33 quantum practical hours and specific eligibility", () => {
    const quantum = programmes.find(p => p.slug === "ibm-quantum-computing");
    expect(quantum?.practical).toBe("33 practical hours within the 60-hour programme.");
    expect(quantum?.eligibility).toBe("B.Tech third- and fourth-year students, and degree second- and third-year students, across streams.");
  });
  it("retains PBEL graduate eligibility and five stages", () => {
    const pbel = programmes.find(p => p.slug === "ibm-pbel");
    expect(pbel?.eligibility).toBe("Graduates from technical and non-technical disciplines.");
    expect(pbel?.curriculum).toEqual(["Orientation", "Training and Labs", "Project Development", "Presentation and Evaluation", "Certification"]);
  });
  it("combines organisation, subject, type and programme search", () => {
    expect(filterProgrammes({ organisation: "SVU", subject: "AI & Gen AI", type: "Diploma", q: "PYTHON" }).map(p => p.slug)).toEqual(["python-ai-ml-genai"]);
    expect(filterProgrammes({ organisation: "IBM", subject: "Cloud Technologies" })).toEqual([]);
  });
  it("keeps XIME out of the catalogue and programmes free of fees", () => { expect(programmes.some(p => p.organisation === "XIME")).toBe(false); expect(programmes.some(p => "fees" in p)).toBe(false); });
  it("limits the source-supported 80/20 statement to M.S. Data Science", () => { expect(programmes.filter(p => JSON.stringify(p).includes("80%")).map(p => p.slug)).toEqual(["masters-data-science"]); });
  it("retains the PG diploma one-year IT experience requirement", () => { expect(programmes.find(p => p.slug === "pg-diploma-data-science")?.eligibility).toContain("at least one year of IT-domain experience"); });
  it("does not transfer PBEL online delivery to the three other IBM offerings", () => { expect(programmes.filter(p => p.organisation === "IBM").map(p => p.delivery)).toEqual(["On-campus", "On-campus", "On-campus", "Online mentorship"]); });
});