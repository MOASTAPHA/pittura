import { useState } from 'react';
import Navigation from '@/components/Navigation';
import HeritageMap from '@/components/HeritageMap';
import { useLanguage } from '@/contexts/LanguageContext';
import { MapPin, X, ArrowLeft, ArrowRight } from 'lucide-react';

interface HeritageSite {
  id: number;
  name: string;
  region: string;
  description: string;
  image: string;
  coords: [number, number];
}

const Explore = () => {
  const { isRTL } = useLanguage();
  const [selectedSite, setSelectedSite] = useState<HeritageSite | null>(null);

  const heritageSites: HeritageSite[] = [
    {
      id: 1,
      name: isRTL ? 'مدائن صالح (العلا)' : 'Hegra (AlUla)',
      region: isRTL ? 'منطقة المدينة المنورة' : 'Madinah Region',
      description: isRTL
        ? 'أول موقع سعودي يدرج في قائمة اليونسكو للتراث العالمي، يضم مقابر نَبَطية منحوتة في الصخور تعود لآلاف السنين.'
        : "Saudi Arabia's first UNESCO World Heritage Site, featuring monumental Nabatean tombs carved into rock for millennia.",
      image: 'https://images.unsplash.com/photo-1533408648768-c09bb62b670c?auto=format&fit=crop&q=80&w=1400',
      coords: [26.7917, 37.9533],
    },
    {
      id: 2,
      name: isRTL ? 'حي الطريف (الدرعية)' : 'At-Turaif (Diriyah)',
      region: isRTL ? 'منطقة الرياض' : 'Riyadh Region',
      description: isRTL
        ? 'مهد الدولة السعودية الأولى، يتميز بالعمارة النجدية الأصيلة ومبني من الطوب الطيني.'
        : 'Birthplace of the first Saudi state, distinguished by authentic Najdi mud-brick architecture.',
      image: 'https://images.unsplash.com/photo-1549144674-042496a1c191?auto=format&fit=crop&q=80&w=1400',
      coords: [24.734, 46.575],
    },
    {
      id: 3,
      name: isRTL ? 'جدة التاريخية (البلد)' : 'Historic Jeddah (Al-Balad)',
      region: isRTL ? 'منطقة مكة المكرمة' : 'Makkah Region',
      description: isRTL
        ? 'بوابة مكة المكرمة، تشتهر بمبانيها المتعددة الطوابق والرواشين الخشبية الجميلة.'
        : 'Gateway to Makkah, celebrated for its multi-story coral houses and ornate wooden rawasheen.',
      image: 'https://images.unsplash.com/photo-1603651780584-6c3284e5d819?auto=format&fit=crop&q=80&w=1400',
      coords: [21.4858, 39.1925],
    },
  ];

  const sideEdge = isRTL ? 'right-0' : 'left-0';
  const sideBorder = isRTL ? 'border-l' : 'border-r';
  const panelEdge = isRTL ? 'md:right-[400px]' : 'md:left-[400px]';
  const panelBorder = isRTL ? 'border-l' : 'border-r';
  const CloseArrow = isRTL ? ArrowRight : ArrowLeft;

  return (
    <div className="bg-[#f4f1ea]" dir={isRTL ? 'rtl' : 'ltr'}>
      <Navigation />

      <main className="relative w-full h-[calc(100vh-80px)] overflow-hidden font-sans">
        {/* Real interactive map */}
        <div className="absolute inset-0 z-0">
          <HeritageMap
            sites={heritageSites.map((s) => ({
              id: s.id,
              name: s.name,
              region: s.region,
              coords: s.coords,
            }))}
            selectedId={selectedSite?.id ?? null}
            onSelect={(id) => {
              const s = heritageSites.find((x) => x.id === id);
              if (s) setSelectedSite(s);
            }}
            isRTL={isRTL}
          />
        </div>

        {/* Glassmorphism sidebar */}
        <aside
          className={`absolute top-0 ${sideEdge} h-full w-full md:w-[400px] bg-white/70 backdrop-blur-xl ${sideBorder} border-white/50 shadow-2xl z-10 flex flex-col`}
        >
          <header className="p-8 border-b border-[#d4cfc5]/60 bg-gradient-to-b from-white/80 to-transparent">
            <h1 className="text-4xl font-extrabold text-[#1a4a38] mb-2 tracking-tight">
              {isRTL ? 'بيتورا' : 'Pittura'}
            </h1>
            <p className="text-md text-[#5c5446] font-medium">
              {isRTL ? 'المتحف الرقمي للتراث السعودي' : 'The Digital Museum of Saudi Heritage'}
            </p>
          </header>

          <div className="flex-1 overflow-y-auto p-6 space-y-5">
            {heritageSites.map((site) => (
              <article
                key={site.id}
                onClick={() => setSelectedSite(site)}
                className={`bg-white/80 rounded-2xl p-5 shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer border group ${
                  selectedSite?.id === site.id
                    ? 'border-[#1a4a38]/60 ring-2 ring-[#cda434]/40'
                    : 'border-transparent hover:border-[#1a4a38]/30'
                }`}
              >
                <div className="flex justify-between items-start mb-3 gap-3">
                  <h3 className="font-bold text-[#2d2a26] text-xl group-hover:text-[#1a4a38] transition-colors">
                    {site.name}
                  </h3>
                  <MapPin className="w-6 h-6 text-[#cda434] group-hover:scale-110 transition-transform shrink-0" />
                </div>
                <p className="text-sm font-semibold text-[#cda434] mb-2">{site.region}</p>
                <p className="text-sm text-[#5c5446] leading-relaxed line-clamp-2">{site.description}</p>
              </article>
            ))}
          </div>
        </aside>

        {/* Slide-over details panel */}
        {selectedSite && (
          <div
            className={`absolute top-0 ${sideEdge} ${panelEdge} w-full md:w-[450px] h-full bg-white shadow-2xl z-20 flex flex-col ${panelBorder} border-gray-100 animate-in slide-in-from-${isRTL ? 'right' : 'left'} duration-500`}
          >
            <div className="relative h-72">
              <img
                src={selectedSite.image}
                alt={selectedSite.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <button
                onClick={() => setSelectedSite(null)}
                className={`absolute top-6 ${isRTL ? 'left-6' : 'right-6'} bg-white/20 backdrop-blur-md p-2 rounded-full hover:bg-white/40 transition-colors text-white`}
                aria-label="Close"
              >
                <X className="w-6 h-6" />
              </button>
              <h2
                className={`absolute bottom-6 ${isRTL ? 'right-8' : 'left-8'} text-3xl font-bold text-white drop-shadow`}
              >
                {selectedSite.name}
              </h2>
            </div>

            <div className="p-8 flex-1 flex flex-col bg-[#fbfaf8]">
              <div className="inline-block bg-[#f4f1ea] text-[#8c7b65] px-4 py-1 rounded-full text-sm font-semibold mb-6 w-fit">
                {selectedSite.region}
              </div>

              <p className="text-[#4a4336] text-lg leading-relaxed mb-8">
                {selectedSite.description}
              </p>

              <div className="mt-auto space-y-4">
                <button className="w-full bg-[#1a4a38] text-white py-4 rounded-xl font-bold text-lg hover:bg-[#123628] transition-colors flex items-center justify-center gap-3 shadow-lg shadow-[#1a4a38]/30">
                  <span>{isRTL ? 'ابدأ جولة 360°' : 'Start 360° Tour'}</span>
                  <CloseArrow className="w-5 h-5" />
                </button>
                <button className="w-full border-2 border-[#d4cfc5] text-[#5c5446] py-4 rounded-xl font-bold text-lg hover:bg-[#f4f1ea] transition-colors">
                  {isRTL ? 'عرض المزيد من الصور' : 'View more photos'}
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Explore;
