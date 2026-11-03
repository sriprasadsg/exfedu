import Layout from "@/components/layout/Layout";
import PartnerEnquiry from "@/components/home/PartnerEnquiry";
import StudentEnquiry from "@/components/site/StudentEnquiry";
import { Link, useSearchParams } from "react-router-dom";
import { programmes } from "@/data/site";
import { usePageTitle } from "@/hooks/usePageTitle";

/** Student programme enquiries and institutional partnership enquiries are separate
 * forms. ?programme=<slug> preselects a programme; IBM programmes and ?type=institution
 * open the institutional form. */
const Contact = () => {
  const [params] = useSearchParams();
  const programme = programmes.find(p => p.slug === params.get("programme"));
  const institutional = params.get("type") === "institution" || programme?.organisation === "IBM";
  usePageTitle("Contact & Enquiries | Exafluence Education", "Send a student programme enquiry or an institutional partnership enquiry to Exafluence Education.");
  const tab = (active: boolean) => `rounded-full border px-4 py-2 text-sm font-medium transition-colors ${active ? "border-primary bg-primary text-primary-foreground" : "border-border text-foreground hover:border-primary"}`;
  return (
    <Layout>
      <section className="border-b">
        <div className="container py-12 md:py-16">
          <p className="mb-2 text-xs uppercase tracking-[0.18em] text-muted-foreground">Contact / Enquiry</p>
          <h1 className="font-display text-4xl font-medium tracking-tight text-primary md:text-5xl">Talk to Exafluence Education</h1>
          <p className="mt-4 max-w-2xl text-lg text-muted-foreground">Choose the enquiry that fits you.</p>
          <nav className="mt-6 flex flex-wrap gap-3" aria-label="Enquiry type">
            <Link to={programme && !institutional ? `/contact?programme=${programme.slug}` : "/contact"} className={tab(!institutional)} aria-current={!institutional ? "page" : undefined}>Student programme enquiry</Link>
            <Link to={programme?.organisation === "IBM" ? `/contact?type=institution&programme=${programme.slug}` : "/contact?type=institution"} className={tab(institutional)} aria-current={institutional ? "page" : undefined}>Institutional partnership enquiry</Link>
          </nav>
        </div>
      </section>
      {institutional
        ? <PartnerEnquiry key={programme?.slug ?? "partner"} programme={programme?.title} intro={programme ? { title: "Institutional programme enquiry", description: "Discuss this programme for your institution's students, faculty or workforce." } : undefined} />
        : <StudentEnquiry key={programme?.slug ?? "student"} programmeSlug={programme?.slug} />}
    </Layout>
  );
};
export default Contact;
