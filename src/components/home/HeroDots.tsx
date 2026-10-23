import wide from "@/assets/home-hero-dots-wide.json";
import narrow from "@/assets/home-hero-dots-narrow.json";

const HeroDots = () => (
  <div className="hero-dot-layers" aria-hidden="true">
    {[{ data: wide, mode: "wide" }, { data: narrow, mode: "narrow" }].map(({ data, mode }) => (
      <svg key={mode} className={`hero-dot-layer hero-dot-layer--${mode}`} viewBox={`0 0 ${data.width} ${data.height}`} preserveAspectRatio="xMaxYMid meet">
        {data.dots.map((dot, i) => (
          <image key={i} className="hero-dot" href={dot.sprite} x={dot.x} y={dot.y} width={dot.size} height={dot.size} style={{ animationDelay: `${-(i * 0.31) % 3.6}s` }} />
        ))}
      </svg>
    ))}
  </div>
);

export default HeroDots;