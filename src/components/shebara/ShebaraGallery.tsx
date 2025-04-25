
import { motion } from 'framer-motion';

interface ShebaraImage {
  src: string;
  alt: string;
  aspect: string;
}

interface ShebaraGalleryProps {
  images: ShebaraImage[];
  isRTL: boolean;
}

export const ShebaraGallery = ({ images, isRTL }: ShebaraGalleryProps) => (
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
          src={images[1].src}
          alt={images[1].alt}
          className={`object-cover w-full h-64 lg:h-96 ${images[1].aspect} transition-transform duration-700 group-hover:scale-105`}
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
            src={images[0].src}
            alt={images[0].alt}
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
            src={images[2].src}
            alt={images[2].alt}
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
);
