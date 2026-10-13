import { Link } from "react-router-dom";
import exafluence from "@/assets/exafluence-footer.png.asset.json";
import { categories, navPages } from "@/data/site";

const Footer = () => (
  <footer className="border-t bg-primary text-primary-foreground">
    <div className="container py-14">
      <p className="footer-brand-line whitespace-nowrap font-display"><span className="footer-title-gradient">Exafluence Education</span> <span className="opacity-80">— An Edtech Division of Exafluence Inc., USA</span></p>
    </div>
    <div className="container grid gap-10 pb-14 md:grid-cols-2 lg:grid-cols-5">
      <div>
        <p className="text-sm font-light opacity-70">Where Academia, Industry & Technology Converge.</p>
        <div className="mt-5 inline-block rounded-md bg-background p-3">
          <img src={exafluence.url} alt="Exafluence — Data Driven Influence" className="h-12 w-auto" />
        </div>
      </div>
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
