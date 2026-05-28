import { useState, useMemo } from 'react';
import Navigation from '@/components/Navigation';
import HeritageMap from '@/components/HeritageMap';
import SkyboxModal from '@/components/SkyboxModal';
import { useLanguage } from '@/contexts/LanguageContext';
import { MapPin, X, ArrowLeft, ArrowRight, Play, Info } from 'lucide-react';
import { curatedLocations } from '@/data/tourLocations';

const Explore = () => {
  const { isRTL } = useLanguage();
  const [selectedLocationId, setSelectedLocationId] = useState<string | null>(null);
  const [skyboxOpen, setSkyboxOpen] = useState(false);
  
  const selectedLocation = useMemo(
    () => curatedLocations.find(loc => loc.id === selectedLocationId) || null,
    [selectedLocationId]
  );

  const sideEdge = isRTL ? 'right-0' : 'left-0';
  const sideBorder = isRTL ? 'border-l' : 'border-r';
  const panelEdge = isRTL ? 'md:right-[400px]' : 'md:left-[400px]';
  const panelBorder = isRTL ? 'border-l' : 'border-r';
  const CloseArrow = isRTL ? ArrowRight : ArrowLeft;

  const handleOpenSkybox = () => {
    if (selectedLocation) {
      setSkyboxOpen(true);
    }
  };

  return (
    <div className="bg-[#f4f1ea] min-h-screen flex flex-col" dir={isRTL ? 'rtl' : 'ltr'}>
      <Navigation />

      <main className="relative flex-1 w-full overflow-hidden font-sans">
        {/* Real interactive map */}
        <div className="absolute inset-0 z-0">
          <HeritageMap
            sites={curatedLocations.map(loc => ({
              id: loc.id as any, // Using string IDs now, map might expect numbers, I'll update map later if needed. Actually I'll use any for now and fix map later if required. Wait, let me pass strings.
              name: isRTL ? loc.title.ar : loc.title.en,
              region: isRTL ? loc.region.ar : loc.region.en,
              coords: loc.coords,
            })) as any}
            selectedId={selectedLocationId as any}
            onSelect={(id) => setSelectedLocationId(id as string)}
            isRTL={isRTL}
          />
        </div>

        {/* Glassmorphism sidebar - Locations List */}
        <aside
          className={`absolute top-0 ${sideEdge} h-full w-full md:w-[400px] bg-white/80 backdrop-blur-xl ${sideBorder} border-white/50 shadow-2xl z-10 flex flex-col`}
        >
          <header className="p-8 border-b border-[#d4cfc5]/60 bg-gradient-to-b from-white to-transparent">
            <h1 className="text-3xl font-extrabold text-[#3D2E1A] mb-2 tracking-tight font-playfair">
              {isRTL ? 'استكشف' : 'Explore'}
            </h1>
            <p className="text-sm text-[#5c5446] font-medium">
              {isRTL 
                ? 'اكتشف 10 وجهات تراثية مختارة بعناية في تجارب غامرة.' 
                : 'Discover 10 carefully curated heritage destinations in immersive 360°.'}
            </p>
          </header>

          <div className="flex-1 overflow-y-auto p-6 space-y-4 custom-scrollbar pb-24">
            {curatedLocations.map((site) => (
              <article
                key={site.id}
                onClick={() => setSelectedLocationId(site.id)}
                className={`bg-white rounded-2xl p-4 shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer border group ${
                  selectedLocationId === site.id
                    ? 'border-[#B8945F] ring-1 ring-[#B8945F]/40 shadow-md'
                    : 'border-[#E8E3D9] hover:border-[#B8945F]/50'
                }`}
              >
                <div className="flex gap-4 items-center">
                  <div className="w-20 h-20 rounded-xl overflow-hidden shrink-0 relative">
                    <img 
                      src={site.thumbnailUrl} 
                      alt={isRTL ? site.title.ar : site.title.en} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    {site.featured && (
                      <div className="absolute top-0 left-0 bg-[#E8C97A] text-[10px] font-bold px-1.5 py-0.5 rounded-br-lg text-[#3D2E1A]">
                        ★
                      </div>
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-1">
                      <h3 className="font-bold text-[#3D2E1A] text-sm group-hover:text-[#B8945F] transition-colors leading-tight">
                        {isRTL ? site.title.ar : site.title.en}
                      </h3>
                    </div>
                    <p className="text-xs font-semibold text-[#B8945F] mb-1.5">
                      {isRTL ? site.region.ar : site.region.en}
                    </p>
                    <div className="flex items-center gap-1 text-[#8B8B8B] text-[10px]">
                      <Info className="w-3 h-3" />
                      <span className="truncate max-w-[150px]">
                        {isRTL ? site.description.ar : site.description.en}
                      </span>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </aside>

        {/* Slide-over details panel */}
        {selectedLocation && (
          <div
            className={`absolute top-0 ${sideEdge} ${panelEdge} w-full md:w-[450px] h-full bg-white shadow-2xl z-20 flex flex-col ${panelBorder} border-[#E8E3D9] animate-in slide-in-from-${isRTL ? 'right' : 'left'} duration-500`}
          >
            <div className="relative h-[40%] min-h-[300px]">
              <img
                src={selectedLocation.thumbnailUrl}
                alt={isRTL ? selectedLocation.title.ar : selectedLocation.title.en}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              
              <button
                onClick={() => setSelectedLocationId(null)}
                className={`absolute top-6 ${isRTL ? 'left-6' : 'right-6'} bg-black/20 backdrop-blur-md border border-white/20 p-2 rounded-full hover:bg-black/40 transition-colors text-white z-10`}
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
              
              <div className={`absolute bottom-6 ${isRTL ? 'right-8' : 'left-8'} text-white`}>
                <div className="bg-[#B8945F]/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold inline-block mb-3 border border-[#E8C97A]/30">
                  {isRTL ? selectedLocation.region.ar : selectedLocation.region.en}
                </div>
                <h2 className="text-3xl md:text-4xl font-bold font-playfair drop-shadow-lg leading-tight">
                  {isRTL ? selectedLocation.title.ar : selectedLocation.title.en}
                </h2>
              </div>
            </div>

            <div className="p-8 flex-1 flex flex-col bg-[#FBF7EF] overflow-y-auto">
              <div className="flex items-center gap-2 mb-6">
                <MapPin className="w-5 h-5 text-[#B8945F]" />
                <span className="text-[#5C4A2E] font-medium text-sm">
                  {selectedLocation.coords[0].toFixed(4)}, {selectedLocation.coords[1].toFixed(4)}
                </span>
              </div>

              <div className="prose prose-sm prose-amber">
                <p className="text-[#3D2E1A] text-base leading-relaxed mb-8">
                  {isRTL ? selectedLocation.description.ar : selectedLocation.description.en}
                </p>
              </div>

              <div className="mt-auto pt-6 space-y-4">
                <button 
                  onClick={handleOpenSkybox}
                  className="w-full bg-gradient-to-r from-[#B8945F] to-[#E8C97A] text-[#2D2118] py-4 rounded-xl font-bold text-lg hover:shadow-lg hover:shadow-[#B8945F]/30 hover:scale-[1.02] transition-all flex items-center justify-center gap-3"
                >
                  <Play className="w-5 h-5 fill-current" />
                  <span>{isRTL ? 'ابدأ تجربة 360° المذهلة' : 'Start Immersive 360° Tour'}</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Skybox Modal */}
      {selectedLocation && (
        <SkyboxModal
          isOpen={skyboxOpen}
          onClose={() => setSkyboxOpen(false)}
          skyboxUrl={selectedLocation.skyboxUrl}
          locationTitle={isRTL ? selectedLocation.title.ar : selectedLocation.title.en}
        />
      )}
      
      {/* Custom scrollbar styles for this page */}
      <style dangerouslySetInnerHTML={{__html: `
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background-color: #E8E3D9;
          border-radius: 20px;
        }
      `}} />
    </div>
  );
};

export default Explore;
