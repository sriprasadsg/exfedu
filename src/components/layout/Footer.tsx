import { Link } from "react-router-dom";
import { ArrowUp, ArrowUpRight } from "lucide-react";
import exafluence from "@/assets/exafluence-footer-exact.png.asset.json";
import { menuCategories, navPages } from "@/data/site";

const Footer = () => (
  <footer className="site-footer border-t">
    <div className="container pt-12 pb-10">
      <div className="flex flex-wrap items-center justify-between gap-6">
        <p className="footer-brand-line min-w-0 font-display">
          <span className="footer-title-gradient">Exafluence Education</span>
          <span className="footer-sep" aria-hidden>/</span>
          <span className="opacity-80">An Edtech Division of <span className="brand-exa">Exa</span><span className="brand-fluence">fluence</span> Inc., USA</span>
          <span className="footer-sep" aria-hidden>/</span>
          <Link to="/contact" className="footer-option">Contact Us</Link>
        </p>
      </div>

      <div className="mt-8 grid gap-10 md:grid-cols-[1fr_1fr_1fr_auto]">
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
