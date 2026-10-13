import Layout from "@/components/layout/Layout";
import { Link } from "react-router-dom";
import { CheckCircle } from "lucide-react";
import workplaceIllustration from "@/assets/icons/workplace-injury.svg";

const WorkplaceInjuries = () => (
  <Layout>
    <section className="bg-navy-900 text-white py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-extrabold leading-tight mb-6">
              Hurt on the job? You deserve more than workers' comp.
            </h1>
            <p className="text-white/80 leading-relaxed mb-8">
              Workplace injuries can be life-altering, leaving you unable to work and buried in medical bills. While workers' compensation provides basic coverage, you may be entitled to significantly more through a personal injury claim—especially if a third party's negligence contributed to your accident.
            </p>
            <Link to="/contact" className="inline-block bg-purple-500 hover:bg-purple-600 text-white font-semibold px-8 py-4 rounded-full transition-all duration-300 shadow-lg">
              Get Free Consultation
            </Link>
          </div>
          <div className="flex justify-center">
            <img src={workplaceIllustration} alt="Workplace injury illustration" className="w-full max-w-sm" />
          </div>
        </div>
      </div>
    </section>

    <section className="py-16 md:py-24 bg-secondary">
      <div className="container mx-auto px-4 md:px-8 max-w-4xl">
        <h2 className="text-2xl md:text-3xl font-extrabold text-navy-900 mb-2">
          <span className="border-b-4 border-purple-500 pb-2 inline-block">Common workplace injuries</span>
        </h2>
        <div className="grid sm:grid-cols-2 gap-4 mt-8">
          {["Construction falls", "Machinery accidents", "Repetitive strain injuries", "Warehouse and loading dock incidents", "Electrical injuries", "Chemical exposure burns", "Slip and fall accidents", "Falling object injuries"].map((item) => (
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
        <h2 className="text-2xl md:text-3xl font-extrabold text-navy-900 mb-6">Beyond workers' compensation</h2>
        <p className="text-muted-foreground leading-relaxed mb-6">
          Workers' comp covers medical bills and a portion of lost wages, but it doesn't compensate for pain and suffering, emotional distress, or full lost earning capacity. If a third party—such as a subcontractor, equipment manufacturer, or property owner—contributed to your injury, you may have a separate personal injury claim that provides significantly greater compensation.
        </p>
        <p className="text-muted-foreground leading-relaxed">
          Our attorneys have helped hundreds of injured workers navigate both systems simultaneously, maximizing their total recovery. We handle OSHA investigations, third-party liability claims, and complex multi-employer worksite cases. There's no upfront cost—we only get paid when you do.
        </p>
      </div>
    </section>
  </Layout>
);

export default WorkplaceInjuries;
