import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import heroArt from "@/assets/home-hero-ai-cloud.png";

const Hero = () => (
  <section aria-label="Exafluence Education introduction" className="hero2">
    <div className="container hero2-inner">
      <div className="hero2-copy">
        <h1 className="hero2-title">Exafluence Education</h1>
        <p className="hero2-sub">An EdTech Division of <span className="brand-exa">Exa</span><span className="brand-fluence">fluence</span> Inc. USA</p>
        <ul className="hero2-lines">
          <li>Bringing academic learning and industry expertise together through practical education in AI, Generative AI, Data Science and advanced technologies.</li>
        </ul>
        <Button asChild size="lg" className="hero2-cta"><Link to="/programmes">Explore Programmes</Link></Button>
      </div>
      <img src={heroArt} alt="" aria-hidden="true" width={1449} height={1085} className="hero2-art" fetchPriority="high" />
    </div>
  </section>
);

export default Hero;
