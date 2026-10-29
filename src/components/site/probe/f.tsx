import { Library, ArrowRight } from "lucide-react";
export const F = ({ items, note, link }: { items: string[]; note: string; link: { label: string; path: string } }) =>
  <section className="programme-detail-section programme-reveal" id="brochure-enquiry"><h2><span className="programme-section-icon tone-blue"><Library size={22} aria-hidden="true" /></span>Brochure &amp; Enquiry</h2>
    <div className="programme-resource-box"><h3>Academic Resources</h3><ul>{items.map(item => <li key={item}>{item}</li>)}</ul><p>{note}</p><a href={link.path}>{link.label}<ArrowRight size={15} /></a></div>
    <div className="programme-enquiry-row"><button>Request Brochure</button><button>Enquire Now</button></div>
  </section>;
