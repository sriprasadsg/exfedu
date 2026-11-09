import { useEffect, useRef, useState } from "react";
import { z } from "zod";
import { ArrowUpRight, ArrowLeft, CheckCircle2, AlertCircle, RotateCcw, User, Mail, Phone, MapPin, Building2, BookOpen, GraduationCap, MessageSquare } from "lucide-react";
import { requiredPhone, requiredEmail, requiredInstitution, requiredLocation } from "@/lib/enquiryFields";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { ENQUIRY_ACCEPTED_MESSAGE, enquiryErrorMessage, submitEnquiry } from "@/lib/enquiryDelivery";
import { organisations, programmes } from "@/data/site";

/** Student programme enquiry uses the shared production HTTP delivery.
 * Kept separate from the institutional partner enquiry so learners are never asked
 * for partnership or collaboration details. */
export const learnerStatuses = ["Student", "Recent graduate", "Working professional", "Other"] as const;
const studentProgrammes = programmes.filter(p => p.organisation !== "IBM");

export const studentEnquirySchema = z.object({
  programme: z.string().refine(v => studentProgrammes.some(p => p.slug === v), "Please choose a programme"),
  name: z.string().trim().min(1, "Please enter your name").max(100, "Name must be under 100 characters"),
  email: requiredEmail,
  phone: requiredPhone,
  institution: requiredInstitution,
  location: requiredLocation,
  status: z.enum(learnerStatuses, { errorMap: () => ({ message: "Please choose what describes you" }) }),
  message: z.string().trim().min(1, "Please enter your question").max(1000, "Please keep this under 1000 characters"),
  consent: z.literal("on", { errorMap: () => ({ message: "Please agree to be contacted about this enquiry" }) }),
});
type Field = keyof z.infer<typeof studentEnquirySchema>;
const fields: Field[] = ["programme", "name", "email", "phone", "institution", "location", "status", "message", "consent"];
const labels: Record<Field, string> = { programme: "Programme", name: "Your name", email: "Email", phone: "Phone number", institution: "Institution", location: "Location", status: "Which best describes you?", message: "Your question", consent: "Contact permission" };
const icons: Partial<Record<Field, typeof User>> = { programme: BookOpen, name: User, email: Mail, phone: Phone, institution: Building2, location: MapPin, status: GraduationCap, message: MessageSquare };

const StudentEnquiry = ({ programmeSlug }: { programmeSlug?: string }) => {
  const preset = programmeSlug && studentProgrammes.some(p => p.slug === programmeSlug) ? programmeSlug : "";
  const empty = { programme: preset, name: "", email: "", phone: "", institution: "", location: "", status: "", message: "", consent: "" };
  const [answers, setAnswers] = useState<Record<Field, string>>(empty);
  // A preselected programme is kept; the form opens on the next question.
  const [step, setStep] = useState(preset ? 1 : 0);
  const [error, setError] = useState("");
  const [state, setState] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [deliveryError, setDeliveryError] = useState("");
  const formRef = useRef<HTMLFormElement>(null);
  const field = fields[step];
  const submitting = state === "submitting";
  const selected = studentProgrammes.find(p => p.slug === answers.programme);

  useEffect(() => { if (state !== "success") (formRef.current?.elements.namedItem(field) as HTMLElement | null)?.focus({ preventScroll: true }); }, [step]); // eslint-disable-line react-hooks/exhaustive-deps

  const update = (value: string) => { setAnswers(a => ({ ...a, [field]: value })); setError(""); if (state === "error") setState("idle"); };
  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitting) return;
    const check = studentEnquirySchema.shape[field].safeParse(answers[field]);
    if (!check.success) { setError(check.error.issues[0]?.message ?? "Please check this field."); return; }
    if (step < fields.length - 1) { setStep(s => s + 1); return; }
    const parsed = studentEnquirySchema.safeParse(answers);
    if (!parsed.success) { setStep(Math.max(0, fields.findIndex(f => parsed.error.issues.some(i => i.path[0] === f)))); setError(parsed.error.issues[0]?.message ?? ""); return; }
    setDeliveryError("");
    setState("submitting");
    try {
      await submitEnquiry({ kind: "student-programme", ...parsed.data, programmeTitle: selected?.title });
      setState("success");
    } catch (error) {
      setDeliveryError(enquiryErrorMessage(error));
      setState("error");
    }
  };
  const aria = { "aria-invalid": !!error, "aria-describedby": error ? "student-field-error" : undefined };
  const Icon = icons[field] ?? User;

  return (
    <section id="student-enquiry" className="partner-enquiry-section border-t bg-background scroll-mt-24">
      <div className="container py-12">
        <div className="enquiry-compact-layout">
          <div className="enquiry-intro">
            {selected && <p className="mb-3 text-sm font-medium text-primary">Selected programme: {selected.title} · {organisations[selected.organisation].name}</p>}
            <p className="enquiry-intro-eyebrow">Student enquiry</p>
            <h2 className="enquiry-intro-title font-display">Enquire about a programme</h2>
            <p className="enquiry-intro-lead">Ask about eligibility, learning content and admissions for the programme you are interested in.</p>
          </div>
          <form ref={formRef} className="partner-3d-card enquiry-step-card" noValidate onSubmit={submit} aria-busy={submitting} aria-label="Student programme enquiry">
            {state === "success" ? (
              <div className="space-y-4">
                <span className="enquiry-success-icon"><CheckCircle2 size={26} strokeWidth={1.7} aria-hidden="true" /></span>
                <p role="status" className="text-sm leading-relaxed">{ENQUIRY_ACCEPTED_MESSAGE}</p>
                <Button variant="outline" type="button" className="enquiry-restart" onClick={() => { setAnswers(empty); setStep(preset ? 1 : 0); setState("idle"); }}>
                  <RotateCcw size={15} aria-hidden="true" />New enquiry
                </Button>
              </div>
            ) : (
              <>
                <div className="mb-3 flex items-center justify-between text-xs text-muted-foreground">
                  <span className="enquiry-kicker">Student enquiry</span><span className="enquiry-count" aria-live="polite">{step + 1} / {fields.length}</span>
                </div>
                <div className="enquiry-progress" aria-hidden="true"><span style={{ width: `${((step + 1) / fields.length) * 100}%` }} /></div>
                <div className="enquiry-step-body" key={field}>
                  <label htmlFor={`student-${field}`} className="mb-3 block text-sm font-medium">
                    {labels[field]}
                  </label>
                  {field === "consent" ? (
                    <label className="flex cursor-pointer items-start gap-3 text-sm leading-relaxed text-muted-foreground">
                      <input id="student-consent" name="consent" type="checkbox" checked={answers.consent === "on"} disabled={submitting} onChange={e => update(e.target.checked ? "on" : "")} {...aria} className="mt-0.5 h-5 w-5 shrink-0 accent-primary" />
                      <span>I agree to be contacted by Exafluence Education about this enquiry.</span>
                    </label>
                  ) : (
                    <div className={`enquiry-field enquiry-field--${field}`}>
                      <span className="enquiry-field-icon" aria-hidden="true"><Icon size={17} strokeWidth={1.8} /></span>
                      {field === "programme" || field === "status" ? (
                        <select id={`student-${field}`} name={field} value={answers[field]} disabled={submitting} onChange={e => update(e.target.value)} {...aria} className="h-12 w-full rounded-md border border-input bg-background px-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                          <option value="" disabled>Select…</option>
                          {field === "programme"
                            ? studentProgrammes.map(p => <option key={p.slug} value={p.slug}>{p.title} · {organisations[p.organisation].name}</option>)
                            : learnerStatuses.map(s => <option key={s} value={s}>{s}</option>)}
                        </select>
                      ) : field === "message" ? (
                        <Textarea id="student-message" name="message" rows={3} maxLength={1000} value={answers.message} disabled={submitting} onChange={e => update(e.target.value)} {...aria} />
                      ) : (
                        <Input id={`student-${field}`} name={field} required type={field === "email" ? "email" : field === "phone" ? "tel" : "text"} autoComplete={field === "institution" ? "organization" : field === "location" ? "address-level2" : field === "phone" ? "tel" : field} maxLength={field === "email" ? 255 : field === "phone" ? 20 : field === "institution" || field === "location" ? 150 : 100} value={answers[field]} disabled={submitting} onChange={e => update(e.target.value)} {...aria} />
                      )}
                    </div>
                  )}
                  {error && <p id="student-field-error" role="alert" className="mt-2 text-sm text-destructive">{error}</p>}
                </div>
                <div className="mt-5 flex items-center justify-between gap-3">
                  <Button type="button" variant="ghost" size="icon" aria-label="Previous field" disabled={step === 0 || submitting} onClick={() => { setError(""); setStep(s => s - 1); }}><ArrowLeft /></Button>
                  <Button type="submit" disabled={submitting} className="enquiry-cta text-sm font-medium">
                    {submitting ? "Sending…" : step === fields.length - 1 ? "Send Enquiry" : "Continue"}<ArrowUpRight />
                  </Button>
                </div>
                {state === "error" && <p role="alert" className="mt-3 flex gap-2 text-sm text-destructive"><AlertCircle className="h-4 w-4 shrink-0" />{deliveryError}</p>}
              </>
            )}
          </form>
        </div>
      </div>
    </section>
  );
};
export default StudentEnquiry;
