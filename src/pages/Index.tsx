import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import HeroSection from '@/components/HeroSection';
import FeaturedCollections from '@/components/FeaturedCollections';
import ArtifactCard from '@/components/ArtifactCard';
import VirtualTourCard from '@/components/VirtualTourCard';
import ArtifactViewer3D from '@/components/ArtifactViewer3D';
import { Button } from '@/components/ui/button';
import { featuredArtifacts, virtualTours, currentAuctions } from '@/data/mockData';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Boxes, Library } from 'lucide-react';

const Index = () => {
  const [isRTL, setIsRTL] = useState(false);
  const location = useLocation();

  useEffect(() => {
    // Check URL for language parameter
    const params = new URLSearchParams(location.search);
    setIsRTL(params.get('lang') === 'ar');
  }, [location]);

  return (
    <div className={isRTL ? 'rtl' : ''}>
      <Navigation isRTL={isRTL} />
      
      {/* Hero Section with Ambient Video and 360 Panorama */}
      <HeroSection isRTL={isRTL} />
      
      {/* Featured Artifacts with 3D Interactive Viewer */}
      <section className="bg-gradient-to-b from-black to-museum-blue/30 py-20 text-white">
        <div className="museum-container">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">
              {isRTL ? 'اكتشف القطع الأثرية المميزة' : 'Discover Featured Artifacts'}
            </h2>
            <p className="text-lg text-white/70 max-w-3xl mx-auto">
              {isRTL 
                ? 'استكشف مجموعتنا من القطع الأثرية النادرة والتاريخية. يمكنك تدوير وتكبير القطع بتقنية ثلاثية الأبعاد.'
                : 'Explore our collection of rare and historic artifacts. You can rotate and zoom the pieces in 3D.'
              }
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <ArtifactViewer3D 
                modelUrl="/models/artifact_default.glb"
                title={isRTL ? "إناء نبطي من العلا" : "Nabataean Vessel from Al-Ula"}
                description={isRTL 
                  ? "إناء فخاري يعود تاريخه للقرن الأول الميلادي، ويعكس مهارة الحرفيين النبطيين في صناعة الفخار."
                  : "A ceramic vessel dating back to the 1st century CE, reflecting the craftsmanship of Nabataean potters."
                }
                isRTL={isRTL}
              />
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="lg:col-span-2"
            >
              <div className="bg-museum-brown/30 backdrop-blur-sm border border-white/10 rounded-xl p-6 h-full">
                <h3 className="text-2xl font-bold mb-4">
                  {isRTL ? "تاريخ الفن النبطي" : "History of Nabataean Art"}
                </h3>
                <p className="mb-4">
                  {isRTL 
                    ? "الأنباط، وهم حضارة عربية قديمة ازدهرت في شمال غرب شبه الجزيرة العربية من القرن الرابع قبل الميلاد حتى القرن الأول الميلادي، كانوا معروفين بإنجازاتهم المعمارية والفنية الاستثنائية."
                    : "The Nabataeans, an ancient Arab civilization that flourished in northwest Arabia from the 4th century BCE to the 1st century CE, were known for their exceptional architectural and artistic achievements."
                  }
                </p>
                <p className="mb-6">
                  {isRTL 
                    ? "تتميز الحرف اليدوية النبطية بتأثيرات من الفن المصري واليوناني والروماني، لكنها تحتفظ بأسلوب مميز خاص بها. كانت الزخارف النباتية والهندسية شائعة، إلى جانب التصوير الواقعي للحيوانات والأشخاص."
                    : "Nabataean craftsmanship features influences from Egyptian, Greek, and Roman art, yet maintains a distinctive style of its own. Floral and geometric decorations were common, alongside realistic portrayals of animals and people."
                  }
                </p>
                <div className="flex flex-wrap gap-4">
                  <Button className="bg-museum-olive hover:bg-museum-olive/90">
                    {isRTL ? "استكشف المزيد" : "Explore More"}
                  </Button>
                  <Button variant="outline" className="border-white/20 hover:bg-white/10">
                    {isRTL ? "مشاهدة الأعمال الفنية" : "View Artworks"}
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Featured Collections Section */}
      <FeaturedCollections isRTL={isRTL} />
      
      {/* Hologram Experience Section */}
      <section className="py-20 bg-museum-blue/30 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5"></div>
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2670&auto=format&fit=crop')] bg-cover bg-center opacity-10"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <div className="inline-block relative mb-4">
              <Boxes className="w-12 h-12 text-blue-500 mx-auto" />
              <div className="absolute -inset-4 bg-blue-500/20 blur-xl rounded-full -z-10"></div>
            </div>
            
            <h2 className="text-4xl font-bold mb-4">
              {isRTL ? 'تجربة الهولوجرام الحصرية' : 'Exclusive Hologram Experience'}
            </h2>
            
            <p className="text-lg text-muted-foreground mb-8">
              {isRTL 
                ? 'استكشف القطع الأثرية بطريقة لم يسبق لها مثيل مع تقنية الهولوجرام ثلاثية الأبعاد. شاهد التفاصيل الدقيقة وتفاعل مع التاريخ بطرق جديدة مذهلة.'
                : 'Explore artifacts like never before with 3D holographic technology. See intricate details and interact with history in amazing new ways.'
              }
            </p>
            
            <div className="flex justify-center gap-4 flex-wrap">
              <Button asChild className="bg-blue-500 hover:bg-blue-600 rounded-full px-6">
                <Link to="/holograms">
                  {isRTL ? 'استكشاف الهولوجرام' : 'Explore Holograms'}
                </Link>
              </Button>
              
              <Button asChild variant="outline" className="rounded-full px-6 border-blue-300">
                <Link to="/how-it-works">
                  {isRTL ? 'كيف تعمل؟' : 'How It Works'}
                </Link>
              </Button>
            </div>
          </div>
          
          <div className="hologram-preview relative max-w-4xl mx-auto rounded-2xl overflow-hidden shadow-2xl">
            <div className="aspect-video bg-black relative">
              <video
                autoPlay
                muted
                loop
                className="w-full h-full object-cover"
              >
                <source src="https://archive.org/download/BigBuckBunny_124/Content/big_buck_bunny_720p_surround.mp4" type="video/mp4" />
              </video>
              
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20"></div>
              
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <h3 className="text-2xl font-bold mb-2">
                  {isRTL ? 'مجموعة الهولوجرام الملكية' : 'Royal Hologram Collection'}
                </h3>
                <p>
                  {isRTL 
                    ? 'تجربة تفاعلية ثلاثية الأبعاد للتحف الملكية النادرة'
                    : '3D interactive experience of rare royal artifacts'
                  }
                </p>
              </div>
              
              <div className="absolute top-4 right-4">
                <Button asChild variant="outline" className="bg-white/10 border-white/20 text-white hover:bg-white/20">
                  <Link to="/hologram/royal-collection">
                    {isRTL ? 'تجربة الآن' : 'Experience Now'}
                  </Link>
                </Button>
              </div>
              
              <div className="absolute inset-0 hologram-overlay pointer-events-none">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5"></div>
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-500/80 to-transparent hologram-scan"></div>
                <div className="absolute inset-y-0 left-0 w-px bg-gradient-to-b from-transparent via-blue-500/80 to-transparent hologram-scan-vertical"></div>
                <div className="absolute inset-y-0 right-0 w-px bg-gradient-to-b from-transparent via-blue-500/80 to-transparent hologram-scan-vertical" style={{ animationDelay: '1s' }}></div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Virtual Tours Section */}
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
      
      {/* Digital Auctions Section */}
      <section className="museum-container py-16">
        <div className="flex justify-between items-center mb-10">
          <h2 className="section-title">
            {isRTL ? 'المزادات الرقمية' : 'Digital Auctions'}
          </h2>
          <Link to="/auctions">
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
                <Button className="w-full mt-4 cta-button">
                  {isRTL ? 'المزايدة الآن' : 'Bid Now'}
                </Button>
              </motion.div>
            );
          })}
        </div>
      </section>
      
      {/* Newsletter Section */}
      <section className="bg-museum-olive text-white py-16">
        <div className="museum-container text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {isRTL ? 'اشترك في النشرة الإخبارية لدينا' : 'Subscribe to Our Newsletter'}
          </h2>
          <p className="max-w-2xl mx-auto mb-8">
            {isRTL 
              ? 'احصل على آخر الأخبار حول المعارض الجديدة، المزادات القادمة، والجولات الافتراضية مباشرة إلى بريدك الإلكتروني.'
              : 'Get the latest news about new exhibitions, upcoming auctions, and virtual tours delivered straight to your inbox.'
            }
          </p>
          <form className="max-w-md mx-auto flex gap-2 flex-col sm:flex-row">
            <input 
              type="email" 
              placeholder={isRTL ? 'بريدك الإلكتروني' : 'Your Email'} 
              className="px-4 py-2 rounded-full flex-grow bg-white text-foreground"
            />
            <Button className="bg-museum-brown hover:bg-museum-brown/90 rounded-full">
              {isRTL ? 'اشترك' : 'Subscribe'}
            </Button>
          </form>
        </div>
      </section>
      
      <Footer isRTL={isRTL} />
    </div>
  );
};

export default Index;
