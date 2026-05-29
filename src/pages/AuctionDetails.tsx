import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { currentAuctions } from '@/data/mockData';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';

const AuctionDetails = () => {
  const { id } = useParams();
  const { isRTL } = useLanguage();

  const auction = currentAuctions.find((a) => a.id === id);

  if (!auction) {
    return (
      <div className="min-h-screen bg-[#F5F0E8]">
        <Navigation />
        <div className="max-w-4xl mx-auto px-6 py-24 text-center">
          <h2 className="text-2xl font-bold">{isRTL ? 'المزاد غير موجود' : 'Auction not found'}</h2>
          <p className="mt-4 text-muted-foreground">{isRTL ? 'عذراً، لم نتمكن من العثور على هذا المزاد.' : 'Sorry, we could not find this auction.'}</p>
          <div className="mt-6">
            <Link to="/auctions"><Button>{isRTL ? 'العودة للمزادات' : 'Back to Auctions'}</Button></Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const timeLeft = auction.endTime.getTime() - Date.now();
  const daysLeft = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
  const hoursLeft = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

  return (
    <div dir={isRTL ? 'rtl' : 'ltr'} className="bg-[#F5F0E8] min-h-screen">
      <Navigation />

      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          <div className="rounded-3xl overflow-hidden shadow-2xl">
            <img src={auction.imageUrl} alt={isRTL ? auction.title.ar : auction.title.en} className="w-full h-[520px] object-cover" />
          </div>

          <div>
            <h1 className="text-3xl font-bold mb-4">{isRTL ? auction.title.ar : auction.title.en}</h1>
            <p className="text-muted-foreground mb-6">{isRTL ? auction.description.ar : auction.description.en}</p>

            <div className="bg-white rounded-xl p-6 border border-[#E8E3D9] mb-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-muted-foreground">{isRTL ? 'السعر الحالي' : 'Current Bid'}</span>
                <span className="text-xl font-bold">{auction.currentBid} {auction.currency}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">{isRTL ? 'الوقت المتبقي' : 'Time Remaining'}</span>
                <span className="font-bold text-[#B8945F]">{daysLeft}{isRTL ? ' يوم ' : 'd '}{hoursLeft}{isRTL ? ' ساعة' : 'h'}</span>
              </div>
            </div>

            <div className="flex gap-4">
              <Link to={`/checkout?item=${auction.id}&amount=${auction.currentBid}&currency=${auction.currency}`}>
                <Button className="bg-[#B8945F] hover:bg-[#A57D4A] text-white rounded-full">{isRTL ? 'قدم مزايدتك' : 'Place Bid'}</Button>
              </Link>
              <Link to="/auctions"><Button variant="outline">{isRTL ? 'العودة' : 'Back'}</Button></Link>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default AuctionDetails;
