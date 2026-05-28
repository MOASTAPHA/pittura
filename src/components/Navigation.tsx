import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, User, Gem, X } from 'lucide-react';
import LanguageSwitcher from './LanguageSwitcher';
import { useIsMobile } from '@/hooks/use-mobile';
import { useLanguage } from '@/contexts/LanguageContext';

const Navigation = ({ isRTL: isRTLProp }: { isRTL?: boolean } = {}) => {
  const { isRTL: ctxRTL } = useLanguage();
  const isRTL = isRTLProp ?? ctxRTL;
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const isMobile = useIsMobile();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { to: '/', label: { en: 'Home', ar: 'الرئيسية' } },
    { to: '/explore', label: { en: 'Explore', ar: 'استكشف' } },
    { to: '/about', label: { en: 'About', ar: 'عن المتحف' } },
    { to: '/contact', label: { en: 'Contact', ar: 'اتصل بنا' } },
    { to: '/membership', label: { en: 'Membership', ar: 'العضويات' } },
  ];

  return (
    <nav className={`py-4 px-6 ${isScrolled ? 'bg-white/95 shadow-md' : 'bg-transparent'} backdrop-blur-md fixed top-0 w-full z-50 transition-all duration-300 ${isRTL ? 'rtl' : ''}`}>
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* Logo */}
        <Link to="/" className="relative flex items-center gap-2 group">
          <div className="w-10 h-10 bg-gradient-to-br from-[#B8945F] to-[#E8C97A] rounded-xl flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
            <Gem className="text-white w-5 h-5" />
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-bold text-[#3D2E1A] font-playfair leading-none">
              {isRTL ? 'بيتورا' : 'Pittura'}
            </span>
            <span className="text-[10px] font-bold tracking-widest text-[#B8945F] uppercase mt-1">
              {isRTL ? 'متحف التراث' : 'Heritage'}
            </span>
          </div>
        </Link>

        {/* Desktop Nav */}
        {!isMobile && (
          <div className="flex flex-1 items-center justify-center space-x-8 rtl:space-x-reverse">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.to;
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`text-sm font-bold transition-all relative py-2 ${
                    isActive ? 'text-[#B8945F]' : 'text-[#3D2E1A]/80 hover:text-[#B8945F]'
                  }`}
                >
                  {isRTL ? link.label.ar : link.label.en}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#B8945F] rounded-full" />
                  )}
                </Link>
              );
            })}
          </div>
        )}

        {/* Actions */}
        <div className="flex items-center gap-3">
          <LanguageSwitcher />
          
          <Button variant="outline" size="sm" className="hidden md:flex rounded-full border-[#E8C97A] text-[#3D2E1A] hover:bg-[#FBF7EF]" asChild>
            <Link to="/login">
              <User className="w-4 h-4 mr-2 rtl:ml-2 rtl:mr-0" />
              {isRTL ? 'دخول' : 'Login'}
            </Link>
          </Button>
          
          {isMobile && (
            <Button 
              variant="ghost" 
              size="icon" 
              className="rounded-full text-[#3D2E1A]"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </Button>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobile && isMenuOpen && (
        <div className="absolute top-full left-0 right-0 bg-white/95 backdrop-blur-md border-b border-[#E8E3D9] p-4 shadow-xl animate-in slide-in-from-top-2">
          <div className="flex flex-col space-y-2">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.to;
              return (
                <Link 
                  key={link.to}
                  to={link.to} 
                  className={`py-3 px-4 rounded-xl font-bold transition-colors ${
                    isActive ? 'bg-[#FBF7EF] text-[#B8945F]' : 'text-[#3D2E1A]'
                  }`}
                >
                  {isRTL ? link.label.ar : link.label.en}
                </Link>
              );
            })}
            <div className="h-px bg-[#E8E3D9] my-2" />
            <Link 
              to="/login"
              className="py-3 px-4 rounded-xl font-bold text-[#3D2E1A] flex items-center gap-2"
            >
              <User className="w-4 h-4" />
              {isRTL ? 'تسجيل الدخول' : 'Login'}
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
