
import { Button } from '@/components/ui/button';

interface ModelErrorProps {
  isRTL?: boolean;
  fallbackImageUrl: string;
}

const ModelError = ({ isRTL = false, fallbackImageUrl }: ModelErrorProps) => {
  return (
    <div className={`bg-white rounded-lg shadow-md overflow-hidden ${isRTL ? 'rtl' : ''}`}>
      <div className="p-4 border-b">
        <h3 className="font-medium">
          {isRTL ? 'عرض ثلاثي الأبعاد' : '3D View'}
        </h3>
      </div>
      <div className="p-6 text-center">
        <img 
          src={fallbackImageUrl} 
          alt={isRTL ? "صورة بديلة" : "Fallback image"}
          className="mx-auto mb-4 max-h-[300px] rounded-lg object-cover"
        />
        <p className="text-muted-foreground mb-4">
          {isRTL 
            ? 'عذراً، لم نتمكن من تحميل النموذج ثلاثي الأبعاد.'
            : 'Sorry, we couldn\'t load the 3D model.'}
        </p>
        <Button onClick={() => window.location.reload()}>
          {isRTL ? 'إعادة المحاولة' : 'Try Again'}
        </Button>
      </div>
    </div>
  );
};

export default ModelError;
