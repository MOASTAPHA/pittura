
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, Search, User, BookOpen, Boxes, Library, BookOpenText, Gem, X } from 'lucide-react';
import LanguageSwitcher from './LanguageSwitcher';
import { useIsMobile } from '@/hooks/use-mobile';
import MegaMenu from './MegaMenu';

import { useLanguage } from '@/contexts/LanguageContext';

const Navigation = ({ isRTL: isRTLProp }: { isRTL?: boolean } = {}) => {
  const { isRTL: ctxRTL } = useLanguage();
  const isRTL = isRTLProp ?? ctxRTL;
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
  const [activeMegaMenu, setActiveMegaMenu] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const isMobile = useIsMobile();
  const location = useLocation();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close the menu when changing routes
  useEffect(() => {
    setIsMenuOpen(false);
    closeMegaMenu();
  }, [location.pathname]);

  const toggleMegaMenu = (menuName: string) => {
    if (activeMegaMenu === menuName) {
      setIsMegaMenuOpen(false);
      setActiveMegaMenu(null);
    } else {
      setIsMegaMenuOpen(true);
      setActiveMegaMenu(menuName);
    }
  };

  const closeMegaMenu = () => {
    setIsMegaMenuOpen(false);
    setActiveMegaMenu(null);
  };

  return (
    <>
      <nav className={`py-4 px-6 ${isScrolled ? 'bg-background/95' : 'bg-background/90'} backdrop-blur-md sticky top-0 z-50 border-b transition-all duration-300 ${isRTL ? 'rtl' : ''}`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Link to="/" className="relative flex items-center font-playfair">
              {isRTL ? (
                <>
                  <span className="text-2xl font-bold">ب</span>
                  <span className="relative text-2xl font-bold">
                    ي
                    <Gem 
                      className="absolute -top-3 left-1/2 -translate-x-1/2 text-primary w-4 h-4 animate-float" 
                      strokeWidth={2.5}
                    />
                  </span>
                  <span className="text-2xl font-bold">تورا</span>
                </>
              ) : (
                <>
                  <span className="text-2xl font-bold">P</span>
                  <span className="relative text-2xl font-bold">
                    i
                    <Gem 
                      className="absolute -top-3 left-1/2 -translate-x-1/2 text-primary w-4 h-4 animate-float" 
                      strokeWidth={2.5}
                    />
                  </span>
                  <span className="text-2xl font-bold">ttura</span>
                </>
              )}
            </Link>
            <span className="text-sm text-muted-foreground mt-1.5">
              {isRTL ? 'متحف المملكة الرقمي' : 'The Digital Art Museum'}
            </span>
          </div>

          {!isMobile && (
            <div className="flex items-center space-x-6">
              <Link 
                to="/" 
                className={`hover:text-primary transition-colors ${location.pathname === '/' ? 'text-primary font-medium' : ''}`}
              >
                {isRTL ? 'الرئيسية' : 'Home'}
              </Link>
              <Link 
                to="/heritage-experience" 
                className={`hover:text-primary transition-colors flex items-center gap-1 ${location.pathname === '/heritage-experience' ? 'text-primary font-medium' : ''}`}
              >
                <BookOpenText className="w-4 h-4" />
                {isRTL ? 'تجربة التراث' : 'Heritage Experience'}
              </Link>
              <button 
                className={`hover:text-primary transition-colors flex items-center gap-1 ${activeMegaMenu === 'artifacts' ? 'text-primary font-medium' : ''}`}
                onClick={() => toggleMegaMenu('artifacts')}
              >
                <Library className="w-4 h-4" />
                {isRTL ? 'القطع الأثرية' : 'Artifacts'}
              </button>
              <button 
                className={`hover:text-primary transition-colors flex items-center gap-1 ${activeMegaMenu === 'tours' ? 'text-primary font-medium' : ''}`}
                onClick={() => toggleMegaMenu('tours')}
              >
                <BookOpen className="w-4 h-4" />
                {isRTL ? 'جولات افتراضية' : 'Virtual Tours'}
              </button>
              <button 
                className={`hover:text-primary transition-colors flex items-center gap-1 ${activeMegaMenu === 'holograms' ? 'text-primary font-medium' : ''}`}
                onClick={() => toggleMegaMenu('holograms')}
              >
                <Boxes className="w-4 h-4" />
                {isRTL ? 'تجربة الهولوجرام' : 'Hologram Experience'}
              </button>
              <Link 
                to="/auction-section" 
                className={`hover:text-primary transition-colors ${location.pathname === '/auction-section' ? 'text-primary font-medium' : ''}`}
              >
                {isRTL ? 'المزادات الثقافية' : 'Cultural Auctions'}
              </Link>
              <Link 
                to="/about" 
                className={`hover:text-primary transition-colors ${location.pathname === '/about' ? 'text-primary font-medium' : ''}`}
              >
                {isRTL ? 'عن المتحف' : 'About'}
              </Link>
            </div>
          )}

          <div className="flex items-center gap-3">
            <LanguageSwitcher />
            
            <Button variant="ghost" size="icon" className="rounded-full hover:bg-secondary/50" asChild>
              <Link to="/search">
                <Search className="w-5 h-5" />
              </Link>
            </Button>
            
            <Button variant="ghost" size="icon" className="rounded-full hover:bg-secondary/50" asChild>
              <Link to="/login">
                <User className="w-5 h-5" />
              </Link>
            </Button>
            
            {isMobile && (
              <Button 
                variant="ghost" 
                size="icon" 
                className="rounded-full hover:bg-secondary/50"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
              >
                {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </Button>
            )}
          </div>
        </div>

        {isMobile && isMenuOpen && (
          <div className="absolute top-full left-0 right-0 bg-background/95 backdrop-blur-md border-b animate-fade-in p-4 shadow-lg">
            <div className="flex flex-col space-y-4">
              <Link 
                to="/" 
                className={`hover:text-primary transition-colors py-2 px-4 rounded-lg ${location.pathname === '/' ? 'bg-secondary/50 text-primary font-medium' : ''}`}
              >
                {isRTL ? 'الرئيسية' : 'Home'}
              </Link>
              <Link 
                to="/heritage-experience" 
                className={`hover:text-primary transition-colors py-2 px-4 rounded-lg flex items-center gap-2 ${location.pathname === '/heritage-experience' ? 'bg-secondary/50 text-primary font-medium' : ''}`}
              >
                <BookOpenText className="w-4 h-4" />
                {isRTL ? 'تجربة التراث' : 'Heritage Experience'}
              </Link>
              <Link 
                to="/artifacts" 
                className={`hover:text-primary transition-colors py-2 px-4 rounded-lg flex items-center gap-2 ${location.pathname === '/artifacts' ? 'bg-secondary/50 text-primary font-medium' : ''}`}
              >
                <Library className="w-4 h-4" />
                {isRTL ? 'القطع الأثرية' : 'Artifacts'}
              </Link>
              <Link 
                to="/tours" 
                className={`hover:text-primary transition-colors py-2 px-4 rounded-lg flex items-center gap-2 ${location.pathname === '/tours' ? 'bg-secondary/50 text-primary font-medium' : ''}`}
              >
                <BookOpen className="w-4 h-4" />
                {isRTL ? 'جولات افتراضية' : 'Virtual Tours'}
              </Link>
              <Link 
                to="/holograms" 
                className={`hover:text-primary transition-colors py-2 px-4 rounded-lg flex items-center gap-2 ${location.pathname === '/holograms' ? 'bg-secondary/50 text-primary font-medium' : ''}`}
              >
                <Boxes className="w-4 h-4" />
                {isRTL ? 'تجربة الهولوجرام' : 'Hologram Experience'}
              </Link>
              <Link 
                to="/auction-section" 
                className={`hover:text-primary transition-colors py-2 px-4 rounded-lg ${location.pathname === '/auction-section' ? 'bg-secondary/50 text-primary font-medium' : ''}`}
              >
                {isRTL ? 'المزادات الثقافية' : 'Cultural Auctions'}
              </Link>
              <Link 
                to="/about" 
                className={`hover:text-primary transition-colors py-2 px-4 rounded-lg ${location.pathname === '/about' ? 'bg-secondary/50 text-primary font-medium' : ''}`}
              >
                {isRTL ? 'عن المتحف' : 'About'}
              </Link>
            </div>
          </div>
        )}
      </nav>

      {isMegaMenuOpen && !isMobile && (
        <MegaMenu 
          isRTL={isRTL} 
          menuType={activeMegaMenu!} 
          onClose={closeMegaMenu} 
        />
      )}
    </>
  );
};

export default Navigation;
