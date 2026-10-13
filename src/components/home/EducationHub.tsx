import { Link } from "react-router-dom";
import { GraduationCap } from "lucide-react";
import { arms } from "@/data/site";

// Arms sit on an ellipse around the centre; geometry lives only here (see AGENTS.md).
const W = 1100, H = 780, CX = 550, CY = 390, RING = 160;
const placed = arms.map((arm, i) => {
  const a = (-90 + (360 / arms.length) * i) * Math.PI / 180;
  return { ...arm, a, x: 50 + 37 * Math.cos(a), y: 50 + 41 * Math.sin(a) };
});

const EducationHub = () => (
  <section aria-label="Exafluence Education and its connected arms" className="education-diagram mx-auto">
    <svg className="education-connectors" viewBox={`0 0 ${W} ${H}`} aria-hidden="true">
      <circle cx={CX} cy={CY} r={RING + 18} className="hub-orbit" />
      <circle cx={CX} cy={CY} r={RING} className="hub-ring" />
      {placed.map((p) => {
        const x = CX + RING * Math.cos(p.a), y = CY + RING * Math.sin(p.a);
        return <g key={p.path}><line x1={x} y1={y} x2={(p.x / 100) * W} y2={(p.y / 100) * H} /><circle cx={x} cy={y} r="4" /></g>;
      })}
    </svg>
    <div className="education-centre">
      <GraduationCap aria-hidden="true" className="h-10 w-10 text-primary" strokeWidth={1.25} />
      <h1 className="mt-2 font-display text-2xl font-normal leading-tight tracking-[0.08em]">EXAFLUENCE<br /><span className="text-muted-foreground">EDUCATION</span></h1>
      <span className="my-3 h-px w-2/3 bg-border" />
      <p className="text-xs font-light leading-snug text-muted-foreground">Where Academia, Industry<br />&amp; Technology Converge</p>
    </div>
    <div className="education-arms">
      {placed.map((p) => (
        <Link key={p.path} to={p.path} className="education-arm" style={{ left: `${p.x}%`, top: `${p.y}%` }}>
          <span className="education-icon"><p.icon aria-hidden="true" strokeWidth={1.4} /></span>
          <div className="min-w-0">
            <h2 className="text-sm leading-tight">{p.title}</h2>
            <p className="mt-1 text-xs leading-snug text-muted-foreground">{p.items.join(" · ")}</p>
          </div>
        </Link>
      ))}
    </div>
  </section>
);
export default EducationHub;
