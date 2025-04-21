
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from '@/components/ui/carousel';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface ShebaraSectionProps {
  isRTL: boolean;
}

const ShebaraSection = ({ isRTL }: ShebaraSectionProps) => {
  return (
    <section className="py-24 bg-gradient-to-b from-white to-museum-sand overflow-hidden relative">
      {/* Background decorative elements */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-[url('https://images.unsplash.com/photo-1483058712412-4245e9b90334?q=80&w=2834&auto=format&fit=crop')] bg-cover opacity-5"></div>
      <div className="absolute bottom-0 left-0 w-40 h-40 rounded-full bg-museum-blue/20 blur-3xl"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12 mb-16">
          <motion.div 
            className="lg:w-1/2"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-sm uppercase tracking-widest text-museum-brown mb-4 font-light">
              {isRTL ? 'وجهة حصرية' : 'Exclusive Destination'}
            </h2>
            <h3 className="text-4xl md:text-5xl font-playfair font-bold mb-6 text-museum-brown">
              {isRTL ? 'منتجع شبارة' : 'Shebara Resort'}
            </h3>
            <p className="text-lg leading-relaxed text-neutral-700 mb-8">
              {isRTL 
                ? 'استمتع بالفخامة العصرية المستوحاة من التراث السعودي في منتجع شبارة. يمزج المنتجع بين الهندسة المعمارية المتطورة والعناصر التقليدية ليقدم تجربة إقامة استثنائية في أحضان الطبيعة الخلابة.'
                : 'Experience modern luxury inspired by Saudi heritage at Shebara Resort. Blending sophisticated architecture with traditional elements, the resort offers an exceptional stay immersed in breathtaking natural surroundings.'}
            </p>
            <Link to="/destinations/shebara">
              <Button variant="outline" className="rounded-full px-8 py-6 border-museum-brown text-museum-brown hover:bg-museum-brown hover:text-white group">
                {isRTL ? 'اكتشف المنتجع' : 'Discover the Resort'}
                <ArrowRight className="ml-2 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </motion.div>

          <motion.div 
            className="lg:w-1/2"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="relative">
              {/* Main image */}
              <motion.div 
                className="rounded-2xl overflow-hidden shadow-xl"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <img 
                  src="https://images.unsplash.com/photo-1721322800607-8c38375eef04?q=80&w=3011&auto=format&fit=crop" 
                  alt="Shebara Resort" 
                  className="w-full h-[400px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none"></div>
                <div className="absolute bottom-6 left-6 right-6 text-white">
                  <p className="text-sm font-light mb-1">
                    {isRTL ? 'فخامة معاصرة' : 'Contemporary Luxury'}
                  </p>
                  <h4 className="text-2xl font-playfair">
                    {isRTL ? 'التصميم الداخلي' : 'Interior Design'}
                  </h4>
                </div>
              </motion.div>

              {/* Floating accent image */}
              <motion.div 
                className="absolute -top-10 -right-10 w-48 h-48 rounded-lg overflow-hidden shadow-lg border-4 border-white"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
              >
                <img 
                  src="https://images.unsplash.com/photo-1487958449943-2429e8be8625?q=80&w=3360&auto=format&fit=crop" 
                  alt="Shebara Architecture" 
                  className="w-full h-full object-cover"
                />
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Feature highlights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
          {[
            {
              title: isRTL ? 'التصميم المعاصر' : 'Contemporary Design',
              description: isRTL 
                ? 'هندسة معمارية مستوحاة من العناصر السعودية التقليدية مع لمسة عصرية'
                : 'Architectural design inspired by traditional Saudi elements with a modern twist'
            },
            {
              title: isRTL ? 'الراحة الفاخرة' : 'Luxurious Comfort',
              description: isRTL 
                ? 'أجنحة فسيحة مجهزة بأحدث وسائل الراحة وإطلالات خلابة'
                : 'Spacious suites equipped with modern amenities and stunning views'
            },
            {
              title: isRTL ? 'تجربة ثقافية' : 'Cultural Experience',
              description: isRTL 
                ? 'برامج تفاعلية للتعرف على التقاليد المحلية والفنون والحرف اليدوية'
                : 'Interactive programs showcasing local traditions, arts, and craftsmanship'
            }
          ].map((feature, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="glassmorphism-card bg-white/40 backdrop-blur-sm border border-white/50 rounded-xl p-6 hover:shadow-lg transition-all"
            >
              <h4 className="text-xl font-playfair font-semibold mb-3 text-museum-brown">{feature.title}</h4>
              <p className="text-neutral-600">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ShebaraSection;
