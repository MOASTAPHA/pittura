
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Download } from 'lucide-react';

interface HologramTabsProps {
  isRTL?: boolean;
  artifact?: {
    description: { en: string; ar: string; };
    period: { en: string; ar: string; };
    location: { en: string; ar: string; };
    materials: { en: string; ar: string; };
    dimensions: { en: string; ar: string; };
  };
}

const HologramTabs = ({ isRTL = false, artifact }: HologramTabsProps) => {
  return (
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
  );
};

export default HologramTabs;
