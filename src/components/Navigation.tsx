import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, Search, User, GalleryVertical } from 'lucide-react';
import LanguageSwitcher from './LanguageSwitcher';
import { useIsMobile } from '@/hooks/use-mobile';

const Navigation = ({ isRTL = false }: { isRTL?: boolean }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isMobile = useIsMobile();

  return (
    <nav className={`py-4 px-6 bg-background/90 backdrop-blur-md sticky top-0 z-50 border-b ${isRTL ? 'rtl' : ''}`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Link to="/" className="text-2xl font-playfair font-bold">
            {isRTL ? 'بيتورا' : 'Pittura'}
          </Link>
          <span className="text-sm text-muted-foreground mt-1.5">
            {isRTL ? 'متحف المملكة الرقمي' : 'The Digital Art Museum'}
          </span>
        </div>

        {!isMobile && (
          <div className="flex items-center space-x-6">
            <Link to="/" className="hover:text-primary transition-colors">
              {isRTL ? 'الرئيسية' : 'Home'}
            </Link>
            <Link to="/artifacts" className="hover:text-primary transition-colors">
              {isRTL ? 'القطع الأثرية' : 'Artifacts'}
            </Link>
            <Link to="/tours" className="hover:text-primary transition-colors">
              {isRTL ? 'جولات افتراضية' : 'Virtual Tours'}
            </Link>
            <Link to="/auctions" className="hover:text-primary transition-colors">
              {isRTL ? 'المزادات' : 'Auctions'}
            </Link>
            <Link to="/about" className="hover:text-primary transition-colors">
              {isRTL ? 'عن المتحف' : 'About'}
            </Link>
          </div>
        )}

        <div className="flex items-center gap-3">
          <LanguageSwitcher currentLang={isRTL ? 'ar' : 'en'} />
          
          <Button variant="ghost" size="icon" className="rounded-full" asChild>
            <Link to="/search">
              <Search className="w-5 h-5" />
            </Link>
          </Button>
          
          <Button variant="ghost" size="icon" className="rounded-full" asChild>
            <Link to="/login">
              <User className="w-5 h-5" />
            </Link>
          </Button>
          
          {isMobile && (
            <Button 
              variant="ghost" 
              size="icon" 
              className="rounded-full"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <Menu className="w-5 h-5" />
            </Button>
          )}
        </div>
      </div>

      {/* Mobile menu */}
      {isMobile && isMenuOpen && (
        <div className="absolute top-full left-0 right-0 bg-background/95 backdrop-blur-md border-b animate-fade-in p-4">
          <div className="flex flex-col space-y-4">
            <Link to="/" className="hover:text-primary transition-colors py-2 px-4">
              {isRTL ? 'الرئيسية' : 'Home'}
            </Link>
            <Link to="/artifacts" className="hover:text-primary transition-colors py-2 px-4">
              {isRTL ? 'القطع الأثرية' : 'Artifacts'}
            </Link>
            <Link to="/tours" className="hover:text-primary transition-colors py-2 px-4">
              {isRTL ? 'جولات افتراضية' : 'Virtual Tours'}
            </Link>
            <Link to="/auctions" className="hover:text-primary transition-colors py-2 px-4">
              {isRTL ? 'المزادات' : 'Auctions'}
            </Link>
            <Link to="/about" className="hover:text-primary transition-colors py-2 px-4">
              {isRTL ? 'عن المتحف' : 'About'}
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
