import Layout from "@/components/layout/Layout";
import { Link } from "react-router-dom";
import { Phone, Mail } from "lucide-react";

const SkiInjuryArticle = () => {
  return (
    <Layout>
      {/* Title on cream */}
      <section className="bg-cream py-16 md:py-20">
        <div className="container mx-auto px-4 md:px-8 max-w-4xl text-center">
          <h1 className="font-display text-3xl md:text-5xl font-bold text-navy-900 leading-tight italic mb-8">
            Ski Slope Injuries: Understanding Liability and Compensation
          </h1>
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span className="font-semibold text-navy-900">Jennifer Chen</span>
            <span>February 12, 2024</span>
          </div>
        </div>
      </section>

      {/* Article body */}
      <article className="max-w-3xl mx-auto px-4 py-16 md:py-20">
        <p className="text-muted-foreground leading-relaxed mb-8">
          Winter sports bring joy to millions, but they also come with serious risks. If you've been injured while skiing or snowboarding, understanding your legal rights can be complex. This comprehensive guide explains liability, compensation, and the steps you should take after a slope accident.
        </p>

        <h2 className="font-display text-2xl md:text-3xl font-bold text-navy-900 mt-16 mb-4">
          Ski accidents are more common than you think
        </h2>
        <p className="text-muted-foreground leading-relaxed mb-4">
          Every year, over 600,000 people seek medical treatment for skiing and snowboarding injuries in North America. While many are minor, approximately 20% involve serious injuries including fractures, head trauma, and spinal damage.
        </p>
        <ul className="space-y-2 mb-8">
          {["Head and neck injuries account for nearly 20% of all ski-related hospitalizations", "Collisions with other skiers cause approximately 15% of serious injuries", "Equipment failure contributes to 8% of documented ski accidents", "Inadequate slope maintenance is a factor in 12% of injury cases"].map((item) => (
            <li key={item} className="flex items-start gap-3 text-muted-foreground text-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-purple-500 shrink-0 mt-2" />{item}
            </li>
          ))}
        </ul>

        <h2 className="font-display text-2xl md:text-3xl font-bold text-navy-900 mt-16 mb-4">
          What to do immediately after a ski accident
        </h2>
        <h3 className="font-display text-xl font-semibold text-navy-900 mt-8 mb-3 italic">
          Critical steps following a slope injury
        </h3>
        <ol className="space-y-3 mb-8 list-decimal list-inside">
          {["Seek medical attention immediately, even if injuries seem minor.", "Report the accident to ski patrol and obtain an official incident report.", "Collect information from any witnesses, including names and contact details.", "Take photographs of the accident scene, including slope conditions and signage.", "Photograph your injuries and damaged equipment.", "Preserve all equipment involved in the accident without making modifications.", "Keep all medical records, bills, and receipts related to treatment.", "Contact an experienced personal injury attorney before speaking with insurance companies."].map((step, i) => (
            <li key={i} className="text-muted-foreground leading-relaxed text-sm">{step}</li>
          ))}
        </ol>

        <h2 className="font-display text-2xl md:text-3xl font-bold text-navy-900 mt-16 mb-4">
          Determining liability in ski accidents
        </h2>
        <h3 className="font-display text-xl font-semibold text-navy-900 mt-8 mb-3 italic">
          Skier responsibility rules as the standard of care
        </h3>
        <p className="text-muted-foreground leading-relaxed mb-4">Most states have adopted skier responsibility statutes that outline the duties of care owed by both skiers and ski resort operators.</p>
        <h3 className="font-display text-xl font-semibold text-navy-900 mt-8 mb-3 italic">
          Which law applies to out-of-state ski accidents?
        </h3>
        <p className="text-muted-foreground leading-relaxed mb-4">Jurisdiction matters significantly in ski injury cases, as different states have varying levels of protection for ski resorts.</p>
        <h3 className="font-display text-xl font-semibold text-navy-900 mt-8 mb-3 italic">
          Comparative fault in ski accidents
        </h3>
        <ul className="space-y-2 mb-8">
          {["Pure comparative fault states allow recovery even if you're mostly at fault", "Modified comparative fault states bar recovery if you're 50% or more at fault", "Contributory negligence states may bar recovery entirely if you share any fault", "Assumption of risk defense may limit liability for inherent dangers of skiing"].map((item) => (
            <li key={item} className="flex items-start gap-3 text-muted-foreground text-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-purple-500 shrink-0 mt-2" />{item}
            </li>
          ))}
        </ul>

        <h2 className="font-display text-2xl md:text-3xl font-bold text-navy-900 mt-16 mb-4">
          What compensation can you recover?
        </h2>
        <ul className="space-y-2 mb-8">
          {["Medical expenses (current and future)", "Lost wages and earning capacity", "Pain and suffering", "Rehabilitation costs", "Equipment replacement", "Travel expenses for treatment"].map((item) => (
            <li key={item} className="flex items-start gap-3 text-muted-foreground text-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-purple-500 shrink-0 mt-2" />{item}
            </li>
          ))}
        </ul>

        <h2 className="font-display text-2xl md:text-3xl font-bold text-navy-900 mt-16 mb-4">
          Need help with a ski injury claim?
        </h2>
        <p className="text-muted-foreground leading-relaxed mb-4">
          Our team has extensive experience handling ski and winter sports injury claims. We understand the unique challenges these cases present and will work tirelessly to secure the compensation you deserve.
        </p>
        <p className="text-muted-foreground leading-relaxed mb-12">
          Have you sustained an injury while skiing? Or do you want to know if you are entitled to compensation? Please contact us via
        </p>
        <div className="text-sm text-muted-foreground space-y-1 mb-12">
          <p><Phone className="w-3.5 h-3.5 inline mr-2" />415-789-2200</p>
          <p><Mail className="w-3.5 h-3.5 inline mr-2" />info@apexinjurylaw.com</p>
        </div>

        {/* Bottom nav */}
        <div className="flex items-center justify-between pt-8 border-t border-border">
          <Link to="/news" className="border border-navy-900 text-navy-900 hover:bg-navy-900 hover:text-white font-medium px-5 py-2 rounded-full transition-all text-sm">
            Back to overview
          </Link>
          <span className="text-sm text-muted-foreground">Share this article:</span>
        </div>
      </article>

      {/* CTA */}
      <section className="bg-navy-900 py-16 md:py-20">
        <div className="container mx-auto px-4 md:px-8 max-w-2xl">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-2 italic">
            Want to know more?
          </h2>
          <p className="text-white/70 mb-6">Contact our team</p>
          <div className="flex flex-wrap gap-3">
            <a href="tel:4157892200" className="border border-white text-white hover:bg-white hover:text-navy-900 font-medium px-5 py-2 rounded-full transition-all text-sm flex items-center gap-2">
              <Phone className="w-3.5 h-3.5" /> 415-789-2200
            </a>
            <a href="mailto:info@apexinjurylaw.com" className="border border-white text-white hover:bg-white hover:text-navy-900 font-medium px-5 py-2 rounded-full transition-all text-sm flex items-center gap-2">
              <Mail className="w-3.5 h-3.5" /> info@apexinjurylaw.com
            </a>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default SkiInjuryArticle;
