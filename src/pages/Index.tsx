import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import { Eye, ArrowRight, ArrowLeft } from 'lucide-react';
import HeritageMap from '@/components/HeritageMap';

interface HeritageSite {
  id: number;
  name: string;
  region: string;
  description: string;
  imageUrl: string;
  coords: [number, number];
}

const Index = () => {
  const [isRTL, setIsRTL] = useState(true);
  const location = useLocation();
  const [selectedSite, setSelectedSite] = useState<HeritageSite | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    setIsRTL(params.get('lang') !== 'en');
  }, [location]);

  const heritageSites: HeritageSite[] = [
    {
      id: 1,
      name: 'مدائن صالح (الحِجر)',
      region: 'العُلا',
      description:
        'أول موقع في السعودية ينضم لقائمة التراث العالمي لليونسكو. يتميز بالواجهات الصخرية النبطية المنحوتة بدقة.',
      imageUrl:
        'https://images.unsplash.com/photo-1533408648768-c09bb62b670c?auto=format&fit=crop&q=80&w=1200',
      coords: [26.7917, 37.9533],
    },
    {
      id: 2,
      name: 'حي الطُريف',
      region: 'الدرعية',
      description:
        'مهد الدولة السعودية الأولى، يتميز بعمارته النجدية الفريدة ومبانيه الطينية العريقة.',
      imageUrl:
        'https://images.unsplash.com/photo-1549144674-042496a1c191?auto=format&fit=crop&q=80&w=1200',
      coords: [24.7340, 46.5750],
    },
    {
      id: 3,
      name: 'جدة التاريخية (البلد)',
      region: 'جدة',
      description:
        'بوابة مكة المكرمة، تشتهر بمبانيها المتعددة الطوابق ورواشينها الخشبية التقليدية.',
      imageUrl:
        'https://images.unsplash.com/photo-1603651780584-6c3284e5d819?auto=format&fit=crop&q=80&w=1200',
      coords: [21.4858, 39.1925],
    },
  ];

  const Arrow = isRTL ? ArrowLeft : ArrowRight;

  return (
    <div className={isRTL ? 'rtl' : ''} dir={isRTL ? 'rtl' : 'ltr'}>
      <Navigation isRTL={isRTL} />

      <main className="relative w-full h-[calc(100vh-80px)] overflow-hidden bg-[#F5F0E8]">
        {/* 1. Interactive map background */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#E8DCC4] via-[#D9C9A8] to-[#C9B894]">
          <div
            className="absolute inset-0 opacity-30"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&q=80&w=2000')",
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-[#5C4A2E]/70 pointer-events-none">
            <MapPin className="w-12 h-12 mb-3" />
            <h2 className="text-2xl font-semibold">خريطة بيتورا التفاعلية</h2>
            <p className="text-sm mt-2 max-w-md px-4">
              ستظهر هنا الخريطة التفاعلية مع نقاط المواقع التراثية في المملكة.
            </p>
          </div>
        </div>

        {/* 2. Glassmorphism sidebar */}
        <aside
          className={`absolute top-6 bottom-6 w-[420px] max-w-[90vw] z-10 ${
            isRTL ? 'right-6' : 'left-6'
          } backdrop-blur-xl bg-white/40 border border-white/60 rounded-3xl shadow-2xl overflow-hidden flex flex-col`}
        >
          <header className="p-6 border-b border-white/40">
            <h1 className="text-3xl font-bold text-[#3D2E1A] tracking-tight">
              استكشف التراث
            </h1>
            <p className="mt-2 text-sm text-[#5C4A2E] leading-relaxed">
              انطلق في رحلة رقمية عبر أهم المعالم التاريخية والمتاحف في المملكة
              العربية السعودية.
            </p>
          </header>

          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {heritageSites.map((site) => (
              <article
                key={site.id}
                onClick={() => setSelectedSite(site)}
                className={`group cursor-pointer bg-white/80 hover:bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 border ${
                  selectedSite?.id === site.id
                    ? 'border-[#B8945F] ring-2 ring-[#B8945F]/40'
                    : 'border-[#E8E3D9]'
                }`}
              >
                <div className="relative h-40 overflow-hidden">
                  <img
                    src={site.imageUrl}
                    alt={site.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span
                    className={`absolute top-3 ${
                      isRTL ? 'right-3' : 'left-3'
                    } bg-[#3D2E1A]/80 text-white text-xs px-3 py-1 rounded-full backdrop-blur-sm`}
                  >
                    {site.region}
                  </span>
                </div>

                <div className="p-4">
                  <h3 className="font-bold text-lg text-[#3D2E1A]">
                    {site.name}
                  </h3>
                  <p className="text-sm text-[#5C4A2E] mt-1 line-clamp-2">
                    {site.description}
                  </p>

                  <div className="mt-3 flex items-center justify-between">
                    <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#B8945F]">
                      <Eye className="w-4 h-4" />
                      جولة 360°
                    </span>
                    <Arrow className="w-4 h-4 text-[#3D2E1A] opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </div>
              </article>
            ))}
          </div>
        </aside>
      </main>
    </div>
  );
};

export default Index;
