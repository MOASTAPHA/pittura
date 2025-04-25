
import { motion } from "framer-motion";

const HEGRA_IMAGES = [
  {
    src: "https://images.unsplash.com/photo-1604933763107-0ca407884e40?q=80&w=2946&auto=format&fit=crop",
    alt: "Ancient Nabataean Tombs at Hegra",
  },
  {
    src: "https://images.unsplash.com/photo-1482881497185-d4a9ddbe4151?q=80&w=3024&auto=format&fit=crop",
    alt: "Desert Landscape of AlUla",
  },
  {
    src: "https://images.unsplash.com/photo-1577098770706-93bbde0f914f?q=80&w=2938&auto=format&fit=crop",
    alt: "Artistic Desert Architecture",
  },
];

interface AlUlaSectionProps {
  isRTL: boolean;
}

const AlUlaSection = ({ isRTL }: AlUlaSectionProps) => {
  return (
    <section className="relative py-24 bg-gradient-to-br from-[#faf7f3] via-[#f5e3cb] to-[#e8d5b7] overflow-hidden">
      {/* Responsive image grid/banner */}
      <div className="container mx-auto mb-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 rounded-3xl overflow-hidden shadow-xl">
          {HEGRA_IMAGES.map((img, idx) => (
            <motion.div
              key={img.src}
              className={`relative group ${idx === 0 ? "md:row-span-2 md:col-span-2" : ""}`}
              initial={{ scale: 1, opacity: 0.7 }}
              whileHover={{ scale: 1.04, opacity: 1 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, ease: "easeInOut" }}
              style={{
                gridColumn: idx === 0 ? "span 2 / span 2" : undefined,
                gridRow: idx === 0 ? "span 2 / span 2" : undefined,
              }}
            >
              <img
                src={img.src}
                alt={img.alt}
                className={`object-cover w-full h-56 md:h-96 transition-transform duration-500 group-hover:scale-105 rounded-2xl brightness-95`}
                loading="lazy"
              />
              {/* Overlay for title on the main image */}
              {idx === 0 && (
                <div className="absolute bottom-8 left-8 bg-white/80 px-8 py-5 rounded-2xl shadow-lg backdrop-blur-lg">
                  <h2 className="font-playfair text-3xl md:text-4xl font-bold tracking-tight text-museum-brown drop-shadow text-center mb-1">
                    {isRTL ? "مدائن صالح (الحِجر)" : "Hegra (Madain Saleh)"}
                  </h2>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Section Content */}
      <div className="container mx-auto px-4 text-museum-brown">
        <motion.h3
          className="text-xl md:text-2xl font-semibold mb-4 animate-fade-in font-playfair"
          initial={{ opacity: 0, x: isRTL ? 50 : -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          {isRTL
            ? "استكشف التاريخ العريق لمنطقة الحِجر"
            : "Explore the Timeless History of Hegra"}
        </motion.h3>
        <motion.p
          className="max-w-3xl text-lg leading-relaxed mb-8 animate-fade-in"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          {isRTL
            ? "مدائن صالح (الحِجر) تعد أول موقع سعودي يُدرج ضمن قائمة التراث العالمي لليونسكو. اكتشف القصور المنحوتة في الصخور والرمال الذهبية، وشاهد معالم حضارة الأنباط الفريدة وسط صحراء العلا الآسرة."
            : "Hegra (Madain Saleh) is Saudi Arabia's first UNESCO World Heritage Site. Discover ancient Nabataean tombs carved into towering rocks and golden sands—witnessing the marvels of a bygone civilization in the enchanting AlUla desert."}
        </motion.p>
      </div>
    </section>
  );
};

export default AlUlaSection;

