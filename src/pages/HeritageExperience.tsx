
import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { ArrowDown, ArrowRight, ExternalLink, Headset } from 'lucide-react';
import ArtifactViewer3D from '@/components/ArtifactViewer3D';
import HologramViewer from '@/components/HologramViewer';
import { Link } from 'react-router-dom';

const MODEL_URLS = {
  VASE: "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/Vase/glTF/Vase.gltf",
  DAMAGE_HELMET: "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/DamagedHelmet/glTF/DamagedHelmet.gltf",
  WATER_VESSEL: "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/AntiqueCamera/glTF/AntiqueCamera.gltf"
};

const HeritageExperience = () => {
  const [isRTL, setIsRTL] = useState(false);
  const [currentSection, setCurrentSection] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const sections = [
    { id: 'hero', title: { en: 'Saudi Heritage', ar: 'التراث السعودي' } },
    { id: 'artifacts', title: { en: 'Royal Artifacts', ar: 'القطع الأثرية الملكية' } },
    { id: 'architecture', title: { en: 'Historic Architecture', ar: 'العمارة التاريخية' } },
    { id: 'crafts', title: { en: 'Traditional Crafts', ar: 'الحرف التقليدية' } },
    { id: 'experience', title: { en: 'Virtual Experience', ar: 'التجربة الافتراضية' } },
  ];

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const backgroundOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const textY = useTransform(scrollYProgress, [0, 0.2], [0, -50]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      const sectionIndex = Math.floor(scrollPosition / windowHeight);
      
      if (sectionIndex !== currentSection && sectionIndex < sections.length) {
        setCurrentSection(sectionIndex);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [currentSection, sections.length]);

  const scrollToNextSection = () => {
    const nextSection = currentSection + 1;
    if (nextSection < sections.length) {
      window.scrollTo({
        top: nextSection * window.innerHeight,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className={`${isRTL ? 'rtl' : ''}`} ref={containerRef}>
      <Navigation isRTL={isRTL} />
      
      {/* Vertical dots navigation */}
      <div className="fixed right-8 top-1/2 transform -translate-y-1/2 z-50">
        <div className="flex flex-col items-center gap-4">
          {sections.map((section, index) => (
            <button
              key={section.id}
              onClick={() => {
                window.scrollTo({
                  top: index * window.innerHeight,
                  behavior: 'smooth'
                });
              }}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                currentSection === index 
                  ? 'bg-primary w-4 h-4' 
                  : 'bg-white/30 hover:bg-white/50'
              }`}
              aria-label={isRTL ? section.title.ar : section.title.en}
            />
          ))}
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center bg-[url('https://images.unsplash.com/photo-1466442929976-97f336a657be?q=80&w=2834&auto=format&fit=crop')] bg-cover bg-center">
        <motion.div 
          className="absolute inset-0 bg-black/50"
          style={{ opacity: backgroundOpacity }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-black/80" />
        
        <motion.div 
          className="relative z-10 text-center max-w-4xl mx-auto px-4"
          style={{ y: textY }}
        >
          <motion.h1 
            className="text-5xl md:text-7xl font-bold mb-6 text-white font-playfair"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {isRTL ? 'اكتشف عراقة المملكة' : 'Discover The Kingdom\'s Legacy'}
          </motion.h1>
          
          <motion.p 
            className="text-xl md:text-2xl mb-8 text-white/90"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {isRTL 
              ? 'استكشف تراث المملكة العربية السعودية الغني عبر القرون في تجربة رقمية آسرة'
              : 'Explore Saudi Arabia\'s rich heritage across centuries in an immersive digital experience'
            }
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <Button onClick={scrollToNextSection} className="rounded-full px-8 py-6 bg-primary text-white hover:bg-primary/90 group">
              {isRTL ? 'استكشف المتحف' : 'Explore the Museum'}
              <ArrowDown className="ml-2 group-hover:translate-y-1 transition-transform" />
            </Button>
          </motion.div>
        </motion.div>
      </section>

      {/* Royal Artifacts Section */}
      <section className="relative h-screen flex items-center justify-center bg-[#1a1a1a]">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1586024486164-ce9b3d87e09f?q=80&w=2564&auto=format&fit=crop')] bg-cover bg-center opacity-10" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
        
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center gap-12 z-10">
          <div className="w-full md:w-1/2">
            <motion.h2 
              className="text-4xl md:text-5xl font-bold mb-6 text-white"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              {isRTL ? 'القطع الأثرية الملكية' : 'Royal Artifacts'}
            </motion.h2>
            
            <motion.p 
              className="text-lg text-white/80 mb-8 leading-relaxed"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              {isRTL 
                ? 'اكتشف المجموعة الفريدة من القطع الأثرية الملكية التي تعود تاريخها إلى عصور مختلفة في المملكة. من المجوهرات المرصعة بالأحجار الكريمة إلى الأواني المصنوعة يدويًا، كل قطعة تحكي قصة من تراثنا الغني.'
                : 'Discover a unique collection of royal artifacts dating back to different eras in the Kingdom. From jewel-encrusted ornaments to handcrafted vessels, each piece tells a story of our rich heritage.'}
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <Link to="/artifacts">
                <Button variant="outline" className="rounded-full px-6 py-2 border-primary text-primary hover:bg-primary hover:text-white">
                  {isRTL ? 'استكشف المزيد' : 'Explore More'}
                  <ArrowRight className="ml-2" />
                </Button>
              </Link>
            </motion.div>
          </div>
          
          <div className="w-full md:w-1/2 h-[400px]">
            <motion.div 
              className="h-full w-full"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <ArtifactViewer3D 
                modelUrl={MODEL_URLS.VASE} 
                isRTL={isRTL}
              />
            </motion.div>
          </div>
        </div>
        
        <motion.div 
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
        >
          <Button 
            variant="ghost" 
            onClick={scrollToNextSection}
            className="rounded-full text-white/70 hover:text-white hover:bg-white/10"
          >
            <ArrowDown className="w-6 h-6" />
          </Button>
        </motion.div>
      </section>

      {/* Historic Architecture Section */}
      <section className="relative h-screen flex items-center justify-center bg-[#1f1a15]">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1492321936769-b49830bc1d1e?q=80&w=2671&auto=format&fit=crop')] bg-cover bg-center opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-l from-black/80 via-black/50 to-transparent" />
        
        <div className="container mx-auto px-4 flex flex-col-reverse md:flex-row items-center gap-12 z-10">
          <div className="w-full md:w-1/2 h-[400px]">
            <motion.div 
              className="relative h-full w-full overflow-hidden rounded-lg"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <img 
                src="https://images.unsplash.com/photo-1548786811-dd6e453ccca7?q=80&w=2942&auto=format&fit=crop" 
                alt="Historic Architecture" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-6">
                <Button variant="outline" className="rounded-full bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white/20">
                  <Headset className="mr-2 h-4 w-4" />
                  {isRTL ? 'جولة افتراضية 360°' : '360° Virtual Tour'}
                </Button>
              </div>
            </motion.div>
          </div>
          
          <div className="w-full md:w-1/2">
            <motion.h2 
              className="text-4xl md:text-5xl font-bold mb-6 text-white"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              {isRTL ? 'العمارة التاريخية' : 'Historic Architecture'}
            </motion.h2>
            
            <motion.p 
              className="text-lg text-white/80 mb-8 leading-relaxed"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              {isRTL 
                ? 'استكشف روائع العمارة السعودية التاريخية، من المدن القديمة مثل الدرعية والعلا، إلى المباني التقليدية في مختلف مناطق المملكة. تعرف على التقنيات المعمارية الفريدة التي تطورت لتناسب البيئة الصحراوية والثقافة المحلية.'
                : 'Explore the wonders of Saudi historical architecture, from ancient cities like Diriyah and AlUla, to traditional buildings across the Kingdom's regions. Discover the unique architectural techniques that evolved to suit the desert environment and local culture.'}
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <Link to="/360-experience">
                <Button variant="outline" className="rounded-full px-6 py-2 border-primary text-primary hover:bg-primary hover:text-white">
                  {isRTL ? 'استكشف المواقع التاريخية' : 'Explore Historic Sites'}
                  <ArrowRight className="ml-2" />
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
        
        <motion.div 
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
        >
          <Button 
            variant="ghost" 
            onClick={scrollToNextSection}
            className="rounded-full text-white/70 hover:text-white hover:bg-white/10"
          >
            <ArrowDown className="w-6 h-6" />
          </Button>
        </motion.div>
      </section>

      {/* Traditional Crafts Section */}
      <section className="relative h-screen flex items-center justify-center bg-[#171612]">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1486718448742-163732cd1544?q=80&w=2940&auto=format&fit=crop')] bg-cover bg-center opacity-10" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
        
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center gap-12 z-10">
          <div className="w-full md:w-1/2">
            <motion.h2 
              className="text-4xl md:text-5xl font-bold mb-6 text-white"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              {isRTL ? 'الحرف التقليدية' : 'Traditional Crafts'}
            </motion.h2>
            
            <motion.p 
              className="text-lg text-white/80 mb-8 leading-relaxed"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              {isRTL 
                ? 'استكشف الحرف اليدوية التقليدية التي تعكس التنوع الثقافي للمملكة. من النسيج والسدو إلى الخزف والحفر على الخشب، كل حرفة تمثل تقاليد متوارثة عبر الأجيال وتعكس مهارات حرفية استثنائية.'
                : 'Explore traditional handicrafts that reflect the Kingdom's cultural diversity. From textiles and Al-Sadu weaving to pottery and woodcarving, each craft represents traditions passed down through generations and showcases exceptional artisanal skills.'}
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <Link to="/artifacts?category=crafts">
                <Button variant="outline" className="rounded-full px-6 py-2 border-primary text-primary hover:bg-primary hover:text-white">
                  {isRTL ? 'اكتشف الحرف التقليدية' : 'Discover Traditional Crafts'}
                  <ArrowRight className="ml-2" />
                </Button>
              </Link>
            </motion.div>
          </div>
          
          <div className="w-full md:w-1/2 h-[400px]">
            <motion.div 
              className="h-full w-full"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <ArtifactViewer3D 
                modelUrl={MODEL_URLS.WATER_VESSEL} 
                isRTL={isRTL}
              />
            </motion.div>
          </div>
        </div>
        
        <motion.div 
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
        >
          <Button 
            variant="ghost" 
            onClick={scrollToNextSection}
            className="rounded-full text-white/70 hover:text-white hover:bg-white/10"
          >
            <ArrowDown className="w-6 h-6" />
          </Button>
        </motion.div>
      </section>

      {/* Hologram Experience Section */}
      <section className="relative h-screen flex items-center justify-center bg-[#0a0a14]">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2670&auto=format&fit=crop')] bg-cover bg-center opacity-10" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
        
        <div className="container mx-auto px-4 flex flex-col-reverse md:flex-row items-center gap-12 z-10">
          <div className="w-full md:w-1/2 h-[400px]">
            <motion.div 
              className="h-full w-full relative"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <HologramViewer
                modelUrl={MODEL_URLS.DAMAGE_HELMET}
                isHologramActive={true}
              />
              <div className="hologram-effect rounded-lg">
                <div className="hologram-scan bg-blue-400/30"></div>
                <div className="hologram-scan-vertical bg-blue-400/30"></div>
              </div>
            </motion.div>
          </div>
          
          <div className="w-full md:w-1/2">
            <motion.h2 
              className="text-4xl md:text-5xl font-bold mb-6 text-white"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              {isRTL ? 'تجربة الهولوجرام' : 'Hologram Experience'}
            </motion.h2>
            
            <motion.p 
              className="text-lg text-white/80 mb-8 leading-relaxed"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              {isRTL 
                ? 'انغمس في تجربة رقمية فريدة من نوعها مع تقنية الهولوجرام المتطورة التي تتيح لك رؤية القطع الأثرية بأبعاد ثلاثية واقعية. استكشف التفاصيل الدقيقة للتحف التاريخية من جميع الزوايا في هذه التجربة التفاعلية المميزة.'
                : 'Immerse yourself in a unique digital experience with advanced hologram technology that allows you to see artifacts in realistic 3D. Explore the intricate details of historical treasures from all angles in this distinctive interactive experience.'}
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <Link to="/holograms">
                <Button className="rounded-full px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white">
                  {isRTL ? 'جرب تقنية الهولوجرام' : 'Try Hologram Technology'}
                  <ArrowRight className="ml-2" />
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
        
        <motion.div 
          className="absolute bottom-24 left-1/2 transform -translate-x-1/2 z-10 flex flex-col items-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
        >
          <a href="https://shebara.sa" target="_blank" rel="noopener noreferrer" className="text-white/80 hover:text-white flex items-center gap-2 text-sm">
            {isRTL ? 'مستوحى من موقع شبارة' : 'Inspired by Shebara.sa'}
            <ExternalLink className="w-4 h-4" />
          </a>
        </motion.div>
      </section>

      <Footer isRTL={isRTL} />
    </div>
  );
};

export default HeritageExperience;
