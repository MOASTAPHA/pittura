
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { currentAuctions } from '@/data/mockData';

interface Props {
  isRTL: boolean;
}

const DigitalAuctionsSection = ({ isRTL }: Props) => (
  <section className="museum-container py-16">
    <div className="flex justify-between items-center mb-10">
      <h2 className="section-title">
        {isRTL ? 'المزادات الرقمية' : 'Digital Auctions'}
      </h2>
      <Link to="/auction-section">
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
          <motion.div 
            key={auction.id} 
            className="glassmorphism-card animate-slide-up"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
          >
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
            <Link to="/auction-section">
              <Button className="w-full mt-4 cta-button">
                {isRTL ? 'المزايدة الآن' : 'Bid Now'}
              </Button>
            </Link>
          </motion.div>
        );
      })}
    </div>
  </section>
);

export default DigitalAuctionsSection;
