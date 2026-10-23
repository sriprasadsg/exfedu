import Layout from "@/components/layout/Layout";
import Hero from "@/components/home/Hero";
import Collaborators from "@/components/home/Collaborators";
import EcosystemHub from "@/components/home/EcosystemHub";
import WaysToPartner from "@/components/home/WaysToPartner";
import PartnerEnquiry from "@/components/home/PartnerEnquiry";

const Index = () => (
  <Layout className="homepage-static">
    <Hero />
    <Collaborators />
    <h2 className="eco2-title">The Exfedu Learning Ecosystem</h2>
    <EcosystemHub />
    <WaysToPartner />
    <PartnerEnquiry />
  </Layout>
);
export default Index;
