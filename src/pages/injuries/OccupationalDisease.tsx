import Layout from "@/components/layout/Layout";
import { Link } from "react-router-dom";
import { CheckCircle } from "lucide-react";
import occupationalIllustration from "@/assets/icons/occupational-illness.svg";

const OccupationalDisease = () => (
  <Layout>
    <section className="bg-navy-900 text-white py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-extrabold leading-tight mb-6">
              Work made you sick? You have the right to compensation.
            </h1>
            <p className="text-white/80 leading-relaxed mb-8">
              Occupational diseases develop over months or years of exposure to harmful substances, repetitive motions, or hazardous conditions in the workplace. Unlike sudden injuries, these illnesses can be difficult to link to employment—but our specialized attorneys know exactly how to build these complex cases.
            </p>
            <Link to="/contact" className="inline-block bg-purple-500 hover:bg-purple-600 text-white font-semibold px-8 py-4 rounded-full transition-all duration-300 shadow-lg">
              Get Free Consultation
            </Link>
          </div>
          <div className="flex justify-center">
            <img src={occupationalIllustration} alt="Occupational disease illustration" className="w-full max-w-sm" />
          </div>
        </div>
      </div>
    </section>

    <section className="py-16 md:py-24 bg-secondary">
      <div className="container mx-auto px-4 md:px-8 max-w-4xl">
        <h2 className="text-2xl md:text-3xl font-extrabold text-navy-900 mb-2">
          <span className="border-b-4 border-purple-500 pb-2 inline-block">Common occupational diseases</span>
        </h2>
        <div className="grid sm:grid-cols-2 gap-4 mt-8">
          {["Mesothelioma and asbestos-related diseases", "Occupational asthma and lung disease", "Repetitive strain and carpal tunnel", "Hearing loss from noise exposure", "Skin conditions from chemical contact", "Cancer from toxic substance exposure", "Lead and heavy metal poisoning", "Silicosis from dust inhalation"].map((item) => (
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
        <h2 className="text-2xl md:text-3xl font-extrabold text-navy-900 mb-6">Establishing the workplace connection</h2>
        <p className="text-muted-foreground leading-relaxed mb-6">
          The biggest challenge in occupational disease claims is proving the causal link between your workplace exposure and your illness. Employers and insurers frequently argue that the disease was caused by non-work factors, genetic predisposition, or lifestyle choices. Our team works with industrial hygienists, toxicologists, and occupational medicine specialists to establish clear, evidence-based connections.
        </p>
        <p className="text-muted-foreground leading-relaxed">
          We also investigate whether your employer failed to provide adequate protective equipment, proper ventilation, safety training, or timely health screenings. If manufacturer negligence contributed to your exposure, we may pursue additional third-party claims to maximize your compensation. Time limits apply—contact us as soon as you receive a diagnosis.
        </p>
      </div>
    </section>
  </Layout>
);

export default OccupationalDisease;
