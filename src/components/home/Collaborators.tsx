import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import svu from "@/assets/svu-logo.png.asset.json";
import xime from "@/assets/xime-logo.png.asset.json";
import ibm from "@/assets/ibm-partner-badge.png.asset.json";

const items = [
  { name: "Sri Venkateswara University", logo: svu.url, kind: "Academic Collaboration", to: "/academic-collaborations/svu" },
  { name: "XIME", logo: xime.url, kind: "Academic Collaboration", to: "/academic-collaborations/xime" },
  { name: "IBM", logo: ibm.url, kind: "Technology Collaboration", to: "/industry-collaborations/ibm" },
];

const Collaborators = () => (
  <section aria-labelledby="collab-title" className="collab2">
    <div className="container">
      <h2 id="collab-title" className="collab2-title">Academic &amp; Technology Collaborations</h2>
      <div className="collab2-grid">
        {items.map((c) => (
          <article key={c.name} className="collab2-item">
            <div className="collab2-logo">
              {c.logo ? <img src={c.logo} alt={`${c.name} logo`} loading="lazy" /> : <span className="collab2-name">{c.name}</span>}
            </div>
            <p className="collab2-kind">{c.kind}</p>
            <Link to={c.to} className="collab2-link">View Details <ArrowRight size={16} aria-hidden="true" /></Link>
          </article>
        ))}
      </div>
    </div>
  </section>
);
export default Collaborators;
