import { Link } from "react-router-dom";
import { ArrowRight, Atom, Clock3, Monitor } from "lucide-react";
import { Button } from "@/components/ui/button";
import { programmes } from "@/data/site";
import { programmePath } from "@/lib/programmeNavigation";

/** One compact programme band shared by the directory and SVU listing. */
const QuantumProgrammeFeature = () => {
  const programme = programmes.find(p => p.slug === "ms-quantum-computing");
  if (!programme) return null;
  return <section className="quantum-feature" aria-label="M.S. Quantum Computing programme corner">
    <div className="quantum-feature-heading">
      <Atom size={38} strokeWidth={1.25} aria-hidden="true" />
      <div><span className="quantum-feature-label">SVU · Master’s Programme</span><h2>{programme.title}</h2></div>
    </div>
    <p>{programme.overview}</p>
    <p className="quantum-feature-attribution">{programme.attribution}</p>
    <dl className="quantum-feature-facts">
      <div><dt><Clock3 size={17} aria-hidden="true" />Duration</dt><dd>{programme.duration}</dd></div>
      <div><dt><Monitor size={17} aria-hidden="true" />Mode</dt><dd>{programme.delivery}</dd></div>
    </dl>
    <div className="quantum-feature-actions">
      <Button asChild><Link to={programmePath(programme)}>View Programme<ArrowRight size={16} aria-hidden="true" /></Link></Button>
      <span>Admission spell: {programme.intake}</span>
    </div>
  </section>;
};
export default QuantumProgrammeFeature;