
import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';

interface HologramViewerProps {
  modelUrl?: string;
  isRTL?: boolean;
}

const HologramViewer = ({ 
  modelUrl = '/models/artifact_default.glb', 
  isRTL = false 
}: HologramViewerProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [isHologramActive, setIsHologramActive] = useState(true);
  
  // Store references to Three.js objects for cleanup
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const composerRef = useRef<EffectComposer | null>(null);
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
        scene.background = new THREE.Color(0x000000);
        sceneRef.current = scene;
        
        // Camera setup
        const aspect = container.clientWidth / container.clientHeight;
        const camera = new THREE.PerspectiveCamera(45, aspect, 0.1, 1000);
        camera.position.set(0, 0, 3);
        cameraRef.current = camera;
        
        // Renderer setup
        const renderer = new THREE.WebGLRenderer({
          canvas: canvasRef.current!,
          antialias: true,
          alpha: true
        });
        renderer.setSize(container.clientWidth, container.clientHeight);
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.outputEncoding = THREE.sRGBEncoding;
        rendererRef.current = renderer;
        
        // Lighting for hologram effect
        const ambientLight = new THREE.AmbientLight(0x0088ff, 0.3);
        scene.add(ambientLight);
        
        const directionalLight = new THREE.DirectionalLight(0x00ffff, 0.8);
        directionalLight.position.set(1, 1, 1);
        scene.add(directionalLight);
        
        const blueLight = new THREE.PointLight(0x0088ff, 1, 50);
        blueLight.position.set(0, 2, 0);
        scene.add(blueLight);
        
        // Post-processing for hologram effect
        const renderScene = new RenderPass(scene, camera);
        const bloomPass = new UnrealBloomPass(
          new THREE.Vector2(container.clientWidth, container.clientHeight),
          1.5,   // strength
          0.4,   // radius
          0.85   // threshold
        );
        
        const composer = new EffectComposer(renderer);
        composer.addPass(renderScene);
        composer.addPass(bloomPass);
        composerRef.current = composer;
        
        // Controls for orbit/rotation
        const controls = new OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;
        controls.dampingFactor = 0.05;
        controls.autoRotate = true;
        controls.autoRotateSpeed = 1;
        controlsRef.current = controls;
        
        // Load the 3D model
        loadModel(scene, modelUrl);
        
        // Animation loop
        const animate = () => {
          if (!controlsRef.current || !rendererRef.current || !sceneRef.current || !cameraRef.current || !composerRef.current) return;
          
          requestAnimationFrame(animate);
          controlsRef.current.update();
          
          // Apply hologram effect
          if (isHologramActive && modelRef.current) {
            // Add some floaty movement
            const time = Date.now() * 0.001;
            modelRef.current.position.y = Math.sin(time) * 0.1;
            
            composerRef.current.render();
          } else {
            rendererRef.current.render(sceneRef.current, cameraRef.current);
          }
        };
        
        // Handle window resize
        const handleResize = () => {
          if (!container || !cameraRef.current || !rendererRef.current || !composerRef.current) return;
          
          const newAspect = container.clientWidth / container.clientHeight;
          cameraRef.current.aspect = newAspect;
          cameraRef.current.updateProjectionMatrix();
          rendererRef.current.setSize(container.clientWidth, container.clientHeight);
          composerRef.current.setSize(container.clientWidth, container.clientHeight);
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
          
          // Apply hologram material to all meshes
          model.traverse((child) => {
            if (child instanceof THREE.Mesh) {
              // Create a glowing hologram material
              const hologramMaterial = new THREE.MeshPhongMaterial({
                color: 0x00aaff,
                emissive: 0x0088ff,
                emissiveIntensity: 0.5,
                transparent: true,
                opacity: 0.7,
                wireframe: false,
                flatShading: false,
              });
              
              // Save the original material to switch back
              (child as any).originalMaterial = child.material;
              child.material = hologramMaterial;
            }
          });
          
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
  }, [modelUrl, isHologramActive]);
  
  const toggleHologramEffect = () => {
    if (!modelRef.current) return;
    
    // Toggle hologram effect
    setIsHologramActive(!isHologramActive);
    
    // Toggle materials
    modelRef.current.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        if (isHologramActive) {
          // Switch to original material
          if ((child as any).originalMaterial) {
            child.material = (child as any).originalMaterial;
          }
        } else {
          // Switch to hologram material
          (child as any).originalMaterial = child.material;
          child.material = new THREE.MeshPhongMaterial({
            color: 0x00aaff,
            emissive: 0x0088ff,
            emissiveIntensity: 0.5,
            transparent: true,
            opacity: 0.7,
            wireframe: false,
            flatShading: false,
          });
        }
      }
    });
    
    // Toggle scene background
    if (sceneRef.current) {
      sceneRef.current.background = new THREE.Color(isHologramActive ? 0xffffff : 0x000000);
    }
  };
  
  // Fallback UI for errors
  if (hasError) {
    return (
      <div className={`bg-black/90 rounded-lg shadow-md overflow-hidden ${isRTL ? 'rtl' : ''}`}>
        <div className="p-4 border-b border-white/10">
          <h3 className="font-medium text-white">
            {isRTL ? 'محاكاة الهولوجرام' : 'Hologram Simulation'}
          </h3>
        </div>
        <div className="p-6 text-center">
          <p className="text-white/80 mb-4">
            {isRTL 
              ? 'عذراً، لم نتمكن من تحميل نموذج الهولوجرام.'
              : 'Sorry, we couldn\'t load the hologram model.'}
          </p>
          <Button onClick={() => window.location.reload()} variant="outline" className="bg-transparent text-white border-white/30 hover:bg-white/10">
            {isRTL ? 'إعادة المحاولة' : 'Try Again'}
          </Button>
        </div>
      </div>
    );
  }
  
  return (
    <div className={`bg-black/90 rounded-lg shadow-md overflow-hidden ${isRTL ? 'rtl' : ''}`}>
      <div className="p-4 border-b border-white/10 flex justify-between items-center">
        <h3 className="font-medium text-white">
          {isRTL ? 'محاكاة الهولوجرام' : 'Hologram Simulation'}
        </h3>
        <Button
          variant="outline"
          size="sm"
          onClick={toggleHologramEffect}
          className="bg-transparent text-white border-white/30 hover:bg-white/10"
        >
          {isHologramActive 
            ? (isRTL ? 'عرض عادي' : 'Normal View') 
            : (isRTL ? 'عرض الهولوجرام' : 'Hologram View')
          }
        </Button>
      </div>
      <div className="relative" ref={containerRef}>
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/50 z-10">
            <div className="flex flex-col items-center">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-400 mb-4"></div>
              <p className="text-blue-400">{isRTL ? 'جاري التحميل...' : 'Loading hologram...'}</p>
            </div>
          </div>
        )}
        <canvas 
          ref={canvasRef}
          className="w-full h-[400px]"
        />
      </div>
      <div className="p-4 bg-blue-900/30 text-sm text-blue-300">
        {isRTL 
          ? 'محاكاة لكيفية ظهور هذه القطعة الأثرية كهولوجرام في معرض رقمي.'
          : 'A simulation of how this artifact would appear as a hologram in a digital exhibition.'}
      </div>
    </div>
  );
};

export default HologramViewer;
