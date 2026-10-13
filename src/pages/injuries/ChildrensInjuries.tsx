import Layout from "@/components/layout/Layout";
import { Link } from "react-router-dom";
import { CheckCircle } from "lucide-react";
import childrensIllustration from "@/assets/icons/childhood-injury.svg";

const ChildrensInjuries = () => (
  <Layout>
    <section className="bg-navy-900 text-white py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-extrabold leading-tight mb-6">
              Your child was injured? We'll protect their rights and future.
            </h1>
            <p className="text-white/80 leading-relaxed mb-8">
              When a child is injured due to someone else's negligence, the stakes are incredibly high. Children's injuries can affect their development, education, and quality of life for years to come. Our compassionate attorneys specialize in securing compensation that covers not just immediate medical needs, but long-term care, therapy, and future opportunities.
            </p>
            <Link to="/contact" className="inline-block bg-purple-500 hover:bg-purple-600 text-white font-semibold px-8 py-4 rounded-full transition-all duration-300 shadow-lg">
              Get Free Consultation
            </Link>
          </div>
          <div className="flex justify-center">
            <img src={childrensIllustration} alt="Children's injuries illustration" className="w-full max-w-sm" />
          </div>
        </div>
      </div>
    </section>

    <section className="py-16 md:py-24 bg-secondary">
      <div className="container mx-auto px-4 md:px-8 max-w-4xl">
        <h2 className="text-2xl md:text-3xl font-extrabold text-navy-900 mb-2">
          <span className="border-b-4 border-purple-500 pb-2 inline-block">Common children's injury cases</span>
        </h2>
        <div className="grid sm:grid-cols-2 gap-4 mt-8">
          {["Playground equipment injuries", "School negligence and supervision failures", "Daycare and childcare center accidents", "Defective toy and product injuries", "Dog bites and animal attacks", "Swimming pool and drowning incidents", "School bus accidents", "Bullying-related physical harm"].map((item) => (
            <div key={item} className="flex items-center gap-3 text-muted-foreground">
              <CheckCircle className="w-5 h-5 text-purple-500 shrink-0" />
              {item}
            </div>
          ))}
        </div>
      </div>
    </section>

    <section className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4 md:px-8 max-w-4xl">
        <h2 className="text-2xl md:text-3xl font-extrabold text-navy-900 mb-6">Special considerations for children's claims</h2>
        <p className="text-muted-foreground leading-relaxed mb-6">
          Children's injury claims have unique legal aspects. Minors cannot file lawsuits on their own behalf—a parent or guardian must act as their legal representative. Additionally, the statute of limitations for children's injuries is often extended, typically not beginning until the child reaches the age of majority. Any settlement involving a minor must be approved by the court to ensure it's in the child's best interest.
        </p>
        <p className="text-muted-foreground leading-relaxed">
          We take a comprehensive approach to calculating damages for children, working with pediatric specialists, child psychologists, and life-care planners to project the full lifetime impact of the injury. Settlement funds are typically placed in structured settlements or court-supervised trust accounts to ensure the money is available when the child needs it most.
        </p>
      </div>
    </section>
  </Layout>
);

export default ChildrensInjuries;
