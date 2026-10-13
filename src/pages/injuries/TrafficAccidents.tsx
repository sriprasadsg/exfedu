import Layout from "@/components/layout/Layout";
import { Link } from "react-router-dom";
import { CheckCircle } from "lucide-react";
import trafficIllustration from "@/assets/icons/traffic-accident.svg";

const TrafficAccidents = () => (
  <Layout>
    <section className="bg-navy-900 text-white py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-extrabold leading-tight mb-6">
              Traffic Accident Injuries? We'll fight for maximum compensation.
            </h1>
            <p className="text-white/80 leading-relaxed mb-8">
              Whether you were in a car, on a motorcycle, driving a truck, or walking as a pedestrian, traffic accidents can leave devastating injuries. Our experienced attorneys have recovered millions for accident victims and know exactly how to handle insurance companies that try to minimize your claim.
            </p>
            <Link to="/contact" className="inline-block bg-purple-500 hover:bg-purple-600 text-white font-semibold px-8 py-4 rounded-full transition-all duration-300 shadow-lg">
              Get Free Consultation
            </Link>
          </div>
          <div className="flex justify-center">
            <img src={trafficIllustration} alt="Traffic accident illustration" className="w-full max-w-sm" />
          </div>
        </div>
      </div>
    </section>

    <section className="py-16 md:py-24 bg-secondary">
      <div className="container mx-auto px-4 md:px-8 max-w-4xl">
        <h2 className="text-2xl md:text-3xl font-extrabold text-navy-900 mb-2">
          <span className="border-b-4 border-purple-500 pb-2 inline-block">Types of traffic accidents we handle</span>
        </h2>
        <div className="grid sm:grid-cols-2 gap-4 mt-8">
          {["Rear-end collisions", "Head-on crashes", "T-bone intersections", "Multi-vehicle pileups", "Motorcycle accidents", "Pedestrian hit-and-runs", "Rideshare accidents (Uber/Lyft)", "Commercial truck collisions"].map((item) => (
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
        <h2 className="text-2xl md:text-3xl font-extrabold text-navy-900 mb-6">What to do after a traffic accident</h2>
        <p className="text-muted-foreground leading-relaxed mb-6">
          The moments following a traffic accident are critical for your health and your legal case. First, ensure everyone's safety and call 911. Document everything—take photos of the scene, vehicle damage, and your injuries. Exchange information with other drivers and collect witness contact details. Seek medical attention even if you feel fine, as many injuries don't present symptoms immediately. Most importantly, don't sign anything or give recorded statements to insurance companies before speaking with an attorney.
        </p>
        <p className="text-muted-foreground leading-relaxed">
          California's statute of limitations for personal injury claims is two years from the date of the accident, but evidence can disappear quickly. We recommend contacting our office within days of your accident so we can preserve crucial evidence, including surveillance footage, vehicle black box data, and witness testimony.
        </p>
      </div>
    </section>
  </Layout>
);

export default TrafficAccidents;
