import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const HoloAccent = () => (
  <svg className="absolute top-6 left-6 w-24 h-24 z-10 opacity-70 mix-blend-screen pointer-events-none"
    viewBox="0 0 100 100" fill="none">
    <ellipse cx="50" cy="50" rx="48" ry="22" fill="url(#linear-holo)" filter="url(#blur1)" />
    <defs>
      <linearGradient id="linear-holo" x1="0" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse">
        <stop stopColor="#0FA0CE" />
        <stop offset="1" stopColor="#B8E1F0" />
      </linearGradient>
      <filter id="blur1" x="-10" y="-10" width="120" height="120" filterUnits="userSpaceOnUse">
        <feGaussianBlur stdDeviation="6" />
      </filter>
    </defs>
  </svg>
);

interface ShebaraSectionProps {
  isRTL: boolean;
}

const SHEBARA_IMAGES = [
  {
    src: "https://images.unsplash.com/photo-1535916707207-35f97e715e1c?q=80&w=3174&auto=format&fit=crop",
    alt: "Shebara Overwater Villas",
    aspect: "aspect-[16/10]",
  },
  {
    src: "https://images.unsplash.com/photo-1540541338287-41700207dee6?q=80&w=3270&auto=format&fit=crop",
    alt: "Shebara Aerial View",
    aspect: "aspect-[16/9]",
  },
  {
    src: "https://images.unsplash.com/photo-1528127269322-539801943592?q=80&w=2940&auto=format&fit=crop",
    alt: "Heritage Architecture",
    aspect: "aspect-[16/9]",
  }
];

const ShebaraSection = ({ isRTL }: ShebaraSectionProps) => {
  return (
    <section className="relative py-28 overflow-hidden bg-gradient-to-br from-[#f5f8fa] via-white to-[#edf6fc] select-none">
      <HoloAccent />
      <motion.div 
        initial={{ y: -20 }}
        animate={{ y: 0 }}
        transition={{ duration: 20, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
        className="absolute top-0 right-0 lg:w-1/2 w-full h-96 bg-[url('https://images.unsplash.com/photo-1615529328331-f8917597711f?q=80&w=2670&auto=format&fit=crop')] bg-cover bg-no-repeat opacity-10 pointer-events-none z-0"
      />
          
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col-reverse lg:flex-row items-center gap-16">
          <motion.div
            className="lg:w-3/5 w-full flex flex-col gap-6"
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 relative">
              <motion.div 
                className="relative group overflow-hidden rounded-3xl shadow-xl hover:shadow-2xl"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.5 }}
              >
                <img
                  src={SHEBARA_IMAGES[1].src}
                  alt={SHEBARA_IMAGES[1].alt}
                  className={`object-cover w-full h-64 lg:h-96 ${SHEBARA_IMAGES[1].aspect} transition-transform duration-700 group-hover:scale-105`}
                  style={{ filter: "brightness(0.96) saturate(1.15)" }}
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
                <span className="absolute bottom-6 left-6 text-white/90 drop-shadow text-2xl font-playfair tracking-wide">
                  {isRTL ? "إطلالة جوية" : "Aerial View"}
                </span>
                <span className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-300/70 via-blue-200 to-transparent animate-pulse" />
              </motion.div>
              <div className="flex flex-col gap-6">
                <motion.div 
                  className="relative group overflow-hidden rounded-3xl shadow-xl hover:shadow-2xl flex-1 min-h-[140px]"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.5 }}
                >
                  <img
                    src={SHEBARA_IMAGES[0].src}
                    alt={SHEBARA_IMAGES[0].alt}
                    className="object-cover w-full h-40 lg:h-60 transition-transform duration-700 group-hover:scale-105"
                    style={{ filter: "brightness(0.95) saturate(1.2)" }}
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
                  <span className="absolute bottom-5 left-6 text-white/85 text-xl font-playfair tracking-tighter drop-shadow">
                    {isRTL ? "الفيلات المائية" : "Overwater Villas"}
                  </span>
                  <span className="absolute left-0 top-0 w-full h-full bg-white/5 backdrop-blur-[1px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                </motion.div>
                <motion.div 
                  className="relative group overflow-hidden rounded-3xl shadow-xl hover:shadow-2xl flex-1 min-h-[140px]"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.5 }}
                >
                  <img
                    src={SHEBARA_IMAGES[2].src}
                    alt={SHEBARA_IMAGES[2].alt}
                    className="object-cover w-full h-40 lg:h-60 transition-transform duration-700 group-hover:scale-102"
                    style={{ filter: "contrast(1.07) brightness(1.03)" }}
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
                  <span className="absolute bottom-5 left-6 text-white/80 text-lg font-playfair drop-shadow">
                    {isRTL ? "المياه الفيروزية" : "Turquoise Waters"}
                  </span>
                  <span className="absolute left-0 top-0 w-full h-[2px] bg-gradient-to-r from-blue-300/70 via-white/60 to-transparent animate-hologram-scan pointer-events-none" />
                </motion.div>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="lg:w-2/5 w-full flex flex-col items-start lg:items-start"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-xs uppercase tracking-[.3em] text-museum-brown/80 mb-5 font-light animate-fade-in">
              {isRTL ? "وجهة حصرية" : "Exclusive Destination"}
            </h2>
            <div className="relative">
              <span className="absolute -top-3 left-2 w-24 h-2 bg-gradient-to-r from-[#0FA0CE]/50 to-[#B8E1F0]/0 rounded-2xl blur"></span>
              <h3 className="text-5xl md:text-6xl font-playfair font-bold mb-7 text-museum-brown drop-shadow-lg leading-tight">
                {isRTL ? "منتجع شبارة" : "Shebara Resort"}
              </h3>
            </div>
            <p className="text-lg leading-relaxed text-neutral-800 mb-10 max-w-lg animate-fade-in">
              {isRTL
                ? "استمتع بالفخامة العصرية والتصميم المستقبلي المستلهم من التراث السعودي. توفر أجنحة المنتجع المطلة على المياه الفيروزية تجربة إقامة لا تُنسى وسط الطبيعة الساحرة والتقنيات الحديثة."
                : "Experience modern luxury with futuristic design inspired by Saudi heritage. Our overwater villas offer an unforgettable stay with panoramic views of turquoise waters, where serene nature meets cutting-edge technology."}
            </p>
            <Link to="/destinations/shebara" className="block">
              <Button variant="outline" className="rounded-full px-10 py-5 border-museum-brown text-museum-brown hover:bg-museum-brown/90 hover:text-white group shadow hover:shadow-lg transition-all font-semibold tracking-wide text-base">
                {isRTL ? "اكتشف المنتجع" : "Discover the Resort"}
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </motion.div>
        </div>

        <motion.div
          className="relative z-20 mt-16 flex flex-col lg:flex-row gap-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.1 }}
          viewport={{ once: true }}
        >
          {[
            {
              icon: (
                <div className="relative flex items-center justify-center w-14 h-14 shadow backdrop-blur-md border border-white/30 bg-white/30 rounded-full overflow-hidden">
                  <img
                    src="/lovable-uploads/6dafc339-95be-44ac-82c8-a6c32f29c305.png"
                    alt="مدائن صالح"
                    className="w-14 h-14 object-cover rounded-full"
                    style={{ border: "2px solid #fff", background: "rgba(255,255,255,0.18)" }}
                  />
                  <span className="absolute inset-0 rounded-full bg-white/20 backdrop-blur-xs pointer-events-none" />
                </div>
              ),
              title: isRTL ? "الهندسة المستقبلية" : "Futuristic Architecture",
              description: isRTL
                ? "هياكل عائمة وتصاميم مستوحاة من البحر والرمال السعودية"
                : "Floating structures and sea-inspired design echo Saudi sands and elegance.",
            },
            {
              icon: (
                <div className="bg-museum-blue/25 rounded-full flex items-center justify-center w-14 h-14 shadow backdrop-blur-md border border-white/30">
                  <span className="block w-7 h-7 rounded-full animate-pulse bg-gradient-to-tr from-blue-200/80 to-museum-sand/30" />
                </div>
              ),
              title: isRTL ? "تقنيات الهولوجرام" : "Holographic Technology",
              description: isRTL
                ? "إضاءات ذكية وتجارب رقمية ثلاثية الأبعاد لكل جناح"
                : "Smart light and 3D digital experiences for every suite.",
            },
            {
              icon: (
                <div className="bg-museum-olive/30 rounded-full flex items-center justify-center w-14 h-14 shadow backdrop-blur-md border border-white/30">
                  <span className="block w-7 h-7 rounded-full animate-float bg-gradient-to-tr from-museum-sand to-blue-100/80" />
                </div>
              ),
              title: isRTL ? "رفاهية غير مسبوقة" : "Unmatched Luxury",
              description: isRTL
                ? "خدمات فاخرة في أجواء هادئة، تجمع بين الحداثة والتراث"
                : "Luxurious services in tranquil surroundings, blending heritage and modernity.",
            }
          ].map((f, i) => (
            <motion.div
              key={i}
              className="glassmorphism-card hover:scale-105 transition-transform duration-300 cursor-pointer bg-white/50 backdrop-blur-lg border-0 shadow-lg p-8 rounded-2xl relative overflow-hidden group"
              whileHover={{ y: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="absolute -top-8 -left-8">
                {f.icon}
              </div>
              <h4 className="text-2xl font-playfair font-semibold text-museum-brown mb-3 mt-8">{f.title}</h4>
              <p className="text-neutral-800">{f.description}</p>
              <div className="absolute bottom-1 right-4 w-12 h-2 bg-gradient-to-r from-blue-300 via-blue-50/80 to-transparent rounded-xl blur-lg opacity-60 pointer-events-none animate-float"></div>
            </motion.div>
          ))}
        </motion.div>
      </div>
      <div className="absolute -bottom-24 -left-16 w-80 h-40 bg-gradient-to-tr from-blue-200/40 via-blue-50 to-transparent rounded-full blur-2xl opacity-50 pointer-events-none z-0 animate-float"></div>
    </section>
  );
};

export default ShebaraSection;
