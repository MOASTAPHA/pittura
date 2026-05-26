import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { LanguageProvider } from "@/contexts/LanguageContext";
import Index from "./pages/Index";
import Explore from "./pages/Explore";
import ArtifactDetail from "./pages/ArtifactDetail";
import ARViewer from "./pages/ARViewer";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";
import HologramExperience from "./pages/HologramExperience";
import VirtualMuseum from "./pages/VirtualMuseum";
import Auctions from "./pages/Auctions";
import AuctionSection from "./pages/AuctionSection";
import ArtifactExplorer from "./pages/ArtifactExplorer";
import PanoramaExperience from "./pages/PanoramaExperience";
import HeritageExperience from "./pages/HeritageExperience";
import About from "./pages/About";
import InteractiveViewer from "./pages/InteractiveViewer";
import LocationPanorama from "./pages/LocationPanorama";
import MarketingCopy from "./pages/MarketingCopy";
import ArabicCampaign from "./pages/ArabicCampaign";
import Contact from "./pages/Contact";
import Museums from "./pages/Museums";
import SearchPage from "./pages/SearchPage";
import FAQ from "./pages/FAQ";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <LanguageProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/explore" element={<Explore />} />
            <Route path="/map" element={<Navigate to="/explore" replace />} />
            <Route path="/artifact/:id" element={<ArtifactDetail />} />
            <Route path="/ar-viewer/:id" element={<ARViewer />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/holograms" element={<HologramExperience />} />
            <Route path="/hologram/:id" element={<HologramExperience />} />
            <Route path="/virtual-museum" element={<VirtualMuseum />} />
            <Route path="/virtual-tour" element={<VirtualMuseum />} />
            <Route path="/tours" element={<Navigate to="/virtual-museum" replace />} />
            <Route path="/auctions" element={<Auctions />} />
            <Route path="/auction-section" element={<AuctionSection />} />
            <Route path="/artifacts" element={<ArtifactExplorer />} />
            <Route path="/360-experience" element={<PanoramaExperience />} />
            <Route path="/360-experience/:locationId" element={<PanoramaExperience />} />
            <Route path="/heritage-experience" element={<HeritageExperience />} />
            <Route path="/about" element={<About />} />
            <Route path="/interactive" element={<InteractiveViewer />} />
            <Route path="/location/panorama" element={<LocationPanorama />} />
            <Route path="/marketing-copy" element={<MarketingCopy />} />
            <Route path="/arabic-campaign" element={<ArabicCampaign />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/museums" element={<Museums />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/terms" element={<Terms />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </LanguageProvider>
  </QueryClientProvider>
);

export default App;
