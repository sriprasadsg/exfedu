import heroBanner from "@/assets/home-hero-academic-network.png.asset.json";
import heroBannerNarrow from "@/assets/home-hero-academic-network-mobile.png.asset.json";
import HeroDots from "./HeroDots";

const Hero = () => (
  <section aria-label="Exafluence Education introduction" className="hero-section">
    <div className="hero-banner">
      <div className="hero-banner-media">
        <picture>
        <source media="(max-width: 640px)" srcSet={heroBannerNarrow.url} />
        <img
          src={heroBanner.url}
          alt=""
          aria-hidden="true"
          width={1920}
          height={395}
          className="hero-banner-art"
        />
        </picture>
        <HeroDots />
      </div>
      <div className="hero-banner-copy">
        <h1 className="hero-title">
          Exafluence Education
        </h1>
        <p className="hero-tagline">Connecting Academia, Industry &amp; Technology</p>
      </div>
    </div>
  </section>
);

export default Hero;
