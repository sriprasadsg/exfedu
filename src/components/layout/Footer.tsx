import { Link } from "react-router-dom";
import { ArrowUp, ArrowUpRight } from "lucide-react";
import exafluence from "@/assets/exafluence-footer-exact.png.asset.json";
import skillshoneLogo from "@/assets/skillshone-original.png.asset.json";
import { organisations, type Organisation } from "@/data/site";
import { Button } from "@/components/ui/button";
import { organisationPath } from "@/lib/programmeNavigation";

// Client brief, 2 November 2026: three top-aligned columns, no sublists under a partner,
// order Sri Venkateswara University → IBM → XIME Chennai, height follows the content.
const partners: Organisation[] = ["SVU", "IBM", "XIME"];

// Client brief, 2 November 2026: each footer entry carries its own classic colour.
const partnerTone: Record<Organisation, string> = { SVU: "footer-tint-navy", IBM: "footer-tint-blue", XIME: "footer-tint-burgundy" };

const Footer = () => (
  <footer className="site-footer border-t">
    <div className="container footer-columns">
      <div>
        <Link to="/collaboration-network" className="footer-title-gradient footer-column-title">Our Collaboration Network</Link>
        <ul className="footer-list">
          {partners.map((p) => (
            <li key={p}>
              <Link to={organisationPath(p)} className={`footer-partner ${partnerTone[p]}`}>{organisations[p].name}</Link>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <p className="footer-column-title">Quick Links</p>
        <ul className="footer-list">
          <li><Link to="/about" className="footer-option footer-tint-teal">About Us</Link></li>
          <li>
            <Link to="/skillshone" className="footer-featured" aria-label="SkillShone">
              <img src={skillshoneLogo.url} alt="SkillShone" loading="lazy" className="footer-featured-logo" />
              <ArrowUpRight className="h-3 w-3" strokeWidth={1.75} aria-hidden />
            </Link>
          </li>
          <li><Link to="/#partner-enquiry" className="footer-option footer-tint-amber">Enquire Now</Link></li>
        </ul>
      </div>

      <div className="footer-brand footer-company-mark">
        <img src={exafluence.url} alt="Exafluence — Data Driven Influence" className="w-auto" />
      </div>
    </div>

    <div className="container footer-legal">
      <p className="opacity-80">© {new Date().getFullYear()}, All Rights Reserved | <strong className="font-medium">Exafluence Education</strong></p>
      <nav className="footer-legal-links" aria-label="Legal">
        <Link to="/privacy-policy" className="footer-option footer-tint-navy">Privacy Policy</Link>
        <Link to="/terms-and-conditions" className="footer-option footer-tint-blue">Terms &amp; Conditions</Link>
      </nav>
      <Button variant="ghost" size="icon"
        type="button"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="footer-top-btn"
        aria-label="Back to top"
      >
        <ArrowUp className="h-4 w-4" strokeWidth={2} />
      </Button>
    </div>
  </footer>
);
export default Footer;
