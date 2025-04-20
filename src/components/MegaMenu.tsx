
import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Layers3, Map, Video, Boxes } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { featuredArtifacts, virtualTours } from '@/data/mockData';

interface MegaMenuProps {
  isRTL?: boolean;
  menuType: string;
  onClose: () => void;
}

const MegaMenu = ({ isRTL = false, menuType, onClose }: MegaMenuProps) => {
  const menuRef = useRef<HTMLDivElement>(null);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  const renderArtifactsMenu = () => (
    <div className="grid grid-cols-4 gap-6">
      <div className="col-span-1">
        <h3 className="font-bold text-lg mb-4">{isRTL ? 'تصفح حسب العصر' : 'Browse by Era'}</h3>
        <ul className="space-y-2">
          <li><Link to="/artifacts?era=prehistoric" className="hover:text-primary transition-colors">{isRTL ? 'ما قبل التاريخ' : 'Prehistoric'}</Link></li>
          <li><Link to="/artifacts?era=ancient" className="hover:text-primary transition-colors">{isRTL ? 'العصر القديم' : 'Ancient'}</Link></li>
          <li><Link to="/artifacts?era=islamic" className="hover:text-primary transition-colors">{isRTL ? 'العصر الإسلامي' : 'Islamic Era'}</Link></li>
          <li><Link to="/artifacts?era=modern" className="hover:text-primary transition-colors">{isRTL ? 'العصر الحديث' : 'Modern Era'}</Link></li>
          <li><Link to="/artifacts?era=contemporary" className="hover:text-primary transition-colors">{isRTL ? 'العصر المعاصر' : 'Contemporary'}</Link></li>
        </ul>
      </div>

      <div className="col-span-1">
        <h3 className="font-bold text-lg mb-4">{isRTL ? 'تصفح حسب النوع' : 'Browse by Type'}</h3>
        <ul className="space-y-2">
          <li><Link to="/artifacts?type=sculpture" className="hover:text-primary transition-colors">{isRTL ? 'النحت' : 'Sculpture'}</Link></li>
          <li><Link to="/artifacts?type=pottery" className="hover:text-primary transition-colors">{isRTL ? 'الفخار' : 'Pottery'}</Link></li>
          <li><Link to="/artifacts?type=jewelry" className="hover:text-primary transition-colors">{isRTL ? 'المجوهرات' : 'Jewelry'}</Link></li>
          <li><Link to="/artifacts?type=manuscript" className="hover:text-primary transition-colors">{isRTL ? 'المخطوطات' : 'Manuscripts'}</Link></li>
          <li><Link to="/artifacts?type=weapon" className="hover:text-primary transition-colors">{isRTL ? 'الأسلحة' : 'Weapons'}</Link></li>
        </ul>
      </div>

      <div className="col-span-2">
        <h3 className="font-bold text-lg mb-4">{isRTL ? 'مميزات' : 'Featured'}</h3>
        <div className="grid grid-cols-2 gap-4">
          {featuredArtifacts.slice(0, 2).map((artifact) => (
            <Link to={`/artifact/${artifact.id}`} key={artifact.id} className="group">
              <div className="relative rounded-lg overflow-hidden h-40">
                <img 
                  src={artifact.imageUrl} 
                  alt={isRTL ? artifact.title.ar : artifact.title.en}
                  className="w-full h-full object-cover transform transition-transform group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <h4 className="font-bold">{isRTL ? artifact.title.ar : artifact.title.en}</h4>
                  <p className="text-xs text-white/80">{isRTL ? artifact.period.ar : artifact.period.en}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
        
        <div className="mt-4 flex justify-end">
          <Button variant="link" asChild>
            <Link to="/artifacts" className="flex items-center gap-1">
              {isRTL ? 'عرض كل القطع الأثرية' : 'View all artifacts'} 
              <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );

  const renderToursMenu = () => (
    <div className="grid grid-cols-4 gap-6">
      <div className="col-span-1">
        <h3 className="font-bold text-lg mb-4">{isRTL ? 'أنواع الجولات' : 'Tour Types'}</h3>
        <ul className="space-y-2">
          <li className="flex items-center gap-2">
            <Video className="w-4 h-4" />
            <Link to="/tours?type=360" className="hover:text-primary transition-colors">
              {isRTL ? 'جولة ٣٦٠ درجة' : '360° Tours'}
            </Link>
          </li>
          <li className="flex items-center gap-2">
            <Map className="w-4 h-4" />
            <Link to="/tours?type=guided" className="hover:text-primary transition-colors">
              {isRTL ? 'جولات مع مرشد' : 'Guided Tours'}
            </Link>
          </li>
          <li className="flex items-center gap-2">
            <Layers3 className="w-4 h-4" />
            <Link to="/tours?type=interactive" className="hover:text-primary transition-colors">
              {isRTL ? 'جولات تفاعلية' : 'Interactive Tours'}
            </Link>
          </li>
        </ul>
      </div>

      <div className="col-span-3">
        <h3 className="font-bold text-lg mb-4">{isRTL ? 'جولات مميزة' : 'Featured Tours'}</h3>
        <div className="grid grid-cols-3 gap-4">
          {virtualTours.map((tour) => (
            <Link to={`/tour/${tour.id}`} key={tour.id} className="group">
              <div className="relative rounded-lg overflow-hidden h-40">
                <img 
                  src={tour.imageUrl} 
                  alt={isRTL ? tour.title.ar : tour.title.en}
                  className="w-full h-full object-cover transform transition-transform group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <h4 className="font-bold text-sm">{isRTL ? tour.title.ar : tour.title.en}</h4>
                  <p className="text-xs text-white/80">{isRTL ? `مدة الجولة: ${tour.duration} دقيقة` : `Duration: ${tour.duration} min`}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );

  const renderHologramsMenu = () => (
    <div className="grid grid-cols-3 gap-6">
      <div className="col-span-1">
        <h3 className="font-bold text-lg mb-4">{isRTL ? 'تجارب الهولوجرام' : 'Hologram Experiences'}</h3>
        <ul className="space-y-3">
          <li className="flex items-center gap-2">
            <Boxes className="w-4 h-4 text-blue-400" />
            <Link to="/holograms/gallery" className="hover:text-primary transition-colors">
              {isRTL ? 'معرض الهولوجرام' : 'Hologram Gallery'}
            </Link>
          </li>
          <li className="flex items-center gap-2">
            <Boxes className="w-4 h-4 text-green-400" />
            <Link to="/holograms/interactive" className="hover:text-primary transition-colors">
              {isRTL ? 'تجارب تفاعلية' : 'Interactive Experiences'}
            </Link>
          </li>
          <li className="flex items-center gap-2">
            <Boxes className="w-4 h-4 text-purple-400" />
            <Link to="/holograms/ar" className="hover:text-primary transition-colors">
              {isRTL ? 'الواقع المعزز' : 'Augmented Reality'}
            </Link>
          </li>
        </ul>

        <h3 className="font-bold text-lg mt-6 mb-4">{isRTL ? 'كيف يعمل؟' : 'How It Works'}</h3>
        <p className="text-sm text-muted-foreground">
          {isRTL 
            ? 'اكتشف كيف يمكنك تجربة الهولوجرام في المنزل أو في المتحف باستخدام تقنيات الواقع المعزز والواقع الافتراضي.'
            : 'Discover how you can experience holograms at home or in the museum using AR and VR technologies.'}
        </p>
        <Button variant="outline" className="mt-3" asChild>
          <Link to="/holograms/how-it-works">{isRTL ? 'معرفة المزيد' : 'Learn More'}</Link>
        </Button>
      </div>

      <div className="col-span-2">
        <div className="relative rounded-lg overflow-hidden h-64 hologram-preview">
          <video
            autoPlay
            muted
            loop
            className="w-full h-full object-cover"
          >
            <source src="https://archive.org/download/BigBuckBunny_124/Content/big_buck_bunny_720p_surround.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
          <div className="absolute bottom-6 left-6 right-6 text-white">
            <h4 className="font-bold text-xl">{isRTL ? 'تجربة الهولوجرام المميزة' : 'Featured Hologram Experience'}</h4>
            <p className="text-sm text-white/80 mb-4">
              {isRTL 
                ? 'استكشف القطع الأثرية بطريقة جديدة كليًا مع تقنية الهولوجرام ثلاثية الأبعاد.'
                : 'Explore artifacts in an entirely new way with 3D holographic technology.'}
            </p>
            <Button className="bg-blue-500 hover:bg-blue-600">{isRTL ? 'تجربة الآن' : 'Experience Now'}</Button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div 
      ref={menuRef}
      className={`mega-menu absolute left-0 right-0 bg-white/95 dark:bg-black/95 backdrop-blur-md shadow-lg border-b z-40 p-8 animate-fade-in ${isRTL ? 'rtl' : ''}`}
    >
      {menuType === 'artifacts' && renderArtifactsMenu()}
      {menuType === 'tours' && renderToursMenu()}
      {menuType === 'holograms' && renderHologramsMenu()}
    </div>
  );
};

export default MegaMenu;
