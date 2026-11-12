import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { BoxTilt } from "@/components/site/BoxTilt";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index";
import Contact from "./pages/Contact";
import ContentPage from "./pages/ContentPage";
import BrandCheck from "./pages/BrandCheck";
import EcosystemPreview from "./pages/EcosystemPreview";
import ProgrammeFinder from "./pages/ProgrammeFinder";
import LegalPage from "./pages/LegalPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BoxTilt />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/admin/brand-check" element={<BrandCheck />} />
<Route path="/preview/ecosystem" element={<EcosystemPreview />} />
          <Route path="/programme-finder" element={<ProgrammeFinder />} />
          <Route path="/privacy-policy" element={<LegalPage path="/privacy-policy" />} />
          <Route path="/terms-and-conditions" element={<LegalPage path="/terms-and-conditions" />} />
          <Route path="/gallery" element={<Navigate to="/" replace />} />
          <Route path="/events-news" element={<Navigate to="/" replace />} />
          <Route path="*" element={<ContentPage />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
