
import { useState, useEffect } from 'react';
import { useParams, useLocation, Link } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import ModelViewer from '@/components/ModelViewer';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { artifactDetails, featuredArtifacts } from '@/data/mockData';
import ArtifactCard from '@/components/ArtifactCard';

const ArtifactDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [isRTL, setIsRTL] = useState(false);
  const location = useLocation();
  const [selectedImage, setSelectedImage] = useState(0);
  
  // Get artifact details based on ID
  const artifact = id ? artifactDetails[id as keyof typeof artifactDetails] : null;
  
  // Get related artifacts
  const relatedArtifactsData = artifact?.relatedArtifacts
    ? featuredArtifacts.filter(a => artifact.relatedArtifacts.includes(a.id))
    : [];
  
  useEffect(() => {
    // Check URL for language parameter
    const params = new URLSearchParams(location.search);
    setIsRTL(params.get('lang') === 'ar');
  }, [location]);
  
  if (!artifact) {
    return (
      <div className={isRTL ? 'rtl' : ''}>
        <Navigation isRTL={isRTL} />
        <div className="museum-container py-16 text-center">
          <h1 className="text-3xl font-bold mb-4">
            {isRTL ? 'القطعة الأثرية غير موجودة' : 'Artifact Not Found'}
          </h1>
          <p className="mb-6">
            {isRTL 
              ? 'عذراً، لم نتمكن من العثور على القطعة الأثرية التي تبحث عنها.'
              : 'Sorry, we couldn\'t find the artifact you were looking for.'
            }
          </p>
          <Button asChild>
            <Link to="/">
              {isRTL ? 'العودة إلى الصفحة الرئيسية' : 'Return to Home'}
            </Link>
          </Button>
        </div>
        <Footer isRTL={isRTL} />
      </div>
    );
  }
  
  return (
    <div className={isRTL ? 'rtl' : ''}>
      <Navigation isRTL={isRTL} />
      
      <div className="museum-container py-8">
        <div className="mb-6">
          <Link to="/" className="text-primary hover:underline">
            {isRTL ? 'الرئيسية' : 'Home'}
          </Link>
          {' > '}
          <Link to="/artifacts" className="text-primary hover:underline">
            {isRTL ? 'القطع الأثرية' : 'Artifacts'}
          </Link>
          {' > '}
          <span className="text-muted-foreground">
            {isRTL ? artifact.title.ar : artifact.title.en}
          </span>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <div>
            <div className="relative h-[500px] rounded-lg overflow-hidden mb-4">
              <img 
                src={artifact.images[selectedImage]}
                alt={isRTL ? artifact.title.ar : artifact.title.en}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex gap-3 overflow-x-auto pb-2">
              {artifact.images.map((image, index) => (
                <button
                  key={index}
                  className={`rounded-md overflow-hidden border-2 min-w-[80px] h-[80px] ${selectedImage === index ? 'border-primary' : 'border-transparent'}`}
                  onClick={() => setSelectedImage(index)}
                >
                  <img 
                    src={image}
                    alt={`${isRTL ? artifact.title.ar : artifact.title.en} ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>
          
          <div>
            <h1 className="text-3xl md:text-4xl font-bold mb-2">
              {isRTL ? artifact.title.ar : artifact.title.en}
            </h1>
            <p className="text-muted-foreground mb-4">
              {isRTL ? artifact.period.ar : artifact.period.en}
            </p>
            
            <div className="bg-muted p-6 rounded-lg mb-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h3 className="font-semibold text-sm mb-1 text-muted-foreground">
                    {isRTL ? 'الموقع' : 'Location'}
                  </h3>
                  <p>{isRTL ? artifact.location.ar : artifact.location.en}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-sm mb-1 text-muted-foreground">
                    {isRTL ? 'الأبعاد' : 'Dimensions'}
                  </h3>
                  <p>{isRTL ? artifact.dimensions.ar : artifact.dimensions.en}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-sm mb-1 text-muted-foreground">
                    {isRTL ? 'المواد' : 'Materials'}
                  </h3>
                  <p>{isRTL ? artifact.materials.ar : artifact.materials.en}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-sm mb-1 text-muted-foreground">
                    {isRTL ? 'التصنيف' : 'Category'}
                  </h3>
                  <p>{isRTL ? artifact.category.ar : artifact.category.en}</p>
                </div>
              </div>
            </div>
            
            <div className="mb-6">
              <h2 className="text-2xl font-semibold mb-3">
                {isRTL ? 'الوصف' : 'Description'}
              </h2>
              <p className="text-lg whitespace-pre-line">
                {isRTL ? artifact.description.ar : artifact.description.en}
              </p>
            </div>
            
            <div className="mb-6">
              <h2 className="text-2xl font-semibold mb-3">
                {isRTL ? 'الحفظ والترميم' : 'Conservation'}
              </h2>
              <p>
                {isRTL ? artifact.conservation.ar : artifact.conservation.en}
              </p>
            </div>
            
            <div className="flex space-x-4">
              <Button className="cta-button">
                {isRTL ? 'مشاركة' : 'Share'}
              </Button>
              <Button variant="outline">
                {isRTL ? 'إضافة إلى المفضلة' : 'Add to Favorites'}
              </Button>
            </div>
          </div>
        </div>
        
        {/* Tabs for additional content */}
        <Tabs defaultValue="model" className="mb-12">
          <TabsList className="w-full justify-start mb-4">
            <TabsTrigger value="model">
              {isRTL ? 'النموذج ثلاثي الأبعاد' : '3D Model'}
            </TabsTrigger>
            <TabsTrigger value="history">
              {isRTL ? 'السياق التاريخي' : 'Historical Context'}
            </TabsTrigger>
            <TabsTrigger value="related">
              {isRTL ? 'القطع ذات الصلة' : 'Related Artifacts'}
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="model" className="pt-4">
            <ModelViewer isRTL={isRTL} />
          </TabsContent>
          
          <TabsContent value="history" className="pt-4">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold mb-4">
                {isRTL ? 'السياق التاريخي' : 'Historical Context'}
              </h3>
              <div className="prose max-w-none">
                <p>
                  {isRTL 
                    ? 'كانت الحضارة النبطية من أهم الحضارات التي استوطنت شمال الجزيرة العربية، وامتدت في الفترة من حوالي القرن الرابع قبل الميلاد إلى القرن الثاني الميلادي. عُرف النبطيون بقدرتهم الفائقة على النحت في الصخر وإنشاء المباني المعقدة، وكانت مدائن صالح (الحجر) من أهم مدنهم في المملكة العربية السعودية.'
                    : 'The Nabataean civilization was one of the most important civilizations that settled in the northern Arabian Peninsula, extending from around the 4th century BCE to the 2nd century CE. The Nabataeans were known for their exceptional ability to carve into rock and create complex buildings, with Madain Saleh (Hegra) being one of their most important cities in what is now Saudi Arabia.'
                  }
                </p>
                <p className="mt-4">
                  {isRTL
                    ? 'تميز النبطيون بمهاراتهم الهندسية المتقدمة في جمع المياه وتخزينها، وهو ما مكنهم من الازدهار في بيئة صحراوية قاسية. كما برعوا في التجارة وسيطروا على طرق القوافل الرئيسية في المنطقة، مما جلب لهم ثروة كبيرة انعكست في فن العمارة والنحت الذي خلفوه.'
                    : 'The Nabataeans were distinguished by their advanced engineering skills in water collection and storage, which enabled them to thrive in a harsh desert environment. They also excelled in trade and controlled the main caravan routes in the region, bringing them great wealth that was reflected in the architecture and sculpture they left behind.'
                  }
                </p>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="related" className="pt-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedArtifactsData.map((relatedArtifact) => (
                <ArtifactCard 
                  key={relatedArtifact.id}
                  artifact={relatedArtifact}
                  isRTL={isRTL}
                />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
      
      <Footer isRTL={isRTL} />
    </div>
  );
};

export default ArtifactDetail;
