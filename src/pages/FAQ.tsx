import Layout from "@/components/layout/Layout";
import { Link } from "react-router-dom";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

const faqs = [
  {
    q: "How much does it cost to hire Apex Injury Advocates?",
    a: "We work on a contingency fee basis, which means you pay nothing upfront and nothing out of pocket. We only get paid if we win your case—our fee is a percentage of the settlement or verdict we obtain for you. All case expenses, including expert witnesses, medical records, and court filings, are advanced by our firm.",
  },
  {
    q: "How long will my personal injury case take?",
    a: "Every case is different. Simple claims may resolve in 3-6 months, while complex cases involving severe injuries, disputed liability, or multiple defendants can take 1-3 years. We always prioritize getting you the best possible result over a quick settlement. We'll give you a realistic timeline assessment during your free consultation.",
  },
  {
    q: "What should I do immediately after an accident?",
    a: "First, seek medical attention—even if you feel okay, some injuries don't show symptoms right away. Call the police and get an official report. Take photos of the scene, your injuries, and any property damage. Collect contact information from witnesses. Do not admit fault or give recorded statements to insurance companies. Then contact our office for a free case evaluation.",
  },
  {
    q: "How much is my case worth?",
    a: "Case value depends on many factors: severity of injuries, medical expenses, lost wages, impact on quality of life, degree of fault, insurance policy limits, and more. We evaluate each case individually and work with medical and financial experts to calculate the full extent of your damages. During your consultation, we'll provide an honest assessment based on similar cases we've handled.",
  },
  {
    q: "Will my case go to trial?",
    a: "The vast majority of personal injury cases—over 95%—settle before trial. However, we prepare every case as if it will be tried, which actually helps achieve better settlements. If the insurance company refuses to offer fair compensation, we are fully prepared and willing to take your case to court. Our trial attorneys have a proven track record of securing favorable jury verdicts.",
  },
  {
    q: "Can I still file a claim if the accident was partially my fault?",
    a: "In most states, yes. California follows a 'pure comparative negligence' rule, which means you can recover damages even if you were partially at fault—your compensation is simply reduced by your percentage of fault. For example, if you were 20% at fault and your damages total $100,000, you could recover $80,000. We'll evaluate the specifics of your situation during your consultation.",
  },
  {
    q: "What types of compensation can I receive?",
    a: "Depending on your case, you may be entitled to compensation for medical bills (past and future), lost wages and earning capacity, pain and suffering, emotional distress, loss of enjoyment of life, property damage, rehabilitation costs, and in some cases, punitive damages. We work to identify every possible source of recovery.",
  },
  {
    q: "Do I need a lawyer, or can I handle my claim myself?",
    a: "While you can file a claim on your own, studies consistently show that claimants represented by attorneys receive significantly higher settlements—on average 3.5 times more than those who negotiate directly with insurance companies. Insurance adjusters are professional negotiators trained to minimize payouts. An experienced attorney levels the playing field and ensures you don't accept less than you deserve.",
  },
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <Layout>
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4 md:px-8 max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-extrabold text-navy-900 mb-4">Frequently Asked Questions</h1>
          <p className="text-muted-foreground mb-12 text-lg">
            Get answers to common questions about personal injury law, our process, and what to expect.
          </p>

          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <div key={i} className="border border-border rounded-xl overflow-hidden">
                <button
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                  className="w-full flex items-center justify-between p-5 text-left hover:bg-secondary transition-colors"
                >
                  <span className="font-semibold text-navy-900 pr-4">{faq.q}</span>
                  {openIndex === i ? (
                    <ChevronUp className="w-5 h-5 text-purple-500 shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-muted-foreground shrink-0" />
                  )}
                </button>
                {openIndex === i && (
                  <div className="px-5 pb-5 text-muted-foreground leading-relaxed">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="mt-16 bg-purple-500 text-white py-12 text-center rounded-2xl">
            <h2 className="text-2xl font-extrabold mb-3">Still have questions?</h2>
            <p className="text-white/90 mb-6">Schedule a free consultation and we'll answer all your questions in person.</p>
            <Link to="/contact" className="inline-block bg-white text-purple-500 font-semibold px-8 py-4 rounded-full hover:bg-secondary transition-colors shadow-lg">
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default FAQ;
