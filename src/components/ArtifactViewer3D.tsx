
import { useState } from 'react';
import { useThreeScene } from '@/hooks/useThreeScene';
import { Button } from '@/components/ui/button';
import { ZoomIn, ZoomOut, Box } from 'lucide-react';

interface ArtifactViewer3DProps {
  modelUrl: string;
  title: string;
  description: string;
  isRTL?: boolean;
}

const ArtifactViewer3D = ({ modelUrl, title, description, isRTL = false }: ArtifactViewer3DProps) => {
  const [zoom, setZoom] = useState(2);
  const { containerRef, canvasRef, isLoading, hasError, updateCameraZoom, resetView } = useThreeScene({
    modelUrl, 
    zoom,
    onZoomChange: setZoom
  });

  const handleZoomIn = () => {
    const newZoom = Math.max(zoom - 0.5, 1);
    setZoom(newZoom);
    updateCameraZoom(newZoom);
  };

  const handleZoomOut = () => {
    const newZoom = Math.min(zoom + 0.5, 5);
    setZoom(newZoom);
    updateCameraZoom(newZoom);
  };

  return (
    <div className={`rounded-xl overflow-hidden bg-white/5 backdrop-blur-sm border border-white/10 ${isRTL ? 'rtl' : ''}`}>
      <div className="p-4 border-b border-white/10 flex justify-between items-center">
        <h3 className="font-medium text-lg">
          {title}
        </h3>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8 rounded-full bg-white/10 border-white/20 text-white hover:bg-white/20"
            onClick={handleZoomIn}
          >
            <ZoomIn className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8 rounded-full bg-white/10 border-white/20 text-white hover:bg-white/20"
            onClick={handleZoomOut}
          >
            <ZoomOut className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8 rounded-full bg-white/10 border-white/20 text-white hover:bg-white/20"
            onClick={resetView}
          >
            <Box className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      <div ref={containerRef} className="relative h-64 bg-gray-900">
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/50 z-10">
            <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        )}
        
        {hasError && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/50 z-10 text-red-400">
            <p>{isRTL ? 'خطأ في تحميل النموذج' : 'Error loading 3D model'}</p>
          </div>
        )}
        
        <canvas
          ref={canvasRef}
          className="w-full h-full"
        />
      </div>
      
      <div className="p-4 text-sm text-white/80">
        {description}
      </div>
    </div>
  );
};

export default ArtifactViewer3D;
