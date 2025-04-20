
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';

interface HolographicGuideProps {
  isRTL?: boolean;
}

const HolographicGuide = ({ isRTL = false }: HolographicGuideProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentMessage, setCurrentMessage] = useState(0);
  const [isMinimized, setIsMinimized] = useState(false);
  
  // Guide messages in both languages
  const messages = [
    {
      en: "Welcome to Al-Ula! I'm Zaina, your virtual guide. Click and drag to look around.",
      ar: "مرحبًا بك في العلا! أنا زينة، مرشدك الافتراضي. انقر واسحب للنظر من حولك."
    },
    {
      en: "This ancient site dates back over 2,000 years and was once a bustling trade hub.",
      ar: "يعود تاريخ هذا الموقع القديم إلى أكثر من 2000 عام وكان مركزًا تجاريًا مزدحمًا في السابق."
    },
    {
      en: "Look for the blue information points to learn more about specific features.",
      ar: "ابحث عن نقاط المعلومات الزرقاء لمعرفة المزيد عن الميزات المحددة."
    },
    {
      en: "The Nabataeans who built this site were master engineers and architects.",
      ar: "كان الأنباط الذين بنوا هذا الموقع مهندسين ومعماريين بارعين."
    }
  ];
  
  useEffect(() => {
    // Show guide with a delay for dramatic effect
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);
  
  useEffect(() => {
    // Auto-advance messages
    if (isVisible && !isMinimized) {
      const timer = setTimeout(() => {
        setCurrentMessage((prev) => (prev + 1) % messages.length);
      }, 8000);
      
      return () => clearTimeout(timer);
    }
  }, [currentMessage, isVisible, isMinimized, messages.length]);
  
  const handleNextMessage = () => {
    setCurrentMessage((prev) => (prev + 1) % messages.length);
  };
  
  const handlePrevMessage = () => {
    setCurrentMessage((prev) => (prev === 0 ? messages.length - 1 : prev - 1));
  };
  
  const toggleMinimize = () => {
    setIsMinimized(!isMinimized);
  };
  
  if (!isVisible) return null;
  
  return (
    <div className={`fixed bottom-20 ${isRTL ? 'right-6' : 'left-6'} z-30 flex flex-col items-start`}>
      {/* Holographic guide character */}
      <div 
        className={`
          relative transition-all duration-500 ease-in-out
          ${isMinimized ? 'scale-50 opacity-70' : 'scale-100 opacity-100'}
          ${isMinimized ? `${isRTL ? '-translate-x-10' : 'translate-x-10'}` : 'translate-x-0'}
        `}
        onClick={isMinimized ? toggleMinimize : undefined}
      >
        <div className="relative hologram-artifact animate-float">
          {/* Using a silhouette image with holographic overlay */}
          <div className="w-40 h-64 relative overflow-hidden rounded-xl">
            <img 
              src="https://static.vecteezy.com/system/resources/previews/013/423/747/original/man-standing-silhouette-cutout-vector.jpg" 
              alt="Guide silhouette"
              className="w-full h-full object-cover invert"
            />
            
            {/* Hologram effects */}
            <div className="absolute inset-0 bg-blue-500/20"></div>
            <div className="absolute inset-0 hologram-overlay">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5"></div>
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-500/80 to-transparent hologram-scan"></div>
              <div className="absolute inset-y-0 left-0 w-px bg-gradient-to-b from-transparent via-blue-500/80 to-transparent hologram-scan-vertical"></div>
              <div className="absolute inset-y-0 right-0 w-px bg-gradient-to-b from-transparent via-blue-500/80 to-transparent hologram-scan-vertical" style={{ animationDelay: '1s' }}></div>
            </div>
          </div>
          
          {/* Base glow effect */}
          <div className="absolute bottom-0 left-0 right-0 h-4 bg-blue-500/50 blur-xl"></div>
        </div>
        
        {/* Message bubble */}
        {!isMinimized && (
          <div className={`absolute ${isRTL ? 'right-full mr-4' : 'left-full ml-4'} bottom-1/2 w-64 bg-blue-950/80 backdrop-blur-md rounded-lg p-4 text-white animate-fade-in`}>
            <div className="text-sm mb-2">
              {isRTL ? messages[currentMessage].ar : messages[currentMessage].en}
            </div>
            
            <div className="flex justify-between items-center pt-2 border-t border-blue-800">
              <div className="flex space-x-2">
                <button 
                  className="w-6 h-6 flex items-center justify-center rounded-full bg-blue-700/50 hover:bg-blue-600"
                  onClick={handlePrevMessage}
                >
                  &larr;
                </button>
                <button 
                  className="w-6 h-6 flex items-center justify-center rounded-full bg-blue-700/50 hover:bg-blue-600"
                  onClick={handleNextMessage}
                >
                  &rarr;
                </button>
              </div>
              
              <button 
                className="text-xs text-blue-300 hover:text-blue-100"
                onClick={toggleMinimize}
              >
                {isRTL ? 'تصغير' : 'Minimize'}
              </button>
            </div>
            
            <div className={`absolute ${isRTL ? 'left-full -translate-x-2' : 'right-full translate-x-2'} top-1/2 -translate-y-1/2 w-0 h-0 border-8 border-transparent ${isRTL ? 'border-right-blue-950/80' : 'border-left-blue-950/80'}`}></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HolographicGuide;
