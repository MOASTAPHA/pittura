import { Navigation } from 'lucide-react'; // this was imported incorrectly in the old one, but wait, Navigation is a component.
import { default as NavigationComponent } from '@/components/Navigation';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';

const About = () => {
  const { isRTL } = useLanguage();

  const teamMembers = [
    {
      name: { en: 'Sarah Al-Zahrani', ar: 'سارة الزهراني' },
      role: { en: 'Museum Director', ar: 'مديرة المتحف' },
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1976&auto=format&fit=crop'
    },
    {
      name: { en: 'Ahmed Al-Nasser', ar: 'أحمد الناصر' },
      role: { en: 'Head Curator', ar: 'أمين المعرض الرئيسي' },
      image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1974&auto=format&fit=crop'
    },
    {
      name: { en: 'Layla Mahmoud', ar: 'ليلى محمود' },
      role: { en: 'Digital Experience Designer', ar: 'مصممة التجربة الرقمية' },
      image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1961&auto=format&fit=crop'
    },
    {
      name: { en: 'Khalid Al-Farsi', ar: 'خالد الفارسي' },
      role: { en: 'Technology Director', ar: 'مدير التكنولوجيا' },
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1974&auto=format&fit=crop'
    }
  ];

  return (
    <div className="bg-[#F5F0E8] min-h-screen" dir={isRTL ? 'rtl' : 'ltr'}>
      <NavigationComponent />
      
      <div className="relative bg-[#3D2E1A] h-[50vh] min-h-[400px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1594850189283-898cd8b4add7?q=80&w=2071&auto=format&fit=crop" 
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
                src="https://images.unsplash.com/photo-1549144674-042496a1c191?q=80&w=2070&auto=format&fit=crop" 
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
        
        <div>
          <div className="text-center mb-16">
            <span className="text-[#B8945F] text-xs tracking-[0.3em] uppercase font-bold mb-4 block">
              {isRTL ? 'الخبراء' : 'The Experts'}
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-[#3D2E1A] font-playfair">
              {isRTL ? 'فريق العمل' : 'Our Team'}
            </h2>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <motion.div 
                key={index}
                className="bg-white shadow-lg rounded-3xl overflow-hidden border border-[#E8E3D9] group"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="h-64 overflow-hidden relative">
                  <img 
                    src={member.image} 
                    alt={isRTL ? member.name.ar : member.name.en} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0"
                  />
                  <div className="absolute inset-0 bg-[#3D2E1A]/20 group-hover:bg-transparent transition-colors" />
                </div>
                <div className="p-6 text-center">
                  <h3 className="font-bold text-[#3D2E1A] text-xl mb-1">
                    {isRTL ? member.name.ar : member.name.en}
                  </h3>
                  <p className="text-[#B8945F] font-medium text-sm">
                    {isRTL ? member.role.ar : member.role.en}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default About;
