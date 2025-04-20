
import { useState } from 'react';

interface InfoPointProps {
  id: string;
  title: string;
  description: string;
  isActive: boolean;
  position: {
    left: string;
    top: string;
  };
  onClick: () => void;
}

const InfoPoint = ({ id, title, description, isActive, position, onClick }: InfoPointProps) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <div 
      className="absolute pointer-events-auto"
      style={{
        left: position.left,
        top: position.top,
      }}
    >
      <div className="relative">
        {/* Circular info point */}
        <button
          className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
            isActive || isHovered
              ? 'bg-blue-500 scale-110'
              : 'bg-white/30 backdrop-blur-sm hover:bg-white/50'
          }`}
          onClick={onClick}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <span className="text-white font-bold text-sm">i</span>
        </button>
        
        {/* Pulsating effect */}
        <div className={`absolute inset-0 rounded-full animate-ping ${
          isActive ? 'bg-blue-500/30' : 'bg-white/20'
        }`}></div>
        
        {/* Info card */}
        {isActive && (
          <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-60 bg-black/80 backdrop-blur-md text-white p-3 rounded-lg z-10 pointer-events-auto animate-fade-in shadow-lg">
            <h3 className="font-bold text-blue-300 mb-1">{title}</h3>
            <p className="text-sm">{description}</p>
            <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-0 h-0 border-8 border-transparent border-b-black/80"></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default InfoPoint;
