import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import exafluence from "@/assets/exafluence-footer-darker.png.asset.json";
import exfedu from "@/assets/exfedu-footer-logo.png.asset.json";
import { menuCategories, navPages } from "@/data/site";

const Footer = () => (
  <footer className="site-footer border-t">
    <div className="container flex flex-nowrap items-center gap-x-2 pt-14 pb-8 sm:gap-x-4">
      <p className="footer-brand-line min-w-0 whitespace-nowrap font-display"><span className="footer-title-gradient">Exafluence Education</span> <span className="opacity-80">— An Edtech Division of <span className="brand-exa">Exa</span><span className="brand-fluence">fluence</span> Inc., USA</span></p>
      <span className="footer-logo-glow inline-flex shrink-0 items-center">
        <img src={exafluence.url} alt="Exafluence — Data Driven Influence" className="footer-brand-logo w-auto" />
      </span>
    </div>
    <div className="container grid gap-10 pb-14 md:grid-cols-2 lg:grid-cols-3">
      {menuCategories.map((c) => {
        const pages = navPages(c.slug);
        const featured = pages.filter((s) => s.path === "/skillshone");
        const rest = pages.filter((s) => s.path !== "/skillshone");
        return (
          <div key={c.slug}>
            <p className="footer-title-gradient mb-3 text-base font-medium">{c.title}</p>
            {featured.map((s) => (
              <Link key={s.path} to={s.path} className="footer-featured">
                {s.title}
                <ArrowUpRight className="h-3 w-3" strokeWidth={1.75} aria-hidden />
              </Link>
            ))}
            {rest.map((s) => (
              <Link key={s.path} to={s.path} className="footer-option block py-2 text-sm font-light">{s.title}</Link>
            ))}
            {c.slug === "academic" && (
              <span className="footer-exfedu-logo mt-6 inline-flex">
                <img src={exfedu.url} alt="Exafluence Education" className="w-auto" />
              </span>
            )}
          </div>
        );
      })}
    </div>
    <div className="border-t border-primary/15 py-5 text-center text-xs font-light opacity-60">
      © {new Date().getFullYear()} Exafluence Education · An Edtech Division of Exafluence Inc., USA
    </div>
  </footer>
);
export default Footer;
