
import { useState } from 'react';
import { useThreeScene } from '@/hooks/useThreeScene';
import ModelError from './ModelError';
import ModelControls from './ModelControls';

interface ModelViewerProps {
  modelUrl?: string;
  isRTL?: boolean;
  fallbackImageUrl?: string;
}

const ModelViewer = ({ 
  modelUrl = '/models/artifact_default.glb', 
  isRTL = false,
  fallbackImageUrl = 'https://images.unsplash.com/photo-1486718448742-163732cd1544?q=80&w=2940&auto=format&fit=crop'
}: ModelViewerProps) => {
  const [zoom, setZoom] = useState(2);
  
  const {
    containerRef,
    canvasRef,
    isLoading,
    hasError,
    updateCameraZoom,
    resetView
  } = useThreeScene({
    modelUrl,
    zoom,
    onZoomChange: setZoom
  });

  const handleZoomIn = () => {
    const newZoom = Math.max(1, zoom - 0.5);
    setZoom(newZoom);
    updateCameraZoom(newZoom);
  };

  const handleZoomOut = () => {
    const newZoom = Math.min(10, zoom + 0.5);
    setZoom(newZoom);
    updateCameraZoom(newZoom);
  };

  if (hasError) {
    return <ModelError isRTL={isRTL} fallbackImageUrl={fallbackImageUrl} />;
  }

  return (
    <div className={`bg-white rounded-lg shadow-md overflow-hidden ${isRTL ? 'rtl' : ''}`}>
      <div className="p-4 border-b">
        <h3 className="font-medium">
          {isRTL ? 'عرض ثلاثي الأبعاد' : '3D View'}
        </h3>
      </div>
      <div className="relative" ref={containerRef}>
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-background/80 z-10">
            <div className="flex flex-col items-center">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mb-4"></div>
              <p>{isRTL ? 'جاري التحميل...' : 'Loading model...'}</p>
            </div>
          </div>
        )}
        <canvas 
          ref={canvasRef}
          className="w-full h-[400px]"
        />
        <ModelControls 
          isRTL={isRTL}
          onZoomIn={handleZoomIn}
          onZoomOut={handleZoomOut}
          onReset={resetView}
        />
      </div>
      <div className="p-4 bg-muted text-sm text-muted-foreground">
        {isRTL 
          ? 'انقر واسحب لتدوير النموذج. استخدم عجلة الماوس أو اضغط على أزرار التكبير/التصغير للتقريب والتبعيد.'
          : 'Click and drag to rotate the model. Use mouse wheel or zoom buttons to zoom in and out.'}
      </div>
    </div>
  );
};

export default ModelViewer;
