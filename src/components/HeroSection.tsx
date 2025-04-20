
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import SearchBar from './SearchBar';

interface HeroSectionProps {
  isRTL?: boolean;
}

const HeroSection = ({ isRTL = false }: HeroSectionProps) => {
  const [activeBackground, setActiveBackground] = useState(0);
  const backgrounds = [
    "https://images.unsplash.com/photo-1466442929976-97f336a657be?q=80&w=2834&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1492321936769-b49830bc1d1e?q=80&w=2671&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1482881497185-d4a9ddbe4151?q=80&w=3024&auto=format&fit=crop"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveBackground((prev) => (prev + 1) % backgrounds.length);
    }, 8000);
    return () => clearInterval(interval);
  }, [backgrounds.length]);

  return (
    <div className="relative hero-section h-[80vh] overflow-hidden">
      {backgrounds.map((bg, index) => (
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
      
      {/* Content */}
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
            <Button asChild className="group cta-button bg-museum-olive text-white hover:bg-museum-olive/90 px-6 py-6 rounded-full">
              <a href="/virtual-tour" className="flex items-center gap-2">
                {isRTL ? 'ابدأ الجولة الافتراضية' : 'Start Virtual Tour'}
                <ArrowRight className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" />
              </a>
            </Button>
            
            <Button asChild variant="outline" className="backdrop-blur-md bg-white/10 border-white/20 text-white hover:bg-white/20 px-6 py-6 rounded-full">
              <a href="/hologram-gallery">
                {isRTL ? 'تجربة الهولوجرام' : 'Experience Holograms'}
              </a>
            </Button>
          </div>
        </div>
      </div>
      
      {/* Floating museum elements */}
      <div className="absolute bottom-10 left-10 text-white animate-float">
        <div className="hologram-artifact">
          <div className="relative">
            <div className="w-24 h-24 rounded-full bg-blue-500/20 backdrop-blur-md border border-white/20 flex items-center justify-center">
              <Cube3D className="w-10 h-10 text-white/70" />
            </div>
            <div className="absolute -inset-2 bg-blue-500/20 blur-lg rounded-full -z-10"></div>
          </div>
        </div>
      </div>
      
      <div className="absolute top-1/3 right-10 text-white animate-float" style={{ animationDelay: '0.5s' }}>
        <div className="hologram-artifact">
          <div className="relative">
            <div className="w-16 h-16 rounded-full bg-museum-brown/20 backdrop-blur-md border border-white/20 flex items-center justify-center">
              <GalleryVertical className="w-8 h-8 text-white/70" />
            </div>
            <div className="absolute -inset-2 bg-museum-brown/20 blur-lg rounded-full -z-10"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
