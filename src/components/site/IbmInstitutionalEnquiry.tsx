import { useEffect, useRef, useState } from "react";
import { z } from "zod";
import { ArrowLeft, ArrowUpRight, AlertCircle, BookOpen, Building2, CalendarDays, CheckCircle2, Mail, RotateCcw, User, Users, type LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ibmAudiences, ibmProgrammes } from "@/data/ibm";
import { submitTestEnquiry } from "@/components/home/PartnerEnquiry";

/**
 * Institutional enquiry — TEST MODE, like the partner enquiry.
 * Answers stay in memory, the current field is validated before advancing, the
 * whole schema is validated before a simulated delivery, and nothing is stored
 * or sent. Delivery will be repointed by swapping submitTestEnquiry for a fetch
 * to enquiryConfig.endpoint (Exafluence AWS Cloud).
 * QA: add ?enquiryTest=fail to the URL to simulate a network/server error.
 */
// Zod needs a non-empty tuple for an enum; the option list itself is data-supplied.
const programmeOptions = [...ibmProgrammes.map(p => p.title), "Not sure yet"] as unknown as [string, ...string[]];
const audienceOptions = [...ibmAudiences] as [string, ...string[]];

const institutionalSchema = z.object({
  organisation: z.string().trim().min(1, "Please enter your organisation").max(150, "Organisation must be under 150 characters"),
  contactPerson: z.string().trim().min(1, "Please enter a contact name").max(100, "Contact name must be under 100 characters"),
  email: z.string().trim().min(1, "Please enter your work email").email("Please enter a valid work email").max(255, "Email must be under 255 characters"),
  programmeInterest: z.enum(programmeOptions, { errorMap: () => ({ message: "Please choose the programme you have in mind" }) }),
  audience: z.enum(audienceOptions, { errorMap: () => ({ message: "Please choose who the learning is for" }) }),
  participants: z.string().trim().regex(/^[1-9][0-9]{0,4}$/, "Please enter the expected number of participants (digits only)"),
  schedule: z.string().trim().max(200, "Please keep this under 200 characters"),
  consent: z.literal("on", { errorMap: () => ({ message: "Please agree to be contacted about this enquiry" }) }),
});

type Field = keyof z.infer<typeof institutionalSchema>;
type Status = { kind: "idle" } | { kind: "submitting" } | { kind: "success" } | { kind: "error"; message: string };

const fields: Field[] = ["organisation", "contactPerson", "email", "programmeInterest", "audience", "participants", "schedule", "consent"];
const labels: Record<Field, string> = {
  organisation: "Organisation", contactPerson: "Contact person", email: "Work email",
  programmeInterest: "Programme interest", audience: "Audience", participants: "Expected participants",
  schedule: "Preferred schedule", consent: "Contact permission",
};
const hints: Partial<Record<Field, string>> = {
  participants: "An estimate is enough — it helps us advise on format.",
  schedule: "Optional. A preferred month, term or batch pattern is helpful.",
};
const icons: Partial<Record<Field, LucideIcon>> = {
  organisation: Building2, contactPerson: User, email: Mail, programmeInterest: BookOpen,
  audience: Users, participants: Users, schedule: CalendarDays,
};
const emptyAnswers: Record<Field, string> = { organisation: "", contactPerson: "", email: "", programmeInterest: "", audience: "", participants: "", schedule: "", consent: "" };

const IbmInstitutionalEnquiry = () => {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({ ...emptyAnswers });
  const [error, setError] = useState("");
  const [status, setStatus] = useState<Status>({ kind: "idle" });
  const inFlight = useRef(false);
  const formRef = useRef<HTMLFormElement>(null);
  const field = fields[step];
  const submitting = status.kind === "submitting";
  const completed = status.kind === "success";

  useEffect(() => {
    if (step > 0) (formRef.current?.elements.namedItem(fields[step]) as HTMLElement | null)?.focus();
  }, [step]);

  const update = (value: string) => {
    setAnswers(previous => ({ ...previous, [field]: value }));
    setError("");
    if (status.kind === "error") setStatus({ kind: "idle" });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (inFlight.current) return;
    const current = institutionalSchema.shape[field].safeParse(answers[field]);
    if (!current.success) {
      setError(current.error.issues[0]?.message ?? "Please check this field.");
      (formRef.current?.elements.namedItem(field) as HTMLElement | null)?.focus();
      return;
    }
    setError("");
    if (step < fields.length - 1) { setStep(previous => previous + 1); return; }
    const parsed = institutionalSchema.safeParse(answers);
    if (!parsed.success) {
      const invalid = fields.findIndex(f => parsed.error.issues.some(issue => issue.path[0] === f));
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

  const aria = { "aria-invalid": !!error, "aria-describedby": error ? "ibm-institutional-error" : undefined };
  const Icon = icons[field];

  return (
    <form ref={formRef} className="partner-3d-card enquiry-step-card ibm-institutional-form" noValidate onSubmit={handleSubmit} aria-busy={submitting} aria-label="Institutional enquiry">
      {completed ? (
        <div className="space-y-4">
          <span className="enquiry-success-icon"><CheckCircle2 size={26} strokeWidth={1.7} aria-hidden="true" /></span>
          <p role="status" className="text-sm leading-relaxed">Test submission received. Delivery is not connected yet — this confirms the form workflow only.</p>
          <Button variant="outline" type="button" className="enquiry-restart" onClick={() => { setStep(0); setAnswers({ ...emptyAnswers }); setStatus({ kind: "idle" }); }}>
            <RotateCcw size={15} strokeWidth={1.9} aria-hidden="true" />New enquiry
          </Button>
        </div>
      ) : (
        <>
          <div className="mb-5 flex items-center justify-between text-xs text-muted-foreground">
            <span>Institutional enquiry</span><span aria-live="polite">{step + 1} / {fields.length}</span>
          </div>
          <div className="enquiry-step-body" key={field}>
            <label htmlFor={`ibm-institutional-${field}`} className="mb-3 block text-sm font-medium">
              {labels[field]}{field === "schedule" && <span className="ml-2 font-normal text-muted-foreground">(optional)</span>}
            </label>
            {field === "programmeInterest" || field === "audience" ? (
              <div className={`enquiry-field enquiry-field--${field}`}>
                {Icon && <span className="enquiry-field-icon" aria-hidden="true"><Icon size={17} strokeWidth={1.8} /></span>}
                <select id={`ibm-institutional-${field}`} name={field} value={answers[field]} disabled={submitting} onChange={e => update(e.target.value)} {...aria} className="h-12 w-full rounded-md border border-input bg-background px-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                  <option value="" disabled>Select {field === "audience" ? "who the learning is for" : "a programme"}</option>
                  {(field === "audience" ? audienceOptions : programmeOptions).map(option => <option key={option} value={option}>{option}</option>)}
                </select>
              </div>
            ) : field === "consent" ? (
              <label className="flex cursor-pointer items-start gap-3 text-sm leading-relaxed text-muted-foreground">
                <input id={`ibm-institutional-${field}`} name={field} type="checkbox" checked={answers.consent === "on"} disabled={submitting} onChange={e => update(e.target.checked ? "on" : "")} {...aria} className="mt-0.5 h-5 w-5 shrink-0 accent-primary" />
                <span>I agree to be contacted by Exafluence Education about this enquiry.</span>
              </label>
            ) : field === "schedule" ? (
              <div className={`enquiry-field enquiry-field--${field}`}>
                {Icon && <span className="enquiry-field-icon" aria-hidden="true"><Icon size={17} strokeWidth={1.8} /></span>}
                <Textarea id={`ibm-institutional-${field}`} name={field} rows={3} maxLength={200} value={answers[field]} disabled={submitting} onChange={e => update(e.target.value)} {...aria} />
              </div>
            ) : (
              <div className={`enquiry-field enquiry-field--${field}`}>
                {Icon && <span className="enquiry-field-icon" aria-hidden="true"><Icon size={17} strokeWidth={1.8} /></span>}
                <Input id={`ibm-institutional-${field}`} name={field} type={field === "email" ? "email" : field === "participants" ? "text" : "text"} inputMode={field === "participants" ? "numeric" : undefined} autoComplete={field === "organisation" ? "organization" : field === "contactPerson" ? "name" : field === "email" ? "email" : undefined} maxLength={field === "participants" ? 5 : 255} value={answers[field]} disabled={submitting} onChange={e => update(e.target.value)} {...aria} />
              </div>
            )}
            {hints[field] && !error && <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{hints[field]}</p>}
            {error && <p id="ibm-institutional-error" role="alert" className="mt-2 text-sm text-destructive">{error}</p>}
          </div>
          <div className="mt-5 flex items-center justify-between gap-3">
            <Button type="button" variant="ghost" size="icon" aria-label="Previous field" disabled={step === 0 || submitting} onClick={() => { setError(""); setStatus({ kind: "idle" }); setStep(previous => previous - 1); }}><ArrowLeft /></Button>
            <Button type="submit" disabled={submitting} className="enquiry-cta text-sm font-medium">
              {submitting ? "Sending…" : step === fields.length - 1 ? "Send Institutional Enquiry" : field === "schedule" && !answers.schedule ? "Skip" : "Continue"}<ArrowUpRight />
            </Button>
          </div>
          {status.kind === "error" && <p role="alert" className="mt-3 flex gap-2 text-sm text-destructive"><AlertCircle className="h-4 w-4 shrink-0" />{status.message}</p>}
        </>
      )}
    </form>
  );
};

export default IbmInstitutionalEnquiry;
