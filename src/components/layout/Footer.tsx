import { Link } from "react-router-dom";
import exafluence from "@/assets/exafluence-footer.png.asset.json";
import { categories, sections } from "@/data/site";

const Footer = () => (
  <footer className="border-t bg-primary text-primary-foreground">
    <div className="container grid gap-8 py-14 md:grid-cols-5">
      <div>
        <p className="font-display text-lg font-bold">Exafluence Education</p>
        <p className="mt-2 text-sm opacity-70">Where Academia, Industry & Technology Converge.</p>
        <div className="mt-5 inline-block rounded-lg bg-background p-3">
          <img src={exafluence.url} alt="Exafluence — Data Driven Influence, ISO 27001:2022 Certified" className="h-14 w-auto" />
        </div>
      </div>
      {categories.map((c) => (
        <div key={c.slug}>
          <p className="mb-3 text-sm font-semibold">{c.title}</p>
          {sections.filter((s) => s.category === c.slug).map((s) => (
            <Link key={s.slug} to={`/${s.slug}`} className="block py-1 text-sm opacity-70 hover:opacity-100">{s.title}</Link>
          ))}
        </div>
      ))}
    </div>
    <div className="border-t border-primary-foreground/10 py-5 text-center text-xs opacity-60">
      © {new Date().getFullYear()} Exafluence Education · <Link to="/contact">Contact</Link>
    </div>
  </footer>
);
export default Footer;
