
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import FeaturedAuctions from '@/components/auctions/FeaturedAuctions';
import AuctionFilters from '@/components/auctions/AuctionFilters';
import AuctionGrid from '@/components/auctions/AuctionGrid';
import SellYourArtifact from '@/components/auctions/SellYourArtifact';
import AuctionHero from '@/components/auctions/AuctionHero';
import VirtualAssistant from '@/components/auctions/VirtualAssistant';
import { Button } from '@/components/ui/button';

const AuctionSection = () => {
  const [isRTL, setIsRTL] = useState(false);
  const [showVirtualAssistant, setShowVirtualAssistant] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    setIsRTL(params.get('lang') === 'ar');
  }, [location]);

  return (
    <div className={isRTL ? 'rtl' : ''}>
      <Navigation isRTL={isRTL} />
      
      <AuctionHero isRTL={isRTL} />
      
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:w-1/4">
            <AuctionFilters isRTL={isRTL} />
            
            <div className="mt-8 bg-museum-sand/50 rounded-lg p-6 border border-museum-brown/20">
              <h3 className="text-lg font-bold mb-4">
                {isRTL ? 'مساعدة؟' : 'Need Help?'}
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                {isRTL 
                  ? 'هل تحتاج إلى مساعدة في فهم آلية المزاد؟'
                  : 'Need help understanding how the auction works?'}
              </p>
              <Button 
                onClick={() => setShowVirtualAssistant(true)}
                className="w-full bg-museum-brown hover:bg-museum-brown/90"
              >
                {isRTL ? 'تحدث مع المساعد الافتراضي' : 'Chat with Virtual Assistant'}
              </Button>
            </div>
          </div>
          
          <div className="md:w-3/4">
            <FeaturedAuctions isRTL={isRTL} />
            <AuctionGrid isRTL={isRTL} />
          </div>
        </div>
      </div>
      
      <SellYourArtifact isRTL={isRTL} />
      
      {showVirtualAssistant && (
        <VirtualAssistant 
          isRTL={isRTL} 
          onClose={() => setShowVirtualAssistant(false)} 
        />
      )}
      
      <Footer isRTL={isRTL} />
    </div>
  );
};

export default AuctionSection;
