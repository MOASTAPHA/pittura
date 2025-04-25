
import { Button } from '@/components/ui/button';
import { ZoomIn, ZoomOut, RotateCcw, Hand } from 'lucide-react';

interface ViewerControlsProps {
  isGestureMode: boolean;
  onToggleGestureMode: () => void;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onResetView: () => void;
  isRTL?: boolean;
}

const ViewerControls = ({
  isGestureMode,
  onToggleGestureMode,
  onZoomIn,
  onZoomOut,
  onResetView,
  isRTL = false
}: ViewerControlsProps) => {
  return (
    <div className={`p-4 border-b border-white/10 flex justify-between items-center ${isRTL ? 'rtl' : ''}`}>
      <h3 className="font-medium text-white">
        3D Interactive Viewer
      </h3>
      <div className="flex space-x-2">
        <Button
          variant="outline"
          size="icon"
          onClick={onToggleGestureMode}
          className={`h-8 w-8 ${isGestureMode ? 'bg-blue-600 text-white' : 'bg-transparent text-white'}`}
        >
          <Hand size={16} />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={onZoomIn}
          className="h-8 w-8 bg-transparent text-white"
        >
          <ZoomIn size={16} />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={onZoomOut}
          className="h-8 w-8 bg-transparent text-white"
        >
          <ZoomOut size={16} />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={onResetView}
          className="h-8 w-8 bg-transparent text-white"
        >
          <RotateCcw size={16} />
        </Button>
      </div>
    </div>
  );
};

export default ViewerControls;
