import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import AboutUs from "./pages/AboutUs";
import Costs from "./pages/Costs";
import Contact from "./pages/Contact";
import FAQ from "./pages/FAQ";
import News from "./pages/news/News";
import InsuranceSettlement from "./pages/news/InsuranceSettlement";
import MedicalMalpracticeArticle from "./pages/news/MedicalMalpracticeArticle";
import OccupationalIllness from "./pages/news/OccupationalIllness";
import SkiInjuryArticle from "./pages/news/SkiInjuryArticle";
import TrafficAccidents from "./pages/injuries/TrafficAccidents";
import WorkplaceInjuries from "./pages/injuries/WorkplaceInjuries";
import MedicalMalpractice from "./pages/injuries/MedicalMalpractice";
import OccupationalDisease from "./pages/injuries/OccupationalDisease";
import SportsRecreation from "./pages/injuries/SportsRecreation";
import ChildrensInjuries from "./pages/injuries/ChildrensInjuries";
import ProductLiability from "./pages/injuries/ProductLiability";
import BusinessOwners from "./pages/injuries/BusinessOwners";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/costs" element={<Costs />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/news" element={<News />} />
          <Route path="/news/insurance-settlement-negotiations" element={<InsuranceSettlement />} />
          <Route path="/news/medical-malpractice-proving-negligence" element={<MedicalMalpracticeArticle />} />
          <Route path="/news/occupational-illness-compensation" element={<OccupationalIllness />} />
          <Route path="/news/ski-injury-liability" element={<SkiInjuryArticle />} />
          <Route path="/injuries/traffic-accidents" element={<TrafficAccidents />} />
          <Route path="/injuries/workplace-injuries" element={<WorkplaceInjuries />} />
          <Route path="/injuries/medical-malpractice" element={<MedicalMalpractice />} />
          <Route path="/injuries/occupational-disease" element={<OccupationalDisease />} />
          <Route path="/injuries/sports-recreation" element={<SportsRecreation />} />
          <Route path="/injuries/childrens-injuries" element={<ChildrensInjuries />} />
          <Route path="/injuries/product-liability" element={<ProductLiability />} />
          <Route path="/injuries/business-owners" element={<BusinessOwners />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
