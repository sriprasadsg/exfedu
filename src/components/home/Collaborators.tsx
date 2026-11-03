import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { collaborationSlides, organisations } from "@/data/site";
import { organisationPath } from "@/lib/programmeNavigation";
import BannerStory, { hasBannerStory } from "./BannerStory";

const Collaborators = () => {
  const [viewport, carousel] = useEmblaCarousel({ loop: true, duration: 25 });
  const [active, setActive] = useState(0);
  const select = useCallback(() => setActive(carousel?.selectedScrollSnap() ?? 0), [carousel]);
  useEffect(() => { if (!carousel) return; select(); carousel.on("select", select); return () => { carousel.off("select", select); }; }, [carousel, select]);
  return <section aria-labelledby="collab-title" className="network-section">
    <div className="container">
      <div className="network-heading"><h1 id="collab-title">Our Collaboration Network</h1><span aria-hidden="true">0{active + 1} / 03</span></div>
      <div className="network-carousel" role="region" aria-roledescription="carousel" aria-label="Collaboration network" tabIndex={0}
        onKeyDown={(e) => { if (e.key === "ArrowLeft") { e.preventDefault(); carousel?.scrollPrev(); } if (e.key === "ArrowRight") { e.preventDefault(); carousel?.scrollNext(); } }}>
        <div ref={viewport} className="network-viewport"><div className="network-track">
          {collaborationSlides.map((slide, i) => <article key={slide.organisation} className="network-slide" aria-label={`${i + 1} of 3: ${organisations[slide.organisation].name}`} aria-hidden={active !== i}>
                        <div className="network-panel"><img className={`network-logo ${organisations[slide.organisation].logoClass}`} src={organisations[slide.organisation].logo} alt={`${organisations[slide.organisation].name} logo`} loading="lazy" />
              <h3>{slide.heading}</h3><p>{slide.text}</p><Button asChild><Link tabIndex={active === i ? 0 : -1} to={organisationPath(slide.organisation)}>{slide.label}<ArrowRight aria-hidden="true" /></Link></Button>
            </div>
            <div className="network-visual"><BannerStory organisation={slide.organisation} active={active === i} /></div>
          </article>)}
        </div></div>
        <div className="network-controls"><Button variant="outline" size="icon" aria-label="Previous collaboration" onClick={() => carousel?.scrollPrev()}><ArrowLeft /></Button>
          <div className="network-dots">{collaborationSlides.map((s, i) => <Button variant="ghost" size="icon" key={s.organisation} aria-label={`Show ${organisations[s.organisation].name}`} aria-pressed={active === i} onClick={() => carousel?.scrollTo(i)}><span /></Button>)}</div>
          <Button variant="outline" size="icon" aria-label="Next collaboration" onClick={() => carousel?.scrollNext()}><ArrowRight /></Button></div>
        <span className="sr-only" aria-live="polite">{organisations[collaborationSlides[active].organisation].name}</span>
      </div>
    </div>
  </section>;
};
export default Collaborators;
