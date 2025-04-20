import { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { ArrowRight, Play, Volume2, VolumeX, Info, Maximize, Map, Boxes, Pause } from 'lucide-react';
import { featuredArtifacts } from '@/data/mockData';

const VirtualMuseum = () => {
  const [isRTL, setIsRTL] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const [currentScene, setCurrentScene] = useState(1);
  const [isInfoVisible, setIsInfoVisible] = useState(false);
  const [viewMode, setViewMode] = useState<'standard' | 'hologram'>('standard');
  const videoRef = useRef<HTMLVideoElement>(null);
  const location = useLocation();
  
  const scenes = [
    {
      id: 1,
      title: { en: 'Main Hall', ar: 'القاعة الرئيسية' },
      description: { 
        en: 'Welcome to the main hall of Pittura Digital Museum. This vast space showcases our most precious artifacts from various eras.', 
        ar: 'مرحبًا بك في القاعة الرئيسية لمتحف بيتورا الرقمي. تعرض هذه المساحة الواسعة أكثر قطعنا الأثرية قيمة من مختلف العصور.' 
      },
      video: 'https://archive.org/download/BigBuckBunny_124/Content/big_buck_bunny_720p_surround.mp4'
    },
    {
      id: 2,
      title: { en: 'Ancient Artifacts', ar: 'القطع الأثرية القديمة' },
      description: { 
        en: 'This section houses artifacts from prehistoric and ancient eras, including tools, pottery, and early artistic works.', 
        ar: 'يضم هذا القسم قطعًا أثرية من عصور ما قبل التاريخ والعصور القديمة، بما في ذلك الأدوات والفخار والأعمال الفنية المبكرة.'
      },
      video: 'https://archive.org/download/BigBuckBunny_124/Content/big_buck_bunny_720p_surround.mp4'
    },
    {
      id: 3,
      title: { en: 'Islamic Golden Age', ar: 'العصر الذهبي الإسلامي' },
      description: { 
        en: 'Explore the scientific and artistic achievements of the Islamic Golden Age through manuscripts, instruments, and architectural models.', 
        ar: 'استكشف الإنجازات العلمية والفنية للعصر الذهبي الإسلامي من خلال المخطوطات والأدوات والنماذج المعمارية.'
      },
      video: 'https://archive.org/download/BigBuckBunny_124/Content/big_buck_bunny_720p_surround.mp4'
    }
  ];
  
  const currentSceneData = scenes.find(scene => scene.id === currentScene) || scenes[0];

  useEffect(() => {
    // Check URL for language parameter
    const params = new URLSearchParams(location.search);
    setIsRTL(params.get('lang') === 'ar');
  }, [location]);
  
  useEffect(() => {
    if (videoRef.current) {
      if (isPaused) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
    }
  }, [isPaused]);

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };
  
  const togglePlayPause = () => {
    setIsPaused(!isPaused);
  };
  
  const changeScene = (sceneId: number) => {
    setCurrentScene(sceneId);
    setIsInfoVisible(false);
    if (videoRef.current) {
      videoRef.current.load();
      if (!isPaused) {
        videoRef.current.play();
      }
    }
  };
  
  const toggleViewMode = () => {
    setViewMode(viewMode === 'standard' ? 'hologram' : 'standard');
  };

  return (
    <div className={isRTL ? 'rtl' : ''}>
      <Navigation isRTL={isRTL} />
      
      <div className="virtual-museum bg-black min-h-screen">
        {/* Video Tour View */}
        <div className="relative h-[80vh]">
          <div className={`absolute inset-0 ${viewMode === 'hologram' ? 'bg-black' : ''}`}>
            <video
              ref={videoRef}
              autoPlay
              muted={isMuted}
              loop
              className="w-full h-full object-cover"
            >
              <source src={currentSceneData.video} type="video/mp4" />
            </video>
            
            {/* Hologram overlay */}
            {viewMode === 'hologram' && (
              <div className="absolute inset-0 hologram-overlay pointer-events-none">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5"></div>
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-500/80 to-transparent hologram-scan"></div>
                <div className="absolute inset-y-0 left-0 w-px bg-gradient-to-b from-transparent via-blue-500/80 to-transparent hologram-scan-vertical"></div>
                <div className="absolute inset-y-0 right-0 w-px bg-gradient-to-b from-transparent via-blue-500/80 to-transparent hologram-scan-vertical" style={{ animationDelay: '1s' }}></div>
              </div>
            )}
          </div>
          
          {/* Video controls */}
          <div className="absolute bottom-8 left-8 right-8 flex justify-between items-center z-10">
            <div className="flex items-center gap-4">
              <Button 
                variant="outline" 
                size="icon"
                className="bg-black/40 backdrop-blur-md border-white/20 text-white hover:bg-black/60 rounded-full"
                onClick={togglePlayPause}
              >
                {isPaused ? <Play className="w-4 h-4" /> : <Pause className="w-4 h-4" />}
              </Button>
              
              <Button 
                variant="outline" 
                size="icon"
                className="bg-black/40 backdrop-blur-md border-white/20 text-white hover:bg-black/60 rounded-full"
                onClick={toggleMute}
              >
                {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              </Button>
              
              <Button 
                variant="outline" 
                size="icon"
                className="bg-black/40 backdrop-blur-md border-white/20 text-white hover:bg-black/60 rounded-full"
                onClick={() => setIsInfoVisible(!isInfoVisible)}
              >
                <Info className="w-4 h-4" />
              </Button>
            </div>
            
            <div className="flex items-center gap-4">
              <Button 
                variant="outline" 
                className={`bg-black/40 backdrop-blur-md border-white/20 text-white hover:bg-black/60 rounded-full ${
                  viewMode === 'hologram' ? 'border-blue-400 text-blue-400' : ''
                }`}
                onClick={toggleViewMode}
              >
                <Boxes className="w-4 h-4 mr-2" />
                {isRTL 
                  ? (viewMode === 'standard' ? 'عرض الهولوجرام' : 'عرض عادي')
                  : (viewMode === 'standard' ? 'Hologram View' : 'Standard View')
                }
              </Button>
              
              <Button 
                variant="outline" 
                size="icon"
                className="bg-black/40 backdrop-blur-md border-white/20 text-white hover:bg-black/60 rounded-full"
              >
                <Maximize className="w-4 h-4" />
              </Button>
            </div>
          </div>
          
          {/* Scene info overlay */}
          {isInfoVisible && (
            <motion.div 
              className="absolute left-8 top-8 max-w-md bg-black/70 backdrop-blur-md rounded-lg p-6 text-white"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <h2 className="text-2xl font-bold mb-2">
                {isRTL ? currentSceneData.title.ar : currentSceneData.title.en}
              </h2>
              <p className="text-white/80">
                {isRTL ? currentSceneData.description.ar : currentSceneData.description.en}
              </p>
              
              <div className="mt-4">
                <Button variant="outline" className="bg-transparent border-white/20 text-white hover:bg-white/10">
                  {isRTL ? 'اكتشف المزيد' : 'Discover More'}
                </Button>
              </div>
            </motion.div>
          )}
          
          {/* Scene navigation */}
          <div className="absolute right-8 top-1/2 transform -translate-y-1/2 bg-black/40 backdrop-blur-md rounded-lg overflow-hidden border border-white/20 z-10">
            <div className="p-2">
              <Button 
                variant="outline" 
                size="icon"
                className="bg-transparent border-white/20 text-white hover:bg-white/10 rounded-full mb-2"
              >
                <Map className="w-4 h-4" />
              </Button>
              
              <div className="space-y-2">
                {scenes.map(scene => (
                  <Button 
                    key={scene.id}
                    variant={currentScene === scene.id ? "default" : "outline"}
                    size="icon"
                    className={`rounded-full ${
                      currentScene === scene.id 
                        ? 'bg-white text-black' 
                        : 'bg-transparent border-white/20 text-white hover:bg-white/10'
                    }`}
                    onClick={() => changeScene(scene.id)}
                  >
                    {scene.id}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        {/* Featured Artifacts in this scene */}
        <div className="container mx-auto px-4 py-16">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold text-white">
              {isRTL 
                ? `القطع الأثرية في ${currentSceneData.title.ar}`
                : `Artifacts in ${currentSceneData.title.en}`
              }
            </h2>
            <Button variant="link" className="text-blue-400" asChild>
              <a href="/artifacts" className="flex items-center gap-1">
                {isRTL ? 'عرض الكل' : 'View All'} 
                <ArrowRight className="w-4 h-4" />
              </a>
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {featuredArtifacts.slice(0, 4).map((artifact, index) => (
              <motion.div
                key={artifact.id}
                className="bg-black/40 backdrop-blur-md rounded-lg overflow-hidden border border-white/20 group"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="relative h-48">
                  <img 
                    src={artifact.imageUrl} 
                    alt={isRTL ? artifact.title.ar : artifact.title.en}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                  
                  {viewMode === 'hologram' && (
                    <div className="absolute inset-0 hologram-overlay opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-500/80 to-transparent hologram-scan"></div>
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-white mb-1">
                    {isRTL ? artifact.title.ar : artifact.title.en}
                  </h3>
                  <p className="text-sm text-white/70 mb-4">
                    {isRTL ? artifact.period.ar : artifact.period.en}
                  </p>
                  <Button 
                    size="sm" 
                    className={viewMode === 'hologram' ? 'bg-blue-600 hover:bg-blue-700 w-full' : 'w-full'}
                    asChild
                  >
                    <a href={`/artifact/${artifact.id}`}>
                      {isRTL ? 'عرض التفاصيل' : 'View Details'}
                    </a>
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
        
        {/* Other Tours */}
        <div className="bg-black/60 py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold text-white mb-8">
              {isRTL ? 'جولات أخرى قد تهمك' : 'Other Tours You Might Like'}
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[1, 2, 3].map((tour) => (
                <div key={tour} className="relative rounded-xl overflow-hidden group h-64">
                  <img 
                    src={`https://images.unsplash.com/photo-149232884${tour}8-e4f158c702ab?q=80&w=1974&auto=format&fit=crop`} 
                    alt={`Tour ${tour}`}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent"></div>
                  
                  <div className="absolute bottom-6 left-6 right-6 text-white">
                    <h3 className="text-xl font-bold mb-2">
                      {isRTL ? `جولة افتراضية ${tour}` : `Virtual Tour ${tour}`}
                    </h3>
                    <p className="text-sm text-white/70 mb-4">
                      {isRTL ? 'استكشف المعالم الفريدة والقطع الأثرية النادرة' : 'Explore unique landmarks and rare artifacts'}
                    </p>
                    <Button size="sm" className="bg-white text-black hover:bg-white/90">
                      {isRTL ? 'بد�� الجولة' : 'Start Tour'}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      <Footer isRTL={isRTL} />
    </div>
  );
};

export default VirtualMuseum;
