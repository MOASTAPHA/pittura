
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { HoloAccent } from '@/components/shebara/HoloAccent';
import { ShebaraGallery } from '@/components/shebara/ShebaraGallery';
import { ShebaraFeatures } from '@/components/shebara/ShebaraFeatures';

const SHEBARA_IMAGES = [
  {
    src: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=3270&auto=format&fit=crop",
    alt: "Shebara Overwater Villas",
    aspect: "aspect-[16/10]",
  },
  {
    src: "https://images.unsplash.com/photo-1479293946690-ebcedfc9f4a3?q=80&w=3270&auto=format&fit=crop",
    alt: "Shebara Aerial View",
    aspect: "aspect-[16/9]",
  },
  {
    src: "https://images.unsplash.com/photo-1596394723269-b2cbca4e6463?q=80&w=3270&auto=format&fit=crop",
    alt: "Heritage Architecture",
    aspect: "aspect-[16/9]",
  }
];

interface ShebaraSectionProps {
  isRTL: boolean;
}

const ShebaraSection = ({ isRTL }: ShebaraSectionProps) => {
  const features = [
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
  ];

  return (
    <section className="relative py-28 overflow-hidden bg-gradient-to-br from-[#f5f8fa] via-white to-[#edf6fc] select-none">
      <HoloAccent />
      <motion.div 
        initial={{ y: -20 }}
        animate={{ y: 0 }}
        transition={{ duration: 20, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
        className="absolute top-0 right-0 lg:w-1/2 w-full h-96 bg-[url('https://images.unsplash.com/photo-1598908314732-07113901949e?q=80&w=3270&auto=format&fit=crop')] bg-cover bg-no-repeat opacity-10 pointer-events-none z-0"
      />
          
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col-reverse lg:flex-row items-center gap-16">
          <ShebaraGallery images={SHEBARA_IMAGES} isRTL={isRTL} />

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

        <ShebaraFeatures features={features} />
      </div>
      <div className="absolute -bottom-24 -left-16 w-80 h-40 bg-gradient-to-tr from-blue-200/40 via-blue-50 to-transparent rounded-full blur-2xl opacity-50 pointer-events-none z-0 animate-float"></div>
    </section>
  );
};

export default ShebaraSection;
