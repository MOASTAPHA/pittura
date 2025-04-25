import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { useThreeScene } from '@/hooks/useThreeScene';
import { ZoomIn, ZoomOut, RotateCcw, Hand } from 'lucide-react';

interface SimpleInteractiveViewerProps {
  modelUrl: string;
  title?: string;
  isRTL?: boolean;
}

const SimpleInteractiveViewer = ({ 
  modelUrl, 
  title = "3D Interactive Viewer", 
  isRTL = false 
}: SimpleInteractiveViewerProps) => {
  const [zoom, setZoom] = useState(2);
  const [isGestureMode, setIsGestureMode] = useState(false);
  const [interactionStatus, setInteractionStatus] = useState('');
  const interactionTimerRef = useRef<number | null>(null);
  
  const { 
    containerRef, 
    canvasRef, 
    isLoading, 
    hasError, 
    updateCameraZoom,
    resetView,
    rotateModel
  } = useThreeScene({
    modelUrl,
    zoom,
    onZoomChange: setZoom
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
          showInteractionStatus('Rotating');
        } else if (Math.abs(deltaY) > Math.abs(deltaX) * 1.5) {
          const newZoom = Math.max(1, Math.min(5, zoom + deltaY * 0.01));
          setZoom(newZoom);
          updateCameraZoom(newZoom);
          showInteractionStatus(deltaY > 0 ? 'Zooming Out' : 'Zooming In');
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
  }, [isGestureMode, containerRef, rotateModel, updateCameraZoom, zoom]);

  const handleZoomIn = () => {
    const newZoom = Math.max(zoom - 0.5, 1);
    setZoom(newZoom);
    updateCameraZoom(newZoom);
    showInteractionStatus('Zooming In');
  };

  const handleZoomOut = () => {
    const newZoom = Math.min(zoom + 0.5, 5);
    setZoom(newZoom);
    updateCameraZoom(newZoom);
    showInteractionStatus('Zooming Out');
  };
  
  const toggleGestureMode = () => {
    setIsGestureMode(!isGestureMode);
    showInteractionStatus(isGestureMode ? 'Touch Controls' : 'Gesture Controls');
  };
  
  const showInteractionStatus = (status: string) => {
    setInteractionStatus(status);
    
    if (interactionTimerRef.current) {
      window.clearTimeout(interactionTimerRef.current);
    }
    
    interactionTimerRef.current = window.setTimeout(() => {
      setInteractionStatus('');
      interactionTimerRef.current = null;
    }, 1500);
  };
  
  const handleResetView = () => {
    resetView();
    setZoom(2);
    showInteractionStatus('View Reset');
  };

  return (
    <div className={`bg-gray-900 rounded-lg shadow-md overflow-hidden ${isRTL ? 'rtl' : ''}`}>
      <div className="p-4 border-b border-white/10 flex justify-between items-center">
        <h3 className="font-medium text-white">
          {title}
        </h3>
        <div className="flex space-x-2">
          <Button
            variant="outline"
            size="icon"
            onClick={toggleGestureMode}
            className={`h-8 w-8 ${isGestureMode ? 'bg-blue-600 text-white' : 'bg-transparent text-white'}`}
          >
            <Hand size={16} />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={handleZoomIn}
            className="h-8 w-8 bg-transparent text-white"
          >
            <ZoomIn size={16} />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={handleZoomOut}
            className="h-8 w-8 bg-transparent text-white"
          >
            <ZoomOut size={16} />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={handleResetView}
            className="h-8 w-8 bg-transparent text-white"
          >
            <RotateCcw size={16} />
          </Button>
        </div>
      </div>
      
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
        
        {interactionStatus && (
          <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-black/80 text-white px-4 py-2 rounded-full text-sm">
            {interactionStatus}
          </div>
        )}
        
        {isGestureMode && (
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-blue-900/80 text-white px-4 py-2 rounded-lg text-sm max-w-xs text-center">
            {isRTL 
              ? 'حرك يدك في الهواء لتدوير وتكبير النموذج'
              : 'Move your hand in the air to rotate and scale the model'}
          </div>
        )}
      </div>
      
      <div className="p-4 bg-blue-900/30 text-sm text-blue-300">
        {isGestureMode 
          ? (isRTL 
            ? 'وضع الإشارة: حرك يدك أفقياً للدوران، وعمودياً للتكبير/التصغير'
            : 'Gesture mode: Move horizontally to rotate, vertically to zoom')
          : (isRTL 
            ? 'اضغط واسحب لتدوير النموذج. استخدم أزرار التكبير والتصغير للتحكم.'
            : 'Click and drag to rotate the model. Use zoom buttons to control scale.')}
      </div>
    </div>
  );
};

export default SimpleInteractiveViewer;
