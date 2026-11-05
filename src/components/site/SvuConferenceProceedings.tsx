import { MapPin } from "lucide-react";
import { svuConferencePapers } from "@/data/svuReviewed";
import { researchTheme } from "./ResearchThemeIcon";

/** Carbook-inspired conference panels keep the event beside its presentation cards,
 * separate from the ordinary student-project list. */
export const SvuConferenceProceedings = () => {
  const venues = [...new Set(svuConferencePapers.map(paper => paper.conference))].map(name => ({
    name,
    papers: svuConferencePapers.filter(paper => paper.conference === name),
  }));

  return (
    <div className="svu-proceedings">
      {venues.map(venue => {
        const [event, place] = venue.name.split(" · ");
        return (
          <section className="svu-proceeding" key={venue.name}>
            <header className="svu-proceeding-head">
              <span className="svu-proceeding-pin" aria-hidden="true"><MapPin size={24} strokeWidth={1.6} /></span>
              <h4 className="svu-proceeding-event">{event}</h4>
              <span className="svu-proceeding-place">{place}</span>
            </header>
            <ul className={`svu-proceeding-list${venue.papers.length === 1 ? " svu-proceeding-list--single" : ""}`}>
              {venue.papers.map(paper => {
                const { icon: Icon, hue } = researchTheme(paper.title);
                return (
                  <li
                    className="svu-proceeding-paper"
                    key={`${paper.student}-${paper.title}`}
                    style={{ "--theme-hue": hue } as React.CSSProperties}
                  >
                    <span className="research-theme-icon" aria-hidden="true"><Icon size={28} strokeWidth={1.6} /></span>
                    <div className="svu-proceeding-body">
                      <h5 className="svu-proceeding-title">{paper.title}</h5>
                      <p className="svu-proceeding-by">Presented by <b>{paper.student}</b></p>
                    </div>
                  </li>
                );
              })}
            </ul>
          </section>
        );
      })}
    </div>
  );
};
