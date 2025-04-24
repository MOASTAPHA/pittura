
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';

const About = () => {
  const [isRTL, setIsRTL] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    setIsRTL(params.get('lang') === 'ar');
  }, [location]);

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
    <div className={isRTL ? 'rtl' : ''}>
      <Navigation isRTL={isRTL} />
      
      <div className="relative bg-gradient-to-r from-museum-blue/30 via-museum-sand/40 to-museum-olive/30 h-64 flex items-center justify-center">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1594850189283-898cd8b4add7?q=80&w=2071&auto=format&fit=crop" 
            alt="Museum hall" 
            className="w-full h-full object-cover opacity-30"
          />
        </div>
        <div className="relative z-10 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-2">
            {isRTL ? 'عن المتحف' : 'About the Museum'}
          </h1>
          <p className="text-lg text-muted-foreground">
            {isRTL ? 'تجربة فنية رقمية لا مثيل لها' : 'A unique digital art experience'}
          </p>
        </div>
      </div>

      <div className="museum-container py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16">
          <motion.div 
            className="order-2 md:order-1"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="section-title">
              {isRTL ? 'رؤيتنا ومهمتنا' : 'Our Vision & Mission'}
            </h2>
            <p className="mb-4 text-lg">
              {isRTL 
                ? 'بيتورا هو متحف رقمي مكرس للحفاظ على التراث الثقافي للمملكة العربية السعودية من خلال التكنولوجيا المبتكرة. نحن نجمع بين التقاليد والابتكار لجعل كنوزنا الثقافية متاحة للجميع.'
                : 'Pittura is a digital museum dedicated to preserving Saudi Arabia\'s cultural heritage through innovative technology. We merge tradition and innovation to make our cultural treasures accessible to everyone.'}
            </p>
            <p>
              {isRTL 
                ? 'من خلال تجارب الواقع الافتراضي، والعروض التوضيحية ثلاثية الأبعاد، والهولوجرام التفاعلي، نحن نخلق طرقًا جديدة للتفاعل مع تاريخنا. هدفنا هو إلهام الأجيال القادمة وتعزيز التقدير العالمي للتراث السعودي الغني.'
                : 'Through virtual reality experiences, 3D demonstrations, and interactive holograms, we create new ways to engage with our history. Our goal is to inspire future generations and foster global appreciation for Saudi Arabia\'s rich heritage.'}
            </p>
          </motion.div>
          
          <motion.div 
            className="order-1 md:order-2"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="rounded-xl overflow-hidden shadow-xl">
              <img 
                src="https://images.unsplash.com/photo-1603739903239-8b6e64c3b185?q=80&w=2071&auto=format&fit=crop" 
                alt="Museum vision" 
                className="w-full h-72 object-cover"
              />
            </div>
          </motion.div>
        </div>

        <motion.div 
          className="mb-16 text-center max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold mb-6 inline-block">
            {isRTL ? 'فكرة المتحف' : 'The Museum Concept'}
          </h2>
          <p className="text-lg mb-8">
            {isRTL 
              ? 'تأسس بيتورا في عام 2023 كجزء من مبادرة رؤية 2030 للمملكة العربية السعودية. يهدف المتحف إلى أن يكون جسرًا بين الماضي والمستقبل، واستخدام التكنولوجيا المتطورة لإحياء التراث السعودي.'
              : 'Pittura was established in 2023 as part of Saudi Arabia\'s Vision 2030 initiative. The museum aims to be a bridge between the past and the future, using advanced technology to bring Saudi heritage to life.'}
          </p>
        </motion.div>
        
        <div className="mb-16">
          <h2 className="section-title text-center mb-10">
            {isRTL ? 'فريقنا' : 'Our Team'}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <motion.div 
                key={index}
                className="bg-white dark:bg-card shadow-md rounded-xl overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="h-60 overflow-hidden">
                  <img 
                    src={member.image} 
                    alt={isRTL ? member.name.ar : member.name.en} 
                    className="w-full h-full object-cover transition-all duration-500 hover:scale-110"
                  />
                </div>
                <div className="p-4 text-center">
                  <h3 className="font-bold text-lg">
                    {isRTL ? member.name.ar : member.name.en}
                  </h3>
                  <p className="text-muted-foreground">
                    {isRTL ? member.role.ar : member.role.en}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="bg-museum-sand/30 rounded-2xl p-8 md:p-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h2 className="section-title">
                {isRTL ? 'تواصل معنا' : 'Contact Us'}
              </h2>
              <div className="space-y-4">
                <p>
                  <strong>{isRTL ? 'العنوان:' : 'Address:'}</strong> {isRTL ? 'طريق الملك عبدالله، حي السليمانية، الرياض، المملكة العربية السعودية' : 'King Abdullah Road, Sulaymaniyah District, Riyadh, Saudi Arabia'}
                </p>
                <p>
                  <strong>{isRTL ? 'البريد الإلكتروني:' : 'Email:'}</strong> info@pittura-museum.sa
                </p>
                <p>
                  <strong>{isRTL ? 'الهاتف:' : 'Phone:'}</strong> +966 11 234 5678
                </p>
                <p>
                  <strong>{isRTL ? 'ساعات العمل:' : 'Opening Hours:'}</strong> {isRTL ? 'من الأحد إلى الخميس: 9 صباحًا - 9 مساءً، الجمعة: 2 ظهرًا - 9 مساءً' : 'Sunday-Thursday: 9AM - 9PM, Friday: 2PM - 9PM'}
                </p>
              </div>
            </div>
            <div className="h-64 rounded-xl overflow-hidden">
              <div className="w-full h-full bg-gray-200">
                {/* Here would normally be a map component */}
                <div className="flex items-center justify-center h-full bg-museum-olive/20">
                  <p className="text-center">
                    {isRTL ? 'خريطة الموقع' : 'Interactive Map Coming Soon'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Footer isRTL={isRTL} />
    </div>
  );
};

export default About;
