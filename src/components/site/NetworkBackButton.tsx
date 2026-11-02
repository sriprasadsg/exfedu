import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

/** Colourful back button shown at the very top of every collaboration partner page
 * (client brief, 2 November 2026). It replaces the plain "Our Collaboration Network"
 * breadcrumb link that used to sit inside each page's breadcrumb. */
const NetworkBackButton = () => (
  <Link className="network-back" to="/collaboration-network">
    <span className="network-back-icon"><ArrowLeft size={16} aria-hidden="true" /></span>
    Back to Our Collaboration Network
  </Link>
);

export default NetworkBackButton;
