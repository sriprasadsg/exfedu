import Layout from "@/components/layout/Layout";
import { Link } from "react-router-dom";
import { CheckCircle } from "lucide-react";
import sportsIllustration from "@/assets/icons/sports-games.svg";

const SportsRecreation = () => (
  <Layout>
    <section className="bg-navy-900 text-white py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-extrabold leading-tight mb-6">
              Injured during sports or recreation? Know your legal options.
            </h1>
            <p className="text-white/80 leading-relaxed mb-8">
              Sports and recreational injuries range from minor sprains to life-changing trauma. While some risk is inherent in athletic activities, negligence by coaches, facility operators, equipment manufacturers, or other participants can turn a fun activity into a legal matter. We help injured athletes and recreational enthusiasts recover the compensation they need.
            </p>
            <Link to="/contact" className="inline-block bg-purple-500 hover:bg-purple-600 text-white font-semibold px-8 py-4 rounded-full transition-all duration-300 shadow-lg">
              Get Free Consultation
            </Link>
          </div>
          <div className="flex justify-center">
            <img src={sportsIllustration} alt="Sports recreation illustration" className="w-full max-w-sm" />
          </div>
        </div>
      </div>
    </section>

    <section className="py-16 md:py-24 bg-secondary">
      <div className="container mx-auto px-4 md:px-8 max-w-4xl">
        <h2 className="text-2xl md:text-3xl font-extrabold text-navy-900 mb-2">
          <span className="border-b-4 border-purple-500 pb-2 inline-block">Sports injuries we handle</span>
        </h2>
        <div className="grid sm:grid-cols-2 gap-4 mt-8">
          {["Skiing and snowboarding accidents", "Swimming pool and water park injuries", "Gym and fitness center incidents", "Contact sport concussions", "Cycling and mountain biking crashes", "Rock climbing and hiking falls", "Trampoline park injuries", "Golf cart and recreational vehicle accidents"].map((item) => (
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
        <h2 className="text-2xl md:text-3xl font-extrabold text-navy-900 mb-6">Waivers don't eliminate all liability</h2>
        <p className="text-muted-foreground leading-relaxed mb-6">
          Many people believe that signing a waiver before a recreational activity eliminates any possibility of legal recourse. While waivers can limit liability for inherent risks, they typically cannot protect against gross negligence, reckless conduct, or intentional harm. Poorly maintained equipment, inadequate supervision, hidden hazards, and defective safety gear can all give rise to valid claims regardless of any waiver signed.
        </p>
        <p className="text-muted-foreground leading-relaxed">
          Our team has successfully challenged waivers in numerous sports injury cases, recovering compensation for clients who were told they had no legal options. We examine the specific language of each waiver, the circumstances of the injury, and applicable state law to determine the strongest path forward for your case.
        </p>
      </div>
    </section>
  </Layout>
);

export default SportsRecreation;
