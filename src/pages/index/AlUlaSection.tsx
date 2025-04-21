
import { useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight, Play } from 'lucide-react';
import { Link } from 'react-router-dom';
import HologramViewer from '@/components/HologramViewer';

interface AlUlaSectionProps {
  isRTL: boolean;
}

const AlUlaSection = ({ isRTL }: AlUlaSectionProps) => {
  const [showVideo, setShowVideo] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  
  const parallaxY = useTransform(scrollYProgress, [0, 1], [100, -100]);
  
  return (
    <section 
      ref={sectionRef}
      className="py-24 bg-gradient-to-b from-[#14100B] to-[#1E160F] text-white overflow-hidden relative"
    >
      {/* Background effects */}
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1426604966848-d7adac402bff?q=80&w=3360&auto=format&fit=crop')] bg-cover bg-center opacity-20 mix-blend-overlay"></div>
      <motion.div 
        className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1492321936769-b49830bc1d1e?q=80&w=3360&auto=format&fit=crop')] bg-cover"
        style={{ y: parallaxY }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 0.15 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      ></motion.div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-5xl mx-auto text-center mb-20">
          <motion.h2 
            className="text-sm uppercase tracking-widest text-amber-200/80 mb-4 font-light"
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            {isRTL ? 'الوجهة السعودية الأسطورية' : 'Legendary Saudi Destination'}
          </motion.h2>
          <motion.h3 
            className="text-5xl md:text-7xl font-playfair font-bold mb-8 text-amber-50"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            viewport={{ once: true }}
          >
            {isRTL ? 'العُلا' : 'AlUla'}
          </motion.h3>
          <motion.p 
            className="text-xl leading-relaxed text-amber-50/80 mb-10 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: -30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            viewport={{ once: true }}
          >
            {isRTL 
              ? 'مدينة تاريخية تحمل إرثاً يمتد لآلاف السنين، تتجلى فيها روعة الحضارات القديمة وسط مناظر طبيعية خلابة. صحراء ذهبية، صخور عملاقة، ومواقع أثرية نادرة تنتظرك في رحلة استثنائية عبر الزمن.'
              : 'A historic city with a legacy spanning thousands of years, where ancient civilizations shine amidst breathtaking landscapes. Golden deserts, massive rock formations, and rare archaeological sites await you on an extraordinary journey through time.'}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6 }}
            viewport={{ once: true }}
            className="flex flex-wrap justify-center gap-4"
          >
            <Link to="/destinations/alula">
              <Button 
                variant="outline" 
                className="rounded-full px-8 py-6 border-amber-200/50 text-amber-200 hover:bg-amber-500/20 hover:border-amber-200 group"
              >
                {isRTL ? 'استكشف العلا' : 'Explore AlUla'}
                <ArrowRight className="ml-2 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
            <Button 
              variant="ghost" 
              className="rounded-full px-8 py-6 bg-amber-500/10 hover:bg-amber-500/20 text-amber-200 group"
              onClick={() => setShowVideo(true)}
            >
              <Play className="mr-2 h-5 w-5 fill-amber-200" />
              {isRTL ? 'شاهد الفيلم' : 'Watch Film'}
            </Button>
          </motion.div>
        </div>
        
        {/* Key features with 3D element */}
        <div className="flex flex-col md:flex-row items-center gap-12 mt-20">
          <motion.div 
            className="w-full md:w-1/2"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {[
                {
                  title: isRTL ? 'مدائن صالح' : 'Hegra (Mada\'in Saleh)',
                  description: isRTL 
                    ? 'موقع تراث عالمي يعود للحضارة النبطية'
                    : 'UNESCO World Heritage site with Nabataean tombs'
                },
                {
                  title: isRTL ? 'جبل الفيل' : 'Elephant Rock',
                  description: isRTL 
                    ? 'تكوين صخري طبيعي يشبه الفيل'
                    : 'Natural rock formation resembling an elephant'
                },
                {
                  title: isRTL ? 'قطار الحجاز' : 'Hijaz Railway',
                  description: isRTL 
                    ? 'محطة تاريخية من العصر العثماني'
                    : 'Historic Ottoman-era railway station'
                },
                {
                  title: isRTL ? 'واحة العلا' : 'AlUla Oasis',
                  description: isRTL 
                    ? 'واحة خضراء تحيط بها الجبال الصحراوية'
                    : 'Green oasis surrounded by desert mountains'
                }
              ].map((feature, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="glassmorphism-card bg-amber-500/5 backdrop-blur-sm border border-amber-500/10 rounded-xl p-6 hover:bg-amber-500/10 transition-all"
                >
                  <h4 className="text-xl font-playfair font-semibold mb-2 text-amber-200">{feature.title}</h4>
                  <p className="text-amber-50/70">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
          
          <motion.div 
            className="w-full md:w-1/2 h-[400px]"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <div className="hologram-artifact">
              <HologramViewer
                modelUrl="https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/DamagedHelmet/glTF/DamagedHelmet.gltf"
                isRTL={isRTL}
              />
            </div>
          </motion.div>
        </div>
        
        {/* Quote */}
        <motion.div 
          className="max-w-4xl mx-auto mt-24 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          <blockquote className="text-2xl md:text-3xl font-playfair italic text-amber-50/90 leading-relaxed">
            {isRTL 
              ? '"العلا ليست مجرد وجهة سياحية، بل هي رحلة عبر الزمن تكشف أسرار الحضارات القديمة وتربط الماضي بالحاضر."'
              : '"AlUla is not merely a tourist destination, but a journey through time that unveils the secrets of ancient civilizations and connects the past with the present."'}
          </blockquote>
          <p className="mt-6 text-amber-200/80">
            {isRTL ? '— مجلة التراث السعودي' : '— Saudi Heritage Magazine'}
          </p>
        </motion.div>
      </div>
      
      {/* Video modal */}
      {showVideo && (
        <motion.div 
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="relative w-full max-w-4xl">
            <button 
              className="absolute top-4 right-4 text-white/80 hover:text-white bg-black/20 rounded-full p-2"
              onClick={() => setShowVideo(false)}
            >
              ✕
            </button>
            <div className="bg-black aspect-video rounded-lg overflow-hidden">
              <div className="flex items-center justify-center h-full">
                <p className="text-white/60">Video content would appear here</p>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </section>
  );
};

export default AlUlaSection;
