import { useRef, useState } from "react";
import { z } from "zod";
import { ArrowUpRight, CheckCircle2, AlertCircle } from "lucide-react";
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
  "Academic collaboration",
  "Industry project",
  "Internships",
  "Training & workshops",
  "Research & innovation",
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
  message: z.string().trim().min(1, "Please tell us your collaboration interests").max(1000, "Please keep this under 1000 characters"),
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

const PartnerEnquiry = () => {
  const [status, setStatus] = useState<Status>({ kind: "idle" });
  const [errors, setErrors] = useState<Partial<Record<Field, string>>>({});
  const inFlight = useRef(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (inFlight.current) return;
    const form = event.currentTarget;
    const raw = Object.fromEntries(new FormData(form).entries());
    const parsed = enquirySchema.safeParse({ ...raw, consent: raw.consent ?? "" });

    if (!parsed.success) {
      const next: Partial<Record<Field, string>> = {};
      for (const f of fields) next[f] = parsed.error.issues.find((i) => i.path[0] === f)?.message;
      setErrors(next);
      setStatus({ kind: "error", message: "Please correct the highlighted fields." });
      const first = fields.find((f) => next[f]);
      if (first) (form.elements.namedItem(first) as HTMLElement | null)?.focus();
      return;
    }

    inFlight.current = true;
    setErrors({});
    setStatus({ kind: "submitting" });
    try {
      await submitTestEnquiry(parsed.data);
      form.reset();
      setStatus({ kind: "success" });
    } catch {
      setStatus({ kind: "error", message: "Test submission failed — simulated network error. Your details are kept; please try again." });
    } finally {
      inFlight.current = false;
    }
  };

  const err = (field: Field) =>
    errors[field] ? <p id={`${field}-error`} className="break-words text-sm font-normal text-destructive">{errors[field]}</p> : null;
  const aria = (field: Field) => ({ "aria-invalid": !!errors[field], "aria-describedby": errors[field] ? `${field}-error` : undefined });
  const submitting = status.kind === "submitting";

  return (
    <section id="partner-enquiry" className="border-t bg-muted/40 scroll-mt-24">
      <div className="container grid gap-8 py-14 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
        <div className="min-w-0">
          <p className="mb-3 text-sm font-normal text-accent">Partner enquiry</p>
          <h2 className="site-section-title font-display leading-snug">Industry Integrated<br />Collaboration Partner</h2>
        </div>
        <form className="grid min-w-0 gap-5 sm:grid-cols-2" noValidate onSubmit={handleSubmit} aria-busy={submitting}>
          <label className="min-w-0 space-y-2 text-sm font-medium"><span className="block">Contact name</span>
            <Input name="name" autoComplete="name" maxLength={100} {...aria("name")} />
            {err("name")}
          </label>
          <label className="min-w-0 space-y-2 text-sm font-medium"><span className="block">Organisation / Institution</span>
            <Input name="organisation" autoComplete="organization" maxLength={150} {...aria("organisation")} />
            {err("organisation")}
          </label>
          <label className="min-w-0 space-y-2 text-sm font-medium"><span className="block">Work email</span>
            <Input name="email" type="email" inputMode="email" autoComplete="email" maxLength={255} {...aria("email")} />
            {err("email")}
          </label>
          <label className="min-w-0 space-y-2 text-sm font-medium"><span className="block">Phone number <span className="font-normal text-muted-foreground">(optional)</span></span>
            <Input name="phone" type="tel" inputMode="tel" autoComplete="tel" maxLength={20} {...aria("phone")} />
            {err("phone")}
          </label>
          <label className="min-w-0 space-y-2 text-sm font-medium sm:col-span-2"><span className="block">Collaboration type</span>
            <select
              name="type"
              defaultValue=""
              {...aria("type")}
              className="flex h-11 w-full min-w-0 rounded-md border border-input bg-background px-3 text-base ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring aria-[invalid=true]:border-destructive"
            >
              <option value="" disabled>Select a collaboration type</option>
              {collaborationTypes.map((t) => <option key={t} value={t}>{t}</option>)}
            </select>
            {err("type")}
          </label>
          <label className="min-w-0 space-y-2 text-sm font-medium sm:col-span-2"><span className="block">Collaboration interests</span>
            <Textarea name="message" rows={4} maxLength={1000} className="break-words" {...aria("message")} />
            {err("message")}
          </label>
          <div className="min-w-0 sm:col-span-2">
            <label className="flex cursor-pointer items-start gap-3 py-2 text-sm font-normal">
              <input type="checkbox" name="consent" className="mt-0.5 h-6 w-6 shrink-0 cursor-pointer accent-primary" {...aria("consent")} />
              <span>I agree to be contacted by Exafluence Education about this enquiry.</span>
            </label>
            {err("consent")}
          </div>
          <div className="min-w-0 sm:col-span-2">
            <Button type="submit" disabled={submitting} className="h-11 w-full sm:w-auto">
              {submitting ? "Sending…" : "Send partner enquiry"}<ArrowUpRight />
            </Button>
            <div aria-live="polite">
              {status.kind === "success" && (
                <p role="status" className="mt-3 flex items-start gap-2 text-sm text-accent">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" /> Test submission received. Delivery is not connected yet — this confirms the form workflow only.
                </p>
              )}
              {status.kind === "error" && (
                <p role="alert" className="mt-3 flex items-start gap-2 text-sm text-destructive">
                  <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" /> {status.message}
                </p>
              )}
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};
export default PartnerEnquiry;
