import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight, Award, BookOpen, Clock3, Cpu, FlaskConical, GraduationCap, Layers, Target, Wrench, type LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { organisations } from "@/data/site";
import { ibmOverview, ibmProgrammes } from "@/data/ibm";
import ibmIllustration from "@/assets/ibm-partner-illustration.png.asset.json";
import { programmePath } from "@/lib/programmeNavigation";
import { useProgrammeSeo } from "./ProgrammeDirectory";
import IbmInstitutionalEnquiry from "./IbmInstitutionalEnquiry";
import NetworkBackButton from "./NetworkBackButton";

/** IBM collaboration page (client brief, 2 November 2026): breadcrumb, introduction,
 * programme directory, applied learning, programme information, institutional
 * enquiry and a contact action for individual learners. */
const choiceIcons: LucideIcon[] = [Layers, Cpu, Target, GraduationCap, Clock3, Award];
const choiceTones = ["blue", "teal", "violet", "amber", "blue", "teal"] as const;

const IbmPages = () => {
  useProgrammeSeo(ibmOverview.seoTitle, ibmOverview.seoDescription);
  const org = organisations.IBM;

  return (
    <main className="programme-experience ibm-page">
      <div className="ibm-band">
        <div className="container">
          <NetworkBackButton />
          <nav aria-label="Breadcrumb">
            <Link to="/">Home</Link><span aria-hidden="true">/</span>
            <span aria-current="page">IBM</span>
          </nav>
          <div className="ibm-intro">
            <div className="ibm-intro-copy">
              <img className={`programme-detail-logo ${org.logoClass}`} src={org.logo} alt={`${org.name} logo`} />
              <h1>{ibmOverview.title}</h1>
              <p className="ibm-subtitle">{ibmOverview.subtitle}</p>
              <p>{ibmOverview.introduction}</p>
              <p className="ibm-relationship">{ibmOverview.relationship}</p>
            </div>
            <figure className="ibm-intro-art"><img src={ibmIllustration.url} alt="AI coding and quantum assembly" /></figure>
          </div>
        </div>
      </div>

      <div className="container ibm-flow">
        <section className="ibm-block" id="programmes" aria-labelledby="ibm-directory-heading">
          <h2 id="ibm-directory-heading">{ibmOverview.directory.title}</h2>
          <p>{ibmOverview.directory.text}</p>
          <div className="ibm-directory">
            <div className="ibm-directory-head" aria-hidden="true">
              <span>Programme</span><span>Technical focus</span><span>Duration</span><span>Delivery</span><span />
            </div>
            {ibmProgrammes.map(p => (
              <article className="ibm-directory-row" key={p.slug}>
                <h3><Link to={programmePath(p)}>{p.title}</Link></h3>
                <span data-label="Technical focus">{p.subjects.join(", ")}</span>
                <span data-label="Duration">{p.duration}</span>
                <span data-label="Delivery">{p.delivery}</span>
                <Button variant="link" asChild className="ibm-directory-link">
                  <Link to={programmePath(p)}>View Programme<ArrowRight size={15} aria-hidden="true" /></Link>
                </Button>
              </article>
            ))}
          </div>
        </section>

        <section className="ibm-block" aria-labelledby="ibm-applied-heading">
          <h2 id="ibm-applied-heading">{ibmOverview.applied.title}</h2>
          <p>{ibmOverview.applied.text}</p>
          <ul className="ibm-steps">
            <li><span className="programme-section-icon tone-blue"><BookOpen size={21} aria-hidden="true" /></span><p>Understand the principles behind the technology</p></li>
            <li><span className="programme-section-icon tone-teal"><Wrench size={21} aria-hidden="true" /></span><p>Explore the tools specified in your programme</p></li>
            <li><span className="programme-section-icon tone-violet"><FlaskConical size={21} aria-hidden="true" /></span><p>Apply your knowledge through its practical activities</p></li>
          </ul>
          <p className="ibm-note">{ibmOverview.applied.note}</p>
        </section>

        <section className="ibm-block" aria-labelledby="ibm-choice-heading">
          <h2 id="ibm-choice-heading">{ibmOverview.choice.title}</h2>
          <p>{ibmOverview.choice.intro}</p>
          <ul className="ibm-choice">
            {ibmOverview.choice.items.map((item, index) => (
              <li key={item.label}>
                <span className={`programme-section-icon tone-${choiceTones[index]}`}>{(() => { const ChoiceIcon = choiceIcons[index]; return <ChoiceIcon size={21} aria-hidden="true" />; })()}</span>
                <p><strong>{item.label}:</strong> {item.text}</p>
              </li>
            ))}
          </ul>
        </section>

        <section className="ibm-block ibm-institution" aria-labelledby="ibm-institution-heading">
          <div className="ibm-institution-copy">
            <h2 id="ibm-institution-heading">{ibmOverview.institution.title}</h2>
            <p>{ibmOverview.institution.text}</p>
          </div>
          <IbmInstitutionalEnquiry />
        </section>

        <section className="ibm-block ibm-learner" aria-labelledby="ibm-learner-heading">
          <h2 id="ibm-learner-heading">{ibmOverview.learner.title}</h2>
          <p>{ibmOverview.learner.text}</p>
          <Button asChild><Link to="/contact">Programme Enquiry<ArrowRight size={16} aria-hidden="true" /></Link></Button>
          <Link className="ibm-back" to="/collaboration-network"><ArrowLeft size={16} aria-hidden="true" />Back to Our Collaboration Network</Link>
        </section>
      </div>
    </main>
  );
};

export default IbmPages;
