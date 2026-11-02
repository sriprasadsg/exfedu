import { cleanup, fireEvent, render, screen, waitFor, within } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { afterEach, describe, expect, it } from "vitest";
import IbmPages from "@/components/site/IbmPages";
import { ibmProgrammes } from "@/data/ibm";
import { ibmProgrammeSections } from "@/lib/programmeSections";
import { retiredPageDestinations } from "@/data/site";
import { programmePath } from "@/lib/programmeNavigation";

// Client brief, 2 November 2026: IBM gets one dedicated page under Our Collaboration
// Network, in the approved reading order, with a separate institutional enquiry.
afterEach(cleanup);

const open = () => render(<MemoryRouter><IbmPages /></MemoryRouter>);

describe("IBM collaboration page", () => {
  it("reads in the approved order with one heading and the four programmes", () => {
    const { container } = open();
    expect(container.querySelectorAll("h1").length).toBe(1);
    expect(screen.getByRole("heading", { level: 1, name: "Develop Technical Skills Through Applied Learning" })).toBeInTheDocument();

    const headings = Array.from(container.querySelectorAll("h2")).map(h => h.textContent);
    const order = ["Explore the Programmes", "From Technical Concepts to Practical Application", "Make an Informed Programme Choice", "For Universities and Organisations", "Discuss Your Learning Goals"]
      .map(heading => headings.indexOf(heading));
    order.forEach((position, index) => expect(position).toBeGreaterThan(index === 0 ? -1 : order[index - 1]));

    const crumb = container.querySelector("nav[aria-label='Breadcrumb']");
    expect(crumb?.textContent).toContain("Our Collaboration Network");
    expect(crumb?.querySelector("[aria-current='page']")?.textContent).toBe("IBM");
  });

  it("lists every IBM programme with focus, duration, delivery and an internal link", () => {
    const { container } = open();
    const rows = container.querySelectorAll(".ibm-directory-row");
    expect(rows.length).toBe(ibmProgrammes.length);
    ibmProgrammes.forEach(p => {
      const row = Array.from(rows).find(r => r.querySelector("h3")?.textContent === p.title)!;
      expect(row.querySelector("h3 a")?.getAttribute("href")).toBe(programmePath(p));
      expect(row.querySelector("[data-label='Duration']")?.textContent).toBe(p.duration);
      expect(row.querySelector("[data-label='Delivery']")?.textContent).toBe(p.delivery);
    });
  });

  it("sends individual learners to contact and keeps the institutional form separate", () => {
    const { container } = open();
    expect(screen.getByRole("link", { name: /Programme Enquiry/ })).toHaveAttribute("href", "/contact");
    expect(container.querySelector("form[aria-label='Institutional enquiry']")).toBeTruthy();
  });
});

describe("IBM institutional enquiry", () => {
  const step = async (label: string | RegExp, value?: string) => {
    const field = screen.getByLabelText(label);
    if (value !== undefined) fireEvent.change(field, { target: { value } });
    fireEvent.click(screen.getByRole("button", { name: /Continue|Skip|Send Institutional Enquiry/ }));
  };

  it("asks one field at a time and rejects an empty organisation", async () => {
    open();
    expect(screen.getByLabelText("Organisation")).toBeInTheDocument();
    expect(screen.queryByLabelText("Contact person")).not.toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: /Continue/ }));
    expect(await screen.findByRole("alert")).toHaveTextContent("Please enter your organisation");
    expect(screen.queryByLabelText("Contact person")).not.toBeInTheDocument();
  });

  it("captures every field the brief asks for and confirms a test submission", async () => {
    open();
    await step("Organisation", "Sri Venkateswara University");
    await step("Contact person", "Dr A. Rao");
    await step("Work email", "a.rao@example.edu");
    await step("Programme interest", "Certificate Programme in Quantum Computing");
    await step("Audience", "Undergraduate students");
    await step("Expected participants", "60");
    await step(/Preferred schedule/);
    fireEvent.click(screen.getByLabelText("I agree to be contacted by Exafluence Education about this enquiry."));
    fireEvent.click(screen.getByRole("button", { name: "Send Institutional Enquiry" }));
    expect(await screen.findByRole("status")).toHaveTextContent("Test submission received");
    expect((window as unknown as { __enquiryTestSubmissions?: number }).__enquiryTestSubmissions).toBeGreaterThan(0);
  });

  it("refuses a participant count that is not a number", async () => {
    open();
    await step("Organisation", "Exafluence College");
    await step("Contact person", "Priya");
    await step("Work email", "priya@example.edu");
    await step("Programme interest", "Not sure yet");
    await step("Audience", "Faculty development");
    fireEvent.change(screen.getByLabelText("Expected participants"), { target: { value: "about sixty" } });
    fireEvent.click(screen.getByRole("button", { name: /Continue/ }));
    expect(await screen.findByRole("alert")).toHaveTextContent("Please enter the expected number of participants");
  });
});

describe("IBM programme page sections", () => {
  it("follows the approved sequence and keeps unsupported sections out", () => {
    const quantum = ibmProgrammes.find(p => p.slug === "ibm-quantum-computing")!;
    const titles = ibmProgrammeSections(quantum).map(s => s.title);
    expect(titles).toEqual(["Overview", "Learning Outcomes", "Eligibility & Prerequisites", "Curriculum", "Tools & Practical Activities", "Duration & Delivery", "Features", "Assessment & Certification"]);

    const semester = ibmProgrammes.find(p => p.slug === "ibm-semester-industry-learning")!;
    const semesterTitles = ibmProgrammeSections(semester).map(s => s.title);
    expect(semesterTitles).not.toContain("Eligibility & Prerequisites");
    expect(semesterTitles).not.toContain("Admission Process");
    expect(semesterTitles[0]).toBe("Overview");
  });

  it("words the teaching role separately from the certificate issuer", () => {
    const pbel = ibmProgrammes.find(p => p.slug === "ibm-pbel")!;
    const certification = ibmProgrammeSections(pbel).find(s => s.title === "Assessment & Certification")?.content ?? "";
    expect(certification).toContain("Complete online mentorship by Exafluence Education with technical support of IBM");
    expect(certification).toContain("IBM Digital Badge and Certificate of Completion");
  });
});

describe("IBM keeps a single home", () => {
  it("redirects the retired industry page to the collaboration-network page", () => {
    expect(retiredPageDestinations["/industry-collaborations/ibm"]).toBe("/collaboration-network/ibm");
  });
});
