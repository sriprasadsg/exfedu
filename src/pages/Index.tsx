import Layout from "@/components/layout/Layout";
import Hero from "@/components/home/Hero";
import EcosystemHub from "@/components/home/EcosystemHub";
import WaysToPartner from "@/components/home/WaysToPartner";
import PartnerEnquiry from "@/components/home/PartnerEnquiry";

const Index = () => (
  <Layout className="homepage-static">
    <Hero />
    <EcosystemHub />
    <WaysToPartner />
    <PartnerEnquiry />
  </Layout>
);
export default Index;
