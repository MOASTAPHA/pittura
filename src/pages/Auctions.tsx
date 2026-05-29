import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { currentAuctions } from '@/data/mockData';
import { useLanguage } from '@/contexts/LanguageContext';

const Auctions = () => {
  const { isRTL } = useLanguage();

  return (
    <div dir={isRTL ? 'rtl' : 'ltr'}>
      <Navigation />
      
      {/* Hero Section */}
      <div className="relative py-16 md:py-24 bg-museum-sand">
        <div className="absolute inset-0 bg-[url('/lovable-uploads/6dafc339-95be-44ac-82c8-a6c32f29c305.png')] bg-cover bg-center opacity-10"></div>
        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {isRTL ? 'المزادات الرقمية' : 'Digital Auctions'}
            </h1>
            <p className="text-xl text-muted-foreground mb-6">
              {isRTL 
                ? 'اكتشف واقتني القطع الأثرية النادرة والأعمال الفنية الحصرية من خلال منصة المزادات الرقمية لدينا.'
                : 'Discover and acquire rare artifacts and exclusive artworks through our digital auction platform.'}
            </p>
            <Button className="bg-[#B8945F] hover:bg-[#A57D4A] text-white rounded-full px-6 py-2">
              {isRTL ? 'استكشف المزادات الحالية' : 'Explore Current Auctions'}
            </Button>
          </div>
        </div>
      </div>
      
      {/* Auctions Section */}
      <div className="container mx-auto px-4 py-16">
        <Tabs defaultValue="current" className="mb-12">
          <TabsList className="mb-8">
            <TabsTrigger value="current">
              {isRTL ? 'المزادات الحالية' : 'Current Auctions'}
            </TabsTrigger>
            <TabsTrigger value="upcoming">
              {isRTL ? 'المزادات القادمة' : 'Upcoming Auctions'}
            </TabsTrigger>
            <TabsTrigger value="past">
              {isRTL ? 'المزادات السابقة' : 'Past Auctions'}
            </TabsTrigger>
            <TabsTrigger value="featured">
              {isRTL ? 'المزادات المميزة' : 'Featured Auctions'}
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="current" className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {currentAuctions.map((auction, index) => {
                const timeLeft = auction.endTime.getTime() - Date.now();
                const daysLeft = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
                const hoursLeft = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                
                return (
                  <motion.div 
                    key={auction.id} 
                    className="auction-card bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <div className="relative">
                      <div className="h-64 overflow-hidden">
                        <img 
                          src={auction.imageUrl} 
                          alt={isRTL ? auction.title.ar : auction.title.en}
                          className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                        />
                      </div>
                      
                      <div className={`absolute top-4 ${isRTL ? 'left-4' : 'right-4'} bg-[#B8945F] text-white px-4 py-2 rounded-full text-sm font-semibold`}>
                        {isRTL ? 'مزاد نشط' : 'Active Auction'}
                      </div>
                      
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent h-1/3"></div>
                    </div>
                    
                      <div className={`p-6 ${isRTL ? 'text-right' : 'text-left'}`}>
                      <h3 className="text-xl font-bold mb-2">
                        {isRTL ? auction.title.ar : auction.title.en}
                      </h3>
                      
                      <p className="text-muted-foreground mb-4 line-clamp-3">
                        {isRTL ? auction.description.ar : auction.description.en}
                      </p>
                      
                      <div className="bg-secondary/30 rounded-lg p-4 mb-6">
                        <div className="flex justify-between mb-2">
                          <span className="text-muted-foreground text-sm">
                            {isRTL ? 'المزايدة الحالية' : 'Current Bid'}
                          </span>
                          <span className="font-bold">{auction.currentBid} {auction.currency}</span>
                        </div>
                        
                        <div className="flex justify-between">
                          <span className="text-muted-foreground text-sm">
                            {isRTL ? 'الوقت المتبقي' : 'Time Remaining'}
                          </span>
                          <span className="font-bold text-primary">
                            {daysLeft}{isRTL ? ' يوم ' : 'd '} 
                            {hoursLeft}{isRTL ? ' ساعة' : 'h'}
                          </span>
                        </div>
                      </div>
                      
                      <div className="flex gap-4">
                        <Link to={`/checkout?item=${encodeURIComponent(auction.id)}&amount=${encodeURIComponent(auction.currentBid)}&currency=${encodeURIComponent(auction.currency)}`} className="flex-1">
                          <Button aria-label={isRTL ? 'قدم مزايدتك' : 'Place your bid'} className="w-full bg-[#B8945F] hover:bg-[#A57D4A] text-white rounded-full">
                            {isRTL ? 'مزايدة' : 'Place Bid'}
                          </Button>
                        </Link>
                        <Link to={`/auctions/${auction.id}`} className="flex-1">
                          <Button aria-label={isRTL ? 'عرض تفاصيل القطعة' : 'View item details'} variant="outline" className="w-full">
                            {isRTL ? 'التفاصيل' : 'Details'}
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </TabsContent>
          
          <TabsContent value="upcoming">
            <div className="text-center py-12">
              <h3 className="text-2xl font-bold mb-4">
                {isRTL ? 'ترقبوا المزادات القادمة' : 'Stay Tuned for Upcoming Auctions'}
              </h3>
              <p className="text-muted-foreground mb-6">
                {isRTL 
                  ? 'سيتم إضافة المزادات القادمة قريبًا. اشترك في نشرتنا الإخبارية لتكون أول من يعلم.'
                  : 'Upcoming auctions will be added soon. Subscribe to our newsletter to be the first to know.'}
              </p>
              <Button>
                {isRTL ? 'اشترك في النشرة الإخبارية' : 'Subscribe to Newsletter'}
              </Button>
            </div>
          </TabsContent>
          
          <TabsContent value="past">
            <div className="text-center py-12">
              <h3 className="text-2xl font-bold mb-4">
                {isRTL ? 'المزادات السابقة' : 'Past Auctions'}
              </h3>
              <p className="text-muted-foreground mb-6">
                {isRTL 
                  ? 'يمكنك الاطلاع على نتائج المزادات السابقة والقطع التي تم بيعها.'
                  : 'You can view the results of past auctions and the items that were sold.'}
              </p>
              <Button>
                {isRTL ? 'عرض أرشيف المزادات' : 'View Auction Archive'}
              </Button>
            </div>
          </TabsContent>
          
          <TabsContent value="featured">
            <div className="text-center py-12">
              <h3 className="text-2xl font-bold mb-4">
                {isRTL ? 'المزادات المميزة' : 'Featured Auctions'}
              </h3>
              <p className="text-muted-foreground mb-6">
                {isRTL 
                  ? 'ستظهر هنا المزادات الخاصة والمميزة للقطع الأثرية النادرة.'
                  : 'Special and featured auctions for rare artifacts will appear here.'}
              </p>
              <Button>
                {isRTL ? 'استكشاف' : 'Explore'}
              </Button>
            </div>
          </TabsContent>
        </Tabs>
        
        {/* How Auctions Work */}
        <div className="bg-muted rounded-xl p-8 mt-16">
          <h2 className="text-2xl font-bold mb-6">
            {isRTL ? 'كيف تعمل المزادات الرقمية' : 'How Digital Auctions Work'}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-background rounded-lg p-6">
              <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mb-4">
                <span className="text-primary font-bold">1</span>
              </div>
              <h3 className="text-lg font-bold mb-2">
                {isRTL ? 'إنشاء حساب' : 'Create an Account'}
              </h3>
              <p className="text-muted-foreground">
                {isRTL 
                  ? 'سجل حساب جديد أو قم بتسجيل الدخول للمشاركة في المزادات.'
                  : 'Register a new account or log in to participate in auctions.'}
              </p>
            </div>
            
            <div className="bg-background rounded-lg p-6">
              <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mb-4">
                <span className="text-primary font-bold">2</span>
              </div>
              <h3 className="text-lg font-bold mb-2">
                {isRTL ? 'تصفح واختر' : 'Browse and Choose'}
              </h3>
              <p className="text-muted-foreground">
                {isRTL 
                  ? 'تصفح المزادات النشطة واختر القطع التي ترغب في المزايدة عليها.'
                  : 'Browse active auctions and choose items you want to bid on.'}
              </p>
            </div>
            
            <div className="bg-background rounded-lg p-6">
              <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mb-4">
                <span className="text-primary font-bold">3</span>
              </div>
              <h3 className="text-lg font-bold mb-2">
                {isRTL ? 'مزايدة وفوز' : 'Bid and Win'}
              </h3>
              <p className="text-muted-foreground">
                {isRTL 
                  ? 'ضع مزايدتك وتابع المزاد حتى نهايته. إذا فزت، سيتم التواصل معك لإتمام عملية الشراء.'
                  : 'Place your bid and follow the auction until its end. If you win, you will be contacted to complete the purchase.'}
              </p>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Auctions;
