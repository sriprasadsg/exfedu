import { Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import NotFound from "./NotFound";
import { legalDocuments } from "@/data/legal";

// Client document, 2 November 2026: /privacy-policy and /terms-and-conditions,
// linked from the footer. Draft-only bracketed fields are omitted until confirmed.
const LegalPage = ({ path }: { path: string }) => {
  const doc = legalDocuments.find((d) => d.path === path);
  if (!doc) return <NotFound />;

  return (
    <Layout>
      <section className="page-hero-banner" aria-label={`${doc.title} introduction`}>
        <div className="container relative">
          <nav className="text-sm text-muted-foreground" aria-label="Breadcrumb">
            <Link to="/" className="hover:text-primary">Exafluence Education</Link> / {doc.title}
          </nav>
          <div className="mt-8 animate-fade-in">
            <h1 className="font-display text-4xl font-medium md:text-5xl">{doc.title}</h1>
            <p className="mt-3 text-xl font-medium leading-snug text-foreground md:text-2xl">{doc.tagline}</p>
            <p className="mt-2 text-sm text-muted-foreground">Last updated: {doc.lastUpdated}</p>
          </div>
        </div>
      </section>
      <main>
        <div className="container max-w-3xl space-y-10 py-14">
          {doc.intro.map((p, i) => (
            <p key={i} className="text-lg leading-relaxed text-muted-foreground">{p}</p>
          ))}
          {doc.sections.map((section) => (
            <section key={section.heading} className="space-y-3">
              <h2 className="font-display text-2xl font-medium">{section.heading}</h2>
              {section.paragraphs?.map((p, i) => (
                <p key={i} className="leading-relaxed text-muted-foreground">{p}</p>
              ))}
              {section.list && (
                <ul className="list-disc space-y-2 pl-6 leading-relaxed text-muted-foreground">
                  {section.list.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              )}
            </section>
          ))}
        </div>
      </main>
    </Layout>
  );
};

export default LegalPage;
