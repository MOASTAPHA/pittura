
import { useState, useRef } from 'react';
import ViewerControls from './interactive-viewer/ViewerControls';
import ViewerCanvas from './interactive-viewer/ViewerCanvas';
import ViewerStatus from './interactive-viewer/ViewerStatus';

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
  
  const handleZoomIn = () => {
    const newZoom = Math.max(zoom - 0.5, 1);
    setZoom(newZoom);
    showInteractionStatus('Zooming In');
  };

  const handleZoomOut = () => {
    const newZoom = Math.min(zoom + 0.5, 5);
    setZoom(newZoom);
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
    setZoom(2);
    showInteractionStatus('View Reset');
  };

  return (
    <div className={`bg-gray-900 rounded-lg shadow-md overflow-hidden ${isRTL ? 'rtl' : ''}`}>
      <ViewerControls
        isGestureMode={isGestureMode}
        onToggleGestureMode={toggleGestureMode}
        onZoomIn={handleZoomIn}
        onZoomOut={handleZoomOut}
        onResetView={handleResetView}
        isRTL={isRTL}
      />
      
      <div className="relative">
        <ViewerCanvas
          modelUrl={modelUrl}
          zoom={zoom}
          isGestureMode={isGestureMode}
          onZoomChange={setZoom}
          onInteractionStatus={showInteractionStatus}
          isRTL={isRTL}
        />
        
        <ViewerStatus
          interactionStatus={interactionStatus}
          isGestureMode={isGestureMode}
          isRTL={isRTL}
        />
      </div>
    </div>
  );
};

export default SimpleInteractiveViewer;
