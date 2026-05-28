import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { Gem, MapPin, Mail, Phone, Instagram, Twitter, Youtube } from 'lucide-react';

const Footer = () => {
  const { isRTL } = useLanguage();
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-[#2D2118] text-white pt-20 pb-10" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-6 inline-flex">
              <div className="w-10 h-10 bg-gradient-to-br from-[#B8945F] to-[#E8C97A] rounded-xl flex items-center justify-center shadow-lg">
                <Gem className="text-[#2D2118] w-5 h-5" />
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-bold text-white font-playfair leading-none">
                  {isRTL ? 'بيتورا' : 'Pittura'}
                </span>
              </div>
            </Link>
            <p className="text-white/60 text-sm leading-relaxed mb-6">
              {isRTL 
                ? 'متحف التراث السعودي الرقمي. نحفظ الذاكرة الوطنية ونجعل كنوزنا الثقافية في متناول العالم من خلال تجارب بانورامية غامرة.'
                : 'The Saudi Digital Heritage Museum. Preserving national memory and making our cultural treasures accessible to the world through immersive panoramic experiences.'}
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 hover:bg-[#B8945F] flex items-center justify-center transition-colors">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 hover:bg-[#B8945F] flex items-center justify-center transition-colors">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 hover:bg-[#B8945F] flex items-center justify-center transition-colors">
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h4 className="text-[#E8C97A] font-bold mb-6 tracking-wider uppercase text-sm">
              {isRTL ? 'روابط سريعة' : 'Quick Links'}
            </h4>
            <ul className="space-y-3">
              {[
                { to: '/', label: { en: 'Home', ar: 'الرئيسية' } },
                { to: '/explore', label: { en: 'Explore Map', ar: 'استكشف الخريطة' } },
                { to: '/membership', label: { en: 'Premium Membership', ar: 'العضويات المميزة' } },
                { to: '/about', label: { en: 'About Pittura', ar: 'عن بيتورا' } },
              ].map(link => (
                <li key={link.to}>
                  <Link to={link.to} className="text-white/70 hover:text-[#E8C97A] transition-colors text-sm flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#B8945F] opacity-0 -ml-3 transition-all" />
                    {isRTL ? link.label.ar : link.label.en}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Support */}
          <div>
            <h4 className="text-[#E8C97A] font-bold mb-6 tracking-wider uppercase text-sm">
              {isRTL ? 'الدعم والمساعدة' : 'Support'}
            </h4>
            <ul className="space-y-3">
              {[
                { to: '/contact', label: { en: 'Contact Us', ar: 'اتصل بنا' } },
                { to: '/privacy', label: { en: 'Privacy Policy', ar: 'سياسة الخصوصية' } },
                { to: '/terms', label: { en: 'Terms of Service', ar: 'شروط الاستخدام' } },
              ].map(link => (
                <li key={link.to}>
                  <Link to={link.to} className="text-white/70 hover:text-[#E8C97A] transition-colors text-sm flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#B8945F] opacity-0 -ml-3 transition-all" />
                    {isRTL ? link.label.ar : link.label.en}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Contact Info */}
          <div>
            <h4 className="text-[#E8C97A] font-bold mb-6 tracking-wider uppercase text-sm">
              {isRTL ? 'تواصل معنا' : 'Get in Touch'}
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-sm text-white/70">
                <MapPin className="w-5 h-5 text-[#B8945F] shrink-0 mt-0.5" />
                <span>{isRTL ? 'حي الدرعية التاريخي، الرياض، المملكة العربية السعودية' : 'Diriyah Heritage District, Riyadh, Saudi Arabia'}</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-white/70">
                <Phone className="w-5 h-5 text-[#B8945F] shrink-0" />
                <span dir="ltr">+966 11 234 5678</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-white/70">
                <Mail className="w-5 h-5 text-[#B8945F] shrink-0" />
                <span>hello@pittura.sa</span>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Bottom bar */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/40 text-xs">
            {isRTL 
              ? `© ${currentYear} بيتورا - جميع الحقوق محفوظة.`
              : `© ${currentYear} Pittura - All rights reserved.`}
          </p>
          <div className="flex gap-4">
            <span className="text-white/40 text-xs">Saudi Arabia</span>
            <span className="text-white/40 text-xs">•</span>
            <span className="text-white/40 text-xs">Vision 2030</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
