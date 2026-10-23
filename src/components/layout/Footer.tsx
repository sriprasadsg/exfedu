import { Link } from "react-router-dom";
import { ArrowUp, ArrowUpRight } from "lucide-react";
import exafluence from "@/assets/exafluence-footer-exact.png.asset.json";
import skillshoneLogo from "@/assets/skillshone-original.png.asset.json";
import { menuCategories, navPages } from "@/data/site";

const Footer = () => (
  <footer className="site-footer border-t">
    <div className="container pt-14 pb-10">
      <div className="grid gap-10 md:grid-cols-[1fr_1fr_1fr_auto]">

        {menuCategories.map((c) => {
          const pages = navPages(c.slug);
          const featured = pages.filter((s) => s.path === "/skillshone");
          const rest = pages.filter((s) => s.path !== "/skillshone");
          return (
            <div key={c.slug}>
              {c.slug === "academic" ? <Link to="/collaboration-network" className="footer-title-gradient mb-3 block text-base font-medium">{c.title}</Link> : <p className="footer-title-gradient mb-3 text-base font-medium">{c.title}</p>}
              {featured.map((s) => (
                <Link key={s.path} to={s.path} className="footer-featured" aria-label={s.title}>
                  <img src={skillshoneLogo.url} alt="" className="footer-featured-logo" />
                  <ArrowUpRight className="h-3 w-3" strokeWidth={1.75} aria-hidden />
                </Link>
              ))}
              {rest.filter(s => c.slug !== "academic").map((s) => (
                <Link key={s.path} to={s.path} className="footer-option block py-1.5 text-sm">{s.title}</Link>
              ))}
            </div>
          );
        })}
        <div className="footer-company-mark flex md:justify-end md:items-start">
          <img src={exafluence.url} alt="Exafluence — Data Driven Influence" className="w-auto" />
        </div>
      </div>
    </div>
    <div className="container flex items-center justify-between gap-4 pb-8 text-xs">
      <p className="opacity-80">© {new Date().getFullYear()}, All Rights Reserved | <strong className="font-medium">Exafluence Education</strong></p>
      <button
        type="button"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="footer-top-btn"
        aria-label="Back to top"
      >
        <ArrowUp className="h-5 w-5" strokeWidth={2} />
      </button>
    </div>
  </footer>
);
export default Footer;
