
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

// High-resolution AlUla images with warm, earthy tones
const ALULA_IMAGES = [
  "https://images.unsplash.com/photo-1590766116807-79a43f70a2e0?q=80&w=3174&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1610649359681-dea97f77f594?q=80&w=2670&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1552160800-31d6587125ad?q=80&w=2670&auto=format&fit=crop"
];

const AlUlaSection = ({ isRTL }: AlUlaSectionProps) => {
  return (
    <section className="relative py-28 overflow-hidden bg-gradient-to-br from-[#f5efe4] via-[#f8f3e7] to-[#f0e9d7] select-none">
      <GlowRune />
      {/* Floating sandstone background accent */}
      <motion.div 
        initial={{ y: 0 }}
        animate={{ y: -15 }}
        transition={{ duration: 25, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
        className="absolute top-0 left-0 w-full h-96 bg-[url('https://images.unsplash.com/photo-1541443471765-15e1f99ad57f?q=80&w=2670&auto=format&fit=crop')] bg-cover bg-center opacity-10 blur-sm pointer-events-none"
      />

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
            <motion.h2 
              className="text-xs uppercase tracking-widest text-[#3e2516]/70 mb-5 font-light animate-fade-in"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              {isRTL ? "ملاذ الصحراء الأثري" : "Ancient Desert Sanctuary"}
            </motion.h2>
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
                : "Discover the mystical beauty of AlUla, home to ancient civilizations and the Nabatean site of Hegra. From wind-carved sandstone cliffs to historical architecture, AlUla reflects an eternal heritage nestled in the desert's embrace."}
            </p>
            <div className="flex flex-wrap gap-4 mb-10">
              {['Hegra', 'Elephant Rock', 'Dadan'].map((site, index) => (
                <motion.span 
                  key={site}
                  className="px-4 py-1.5 bg-[#e8d9be]/60 text-[#5c4a30] rounded-full text-sm backdrop-blur-sm border border-[#d7c9ad]/30"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.1 * index }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.05, backgroundColor: '#e8d9be' }}
                >
                  {isRTL ? ['الحجر', 'صخرة الفيل', 'دادان'][index] : site}
                </motion.span>
              ))}
            </div>
            <Link to="/destinations/alula" className="block">
              <Button variant="outline" className="rounded-full px-10 py-5 border-[#c6a367] text-[#634426] hover:bg-[#634426] hover:text-white group shadow hover:shadow-lg transition-all font-semibold tracking-wide text-base">
                {isRTL ? "استكشف العلا" : "Explore AlUla"}
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </motion.div>
          {/* Image Gallery */}
          <motion.div
            className="lg:w-3/5 w-full relative"
            initial={{ opacity: 0, x: 80 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.1, delay: 0.15 }}
            viewport={{ once: true }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 relative">
              <div className="col-span-full">
                <motion.div 
                  className="group relative rounded-3xl overflow-hidden shadow-2xl hover:shadow-[0_10px_60px_#43230144] transition-shadow aspect-[16/9] flex justify-center items-center"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.5 }}
                >
                  <img
                    src={ALULA_IMAGES[0]}
                    alt="AlUla Ancient Landscape"
                    className="object-cover w-full h-full scale-100 group-hover:scale-105 transition-transform duration-700"
                    style={{ filter: "contrast(1.07) brightness(0.97) saturate(1.1)" }}
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
                  <span className="absolute bottom-5 left-6 text-white/90 text-2xl font-playfair tracking-wide drop-shadow-md">
                    {isRTL ? "الحجر (مدائن صالح)" : "Hegra (Madain Saleh)"}
                  </span>
                  {/* Interactive 360° preview button */}
                  <span className="absolute top-4 right-4 px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-white/90 text-xs flex items-center gap-1.5 hover:bg-white/30 transition-colors cursor-pointer">
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="white" strokeWidth="1.5"/>
                      <path d="M14 12C14 13.1046 13.1046 14 12 14C10.8954 14 10 13.1046 10 12C10 10.8954 10.8954 10 12 10C13.1046 10 14 10.8954 14 12Z" stroke="white" strokeWidth="1.5"/>
                      <path d="M12 8V4" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
                      <path d="M16 12H20" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
                      <path d="M12 16V20" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
                      <path d="M8 12H4" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
                    </svg>
                    {isRTL ? 'جولة افتراضية 360°' : '360° View'}
                  </span>
                </motion.div>
              </div>
              
              <motion.div 
                className="group relative rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl aspect-[4/3]"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.5 }}
              >
                <img
                  src={ALULA_IMAGES[1]}
                  alt="AlUla Rock Formations"
                  className="object-cover w-full h-full scale-100 group-hover:scale-105 transition-transform duration-700"
                  style={{ filter: "contrast(1.05) brightness(0.95) saturate(1.05)" }}
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
                <span className="absolute bottom-4 left-4 text-white/90 text-lg font-playfair tracking-wide drop-shadow-md">
                  {isRTL ? "صخرة الفيل" : "Elephant Rock"}
                </span>
              </motion.div>
              
              <motion.div 
                className="group relative rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl aspect-[4/3]"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.5 }}
              >
                <img
                  src={ALULA_IMAGES[2]}
                  alt="AlUla Cultural Festival"
                  className="object-cover w-full h-full scale-100 group-hover:scale-105 transition-transform duration-700"
                  style={{ filter: "contrast(1.05) brightness(0.95) saturate(1.05)" }}
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
                <span className="absolute bottom-4 left-4 text-white/90 text-lg font-playfair tracking-wide drop-shadow-md">
                  {isRTL ? "مهرجان العلا" : "AlUla Festival"}
                </span>
              </motion.div>
            </div>
            {/* Desert texture overlay */}
            <div className="absolute -top-12 -right-12 w-64 h-64 opacity-30 pointer-events-none z-0">
              <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                <filter id="noiseFilter">
                  <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch"/>
                  <feColorMatrix type="matrix" values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 0.5 0"/>
                </filter>
                <rect width="100%" height="100%" filter="url(#noiseFilter)"/>
              </svg>
            </div>
          </motion.div>
        </div>
      </div>
      {/* Background rune scan animation accent */}
      <div className="absolute left-0 bottom-0 w-full h-16 bg-gradient-to-r from-[#c6a367]/30 via-transparent to-[#634426]/30 blur-sm pointer-events-none" />
    </section>
  );
};

export default AlUlaSection;
