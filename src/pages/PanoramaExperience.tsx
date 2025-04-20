
import { useState } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import PanoramaViewer from '@/components/PanoramaViewer';
import HolographicGuide from '@/components/HolographicGuide';

const PanoramaExperience = () => {
  const [isRTL, setIsRTL] = useState(false);
  
  return (
    <div className={isRTL ? 'rtl' : ''}>
      <Navigation isRTL={isRTL} />
      
      <div className="h-screen relative">
        <PanoramaViewer
          onClose={() => {/* Handled in component */}}
          isRTL={isRTL}
        />
        <HolographicGuide isRTL={isRTL} />
      </div>
      
      <Footer isRTL={isRTL} />
    </div>
  );
};

export default PanoramaExperience;
