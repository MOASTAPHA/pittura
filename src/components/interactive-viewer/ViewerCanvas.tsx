
import { useRef, useEffect } from 'react';
import { useThreeScene } from '@/hooks/useThreeScene';

interface ViewerCanvasProps {
  modelUrl: string;
  zoom: number;
  isGestureMode: boolean;
  onZoomChange: (zoom: number) => void;
  onInteractionStatus: (status: string) => void;
  isRTL?: boolean;
}

const ViewerCanvas = ({
  modelUrl,
  zoom,
  isGestureMode,
  onZoomChange,
  onInteractionStatus,
  isRTL = false
}: ViewerCanvasProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { 
    containerRef: sceneContainerRef, 
    canvasRef, 
    isLoading, 
    updateCameraZoom,
    rotateModel,
  } = useThreeScene({
    modelUrl,
    zoom,
    onZoomChange
  });

  useEffect(() => {
    if (!isGestureMode || !containerRef.current) return;
    
    let lastX = 0;
    let lastY = 0;
    let isMoving = false;
    
    const handleMouseMove = (e: MouseEvent) => {
      if (!isGestureMode) return;
      
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return;
      
      const relX = (e.clientX - rect.left) / rect.width;
      const relY = (e.clientY - rect.top) / rect.height;
      
      if (isMoving) {
        const deltaX = e.clientX - lastX;
        const deltaY = e.clientY - lastY;
        
        if (Math.abs(deltaX) > Math.abs(deltaY) * 1.5) {
          rotateModel(-deltaX * 0.01, 0);
          onInteractionStatus('Rotating');
        } else if (Math.abs(deltaY) > Math.abs(deltaX) * 1.5) {
          const newZoom = Math.max(1, Math.min(5, zoom + deltaY * 0.01));
          onZoomChange(newZoom);
          updateCameraZoom(newZoom);
          onInteractionStatus(deltaY > 0 ? 'Zooming Out' : 'Zooming In');
        }
      }
      
      lastX = e.clientX;
      lastY = e.clientY;
      isMoving = true;
    };
    
    const handleMouseLeave = () => {
      isMoving = false;
    };
    
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [isGestureMode, zoom, rotateModel, updateCameraZoom, onZoomChange, onInteractionStatus]);

  return (
    <div className="relative" ref={containerRef}>
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/70 z-10">
          <div className="flex flex-col items-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-400 mb-4"></div>
            <p className="text-blue-400">{isRTL ? 'جاري التحميل...' : 'Loading model...'}</p>
          </div>
        </div>
      )}
      
      <canvas 
        ref={canvasRef}
        className="w-full h-[500px]"
      />
    </div>
  );
};

export default ViewerCanvas;
