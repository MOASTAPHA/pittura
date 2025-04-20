
import { Button } from '@/components/ui/button';
import { Download, Info, Share } from 'lucide-react';

interface HologramInstructionsProps {
  isRTL?: boolean;
}

const HologramInstructions = ({ isRTL = false }: HologramInstructionsProps) => {
  return (
    <div className="bg-black/40 backdrop-blur-md border border-blue-500/20 rounded-2xl p-6 sticky top-20">
      <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
        <Info className="w-5 h-5 text-blue-400" />
        {isRTL ? 'كيفية استخدام تجربة الهولوجرام' : 'How to Use Hologram Experience'}
      </h3>
      
      <div className="space-y-6">
        <div className="flex gap-4">
          <div className="bg-blue-500/20 text-blue-300 w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0">1</div>
          <div>
            <h4 className="font-semibold text-blue-200 mb-1">
              {isRTL ? 'استكشف النموذج ثلاثي الأبعاد' : 'Explore the 3D Model'}
            </h4>
            <p className="text-sm text-blue-100/80">
              {isRTL ? 'انقر واسحب لتدوير النموذج. استخدم عجلة الماوس للتكبير والتصغير.' : 'Click and drag to rotate the model. Use the mouse wheel to zoom in and out.'}
            </p>
          </div>
        </div>
        
        <div className="flex gap-4">
          <div className="bg-blue-500/20 text-blue-300 w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0">2</div>
          <div>
            <h4 className="font-semibold text-blue-200 mb-1">
              {isRTL ? 'غيّر طريقة العرض' : 'Change View Mode'}
            </h4>
            <p className="text-sm text-blue-100/80">
              {isRTL ? 'بدّل بين وضع العرض العادي ووضع الهولوغرام لتجارب مختلفة.' : 'Switch between standard view and hologram mode for different experiences.'}
            </p>
          </div>
        </div>
        
        <div className="flex gap-4">
          <div className="bg-blue-500/20 text-blue-300 w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0">3</div>
          <div>
            <h4 className="font-semibold text-blue-200 mb-1">
              {isRTL ? 'جرّب في الواقع المعزز' : 'Try in Augmented Reality'}
            </h4>
            <p className="text-sm text-blue-100/80">
              {isRTL ? 'على الأجهزة المدعومة، يمكنك تجربة النموذج في الواقع المعزز في مساحتك الخاصة.' : 'On supported devices, you can experience the model in augmented reality in your own space.'}
            </p>
          </div>
        </div>
      </div>
      
      <div className="mt-8 space-y-4">
        <Button className="w-full bg-blue-600 hover:bg-blue-700 flex items-center gap-2 rounded-lg">
          <div className="w-4 h-4" />
          {isRTL ? 'عرض في الواقع المعزز' : 'View in AR'}
        </Button>
        
        <Button variant="outline" className="w-full bg-transparent border-blue-500/30 hover:bg-blue-500/20 text-white flex items-center gap-2 rounded-lg">
          <Download className="w-4 h-4" />
          {isRTL ? 'تنزيل النموذج' : 'Download Model'}
        </Button>
        
        <Button variant="outline" className="w-full bg-transparent border-blue-500/30 hover:bg-blue-500/20 text-white flex items-center gap-2 rounded-lg">
          <Share className="w-4 h-4" />
          {isRTL ? 'مشاركة التجربة' : 'Share Experience'}
        </Button>
      </div>
    </div>
  );
};

export default HologramInstructions;
