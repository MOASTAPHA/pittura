
import { Button } from '@/components/ui/button';

interface HologramErrorProps {
  isRTL?: boolean;
}

const HologramError = ({ isRTL = false }: HologramErrorProps) => {
  return (
    <div className={`bg-black/90 rounded-lg shadow-md overflow-hidden ${isRTL ? 'rtl' : ''}`}>
      <div className="p-4 border-b border-white/10">
        <h3 className="font-medium text-white">
          {isRTL ? 'محاكاة الهولوجرام' : 'Hologram Simulation'}
        </h3>
      </div>
      <div className="p-6 text-center">
        <p className="text-white/80 mb-4">
          {isRTL 
            ? 'عذراً، لم نتمكن من تحميل نموذج الهولوجرام.'
            : 'Sorry, we couldn\'t load the hologram model.'}
        </p>
        <Button 
          onClick={() => window.location.reload()} 
          variant="outline" 
          className="bg-transparent text-white border-white/30 hover:bg-white/10"
        >
          {isRTL ? 'إعادة المحاولة' : 'Try Again'}
        </Button>
      </div>
    </div>
  );
};

export default HologramError;
