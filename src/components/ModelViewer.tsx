
import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

interface ModelViewerProps {
  modelUrl?: string;
  isRTL?: boolean;
  fallbackImageUrl?: string;
}

const ModelViewer = ({ 
  modelUrl = '/models/artifact_default.glb', 
  isRTL = false,
  fallbackImageUrl = 'https://images.unsplash.com/photo-1486718448742-163732cd1544?q=80&w=2940&auto=format&fit=crop'
}: ModelViewerProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [zoom, setZoom] = useState(2);
  
  // Store references to Three.js objects for cleanup
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const controlsRef = useRef<OrbitControls | null>(null);
  const modelRef = useRef<THREE.Object3D | null>(null);
  
  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) return;
    
    // Initialize Three.js scene
    const initThreeJs = () => {
      try {
        const container = containerRef.current;
        if (!container) return;
        
        // Scene setup
        const scene = new THREE.Scene();
        scene.background = new THREE.Color(0xf5f5f5);
        sceneRef.current = scene;
        
        // Camera setup
        const aspect = container.clientWidth / container.clientHeight;
        const camera = new THREE.PerspectiveCamera(45, aspect, 0.1, 1000);
        camera.position.set(0, 0, zoom);
        cameraRef.current = camera;
        
        // Renderer setup
        const renderer = new THREE.WebGLRenderer({
          canvas: canvasRef.current!,
          antialias: true,
        });
        renderer.setSize(container.clientWidth, container.clientHeight);
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.outputEncoding = THREE.sRGBEncoding;
        rendererRef.current = renderer;
        
        // Lighting
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
        scene.add(ambientLight);
        
        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
        directionalLight.position.set(1, 1, 1);
        scene.add(directionalLight);
        
        // Controls for orbit/rotation
        const controls = new OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;
        controls.dampingFactor = 0.05;
        controls.screenSpacePanning = false;
        controls.enableZoom = true;
        controls.minDistance = 1;
        controls.maxDistance = 10;
        controlsRef.current = controls;
        
        // Load the 3D model
        loadModel(scene, modelUrl);
        
        // Animation loop
        const animate = () => {
          if (!controlsRef.current || !rendererRef.current || !sceneRef.current || !cameraRef.current) return;
          
          requestAnimationFrame(animate);
          controlsRef.current.update();
          rendererRef.current.render(sceneRef.current, cameraRef.current);
        };
        
        // Handle window resize
        const handleResize = () => {
          if (!container || !cameraRef.current || !rendererRef.current) return;
          
          const newAspect = container.clientWidth / container.clientHeight;
          cameraRef.current.aspect = newAspect;
          cameraRef.current.updateProjectionMatrix();
          rendererRef.current.setSize(container.clientWidth, container.clientHeight);
        };
        
        window.addEventListener('resize', handleResize);
        animate();
        
        // Return cleanup function
        return () => {
          window.removeEventListener('resize', handleResize);
          controlsRef.current?.dispose();
          rendererRef.current?.dispose();
          if (modelRef.current) {
            scene.remove(modelRef.current);
            modelRef.current.traverse((child) => {
              if (child instanceof THREE.Mesh) {
                child.geometry.dispose();
                if (child.material instanceof THREE.Material) {
                  child.material.dispose();
                } else if (Array.isArray(child.material)) {
                  child.material.forEach(material => material.dispose());
                }
              }
            });
          }
        };
      } catch (error) {
        console.error('Error initializing Three.js:', error);
        setHasError(true);
        setIsLoading(false);
      }
    };
    
    // Load the 3D model with GLTFLoader
    const loadModel = (scene: THREE.Scene, url: string) => {
      setIsLoading(true);
      
      const loader = new GLTFLoader();
      
      loader.load(
        url,
        (gltf) => {
          // Success callback
          const model = gltf.scene;
          
          // Center the model
          const box = new THREE.Box3().setFromObject(model);
          const center = box.getCenter(new THREE.Vector3());
          model.position.sub(center);
          
          // Scale the model to fit in the viewport
          const size = box.getSize(new THREE.Vector3());
          const maxDim = Math.max(size.x, size.y, size.z);
          if (maxDim > 0) {
            model.scale.multiplyScalar(1.5 / maxDim);
          }
          
          // Add the model to the scene
          scene.add(model);
          modelRef.current = model;
          
          setIsLoading(false);
        },
        // Progress callback
        (xhr) => {
          const progress = (xhr.loaded / xhr.total) * 100;
          console.log(`Loading model: ${Math.round(progress)}%`);
        },
        // Error callback
        (error) => {
          console.error('Error loading model:', error);
          setHasError(true);
          setIsLoading(false);
        }
      );
    };
    
    const cleanup = initThreeJs();
    
    return () => {
      if (cleanup) cleanup();
    };
  }, [modelUrl, zoom]);
  
  // Handle zoom controls
  const handleZoomIn = () => {
    if (cameraRef.current) {
      setZoom(Math.max(1, zoom - 0.5));
      cameraRef.current.position.z = Math.max(1, zoom - 0.5);
    }
  };
  
  const handleZoomOut = () => {
    if (cameraRef.current) {
      setZoom(Math.min(10, zoom + 0.5));
      cameraRef.current.position.z = Math.min(10, zoom + 0.5);
    }
  };
  
  const handleReset = () => {
    if (cameraRef.current && controlsRef.current) {
      setZoom(2);
      cameraRef.current.position.set(0, 0, 2);
      controlsRef.current.reset();
    }
  };
  
  // Fallback UI for errors
  if (hasError) {
    return (
      <div className={`bg-white rounded-lg shadow-md overflow-hidden ${isRTL ? 'rtl' : ''}`}>
        <div className="p-4 border-b">
          <h3 className="font-medium">
            {isRTL ? 'عرض ثلاثي الأبعاد' : '3D View'}
          </h3>
        </div>
        <div className="p-6 text-center">
          <img 
            src={fallbackImageUrl} 
            alt={isRTL ? "صورة بديلة" : "Fallback image"}
            className="mx-auto mb-4 max-h-[300px] rounded-lg object-cover"
          />
          <p className="text-muted-foreground mb-4">
            {isRTL 
              ? 'عذراً، لم نتمكن من تحميل النموذج ثلاثي الأبعاد.'
              : 'Sorry, we couldn\'t load the 3D model.'}
          </p>
          <Button onClick={() => window.location.reload()}>
            {isRTL ? 'إعادة المحاولة' : 'Try Again'}
          </Button>
        </div>
      </div>
    );
  }
  
  return (
    <div className={`bg-white rounded-lg shadow-md overflow-hidden ${isRTL ? 'rtl' : ''}`}>
      <div className="p-4 border-b">
        <h3 className="font-medium">
          {isRTL ? 'عرض ثلاثي الأبعاد' : '3D View'}
        </h3>
      </div>
      <div className="relative" ref={containerRef}>
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-background/80 z-10">
            <div className="flex flex-col items-center">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mb-4"></div>
              <p>{isRTL ? 'جاري التحميل...' : 'Loading model...'}</p>
            </div>
          </div>
        )}
        <canvas 
          ref={canvasRef}
          className="w-full h-[400px]"
        />
        <div className="absolute bottom-4 right-4 flex space-x-2 rtl:space-x-reverse">
          <Button size="sm" variant="outline" onClick={handleZoomIn}>
            {isRTL ? 'تكبير' : 'Zoom In'}
          </Button>
          <Button size="sm" variant="outline" onClick={handleZoomOut}>
            {isRTL ? 'تصغير' : 'Zoom Out'}
          </Button>
          <Button size="sm" variant="outline" onClick={handleReset}>
            {isRTL ? 'إعادة الضبط' : 'Reset'}
          </Button>
        </div>
      </div>
      <div className="p-4 bg-muted text-sm text-muted-foreground">
        {isRTL 
          ? 'انقر واسحب لتدوير النموذج. استخدم عجلة الماوس أو اضغط على أزرار التكبير/التصغير للتقريب والتبعيد.'
          : 'Click and drag to rotate the model. Use mouse wheel or zoom buttons to zoom in and out.'}
      </div>
    </div>
  );
};

export default ModelViewer;
