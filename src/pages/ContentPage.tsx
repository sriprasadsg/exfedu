import { Link, Navigate, useLocation } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import NotFound from "./NotFound";
import { BlockView } from "@/components/site/Blocks";
import { categories, findPage, navPages, retiredPageDestinations } from "@/data/site";
import programmesCap from "@/assets/programmes-cap.png";
import internshipsBanner from "@/assets/internships-banner.jpg";
import SkillShonePage from "@/components/site/SkillShonePage";
import successImg from "@/assets/hero-success.png";
import IbmPages from "@/components/site/IbmPages";
import { programmes } from "@/data/site";
import ProgrammeDirectory from "@/components/site/ProgrammeDirectory";
import ProgrammeDetail from "@/components/site/ProgrammeDetail";
import OrganisationProgrammes from "@/components/site/OrganisationProgrammes";
import { organisationFromPath, programmePath, svuLegacyRedirect, svuSectionFromPath } from "@/lib/programmeNavigation";
import SvuPages from "@/components/site/SvuPages";
import "@/styles/programmes.css";

const heroVisuals: Record<string, string> = {
  "/student-success": successImg,
};

const ContentPage = () => {
  const { pathname } = useLocation();
  const retiredDestination = retiredPageDestinations[pathname.replace(/\/$/, "")];
  if (retiredDestination) return <Navigate to={retiredDestination} replace />;
  if (pathname.replace(/\/$/, "") === "/programmes") return <Layout><ProgrammeDirectory /></Layout>;
  const svuLegacy = svuLegacyRedirect(pathname);
  if (svuLegacy) return <Navigate to={svuLegacy} replace />;
  const svuSection = svuSectionFromPath(pathname);
  if (svuSection) return <Layout><SvuPages section={svuSection} /></Layout>;
  const organisation = organisationFromPath(pathname);
  if (organisation === "IBM") return <Layout><IbmPages /></Layout>;
  if (organisation) return <Layout><OrganisationProgrammes organisation={organisation} /></Layout>;
  const legacyProgramme = programmes.find(p => pathname.replace(/\/$/, "") === `/programmes/${p.slug}`);
  if (legacyProgramme) return <Navigate to={programmePath(legacyProgramme)} replace />;
  const programme = programmes.find(p => pathname.replace(/\/$/, "") === programmePath(p));
  if (programme) return <Layout><ProgrammeDetail key={programme.slug} programme={programme} /></Layout>;
  const page = findPage(pathname);
  if (!page) return <NotFound />;
  const cat = categories.find((c) => c.slug === page.category);
  if (!cat) return <NotFound />;
  const parent = page.parent ? findPage(page.parent) : undefined;
  const siblings = navPages(page.category);

  if (page.path === "/collaboration-network") {
    return <Layout>{page.blocks.map((block, i) => <BlockView key={i} block={block} page={page} />)}</Layout>;
  }

  const breadcrumb = (
    <nav className="text-sm text-muted-foreground" aria-label="Breadcrumb">
      <Link to="/" className="hover:text-primary">Exafluence Education</Link> / {cat.title}
      {parent && <> / <Link to={parent.path} className="hover:text-primary">{parent.title}</Link></>}
    </nav>
  );

  const heading = (
    <div className="flex items-start gap-5 animate-fade-in">
      {!page.hideIcon && <span className="glossy-icon mt-1 hidden h-14 w-14 shrink-0 items-center justify-center rounded-full sm:flex"><page.icon className="h-6 w-6 text-primary" strokeWidth={1.25} /></span>}
      <div>
        {page.eyebrow && <p className="mb-2 text-xs uppercase tracking-[0.14em] text-muted-foreground">{page.eyebrow}</p>}
        <h1 className="font-display text-4xl font-medium md:text-5xl">{page.title}</h1>
        {page.tagline && <p className="mt-3 whitespace-pre-line text-xl font-medium leading-snug text-foreground md:text-2xl">{page.tagline}</p>}
        {!page.hideSummary && <p className="hero-summary mt-4 text-lg leading-relaxed text-muted-foreground">{page.summary}</p>}
      </div>
    </div>
  );

  const body = (
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
  );

  if (page.path === "/about") {
    return (
      <Layout>
        {page.blocks.map((block, i) => <BlockView key={i} block={block} page={page} />)}
      </Layout>
    );
  }

  if (page.path === "/industry-collaborations") {
    return (
      <Layout>
        <section className="page-hero-banner" aria-label="Industry & Technology Collaborations introduction">
          <div className="container relative">
            {breadcrumb}
            <div className="mt-8">{heading}</div>
          </div>
        </section>
        <main>{body}</main>
      </Layout>
    );
  }

  if (page.path === "/research-innovation") {
    return (
      <Layout>
        <section className="page-hero-banner" aria-label={`${page.title} introduction`}>
          <div className="container relative">
            {breadcrumb}
            <div className="mt-8">{heading}</div>
          </div>
        </section>
        <main>{body}</main>
      </Layout>
    );
  }

  if (page.path === "/career-development") {
    return (
      <Layout>
        <section className="page-hero-banner" aria-label={`${page.title} introduction`}>
          <div className="container relative">
            {breadcrumb}
            <div className="mt-8">{heading}</div>
          </div>
        </section>
        <main>{body}</main>
      </Layout>
    );
  }

  if (page.path === "/skillshone") {
    return <Layout><SkillShonePage page={page} /></Layout>;
  }

  return (
    <Layout>
      {page.path === "/programmes" || page.path === "/internships" ? (
        <section
          className={
            page.path === "/programmes"
              ? "page-hero-banner page-hero-banner--programmes"
              : "page-hero-banner"
          }
          aria-label={page.path === "/programmes" ? "Programmes introduction" : "Internships & Industry Exposure introduction"}
        >
          <div className="container relative">
            {breadcrumb}
            <div className="mt-8">{heading}</div>
          </div>
          <img
            src={page.path === "/programmes" ? programmesCap : internshipsBanner}
            alt=""
            aria-hidden="true"
            width={page.path === "/programmes" ? 914 : 1536}
            height={page.path === "/programmes" ? 593 : 1920}
            className="page-hero-banner-art"
          />
        </section>
      ) : (
        <section className="relative overflow-hidden border-b">
          <div className="container relative py-14 md:py-20">
            {breadcrumb}
            <div className="mt-8 grid items-center gap-10 md:grid-cols-[1fr_auto]">
              {heading}
              {heroVisuals[page.path] && (
                <img src={heroVisuals[page.path]} alt="" aria-hidden="true" width={1024} height={1024} className="hero-visual hero-visual--float mx-auto w-56 md:w-72 lg:w-80" />
              )}
            </div>
          </div>
        </section>
      )}
      <main>{body}</main>
    </Layout>
  );
};
export default ContentPage;
