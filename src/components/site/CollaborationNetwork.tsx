import { Link } from "react-router-dom";
import Collaborators from "@/components/home/Collaborators";
import CollaborationLoop from "./CollaborationLoop";
import { useProgrammeSeo } from "./ProgrammeDirectory";

const CollaborationNetwork = () => {
  useProgrammeSeo("Our Collaboration Network | Exafluence Education", "Explore industry-integrated programmes with Sri Venkateswara University, IBM and XIME Chennai, including Data Science, AI, cloud and Quantum Computing.");
  return <main className="collaboration-network-page">
    <nav className="container pt-6 text-sm text-muted-foreground" aria-label="Breadcrumb"><Link to="/">Exafluence Education</Link><span aria-hidden="true"> / </span>Our Collaboration Network</nav>
    <Collaborators />
    <CollaborationLoop />
  </main>;
};
export default CollaborationNetwork;