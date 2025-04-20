
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import VirtualTourCard from '@/components/VirtualTourCard';
import { virtualTours } from '@/data/mockData';

interface Props {
  isRTL: boolean;
}

const VirtualToursSection = ({ isRTL }: Props) => (
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
        {virtualTours.map((tour, index) => (
          <motion.div 
            key={tour.id} 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
          >
            <VirtualTourCard tour={tour} isRTL={isRTL} />
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default VirtualToursSection;
