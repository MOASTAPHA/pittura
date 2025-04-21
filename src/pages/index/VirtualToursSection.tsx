
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import VirtualTourCard from '@/components/VirtualTourCard';
import { locations } from '@/data/tourLocations';

interface Props {
  isRTL: boolean;
}

const VirtualToursSection = ({ isRTL }: Props) => {
  // Get the first 3 featured locations
  const featuredLocations = locations
    .filter(location => location.featured)
    .slice(0, 3)
    .map(location => ({
      id: location.id,
      title: location.title,
      description: location.description,
      imageUrl: location.thumbnailUrl,
      duration: 15, // Placeholder duration in minutes
      featured: true
    }));

  return (
    <section className="bg-museum-sand py-16">
      <div className="museum-container">
        <div className="flex justify-between items-center mb-10">
          <h2 className="section-title">
            {isRTL ? 'جولات افتراضية بزاوية 360°' : '360° Virtual Tours'}
          </h2>
          <Link to="/360-experience">
            <Button variant="outline">
              {isRTL ? 'عرض الكل' : 'View All'}
            </Button>
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredLocations.map((tour, index) => (
            <motion.div 
              key={tour.id} 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <VirtualTourCard 
                tour={{
                  id: tour.id,
                  title: tour.title,
                  description: tour.description,
                  imageUrl: tour.imageUrl,
                  duration: tour.duration,
                  featured: tour.featured
                }} 
                isRTL={isRTL} 
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default VirtualToursSection;
