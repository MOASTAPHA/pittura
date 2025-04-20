
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import ArtifactDetail from "./pages/ArtifactDetail";
import ARViewer from "./pages/ARViewer";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";
import HologramExperience from "./pages/HologramExperience";
import VirtualMuseum from "./pages/VirtualMuseum";
import Auctions from "./pages/Auctions";
import ArtifactExplorer from "./pages/ArtifactExplorer";
import PanoramaExperience from "./pages/PanoramaExperience";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/artifact/:id" element={<ArtifactDetail />} />
          <Route path="/ar-viewer/:id" element={<ARViewer />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/holograms" element={<HologramExperience />} />
          <Route path="/hologram/:id" element={<HologramExperience />} />
          <Route path="/virtual-museum" element={<VirtualMuseum />} />
          <Route path="/virtual-tour" element={<VirtualMuseum />} />
          <Route path="/auctions" element={<Auctions />} />
          <Route path="/artifacts" element={<ArtifactExplorer />} />
          <Route path="/360-experience" element={<PanoramaExperience />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
