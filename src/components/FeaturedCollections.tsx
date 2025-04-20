
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, Cube3D } from 'lucide-react';

interface FeaturedCollectionsProps {
  isRTL?: boolean;
}

const collections = [
  {
    id: 1,
    title: {
      en: "Nabataean Artifacts",
      ar: "آثار الأنباط"
    },
    description: {
      en: "Explore the rich heritage of the Nabataean civilization with our exclusive collection of artifacts from Hegra and beyond.",
      ar: "استكشف التراث الغني للحضارة النبطية من خلال مجموعتنا الحصرية من القطع الأثرية من الحجر وما بعدها."
    },
    imageUrl: "https://images.unsplash.com/photo-1617450365226-9bf28c04e130?q=80&w=1470&auto=format&fit=crop",
    itemCount: 42,
    isHologramEnabled: true
  },
  {
    id: 2,
    title: {
      en: "Islamic Golden Age",
      ar: "العصر الذهبي الإسلامي"
    },
    description: {
      en: "Discover the scientific and artistic achievements of the Islamic Golden Age through rare manuscripts and instruments.",
      ar: "اكتشف الإنجازات العلمية والفنية للعصر الذهبي الإسلامي من خلال المخطوطات والأدوات النادرة."
    },
    imageUrl: "https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?q=80&w=1364&auto=format&fit=crop",
    itemCount: 64,
    isHologramEnabled: true
  },
  {
    id: 3,
    title: {
      en: "Traditional Craftsmanship",
      ar: "الحرف التقليدية"
    },
    description: {
      en: "A celebration of Saudi Arabia's traditional crafts, from intricate jewelry to pottery and textile arts.",
      ar: "احتفال بالحرف التقليدية في المملكة العربية السعودية، من المجوهرات المعقدة إلى الفخار وفنون النسيج."
    },
    imageUrl: "https://images.unsplash.com/photo-1599940824399-b87987ceb72a?q=80&w=1527&auto=format&fit=crop",
    itemCount: 37,
    isHologramEnabled: false
  }
];

const FeaturedCollections = ({ isRTL = false }: FeaturedCollectionsProps) => {
  const [hoveredItem, setHoveredItem] = useState<number | null>(null);

  return (
    <section className={`py-16 bg-museum-sand/50 ${isRTL ? 'rtl' : ''}`}>
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-10">
          <h2 className="section-title">
            {isRTL ? 'المجموعات المميزة' : 'Featured Collections'}
          </h2>
          <Button variant="outline" asChild>
            <Link to="/collections" className="flex items-center gap-2">
              {isRTL ? 'عرض جميع المجموعات' : 'View All Collections'}
              <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {collections.map((collection, index) => (
            <motion.div
              key={collection.id}
              className="collection-card rounded-xl overflow-hidden shadow-lg relative bg-white dark:bg-gray-900"
              onHoverStart={() => setHoveredItem(collection.id)}
              onHoverEnd={() => setHoveredItem(null)}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={collection.imageUrl} 
                  alt={isRTL ? collection.title.ar : collection.title.en}
                  className="w-full h-full object-cover transform transition-transform duration-700 ease-out hover:scale-110"
                />
                {collection.isHologramEnabled && (
                  <div className="absolute top-4 right-4 bg-blue-500/80 text-white px-3 py-1 rounded-full text-xs backdrop-blur-sm flex items-center gap-1">
                    <Cube3D className="w-3 h-3" />
                    {isRTL ? 'هولوجرام متاح' : 'Hologram Available'}
                  </div>
                )}
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">
                  {isRTL ? collection.title.ar : collection.title.en}
                </h3>
                <p className="text-muted-foreground mb-4 text-sm">
                  {isRTL ? collection.description.ar : collection.description.en}
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">
                    {collection.itemCount} {isRTL ? 'قطعة' : 'items'}
                  </span>
                  <Button variant="link" asChild>
                    <Link to={`/collection/${collection.id}`}>
                      {isRTL ? 'استكشف المجموعة' : 'Explore Collection'}
                    </Link>
                  </Button>
                </div>
              </div>
              
              {/* Hologram effect on hover */}
              {hoveredItem === collection.id && collection.isHologramEnabled && (
                <motion.div 
                  className="absolute inset-0 pointer-events-none"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="absolute inset-0 hologram-effect">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10"></div>
                    <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent hologram-scan"></div>
                  </div>
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedCollections;
