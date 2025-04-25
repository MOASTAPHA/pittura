
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import SimpleInteractiveViewer from '@/components/SimpleInteractiveViewer';
import { motion } from 'framer-motion';

const InteractiveViewer = () => {
  const [isRTL, setIsRTL] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    setIsRTL(params.get('lang') === 'ar');
  }, [location]);

  return (
    <div className={isRTL ? 'rtl' : ''}>
      <Navigation isRTL={isRTL} />
      
      <div className="relative bg-gradient-to-r from-museum-blue/30 via-museum-sand/40 to-museum-olive/30 h-64 flex items-center justify-center">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1686666208056-08e35a12bf89?q=80&w=3087&auto=format&fit=crop"
            alt="Interactive artifacts" 
            className="w-full h-full object-cover opacity-30"
          />
        </div>
        <div className="relative z-10 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-2">
            {isRTL ? 'العرض التفاعلي' : 'Interactive Viewer'}
          </h1>
          <p className="text-lg text-muted-foreground">
            {isRTL ? 'استكشف القطع الأثرية بطرق جديدة' : 'Explore artifacts in new ways'}
          </p>
        </div>
      </div>

      <div className="museum-container py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h2 className="text-3xl font-bold">
              {isRTL ? 'تجربة تفاعلية بدون لمس' : 'Touchless Interactive Experience'}
            </h2>
            <p className="text-lg">
              {isRTL 
                ? 'تتيح لك هذه التقنية المبتكرة استكشاف القطع الأثرية الرقمية بالإيماءات فقط، دون الحاجة إلى لمس أي شاشة.'
                : 'This innovative technology allows you to explore digital artifacts using only gestures, without needing to touch any screen.'}
            </p>
            <p>
              {isRTL
                ? 'يمكنك تدوير وتكبير وفحص النموذج ثلاثي الأبعاد بحرية تامة، مما يوفر تجربة غامرة تحاكي التفاعل مع القطع الأثرية الحقيقية.'
                : 'You can rotate, zoom, and examine the 3D model with complete freedom, providing an immersive experience that simulates interacting with real artifacts.'}
            </p>
            <div className="flex flex-col space-y-4">
              <div className="flex items-center space-x-2">
                <div className="bg-blue-500 rounded-full h-10 w-10 flex items-center justify-center text-white">1</div>
                <p className="font-medium">
                  {isRTL ? 'انقر على زر الإيماءات لتفعيل وضع التحكم بالإشارات' : 'Click the gesture button to activate gesture control mode'}
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <div className="bg-blue-500 rounded-full h-10 w-10 flex items-center justify-center text-white">2</div>
                <p className="font-medium">
                  {isRTL ? 'حرك يدك أفقياً أمام الكاميرا لتدوير النموذج' : 'Move your hand horizontally in front of the camera to rotate the model'}
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <div className="bg-blue-500 rounded-full h-10 w-10 flex items-center justify-center text-white">3</div>
                <p className="font-medium">
                  {isRTL ? 'حرك يدك عمودياً لتكبير أو تصغير النموذج' : 'Move your hand vertically to zoom in or out of the model'}
                </p>
              </div>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <SimpleInteractiveViewer
              modelUrl="https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/Vase/glTF/Vase.gltf"
              title={isRTL ? "إناء عصري ثلاثي الأبعاد" : "Modern Vase 3D Model"}
              isRTL={isRTL}
            />
          </motion.div>
        </div>
        
        <div className="bg-museum-sand/30 rounded-2xl p-8 md:p-12 mb-16">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <h2 className="text-3xl font-bold mb-4">
              {isRTL ? 'تكنولوجيا المستقبل' : 'Future Technology'}
            </h2>
            <p className="text-lg">
              {isRTL
                ? 'نحن نستخدم أحدث التقنيات لإنشاء تجارب رقمية غامرة تتيح للزوار التفاعل مع المعروضات بطرق جديدة ومبتكرة.'
                : 'We use the latest technologies to create immersive digital experiences that allow visitors to interact with exhibits in new and innovative ways.'}
            </p>
          </div>
        </div>
      </div>
      
      <Footer isRTL={isRTL} />
    </div>
  );
};

export default InteractiveViewer;
