import { Link } from "react-router-dom";
import { homepageCapabilities } from "@/data/site";
import penMark from "@/assets/pen-mark.png";
import hubInfographic from "@/assets/university-industry-hub.png.asset.json";
import academic from "@/assets/capability-academic.webp";
import technology from "@/assets/capability-technology.webp";
import programmes from "@/assets/capability-programmes.webp";
import research from "@/assets/capability-research.webp";
import practical from "@/assets/capability-practical.webp";
import industry from "@/assets/capability-industry.webp";
import career from "@/assets/capability-career.webp";
import digital from "@/assets/capability-digital.webp";

const illustrations = { academic, technology, programmes, research, practical, industry, career, digital };
const positions = [[180, 135], [600, 135], [1020, 135], [180, 450], [1020, 450], [180, 765], [600, 765], [1020, 765]];

const EcosystemHub = () => (
  <section aria-label="Education ecosystem" className="capabilities-section">
    <div className="capabilities-layout">
      <svg viewBox="0 0 1200 900" className="capabilities-connectors" aria-hidden="true" focusable="false" preserveAspectRatio="none">
        <ellipse cx="600" cy="450" rx="420" ry="315" className="capabilities-orbit" />
        <ellipse cx="600" cy="450" rx="320" ry="240" className="capabilities-orbit" />
        {positions.map(([x, y], i) => <path key={i} d={`M600 450 L${x} ${y}`} className="capabilities-spoke" />)}
      </svg>
      <div className="capabilities-brand">
        <div className="capabilities-circle">
          <p className="capabilities-company">Exafluence Inc.USA</p>
          <img src={penMark} alt="" width={92} height={92} className="capabilities-pen" />
          <p className="capabilities-name">Exafluence Education</p>
        </div>
        <img src={hubInfographic.url} alt="University to industry connection hub" loading="lazy" className="capabilities-centre-infographic" />
      </div>
      <ul className="capabilities-cards">
        {homepageCapabilities.map((card) => (
          <li key={card.id} className="capabilities-item">
            <Link to={card.path} className="capabilities-card">
              <img src={illustrations[card.id]} alt="" width={384} height={384} loading="lazy" className="capabilities-illustration" />
              <h2>{card.title}</h2>
              <ul className="capabilities-details">
                {card.capabilities.map((capability) => <li key={capability}>{capability}</li>)}
              </ul>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  </section>
);
export default EcosystemHub;
