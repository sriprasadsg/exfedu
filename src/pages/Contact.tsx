import Layout from "@/components/layout/Layout";
import PartnerEnquiry from "@/components/home/PartnerEnquiry";
import { useSearchParams } from "react-router-dom";
import { programmes } from "@/data/site";

const Contact = () => {
  const [params] = useSearchParams();
  const programme = programmes.find(p => p.slug === params.get("programme"));
  return (
  <Layout>
    <section className="border-b">
      <div className="container py-14 md:py-20">
        <p className="mb-2 text-xs uppercase tracking-[0.18em] text-muted-foreground">Contact / Enquiry</p>
        <h1 className="font-display text-4xl font-light tracking-tight md:text-5xl">Talk to Exafluence Education</h1>
        <p className="mt-4 max-w-2xl text-lg font-light text-muted-foreground">Ask about programmes, collaborations or admissions.</p>
      </div>
    </section>
    <PartnerEnquiry key={programme?.slug ?? "partner"} programme={programme?.title} intro={programme ? { title: "Enquire about a programme", description: "Ask about eligibility, learning content and admissions for your selected programme." } : undefined} />
  </Layout>
);
};
export default Contact;
