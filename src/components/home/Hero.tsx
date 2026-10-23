import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import heroArt from "@/assets/home-hero-ai-education.png.asset.json";

const Hero = () => (
  <section aria-label="Exafluence Education introduction" className="hero2">
    <div className="container hero2-inner">
      <div className="hero2-copy">
        <h1 className="hero2-title">Exafluence Education</h1>
        <p className="hero2-sub">An EdTech Division of <span className="brand-exa">Exa</span><span className="brand-fluence">fluence</span> Inc. USA</p>
        <ul className="hero2-lines">
          <li className="hero2-nowrap">AI, Gen AI, Data Science</li>
          <li>Cloud Technologies</li>
          <li>Quantum Computing</li>
        </ul>
        <Button asChild size="lg" className="hero2-cta"><Link to="/programmes">Explore Programmes</Link></Button>
      </div>
      <img src={heroArt.url} alt="" aria-hidden="true" width={978} height={799} className="hero2-art" fetchPriority="high" />
    </div>
  </section>
);

export default Hero;
