
import { motion } from 'framer-motion';

interface Feature {
  icon: React.ReactNode;
  title: string;
  description: string;
}

interface ShebaraFeaturesProps {
  features: Feature[];
}

export const ShebaraFeatures = ({ features }: ShebaraFeaturesProps) => (
  <motion.div
    className="relative z-20 mt-16 flex flex-col lg:flex-row gap-8"
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.65, delay: 0.1 }}
    viewport={{ once: true }}
  >
    {features.map((f, i) => (
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
        <div className="absolute bottom-1 right-4 w-16 h-3 bg-gradient-to-r from-blue-300 via-blue-50/80 to-transparent rounded-xl blur-lg opacity-60 pointer-events-none animate-float"></div>
        <div className="absolute -bottom-6 -left-10 w-20 h-20 rounded-full bg-gradient-to-tr from-blue-300/10 to-transparent rotate-45 opacity-0 group-hover:opacity-70 transition-opacity"></div>
      </motion.div>
    ))}
  </motion.div>
);
