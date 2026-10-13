import { Link } from "react-router-dom";
import exafluence from "@/assets/exafluence-footer.png.asset.json";
import { categories, navPages } from "@/data/site";

const Footer = () => (
  <footer className="border-t bg-primary text-primary-foreground">
    <div className="container grid gap-10 py-14 md:grid-cols-2 lg:grid-cols-5">
      <div>
        <p className="font-display text-lg tracking-wide">Exafluence Education</p>
        <p className="mt-2 text-sm font-light opacity-70">Where Academia, Industry & Technology Converge.</p>
        <p className="mt-1 text-xs font-light opacity-60">A Division of Exafluence Inc., USA</p>
        <div className="mt-5 inline-block rounded-md bg-background p-3">
          <img src={exafluence.url} alt="Exafluence — Data Driven Influence" className="h-12 w-auto" />
        </div>
      </div>
      {categories.map((c) => (
        <div key={c.slug}>
          <p className="mb-3 text-xs uppercase tracking-wider opacity-60">{c.title}</p>
          {navPages(c.slug).map((s) => (
            <Link key={s.path} to={s.path} className="block py-1 text-sm font-light opacity-80 hover:opacity-100">{s.title}</Link>
          ))}
        </div>
      ))}
    </div>
    <div className="border-t border-primary-foreground/10 py-5 text-center text-xs font-light opacity-60">
      © {new Date().getFullYear()} Exafluence Education · A Division of Exafluence Inc., USA
    </div>
  </footer>
);
export default Footer;
