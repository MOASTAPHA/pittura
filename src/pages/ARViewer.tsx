
import { useState, useEffect } from 'react';
import { useParams, useLocation, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { artifactDetails } from '@/data/mockData';
import { ArrowLeft, Camera, Maximize2 } from 'lucide-react';

const ARViewer = () => {
  const { id } = useParams<{ id: string }>();
  const [isRTL, setIsRTL] = useState(false);
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);
  const [deviceSupportsAR, setDeviceSupportsAR] = useState(false);
  
  // Get artifact details based on ID
  const artifact = id ? artifactDetails[id as keyof typeof artifactDetails] : null;
  
  useEffect(() => {
    // Check URL for language parameter
    const params = new URLSearchParams(location.search);
    setIsRTL(params.get('lang') === 'ar');
    
    // Check if device supports WebXR/AR
    const checkARSupport = async () => {
      try {
        // Check if WebXR is supported with AR session
        if ('xr' in navigator) {
          const supported = await (navigator as any).xr?.isSessionSupported('immersive-ar');
          setDeviceSupportsAR(!!supported);
        } else {
          setDeviceSupportsAR(false);
        }
      } catch (error) {
        console.error('Error checking AR support:', error);
        setDeviceSupportsAR(false);
      } finally {
        setIsLoading(false);
      }
    };
    
    checkARSupport();
  }, [location]);
  
  if (!artifact) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${isRTL ? 'rtl' : ''}`}>
        <div className="text-center p-6 max-w-md">
          <h1 className="text-2xl font-bold mb-4">
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
      </div>
    );
  }
  
  // AR View - For demonstration purposes. In a real app, this would use WebXR API
  const ARView = () => (
    <div className="relative w-full h-[calc(100vh-80px)]">
      {/* This would be a WebXR canvas in a real implementation */}
      <div className="absolute inset-0 bg-black">
        <img 
          src={artifact.images[0]} 
          alt={isRTL ? artifact.title.ar : artifact.title.en}
          className="w-full h-full object-contain opacity-50"
        />
        {/* Placeholder AR interface */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-white text-center">
            <p className="mb-4 text-lg">
              {isRTL 
                ? 'هذا عرض توضيحي للواقع المعزز. في التطبيق الفعلي، سترى النموذج ثلاثي الأبعاد على سطح حقيقي.'
                : 'This is an AR demonstration. In a real app, you would see the 3D model on a real surface.'}
            </p>
          </div>
        </div>
        {/* AR Controls */}
        <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-6">
          <Button variant="secondary" size="lg" className="rounded-full bg-white/20 backdrop-blur-md" onClick={() => window.history.back()}>
            <ArrowLeft className="mr-2" />
            {isRTL ? 'عودة' : 'Back'}
          </Button>
          <Button variant="secondary" size="lg" className="rounded-full bg-white/20 backdrop-blur-md">
            <Camera className="mr-2" />
            {isRTL ? 'التقاط' : 'Capture'}
          </Button>
          <Button variant="secondary" size="lg" className="rounded-full bg-white/20 backdrop-blur-md">
            <Maximize2 className="mr-2" />
            {isRTL ? 'تدوير' : 'Rotate'}
          </Button>
        </div>
      </div>
    </div>
  );
  
  // Loading state
  if (isLoading) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${isRTL ? 'rtl' : ''}`}>
        <div className="text-center p-6">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mx-auto mb-4"></div>
          <p>{isRTL ? 'جاري التحميل...' : 'Loading...'}</p>
        </div>
      </div>
    );
  }
  
  // Not supported state
  if (!deviceSupportsAR) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${isRTL ? 'rtl' : ''}`}>
        <div className="text-center p-6 max-w-md">
          <h1 className="text-2xl font-bold mb-4">
            {isRTL ? 'الواقع المعزز غير مدعوم' : 'AR Not Supported'}
          </h1>
          <p className="mb-6">
            {isRTL 
              ? 'يبدو أن جهازك لا يدعم تقنية الواقع المعزز. يرجى المحاولة بجهاز آخر أو استخدام عارض النماذج ثلاثية الأبعاد.'
              : 'Your device does not appear to support Augmented Reality. Please try with another device or use the 3D model viewer.'}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild>
              <Link to={`/artifact/${id}`}>
                {isRTL ? 'العودة إلى صفحة القطعة الأثرية' : 'Back to Artifact Page'}
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link to="/">
                {isRTL ? 'الرئيسية' : 'Home'}
              </Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className={isRTL ? 'rtl' : ''}>
      <header className="bg-black/90 text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <Link to={`/artifact/${id}`} className="flex items-center text-white hover:text-white/80">
            <ArrowLeft className="mr-2" size={18} />
            {isRTL ? 'العودة إلى صفحة القطعة الأثرية' : 'Back to Artifact'}
          </Link>
          <h1 className="text-lg font-medium">
            {isRTL ? artifact.title.ar : artifact.title.en}
          </h1>
          <div className="w-24"></div> {/* Placeholder for balance */}
        </div>
      </header>
      
      <ARView />
    </div>
  );
};

export default ARViewer;
