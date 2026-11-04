import { Link } from "react-router-dom";
import { ArrowUp, ArrowUpRight, MapPin } from "lucide-react";
import exafluence from "@/assets/exafluence-footer-exact.png";
import skillshoneLogo from "@/assets/skillshone-original.png";
import { organisations, type Organisation } from "@/data/site";
import { Button } from "@/components/ui/button";
import { organisationPath } from "@/lib/programmeNavigation";
import { footerLocations, headquartersLabel } from "@/data/locations";
import { CountryFlag } from "@/components/layout/FlagIcons";

// Client brief, 2 November 2026: three top-aligned columns, no sublists under a partner,
// order Sri Venkateswara University → IBM, height follows the content.
// XIME removed from the network (client, 3 November 2026).
const partners: Organisation[] = ["SVU", "IBM"];

const Footer = () => (
  <footer className="site-footer border-t">
    <div className="container footer-columns">
      <div>
        <Link to="/collaboration-network" className="footer-title-gradient footer-column-title">Our Collaboration Network</Link>
        <ul className="footer-list">
          {partners.map((p) => (
            <li key={p}>
              <Link to={organisationPath(p)} className="footer-partner footer-list-link">{organisations[p].name}</Link>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <p className="footer-column-title">Quick Links</p>
        <ul className="footer-list">
          <li><Link to="/about" className="footer-option footer-list-link">About Us</Link></li>
          <li>
            <Link to="/skillshone" className="footer-featured" aria-label="SkillShone">
              <img src={skillshoneLogo} alt="SkillShone" loading="lazy" className="footer-featured-logo" />
              <ArrowUpRight className="h-3 w-3" strokeWidth={1.75} aria-hidden />
            </Link>
          </li>
          <li><Link to="/#partner-enquiry" className="footer-option footer-list-link">Enquire Now</Link></li>
        </ul>
      </div>

      <div className="footer-brand footer-company-mark">
        {/* Client, 3 November 2026: the footer logo links to the parent company site. */}
        <a href="https://www.exafluence.com" target="_blank" rel="noopener noreferrer" className="footer-company-link" aria-label="Exafluence — opens in a new tab">
          <img src={exafluence} alt="Exafluence — Data Driven Influence" className="w-auto" />
        </a>
      </div>
    </div>

    {/* Client, 4 November 2026: the single office line is replaced by the headquarters
        list — a map marker before every address, a small flag beside each country. */}
    <div className="container footer-locations">
      <p className="footer-locations-title">{headquartersLabel}</p>
      <div className="footer-location-grid">
        {footerLocations.map((country) => (
          <section className="footer-country" key={country.code} aria-label={country.name}>
            <p className="footer-country-name">
              <CountryFlag code={country.code} />
              <span>{country.name}</span>
            </p>
            <ul className="footer-offices">
              {country.offices.map((office) => (
                <li className="footer-office" key={office.label}>
                  <MapPin className="footer-office-pin" strokeWidth={1.9} aria-hidden />
                  <div className="footer-office-body">
                    <p className="footer-office-label">{office.label}</p>
                    <address className="footer-office-address">
                      {office.lines.map((line) => (
                        <span key={line}>
                          {line}
                          <br />
                        </span>
                      ))}
                    </address>
                    {office.phone && <p className="footer-office-phone">{office.phone}</p>}
                  </div>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </div>

    <div className="container footer-legal">
      <p className="opacity-80">© {new Date().getFullYear()}, All Rights Reserved | <strong className="font-medium">Exafluence Education</strong></p>
      <nav className="footer-legal-links" aria-label="Legal">
        <Link to="/privacy-policy" className="footer-option footer-legal-link">Privacy Policy</Link>
        <span className="footer-legal-sep" aria-hidden />
        <Link to="/terms-and-conditions" className="footer-option footer-legal-link">Terms &amp; Conditions</Link>
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
