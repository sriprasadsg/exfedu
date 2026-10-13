import { Link } from "react-router-dom";
import { GraduationCap, ArrowRight } from "lucide-react";
import Layout from "@/components/layout/Layout";
import { sections, categories, type Section } from "@/data/site";

const W = 1240, H = 1020, CX = W / 2, CY = H / 2, RX = 500, RY = 390;

const Card = ({ s, className = "", style }: { s: Section; className?: string; style?: React.CSSProperties }) => (
  <Link
    to={`/${s.slug}`}
    style={style}
    className={`group flex gap-3 rounded-2xl border bg-card p-4 shadow-sm transition hover:-translate-y-0.5 hover:border-accent hover:shadow-lg ${className}`}
  >
    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border bg-muted text-foreground group-hover:bg-accent group-hover:text-accent-foreground">
      <s.icon className="h-5 w-5" />
    </span>
    <span className="min-w-0">
      <span className="block font-display text-sm font-semibold leading-tight">{s.title}</span>
      {s.tagline && <span className="block text-[11px] text-muted-foreground">({s.tagline})</span>}
      <span className="mt-1 block space-y-0.5 text-xs text-muted-foreground">
        {s.items.slice(0, 3).map((i) => <span key={i} className="block truncate">• {i}</span>)}
      </span>
    </span>
  </Link>
);

const Hub = () => (
  <div className="mx-auto mb-4 flex h-64 w-64 flex-col items-center justify-center rounded-full border-[10px] border-muted bg-card text-center shadow-xl ring-1 ring-border">
    <GraduationCap className="h-10 w-10" />
    <p className="mt-2 font-display text-2xl font-bold leading-tight tracking-tight">EXAFLUENCE<br />EDUCATION</p>
    <div className="my-2 h-px w-24 bg-border" />
    <p className="px-6 text-xs text-muted-foreground">Where Academia, Industry &amp; Technology Converge</p>
  </div>
);

const Index = () => {
  const pts = sections.map((_, i) => {
    const a = (-90 + i * 30) * (Math.PI / 180);
    return { x: CX + RX * Math.cos(a), y: CY + RY * Math.sin(a), a };
  });
  return (
    <Layout>
      <section className="container py-10">
        {/* Desktop radial hub */}
        <div className="hidden xl:block">
          <div className="relative mx-auto" style={{ width: W, height: H }}>
            <svg className="absolute inset-0 text-foreground/70" width={W} height={H}>
              <circle cx={CX} cy={CY} r={175} fill="none" stroke="currentColor" strokeDasharray="3 6" opacity={0.3} />
              {pts.map((p, i) => {
                const sx = CX + 150 * Math.cos(p.a), sy = CY + 150 * Math.sin(p.a);
                const ex = CX + (RX - 120) * Math.cos(p.a), ey = CY + (RY - 70) * Math.sin(p.a);
                return (
                  <g key={i}>
                    <line x1={sx} y1={sy} x2={ex} y2={ey} stroke="currentColor" strokeWidth={1.5} />
                    <circle cx={sx} cy={sy} r={5} fill="currentColor" />
                    <circle cx={ex} cy={ey} r={5} fill="hsl(var(--background))" stroke="currentColor" strokeWidth={2} />
                  </g>
                );
              })}
            </svg>
            <div className="absolute" style={{ left: CX - 128, top: CY - 128 }}><Hub /></div>
            {sections.map((s, i) => (
              <Card key={s.slug} s={s} className="absolute w-[230px]" style={{ left: pts[i].x - 115, top: pts[i].y - 62 }} />
            ))}
          </div>
        </div>
        {/* Mobile / tablet */}
        <div className="xl:hidden">
          <Hub />
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {sections.map((s) => <Card key={s.slug} s={s} />)}
          </div>
        </div>
      </section>

      <section className="container mt-10 grid gap-6 md:grid-cols-4">
        {categories.map((c) => (
          <div key={c.slug} className="rounded-2xl border p-6">
            <p className="text-xs font-semibold uppercase tracking-wider text-accent">{c.title}</p>
            {sections.filter((s) => s.category === c.slug).map((s) => (
              <Link key={s.slug} to={`/${s.slug}`} className="mt-3 flex items-center justify-between text-sm font-medium hover:text-accent">
                {s.title} <ArrowRight className="h-4 w-4" />
              </Link>
            ))}
          </div>
        ))}
      </section>
    </Layout>
  );
};
export default Index;
