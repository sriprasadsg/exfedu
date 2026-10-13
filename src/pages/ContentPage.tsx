import { Link, useLocation } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import NotFound from "./NotFound";
import { BlockView } from "@/components/site/Blocks";
import { categories, findPage, navPages } from "@/data/site";

const ContentPage = () => {
  const { pathname } = useLocation();
  const page = findPage(pathname);
  if (!page) return <NotFound />;
  const cat = categories.find((c) => c.slug === page.category)!;
  const parent = page.parent ? findPage(page.parent) : undefined;
  const siblings = navPages(page.category);

  return (
    <Layout>
      <section className="border-b">
        <div className="container py-14 md:py-20">
          <nav className="text-sm text-muted-foreground" aria-label="Breadcrumb">
            <Link to="/" className="hover:text-primary">Exafluence Education</Link> / {cat.title}
            {parent && <> / <Link to={parent.path} className="hover:text-primary">{parent.title}</Link></>}
          </nav>
          <div className="mt-8 flex items-start gap-5">
            <span className="mt-1 hidden h-14 w-14 shrink-0 items-center justify-center rounded-full border sm:flex"><page.icon className="h-6 w-6 text-primary" strokeWidth={1.25} /></span>
            <div>
              {page.eyebrow && <p className="mb-2 text-xs uppercase tracking-[0.18em] text-muted-foreground">{page.eyebrow}</p>}
              <h1 className="font-display text-4xl font-light tracking-tight md:text-5xl">{page.title}</h1>
              <p className="mt-4 max-w-2xl text-lg font-light text-muted-foreground">{page.summary}</p>
            </div>
          </div>
        </div>
      </section>
      <div className="container grid gap-12 py-14 lg:grid-cols-[1fr_240px]">
        <div className="min-w-0 space-y-16">{page.blocks.map((b, i) => <BlockView key={i} block={b} page={page} />)}</div>
        <aside className="hidden lg:block">
          <div className="sticky top-24 border-l pl-5">
            <p className="mb-3 text-xs uppercase tracking-wider text-muted-foreground">{cat.title}</p>
            {siblings.map((s) => (
              <Link key={s.path} to={s.path} className={`block py-1.5 text-sm hover:text-primary ${s.path === page.path || s.path === page.parent ? "text-primary" : "text-muted-foreground"}`}>{s.title}</Link>
            ))}
          </div>
        </aside>
      </div>
    </Layout>
  );
};
export default ContentPage;
