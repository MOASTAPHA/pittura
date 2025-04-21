
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import HeroSection from '@/components/HeroSection';
import FeaturedCollections from '@/components/FeaturedCollections';
import ArtifactCard from '@/components/ArtifactCard';
import VirtualTourCard from '@/components/VirtualTourCard';
import ArtifactViewer3D from '@/components/ArtifactViewer3D';
import { Button } from '@/components/ui/button';
import { featuredArtifacts, virtualTours, currentAuctions } from '@/data/mockData';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Boxes, Library, ExternalLink, ArrowRight } from 'lucide-react';
import FeaturedArtifactsSection from './index/FeaturedArtifactsSection';
import HologramExperienceSection from './index/HologramExperienceSection';
import VirtualToursSection from './index/VirtualToursSection';
import DigitalAuctionsSection from './index/DigitalAuctionsSection';
import NewsletterSection from './index/NewsletterSection';
import ShebaraSection from './index/ShebaraSection';
import AlUlaSection from './index/AlUlaSection';

const MODEL_URLS = {
  VASE: "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/Vase/glTF/Vase.gltf",
  DAMAGE_HELMET: "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/DamagedHelmet/glTF/DamagedHelmet.gltf",
  ANTIQUE_CAMERA: "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/AntiqueCamera/glTF/AntiqueCamera.gltf"
};

const Index = () => {
  const [isRTL, setIsRTL] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    setIsRTL(params.get('lang') === 'ar');
  }, [location]);

  return (
    <div className={isRTL ? 'rtl' : ''}>
      <Navigation isRTL={isRTL} />
      <HeroSection isRTL={isRTL} />
      <FeaturedArtifactsSection isRTL={isRTL} />
      <ShebaraSection isRTL={isRTL} />
      <FeaturedCollections isRTL={isRTL} />
      <AlUlaSection isRTL={isRTL} />
      <HologramExperienceSection isRTL={isRTL} />
      <VirtualToursSection isRTL={isRTL} />
      <DigitalAuctionsSection isRTL={isRTL} />
      <NewsletterSection isRTL={isRTL} />
      <Footer isRTL={isRTL} />
    </div>
  );
};

export default Index;
