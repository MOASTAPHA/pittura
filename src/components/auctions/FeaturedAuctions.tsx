
import { motion } from 'framer-motion';
import { Clock, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface FeaturedAuctionsProps {
  isRTL: boolean;
}

const FeaturedAuctions = ({ isRTL }: FeaturedAuctionsProps) => {
  // Sample featured auction item
  const featuredItem = {
    id: 'feat-001',
    title: {
      en: 'Ancient Nabatean Pottery Vase',
      ar: 'إناء فخاري نبطي قديم'
    },
    description: {
      en: 'A remarkably preserved pottery vase from the Nabatean period (1st century CE), featuring intricate geometric patterns and smooth, reddish-brown glaze.',
      ar: 'إناء فخاري محفوظ بشكل رائع من الفترة النبطية (القرن الأول الميلادي)، يتميز بأنماط هندسية معقدة وطلاء أملس بني محمر.'
    },
    imageUrl: 'https://images.unsplash.com/photo-1618160702438-9b02ab6515c9',
    currentBid: 4850,
    startingBid: 2000,
    currency: 'SAR',
    endTime: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), // 2 days from now
    bids: 12,
    featured: true
  };

  // Calculate time remaining
  const timeLeft = featuredItem.endTime.getTime() - Date.now();
  const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
  const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

  return (
    <div className="mb-12">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold font-playfair">
          {isRTL ? 'القطع المميزة' : 'Featured Items'}
        </h2>
        <Button variant="ghost" className="text-museum-brown flex items-center gap-1">
          {isRTL ? 'عرض الكل' : 'View All'} 
          <ArrowRight className="w-4 h-4" />
        </Button>
      </div>

      <motion.div 
        className="bg-museum-sand/30 rounded-lg overflow-hidden border border-museum-brown/10 shadow-md"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 flex flex-col justify-between">
            <div>
              <div className="bg-museum-brown/10 text-museum-brown text-sm inline-block px-3 py-1 rounded-full mb-4">
                {isRTL ? 'مميز' : 'Featured'}
              </div>
              <h3 className="text-2xl font-bold mb-2">
                {isRTL ? featuredItem.title.ar : featuredItem.title.en}
              </h3>
              <p className="text-muted-foreground mb-6">
                {isRTL ? featuredItem.description.ar : featuredItem.description.en}
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm text-muted-foreground">
                    {isRTL ? 'المزايدة الحالية' : 'Current Bid'}
                  </p>
                  <p className="text-2xl font-bold text-museum-brown">
                    {featuredItem.currentBid} {featuredItem.currency}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">
                    {isRTL ? 'الوقت المتبقي' : 'Time Remaining'}
                  </p>
                  <div className="flex items-center gap-1 text-red-500 font-semibold">
                    <Clock className="w-4 h-4" />
                    <span>{days}d {hours}h</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Button className="w-full bg-museum-brown hover:bg-museum-brown/90 text-white">
                  {isRTL ? 'المزايدة الآن' : 'Place Bid'}
                </Button>
                <Button variant="outline" className="w-full border-museum-brown text-museum-brown hover:bg-museum-brown/10">
                  {isRTL ? 'معاينة مفصلة' : 'Detailed View'}
                </Button>
              </div>
            </div>
          </div>

          <div className="relative h-[400px] overflow-hidden">
            <img 
              src={featuredItem.imageUrl} 
              alt={isRTL ? featuredItem.title.ar : featuredItem.title.en}
              className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
            />
            <div className="absolute bottom-4 left-4 bg-black/70 text-white text-sm px-3 py-1 rounded-full">
              {isRTL ? `${featuredItem.bids} مزايدة` : `${featuredItem.bids} bids`}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default FeaturedAuctions;
