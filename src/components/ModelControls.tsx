
import { Button } from '@/components/ui/button';

interface ModelControlsProps {
  isRTL?: boolean;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onReset: () => void;
}

const ModelControls = ({ isRTL = false, onZoomIn, onZoomOut, onReset }: ModelControlsProps) => {
  return (
    <div className="absolute bottom-4 right-4 flex space-x-2 rtl:space-x-reverse">
      <Button size="sm" variant="outline" onClick={onZoomIn}>
        {isRTL ? 'تكبير' : 'Zoom In'}
      </Button>
      <Button size="sm" variant="outline" onClick={onZoomOut}>
        {isRTL ? 'تصغير' : 'Zoom Out'}
      </Button>
      <Button size="sm" variant="outline" onClick={onReset}>
        {isRTL ? 'إعادة الضبط' : 'Reset'}
      </Button>
    </div>
  );
};

export default ModelControls;
