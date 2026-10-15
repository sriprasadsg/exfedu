import { Link } from "react-router-dom";
import { homepageCapabilities } from "@/data/site";
import penMark from "@/assets/pen-mark.png";

/* Anchor points for the eight arms around the centre circle (viewBox 1200x900). */
const positions = [[180, 100], [1020, 100], [180, 330], [1020, 330], [180, 570], [1020, 570], [180, 800], [1020, 800]];

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
      </div>
      <ul className="capabilities-arms">
        {homepageCapabilities.map((arm) => (
          <li key={arm.id} className="capabilities-arm">
            <Link to={arm.path} className="capabilities-arm-link">
              <span className="capabilities-arm-dot" aria-hidden="true" />
              <span className="capabilities-arm-title">{arm.title}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  </section>
);
export default EcosystemHub;
