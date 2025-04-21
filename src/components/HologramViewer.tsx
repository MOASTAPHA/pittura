
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useHologramScene } from '@/hooks/useHologramScene';
import HologramError from './HologramError';
import * as THREE from 'three';

interface HologramViewerProps {
  modelUrl?: string;
  isRTL?: boolean;
  isHologramActive?: boolean;
}

const HologramViewer = ({ 
  modelUrl = '/models/artifact_default.glb', 
  isRTL = false,
  isHologramActive: initialHologramState = false
}: HologramViewerProps) => {
  const [isHologramActive, setIsHologramActive] = useState(initialHologramState);
  
  const {
    containerRef,
    canvasRef,
    isLoading,
    hasError,
    sceneRef,
    modelRef
  } = useHologramScene({
    modelUrl,
    isHologramActive
  });

  const toggleHologramEffect = () => {
    if (!modelRef.current) return;

    setIsHologramActive(!isHologramActive);

    modelRef.current.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        if (isHologramActive) {
          if ((child as any).originalMaterial) {
            child.material = (child as any).originalMaterial;
          }
        } else {
          (child as any).originalMaterial = child.material;
          child.material = new THREE.MeshPhongMaterial({
            color: 0x00aaff,
            emissive: 0x0088ff,
            emissiveIntensity: 0.5,
            transparent: true,
            opacity: 0.7,
            wireframe: false,
            flatShading: false,
          });
        }
      }
    });

    if (sceneRef.current) {
      sceneRef.current.background = new THREE.Color(isHologramActive ? 0xffffff : 0x000000);
    }
  };

  if (hasError) {
    return <HologramError isRTL={isRTL} />;
  }

  return (
    <div className={`bg-black/90 rounded-lg shadow-md overflow-hidden ${isRTL ? 'rtl' : ''}`}>
      <div className="p-4 border-b border-white/10 flex justify-between items-center">
        <h3 className="font-medium text-white">
          {isRTL ? 'محاكاة الهولوجرام' : 'Hologram Simulation'}
        </h3>
        <Button
          variant="outline"
          size="sm"
          onClick={toggleHologramEffect}
          className="bg-transparent text-white border-white/30 hover:bg-white/10"
        >
          {isHologramActive 
            ? (isRTL ? 'عرض عادي' : 'Normal View') 
            : (isRTL ? 'عرض الهولوجرام' : 'Hologram View')
          }
        </Button>
      </div>
      <div className="relative" ref={containerRef}>
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/50 z-10">
            <div className="flex flex-col items-center">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-400 mb-4"></div>
              <p className="text-blue-400">{isRTL ? 'جاري التحميل...' : 'Loading hologram...'}</p>
            </div>
          </div>
        )}
        <canvas 
          ref={canvasRef}
          className="w-full h-[400px]"
        />
      </div>
      <div className="p-4 bg-blue-900/30 text-sm text-blue-300">
        {isRTL 
          ? 'محاكاة لكيفية ظهور هذه القطعة الأثرية كهولوجرام في معرض رقمي.'
          : 'A simulation of how this artifact would appear as a hologram in a digital exhibition.'}
      </div>
    </div>
  );
};

export default HologramViewer;
