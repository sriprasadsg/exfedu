import heroBanner from "@/assets/hero-banner-3d-wide.png";

const Hero = () => (
  <section aria-label="Exafluence Education introduction" className="hero-section">
    <div className="hero-banner">
      <img
        src={heroBanner}
        alt=""
        aria-hidden="true"
        width={2064}
        height={512}
        className="hero-banner-art"
      />
      <div className="hero-banner-copy">
        <h1 className="hero-title">Exafluence Education</h1>
        <p className="hero-tagline">Connecting Academia, Industry &amp; Technology</p>
      </div>
    </div>
  </section>
);

export default Hero;
