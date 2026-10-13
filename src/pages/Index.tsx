import Layout from "@/components/layout/Layout";
import EducationHub from "@/components/home/EducationHub";
import PartnerEnquiry from "@/components/home/PartnerEnquiry";

const Index = () => (
  <Layout>
    <div className="px-3 py-6 sm:px-6"><EducationHub /></div>
    <PartnerEnquiry />
  </Layout>
);
export default Index;
