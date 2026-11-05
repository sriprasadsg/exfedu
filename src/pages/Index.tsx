import Layout from "@/components/layout/Layout";
import Hero from "@/components/home/Hero";
import EcosystemHub from "@/components/home/EcosystemHub";
import WaysToPartner from "@/components/home/WaysToPartner";
import PartnerEnquiry from "@/components/home/PartnerEnquiry";

const Index = () => (
  <Layout className="homepage-static">
    <Hero />
    <div className="eco2-head">
      <h2 className="eco2-title">The Exfedu Learning Ecosystem</h2>
      <p className="eco2-subtitle">Connected areas — from academic foundations and technology to practical learning, research and career outcomes.</p>
    </div>
    <EcosystemHub />
    <WaysToPartner />
    <PartnerEnquiry />
  </Layout>
);
export default Index;
