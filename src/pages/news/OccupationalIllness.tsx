import Layout from "@/components/layout/Layout";
import { Link } from "react-router-dom";
import { Phone, Mail } from "lucide-react";

const OccupationalIllness = () => (
  <Layout>
    <section className="bg-cream py-16 md:py-20">
      <div className="container mx-auto px-4 md:px-8 max-w-4xl text-center">
        <h1 className="font-display text-3xl md:text-5xl font-bold text-navy-900 leading-tight italic mb-8">
          Occupational Illness Compensation: Your Rights as an Employee
        </h1>
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <span className="font-semibold text-navy-900">Rebecca Thompson</span>
          <span>February 28, 2024</span>
        </div>
      </div>
    </section>

    <article className="max-w-3xl mx-auto px-4 py-16 md:py-20">
      <p className="text-muted-foreground leading-relaxed mb-8">
        Developed a work-related illness? You may be entitled to compensation beyond standard workers' comp. Understanding the full range of legal options available to you is essential for protecting your health and financial future.
      </p>

      <h2 className="font-display text-2xl md:text-3xl font-bold text-navy-900 mt-16 mb-4">
        Workers' comp vs. personal injury claims
      </h2>
      <p className="text-muted-foreground leading-relaxed mb-6">
        Workers' compensation provides basic medical coverage and partial wage replacement for work-related illnesses, but it doesn't compensate for pain and suffering, full lost wages, or punitive damages. If your employer knowingly exposed you to hazardous conditions or violated OSHA regulations, you may have grounds for a separate personal injury lawsuit.
      </p>

      <h2 className="font-display text-2xl md:text-3xl font-bold text-navy-900 mt-16 mb-4">
        Common occupational illnesses and their causes
      </h2>
      <ul className="space-y-2 mb-8">
        {["Respiratory diseases from asbestos, silica dust, or chemical fumes", "Cancers linked to benzene, formaldehyde, or radiation exposure", "Neurological damage from heavy metal poisoning (lead, mercury, manganese)", "Hearing loss from prolonged noise exposure without adequate protection", "Skin conditions from repeated chemical contact or allergen exposure", "Repetitive stress injuries from ergonomic failures in the workplace"].map((item) => (
          <li key={item} className="flex items-start gap-3 text-muted-foreground text-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-purple-500 shrink-0 mt-2" />{item}
          </li>
        ))}
      </ul>

      <h2 className="font-display text-2xl md:text-3xl font-bold text-navy-900 mt-16 mb-4">
        The challenge of proving causation
      </h2>
      <p className="text-muted-foreground leading-relaxed mb-6">
        Unlike traumatic workplace injuries where the cause is obvious, occupational illnesses develop gradually over months or years. Employers and their insurers frequently argue that the condition was caused by genetics, lifestyle factors, or exposure outside the workplace. Successfully proving causation requires detailed employment history documentation, industrial hygiene assessments, and expert medical testimony.
      </p>

      <h2 className="font-display text-2xl md:text-3xl font-bold text-navy-900 mt-16 mb-4">
        Statute of limitations considerations
      </h2>
      <p className="text-muted-foreground leading-relaxed mb-12">
        For occupational illnesses, the clock on filing a claim typically starts when you knew or should have known that your condition was work-related. This "discovery rule" is critical because many occupational diseases have long latency periods. However, once you receive a diagnosis or suspect a workplace connection, time is limited. Contact an attorney immediately to preserve your rights.
      </p>

      <div className="flex items-center justify-between pt-8 border-t border-border">
        <Link to="/news" className="border border-navy-900 text-navy-900 hover:bg-navy-900 hover:text-white font-medium px-5 py-2 rounded-full transition-all text-sm">
          Back to overview
        </Link>
        <span className="text-sm text-muted-foreground">Share this article:</span>
      </div>
    </article>

    <section className="bg-navy-900 py-16 md:py-20">
      <div className="container mx-auto px-4 md:px-8 max-w-2xl">
        <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-2 italic">Want to know more?</h2>
        <p className="text-white/70 mb-6">Contact our team</p>
        <div className="flex flex-wrap gap-3">
          <a href="tel:4157892200" className="border border-white text-white hover:bg-white hover:text-navy-900 font-medium px-5 py-2 rounded-full transition-all text-sm flex items-center gap-2"><Phone className="w-3.5 h-3.5" /> 415-789-2200</a>
          <a href="mailto:info@apexinjurylaw.com" className="border border-white text-white hover:bg-white hover:text-navy-900 font-medium px-5 py-2 rounded-full transition-all text-sm flex items-center gap-2"><Mail className="w-3.5 h-3.5" /> info@apexinjurylaw.com</a>
        </div>
      </div>
    </section>
  </Layout>
);

export default OccupationalIllness;
