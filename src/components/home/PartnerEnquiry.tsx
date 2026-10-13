import { useState } from "react";
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
 */
export const enquiryConfig = {
  mode: "test" as "test" | "production",
  endpoint: "", // e.g. import.meta.env.VITE_ENQUIRY_API_URL — set for AWS deployment
};

const enquirySchema = z.object({
  name: z.string().trim().min(1, "Please enter your name").max(100, "Name must be under 100 characters"),
  organisation: z.string().trim().min(1, "Please enter your organisation").max(150, "Organisation must be under 150 characters"),
  email: z.string().trim().email("Please enter a valid work email").max(255, "Email must be under 255 characters"),
  phone: z.string().trim().max(20, "Phone must be under 20 characters").optional().or(z.literal("")),
  message: z.string().trim().min(1, "Please tell us your collaboration interests").max(1000, "Please keep this under 1000 characters"),
});

type EnquiryData = z.infer<typeof enquirySchema>;
type Status = { kind: "idle" } | { kind: "submitting" } | { kind: "success" } | { kind: "error"; message: string };

/** Simulated delivery for UI/workflow testing. Replace with a fetch to enquiryConfig.endpoint for production. */
const submitTestEnquiry = async (_data: EnquiryData): Promise<void> => {
  await new Promise((resolve) => setTimeout(resolve, 800));
};

const fieldError = (errors: z.ZodError, field: keyof EnquiryData) =>
  errors.issues.find((issue) => issue.path[0] === field)?.message;

const PartnerEnquiry = () => {
  const [status, setStatus] = useState<Status>({ kind: "idle" });
  const [errors, setErrors] = useState<Partial<Record<keyof EnquiryData, string>>>({});

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const raw = Object.fromEntries(new FormData(form).entries());
    const parsed = enquirySchema.safeParse(raw);

    if (!parsed.success) {
      setErrors({
        name: fieldError(parsed.error, "name"),
        organisation: fieldError(parsed.error, "organisation"),
        email: fieldError(parsed.error, "email"),
        phone: fieldError(parsed.error, "phone"),
        message: fieldError(parsed.error, "message"),
      });
      setStatus({ kind: "error", message: "Please correct the highlighted fields." });
      return;
    }

    setErrors({});
    setStatus({ kind: "submitting" });
    try {
      await submitTestEnquiry(parsed.data);
      form.reset();
      setStatus({ kind: "success" });
    } catch {
      setStatus({ kind: "error", message: "Test submission failed. Please try again." });
    }
  };

  const err = (field: keyof EnquiryData) =>
    errors[field] ? <p className="text-sm text-destructive">{errors[field]}</p> : null;

  return (
    <section id="partner-enquiry" className="border-t bg-muted/40 scroll-mt-24">
      <div className="container grid gap-8 py-14 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
        <div>
          <p className="mb-3 text-sm font-normal text-accent">Partner enquiry</p>
          <h2 className="site-section-title font-display leading-snug">Industry Integrated<br />Collaboration Partner</h2>
        </div>
        <form className="grid gap-5 sm:grid-cols-2" noValidate onSubmit={handleSubmit}>
          <label className="space-y-2 text-sm font-medium">Contact name
            <Input name="name" autoComplete="name" maxLength={100} aria-invalid={!!errors.name} />
            {err("name")}
          </label>
          <label className="space-y-2 text-sm font-medium">Organisation / Institution
            <Input name="organisation" autoComplete="organization" maxLength={150} aria-invalid={!!errors.organisation} />
            {err("organisation")}
          </label>
          <label className="space-y-2 text-sm font-medium">Work email
            <Input name="email" type="email" autoComplete="email" maxLength={255} aria-invalid={!!errors.email} />
            {err("email")}
          </label>
          <label className="space-y-2 text-sm font-medium">Phone number
            <Input name="phone" type="tel" autoComplete="tel" maxLength={20} aria-invalid={!!errors.phone} />
            {err("phone")}
          </label>
          <label className="space-y-2 text-sm font-medium sm:col-span-2">Collaboration interests
            <Textarea name="message" rows={4} maxLength={1000} aria-invalid={!!errors.message} />
            {err("message")}
          </label>
          <div className="sm:col-span-2">
            <Button type="submit" disabled={status.kind === "submitting"}>
              {status.kind === "submitting" ? "Sending…" : "Send partner enquiry"}<ArrowUpRight />
            </Button>
            {status.kind === "success" && (
              <p role="status" className="mt-3 flex items-center gap-2 text-sm text-accent">
                <CheckCircle2 className="h-4 w-4" /> Test submission received. Delivery is not connected yet — this confirms the form workflow only.
              </p>
            )}
            {status.kind === "error" && (
              <p role="alert" className="mt-3 flex items-center gap-2 text-sm text-destructive">
                <AlertCircle className="h-4 w-4" /> {status.message}
              </p>
            )}
          </div>
        </form>
      </div>
    </section>
  );
};
export default PartnerEnquiry;
