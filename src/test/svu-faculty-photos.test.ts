import { describe, expect, it } from "vitest";
import { svuFacultyPhotos } from "@/data/svuFacultyPhotos";
import { svuFaculty, svuSupport } from "@/data/svuReviewed";

describe("faculty portrait identity matches", () => {
  it("matches only the five supplied technical profiles, preserving full names", () => {
    expect(Object.keys(svuFacultyPhotos)).toEqual([
      "Neelakanteswara Pagadala", "Saiteja Minchala", "Nynaru Teja",
      "Sudeepthi Mahajanam", "Santharajupalli Umapathi",
    ]);
    expect(svuSupport.every(p => Boolean(svuFacultyPhotos[p.name]))).toBe(true);
    expect(new Set(Object.values(svuFacultyPhotos)).size).toBe(5);
  });
  it("does not borrow support photos for missing faculty or unmatched people", () => {
    expect(svuFaculty.filter(p => svuFacultyPhotos[p.name])).toEqual([]);
    expect(svuFacultyPhotos["A Rohith Sai"]).toBeUndefined();
    expect(svuFacultyPhotos["G Kiran Kumar"]).toBeUndefined();
  });
});