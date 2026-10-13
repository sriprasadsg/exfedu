import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

const PartnerEnquiry = () => {
  const [unavailable, setUnavailable] = useState(false);
  return (
    <section id="partner-enquiry" className="border-t bg-muted/40 scroll-mt-24">
      <div className="container grid gap-8 py-14 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
        <div>
          <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-accent">Partner enquiry</p>
          <h2 className="font-display text-2xl font-semibold leading-snug">Industry Integrated<br />Collaboration Partner</h2>
        </div>
        <form className="grid gap-5 sm:grid-cols-2" onSubmit={(event) => { event.preventDefault(); setUnavailable(true); }}>
          <label className="space-y-2 text-sm font-medium">Contact name<Input name="name" autoComplete="name" required /></label>
          <label className="space-y-2 text-sm font-medium">Organisation / Institution<Input name="organisation" autoComplete="organization" required /></label>
          <label className="space-y-2 text-sm font-medium">Work email<Input name="email" type="email" autoComplete="email" required /></label>
          <label className="space-y-2 text-sm font-medium">Phone number<Input name="phone" type="tel" autoComplete="tel" /></label>
          <label className="space-y-2 text-sm font-medium sm:col-span-2">Collaboration interests<Textarea name="message" rows={4} required /></label>
          <div className="sm:col-span-2"><Button type="submit">Send partner enquiry<ArrowUpRight /></Button>
            {unavailable && <p role="alert" className="mt-3 text-sm text-destructive">Enquiry delivery is not connected yet. Your enquiry has not been sent.</p>}
          </div>
        </form>
      </div>
    </section>
  );
};
export default PartnerEnquiry;
