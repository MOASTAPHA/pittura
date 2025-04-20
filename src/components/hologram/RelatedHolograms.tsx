
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

interface RelatedHologramsProps {
  isRTL?: boolean;
}

const RelatedHolograms = ({ isRTL = false }: RelatedHologramsProps) => {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold text-white">
          {isRTL ? 'المزيد من تجارب الهولوجرام' : 'More Hologram Experiences'}
        </h2>
        <Button variant="link" className="text-blue-400" asChild>
          <a href="/holograms" className="flex items-center gap-1">
            {isRTL ? 'عرض الكل' : 'View All'} 
            <ArrowRight className="w-4 h-4" />
          </a>
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[1, 2, 3].map((item) => (
          <motion.div 
            key={item}
            className="bg-black/40 backdrop-blur-md border border-blue-500/20 rounded-xl overflow-hidden group"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: item * 0.1 }}
            viewport={{ once: true }}
          >
            <div className="relative h-48">
              <img 
                src={`https://images.unsplash.com/photo-159591317364${item}-4ab0ea0a5a37?q=80&w=1998&auto=format&fit=crop`} 
                alt="Hologram experience" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
              <div className="absolute top-4 right-4 bg-blue-500/80 text-white px-3 py-1 rounded-full text-xs backdrop-blur-sm flex items-center gap-1">
                <div className="w-3 h-3" />
                {isRTL ? 'هولوجرام متاح' : 'Hologram Available'}
              </div>
              <div className="absolute inset-0 hologram-overlay opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-500/80 to-transparent hologram-scan"></div>
              </div>
            </div>
            <div className="p-4">
              <h3 className="text-lg font-semibold text-white mb-1">
                {isRTL ? `تجربة هولوجرام ${item}` : `Hologram Experience ${item}`}
              </h3>
              <p className="text-sm text-blue-100/70 mb-4">
                {isRTL ? 'اكتشف الأسرار القديمة من خلال تقنية الهولوجرام المتطورة' : 'Discover ancient secrets through advanced holographic technology'}
              </p>
              <Button size="sm" className="bg-blue-600 hover:bg-blue-700 w-full">
                {isRTL ? 'عرض الهولوجرام' : 'View Hologram'}
              </Button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default RelatedHolograms;
