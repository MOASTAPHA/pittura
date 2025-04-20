
import { Button } from '@/components/ui/button';
import { ArrowRight, Share, Download } from 'lucide-react';

interface HologramHeaderProps {
  isRTL?: boolean;
  artifactTitle?: {
    en: string;
    ar: string;
  };
}

const HologramHeader = ({ isRTL = false, artifactTitle }: HologramHeaderProps) => {
  return (
    <div className="relative py-16 px-4 md:py-24">
      <div className="absolute inset-0 bg-gradient-to-b from-blue-900/30 to-black/80 z-0"></div>
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2670&auto=format&fit=crop')] bg-cover bg-center opacity-10 z-0"></div>
      
      <div className="container mx-auto relative z-10">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-12 h-12 bg-blue-500/20 backdrop-blur-md rounded-full flex items-center justify-center">
            <div className="w-6 h-6 text-blue-400" />
          </div>
          <h1 className="text-3xl md:text-5xl font-bold">
            {artifactTitle 
              ? (isRTL ? `${artifactTitle.ar} - تجربة الهولوجرام` : `${artifactTitle.en} - Hologram Experience`) 
              : (isRTL ? 'تجربة الهولوجرام' : 'Hologram Experience')}
          </h1>
        </div>
        
        <p className="max-w-2xl text-lg text-blue-100/80 mb-8">
          {isRTL 
            ? 'استكشف القطع الأثرية بأسلوب هولوجرامي ثلاثي الأبعاد، وتفاعل مع التفاصيل الدقيقة بطريقة غير مسبوقة.'
            : 'Explore artifacts in 3D holographic style, interacting with intricate details in unprecedented ways.'}
        </p>
        
        <div className="flex gap-4 flex-wrap">
          <Button className="bg-blue-600 hover:bg-blue-700 rounded-full">
            {isRTL ? 'مشاركة التجربة' : 'Share Experience'}
          </Button>
          <Button variant="outline" className="bg-white/5 border-white/20 text-white hover:bg-white/10 rounded-full">
            {isRTL ? 'تنزيل النموذج' : 'Download Model'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HologramHeader;
