import { Link } from 'react-router-dom';
import { MapPin, Compass, BookOpen, ArrowRight, ArrowLeft, Play } from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { useLanguage } from '@/contexts/LanguageContext';

const HERO_IMG =
  'https://images.unsplash.com/photo-1578895101408-1a36b834405b?auto=format&fit=crop&q=80&w=2000';

const Index = () => {
  const { isRTL } = useLanguage();
  const Arrow = isRTL ? ArrowLeft : ArrowRight;

  const features = [
    {
      icon: MapPin,
      title: isRTL ? 'خريطة تفاعلية' : 'Interactive Map',
      desc: isRTL
        ? 'استكشف المواقع التراثية للمملكة على خريطة حية مع تفاصيل غنية لكل موقع.'
        : 'Discover Saudi heritage sites on a living map with rich, curated detail for each location.',
      to: '/explore',
    },
    {
      icon: Compass,
      title: isRTL ? 'جولات افتراضية 360°' : '360° Virtual Tours',
      desc: isRTL
        ? 'تجوّل داخل المتاحف والمواقع التاريخية بتجربة غامرة عالية الدقة.'
        : 'Step inside museums and historic sites with immersive, high-fidelity 360° experiences.',
      to: '/virtual-museum',
    },
    {
      icon: BookOpen,
      title: isRTL ? 'معلومات موثوقة' : 'Reliable Information',
      desc: isRTL
        ? 'محتوى ثقافي مُحقق من مصادر متخصصة في التراث السعودي.'
        : 'Cultural content verified by specialists in Saudi heritage and history.',
      to: '/heritage-experience',
    },
  ];

  const sites = [
    {
      name: isRTL ? 'مدائن صالح' : 'Hegra',
      region: isRTL ? 'العُلا' : 'AlUla',
      img: 'https://images.unsplash.com/photo-1533408648768-c09bb62b670c?auto=format&fit=crop&q=80&w=1200',
    },
    {
      name: isRTL ? 'حي الطُريف' : 'At-Turaif',
      region: isRTL ? 'الدرعية' : 'Diriyah',
      img: 'https://images.unsplash.com/photo-1549144674-042496a1c191?auto=format&fit=crop&q=80&w=1200',
    },
    {
      name: isRTL ? 'جدة التاريخية' : 'Historic Jeddah',
      region: isRTL ? 'البلد' : 'Al-Balad',
      img: 'https://images.unsplash.com/photo-1603651780584-6c3284e5d819?auto=format&fit=crop&q=80&w=1200',
    },
  ];

  return (
    <div className="bg-[#F5F0E8]">
      <Navigation />

      {/* HERO */}
      <section className="relative h-[88vh] min-h-[600px] w-full overflow-hidden">
        <img
          src={HERO_IMG}
          alt={isRTL ? 'تراث المملكة العربية السعودية' : 'Saudi Arabian heritage landscape'}
          className="absolute inset-0 w-full h-full object-cover scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#3D2E1A]/40 via-[#3D2E1A]/50 to-[#3D2E1A]/90" />

        <div className="relative h-full flex flex-col items-center justify-center text-center px-6 max-w-5xl mx-auto">
          <span className="text-[#E8C97A] text-xs tracking-[0.4em] uppercase mb-6 font-medium">
            {isRTL ? 'متحف المملكة الرقمي' : 'The Digital Art Museum'}
          </span>
          <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight drop-shadow-lg">
            {isRTL ? 'تراث المملكة، يُروى رقميًا.' : 'Saudi heritage, told digitally.'}
          </h1>
          <p className="mt-6 max-w-2xl text-white/85 text-lg leading-relaxed">
            {isRTL
              ? 'بيتورا يفتح لك أبواب المواقع التاريخية والمتاحف السعودية عبر تجارب تفاعلية غامرة من أي مكان في العالم.'
              : 'Pittura opens the doors to Saudi historic sites and museums through immersive, interactive experiences — from anywhere in the world.'}
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/explore"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-[#B8945F] to-[#8B6F3F] hover:from-[#C9A570] hover:to-[#9C7F4F] text-white font-bold px-8 py-4 rounded-full shadow-xl shadow-[#B8945F]/30 transition-all hover:scale-[1.02]"
            >
              <MapPin className="w-5 h-5" />
              {isRTL ? 'استكشف الخريطة' : 'Explore the Map'}
              <Arrow className="w-4 h-4" />
            </Link>
            <Link
              to="/virtual-museum"
              className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/30 text-white font-semibold px-8 py-4 rounded-full transition"
            >
              <Play className="w-4 h-4 fill-current" />
              {isRTL ? 'شاهد جولة' : 'Watch a Tour'}
            </Link>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section className="py-24 px-6 max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-start">
          <div>
            <span className="text-[#B8945F] text-xs tracking-[0.3em] uppercase font-semibold">
              {isRTL ? 'عن المشروع' : 'About the Project'}
            </span>
            <h2 className="mt-4 text-4xl md:text-5xl font-bold text-[#3D2E1A] leading-tight">
              {isRTL ? 'نحفظ الذاكرة. نُتيحها للعالم.' : 'Preserving memory. Sharing it with the world.'}
            </h2>
            <div className="mt-6 h-1 w-16 bg-gradient-to-r from-[#B8945F] to-[#E8C97A] rounded-full" />
          </div>
          <div className="space-y-5 text-[#5C4A2E] text-lg leading-loose">
            <p>
              {isRTL
                ? 'بيتورا منصة رقمية تُكرّس لتوثيق ورقمنة المواقع التراثية في المملكة العربية السعودية، من مدائن صالح إلى حي الطُريف وجدة التاريخية.'
                : 'Pittura is a digital platform dedicated to documenting and digitizing Saudi Arabia\'s heritage sites — from Hegra to At-Turaif and Historic Jeddah.'}
            </p>
            <p>
              {isRTL
                ? 'مهمتنا أن نجعل التراث في متناول الجميع: للباحث، للزائر، وللأجيال القادمة، عبر خرائط حية وجولات افتراضية ومحتوى موثّق.'
                : 'Our mission is to make heritage accessible to all — researchers, visitors, and future generations — through living maps, virtual tours, and verified content.'}
            </p>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="py-20 px-6 bg-[#FBF7EF] border-y border-[#E8E3D9]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-[#B8945F] text-xs tracking-[0.3em] uppercase font-semibold">
              {isRTL ? 'المميزات الأساسية' : 'Core Features'}
            </span>
            <h2 className="mt-4 text-4xl font-bold text-[#3D2E1A]">
              {isRTL ? 'تجربة متكاملة للتراث' : 'A complete heritage experience'}
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {features.map((f) => (
              <Link
                key={f.title}
                to={f.to}
                className="group bg-white rounded-3xl p-8 border border-[#E8E3D9] hover:border-[#B8945F] hover:shadow-xl transition-all"
              >
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#B8945F] to-[#8B6F3F] flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform">
                  <f.icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-[#3D2E1A] mb-3">{f.title}</h3>
                <p className="text-[#5C4A2E] leading-relaxed text-sm">{f.desc}</p>
                <div className="mt-6 inline-flex items-center gap-1 text-[#B8945F] text-sm font-semibold">
                  {isRTL ? 'اكتشف' : 'Discover'}
                  <Arrow className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED SITES */}
      <section className="py-24 px-6 max-w-6xl mx-auto">
        <div className="flex items-end justify-between mb-12 flex-wrap gap-4">
          <div>
            <span className="text-[#B8945F] text-xs tracking-[0.3em] uppercase font-semibold">
              {isRTL ? 'مواقع مميزة' : 'Featured Sites'}
            </span>
            <h2 className="mt-3 text-4xl font-bold text-[#3D2E1A]">
              {isRTL ? 'وجهات لا تُفوّت' : 'Destinations not to miss'}
            </h2>
          </div>
          <Link to="/explore" className="inline-flex items-center gap-2 text-[#3D2E1A] font-semibold hover:text-[#B8945F] transition">
            {isRTL ? 'كل المواقع' : 'View all'}
            <Arrow className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {sites.map((s) => (
            <Link to="/explore" key={s.name} className="group relative h-80 rounded-3xl overflow-hidden">
              <img src={s.img} alt={s.name} className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#3D2E1A]/95 via-[#3D2E1A]/30 to-transparent" />
              <div className={`absolute bottom-6 ${isRTL ? 'right-6' : 'left-6'} text-white`}>
                <span className="text-xs text-[#E8C97A] tracking-wider uppercase">{s.region}</span>
                <h3 className="text-2xl font-bold mt-1">{s.name}</h3>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-24 px-6 bg-[#3D2E1A] overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_30%_50%,#E8C97A_0%,transparent_60%)]" />
        <div className="relative max-w-3xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white">
            {isRTL ? 'ابدأ رحلتك في التراث' : 'Begin your heritage journey'}
          </h2>
          <p className="mt-5 text-white/75 text-lg">
            {isRTL
              ? 'انطلق الآن واكتشف كنوز المملكة من خلال خريطتنا التفاعلية.'
              : 'Step in now and discover the Kingdom\'s treasures through our interactive map.'}
          </p>
          <Link
            to="/explore"
            className="mt-10 inline-flex items-center gap-2 bg-gradient-to-r from-[#B8945F] to-[#E8C97A] text-[#3D2E1A] font-bold px-10 py-4 rounded-full shadow-2xl shadow-[#B8945F]/40 hover:scale-[1.03] transition"
          >
            <MapPin className="w-5 h-5" />
            {isRTL ? 'استكشف الخريطة' : 'Explore the Map'}
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
