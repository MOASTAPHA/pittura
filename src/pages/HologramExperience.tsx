
import { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import HologramViewer from '@/components/HologramViewer';
import { Button } from '@/components/ui/button';
import { artifactDetails } from '@/data/mockData';
import HologramHeader from '@/components/hologram/HologramHeader';
import HologramTabs from '@/components/hologram/HologramTabs';
import HologramInstructions from '@/components/hologram/HologramInstructions';
import RelatedHolograms from '@/components/hologram/RelatedHolograms';

const HologramExperience = () => {
  const [isRTL, setIsRTL] = useState(false);
  const [viewMode, setViewMode] = useState<'standard' | 'hologram'>('hologram');
  const location = useLocation();
  const { id } = useParams<{ id: string }>();

  // Get artifact details based on ID if provided
  const artifact = id ? artifactDetails[id as keyof typeof artifactDetails] : null;

  useEffect(() => {
    // Check URL for language parameter
    const params = new URLSearchParams(location.search);
    setIsRTL(params.get('lang') === 'ar');
  }, [location]);

  return (
    <div className={isRTL ? 'rtl' : ''}>
      <Navigation isRTL={isRTL} />

      <div className="bg-black text-white min-h-screen">
        <HologramHeader isRTL={isRTL} artifactTitle={artifact?.title} />
        
        {/* Hologram Viewer Section */}
        <div className="container mx-auto px-4 py-8 -mt-10">
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="lg:w-2/3">
              <div className="bg-black/60 backdrop-blur-md border border-blue-500/20 rounded-2xl overflow-hidden">
                <div className="p-4 border-b border-blue-500/20 flex justify-between items-center">
                  <h3 className="font-medium text-blue-100">
                    {isRTL ? 'عرض الهولوجرام' : 'Hologram Viewer'}
                  </h3>
                  <div className="flex gap-2">
                    <Button 
                      size="sm" 
                      variant={viewMode === 'standard' ? 'default' : 'outline'} 
                      className={viewMode === 'standard' ? 'bg-blue-600' : 'bg-transparent border-blue-500/30 text-blue-100'}
                      onClick={() => setViewMode('standard')}
                    >
                      {isRTL ? 'عرض عادي' : 'Standard View'}
                    </Button>
                    <Button 
                      size="sm" 
                      variant={viewMode === 'hologram' ? 'default' : 'outline'} 
                      className={viewMode === 'hologram' ? 'bg-blue-600' : 'bg-transparent border-blue-500/30 text-blue-100'}
                      onClick={() => setViewMode('hologram')}
                    >
                      {isRTL ? 'هولوجرام' : 'Hologram'}
                    </Button>
                  </div>
                </div>
                <div className="p-0">
                  <HologramViewer isRTL={isRTL} />
                </div>
              </div>
              
              <HologramTabs isRTL={isRTL} artifact={artifact} />
            </div>
            
            <div className="lg:w-1/3">
              <HologramInstructions isRTL={isRTL} />
            </div>
          </div>
        </div>
        
        <RelatedHolograms isRTL={isRTL} />
      </div>

      <Footer isRTL={isRTL} />
    </div>
  );
};

export default HologramExperience;
