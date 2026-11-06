import { webcrypto } from "node:crypto";
import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import PartnerEnquiry from "@/components/home/PartnerEnquiry";
import StudentEnquiry from "@/components/site/StudentEnquiry";
import IbmInstitutionalEnquiry from "@/components/site/IbmInstitutionalEnquiry";
import InstitutionBrochureForm from "@/components/site/InstitutionBrochureForm";
import { enquiryConfig } from "@/lib/enquiryDelivery";
import { handleRequest } from "../../infrastructure/enquiry-worker/worker";

const provider = vi.fn<typeof fetch>();
const origin = "https://exfedu.exafluence.workers.dev";
const env = { ALLOWED_ORIGINS: origin, EMAIL_FROM: "contact@exafluence.com", M365_TENANT_ID: "11111111-1111-4111-8111-111111111111", M365_CLIENT_ID: "22222222-2222-4222-8222-222222222222", M365_CLIENT_SECRET: "test-only" };
beforeEach(() => {
  vi.stubGlobal("crypto", webcrypto);
  provider.mockReset().mockImplementation(async url => String(url).includes("login.microsoftonline.com")
    ? new Response(JSON.stringify({ access_token: "test-access-token", token_type: "Bearer" }))
    : new Response(null, { status: 202, headers: { "request-id": "33333333-3333-4333-8333-333333333333" } }));
  enquiryConfig.endpoint = "https://worker.example.org/api/enquiries";
  vi.stubGlobal("fetch", async (url: string, init: RequestInit) => handleRequest(new Request(url, {
    ...init, headers: { ...init.headers, Origin: origin },
  }), env, provider));
});
afterEach(() => { cleanup(); enquiryConfig.endpoint = ""; vi.unstubAllGlobals(); });
function next(label: string, value: string) {
  const field = screen.getByLabelText(label, { exact: false });
  fireEvent.change(field, { target: { value } });
  fireEvent.click(screen.getByRole("button", { name: "Continue" }));
}
function finish(label = "Send Enquiry") {
  fireEvent.click(screen.getByRole("checkbox"));
  fireEvent.click(screen.getByRole("button", { name: label }));
}
async function accepted(kind: string) {
  await screen.findByRole("status");
  expect(provider).toHaveBeenCalledTimes(2);
  const body = JSON.parse(String(provider.mock.calls[1][1]?.body));
  expect(body.message.toRecipients).toEqual([{ emailAddress: { address: "contact@exafluence.com" } }]);
  expect(body.message.body.content).toContain(kind);
}
describe("all four form UIs through the Worker contract", () => {
  it("submits the partnership form", async () => {
    render(<PartnerEnquiry />);
    next("Contact name", "Test Person"); next("Organisation / Institution", "Test Institution"); next("Work email", "test@example.org");
    next("Phone number", "+91 9876543210"); next("Location", "Chittoor");
    next("Collaboration type", "Academic Collaboration"); next("Collaboration requirement", "Test enquiry"); finish("Send Partner Enquiry");
    await accepted("Partnership enquiry");
  });
  it("submits the student programme form", async () => {
    render(<StudentEnquiry programmeSlug="masters-data-science" />);
    next("Your name", "Test Person"); next("Email", "test@example.org");
    next("Phone number", "+91 9876543210"); next("Institution", "Test Institution"); next("Location", "Chittoor");
    next("Which best describes you?", "Student"); next("Your question", "Test enquiry"); finish();
    await accepted("Student programme enquiry");
  });
  it("submits the IBM institutional form", async () => {
    render(<IbmInstitutionalEnquiry />);
    next("Organisation", "Test Institution"); next("Contact person", "Test Person"); next("Work email", "test@example.org");
    next("Phone number", "+91 9876543210"); next("Location", "Chittoor");
    next("Programme interest", "Value-Added Courses"); next("Audience", "Undergraduate students"); next("Expected participants", "40");
    fireEvent.click(screen.getByRole("button", { name: "Skip" })); finish("Send Institutional Enquiry");
    await accepted("IBM institutional enquiry");
  });
  it("unlocks brochure access only after provider acceptance", async () => {
    const unlock = vi.fn();
    render(<InstitutionBrochureForm programme="M.S. Data Science" onSuccess={unlock} />);
    for (const [label, value] of [["Name", "Test Person"], ["Organisation or institution", "Test Institution"], ["Email", "test@example.org"], ["Phone number", "+91 9876543210"], ["Designation", "Dean"], ["Location", "Chittoor"]]) {
      fireEvent.change(screen.getByLabelText(label, { exact: true }), { target: { value } });
    }
    fireEvent.click(screen.getByRole("button", { name: "Request Brochure" }));
    await waitFor(() => expect(unlock).toHaveBeenCalledTimes(1));
    expect(provider).toHaveBeenCalledTimes(2);
    expect(JSON.parse(String(provider.mock.calls[1][1]?.body)).message.toRecipients).toEqual([{ emailAddress: { address: "contact@exafluence.com" } }]);
  });
  it("keeps a failed brochure request locked", async () => {
    provider.mockImplementation(async () => new Response("rejected", { status: 503 }));
    const unlock = vi.fn();
    render(<InstitutionBrochureForm programme="M.S. Data Science" onSuccess={unlock} />);
    for (const [label, value] of [["Name", "Test Person"], ["Organisation or institution", "Test Institution"], ["Email", "test@example.org"], ["Phone number", "+91 9876543210"], ["Designation", "Dean"], ["Location", "Chittoor"]]) {
      fireEvent.change(screen.getByLabelText(label, { exact: true }), { target: { value } });
    }
    fireEvent.click(screen.getByRole("button", { name: "Request Brochure" }));
    await screen.findByRole("alert");
    expect(unlock).not.toHaveBeenCalled();
    expect(screen.getByLabelText("Name", { exact: true })).toHaveValue("Test Person");
  });
});