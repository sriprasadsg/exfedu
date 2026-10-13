import Layout from "@/components/layout/Layout";
import { Link } from "react-router-dom";
import { Phone, Mail } from "lucide-react";

const InsuranceSettlement = () => (
  <Layout>
    <section className="bg-cream py-16 md:py-20">
      <div className="container mx-auto px-4 md:px-8 max-w-4xl text-center">
        <h1 className="font-display text-3xl md:text-5xl font-bold text-navy-900 leading-tight italic mb-8">
          Understanding Insurance Settlement Negotiations: What You Need to Know
        </h1>
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <span className="font-semibold text-navy-900">Sarah Martinez</span>
          <span>March 15, 2024</span>
        </div>
      </div>
    </section>

    <article className="max-w-3xl mx-auto px-4 py-16 md:py-20">
      <p className="text-muted-foreground leading-relaxed mb-8">
        Insurance companies often make initial settlement offers that are far below what your claim is worth. Understanding the negotiation process and knowing your rights can make the difference between a fair settlement and one that leaves you covering costs out of pocket for years.
      </p>

      <h2 className="font-display text-2xl md:text-3xl font-bold text-navy-900 mt-16 mb-4">
        Why first offers are almost always too low
      </h2>
      <p className="text-muted-foreground leading-relaxed mb-6">
        Insurance adjusters are trained negotiators whose primary goal is to minimize payouts. Their first offer is typically a fraction of your claim's true value—often 25-40% of what you might ultimately receive. They count on injured people being desperate for quick cash, stressed about mounting bills, and unaware of the full extent of their damages.
      </p>

      <h2 className="font-display text-2xl md:text-3xl font-bold text-navy-900 mt-16 mb-4">
        Key tactics insurance companies use
      </h2>
      <ul className="space-y-2 mb-8">
        {["Pressuring you to give recorded statements that can be used against you", "Requesting overly broad medical record releases to find pre-existing conditions", "Delaying the process hoping you'll accept less out of frustration", "Claiming your injuries were pre-existing or unrelated to the accident", "Offering quick settlements before you understand the full extent of your injuries", "Misrepresenting policy limits or coverage provisions"].map((item) => (
          <li key={item} className="flex items-start gap-3 text-muted-foreground text-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-purple-500 shrink-0 mt-2" />{item}
          </li>
        ))}
      </ul>

      <h2 className="font-display text-2xl md:text-3xl font-bold text-navy-900 mt-16 mb-4">
        How we maximize your settlement
      </h2>
      <p className="text-muted-foreground leading-relaxed mb-6">
        Our negotiation strategy begins with thorough documentation of every aspect of your damages. We work with medical experts to project future treatment costs, vocational specialists to calculate lost earning capacity, and economists to determine the present value of future losses.
      </p>
      <p className="text-muted-foreground leading-relaxed mb-6">
        We also prepare every case as if it will go to trial. Insurance companies know which attorneys are willing to fight in court and which will fold under pressure. Our trial-ready approach consistently results in settlement offers 3-5 times higher than initial amounts.
      </p>

      <h2 className="font-display text-2xl md:text-3xl font-bold text-navy-900 mt-16 mb-4">
        When to consider going to trial
      </h2>
      <p className="text-muted-foreground leading-relaxed mb-12">
        While the vast majority of personal injury cases settle before trial, sometimes litigation is necessary to achieve a fair result. If the insurance company refuses to acknowledge liability, disputes the severity of your injuries, or makes unreasonable offers despite strong evidence, taking the case to a jury may be the best path.
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

export default InsuranceSettlement;
