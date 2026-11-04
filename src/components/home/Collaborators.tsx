import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { collaborationSlides, organisations } from "@/data/site";
import { organisationPath } from "@/lib/programmeNavigation";
import BannerStory, { hasBannerStory } from "./BannerStory";

/** Collaboration partners listed one after another on a single page — no carousel. */
const Collaborators = () => (
  <section aria-labelledby="collab-title" className="network-section">
    <div className="container">
      <div className="network-heading"><h1 id="collab-title">Our Collaboration Network</h1></div>
      <div className="network-list flex flex-col gap-8">
        {collaborationSlides.map((slide) => {
          const org = organisations[slide.organisation];
          return <article key={slide.organisation} className={`network-slide${hasBannerStory(slide.organisation) ? "" : " network-slide--text"}`} aria-label={org.name}>
            <div className="network-panel"><img className={`network-logo ${org.logoClass}`} src={org.logo} alt={`${org.name} logo`} loading="lazy" />
              <h2>{slide.heading}</h2><p>{slide.text}</p><Button asChild><Link to={organisationPath(slide.organisation)}>{slide.label}<ArrowRight aria-hidden="true" /></Link></Button>
            </div>
            {hasBannerStory(slide.organisation) && <div className="network-visual"><BannerStory organisation={slide.organisation} active /></div>}
          </article>;
        })}
      </div>
    </div>
  </section>
);
export default Collaborators;
