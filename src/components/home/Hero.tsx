import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import heroNetwork from "@/assets/hero-network.png";

const Hero = () => (
  <section aria-label="Exafluence Education introduction" className="hero-section">
    <div className="container hero-inner">
      <div className="hero-copy">
        <p className="hero-eyebrow">
          An Edtech Division of <span className="brand-exa">Exa</span><span className="brand-fluence">fluence</span> Inc USA
        </p>
        <h1 className="hero-title">Exafluence Education</h1>
        <p className="hero-tagline">Connecting Academia, Industry &amp; Technology</p>
        <div className="hero-ctas">
          <Link to="/programmes" className="hero-cta hero-cta--primary">
            Explore Programmes<ArrowRight className="h-4 w-4" strokeWidth={1.75} />
          </Link>
          <a href="#partner-enquiry" className="hero-cta hero-cta--ghost">
            Partner with Us<ArrowUpRight className="h-4 w-4" strokeWidth={1.75} />
          </a>
        </div>
      </div>
      <div className="hero-visual hero-visual--float" aria-hidden>
        <img src={heroNetwork} alt="" width={1024} height={1024} className="hero-network" />
      </div>
    </div>
  </section>
);

export default Hero;
