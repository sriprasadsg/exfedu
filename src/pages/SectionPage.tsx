import { Link, useParams } from "react-router-dom";
import { ArrowRight, Check } from "lucide-react";
import Layout from "@/components/layout/Layout";
import NotFound from "./NotFound";
import { categories, findSection } from "@/data/site";

const SectionPage = () => {
  const { section, sub } = useParams();
  const s = findSection(section);
  if (!s) return <NotFound />;
  const subPage = sub ? s.subPages?.find((p) => p.slug === sub) : undefined;
  if (sub && !subPage) return <NotFound />;
  const cat = categories.find((c) => c.slug === s.category);

  return (
    <Layout>
      <section className="border-b bg-muted/50">
        <div className="container py-16">
          <p className="text-sm text-muted-foreground">
            <Link to="/">Home</Link> / {cat?.title} / {subPage ? <Link to={`/${s.slug}`}>{s.title}</Link> : s.title}
            {subPage && <> / {subPage.title}</>}
          </p>
          <div className="mt-6 flex items-center gap-4">
            <span className="flex h-14 w-14 items-center justify-center rounded-full border bg-card"><s.icon className="h-7 w-7" /></span>
            <h1 className="font-display text-4xl font-bold tracking-tight md:text-5xl">{subPage?.title ?? s.title}</h1>
          </div>
          <p className="mt-4 max-w-2xl text-lg text-muted-foreground">{subPage?.summary ?? s.intro}</p>
        </div>
      </section>

      <section className="container grid gap-10 py-14 lg:grid-cols-3">
        <div className="lg:col-span-2">
          {subPage?.intro && <p className="mb-10 text-lg leading-relaxed text-muted-foreground">{subPage.intro}</p>}
          {subPage?.offerings ? (
            <>
              <h2 className="font-display text-2xl font-semibold">Programmes</h2>
              <div className="mt-6 grid gap-5 sm:grid-cols-2">
                {subPage.offerings.map((o, idx) => (
                  <div key={o.title} className="flex flex-col rounded-xl border bg-card p-6">
                    <span className="text-sm font-semibold text-accent">0{idx + 1}</span>
                    <h3 className="mt-2 font-display text-lg font-semibold">{o.title}</h3>
                    <ul className="mt-3 space-y-2">
                      {o.points.map((p) => (
                        <li key={p} className="flex items-start gap-2 text-sm"><Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" />{p}</li>
                      ))}
                    </ul>
                    <p className="mt-4 text-xs font-semibold uppercase tracking-wide text-muted-foreground">Student benefits</p>
                    <p className="mt-1 text-sm text-muted-foreground">{o.benefits}</p>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <>
          <h2 className="font-display text-2xl font-semibold">{subPage ? "Overview" : "What's included"}</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {s.items.map((i) => (
              <div key={i} className="flex items-start gap-3 rounded-xl border p-5">
                <Check className="mt-0.5 h-5 w-5 text-accent" />
                <p className="font-medium">{i}</p>
              </div>
            ))}
          </div>
            </>
          )}
        </div>
        <aside className="space-y-6">
          {s.subPages && (
            <div className="rounded-2xl border p-6">
              <p className="mb-3 text-sm font-semibold">Explore {s.title}</p>
              {s.subPages.map((p) => (
                <Link key={p.slug} to={`/${s.slug}/${p.slug}`} className={`flex items-center justify-between py-2 text-sm hover:text-accent ${p.slug === sub ? "text-accent" : ""}`}>
                  {p.title} <ArrowRight className="h-4 w-4" />
                </Link>
              ))}
            </div>
          )}
          <div className="rounded-2xl bg-primary p-6 text-primary-foreground">
            <p className="font-display text-lg font-semibold">Have questions?</p>
            <p className="mt-1 text-sm opacity-75">Talk to our admissions team.</p>
            <Link to="/contact" className="mt-4 inline-block rounded-full bg-accent px-4 py-2 text-sm font-medium text-accent-foreground">Contact us</Link>
          </div>
        </aside>
      </section>
    </Layout>
  );
};
export default SectionPage;
