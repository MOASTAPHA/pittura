
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Clock, Search, Tag, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface AuctionGridProps {
  isRTL: boolean;
}

const AuctionGrid = ({ isRTL }: AuctionGridProps) => {
  const [selectedItem, setSelectedItem] = useState<any>(null);
  
  // Sample auction items
  const auctionItems = [
    {
      id: 'item-001',
      title: {
        en: 'Antique Silver Bedouin Necklace',
        ar: 'قلادة بدوية فضية عتيقة'
      },
      description: {
        en: 'A traditional silver Bedouin necklace featuring intricate filigree work with coral and turquoise inlays.',
        ar: 'قلادة بدوية فضية تقليدية تتميز بعمل فيليجري معقد مع ترصيعات من المرجان والفيروز.'
      },
      imageUrl: 'https://images.unsplash.com/photo-1466442929976-97f336a657be',
      currentBid: 2200,
      currency: 'SAR',
      endTime: new Date(Date.now() + 12 * 60 * 60 * 1000), // 12 hours from now
      bids: 8,
      type: 'jewelry',
      era: 'pre-saudi',
      region: 'najd'
    },
    {
      id: 'item-002',
      title: {
        en: 'Antique Arabic Manuscript',
        ar: 'مخطوطة عربية قديمة'
      },
      description: {
        en: 'A well-preserved Arabic manuscript dating back to the 17th century, featuring beautiful calligraphy and illuminations.',
        ar: 'مخطوطة عربية محفوظة جيدًا تعود إلى القرن السابع عشر، تتميز بخط جميل وزخارف.'
      },
      imageUrl: 'https://images.unsplash.com/photo-1492321936769-b49830bc1d1e',
      currentBid: 6800,
      currency: 'SAR',
      endTime: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3 days from now
      bids: 15,
      type: 'manuscripts',
      era: 'islamic',
      region: 'hijaz'
    },
    {
      id: 'item-003',
      title: {
        en: 'Traditional Asiri Wall Hanging',
        ar: 'معلقة جدارية عسيرية تقليدية'
      },
      description: {
        en: 'A colorful hand-painted wall hanging from the Asir region, featuring geometric patterns and vibrant colors.',
        ar: 'معلقة جدارية ملونة مرسومة يدويًا من منطقة عسير، تتميز بأنماط هندسية وألوان زاهية.'
      },
      imageUrl: 'https://images.unsplash.com/photo-1618160702438-9b02ab6515c9',
      currentBid: 1850,
      currency: 'SAR',
      endTime: new Date(Date.now() + 1.5 * 24 * 60 * 60 * 1000), // 1.5 days from now
      bids: 6,
      type: 'textiles',
      era: 'modern',
      region: 'asir'
    }
  ];
  
  // Function to calculate time remaining
  const getTimeRemaining = (endTime: Date) => {
    const timeLeft = endTime.getTime() - Date.now();
    const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    return { days, hours };
  };
  
  return (
    <div>
      <Tabs defaultValue="active" className="mb-8">
        <TabsList>
          <TabsTrigger value="active">
            {isRTL ? 'المزادات النشطة' : 'Active Auctions'}
          </TabsTrigger>
          <TabsTrigger value="ending-soon">
            {isRTL ? 'تنتهي قريباً' : 'Ending Soon'}
          </TabsTrigger>
          <TabsTrigger value="new">
            {isRTL ? 'أضيفت حديثاً' : 'Newly Added'}
          </TabsTrigger>
        </TabsList>
      </Tabs>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {auctionItems.map((item, index) => {
          const { days, hours } = getTimeRemaining(item.endTime);
          
          return (
            <motion.div 
              key={item.id}
              className="bg-background rounded-lg overflow-hidden border border-border shadow-sm hover:shadow-md transition-shadow"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={item.imageUrl} 
                  alt={isRTL ? item.title.ar : item.title.en}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                />
                <div className="absolute top-3 right-3 bg-black/50 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  <span>{days}d {hours}h</span>
                </div>
                <Dialog>
                  <DialogTrigger asChild>
                    <button 
                      className="absolute bottom-3 right-3 bg-white/80 p-2 rounded-full hover:bg-white transition-colors"
                      aria-label={isRTL ? "معاينة مقربة" : "Zoom preview"}
                    >
                      <Search className="w-4 h-4" />
                    </button>
                  </DialogTrigger>
                  <DialogContent className="max-w-3xl">
                    <DialogHeader>
                      <DialogTitle>{isRTL ? item.title.ar : item.title.en}</DialogTitle>
                      <DialogDescription>
                        {isRTL ? item.description.ar : item.description.en}
                      </DialogDescription>
                    </DialogHeader>
                    <div className="relative h-[60vh] overflow-hidden">
                      <img 
                        src={item.imageUrl} 
                        alt={isRTL ? item.title.ar : item.title.en}
                        className="w-full h-full object-contain"
                      />
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
              
              <div className="p-4">
                <h3 className="text-lg font-bold truncate mb-1">
                  {isRTL ? item.title.ar : item.title.en}
                </h3>
                
                <p className="text-sm text-muted-foreground line-clamp-2 mb-3 h-10">
                  {isRTL ? item.description.ar : item.description.en}
                </p>
                
                <div className="flex justify-between items-end mb-3">
                  <div>
                    <p className="text-xs text-muted-foreground">
                      {isRTL ? 'المزايدة الحالية' : 'Current Bid'}
                    </p>
                    <p className="text-lg font-bold">
                      {item.currentBid} {item.currency}
                    </p>
                  </div>
                  <div className="text-xs flex items-center gap-1 text-muted-foreground">
                    <User className="w-3 h-3" />
                    <span>{item.bids} {isRTL ? 'مزايدة' : 'bids'}</span>
                  </div>
                </div>
                
                <div className="flex items-center gap-2 mb-4">
                  <div className="bg-museum-sand/50 text-xs px-2 py-1 rounded-full flex items-center gap-1">
                    <Tag className="w-3 h-3" />
                    <span>{isRTL ? 'العصر' : 'Era'}: {item.era}</span>
                  </div>
                  <div className="bg-museum-sand/50 text-xs px-2 py-1 rounded-full">
                    {isRTL ? 'المنطقة' : 'Region'}: {item.region}
                  </div>
                </div>
                
                <Button className="w-full bg-museum-brown hover:bg-museum-brown/90 text-white">
                  {isRTL ? 'المزايدة الآن' : 'Place Bid'}
                </Button>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default AuctionGrid;
