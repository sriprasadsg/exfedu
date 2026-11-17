import { describe, expect, it } from "vitest";
import { filterProgrammes, organisations, programmes } from "@/data/site";
import { programmePath } from "@/lib/programmeNavigation";
import { programmeDetailSections } from "@/lib/programmeSections";

const quantum = () => {
  const programme = programmes.find(p => p.slug === "ms-quantum-computing");
  if (!programme) throw new Error("Quantum programme missing");
  return programme;
};
describe("SVU Quantum programme rules", () => {
  it("belongs to SVU and appears first without another institution", () => {
    expect(programmes[0].slug).toBe("ms-quantum-computing");
    expect(quantum().organisation).toBe("SVU");
    expect(Object.keys(organisations)).toEqual(["SVU", "IBM"]);
    expect(filterProgrammes({ organisation: "SVU", subject: "Quantum Computing" }).map(p => p.slug)).toEqual(["ms-quantum-computing"]);
  });
  it("uses the existing canonical SVU programme hierarchy", () => {
    expect(programmePath(quantum())).toBe("/collaboration-network/svu/ms-quantum-computing");
  });
  it("keeps the two-year four-semester hybrid mode", () => {
    expect(quantum().duration).toBe("2 years / 4 semesters");
    expect(quantum().delivery).toBe("Hybrid (Offline / Online)");
  });
  it("leaves the admission spell to SVU notification", () => {
    expect(quantum().intake).toBe("As notified by SVU");
    expect(quantum().admissionRows).toEqual([
      ["Entrance examination", "Online examination"],
      ["Selection and verification", "Entrance qualification followed by counselling and certificate verification through the SVU Directorate of Admissions"],
      ["Admission spell", "As notified by SVU"],
    ]);
    expect(quantum().admissionNote).toBe("Admission arrangements are subject to official SVU notification.");
  });
  it("limits eligibility to the original domestic SVU criteria", () => {
    expect(quantum().eligibility).toBe("B.Sc. with Mathematics as the main subject and any two of Physics, Chemistry, Statistics, Electronics or Computer Science. B.Tech. in CSE, IT or Electronics. Bachelor of Computer Applications (BCA). Qualifying degree from a university recognised by the University Grants Commission.");
  });
  it("retains the original online exam format without a date", () => {
    expect(quantum().entrance).toBe("Online entrance examination: 50 multiple-choice questions for 50 marks, with no negative marking.");
    expect(programmeDetailSections(quantum()).find(s => s.title === "Entrance Examination")?.content).toBe(quantum().entrance);
  });
  it("uses an SVU email enquiry with a Quantum-specific subject, not a new form", () => {
    expect(quantum().enquiryHref).toBe("mailto:admissions@svudatascience.in?subject=M.S.%20Quantum%20Computing%20Enquiry");
    expect(quantum().brochure).toBeUndefined();
  });
  it("does not transfer other programme guarantees or facts", () => {
    const p = quantum();
    expect(p.features).toEqual(["Quantum algorithms and quantum machine learning", "Quantum circuit implementation and simulation using IBM Qiskit", "Research projects and industrial training", "Academic learning supported by industry collaboration"]);
    expect(p.recognition).toBeUndefined();
    expect(p.practical).toBeUndefined();
    expect("fees" in p).toBe(false);
  });
});