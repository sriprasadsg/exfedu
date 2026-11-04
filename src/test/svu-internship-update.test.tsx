import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";
import SvuCareerRecords from "@/components/site/SvuCareerRecords";
import { svuInternshipUpdate } from "@/data/svuCareer";

/** Client brief, 3 November 2026: a text-only update on the SVU Student Internships page. */
const students = [
  "Badhur Ammulya", "Bandi Govardan Reddy", "Chinnabarugu Malliswar", "Damerla Nanditha",
  "Guttireddy Vishnukanth Reddy", "Jayampu Veera Maheswari", "Kanipakam Sasikiran Reddy",
  "Kankanala Nishanth", "Kondredi Geethanjali", "Koneti Vamsi Krishna", "M Jayalakshmi",
  "Meenakshi Keerthi", "P Ramya Krishna", "Pulivarthi Dharmika Sayee", "Telapalli Sai Sukrutha",
];

const renderInternships = () => render(<SvuCareerRecords kind="internships" />);

describe("SVU internships programme update (client, 3 November 2026)", () => {
  it("keeps the approved wording, highlights and status exactly as supplied", () => {
    expect(svuInternshipUpdate.heading).toBe("Advancing Skills in Generative AI");
    expect(svuInternshipUpdate.status).toBe("Enrolled");
    expect(svuInternshipUpdate.summary).toBe(
      "Exfedu proudly celebrates the enrolment of 15 MSDS students in the 15-Day DEF-SPACE Advanced Generative AI Internship 2026, offered by Bharat Space Education Research Centre, New Delhi. Students will undertake four projects during this online internship and receive an internship certificate upon successful completion."
    );
    expect(svuInternshipUpdate.highlights).toEqual(["15 Students Enrolled", "15 Days", "4 Planned Projects", "Online"]);
    expect(svuInternshipUpdate.students).toEqual(students);
  });

  it("sits below the introduction and above the internship records", () => {
    const { container } = renderInternships();
    const update = container.querySelector(".svu-internship-update");
    const heading = container.querySelector(".svu-career-records-heading");
    expect(update).not.toBeNull();
    expect(heading).not.toBeNull();
    expect(update!.compareDocumentPosition(heading!) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    // below the introduction paragraphs, which precede it inside the same page
    const intro = container.querySelector("p.svu-career-subtitle");
    expect(intro!.compareDocumentPosition(update!) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    // the panel itself carries no artwork
    expect(container.querySelector(".svu-internship-update img")).toBeNull();
  });

  it("shows heading, status, batch note and the four highlights without a poster", () => {
    renderInternships();
    expect(screen.getByRole("heading", { level: 2, name: "Advancing Skills in Generative AI" })).toBeTruthy();
    expect(screen.getByText("Enrolled")).toBeTruthy();
    expect(screen.getByText("Supporting record: Batch 3")).toBeTruthy();
    const highlightList = screen.getByRole("list", { name: "Internship highlights" });
    expect([...highlightList.querySelectorAll("li")].map(li => li.textContent?.trim())).toEqual(
      ["15 Students Enrolled", "15 Days", "4 Planned Projects", "Online"]
    );
    expect(screen.getByText(svuInternshipUpdate.summary)).toBeTruthy();
  });

  it("keeps batch and year detail out of the update heading", () => {
    const { container } = renderInternships();
    const headingText = container.querySelector(".svu-internship-update-head h2")?.textContent ?? "";
    expect(headingText).toBe("Advancing Skills in Generative AI");
  });

  it("expands the participating student list on demand, in the supplied spelling and order", () => {
    
    const { container } = renderInternships();
    const toggle = screen.getByRole("button", { name: /View Participating Students/ });
    expect(toggle.getAttribute("aria-expanded")).toBe("false");
    expect(container.querySelector(".svu-internship-update-names")?.hasAttribute("hidden")).toBe(true);

    fireEvent.click(toggle);
    expect(toggle.getAttribute("aria-expanded")).toBe("true");
    const names = [...container.querySelectorAll(".svu-internship-update-names li")].map(li => li.textContent?.trim());
    expect(names).toEqual(students);
    expect(screen.getByRole("button", { name: /Hide Participating Students/ })).toBeTruthy();

    fireEvent.click(toggle);
    expect(container.querySelector(".svu-internship-update-names")?.hasAttribute("hidden")).toBe(true);
  });

  it("divides the page into a title partition and a longer content partition", () => {
    const { container } = renderInternships();
    const title = container.querySelector(".svu-career-title-card");
    const content = container.querySelector(".svu-career-content-card");
    expect(title).not.toBeNull();
    expect(content).not.toBeNull();
    expect(title?.textContent).toContain("Student Internships");
    expect(title?.querySelector(".svu-career-subtitle")).not.toBeNull();
    expect(content?.querySelector(".svu-internship-update")).not.toBeNull();
    expect(content?.querySelector(".svu-career-records-heading")).not.toBeNull();
    expect(content?.querySelectorAll(".svu-intern-card")).toHaveLength(11);

    const { container: place } = render(<MemoryRouter><SvuCareerRecords kind="placements" /></MemoryRouter>);
    expect(place.querySelector(".svu-career-title-card .svu-career-subtitle")).not.toBeNull();
    expect(place.querySelector(".svu-career-content-card .svu-career-records-heading")).not.toBeNull();
    expect(place.querySelector(".svu-career-content-card .svu-outcome")).not.toBeNull();
  });

  it("preserves every existing internship record without duplicating an update student", () => {
    const { container } = renderInternships();
    const rows = [...container.querySelectorAll(".svu-intern-card")];
    expect(rows).toHaveLength(11);
    const tableStudents = rows.map(row => row.querySelector("h4")?.textContent?.trim());
    students.forEach(name => expect(tableStudents).not.toContain(name));
    expect(container.textContent).toContain("NARL, Gadanki");
    expect(container.textContent).toContain("SHAR, Sriharikota");
    expect(container.textContent).toContain("Vikram Sarabhai Space Centre, Thiruvananthapuram");
  });

  it("does not appear on the placements page", () => {
    const { container } = render(<MemoryRouter><SvuCareerRecords kind="placements" /></MemoryRouter>);
    expect(container.querySelector(".svu-internship-update")).toBeNull();
  });
});
