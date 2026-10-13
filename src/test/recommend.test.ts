import { describe, expect, it } from "vitest";
import { recommendLocal, recommendWithAI, recommendConfig, catalog } from "@/lib/recommend";

describe("programme recommender", () => {
  it("matches data-science interests to data programmes", () => {
    const r = recommendLocal("I love data and analytics", "a career in data science");
    expect(r.length).toBeGreaterThan(0);
    expect(r.some((x) => x.title.includes("Data Science"))).toBe(true);
  });

  it("matches AI interests to the Python AI/ML programme", () => {
    const r = recommendLocal("curious about artificial intelligence and python", "build machine learning models");
    expect(r.some((x) => x.path === "/programmes/python-ai-ml-genai")).toBe(true);
  });

  it("matches career goals to ecosystem areas", () => {
    const r = recommendLocal("", "I want placement training and a good job after graduation");
    expect(r.some((x) => x.kind === "ecosystem" && x.path === "/career-development")).toBe(true);
  });

  it("returns nothing for unrelated input", () => {
    expect(recommendLocal("cooking recipes", "open a bakery")).toEqual([]);
  });

  it("AI mode is not connected without an AWS endpoint", async () => {
    expect(recommendConfig.endpoint).toBe("");
    await expect(recommendWithAI("data", "career")).rejects.toThrow(/not connected/i);
  });

  it("catalog covers every programme and arm", () => {
    expect(catalog.filter((c) => c.kind === "programme").length).toBeGreaterThanOrEqual(5);
    expect(catalog.filter((c) => c.kind === "ecosystem").length).toBeGreaterThanOrEqual(8);
  });
});
