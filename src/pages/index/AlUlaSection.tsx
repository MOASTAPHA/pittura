
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

// 3D accent SVG
const GlowRune = () => (
  <svg className="absolute -top-8 right-12 w-32 h-28 z-10 mix-blend-lighten pointer-events-none animate-pulse"
    viewBox="0 0 140 60" fill="none">
    <ellipse cx="70" cy="30" rx="62" ry="17" fill="url(#alula-glow)" />
    <defs>
      <radialGradient id="alula-glow" cx="0" cy="0" r="1" gradientTransform="translate(70 30) scale(54 17)" gradientUnits="userSpaceOnUse">
        <stop stopColor="#ffc977" />
        <stop offset="1" stopColor="#402211" stopOpacity="0.09"/>
      </radialGradient>
    </defs>
  </svg>
);

interface AlUlaSectionProps {
  isRTL: boolean;
}

const ALULA_IMAGE = "https://images.unsplash.com/photo-1464983953574-0892a716854b?q=80&w=2670&auto=format&fit=crop";

const AlUlaSection = ({ isRTL }: AlUlaSectionProps) => {
  return (
    <section className="relative py-28 overflow-hidden bg-gradient-to-br from-[#eddfc8] via-[#c4b79d]/60 to-[#625638]/60 select-none">
      <GlowRune />
      {/* Floating sandstone background accent */}
      <div className="absolute top-0 left-0 w-full h-96 bg-[url('https://images.unsplash.com/photo-1464983953574-0892a716854b?q=80&w=2670&auto=format&fit=crop')] bg-cover bg-left opacity-20 blur-sm pointer-events-none"></div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Magazine layout: left text, right hero image */}
        <div className="flex flex-col-reverse lg:flex-row items-center gap-16">
          {/* Text and info */}
          <motion.div
            className="lg:w-2/5 w-full"
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9 }}
            viewport={{ once: true }}
          >
            <h2 className="text-xs uppercase tracking-widest text-[#3e2516]/70 mb-5 font-light animate-fade-in">
              {isRTL ? "ملاذ الصحراء الأثري" : "Desert Sanctuary"}
            </h2>
            <div className="relative mb-3">
              {/* Ancient accent line */}
              <span className="absolute -top-3 left-2 w-16 h-1 bg-gradient-to-r from-yellow-300 via-orange-300/90 to-transparent rounded-2xl"></span>
              <h3 className="text-4xl md:text-5xl font-playfair font-bold mb-4 text-[#402211] drop-shadow-lg leading-tight">
                {isRTL ? "العلا" : "AlUla"}
              </h3>
            </div>
            <p className="text-lg leading-relaxed text-[#4e3a17] mb-10 max-w-lg animate-fade-in">
              {isRTL
                ? "اكتشف سحر العلا، موطن الحضارات القديمة وموقع الحجر النبطي. من الجبال الصخرية المنحوتة بالرياح إلى الهندسة المعمارية التاريخية، تعكس العلا جمالاً غامضًا وأثراً خالدًا في عمق الصحراء."
                : "Experience AlUla’s mystical beauty, home to ancient civilizations and the Nabatean site of Hegra. Wind-carved rock formations and timeless ruins create a haunting, eternal desert atmosphere."}
            </p>
            <Link to="/destinations/alula" className="block">
              <Button variant="outline" className="rounded-full px-10 py-5 border-[#c6a367] text-[#634426] hover:bg-[#634426] hover:text-white group shadow hover:shadow-lg transition-all font-semibold tracking-wide text-base">
                {isRTL ? "استكشف العلا" : "Explore AlUla"}
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </motion.div>
          {/* Hero Image with ancient/holo accent and float */}
          <motion.div
            className="lg:w-3/5 w-full relative flex items-center justify-center"
            initial={{ opacity: 0, x: 80 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.1, delay: 0.15 }}
            viewport={{ once: true }}
          >
            <div className="group relative rounded-3xl overflow-hidden shadow-2xl hover:shadow-[0_10px_60px_#43230144] transition-shadow w-full aspect-[16/7] flex justify-center items-center bg-[#f2eada]/80">
              <img
                src={ALULA_IMAGE}
                alt="AlUla Ancient Landscape"
                className="object-cover w-full h-full scale-100 group-hover:scale-105 transition-transform duration-700"
                style={{ filter: "contrast(1.07) brightness(0.97) grayscale(0.07) drop-shadow(0 8px 30px #6f6145c0)" }}
                loading="lazy"
              />
              {/* Subtle glowing rune */}
              <span className="absolute left-12 bottom-5 w-16 h-4 bg-gradient-to-r from-yellow-200/90 via-orange-200/70 to-transparent rounded-2xl blur-lg opacity-70 pointer-events-none" />
            </div>
            {/* Holographic float aura */}
            <div className="absolute -bottom-10 right-2 w-44 h-16 bg-gradient-to-t from-[#ffe6b6]/30 via-orange-100/60 to-transparent rounded-full blur-2xl opacity-40 pointer-events-none z-0 animate-float"></div>
          </motion.div>
        </div>
      </div>
      {/* Background rune scan animation accent */}
      <div className="absolute left-0 bottom-0 w-full h-16 bg-gradient-to-r from-[#c6a367]/30 via-transparent to-[#634426]/30 blur-sm pointer-events-none" />
    </section>
  );
};

export default AlUlaSection;
