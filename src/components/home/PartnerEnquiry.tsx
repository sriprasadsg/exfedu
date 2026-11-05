import { useEffect, useRef, useState } from "react";
import { z } from "zod";
import { ArrowUpRight, ArrowLeft, CheckCircle2, AlertCircle, RotateCcw, User, Building2, Mail, Phone, Network, MessageSquare } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { submitEnquiry } from "@/lib/enquiryDelivery";
export { enquiryConfig, recipientFor, buildEnquiryPayload } from "@/lib/enquiryDelivery";

/** Partner enquiry uses the shared, configurable production HTTP service. */

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

const fields: Field[] = ["name", "organisation", "email", "phone", "type", "message", "consent"];

const labels: Record<Field, string> = {
  name: "Contact name", organisation: "Organisation / Institution", email: "Work email",
  phone: "Phone number", type: "Collaboration type", message: "Collaboration requirement", consent: "Contact permission",
};
const emptyAnswers: Record<Field, string> = { name: "", organisation: "", email: "", phone: "", type: "", message: "", consent: "" };
const fieldIcons: Partial<Record<Field, typeof User>> = { name: User, organisation: Building2, email: Mail, phone: Phone, type: Network, message: MessageSquare };
export type EnquiryIntro = { title: string; description: string; points?: { label: string; text: string }[] };

const defaultIntro: EnquiryIntro = {
  title: "Partner with Exafluence Education",
  description: "Become a collaboration partner with Exafluence Education, integrating industry into programmes, projects, research and student opportunities.",
};

const PartnerEnquiry = ({ intro = defaultIntro, programme, onSuccess }: { intro?: EnquiryIntro; programme?: string; onSuccess?: () => void }) => {
  const [status, setStatus] = useState<Status>({ kind: "idle" });
  const [error, setError] = useState("");
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({ ...emptyAnswers, type: programme ? "Programme Partnership" : "", message: programme ? `Programme enquiry: ${programme}` : "" });
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
      await submitEnquiry({ kind: "partner", ...parsed.data });
      setAnswers({ ...emptyAnswers });
      setStatus({ kind: "success" });
      onSuccess?.();
    } catch {
      setStatus({ kind: "error", message: "Your enquiry could not be sent. Your details are kept; please try again or contact contact@exafluence.com." });
    } finally {
      inFlight.current = false;
    }
  };

  const aria = { "aria-invalid": !!error, "aria-describedby": error ? "enquiry-field-error" : undefined };
  return (
    <section id="partner-enquiry" className="partner-enquiry-section border-t bg-background scroll-mt-24">
      <div className="container py-12">
        <div className="enquiry-compact-layout">
          <div className="enquiry-intro">
            {programme && <p className="mb-3 text-sm font-medium text-primary">Selected programme: {programme}</p>}
            <p className="enquiry-intro-eyebrow">Partner enquiry</p>
            <h2 className="enquiry-intro-title font-display">{intro.title}</h2>
            <p className="enquiry-intro-lead">{intro.description}</p>
            {intro.points?.map((point) => (
              <p className="enquiry-intro-point" key={point.label}><span className="enquiry-intro-label">{point.label}</span>{point.text}</p>
            ))}
          </div>
          <form ref={formRef} className="partner-3d-card enquiry-step-card" noValidate onSubmit={handleSubmit} aria-busy={submitting} aria-label="Partner enquiry">
            {completed ? (
              <div className="space-y-4">
                <span className="enquiry-success-icon"><CheckCircle2 size={26} strokeWidth={1.7} aria-hidden="true" /></span>
                <p role="status" className="text-sm leading-relaxed">Your enquiry has been received.</p>
                <Button variant="outline" type="button" className="enquiry-restart" onClick={() => { setStep(0); setStatus({ kind: "idle" }); }}>
                  <RotateCcw size={15} strokeWidth={1.9} aria-hidden="true" />New enquiry
                </Button>
              </div>
            ) : (
              <>
                <div className="mb-3 flex items-center justify-between text-xs text-muted-foreground">
                  <span className="enquiry-kicker">Partner enquiry</span><span className="enquiry-count" aria-live="polite">{step + 1} / {fields.length}</span>
                </div>
                <div className="enquiry-progress" aria-hidden="true"><span style={{ width: `${((step + 1) / fields.length) * 100}%` }} /></div>
                <div className="enquiry-step-body" key={field}>
                  <label htmlFor={`enquiry-${field}`} className="mb-3 block text-sm font-medium">
                    {labels[field]}{field === "phone" && <span className="ml-2 font-normal text-muted-foreground">(optional)</span>}
                  </label>
                  {field === "type" ? (
                    <div className={`enquiry-field enquiry-field--${field}`}>
                      <span className="enquiry-field-icon" aria-hidden="true"><Network size={17} strokeWidth={1.8} /></span>
                      <select id={`enquiry-${field}`} name={field} value={answers[field]} disabled={submitting} onChange={(e) => update(e.target.value)} {...aria} className="h-12 w-full rounded-md border border-input bg-background px-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                        <option value="" disabled>Select a collaboration type</option>
                        {collaborationTypes.map((t) => <option key={t} value={t}>{t}</option>)}
                      </select>
                    </div>
                  ) : field === "message" ? (
                    <div className={`enquiry-field enquiry-field--${field}`}>
                      <span className="enquiry-field-icon" aria-hidden="true"><MessageSquare size={17} strokeWidth={1.8} /></span>
                      <Textarea id={`enquiry-${field}`} name={field} rows={3} maxLength={1000} value={answers[field]} disabled={submitting} onChange={(e) => update(e.target.value)} {...aria} />
                    </div>
                  ) : field === "consent" ? (
                    <label className="flex cursor-pointer items-start gap-3 text-sm leading-relaxed text-muted-foreground">
                      <input id={`enquiry-${field}`} name={field} type="checkbox" checked={answers.consent === "on"} disabled={submitting} onChange={(e) => update(e.target.checked ? "on" : "")} {...aria} className="mt-0.5 h-5 w-5 shrink-0 accent-primary" />
                      <span>I agree to be contacted by Exafluence Education about this enquiry.</span>
                    </label>
                  ) : (
                    <div className={`enquiry-field enquiry-field--${field}`}>
                      <span className="enquiry-field-icon" aria-hidden="true">{(() => { const FIcon = fieldIcons[field] ?? User; return <FIcon size={17} strokeWidth={1.8} />; })()}</span>
                      <Input id={`enquiry-${field}`} name={field} type={field === "email" ? "email" : field === "phone" ? "tel" : "text"} autoComplete={field === "organisation" ? "organization" : field === "phone" ? "tel" : field} maxLength={field === "name" ? 100 : field === "organisation" ? 150 : field === "email" ? 255 : 20} value={answers[field]} disabled={submitting} onChange={(e) => update(e.target.value)} {...aria} />
                    </div>
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
