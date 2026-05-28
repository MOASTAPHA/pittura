import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, ArrowRight, ArrowLeft, Play, Crown } from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import SkyboxModal from '@/components/SkyboxModal';
import { useLanguage } from '@/contexts/LanguageContext';
import { curatedLocations } from '@/data/tourLocations';

const Index = () => {
  const { isRTL } = useLanguage();
  const Arrow = isRTL ? ArrowLeft : ArrowRight;
  
  const [activeBgIndex, setActiveBgIndex] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<typeof curatedLocations[0] | null>(null);

  // Background rotation
  useEffect(() => {
    if (modalOpen) return;
    const interval = setInterval(() => {
      setActiveBgIndex((prev) => (prev + 1) % curatedLocations.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [modalOpen]);

  const openSkybox = (location: typeof curatedLocations[0]) => {
    setSelectedLocation(location);
    setModalOpen(true);
  };

  const featuredLocations = curatedLocations.filter(loc => loc.featured).slice(0, 3);

  return (
    <div className="bg-[#F5F0E8] min-h-screen" dir={isRTL ? 'rtl' : 'ltr'}>
      <Navigation />

      {/* HERO SECTION */}
      <section className="relative h-screen min-h-[600px] w-full overflow-hidden flex flex-col justify-center -mt-[80px] pt-[80px]">
        {curatedLocations.map((loc, idx) => (
          <div
            key={loc.id}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              idx === activeBgIndex ? 'opacity-100 z-0' : 'opacity-0 -z-10'
            }`}
          >
            <img
              src={loc.thumbnailUrl}
              alt={isRTL ? loc.title.ar : loc.title.en}
              className="w-full h-full object-cover scale-105"
            />
            {/* Cinematic Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent opacity-80" />
            
            {/* Location Label (bottom corner) */}
            <div className={`absolute bottom-8 ${isRTL ? 'left-8 text-left' : 'right-8 text-right'} text-white/60 text-sm tracking-widest uppercase`}>
              <span className="block mb-1 text-[#E8C97A]">{isRTL ? loc.region.ar : loc.region.en}</span>
              {isRTL ? loc.title.ar : loc.title.en}
            </div>
          </div>
        ))}

        <div className="relative z-10 px-6 max-w-7xl mx-auto w-full">
          <div className="max-w-3xl">
            <span className="text-[#E8C97A] text-xs md:text-sm tracking-[0.4em] uppercase mb-4 block font-bold">
              {isRTL ? 'متحف التراث السعودي الرقمي' : 'The Saudi Digital Heritage Museum'}
            </span>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white leading-tight drop-shadow-2xl mb-6 font-playfair">
              {isRTL ? 'تراث يُروى.' : 'Heritage, told.'}
            </h1>
            <p className="max-w-xl text-white/80 text-lg md:text-xl leading-relaxed mb-10 font-light">
              {isRTL
                ? 'استكشف أعظم المواقع التاريخية والطبيعية في المملكة العربية السعودية من خلال تجارب بانورامية 360° غامرة.'
                : 'Explore the greatest historical and natural sites of Saudi Arabia through immersive 360° panoramic experiences.'}
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <Link
                to="/explore"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-[#B8945F] to-[#E8C97A] text-[#2D2118] font-bold px-8 py-4 rounded-full shadow-2xl shadow-[#B8945F]/30 hover:scale-[1.02] transition-transform"
              >
                <MapPin className="w-5 h-5" />
                {isRTL ? 'استكشف الخريطة' : 'Explore Map'}
                <Arrow className="w-4 h-4" />
              </Link>
              <button
                onClick={() => openSkybox(curatedLocations[activeBgIndex])}
                className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-white font-semibold px-8 py-4 rounded-full transition-all"
              >
                <Play className="w-4 h-4 fill-current" />
                {isRTL ? 'شاهد الموقع الحالي' : 'View Current Site'}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* INTRO TEXT SECTION */}
      <section className="py-24 px-6 bg-[#FBF7EF] border-y border-[#E8E3D9]">
        <div className="max-w-4xl mx-auto text-center">
          <span className="text-[#B8945F] text-xs tracking-[0.3em] uppercase font-bold mb-4 block">
            {isRTL ? 'مهمتنا' : 'Our Mission'}
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-[#3D2E1A] leading-tight mb-8 font-playfair">
            {isRTL
              ? 'نحفظ الذاكرة. ونجعل التراث في متناول العالم.'
              : 'Preserving memory. Making heritage accessible to the world.'}
          </h2>
          <p className="text-[#5C4A2E] text-lg leading-relaxed max-w-2xl mx-auto">
            {isRTL
              ? 'بيتورا منصة رقمية متميزة تقدم تجارب افتراضية للمواقع التراثية السعودية التي لا تُنسى. ندمج التكنولوجيا مع الثقافة لتقديم رحلة بصرية غنية لا مثيل لها.'
              : 'Pittura is a premium digital platform offering virtual experiences of unforgettable Saudi heritage sites. We merge technology with culture to deliver an unparalleled rich visual journey.'}
          </p>
        </div>
      </section>

      {/* FEATURED SITES (Curated) */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <span className="text-[#B8945F] text-xs tracking-[0.3em] uppercase font-bold block mb-3">
              {isRTL ? 'تجارب مختارة' : 'Curated Experiences'}
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-[#3D2E1A] font-playfair">
              {isRTL ? 'وجهات لا تُفوّت' : 'Destinations not to miss'}
            </h2>
          </div>
          <Link
            to="/explore"
            className="inline-flex items-center gap-2 text-[#3D2E1A] font-bold hover:text-[#B8945F] transition-colors border-b-2 border-transparent hover:border-[#B8945F] pb-1"
          >
            {isRTL ? 'جميع الوجهات (10)' : 'All Destinations (10)'}
            <Arrow className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredLocations.map((site) => (
            <div
              key={site.id}
              className="group relative h-[400px] rounded-3xl overflow-hidden cursor-pointer shadow-lg"
              onClick={() => openSkybox(site)}
            >
              <img
                src={site.thumbnailUrl}
                alt={isRTL ? site.title.ar : site.title.en}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#2D2118] via-[#2D2118]/40 to-transparent opacity-90 group-hover:opacity-80 transition-opacity" />
              
              <div className="absolute top-6 left-6 right-6 flex justify-between items-start">
                <span className="bg-black/50 backdrop-blur-md text-white text-xs font-bold px-3 py-1.5 rounded-full border border-white/20">
                  360°
                </span>
                <span className="bg-[#B8945F]/90 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
                  {isRTL ? site.region.ar : site.region.en}
                </span>
              </div>

              <div className="absolute bottom-6 left-6 right-6 text-white transform group-hover:-translate-y-2 transition-transform">
                <h3 className="text-2xl font-bold mb-2 font-playfair">{isRTL ? site.title.ar : site.title.en}</h3>
                <p className="text-white/70 text-sm line-clamp-2 mb-4 hidden group-hover:block transition-all">
                  {isRTL ? site.description.ar : site.description.en}
                </p>
                <div className="inline-flex items-center gap-2 text-[#E8C97A] font-semibold text-sm">
                  <Play className="w-4 h-4 fill-current" />
                  {isRTL ? 'بدء التجربة' : 'Start Experience'}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* MEMBERSHIP CTA */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto bg-gradient-to-br from-[#3D2E1A] to-[#2D2118] rounded-[3rem] p-10 md:p-16 relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#B8945F] rounded-full blur-[100px] opacity-30" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#E8C97A] rounded-full blur-[100px] opacity-20" />
          
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-10">
            <div className="md:w-2/3">
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 px-4 py-1.5 rounded-full text-[#E8C97A] text-sm font-bold mb-6">
                <Crown className="w-4 h-4" />
                {isRTL ? 'عضوية بيتورا' : 'Pittura Membership'}
              </div>
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 font-playfair leading-tight">
                {isRTL ? 'افتح المزيد من التجارب المذهلة' : 'Unlock More Breathtaking Experiences'}
              </h2>
              <p className="text-white/70 text-lg mb-8 max-w-xl">
                {isRTL 
                  ? 'انضم إلينا للحصول على وصول غير محدود إلى جميع تجارب 360° بجودة عالية، مع إضافة مواقع جديدة شهرياً.' 
                  : 'Join us for unlimited access to all HD 360° experiences, with new curated locations added monthly.'}
              </p>
              <Link
                to="/membership"
                className="inline-flex items-center gap-2 bg-[#E8C97A] hover:bg-white text-[#2D2118] font-bold px-8 py-4 rounded-full shadow-lg transition-colors"
              >
                {isRTL ? 'اكتشف الخطط' : 'View Plans'}
                <Arrow className="w-4 h-4" />
              </Link>
            </div>
            
            <div className="md:w-1/3 flex justify-center">
              <div className="w-40 h-40 md:w-56 md:h-56 relative animate-float">
                <div className="absolute inset-0 border-2 border-[#E8C97A]/30 rounded-full animate-[spin_10s_linear_infinite]" />
                <div className="absolute inset-4 border border-[#B8945F]/50 rounded-full animate-[spin_15s_linear_infinite_reverse]" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-24 h-24 bg-gradient-to-br from-[#B8945F] to-[#E8C97A] rounded-full flex items-center justify-center shadow-2xl shadow-[#B8945F]/50">
                    <span className="text-[#2D2118] font-playfair font-bold text-3xl">P</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />

      {/* Skybox Modal for quick viewing from home page */}
      {selectedLocation && (
        <SkyboxModal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          skyboxUrl={selectedLocation.skyboxUrl}
          locationTitle={isRTL ? selectedLocation.title.ar : selectedLocation.title.en}
        />
      )}
    </div>
  );
};

export default Index;
