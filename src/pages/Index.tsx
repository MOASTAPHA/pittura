
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import SearchBar from '@/components/SearchBar';
import ArtifactCard from '@/components/ArtifactCard';
import VirtualTourCard from '@/components/VirtualTourCard';
import { Button } from '@/components/ui/button';
import { featuredArtifacts, virtualTours, currentAuctions } from '@/data/mockData';
import { Link } from 'react-router-dom';

const Index = () => {
  const [isRTL, setIsRTL] = useState(false);
  const location = useLocation();

  useEffect(() => {
    // Check URL for language parameter
    const params = new URLSearchParams(location.search);
    setIsRTL(params.get('lang') === 'ar');
  }, [location]);

  return (
    <div className={isRTL ? 'rtl' : ''}>
      <Navigation isRTL={isRTL} />
      
      {/* Hero Section with Panoramic Header */}
      <div className="panoramic-header" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1466442929976-97f336a657be?q=80&w=2834&auto=format&fit=crop')" }}>
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-white px-4">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 text-center animate-fade-in">
            {isRTL ? 'بيتورا' : 'Baytora'}
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-center max-w-3xl animate-fade-in" style={{ animationDelay: '0.2s' }}>
            {isRTL 
              ? 'استكشف تراث المملكة العربية السعودية الرقمي'
              : 'Explore Saudi Arabia\'s Digital Heritage'
            }
          </p>
          
          <div className="w-full max-w-2xl animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <SearchBar 
              placeholder={isRTL ? 'ابحث عن القطع الأثرية، المعارض، والمزيد...' : 'Search artifacts, exhibitions, and more...'}
              isRTL={isRTL}
            />
          </div>
        </div>
      </div>
      
      {/* Featured Artifacts Section */}
      <section className="museum-container py-16">
        <div className="flex justify-between items-center mb-10">
          <h2 className="section-title">
            {isRTL ? 'القطع الأثرية المميزة' : 'Featured Artifacts'}
          </h2>
          <Link to="/artifacts">
            <Button variant="outline">
              {isRTL ? 'عرض الكل' : 'View All'}
            </Button>
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredArtifacts.map((artifact) => (
            <div key={artifact.id} className="animate-slide-up">
              <ArtifactCard artifact={artifact} isRTL={isRTL} />
            </div>
          ))}
        </div>
      </section>
      
      {/* Virtual Tours Section */}
      <section className="bg-museum-sand py-16">
        <div className="museum-container">
          <div className="flex justify-between items-center mb-10">
            <h2 className="section-title">
              {isRTL ? 'جولات افتراضية' : 'Virtual Tours'}
            </h2>
            <Link to="/tours">
              <Button variant="outline">
                {isRTL ? 'عرض الكل' : 'View All'}
              </Button>
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {virtualTours.map((tour) => (
              <div key={tour.id} className="animate-slide-up">
                <VirtualTourCard tour={tour} isRTL={isRTL} />
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Digital Auctions Section */}
      <section className="museum-container py-16">
        <div className="flex justify-between items-center mb-10">
          <h2 className="section-title">
            {isRTL ? 'المزادات الرقمية' : 'Digital Auctions'}
          </h2>
          <Link to="/auctions">
            <Button variant="outline">
              {isRTL ? 'عرض الكل' : 'View All'}
            </Button>
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {currentAuctions.map((auction, index) => {
            const timeLeft = auction.endTime.getTime() - Date.now();
            const daysLeft = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
            
            return (
              <div key={auction.id} className="glassmorphism-card animate-slide-up">
                <div className="h-48 mb-4 overflow-hidden rounded-lg">
                  <img 
                    src={auction.imageUrl} 
                    alt={isRTL ? auction.title.ar : auction.title.en}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-bold mb-2">
                  {isRTL ? auction.title.ar : auction.title.en}
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  {isRTL ? auction.description.ar : auction.description.en}
                </p>
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm text-muted-foreground">
                      {isRTL ? 'المزايدة الحالية' : 'Current Bid'}
                    </p>
                    <p className="text-lg font-bold">
                      {auction.currentBid} {auction.currency}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">
                      {isRTL ? 'الوقت المتبقي' : 'Time Left'}
                    </p>
                    <p className="text-lg font-bold">
                      {daysLeft} {isRTL ? 'أيام' : 'days'}
                    </p>
                  </div>
                </div>
                <Button className="w-full mt-4 cta-button">
                  {isRTL ? 'المزايدة الآن' : 'Bid Now'}
                </Button>
              </div>
            );
          })}
        </div>
      </section>
      
      {/* Newsletter Section */}
      <section className="bg-museum-olive text-white py-16">
        <div className="museum-container text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {isRTL ? 'اشترك في النشرة الإخبارية لدينا' : 'Subscribe to Our Newsletter'}
          </h2>
          <p className="max-w-2xl mx-auto mb-8">
            {isRTL 
              ? 'احصل على آخر الأخبار حول المعارض الجديدة، المزادات القادمة، والجولات الافتراضية مباشرة إلى بريدك الإلكتروني.'
              : 'Get the latest news about new exhibitions, upcoming auctions, and virtual tours delivered straight to your inbox.'
            }
          </p>
          <form className="max-w-md mx-auto flex gap-2 flex-col sm:flex-row">
            <input 
              type="email" 
              placeholder={isRTL ? 'بريدك الإلكتروني' : 'Your Email'} 
              className="px-4 py-2 rounded-full flex-grow bg-white text-foreground"
            />
            <Button className="bg-museum-brown hover:bg-museum-brown/90 rounded-full">
              {isRTL ? 'اشترك' : 'Subscribe'}
            </Button>
          </form>
        </div>
      </section>
      
      <Footer isRTL={isRTL} />
    </div>
  );
};

export default Index;
