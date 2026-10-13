import { Link } from "react-router-dom";
import { GraduationCap } from "lucide-react";
import { sections } from "@/data/site";

const arms = [
  { slug: "exafluence-inc", x: 50, y: 8, angle: -90 },
  { slug: "industry-collaborations", x: 83, y: 17, angle: -47 },
  { slug: "programmes", x: 86, y: 34, angle: -22 },
  { slug: "practical-learning", x: 86, y: 51, angle: 0 },
  { slug: "internships", x: 84, y: 68, angle: 27 },
  { slug: "student-success", x: 80, y: 87, angle: 52 },
  { slug: "students-corner", x: 50, y: 89, angle: 90 },
  { slug: "skillshone", x: 20, y: 87, angle: 128 },
  { slug: "gallery", x: 16, y: 68, angle: 153 },
  { slug: "research-innovation", x: 14, y: 51, angle: 180 },
  { slug: "career-development", x: 14, y: 34, angle: 202 },
  { slug: "academic-collaborations", x: 17, y: 17, angle: 227 },
];

const Centre = () => (
  <div className="education-centre">
    <GraduationCap aria-hidden="true" className="h-14 w-14 text-accent" strokeWidth={1.5} />
    <h1 className="font-display text-2xl font-bold leading-tight">EXAFLUENCE<br /><span className="text-muted-foreground">EDUCATION</span></h1>
    <span className="my-3 h-px w-3/4 bg-border" />
    <p className="text-sm leading-snug text-muted-foreground">Where Academia, Industry<br />&amp; Technology Converge</p>
  </div>
);

const EducationHub = () => (
  <section aria-label="Exafluence Education and its connected areas" className="education-diagram mx-auto">
    <svg className="education-connectors" viewBox="0 0 1100 760" aria-hidden="true">
      <circle cx="550" cy="380" r="181" className="hub-orbit" />
      <circle cx="550" cy="380" r="163" className="hub-ring" />
      {arms.map((arm) => {
        const radians = arm.angle * Math.PI / 180;
        const x = 550 + 166 * Math.cos(radians), y = 380 + 166 * Math.sin(radians);
        return <g key={arm.slug}><line x1={x} y1={y} x2={arm.x * 11} y2={arm.y * 7.6} /><circle cx={x} cy={y} r="5" /></g>;
      })}
    </svg>
    <Centre />
    <div className="education-arms">
      {arms.map((arm) => {
        const section = sections.find((s) => s.slug === arm.slug);
        if (!section) return null;
        return (
          <Link key={arm.slug} to={`/${arm.slug}`} className={`education-arm arm-${arm.slug}`} style={{ left: `${arm.x}%`, top: `${arm.y}%` }}>
            <span className="education-icon"><section.icon aria-hidden="true" strokeWidth={1.7} /></span>
            <div className="min-w-0">
              <h2 className="font-display text-sm font-semibold leading-tight">{section.title}</h2>
              {section.slug === "exafluence-inc" && <p className="text-xs">(Parent Company)</p>}
              {section.slug === "skillshone" && <p className="mt-1 text-xs text-accent">Solve Industry-Grade Problems Using AI</p>}
              <ul className="mt-1 list-disc pl-3 text-xs leading-snug text-muted-foreground">
                {section.items.map((item) => <li key={item}>{item}</li>)}
              </ul>
            </div>
          </Link>
        );
      })}
    </div>
  </section>
);
export default EducationHub;
