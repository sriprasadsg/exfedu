import { describe, expect, it } from "vitest";
import { programmes } from "@/data/site";
import { organisationFromPath, organisationPath, programmePath } from "@/lib/programmeNavigation";

describe("dedicated collaboration navigation", () => {
  it("opens two distinct organisation pages rather than a filtered directory", () => {
    expect([organisationPath("SVU"), organisationPath("IBM")]).toEqual(["/collaboration-network/svu", "/collaboration-network/ibm"]);
  });
  it("keeps all five SVU details beneath the SVU listing", () => {
    expect(programmes.filter(p => p.organisation === "SVU").map(programmePath)).toEqual([
      "/collaboration-network/svu/masters-data-science", "/collaboration-network/svu/pg-diploma-data-science", "/collaboration-network/svu/python-ai-ml-genai", "/collaboration-network/svu/data-visualization", "/collaboration-network/svu/cloud-technologies",
    ]);
  });
  it("keeps all four IBM details beneath the IBM listing", () => {
    expect(programmes.filter(p => p.organisation === "IBM").map(programmePath)).toEqual([
      "/collaboration-network/ibm/ibm-semester-industry-learning", "/collaboration-network/ibm/ibm-value-added-courses", "/collaboration-network/ibm/ibm-quantum-computing", "/collaboration-network/ibm/ibm-pbel",
    ]);
  });
  it("does not interpret a detail or unknown page as an organisation listing", () => {
    expect(organisationFromPath("/collaboration-network/svu/")).toBe("SVU");
    expect(organisationFromPath("/collaboration-network/xime")).toBeUndefined();
    expect(organisationFromPath("/collaboration-network/ibm/ibm-pbel")).toBeUndefined();
    expect(organisationFromPath("/collaboration-network/unknown")).toBeUndefined();
  });
});