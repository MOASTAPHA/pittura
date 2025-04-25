
import { useRef, useState, useEffect } from 'react';
import * as THREE from 'three';
// Import these modules properly for Three.js
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

interface UseThreeSceneProps {
  modelUrl: string;
  zoom?: number;
  onZoomChange?: (zoom: number) => void;
}

export const useThreeScene = ({ modelUrl, zoom = 2, onZoomChange }: UseThreeSceneProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const controlsRef = useRef<OrbitControls | null>(null);
  const modelRef = useRef<THREE.Object3D | null>(null);
  const frameIdRef = useRef<number | null>(null);
  
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  // Initialize Three.js scene
  useEffect(() => {
    if (!containerRef.current || !canvasRef.current) return;

    const initialize = async () => {
      try {
        // Create scene
        const scene = new THREE.Scene();
        scene.background = new THREE.Color(0x111111);
        sceneRef.current = scene;
        
        // Create camera
        const aspectRatio = containerRef.current.clientWidth / containerRef.current.clientHeight;
        const camera = new THREE.PerspectiveCamera(75, aspectRatio, 0.1, 1000);
        camera.position.z = zoom;
        cameraRef.current = camera;
        
        // Create renderer
        const renderer = new THREE.WebGLRenderer({
          canvas: canvasRef.current,
          antialias: true,
          alpha: true
        });
        renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.outputEncoding = THREE.sRGBEncoding;
        rendererRef.current = renderer;
        
        // Add lights
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
        scene.add(ambientLight);
        
        const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
        directionalLight.position.set(0, 1, 2);
        scene.add(directionalLight);
        
        const pointLight = new THREE.PointLight(0xffffff, 0.8);
        pointLight.position.set(2, 2, 2);
        scene.add(pointLight);
        
        // Add controls
        const controls = new OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;
        controls.dampingFactor = 0.05;
        controls.rotateSpeed = 0.7;
        controls.panSpeed = 0.5;
        controls.screenSpacePanning = false;
        controls.minDistance = 1;
        controls.maxDistance = 10;
        controlsRef.current = controls;
        
        // Load 3D model
        await loadModel(modelUrl);
        
        // Start animation loop
        startAnimationLoop();
      } catch (error) {
        console.error('Error initializing Three.js scene:', error);
        setHasError(true);
        setIsLoading(false);
      }
    };
    
    initialize();
    
    // Window resize handler
    const handleResize = () => {
      if (!containerRef.current || !cameraRef.current || !rendererRef.current) return;
      
      const width = containerRef.current.clientWidth;
      const height = containerRef.current.clientHeight;
      
      cameraRef.current.aspect = width / height;
      cameraRef.current.updateProjectionMatrix();
      
      rendererRef.current.setSize(width, height);
    };
    
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      if (frameIdRef.current !== null) {
        cancelAnimationFrame(frameIdRef.current);
      }
      
      // Dispose resources
      if (rendererRef.current) {
        rendererRef.current.dispose();
      }
      
      if (controlsRef.current) {
        controlsRef.current.dispose();
      }
      
      if (sceneRef.current) {
        disposeScene(sceneRef.current);
      }
    };
  }, []);
  
  // Handle zoom updates
  useEffect(() => {
    if (cameraRef.current) {
      cameraRef.current.position.z = zoom;
    }
  }, [zoom]);
  
  const loadModel = async (url: string) => {
    setIsLoading(true);
    setHasError(false);
    
    if (!sceneRef.current) return;
    
    // Remove previous model if it exists
    if (modelRef.current) {
      sceneRef.current.remove(modelRef.current);
      modelRef.current = null;
    }
    
    const loader = new GLTFLoader();
    
    try {
      const gltf = await new Promise<any>((resolve, reject) => {
        loader.load(
          url,
          resolve,
          (xhr) => {
            // Progress callback
            console.log((xhr.loaded / xhr.total * 100) + '% loaded');
          },
          reject
        );
      });
      
      const model = gltf.scene;
      
      // Center model
      const box = new THREE.Box3().setFromObject(model);
      const center = box.getCenter(new THREE.Vector3());
      model.position.sub(center);
      
      // Scale model to fit view
      const size = box.getSize(new THREE.Vector3());
      const maxDim = Math.max(size.x, size.y, size.z);
      const scale = 1.5 / maxDim;
      model.scale.multiplyScalar(scale);
      
      sceneRef.current.add(model);
      modelRef.current = model;
      
      setIsLoading(false);
    } catch (error) {
      console.error('Error loading model:', error);
      setHasError(true);
      setIsLoading(false);
    }
  };
  
  const startAnimationLoop = () => {
    const animate = () => {
      frameIdRef.current = requestAnimationFrame(animate);
      
      if (controlsRef.current) {
        controlsRef.current.update();
      }
      
      if (rendererRef.current && sceneRef.current && cameraRef.current) {
        rendererRef.current.render(sceneRef.current, cameraRef.current);
      }
    };
    
    animate();
  };
  
  const disposeScene = (scene: THREE.Scene) => {
    scene.traverse((object) => {
      if ((object as THREE.Mesh).isMesh) {
        const mesh = object as THREE.Mesh;
        if (mesh.geometry) mesh.geometry.dispose();
        
        if (mesh.material) {
          if (Array.isArray(mesh.material)) {
            mesh.material.forEach(material => material.dispose());
          } else {
            mesh.material.dispose();
          }
        }
      }
    });
  };
  
  const updateCameraZoom = (newZoom: number) => {
    if (cameraRef.current) {
      cameraRef.current.position.z = newZoom;
      if (onZoomChange) {
        onZoomChange(newZoom);
      }
    }
  };
  
  const resetView = () => {
    if (cameraRef.current && controlsRef.current) {
      cameraRef.current.position.set(0, 0, zoom);
      cameraRef.current.rotation.set(0, 0, 0);
      controlsRef.current.reset();
    }
  };
  
  const rotateModel = (x: number, y: number) => {
    if (modelRef.current) {
      modelRef.current.rotation.y += x;
      modelRef.current.rotation.x += y;
    }
  };
  
  const reloadModel = () => {
    loadModel(modelUrl);
  };
  
  return {
    containerRef,
    canvasRef,
    isLoading,
    hasError,
    updateCameraZoom,
    resetView,
    rotateModel,
    reloadModel
  };
};
