
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import PanoramaViewer from '@/components/PanoramaViewer';
import HolographicGuide from '@/components/HolographicGuide';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { locations } from '@/data/tourLocations';
import { Badge } from '@/components/ui/badge';
import { VrHeadset } from 'lucide-react';

const PanoramaExperience = () => {
  const [isRTL, setIsRTL] = useState(false);
  const [showViewer, setShowViewer] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState('alula');
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const navigate = useNavigate();
  const params = useParams();
  
  useEffect(() => {
    if (params.locationId) {
      setSelectedLocation(params.locationId);
      setShowViewer(true);
    }
  }, [params]);
  
  const filteredLocations = locations.filter(location => {
    if (selectedRegion && location.region !== selectedRegion) return false;
    if (selectedType && location.type !== selectedType) return false;
    return true;
  });
  
  const handleLocationSelect = (locationId: string) => {
    setSelectedLocation(locationId);
    setShowViewer(true);
    navigate(`/360-experience/${locationId}`);
  };
  
  const handleCloseViewer = () => {
    setShowViewer(false);
    navigate('/360-experience');
  };
  
  return (
    <div className={isRTL ? 'rtl' : ''}>
      <Navigation isRTL={isRTL} />
      
      {showViewer ? (
        <div className="h-screen relative">
          <PanoramaViewer
            onClose={handleCloseViewer}
            isRTL={isRTL}
            locationId={selectedLocation}
          />
          <HolographicGuide isRTL={isRTL} />
        </div>
      ) : (
        <div className="min-h-screen bg-gradient-to-b from-museum-sand to-white">
          {/* Hero Section */}
          <div className="relative h-[50vh] md:h-[60vh] flex items-center overflow-hidden">
            <div className="absolute inset-0 z-0">
              <img 
                src="https://images.unsplash.com/photo-1533408648768-c09bb62b670c?q=80&w=2066&auto=format&fit=crop" 
                alt="Virtual Tours" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/40"></div>
            </div>
            
            <div className="container mx-auto px-4 z-10 relative">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="max-w-3xl"
              >
                <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
                  {isRTL ? 'استكشف المملكة العربية السعودية بزاوية 360 درجة' : 'Explore Saudi Arabia in 360°'}
                </h1>
                <p className="text-xl text-white/80 mb-8">
                  {isRTL 
                    ? 'جولات افتراضية غامرة لأجمل المواقع الثقافية والطبيعية في المملكة'
                    : 'Immersive virtual tours of the most beautiful cultural and natural sites in the Kingdom'
                  }
                </p>
                
                <div className="flex flex-wrap gap-4">
                  <Button 
                    size="lg" 
                    className="bg-primary hover:bg-primary/90 text-white"
                    onClick={() => handleLocationSelect('alula')}
                  >
                    {isRTL ? 'ابدأ الاستكشاف' : 'Start Exploring'}
                  </Button>
                  
                  <Button 
                    size="lg" 
                    variant="outline"
                    className="bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white/20"
                  >
                    <VrHeadset className="h-5 w-5 mr-2" />
                    {isRTL ? 'تجربة الواقع الافتراضي' : 'VR Experience'}
                  </Button>
                </div>
              </motion.div>
            </div>
          </div>
          
          {/* Locations Section */}
          <div className="container mx-auto px-4 py-12">
            <div className="mb-8">
              <h2 className="text-3xl font-bold mb-6">
                {isRTL ? 'استكشف المواقع' : 'Explore Locations'}
              </h2>
              
              <Tabs defaultValue="all" className="w-full">
                <div className="flex flex-col md:flex-row gap-6 mb-8">
                  <div>
                    <h3 className="text-lg font-medium mb-2">
                      {isRTL ? 'المناطق' : 'Regions'}
                    </h3>
                    <TabsList className="flex flex-wrap gap-2">
                      <TabsTrigger 
                        value="all-regions" 
                        onClick={() => setSelectedRegion(null)}
                        className={!selectedRegion ? 'border-2 border-primary' : ''}
                      >
                        {isRTL ? 'الكل' : 'All'}
                      </TabsTrigger>
                      <TabsTrigger 
                        value="north" 
                        onClick={() => setSelectedRegion('north')}
                        className={selectedRegion === 'north' ? 'border-2 border-primary' : ''}
                      >
                        {isRTL ? 'الشمال' : 'North'}
                      </TabsTrigger>
                      <TabsTrigger 
                        value="south" 
                        onClick={() => setSelectedRegion('south')}
                        className={selectedRegion === 'south' ? 'border-2 border-primary' : ''}
                      >
                        {isRTL ? 'الجنوب' : 'South'}
                      </TabsTrigger>
                      <TabsTrigger 
                        value="east" 
                        onClick={() => setSelectedRegion('east')}
                        className={selectedRegion === 'east' ? 'border-2 border-primary' : ''}
                      >
                        {isRTL ? 'الشرق' : 'East'}
                      </TabsTrigger>
                      <TabsTrigger 
                        value="west" 
                        onClick={() => setSelectedRegion('west')}
                        className={selectedRegion === 'west' ? 'border-2 border-primary' : ''}
                      >
                        {isRTL ? 'الغرب' : 'West'}
                      </TabsTrigger>
                      <TabsTrigger 
                        value="central" 
                        onClick={() => setSelectedRegion('central')}
                        className={selectedRegion === 'central' ? 'border-2 border-primary' : ''}
                      >
                        {isRTL ? 'الوسط' : 'Central'}
                      </TabsTrigger>
                    </TabsList>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium mb-2">
                      {isRTL ? 'النوع' : 'Type'}
                    </h3>
                    <TabsList className="flex flex-wrap gap-2">
                      <TabsTrigger 
                        value="all-types" 
                        onClick={() => setSelectedType(null)}
                        className={!selectedType ? 'border-2 border-primary' : ''}
                      >
                        {isRTL ? 'الكل' : 'All'}
                      </TabsTrigger>
                      <TabsTrigger 
                        value="historical" 
                        onClick={() => setSelectedType('historical')}
                        className={selectedType === 'historical' ? 'border-2 border-primary' : ''}
                      >
                        {isRTL ? 'تاريخي' : 'Historical'}
                      </TabsTrigger>
                      <TabsTrigger 
                        value="natural" 
                        onClick={() => setSelectedType('natural')}
                        className={selectedType === 'natural' ? 'border-2 border-primary' : ''}
                      >
                        {isRTL ? 'طبيعي' : 'Natural'}
                      </TabsTrigger>
                      <TabsTrigger 
                        value="cultural" 
                        onClick={() => setSelectedType('cultural')}
                        className={selectedType === 'cultural' ? 'border-2 border-primary' : ''}
                      >
                        {isRTL ? 'ثقافي' : 'Cultural'}
                      </TabsTrigger>
                      <TabsTrigger 
                        value="modern" 
                        onClick={() => setSelectedType('modern')}
                        className={selectedType === 'modern' ? 'border-2 border-primary' : ''}
                      >
                        {isRTL ? 'حديث' : 'Modern'}
                      </TabsTrigger>
                    </TabsList>
                  </div>
                </div>
                
                <TabsContent value="all" className="mt-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredLocations.map((location) => (
                      <motion.div
                        key={location.id}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        viewport={{ once: true }}
                        className="group cursor-pointer rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
                        onClick={() => handleLocationSelect(location.id)}
                      >
                        <div className="relative h-64">
                          <img 
                            src={location.thumbnailUrl} 
                            alt={isRTL ? location.title.ar : location.title.en}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                          
                          <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                            <h3 className="text-xl font-bold mb-1">
                              {isRTL ? location.title.ar : location.title.en}
                            </h3>
                            <p className="text-sm text-white/80 line-clamp-2">
                              {isRTL ? location.description.ar : location.description.en}
                            </p>
                          </div>
                          
                          {location.featured && (
                            <Badge className="absolute top-3 right-3 bg-primary text-white">
                              {isRTL ? 'مميز' : 'Featured'}
                            </Badge>
                          )}
                          
                          {location.vrEnabled && (
                            <Badge variant="outline" className="absolute top-3 left-3 bg-black/50 text-white border-white/30 flex items-center gap-1">
                              <VrHeadset className="h-3 w-3" />
                              VR
                            </Badge>
                          )}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
          
          {/* Immersive Technology Section */}
          <div className="bg-museum-blue/20 py-16">
            <div className="container mx-auto px-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                <div>
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                  >
                    <h2 className="text-3xl font-bold mb-4">
                      {isRTL ? 'تجربة الواقع الافتراضي لجولاتنا' : 'VR Experience for Our Tours'}
                    </h2>
                    <p className="text-lg mb-6">
                      {isRTL 
                        ? 'اغمر نفسك تمامًا في الثقافة السعودية من خلال سماعات الواقع الافتراضي. الآن يمكنك استكشاف العلا، شبارة، الدرعية، وأماكن أخرى كما لو كنت هناك.'
                        : 'Immerse yourself fully in Saudi culture through virtual reality headsets. Now you can explore AlUla, Shebara, Diriyah, and other locations as if you were there.'
                      }
                    </p>
                    
                    <ul className="space-y-3 mb-8">
                      {['Oculus Quest', 'HTC Vive', 'PlayStation VR', 'Valve Index'].map((device) => (
                        <li key={device} className="flex items-center gap-2">
                          <span className="h-2 w-2 rounded-full bg-primary"></span>
                          <span>{device}</span>
                        </li>
                      ))}
                    </ul>
                    
                    <Button className="bg-primary hover:bg-primary/90 text-white">
                      {isRTL ? 'معرفة المزيد عن الواقع الافتراضي' : 'Learn More About VR'}
                    </Button>
                  </motion.div>
                </div>
                
                <div>
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="relative rounded-xl overflow-hidden shadow-xl"
                  >
                    <img 
                      src="https://images.unsplash.com/photo-1622979135225-d2ba269cf1ac?q=80&w=2070&auto=format&fit=crop" 
                      alt="VR Experience" 
                      className="w-full h-[400px] object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    <div className="absolute bottom-6 left-6 right-6">
                      <Button variant="outline" className="bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white/20">
                        {isRTL ? 'مشاهدة العرض التوضيحي' : 'Watch Demo'}
                      </Button>
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      
      <Footer isRTL={isRTL} />
    </div>
  );
};

export default PanoramaExperience;
