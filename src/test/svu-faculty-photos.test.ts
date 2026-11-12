import { describe, expect, it } from "vitest";
import { svuFacultyPhotos } from "@/data/svuFacultyPhotos";
import { svuFaculty, svuSupport } from "@/data/svuReviewed";

describe("faculty portrait identity matches", () => {
  it("matches all seven supplied technical profiles, preserving existing full names", () => {
    expect(svuSupport.map(p => p.name)).toEqual([
      "Neelakanteswara Pagadala", "Saiteja Minchala", "Nynaru Teja",
      "Sudeepthi Mahajanam", "Santharajupalli Umapathi",
      "A Rohith Sai", "G Kiran Kumar",
    ]);
    expect(svuSupport.every(p => Boolean(svuFacultyPhotos[p.name]))).toBe(true);
    expect(new Set(svuSupport.map(p => svuFacultyPhotos[p.name])).size).toBe(7);
  });
  it("matches eleven faculty filenames and never substitutes for the missing portrait", () => {
    expect(svuFaculty.filter(p => svuFacultyPhotos[p.name]).map(p => p.name)).toEqual([
      "Anjan Babu", "Malaya Rout", "Gopinath Kesavan", "Padmanayaki", "Lalitha",
      "Kumar Armugam", "Sasank Majeti", "Sreeram Babu Bojja", "Poonam Talati",
      "Babu", "Abhishek Kumar Ram",
    ]);
    expect(svuFacultyPhotos["Venkat Prasad Reddy"]).toBeUndefined();
    expect(Object.keys(svuFacultyPhotos)).toHaveLength(18);
    expect(new Set(Object.values(svuFacultyPhotos)).size).toBe(18);
    const supportPhotos = svuSupport.map(p => svuFacultyPhotos[p.name]);
    expect(svuFaculty.some(p => supportPhotos.includes(svuFacultyPhotos[p.name]))).toBe(false);
    expect(svuSupport.slice(-2)).toEqual([
      { name: "A Rohith Sai", role: "Technical Support", expertise: "" },
      { name: "G Kiran Kumar", role: "Technical Support", expertise: "" },
    ]);
  });
});