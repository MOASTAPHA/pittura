
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import VirtualTourCard from '@/components/VirtualTourCard';
import { locations } from '@/data/tourLocations';

// Decorative holographic orb accent
const HoloOrb = () => (
  <motion.svg
    className="absolute -top-10 left-2/3 w-40 h-40 z-0 pointer-events-none"
    viewBox="0 0 200 200"
    fill="none"
    initial={{ opacity: 0.4 }}
    animate={{ opacity: 0.6 }}
    transition={{ duration: 4, repeat: Infinity, repeatType: "reverse" }}
  >
    <defs>
      <radialGradient id="holo-orb" cx="0.4" cy="0.45" r="1">
        <stop offset="0.2" stopColor="#fff6b8" />
        <stop offset="0.5" stopColor="#99e6fb" stopOpacity="0.8" />
        <stop offset="1" stopColor="#d0b2ff" stopOpacity="0.45" />
      </radialGradient>
    </defs>
    <motion.ellipse 
      cx="100" 
      cy="100" 
      rx="85" 
      ry="85" 
      fill="url(#holo-orb)"
      initial={{ scale: 0.95 }}
      animate={{ scale: 1.05 }}
      transition={{ duration: 6, repeat: Infinity, repeatType: "reverse" }}
    />
    <ellipse
      cx="70"
      cy="80"
      rx="40"
      ry="12"
      fill="white"
      opacity="0.18"
      transform="rotate(-14 80 80)"
    />
  </motion.svg>
);

interface Props {
  isRTL: boolean;
}

const VirtualToursSection = ({ isRTL }: Props) => {
  // Get the first 3 featured locations
  const featuredLocations = locations
    .filter(location => location.featured)
    .slice(0, 3)
    .map(location => ({
      id: location.id,
      title: location.title,
      description: location.description,
      imageUrl: location.thumbnailUrl,
      duration: 15, // Placeholder duration in minutes
      featured: true
    }));

  return (
    <motion.section
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9 }}
      viewport={{ once: true }}
      className="relative py-16 overflow-hidden bg-gradient-to-b from-[#ecf4fc] via-[#faf6ed]/80 to-[#eff0ee]/90"
    >
      {/* Holographic orb accent */}
      <HoloOrb />
      {/* Subtle background blur and gradient */}
      <div className="absolute inset-0 z-0">
        <div className="w-full h-full bg-gradient-to-br from-[#f1e5f8]/80 via-[#dffde5]/40 to-[#c5ddff]/40 blur-xl opacity-70" />
      </div>

      <div className="museum-container relative z-10">
        <div className="flex justify-between items-center mb-10">
          <motion.h2
            className="section-title text-3xl md:text-4xl font-extrabold tracking-tight bg-gradient-to-r from-[#bba269] via-[#b0dbff] to-[#b07cf3] bg-clip-text text-transparent relative"
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <span className="inline-block relative after:absolute after:inset-x-0 after:-bottom-1 after:h-1 after:bg-gradient-to-r after:from-[#efe6b6] after:via-[#a0e7ff] after:to-[#debaf9] after:blur after:opacity-50">
              {isRTL ? 'جولات افتراضية بزاوية 360°' : '360° Virtual Tours'}
            </span>
          </motion.h2>
          <Link to="/360-experience">
            <Button variant="outline" className="rounded-full border-[#bba269] shadow-md hover:bg-[#e2c591]/20 transition-colors font-semibold">
              {isRTL ? 'عرض الكل' : 'View All'}
            </Button>
          </Link>
        </div>
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          initial="hidden"
          whileInView="visible"
          transition={{ staggerChildren: 0.12, delayChildren: 0.1 }}
          viewport={{ once: true }}
        >
          {featuredLocations.map((tour, index) => (
            <motion.div
              key={tour.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group transition-transform duration-400 hover:scale-[1.03] relative"
            >
              <div className="absolute -inset-2 z-0 opacity-0 group-hover:opacity-70 transition-opacity rounded-3xl pointer-events-none bg-gradient-to-br from-[#ffeec2]/40 via-[#98e7fa]/30 to-[#e0cbfd]/30 blur-md" />
              <div className="relative z-10 rounded-2xl overflow-hidden shadow-xl ring-0 group-hover:ring-4 group-hover:ring-[#cab6ff]/30 transition-all duration-300">
                <VirtualTourCard tour={tour} isRTL={isRTL} />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
};

export default VirtualToursSection;
