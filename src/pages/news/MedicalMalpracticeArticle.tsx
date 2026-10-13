import Layout from "@/components/layout/Layout";
import { Link } from "react-router-dom";
import { Phone, Mail } from "lucide-react";

const MedicalMalpracticeArticle = () => (
  <Layout>
    <section className="bg-cream py-16 md:py-20">
      <div className="container mx-auto px-4 md:px-8 max-w-4xl text-center">
        <h1 className="font-display text-3xl md:text-5xl font-bold text-navy-900 leading-tight italic mb-8">
          Medical Malpractice Claims: Proving Negligence in Treatment
        </h1>
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <span className="font-semibold text-navy-900">Jennifer Chen</span>
          <span>March 8, 2024</span>
        </div>
      </div>
    </section>

    <article className="max-w-3xl mx-auto px-4 py-16 md:py-20">
      <p className="text-muted-foreground leading-relaxed mb-8">
        Not every negative medical outcome constitutes malpractice. Understanding the distinction between an unfortunate result and actionable negligence is the first step in evaluating whether you have a valid claim.
      </p>

      <h2 className="font-display text-2xl md:text-3xl font-bold text-navy-900 mt-16 mb-4">
        The four elements of medical malpractice
      </h2>
      <p className="text-muted-foreground leading-relaxed mb-4">
        To succeed in a medical malpractice lawsuit, you must prove all four of the following elements:
      </p>
      <ol className="space-y-4 mb-8 list-decimal list-inside">
        <li className="text-muted-foreground leading-relaxed text-sm">
          <strong className="text-navy-900">Duty of care:</strong> A doctor-patient relationship existed, establishing the provider's obligation to treat you according to accepted medical standards.
        </li>
        <li className="text-muted-foreground leading-relaxed text-sm">
          <strong className="text-navy-900">Breach of standard:</strong> The provider failed to act as a reasonably competent physician would have under similar circumstances.
        </li>
        <li className="text-muted-foreground leading-relaxed text-sm">
          <strong className="text-navy-900">Causation:</strong> The provider's breach directly caused or substantially contributed to your injury.
        </li>
        <li className="text-muted-foreground leading-relaxed text-sm">
          <strong className="text-navy-900">Damages:</strong> You suffered actual, quantifiable harm—physical pain, additional medical expenses, lost income, or emotional suffering.
        </li>
      </ol>

      <h2 className="font-display text-2xl md:text-3xl font-bold text-navy-900 mt-16 mb-4">
        Common challenges in malpractice cases
      </h2>
      <p className="text-muted-foreground leading-relaxed mb-6">
        Medical malpractice cases are among the most complex in personal injury law. Healthcare providers have powerful legal teams and insurance companies backing them. Expert testimony is required in virtually every case, and many states have special procedural requirements including certificates of merit and caps on non-economic damages.
      </p>

      <h2 className="font-display text-2xl md:text-3xl font-bold text-navy-900 mt-16 mb-4">
        Building a strong evidence base
      </h2>
      <p className="text-muted-foreground leading-relaxed mb-6">
        The foundation of any successful malpractice claim is thorough medical record review. We obtain complete records from every provider involved in your care. Our medical experts analyze treatment decisions, identify deviations from accepted protocols, and prepare detailed reports.
      </p>
      <p className="text-muted-foreground leading-relaxed mb-12">
        We also interview nurses, technicians, and other staff who may have witnessed the events in question. Hospital incident reports and quality assurance records can provide critical insights into what went wrong.
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

export default MedicalMalpracticeArticle;
