import { useState } from "react";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { submitEnquiry } from "@/lib/enquiryDelivery";

/** Institutional brochure request (client, 2 November 2026): collaborations are
 * institutional only, so visitors identify their institution and location.
 * Uses shared HTTP delivery and only unlocks after a server receipt. */
export const institutionBrochureSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name").max(100),
  institution: z.string().trim().min(2, "Please enter your organisation or institution").max(150),
  designation: z.string().trim().min(2, "Please enter your designation").max(100),
  location: z.string().trim().min(2, "Please enter the institution's location").max(150),
  notes: z.string().trim().max(1000).optional().or(z.literal("")),
});
type Values = z.infer<typeof institutionBrochureSchema>;
const empty: Values = { name: "", institution: "", designation: "", location: "", notes: "" };

const fields: { key: keyof Values; label: string; placeholder: string; optional?: boolean }[] = [
  { key: "name", label: "Name", placeholder: "Your full name" },
  { key: "institution", label: "Organisation or institution", placeholder: "Institution name" },
  { key: "designation", label: "Designation", placeholder: "e.g. Dean, Placement Officer" },
  { key: "location", label: "Location", placeholder: "City, State" },
  { key: "notes", label: "Other notes", placeholder: "Anything you'd like us to know (optional)", optional: true },
];

export const InstitutionBrochureForm = ({ programme, onSuccess }: { programme: string; onSuccess: () => void }) => {
  const [values, setValues] = useState<Values>(empty);
  const [errors, setErrors] = useState<Partial<Record<keyof Values, string>>>({});
  const [submitting, setSubmitting] = useState(false);
  const [deliveryError, setDeliveryError] = useState("");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitting) return;
    const parsed = institutionBrochureSchema.safeParse(values);
    if (!parsed.success) {
      const next: Partial<Record<keyof Values, string>> = {};
      parsed.error.issues.forEach(i => { const k = i.path[0] as keyof Values; next[k] ??= i.message; });
      setErrors(next);
      return;
    }
    setErrors({});
    setDeliveryError("");
    setSubmitting(true);
    try {
      await submitEnquiry({ kind: "brochure", ...parsed.data, programme });
      onSuccess();
    } catch {
      setDeliveryError("Your request could not be sent. Please try again or contact contact@exafluence.com.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={submit} noValidate className="space-y-3" aria-label="Institutional brochure request">
      <p className="text-sm text-muted-foreground">These programmes are offered through institutional collaborations. Please share your institution's details.</p>
      {fields.map(f => (
        <div key={f.key} className="space-y-1">
          <Label htmlFor={`ibf-${f.key}`}>{f.label}{f.optional && <span className="text-muted-foreground"> (optional)</span>}</Label>
          {f.key === "notes"
            ? <Textarea id={`ibf-${f.key}`} rows={3} maxLength={1000} placeholder={f.placeholder} value={values.notes} onChange={e => setValues(v => ({ ...v, notes: e.target.value }))} />
            : <Input id={`ibf-${f.key}`} placeholder={f.placeholder} value={values[f.key]} aria-invalid={!!errors[f.key]} onChange={e => setValues(v => ({ ...v, [f.key]: e.target.value }))} />}
          {errors[f.key] && <p className="text-sm text-destructive">{errors[f.key]}</p>}
        </div>
      ))}
      <Button type="submit" disabled={submitting} className="w-full">{submitting ? "Sending…" : "Request Brochure"}</Button>
      {deliveryError && <p role="alert" className="text-sm text-destructive">{deliveryError}</p>}
    </form>
  );
};

export default InstitutionBrochureForm;
