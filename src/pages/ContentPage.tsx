import { Link, useLocation } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import NotFound from "./NotFound";
import { BlockView } from "@/components/site/Blocks";
import { categories, findPage, navPages } from "@/data/site";
import programmesImg from "@/assets/books-3d-open.png";
import researchImg from "@/assets/hero-research.png";
import ibmImg from "@/assets/hero-ibm.png";
import successImg from "@/assets/hero-success.png";
import skillshoneImg from "@/assets/hero-skillshone.png";
import techChip from "@/assets/tech-chip.png";
import techNeural from "@/assets/tech-neural.png";
import techCloud from "@/assets/tech-cloud.png";

const heroVisuals: Record<string, string> = {
  "/programmes": programmesImg,
  "/research-innovation": researchImg,
  "/industry-collaborations/ibm": ibmImg,
  "/student-success": successImg,
  "/skillshone": skillshoneImg,
};

const ContentPage = () => {
  const { pathname } = useLocation();
  const page = findPage(pathname);
  if (!page) return <NotFound />;
  const cat = categories.find((c) => c.slug === page.category);
  if (!cat) return <NotFound />;
  const parent = page.parent ? findPage(page.parent) : undefined;
  const siblings = navPages(page.category);

  if (page.path === "/about") {
    return (
      <Layout>
        <main className="container about-page">
          <header className="about-page-heading">
            <nav aria-label="Breadcrumb"><Link to="/" className="hover:text-primary">Exafluence Education</Link> / About Us</nav>
            <h1>{page.title}</h1>
          </header>
          {page.blocks.map((block, i) => <BlockView key={i} block={block} page={page} />)}
        </main>
      </Layout>
    );
  }

  return (
    <Layout>
      <section className={`relative overflow-hidden border-b${page.path === "/programmes" ? " pb-24 lg:pb-0" : ""}`}>
        {page.path === "/programmes" && (
          <div className="page-decor" aria-hidden="true">
            <img src={techChip} alt="" loading="lazy" width={816} height={816} className="page-decor__item page-decor__item--chip" />
            <img src={techNeural} alt="" loading="lazy" width={816} height={816} className="page-decor__item page-decor__item--net" />
            <img src={techCloud} alt="" loading="lazy" width={816} height={816} className="page-decor__item page-decor__item--cloud" />
          </div>
        )}
        <div className="container relative py-14 md:py-20">
          <nav className="text-sm text-muted-foreground" aria-label="Breadcrumb">
            <Link to="/" className="hover:text-primary">Exafluence Education</Link> / {cat.title}
            {parent && <> / <Link to={parent.path} className="hover:text-primary">{parent.title}</Link></>}
          </nav>
          <div className="mt-8 grid items-center gap-10 md:grid-cols-[1fr_auto]">
            <div className="flex items-start gap-5 animate-fade-in">
              <span className="glossy-icon mt-1 hidden h-14 w-14 shrink-0 items-center justify-center rounded-full sm:flex"><page.icon className="h-6 w-6 text-primary" strokeWidth={1.25} /></span>
              <div>
                {page.eyebrow && <p className="mb-2 text-xs uppercase tracking-[0.14em] text-muted-foreground">{page.eyebrow}</p>}
                <h1 className="font-display text-4xl font-medium md:text-5xl">{page.title}</h1>
                <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted-foreground">{page.summary}</p>
              </div>
            </div>
            {heroVisuals[page.path] && (
              <img src={heroVisuals[page.path]} alt="" aria-hidden="true" width={1024} height={1024} className={`hero-visual mx-auto w-56 md:w-72 lg:w-80${page.path === "/programmes" ? "" : " hero-visual--float"}`} />
            )}
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
