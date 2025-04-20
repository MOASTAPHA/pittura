
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Boxes } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Props {
  isRTL: boolean;
}

const HologramExperienceSection = ({ isRTL }: Props) => (
  <section className="py-20 bg-museum-blue/30 relative overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5"></div>
    <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2670&auto=format&fit=crop')] bg-cover bg-center opacity-10"></div>
    
    <div className="container mx-auto px-4 relative z-10">
      <div className="max-w-3xl mx-auto text-center mb-12">
        <div className="inline-block relative mb-4">
          <Boxes className="w-12 h-12 text-blue-500 mx-auto" />
          <div className="absolute -inset-4 bg-blue-500/20 blur-xl rounded-full -z-10"></div>
        </div>
        <h2 className="text-4xl font-bold mb-4">
          {isRTL ? 'تجربة الهولوجرام الحصرية' : 'Exclusive Hologram Experience'}
        </h2>
        <p className="text-lg text-muted-foreground mb-8">
          {isRTL 
            ? 'استكشف القطع الأثرية بطريقة لم يسبق لها مثيل مع تقنية الهولوجرام ثلاثية الأبعاد. شاهد التفاصيل الدقيقة وتفاعل مع التاريخ بطرق جديدة مذهلة.'
            : 'Explore artifacts like never before with 3D holographic technology. See intricate details and interact with history in amazing new ways.'
          }
        </p>
        <div className="flex justify-center gap-4 flex-wrap">
          <Button asChild className="bg-blue-500 hover:bg-blue-600 rounded-full px-6">
            <Link to="/holograms">
              {isRTL ? 'استكشاف الهولوجرام' : 'Explore Holograms'}
            </Link>
          </Button>
          <Button asChild variant="outline" className="rounded-full px-6 border-blue-300">
            <Link to="/how-it-works">
              {isRTL ? 'كيف تعمل؟' : 'How It Works'}
            </Link>
          </Button>
        </div>
      </div>
      <div className="hologram-preview relative max-w-4xl mx-auto rounded-2xl overflow-hidden shadow-2xl">
        <div className="aspect-video bg-black relative">
          <video
            autoPlay
            muted
            loop
            className="w-full h-full object-cover"
          >
            <source src="https://archive.org/download/BigBuckBunny_124/Content/big_buck_bunny_720p_surround.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20"></div>
          <div className="absolute bottom-6 left-6 right-6 text-white">
            <h3 className="text-2xl font-bold mb-2">
              {isRTL ? 'مجموعة الهولوجرام الملكية' : 'Royal Hologram Collection'}
            </h3>
            <p>
              {isRTL 
                ? 'تجربة تفاعلية ثلاثية الأبعاد للتحف الملكية النادرة'
                : '3D interactive experience of rare royal artifacts'
              }
            </p>
          </div>
          <div className="absolute top-4 right-4">
            <Button asChild variant="outline" className="bg-white/10 border-white/20 text-white hover:bg-white/20">
              <Link to="/hologram/royal-collection">
                {isRTL ? 'تجربة الآن' : 'Experience Now'}
              </Link>
            </Button>
          </div>
          <div className="absolute inset-0 hologram-overlay pointer-events-none">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5"></div>
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-500/80 to-transparent hologram-scan"></div>
            <div className="absolute inset-y-0 left-0 w-px bg-gradient-to-b from-transparent via-blue-500/80 to-transparent hologram-scan-vertical"></div>
            <div className="absolute inset-y-0 right-0 w-px bg-gradient-to-b from-transparent via-blue-500/80 to-transparent hologram-scan-vertical" style={{ animationDelay: '1s' }}></div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default HologramExperienceSection;
