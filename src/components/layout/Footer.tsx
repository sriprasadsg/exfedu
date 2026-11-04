import { Link } from "react-router-dom";
import { ArrowUp, ArrowUpRight, MapPin } from "lucide-react";
import exafluence from "@/assets/exafluence-footer-exact.png";
import skillshoneLogo from "@/assets/skillshone-original.png";
import { organisations, type Organisation } from "@/data/site";
import { Button } from "@/components/ui/button";
import { organisationPath } from "@/lib/programmeNavigation";
import { footerLocations, headquartersLabel } from "@/data/locations";
import { CountryFlag } from "@/components/layout/FlagIcons";

// Client brief, 2 November 2026: partner names as plain text in the footer: "not logos
// required, mention only text" (23 Oct 2026), but the original SkillShone logo stays there
// in a reduced size, and the Exafluence footer mark smaller too.
// XIME removed from the network (client, 3 November 2026).
const partners: Organisation[] = ["SVU", "IBM"];

const Footer = () => (
  <footer className="site-footer border-t">
    {/* Client brief, 4 November 2026: the footer reads in one row — 1. Our Collaboration
        Network, 2. Quick Links, 3. the headquarters list beside them in the next column. */}
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

      {/* Client, 4 November 2026: the headquarters list — a map marker before every address
          and a small flag beside each country — sits in the column beside Quick Links. */}
      <div className="footer-locations">
        <p className="footer-locations-title">{headquartersLabel}</p>
        <div className="footer-location-grid">
          {/* Client, 4 November 2026: the two countries' offices share one grid, so the
              second office in each country (New Jersey and Bangalore) starts on the same
              row and lines up across the columns. */}
          {[0, 1].map((row) =>
            footerLocations.map((country) => {
              const office = country.offices[row];
              if (!office) return null;
              return (
                <div className="footer-office-cell" key={`${country.code}-${office.label}`}>
                {officeIndex === 0 && (
                  <p className="footer-country-name">
                    <CountryFlag code={country.code} />
                    <span>{country.name}</span>
                  </p>
                )}
                <div className="footer-office">
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
                </div>
              </div>
            )),
          )}
        </div>
      </div>
    </div>

    <div className="container footer-brand-row footer-company-mark">
      {/* Client, 3 November 2026: the footer logo links to the parent company site. */}
      <a href="https://www.exafluence.com" target="_blank" rel="noopener noreferrer" className="footer-company-link" aria-label="Exafluence — opens in a new tab">
        <img src={exafluence} alt="Exafluence — Data Driven Influence" className="w-auto" />
      </a>
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
