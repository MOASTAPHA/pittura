
import { useState } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { featuredArtifacts } from '@/data/mockData';
import ArtifactCard from '@/components/ArtifactCard';
import { motion } from 'framer-motion';

const ArtifactExplorer = () => {
  const [isRTL, setIsRTL] = useState(false);
  
  return (
    <div className={isRTL ? 'rtl' : ''}>
      <Navigation isRTL={isRTL} />
      
      <div className="museum-container py-16">
        <h1 className="text-4xl font-bold mb-8">
          {isRTL ? 'استكشاف القطع الأثرية' : 'Artifact Explorer'}
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...featuredArtifacts, ...featuredArtifacts].map((artifact, index) => (
            <motion.div 
              key={`${artifact.id}-${index}`} 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <ArtifactCard artifact={artifact} isRTL={isRTL} />
            </motion.div>
          ))}
        </div>
      </div>
      
      <Footer isRTL={isRTL} />
    </div>
  );
};

export default ArtifactExplorer;
