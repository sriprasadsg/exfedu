import Layout from "@/components/layout/Layout";
import { Link } from "react-router-dom";
import businessIllustration from "@/assets/icons/business-owners.svg";

const BusinessOwners = () => {
  return (
    <Layout>
      {/* Hero */}
      <section className="bg-cream py-20 md:py-28">
        <div className="container mx-auto px-4 md:px-8">
          <h1 className="font-display text-4xl md:text-5xl font-bold text-navy-900 leading-tight mb-12">
            <span className="italic">Injuries from self-</span><br />employment
          </h1>
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="flex justify-center">
              <img src={businessIllustration} alt="Business owner illustration" className="w-full max-w-xs" />
            </div>
            <div>
              <p className="text-muted-foreground leading-relaxed mb-8">
                As a business owner, you want to focus on your work and your clients. But what should you do if you are injured in an accident? For business owners, the risk is often significant. You may have taken out disability insurance, but that will not always cover your entire loss. You are also entitled to other damages, such as medical costs, travel expenses and compensation for pain and suffering.
              </p>
              <Link
                to="/contact"
                className="inline-block border border-navy-900 text-navy-900 hover:bg-navy-900 hover:text-white font-medium px-6 py-2.5 rounded-full transition-all duration-300 text-sm"
              >
                Make appointment
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Good to Know */}
      <section className="py-20 md:py-28 bg-background">
        <div className="container mx-auto px-4 md:px-8">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-navy-900 text-center mb-4">
            <span className="underline decoration-purple-500 decoration-2 underline-offset-8 italic">Good to know</span>
          </h2>
          <div className="w-16 h-1 bg-purple-500 rounded-full mx-auto mb-14" />

          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-muted-foreground leading-relaxed mb-6">
                In the event of injury to a business owner, there is a lot more to consider than just damages. The continuity of the business also needs to be ensured. We can work with you to look for solutions here too. This could include consulting an employment expert who can help you to map your options. Is there anything you can do yourself? What can you still do and what can't you do? Could your work be taken over by an additional member of staff, or do you need an aid so that you can do your work yourself? There are many questions, and we can guide you through them.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                We will also help you to identify the net income loss based on your annual figures from the years before the accident. At Apex, we are not just personal injury lawyers, but business owners too. This means that we can accurately assess your business operations and damages.
              </p>
            </div>
            <div className="flex justify-center">
              <img src={businessIllustration} alt="Business owner working" className="w-72 h-72 object-contain" />
            </div>
          </div>
        </div>
      </section>

      {/* Claim Damages */}
      <section className="py-20 md:py-28 bg-background">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="flex justify-center order-2 md:order-1">
              <div className="relative">
                <div className="absolute -bottom-4 -left-4 w-full h-full bg-purple-500 rounded-2xl" />
                <img src={businessIllustration} alt="Business success" className="relative w-64 h-80 object-contain z-10" />
              </div>
            </div>
            <div className="order-1 md:order-2">
              <h2 className="font-display text-3xl md:text-4xl font-bold text-navy-900 mb-2">
                Want to claim for<br />damages as a <span className="italic">self-<br />employed person?</span>
              </h2>
              <div className="w-16 h-1 bg-purple-500 rounded-full mb-6" />
              <p className="text-muted-foreground leading-relaxed">
                We will hold an initial consultation to discuss your situation, whether you can recover damages and, if so, which. We will then defend your interests against the client or insurer so that you can focus on your recovery. As personal injury lawyers, we can even go to court to assert your rights, and you can also count on us if you have additional care needs. In many cases, a personal injury lawyer costs nothing because our costs are part of the damages we recover.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Divider CTA */}
      <section className="py-12 bg-cream">
        <div className="container mx-auto px-4 md:px-8">
          <div className="w-full h-0.5 bg-navy-900/15 rounded-full" />
        </div>
      </section>
    </Layout>
  );
};

export default BusinessOwners;
