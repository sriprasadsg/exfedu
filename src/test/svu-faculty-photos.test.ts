import { describe, expect, it } from "vitest";
import { svuFacultyPhotos } from "@/data/svuFacultyPhotos";
import { svuFaculty, svuSupport } from "@/data/svuReviewed";

describe("faculty portrait identity matches", () => {
  it("matches all seven supplied technical profiles, preserving existing full names", () => {
    expect(Object.keys(svuFacultyPhotos)).toEqual([
      "Neelakanteswara Pagadala", "Saiteja Minchala", "Nynaru Teja",
      "Sudeepthi Mahajanam", "Santharajupalli Umapathi",
      "A Rohith Sai", "G Kiran Kumar",
    ]);
    expect(svuSupport.every(p => Boolean(svuFacultyPhotos[p.name]))).toBe(true);
    expect(new Set(Object.values(svuFacultyPhotos)).size).toBe(7);
  });
  it("does not borrow support photos for missing faculty", () => {
    expect(svuFaculty.filter(p => svuFacultyPhotos[p.name])).toEqual([]);
    expect(svuSupport.slice(-2)).toEqual([
      { name: "A Rohith Sai", role: "Technical Support", expertise: "" },
      { name: "G Kiran Kumar", role: "Technical Support", expertise: "" },
    ]);
  });
});