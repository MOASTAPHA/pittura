
import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ZoomIn, ZoomOut, Minimize } from 'lucide-react';
import InfoPoint from './InfoPoint';

interface PanoramaViewerProps {
  onClose: () => void;
  isRTL?: boolean;
}

interface InfoPointData {
  id: string;
  position: [number, number, number];
  title: { en: string; ar: string };
  description: { en: string; ar: string };
}

const PanoramaViewer = ({ onClose, isRTL = false }: PanoramaViewerProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeInfoPoint, setActiveInfoPoint] = useState<string | null>(null);
  
  // Sample data for info points - in a real app this would come from an API
  const infoPoints: InfoPointData[] = [
    {
      id: 'point1',
      position: [-10, 0, -10],
      title: { en: 'Al-Ula Ancient Wall', ar: 'جدار العلا القديم' },
      description: { 
        en: 'This wall dates back to the 6th century BCE and was part of the ancient city\'s defensive structure.',
        ar: 'يعود تاريخ هذا الجدار إلى القرن السادس قبل الميلاد وكان جزءًا من الهيكل الدفاعي للمدينة القديمة.'
      }
    },
    {
      id: 'point2',
      position: [10, 5, 10],
      title: { en: 'Nabataean Architecture', ar: 'العمارة النبطية' },
      description: { 
        en: 'The Nabataeans were master builders who carved elaborate structures into solid rock.',
        ar: 'كان الأنباط بناة ماهرين نحتوا هياكل معقدة في الصخور الصلبة.'
      }
    },
    {
      id: 'point3',
      position: [0, -5, 15],
      title: { en: 'Desert Ecosystem', ar: 'النظام البيئي الصحراوي' },
      description: { 
        en: 'Despite harsh conditions, this area supports a variety of unique plant and animal species.',
        ar: 'على الرغم من الظروف القاسية، تدعم هذه المنطقة مجموعة متنوعة من الأنواع النباتية والحيوانية الفريدة.'
      }
    }
  ];

  useEffect(() => {
    if (!containerRef.current || !canvasRef.current) return;
    
    let scene: THREE.Scene;
    let camera: THREE.PerspectiveCamera;
    let renderer: THREE.WebGLRenderer;
    let isUserInteracting = false;
    let onPointerDownMouseX = 0, onPointerDownMouseY = 0;
    let lon = 0, onPointerDownLon = 0;
    let lat = 0, onPointerDownLat = 0;
    let phi = 0, theta = 0;
    
    const init = () => {
      // Scene setup
      scene = new THREE.Scene();
      
      // Camera setup
      camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1100);
      camera.position.z = 0.01;
      
      // Select a panorama image - in a real app this would be selected based on the location
      const panoramaImage = 'https://images.unsplash.com/photo-1533408648768-c09bb62b670c?q=80&w=2066&auto=format&fit=crop';
      
      // Create sphere geometry for panorama
      const geometry = new THREE.SphereGeometry(500, 60, 40);
      geometry.scale(-1, 1, 1); // Invert the sphere
      
      // Load texture
      const texture = new THREE.TextureLoader().load(
        panoramaImage,
        () => setIsLoading(false),
        undefined,
        (err) => console.error('Error loading panorama:', err)
      );
      
      // Create material with texture
      const material = new THREE.MeshBasicMaterial({ map: texture });
      
      // Create mesh and add to scene
      const mesh = new THREE.Mesh(geometry, material);
      scene.add(mesh);
      
      // Create renderer
      renderer = new THREE.WebGLRenderer({ 
        canvas: canvasRef.current!,
        antialias: true
      });
      renderer.setPixelRatio(window.devicePixelRatio);
      renderer.setSize(window.innerWidth, window.innerHeight);
      
      // Add info points to the scene
      infoPoints.forEach(point => {
        const vector = new THREE.Vector3(...point.position).normalize().multiplyScalar(490);
        const sphereGeometry = new THREE.SphereGeometry(5, 16, 16);
        const sphereMaterial = new THREE.MeshBasicMaterial({ color: 0x00aaff });
        const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
        sphere.position.set(vector.x, vector.y, vector.z);
        sphere.userData = { id: point.id };
        scene.add(sphere);
      });
      
      // Event listeners
      document.addEventListener('pointerdown', onPointerDown);
      document.addEventListener('pointermove', onPointerMove);
      document.addEventListener('pointerup', onPointerUp);
      document.addEventListener('wheel', onDocumentMouseWheel);
      window.addEventListener('resize', onWindowResize);
    };
    
    const onWindowResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    
    const onPointerDown = (event: PointerEvent) => {
      if (event.isPrimary === false) return;
      
      isUserInteracting = true;
      
      onPointerDownMouseX = event.clientX;
      onPointerDownMouseY = event.clientY;
      
      onPointerDownLon = lon;
      onPointerDownLat = lat;
    };
    
    const onPointerMove = (event: PointerEvent) => {
      if (event.isPrimary === false) return;
      
      if (isUserInteracting) {
        lon = (onPointerDownMouseX - event.clientX) * 0.1 + onPointerDownLon;
        lat = (event.clientY - onPointerDownMouseY) * 0.1 + onPointerDownLat;
      }
    };
    
    const onPointerUp = () => {
      isUserInteracting = false;
    };
    
    const onDocumentMouseWheel = (event: WheelEvent) => {
      const fov = camera.fov + event.deltaY * 0.05;
      camera.fov = THREE.MathUtils.clamp(fov, 30, 90);
      camera.updateProjectionMatrix();
    };
    
    const animate = () => {
      requestAnimationFrame(animate);
      
      lat = Math.max(-85, Math.min(85, lat));
      phi = THREE.MathUtils.degToRad(90 - lat);
      theta = THREE.MathUtils.degToRad(lon);
      
      camera.position.x = 100 * Math.sin(phi) * Math.cos(theta);
      camera.position.y = 100 * Math.cos(phi);
      camera.position.z = 100 * Math.sin(phi) * Math.sin(theta);
      
      camera.lookAt(0, 0, 0);
      
      // Raycasting for info point interaction
      const raycaster = new THREE.Raycaster();
      const mouse = new THREE.Vector2();
      
      renderer.render(scene, camera);
    };
    
    init();
    animate();
    
    return () => {
      document.removeEventListener('pointerdown', onPointerDown);
      document.removeEventListener('pointermove', onPointerMove);
      document.removeEventListener('pointerup', onPointerUp);
      document.removeEventListener('wheel', onDocumentMouseWheel);
      window.removeEventListener('resize', onWindowResize);
      renderer.dispose();
    };
  }, []);
  
  const handleInfoPointClick = (id: string) => {
    setActiveInfoPoint(id === activeInfoPoint ? null : id);
  };
  
  const handleZoomIn = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const event = new WheelEvent('wheel', { deltaY: -100 });
      canvas.dispatchEvent(event);
    }
  };
  
  const handleZoomOut = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const event = new WheelEvent('wheel', { deltaY: 100 });
      canvas.dispatchEvent(event);
    }
  };
  
  return (
    <div className="relative w-full h-full" ref={containerRef}>
      <canvas ref={canvasRef} className="w-full h-full" />
      
      {/* Loading overlay */}
      {isLoading && (
        <div className="absolute inset-0 bg-black/80 flex items-center justify-center z-30">
          <div className="text-white text-center">
            <div className="w-16 h-16 border-4 border-t-blue-500 border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin mb-4 mx-auto"></div>
            <p className="text-lg">{isRTL ? 'جاري تحميل البانوراما...' : 'Loading panorama...'}</p>
          </div>
        </div>
      )}
      
      {/* Controls overlay */}
      <div className="absolute top-4 left-4 z-20 flex gap-2">
        <Button 
          variant="outline" 
          size="icon" 
          className="bg-black/30 backdrop-blur-sm border-white/20 text-white hover:bg-white/20 rounded-full"
          onClick={onClose}
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        
        <Button 
          variant="outline" 
          size="icon" 
          className="bg-black/30 backdrop-blur-sm border-white/20 text-white hover:bg-white/20 rounded-full"
          onClick={handleZoomIn}
        >
          <ZoomIn className="h-5 w-5" />
        </Button>
        
        <Button 
          variant="outline" 
          size="icon" 
          className="bg-black/30 backdrop-blur-sm border-white/20 text-white hover:bg-white/20 rounded-full"
          onClick={handleZoomOut}
        >
          <ZoomOut className="h-5 w-5" />
        </Button>
        
        <Button 
          variant="outline" 
          size="icon" 
          className="bg-black/30 backdrop-blur-sm border-white/20 text-white hover:bg-white/20 rounded-full"
          onClick={onClose}
        >
          <Minimize className="h-5 w-5" />
        </Button>
      </div>
      
      {/* Info points overlay - these would be positioned based on camera view in a real implementation */}
      <div className="absolute inset-0 pointer-events-none">
        {infoPoints.map((point, index) => (
          <InfoPoint
            key={point.id}
            id={point.id}
            title={isRTL ? point.title.ar : point.title.en}
            description={isRTL ? point.description.ar : point.description.en}
            isActive={activeInfoPoint === point.id}
            onClick={() => handleInfoPointClick(point.id)}
            position={{
              left: `${30 + (index * 20)}%`,
              top: `${40 + (index * 15)}%`
            }}
          />
        ))}
      </div>
      
      {/* Footer with location information */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 text-white">
        <div className="container mx-auto">
          <h2 className="text-xl font-bold mb-1">
            {isRTL ? 'العلا، المملكة العربية السعودية' : 'Al-Ula, Saudi Arabia'}
          </h2>
          <p className="text-sm opacity-80">
            {isRTL 
              ? 'موقع من مواقع التراث العالمي لليونسكو، يحتوي على آثار تعود إلى العصر النبطي'
              : 'UNESCO World Heritage site containing Nabataean archaeological remains'
            }
          </p>
        </div>
      </div>
    </div>
  );
};

export default PanoramaViewer;
