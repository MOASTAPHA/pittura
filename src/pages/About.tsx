import { Navigation } from 'lucide-react'; // this was imported incorrectly in the old one, but wait, Navigation is a component.
import { default as NavigationComponent } from '@/components/Navigation';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';

const About = () => {
  const { isRTL } = useLanguage();

  

  return (
    <div className="bg-[#F5F0E8] min-h-screen" dir={isRTL ? 'rtl' : 'ltr'}>
      <NavigationComponent />
      
      <div className="relative bg-[#3D2E1A] h-[50vh] min-h-[400px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="/images/heritage-museum.png" 
            alt="Museum hall" 
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#F5F0E8] to-transparent" />
        </div>
        <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
          <span className="text-[#E8C97A] text-xs tracking-[0.4em] uppercase font-bold mb-4 block">
            {isRTL ? 'قصتنا' : 'Our Story'}
          </span>
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 font-playfair">
            {isRTL ? 'عن المتحف' : 'About the Museum'}
          </h1>
          <p className="text-xl text-white/80 font-light">
            {isRTL ? 'حفظ الذاكرة الوطنية في عالم رقمي' : 'Preserving national memory in a digital world'}
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center mb-24">
          <motion.div 
            className="order-2 md:order-1"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-[#3D2E1A] mb-6 font-playfair">
              {isRTL ? 'رؤيتنا ومهمتنا' : 'Our Vision & Mission'}
            </h2>
            <div className="w-16 h-1 bg-[#B8945F] mb-8 rounded-full" />
            <div className="space-y-6 text-[#5C4A2E] text-lg leading-relaxed">
              <p>
                {isRTL 
                  ? 'بيتورا هو متحف رقمي رائد مكرس للحفاظ على التراث الثقافي للمملكة العربية السعودية من خلال التكنولوجيا المبتكرة. نحن نجمع بين التقاليد والابتكار لجعل كنوزنا الثقافية متاحة للعالم أجمع.'
                  : 'Pittura is a pioneering digital museum dedicated to preserving Saudi Arabia\'s cultural heritage through innovative technology. We merge tradition and innovation to make our cultural treasures accessible to the entire world.'}
              </p>
              <p>
                {isRTL 
                  ? 'من خلال الجولات الافتراضية بزاوية 360 درجة، والتجارب الغامرة، والمحتوى الموثق بعناية، نحن نخلق طرقًا جديدة للتفاعل مع تاريخنا. هدفنا هو إلهام الأجيال القادمة وتعزيز التقدير العالمي للتراث السعودي الغني.'
                  : 'Through 360-degree virtual tours, immersive experiences, and carefully curated content, we create new ways to engage with our history. Our goal is to inspire future generations and foster global appreciation for Saudi Arabia\'s rich heritage.'}
              </p>
            </div>
          </motion.div>
          
          <motion.div 
            className="order-1 md:order-2"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="rounded-3xl overflow-hidden shadow-2xl relative">
              <img 
                src="/images/heritage-museum.png" 
                alt="Museum vision" 
                className="w-full h-[500px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#3D2E1A]/60 to-transparent" />
            </div>
          </motion.div>
        </div>

        <motion.div 
          className="mb-24 text-center max-w-3xl mx-auto bg-white p-12 rounded-[3rem] shadow-xl border border-[#E8E3D9]"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-[#3D2E1A] mb-6 font-playfair">
            {isRTL ? 'فكرة المتحف' : 'The Concept'}
          </h2>
          <p className="text-[#5C4A2E] text-lg leading-relaxed">
            {isRTL 
              ? 'تأسس بيتورا ليكون جسراً يربط عبق الماضي بتقنيات المستقبل. باستخدام أحدث تقنيات التصوير البانورامي، قمنا بتوثيق أعظم المعالم في المملكة لتقديم تجربة سياحية وثقافية غير مسبوقة.'
              : 'Pittura was established to be a bridge connecting the fragrance of the past with the technologies of the future. Using the latest panoramic imaging techniques, we have documented the Kingdom\'s greatest landmarks to provide an unprecedented tourism and cultural experience.'}
          </p>
        </motion.div>
        
        {/* Team section removed as requested */}
      </div>
      
      <Footer />
    </div>
  );
};

export default About;
