
import { motion } from 'framer-motion';

export const HoloAccent = () => (
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
