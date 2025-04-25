
import { motion } from 'framer-motion';

export const HoloAccent = () => (
  <motion.svg 
    className="absolute top-6 left-6 w-24 h-24 z-10 opacity-70 mix-blend-screen pointer-events-none"
    viewBox="0 0 100 100" 
    fill="none"
    initial={{ opacity: 0.6 }}
    animate={{ opacity: 0.8 }}
    transition={{ duration: 3, repeat: Infinity, repeatType: "reverse" }}
  >
    <defs>
      <linearGradient id="linear-holo" x1="0" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse">
        <stop stopColor="#0FA0CE" />
        <stop offset="0.5" stopColor="#7DB9DC" />
        <stop offset="1" stopColor="#B8E1F0" />
      </linearGradient>
      <filter id="blur1" x="-10" y="-10" width="120" height="120" filterUnits="userSpaceOnUse">
        <feGaussianBlur stdDeviation="6" />
      </filter>
    </defs>
    <ellipse cx="50" cy="50" rx="48" ry="22" fill="url(#linear-holo)" filter="url(#blur1)" />
    <ellipse cx="38" cy="40" rx="20" ry="8" fill="white" opacity="0.2" />
  </motion.svg>
);
