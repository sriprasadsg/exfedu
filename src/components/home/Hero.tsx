import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import heroCap from "@/assets/hero-cap-notassel.png";
import heroTassel from "@/assets/hero-tassel.png";
import heroRing from "@/assets/hero-ring-only.png";

const Hero = () => (
  <section aria-label="Exafluence Education introduction" className="hero-section">
    <div className="container hero-inner">
      <div className="hero-copy">
        <p className="hero-eyebrow">
          An Edtech Division of <span className="brand-exa">Exa</span><span className="brand-fluence">fluence</span> Inc USA
        </p>
        <h1 className="hero-title">Exafluence Education</h1>
        <p className="hero-tagline">Where Academia, Industry &amp; Technology Converge</p>
        <div className="hero-ctas">
          <Link to="/programmes" className="hero-cta hero-cta--primary">
            Explore Programmes<ArrowRight className="h-4 w-4" strokeWidth={1.75} />
          </Link>
          <a href="#partner-enquiry" className="hero-cta hero-cta--ghost">
            Partner with Us<ArrowUpRight className="h-4 w-4" strokeWidth={1.75} />
          </a>
        </div>
      </div>
      <div className="hero-visual" aria-hidden>
        <div className="hero-cap-stage">
          <img src={heroRing} alt="" width={1024} height={1024} className="hero-ring" />
          <img src={heroCap} alt="" width={1024} height={1024} className="hero-cap" />
          <img src={heroRing} alt="" width={1024} height={1024} className="hero-ring hero-ring--front" />
          <img src={heroTassel} alt="" width={1024} height={1024} className="hero-tassel" />
        </div>
      </div>
    </div>
  </section>
);

export default Hero;
