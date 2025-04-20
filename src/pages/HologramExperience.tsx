
import { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import HologramViewer from '@/components/HologramViewer';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowRight, Download, Share, Cube3D, Info } from 'lucide-react';
import { artifactDetails } from '@/data/mockData';

const HologramExperience = () => {
  const [isRTL, setIsRTL] = useState(false);
  const [viewMode, setViewMode] = useState<'standard' | 'hologram'>('hologram');
  const location = useLocation();
  const { id } = useParams<{ id: string }>();

  // Get artifact details based on ID if provided
  const artifact = id ? artifactDetails[id as keyof typeof artifactDetails] : null;

  useEffect(() => {
    // Check URL for language parameter
    const params = new URLSearchParams(location.search);
    setIsRTL(params.get('lang') === 'ar');
  }, [location]);

  return (
    <div className={isRTL ? 'rtl' : ''}>
      <Navigation isRTL={isRTL} />

      <div className="bg-black text-white min-h-screen">
        {/* Header */}
        <div className="relative py-16 px-4 md:py-24">
          <div className="absolute inset-0 bg-gradient-to-b from-blue-900/30 to-black/80 z-0"></div>
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2670&auto=format&fit=crop')] bg-cover bg-center opacity-10 z-0"></div>
          
          <div className="container mx-auto relative z-10">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-blue-500/20 backdrop-blur-md rounded-full flex items-center justify-center">
                <Cube3D className="w-6 h-6 text-blue-400" />
              </div>
              <h1 className="text-3xl md:text-5xl font-bold">
                {artifact 
                  ? (isRTL ? `${artifact.title.ar} - تجربة الهولوجرام` : `${artifact.title.en} - Hologram Experience`) 
                  : (isRTL ? 'تجربة الهولوجرام' : 'Hologram Experience')}
              </h1>
            </div>
            
            <p className="max-w-2xl text-lg text-blue-100/80 mb-8">
              {isRTL 
                ? 'استكشف القطع الأثرية بأسلوب هولوجرامي ثلاثي الأبعاد، وتفاعل مع التفاصيل الدقيقة بطريقة غير مسبوقة.'
                : 'Explore artifacts in 3D holographic style, interacting with intricate details in unprecedented ways.'}
            </p>
            
            <div className="flex gap-4 flex-wrap">
              <Button className="bg-blue-600 hover:bg-blue-700 rounded-full">
                {isRTL ? 'مشاركة التجربة' : 'Share Experience'}
              </Button>
              <Button variant="outline" className="bg-white/5 border-white/20 text-white hover:bg-white/10 rounded-full">
                {isRTL ? 'تنزيل النموذج' : 'Download Model'}
              </Button>
            </div>
          </div>
        </div>
        
        {/* Hologram Viewer Section */}
        <div className="container mx-auto px-4 py-8 -mt-10">
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="lg:w-2/3">
              <div className="bg-black/60 backdrop-blur-md border border-blue-500/20 rounded-2xl overflow-hidden">
                <div className="p-4 border-b border-blue-500/20 flex justify-between items-center">
                  <h3 className="font-medium text-blue-100">
                    {isRTL ? 'عرض الهولوجرام' : 'Hologram Viewer'}
                  </h3>
                  <div className="flex gap-2">
                    <Button 
                      size="sm" 
                      variant={viewMode === 'standard' ? 'default' : 'outline'} 
                      className={viewMode === 'standard' ? 'bg-blue-600' : 'bg-transparent border-blue-500/30 text-blue-100'}
                      onClick={() => setViewMode('standard')}
                    >
                      {isRTL ? 'عرض عادي' : 'Standard View'}
                    </Button>
                    <Button 
                      size="sm" 
                      variant={viewMode === 'hologram' ? 'default' : 'outline'} 
                      className={viewMode === 'hologram' ? 'bg-blue-600' : 'bg-transparent border-blue-500/30 text-blue-100'}
                      onClick={() => setViewMode('hologram')}
                    >
                      {isRTL ? 'هولوجرام' : 'Hologram'}
                    </Button>
                  </div>
                </div>
                <div className="p-0">
                  <HologramViewer isRTL={isRTL} />
                </div>
              </div>
              
              <Tabs defaultValue="info" className="mt-8">
                <TabsList className="bg-black/40 border border-blue-500/20">
                  <TabsTrigger 
                    value="info" 
                    className="data-[state=active]:bg-blue-600 data-[state=active]:text-white"
                  >
                    {isRTL ? 'معلومات' : 'Information'}
                  </TabsTrigger>
                  <TabsTrigger 
                    value="history" 
                    className="data-[state=active]:bg-blue-600 data-[state=active]:text-white"
                  >
                    {isRTL ? 'التاريخ' : 'History'}
                  </TabsTrigger>
                  <TabsTrigger 
                    value="specs" 
                    className="data-[state=active]:bg-blue-600 data-[state=active]:text-white"
                  >
                    {isRTL ? 'المواصفات' : 'Specifications'}
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="info" className="mt-4 bg-black/20 backdrop-blur-md rounded-lg p-6 border border-blue-500/10">
                  <h3 className="text-xl font-bold mb-4">
                    {isRTL ? 'عن هذه القطعة' : 'About this Artifact'}
                  </h3>
                  <p className="text-blue-100/90 mb-4">
                    {artifact ? (isRTL ? artifact.description.ar : artifact.description.en) : (
                      isRTL 
                        ? 'هذه القطعة الأثرية هي مثال رائع على الحرفية المتقنة للفنانين في العصر النبطي. تم اكتشافها في موقع الحجر الأثري، وتعود إلى القرن الأول الميلادي.'
                        : 'This artifact is an exquisite example of the craftsmanship of Nabataean artists. Discovered at the archaeological site of Hegra, it dates back to the 1st century CE.'
                    )}
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                    <div className="bg-blue-500/10 rounded-lg p-4">
                      <h4 className="font-semibold mb-2 text-blue-200">
                        {isRTL ? 'الفترة الزمنية' : 'Time Period'}
                      </h4>
                      <p className="text-sm">{artifact ? (isRTL ? artifact.period.ar : artifact.period.en) : '1st Century CE'}</p>
                    </div>
                    <div className="bg-blue-500/10 rounded-lg p-4">
                      <h4 className="font-semibold mb-2 text-blue-200">
                        {isRTL ? 'مكان الاكتشاف' : 'Discovery Location'}
                      </h4>
                      <p className="text-sm">{artifact ? (isRTL ? artifact.location.ar : artifact.location.en) : 'Hegra, AlUla'}</p>
                    </div>
                    <div className="bg-blue-500/10 rounded-lg p-4">
                      <h4 className="font-semibold mb-2 text-blue-200">
                        {isRTL ? 'المواد' : 'Materials'}
                      </h4>
                      <p className="text-sm">{artifact ? (isRTL ? artifact.materials.ar : artifact.materials.en) : 'Sandstone, Gold leaf'}</p>
                    </div>
                    <div className="bg-blue-500/10 rounded-lg p-4">
                      <h4 className="font-semibold mb-2 text-blue-200">
                        {isRTL ? 'الأبعاد' : 'Dimensions'}
                      </h4>
                      <p className="text-sm">{artifact ? (isRTL ? artifact.dimensions.ar : artifact.dimensions.en) : '45cm x 30cm x 15cm'}</p>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="history" className="mt-4 bg-black/20 backdrop-blur-md rounded-lg p-6 border border-blue-500/10">
                  <h3 className="text-xl font-bold mb-4">
                    {isRTL ? 'الخلفية التاريخية' : 'Historical Background'}
                  </h3>
                  <p className="text-blue-100/90 mb-4">
                    {isRTL 
                      ? 'كانت الحضارة النبطية من أهم الحضارات التي استوطنت شمال الجزيرة العربية، وامتدت في الفترة من حوالي القرن الرابع قبل الميلاد إلى القرن الثاني الميلادي. عُرف النبطيون بقدرتهم الفائقة على النحت في الصخر وإنشاء المباني المعقدة، وكانت مدائن صالح (الحجر) من أهم مدنهم في المملكة العربية السعودية.'
                      : 'The Nabataean civilization was one of the most important civilizations that settled in the northern Arabian Peninsula, extending from around the 4th century BCE to the 2nd century CE. The Nabataeans were known for their exceptional ability to carve into rock and create complex buildings, with Madain Saleh (Hegra) being one of their most important cities in what is now Saudi Arabia.'
                    }
                  </p>
                  <p className="text-blue-100/90">
                    {isRTL
                      ? 'تميز النبطيون بمهاراتهم الهندسية المتقدمة في جمع المياه وتخزينها، وهو ما مكنهم من الازدهار في بيئة صحراوية قاسية. كما برعوا في التجارة وسيطروا على طرق القوافل الرئيسية في المنطقة، مما جلب لهم ثروة كبيرة انعكست في فن العمارة والنحت الذي خلفوه.'
                      : 'The Nabataeans were distinguished by their advanced engineering skills in water collection and storage, which enabled them to thrive in a harsh desert environment. They also excelled in trade and controlled the main caravan routes in the region, bringing them great wealth that was reflected in the architecture and sculpture they left behind.'
                    }
                  </p>
                </TabsContent>
                
                <TabsContent value="specs" className="mt-4 bg-black/20 backdrop-blur-md rounded-lg p-6 border border-blue-500/10">
                  <h3 className="text-xl font-bold mb-4">
                    {isRTL ? 'المواصفات الفنية' : 'Technical Specifications'}
                  </h3>
                  
                  <div className="space-y-4">
                    <div className="flex justify-between border-b border-blue-500/20 pb-2">
                      <span className="text-blue-200">{isRTL ? 'دقة النموذج' : 'Model Resolution'}</span>
                      <span>2M polygons</span>
                    </div>
                    <div className="flex justify-between border-b border-blue-500/20 pb-2">
                      <span className="text-blue-200">{isRTL ? 'تنسيق الملف' : 'File Format'}</span>
                      <span>glTF, OBJ, STL</span>
                    </div>
                    <div className="flex justify-between border-b border-blue-500/20 pb-2">
                      <span className="text-blue-200">{isRTL ? 'حجم الملف' : 'File Size'}</span>
                      <span>25MB</span>
                    </div>
                    <div className="flex justify-between border-b border-blue-500/20 pb-2">
                      <span className="text-blue-200">{isRTL ? 'طريقة المسح' : 'Scanning Method'}</span>
                      <span>Photogrammetry</span>
                    </div>
                    <div className="flex justify-between border-b border-blue-500/20 pb-2">
                      <span className="text-blue-200">{isRTL ? 'متوافق مع' : 'Compatible With'}</span>
                      <span>WebXR, AR Kit, AR Core</span>
                    </div>
                  </div>
                  
                  <Button className="mt-6 bg-blue-600 hover:bg-blue-700">
                    <Download className="w-4 h-4 mr-2" />
                    {isRTL ? 'تنزيل المواصفات الكاملة' : 'Download Full Specifications'}
                  </Button>
                </TabsContent>
              </Tabs>
            </div>
            
            <div className="lg:w-1/3">
              <div className="bg-black/40 backdrop-blur-md border border-blue-500/20 rounded-2xl p-6 sticky top-20">
                <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                  <Info className="w-5 h-5 text-blue-400" />
                  {isRTL ? 'كيفية استخدام تجربة الهولوجرام' : 'How to Use Hologram Experience'}
                </h3>
                
                <div className="space-y-6">
                  <div className="flex gap-4">
                    <div className="bg-blue-500/20 text-blue-300 w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0">1</div>
                    <div>
                      <h4 className="font-semibold text-blue-200 mb-1">
                        {isRTL ? 'استكشف النموذج ثلاثي الأبعاد' : 'Explore the 3D Model'}
                      </h4>
                      <p className="text-sm text-blue-100/80">
                        {isRTL ? 'انقر واسحب لتدوير النموذج. استخدم عجلة الماوس للتكبير والتصغير.' : 'Click and drag to rotate the model. Use the mouse wheel to zoom in and out.'}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex gap-4">
                    <div className="bg-blue-500/20 text-blue-300 w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0">2</div>
                    <div>
                      <h4 className="font-semibold text-blue-200 mb-1">
                        {isRTL ? 'غيّر طريقة العرض' : 'Change View Mode'}
                      </h4>
                      <p className="text-sm text-blue-100/80">
                        {isRTL ? 'بدّل بين وضع العرض العادي ووضع الهولوغرام لتجارب مختلفة.' : 'Switch between standard view and hologram mode for different experiences.'}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex gap-4">
                    <div className="bg-blue-500/20 text-blue-300 w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0">3</div>
                    <div>
                      <h4 className="font-semibold text-blue-200 mb-1">
                        {isRTL ? 'جرّب في الواقع المعزز' : 'Try in Augmented Reality'}
                      </h4>
                      <p className="text-sm text-blue-100/80">
                        {isRTL ? 'على الأجهزة المدعومة، يمكنك تجربة النموذج في الواقع المعزز في مساحتك الخاصة.' : 'On supported devices, you can experience the model in augmented reality in your own space.'}
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-8 space-y-4">
                  <Button className="w-full bg-blue-600 hover:bg-blue-700 flex items-center gap-2 rounded-lg">
                    <Cube3D className="w-4 h-4" />
                    {isRTL ? 'عرض في الواقع المعزز' : 'View in AR'}
                  </Button>
                  
                  <Button variant="outline" className="w-full bg-transparent border-blue-500/30 hover:bg-blue-500/20 text-white flex items-center gap-2 rounded-lg">
                    <Download className="w-4 h-4" />
                    {isRTL ? 'تنزيل النموذج' : 'Download Model'}
                  </Button>
                  
                  <Button variant="outline" className="w-full bg-transparent border-blue-500/30 hover:bg-blue-500/20 text-white flex items-center gap-2 rounded-lg">
                    <Share className="w-4 h-4" />
                    {isRTL ? 'مشاركة التجربة' : 'Share Experience'}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* More Holograms Section */}
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
                    <Cube3D className="w-3 h-3" />
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
      </div>

      <Footer isRTL={isRTL} />
    </div>
  );
};

export default HologramExperience;
