import Layout from "@/components/layout/Layout";
import Hero from "@/components/home/Hero";
import EcosystemHub from "@/components/home/EcosystemHub";
import WaysToPartner from "@/components/home/WaysToPartner";

const Index = () => (
  <Layout>
    <Hero />
    <EcosystemHub />
    <WaysToPartner />
    <PartnerEnquiry />
  </Layout>
);
export default Index;
