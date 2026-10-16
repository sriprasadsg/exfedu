import heroBanner from "@/assets/home-hero-glass-blocks.png.asset.json";

const Hero = () => (
  <section aria-label="Exafluence Education introduction" className="hero-section">
    <div className="hero-banner">
      <img
        src={heroBanner.url}
        alt=""
        aria-hidden="true"
        width={1694}
        height={928}
        className="hero-banner-art"
      />
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
