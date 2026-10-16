import { useEffect, useRef, useState } from "react";
import { z } from "zod";
import partner3d from "@/assets/partner-3d-orbs.png.asset.json";
import { ArrowUpRight, ArrowLeft, CheckCircle2, AlertCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

/**
 * Partner enquiry — TEST MODE.
 * Delivery is intentionally not connected. When the production backend is
 * deployed on Exafluence AWS Cloud, set enquiryConfig.endpoint (and any auth
 * headers / env vars) and replace submitTestEnquiry with a real fetch — no
 * other part of this component needs to change.
 * QA: add ?enquiryTest=fail to the URL to simulate a network/server error.
 */
export const enquiryConfig = {
  mode: "test" as "test" | "production",
  endpoint: "", // e.g. import.meta.env.VITE_ENQUIRY_API_URL — set for AWS deployment
};

export const collaborationTypes = [
  "Academic Collaboration",
  "Industry Collaboration",
  "Technology Collaboration",
  "Programme Partnership",
  "Research Collaboration",
  "Internship / Placement Collaboration",
  "Other",
] as const;

const phonePattern = /^\+?[0-9\s\-()]{7,20}$/;

export const enquirySchema = z.object({
  name: z.string().trim().min(1, "Please enter your name").max(100, "Name must be under 100 characters"),
  organisation: z.string().trim().min(1, "Please enter your organisation").max(150, "Organisation must be under 150 characters"),
  email: z.string().trim().min(1, "Please enter your work email").email("Please enter a valid work email").max(255, "Email must be under 255 characters"),
  phone: z
    .string()
    .trim()
    .max(20, "Phone must be under 20 characters")
    .refine((v) => v === "" || phonePattern.test(v), "Please enter a valid phone number (digits, spaces, + - ( ) only)"),
  type: z.enum(collaborationTypes, { errorMap: () => ({ message: "Please choose a collaboration type" }) }),
  message: z.string().trim().min(1, "Please tell us your collaboration requirement").max(1000, "Please keep this under 1000 characters"),
  consent: z.literal("on", { errorMap: () => ({ message: "Please agree to be contacted about this enquiry" }) }),
});

type EnquiryData = z.infer<typeof enquirySchema>;
type Field = keyof EnquiryData;
type Status = { kind: "idle" } | { kind: "submitting" } | { kind: "success" } | { kind: "error"; message: string };

let testSubmissionCount = 0;
/** Simulated delivery for UI/workflow testing. Replace with a fetch to enquiryConfig.endpoint for production. */
const submitTestEnquiry = async (_data: EnquiryData): Promise<void> => {
  await new Promise((resolve) => setTimeout(resolve, 800));
  if (typeof window !== "undefined" && new URLSearchParams(window.location.search).get("enquiryTest") === "fail") {
    throw new Error("Simulated network error");
  }
  testSubmissionCount += 1;
  (window as unknown as { __enquiryTestSubmissions?: number }).__enquiryTestSubmissions = testSubmissionCount;
};

const fields: Field[] = ["name", "organisation", "email", "phone", "type", "message", "consent"];

const labels: Record<Field, string> = {
  name: "Contact name", organisation: "Organisation / Institution", email: "Work email",
  phone: "Phone number", type: "Collaboration type", message: "Collaboration requirement", consent: "Contact permission",
};
const emptyAnswers: Record<Field, string> = { name: "", organisation: "", email: "", phone: "", type: "", message: "", consent: "" };

const PartnerEnquiry = () => {
  const [status, setStatus] = useState<Status>({ kind: "idle" });
  const [error, setError] = useState("");
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({ ...emptyAnswers });
  const inFlight = useRef(false);
  const formRef = useRef<HTMLFormElement>(null);
  const field = fields[step];
  const submitting = status.kind === "submitting";
  const completed = status.kind === "success";

  useEffect(() => {
    if (step > 0) (formRef.current?.elements.namedItem(fields[step]) as HTMLElement | null)?.focus();
  }, [step]);

  const update = (value: string) => {
    setAnswers((previous) => ({ ...previous, [field]: value }));
    setError("");
    if (status.kind === "error") setStatus({ kind: "idle" });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (inFlight.current) return;
    const current = enquirySchema.shape[field].safeParse(answers[field]);
    if (!current.success) {
      setError(current.error.issues[0]?.message ?? "Please check this field.");
      (formRef.current?.elements.namedItem(field) as HTMLElement | null)?.focus();
      return;
    }
    setError("");
    if (step < fields.length - 1) {
      setStep((previous) => previous + 1);
      return;
    }
    const parsed = enquirySchema.safeParse(answers);
    if (!parsed.success) {
      const invalid = fields.findIndex((f) => parsed.error.issues.some((issue) => issue.path[0] === f));
      setStep(Math.max(0, invalid));
      setError(parsed.error.issues[0]?.message ?? "Please check your answers.");
      return;
    }
    inFlight.current = true;
    setStatus({ kind: "submitting" });
    try {
      await submitTestEnquiry(parsed.data);
      setAnswers({ ...emptyAnswers });
      setStatus({ kind: "success" });
    } catch {
      setStatus({ kind: "error", message: "Test submission failed — simulated network error. Your details are kept; please try again." });
    } finally {
      inFlight.current = false;
    }
  };

  const aria = { "aria-invalid": !!error, "aria-describedby": error ? "enquiry-field-error" : undefined };
  return (
    <section id="partner-enquiry" className="border-t bg-background scroll-mt-24">
      <div className="container py-12">
        <div className="enquiry-connected" role="img" aria-label="Partner connected to Academic, Industry and Technology">
          {["Partner", "Academic", "Industry", "Technology"].map((label, index) => (
            <div className="enquiry-node" key={label}>
              <span className="enquiry-node-number">{index + 1}</span>
              <span className="enquiry-node-label">{label}</span>
            </div>
          ))}
        </div>
        <div className="enquiry-compact-layout">
          <div className="min-w-0">
            <p className="mb-3 text-sm font-normal text-accent">Partner enquiry</p>
            <h2 className="font-display text-xl font-medium leading-snug">Partner with<br />Exafluence Education</h2>
            <p className="mt-3 max-w-[38ch] text-sm font-normal leading-relaxed text-muted-foreground">
              Become a collaboration partner with Exafluence Education, integrating industry into programmes, projects, research and student opportunities.
            </p>
            <div className="partner-3d-stage">
              <img src={partner3d.url} alt="" aria-hidden loading="lazy" width={313} height={293} className="partner-3d-object" />
            </div>
          </div>
          <form ref={formRef} className="partner-3d-card enquiry-step-card" noValidate onSubmit={handleSubmit} aria-busy={submitting} aria-label="Partner enquiry">
            {completed ? (
              <div className="space-y-4">
                <CheckCircle2 className="h-7 w-7 text-accent" />
                <p role="status" className="text-sm leading-relaxed">Test submission received. Delivery is not connected yet — this confirms the form workflow only.</p>
                <Button variant="outline" type="button" onClick={() => { setStep(0); setStatus({ kind: "idle" }); }}>New enquiry</Button>
              </div>
            ) : (
              <>
                <div className="mb-5 flex items-center justify-between text-xs text-muted-foreground">
                  <span>Partner enquiry</span><span aria-live="polite">{step + 1} / {fields.length}</span>
                </div>
                <div className="enquiry-step-body" key={field}>
                  <label htmlFor={`enquiry-${field}`} className="mb-3 block text-sm font-medium">
                    {labels[field]}{field === "phone" && <span className="ml-2 font-normal text-muted-foreground">(optional)</span>}
                  </label>
                  {field === "type" ? (
                    <select id={`enquiry-${field}`} name={field} value={answers[field]} disabled={submitting} onChange={(e) => update(e.target.value)} {...aria} className="h-12 w-full rounded-md border border-input bg-background px-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                      <option value="" disabled>Select a collaboration type</option>
                      {collaborationTypes.map((t) => <option key={t} value={t}>{t}</option>)}
                    </select>
                  ) : field === "message" ? (
                    <Textarea id={`enquiry-${field}`} name={field} rows={3} maxLength={1000} value={answers[field]} disabled={submitting} onChange={(e) => update(e.target.value)} {...aria} />
                  ) : field === "consent" ? (
                    <label className="flex cursor-pointer items-start gap-3 text-sm leading-relaxed text-muted-foreground">
                      <input id={`enquiry-${field}`} name={field} type="checkbox" checked={answers.consent === "on"} disabled={submitting} onChange={(e) => update(e.target.checked ? "on" : "")} {...aria} className="mt-0.5 h-5 w-5 shrink-0 accent-primary" />
                      <span>I agree to be contacted by Exafluence Education about this enquiry.</span>
                    </label>
                  ) : (
                    <Input id={`enquiry-${field}`} name={field} type={field === "email" ? "email" : field === "phone" ? "tel" : "text"} autoComplete={field === "organisation" ? "organization" : field === "phone" ? "tel" : field} maxLength={field === "name" ? 100 : field === "organisation" ? 150 : field === "email" ? 255 : 20} value={answers[field]} disabled={submitting} onChange={(e) => update(e.target.value)} {...aria} />
                  )}
                  {error && <p id="enquiry-field-error" role="alert" className="mt-2 text-sm text-destructive">{error}</p>}
                </div>
                <div className="mt-5 flex items-center justify-between gap-3">
                  <Button type="button" variant="ghost" size="icon" aria-label="Previous field" disabled={step === 0 || submitting} onClick={() => { setError(""); setStatus({ kind: "idle" }); setStep((previous) => previous - 1); }}><ArrowLeft /></Button>
                  <Button type="submit" disabled={submitting} className="enquiry-cta text-sm font-medium">
                    {submitting ? "Sending…" : step === fields.length - 1 ? "Send Partner Enquiry" : field === "phone" && !answers.phone ? "Skip" : "Continue"}<ArrowUpRight />
                  </Button>
                </div>
                {status.kind === "error" && <p role="alert" className="mt-3 flex gap-2 text-sm text-destructive"><AlertCircle className="h-4 w-4 shrink-0" />{status.message}</p>}
              </>
            )}
          </form>
        </div>
      </div>
    </section>
  );
};
export default PartnerEnquiry;
