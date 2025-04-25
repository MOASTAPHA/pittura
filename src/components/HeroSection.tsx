
import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import SearchBar from './SearchBar';
import { useNavigate } from 'react-router-dom';
import PanoramaViewer from './PanoramaViewer';
import HolographicGuide from './HolographicGuide';

interface HeroSectionProps {
  isRTL?: boolean;
}

const HeroSection = ({ isRTL = false }: HeroSectionProps) => {
  const [activeBackground, setActiveBackground] = useState(0);
  const [showPanorama, setShowPanorama] = useState(false);
  const [showGuide, setShowGuide] = useState(false);
  const panoramaRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  
  const backgrounds = [
    "https://images.unsplash.com/photo-1488747279002-c8523379faaa?q=80&w=3174&auto=format&fit=crop", // Historic archway with artistic framing
    "https://images.unsplash.com/photo-1528122819781-e0391674181b?q=80&w=3270&auto=format&fit=crop", // Desert landscape with warm tones
    "https://images.unsplash.com/photo-1591474200742-8e512e6f98f8?q=80&w=3270&auto=format&fit=crop"  // Heritage architectural details
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      if (!showPanorama) {
        setActiveBackground((prev) => (prev + 1) % backgrounds.length);
      }
    }, 8000);
    return () => clearInterval(interval);
  }, [backgrounds.length, showPanorama]);

  const handleExplore = () => {
    setShowPanorama(true);
    setTimeout(() => setShowGuide(true), 2000);
  };

  const handleClosePanorama = () => {
    setShowPanorama(false);
    setShowGuide(false);
  };

  return (
    <div className="relative hero-section h-[85vh] overflow-hidden">
      {/* Background images when panorama is not shown */}
      {!showPanorama && backgrounds.map((bg, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === activeBackground ? 'opacity-100' : 'opacity-0'
          }`}
          style={{
            backgroundImage: `url(${bg})`,
            backgroundPosition: 'center',
            backgroundSize: 'cover',
          }}
        ></div>
      ))}
      
      {/* Panorama viewer section */}
      {showPanorama && (
        <div className="absolute inset-0 z-20" ref={panoramaRef}>
          <PanoramaViewer 
            onClose={handleClosePanorama}
            isRTL={isRTL}
          />
          {showGuide && <HolographicGuide isRTL={isRTL} />}
        </div>
      )}
      
      {!showPanorama && (
        <>
          {/* Ambient video overlay with low opacity */}
          <div className="absolute inset-0 opacity-30 overflow-hidden">
            <video
              autoPlay
              muted
              loop
              className="w-full h-full object-cover"
            >
              <source src="https://archive.org/download/BigBuckBunny_124/Content/big_buck_bunny_720p_surround.mp4" type="video/mp4" />
            </video>
          </div>
          
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
        </>
      )}
      
      {/* Content */}
      {!showPanorama && (
        <div className={`relative z-10 h-full flex flex-col items-center justify-center text-white px-4 ${isRTL ? 'rtl' : ''}`}>
          <div className="max-w-5xl mx-auto text-center">
            <div className="relative">
              <h1 className="text-5xl md:text-7xl font-bold mb-4 text-center animate-fade-in font-playfair">
                {isRTL ? 'بيتورا' : 'Pittura'}
              </h1>
              <div className="absolute -inset-1 bg-blue-500/30 blur-lg rounded-full -z-10"></div>
            </div>
            
            <p className="text-xl md:text-2xl mb-8 text-center max-w-3xl mx-auto animate-fade-in" style={{ animationDelay: '0.2s' }}>
              {isRTL 
                ? 'استكشف تراث المملكة العربية السعودية الرقمي'
                : 'Explore Saudi Arabia\'s Digital Heritage'
              }
            </p>
            
            <div className="w-full max-w-2xl mx-auto mb-8 animate-fade-in" style={{ animationDelay: '0.4s' }}>
              <SearchBar 
                placeholder={isRTL ? 'ابحث عن القطع الأثرية، المعارض، والمزيد...' : 'Search artifacts, exhibitions, and more...'}
                isRTL={isRTL}
              />
            </div>
            
            <div className="flex flex-wrap gap-4 justify-center animate-fade-in" style={{ animationDelay: '0.6s' }}>
              <Button 
                className="group cta-button bg-museum-olive text-white hover:bg-museum-olive/90 px-6 py-6 rounded-full"
                onClick={handleExplore}
              >
                <span className="flex items-center gap-2">
                  {isRTL ? 'استكشف تراث المملكة في 360°' : 'Explore Saudi Heritage in 360°'}
                  <ArrowRight className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" />
                </span>
              </Button>
              
              <Button asChild variant="outline" className="backdrop-blur-md bg-white/10 border-white/20 text-white hover:bg-white/20 px-6 py-6 rounded-full">
                <a href="/hologram-gallery">
                  {isRTL ? 'تجربة الهولوجرام' : 'Experience Holograms'}
                </a>
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HeroSection;
