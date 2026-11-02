import { Link } from "react-router-dom";
import { ArrowUp, ArrowUpRight } from "lucide-react";
import exafluence from "@/assets/exafluence-footer-exact.png.asset.json";
import skillshoneLogo from "@/assets/skillshone-original.png.asset.json";
import { organisationSections, organisations, type Organisation } from "@/data/site";
import { Button } from "@/components/ui/button";
import { organisationPath } from "@/lib/programmeNavigation";

const partners: Organisation[] = ["SVU", "IBM", "XIME"];

const Footer = () => (
  <footer className="site-footer border-t">
    <div className="container pt-14 pb-10">
      <div className="grid gap-10 md:grid-cols-[1fr_1fr_1fr_auto]">

            <div>
              <Link to="/collaboration-network" className="footer-title-gradient mb-3 block text-base font-medium">Our Collaboration Network</Link>
              {partners.map((p) => (
                <div key={p} className="footer-partner-group">
                  <Link to={organisationPath(p)} className="footer-partner block py-1.5 text-sm">
                    {organisations[p].name}
                  </Link>
                  {organisationSections[p]?.length ? (
                    <ul className="footer-partner-sections">
                      {organisationSections[p].map((s) => (
                        <li key={s.id}>
                          <Link to={`${organisationPath(p)}#${s.id}`} className="footer-partner-section">
                            {s.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </div>
              ))}
            </div>
            <div>
              <Link to="/about" className="footer-option block py-1.5 text-sm">About Us</Link>
              <Link to="/skillshone" className="footer-featured" aria-label="SkillShone">
                  <img src={skillshoneLogo.url} alt="SkillShone" loading="lazy" className="footer-featured-logo" />
                  <ArrowUpRight className="h-3 w-3" strokeWidth={1.75} aria-hidden />
                </Link>
              <Link to="/#partner-enquiry" className="footer-option block py-1.5 text-sm">Enquire Now</Link>
            </div>
        <div className="footer-company-mark flex md:justify-end md:items-start">
          <img src={exafluence.url} alt="Exafluence — Data Driven Influence" className="w-auto" />
        </div>
      </div>
    </div>
    <div className="container flex items-center justify-between gap-4 pb-8 text-xs">
      <p className="opacity-80">© {new Date().getFullYear()}, All Rights Reserved | <strong className="font-medium">Exafluence Education</strong></p>
      <Button variant="ghost" size="icon"
        type="button"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="footer-top-btn"
        aria-label="Back to top"
      >
        <ArrowUp className="h-5 w-5" strokeWidth={2} />
      </Button>
    </div>
  </footer>
);
export default Footer;
