import { cleanup, fireEvent, render, screen, waitFor, within } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { afterEach, describe, expect, it, vi } from "vitest";
import { enquiryConfig } from "@/lib/enquiryDelivery";
import IbmPages from "@/components/site/IbmPages";
import ProgrammeDetail from "@/components/site/ProgrammeDetail";
import { ibmProgrammes } from "@/data/ibm";
import { ibmProgrammeSections } from "@/lib/programmeSections";
import { retiredPageDestinations, programmes } from "@/data/site";
import { programmePath } from "@/lib/programmeNavigation";

// Client brief, 2 November 2026: IBM gets one dedicated page under Our Collaboration
// Network, in the approved reading order, with a separate institutional enquiry.
afterEach(() => { cleanup(); enquiryConfig.endpoint = ""; vi.unstubAllGlobals(); });

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
    // Client brief, 4 November 2026: the network back pill is removed entirely.
    expect(crumb?.textContent).not.toContain("Our Collaboration Network");
    expect(crumb?.querySelector("[aria-current='page']")?.textContent).toBe("IBM");
    expect(container.querySelector("a.network-back")).toBeNull();
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
    expect(screen.getByLabelText("Organisation / Institution")).toBeInTheDocument();
    expect(screen.queryByLabelText("Contact person")).not.toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: /Continue/ }));
    expect(await screen.findByRole("alert")).toHaveTextContent("Please enter your institution");
    expect(screen.queryByLabelText("Contact person")).not.toBeInTheDocument();
  });

  it("sends every institutional field to the configured enquiry service", async () => {
    enquiryConfig.endpoint = "https://enquiry.example.test/submit";
    const fetcher = vi.fn().mockResolvedValue(new Response(JSON.stringify({ success: true, id: "ibm-receipt" })));
    vi.stubGlobal("fetch", fetcher);
    open();
    await step("Organisation / Institution", "Sri Venkateswara University");
    await step("Contact person", "Dr A. Rao");
    await step("Work email", "a.rao@example.edu");
    await step("Phone number", "+91 9876543210");
    await step("Location", "Chittoor");
    await step("Programme interest", "Certificate Programme in Quantum Computing");
    await step("Audience", "Undergraduate students");
    await step("Expected participants", "60");
    await step(/Preferred schedule/);
    fireEvent.click(screen.getByLabelText("I agree to be contacted by Exafluence Education about this enquiry."));
    fireEvent.click(screen.getByRole("button", { name: "Send Institutional Enquiry" }));
    await waitFor(() => expect(fetcher).toHaveBeenCalledTimes(1));
    const payload = JSON.parse(fetcher.mock.calls[0][1].body);
    expect(payload.to).toBe("contact@exafluence.com");
    expect(payload.data).toMatchObject({ kind: "ibm-institutional", participants: "60", email: "a.rao@example.edu", consent: "on" });
  });

  it("refuses a participant count that is not a number", async () => {
    open();
    await step("Organisation / Institution", "Exafluence College");
    await step("Contact person", "Priya");
    await step("Work email", "priya@example.edu");
    await step("Phone number", "+91 9876543210");
    await step("Location", "Chittoor");
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
    expect(titles).toEqual(["Learning Outcomes", "Eligibility & Prerequisites", "Assessment & Certification"]);
    expect(titles).not.toContain("Duration & Delivery");
    expect(titles).not.toContain("Features");

    const semester = ibmProgrammes.find(p => p.slug === "ibm-semester-industry-learning")!;
    const semesterTitles = ibmProgrammeSections(semester).map(s => s.title);
    expect(semesterTitles).not.toContain("Eligibility & Prerequisites");
    expect(semesterTitles).not.toContain("Admission Process");
    expect(semesterTitles).not.toContain("Overview"); // the header already carries the overview
  });

  it("words the teaching role separately from the certificate issuer", () => {
    const pbel = ibmProgrammes.find(p => p.slug === "ibm-pbel")!;
    const certification = ibmProgrammeSections(pbel).find(s => s.title === "Assessment & Certification")?.content ?? "";
    expect(certification).toContain("Complete online mentorship by Exafluence Education with technical support of IBM");
    expect(certification).toContain("IBM Digital Badge and Certificate of Completion");
  });

  it("closes the programme page with a section headed Enquiry", () => {
    const quantum = ibmProgrammes.find(p => p.slug === "ibm-quantum-computing")!;
    const { container } = render(<MemoryRouter><ProgrammeDetail programme={quantum} /></MemoryRouter>);
    const headings = [...container.querySelectorAll(".programme-detail-section h2")].map(h => h.textContent?.trim());
    expect(headings[headings.length - 1]).toBe("Enquiry");

    // SVU offers no brochure, so its closing section is simply "Enquiry".
    const svu = programmes.find(p => p.organisation === "SVU")!;
    const other = render(<MemoryRouter><ProgrammeDetail programme={svu} /></MemoryRouter>);
    const otherHeadings = [...other.container.querySelectorAll(".programme-detail-section h2")].map(h => h.textContent?.trim());
    expect(otherHeadings[otherHeadings.length - 1]).toBe("Brochure & Enquiry");
  });
});

describe("IBM keeps a single home", () => {
  it("redirects the retired industry page to the collaboration-network page", () => {
    expect(retiredPageDestinations["/industry-collaborations/ibm"]).toBe("/collaboration-network/ibm");
  });
});
