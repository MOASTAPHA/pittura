
import { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

const NotFound = () => {
  const [isRTL, setIsRTL] = useState(false);
  const location = useLocation();

  useEffect(() => {
    // Check URL for language parameter
    const params = new URLSearchParams(location.search);
    setIsRTL(params.get('lang') === 'ar');
  }, [location]);
  
  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className={isRTL ? 'rtl' : ''}>
      <Navigation isRTL={isRTL} />
      
      <div className="museum-container min-h-[70vh] flex flex-col items-center justify-center text-center py-16">
        <h1 className="text-6xl md:text-8xl font-bold mb-6 text-museum-brown">
          404
        </h1>
        <h2 className="text-2xl md:text-3xl font-medium mb-6">
          {isRTL ? 'عذراً، الصفحة غير موجودة' : 'Oops! Page Not Found'}
        </h2>
        <p className="text-muted-foreground max-w-md mb-8">
          {isRTL 
            ? 'الصفحة التي تبحث عنها قد تكون حُذفت أو نُقلت أو لم تكن موجودة من الأساس.'
            : 'The page you are looking for may have been moved, deleted, or perhaps never existed.'
          }
        </p>
        <div className="space-x-4">
          <Button asChild className="cta-button">
            <Link to="/">
              {isRTL ? 'العودة إلى الصفحة الرئيسية' : 'Return to Home'}
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link to="/artifacts">
              {isRTL ? 'استكشف القطع الأثرية' : 'Explore Artifacts'}
            </Link>
          </Button>
        </div>
      </div>
      
      <Footer isRTL={isRTL} />
    </div>
  );
};

export default NotFound;
