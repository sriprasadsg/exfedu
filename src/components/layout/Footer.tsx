import { Link } from "react-router-dom";
import exafluence from "@/assets/exafluence-footer.png.asset.json";
import { categories, navPages } from "@/data/site";

const Footer = () => (
  <footer className="border-t bg-primary text-primary-foreground">
    <div className="container flex flex-wrap items-center gap-x-5 gap-y-3 pt-14 pb-8">
      <p className="footer-brand-line whitespace-nowrap font-display"><span className="footer-title-gradient">Exafluence Education</span> <span className="opacity-80">— An Edtech Division of Exafluence Inc., USA</span></p>
      <span className="inline-flex shrink-0 items-center rounded-md bg-background px-2 py-1 sm:px-3 sm:py-1.5">
        <img src={exafluence.url} alt="Exafluence — Data Driven Influence" className="footer-brand-logo w-auto" />
      </span>
    </div>
    <div className="container grid gap-10 pb-14 md:grid-cols-2 lg:grid-cols-4">
      {categories.map((c) => (
        <div key={c.slug}>
          <p className="footer-title-gradient mb-3 text-base font-medium">{c.title}</p>
          {navPages(c.slug).map((s) => (
            <Link key={s.path} to={s.path} className="footer-option block py-2 text-sm font-light">{s.title}</Link>
          ))}
        </div>
      ))}
    </div>
    <div className="border-t border-primary-foreground/10 py-5 text-center text-xs font-light opacity-60">
      © {new Date().getFullYear()} Exafluence Education · An Edtech Division of Exafluence Inc., USA
    </div>
  </footer>
);
export default Footer;
