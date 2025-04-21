
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';

interface AuctionHeroProps {
  isRTL: boolean;
}

const AuctionHero = ({ isRTL }: AuctionHeroProps) => {
  return (
    <div className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1482881497185-d4a9ddbe4151')] bg-cover bg-center opacity-20"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-background/0 via-background/0 to-background"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          className="max-w-3xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 font-playfair">
            {isRTL ? 'المزادات الثقافية' : 'Cultural Auctions'}
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            {isRTL 
              ? 'اكتشف واقتنِ القطع الأثرية والفنية ذات القيمة التراثية العالية والتاريخ الغني. مزادات رقمية تجمع بين الثقافة والتجارة.'
              : 'Discover and acquire artifacts and artistic pieces with high heritage value and rich history. Digital auctions that blend culture and commerce.'}
          </p>
          <div className="flex flex-wrap gap-4">
            <Button className="bg-museum-brown hover:bg-museum-brown/90 text-white">
              {isRTL ? 'استكشف المزادات النشطة' : 'Explore Active Auctions'}
            </Button>
            <Button variant="outline" className="border-museum-brown text-museum-brown hover:bg-museum-brown/10">
              {isRTL ? 'بيع قطعتك الأثرية' : 'Sell Your Artifact'}
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AuctionHero;
