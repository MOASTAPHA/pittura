
import { useRef, useState, useEffect } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

interface UseThreeSceneProps {
  modelUrl: string;
  zoom?: number;
  onZoomChange?: (zoom: number) => void;
  backgroundColor?: string | number;
}

export const useThreeScene = ({
  modelUrl,
  zoom = 2,
  onZoomChange,
  backgroundColor = 0x222222
}: UseThreeSceneProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const controlsRef = useRef<OrbitControls | null>(null);
  const modelRef = useRef<THREE.Group | null>(null);
  const frameIdRef = useRef<number | null>(null);
  
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  // Initialize the scene
  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) return;
    
    // Setup scene, camera, renderer
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(backgroundColor);
    sceneRef.current = scene;
    
    const aspectRatio = containerRef.current.clientWidth / containerRef.current.clientHeight;
    const camera = new THREE.PerspectiveCamera(75, aspectRatio, 0.1, 1000);
    camera.position.z = zoom;
    cameraRef.current = camera;
    
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      antialias: true,
      alpha: true
    });
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    rendererRef.current = renderer;
    
    // Add lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(0, 5, 10);
    scene.add(directionalLight);
    
    // Add OrbitControls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.minDistance = 1;
    controls.maxDistance = 10;
    controlsRef.current = controls;
    
    // Load model
    loadModel();
    
    // Animation loop
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
    
    // Handle resize
    const handleResize = () => {
      if (!containerRef.current || !rendererRef.current || !cameraRef.current) return;
      
      const width = containerRef.current.clientWidth;
      const height = containerRef.current.clientHeight;
      
      rendererRef.current.setSize(width, height);
      
      cameraRef.current.aspect = width / height;
      cameraRef.current.updateProjectionMatrix();
    };
    
    window.addEventListener('resize', handleResize);
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      
      if (frameIdRef.current !== null) {
        cancelAnimationFrame(frameIdRef.current);
      }
      
      if (rendererRef.current) {
        rendererRef.current.dispose();
      }
      
      if (controlsRef.current) {
        controlsRef.current.dispose();
      }
    };
  }, [backgroundColor]);
  
  // Load the 3D model
  const loadModel = () => {
    setIsLoading(true);
    setHasError(false);
    
    if (!sceneRef.current) return;
    
    // Remove previous model if it exists
    if (modelRef.current) {
      sceneRef.current.remove(modelRef.current);
      modelRef.current = null;
    }
    
    const loader = new GLTFLoader();
    
    loader.load(
      modelUrl,
      (gltf) => {
        const model = gltf.scene;
        
        // Center the model
        const box = new THREE.Box3().setFromObject(model);
        const center = box.getCenter(new THREE.Vector3());
        model.position.x = -center.x;
        model.position.y = -center.y;
        model.position.z = -center.z;
        
        // Scale the model to a reasonable size
        const size = box.getSize(new THREE.Vector3()).length();
        const scale = 2 / size;
        model.scale.set(scale, scale, scale);
        
        modelRef.current = model;
        sceneRef.current?.add(model);
        
        setIsLoading(false);
      },
      undefined,
      (error) => {
        console.error('Error loading model:', error);
        setIsLoading(false);
        setHasError(true);
      }
    );
  };

  // Update model when URL changes
  useEffect(() => {
    if (sceneRef.current) {
      loadModel();
    }
  }, [modelUrl]);

  // Update camera zoom when zoom prop changes
  useEffect(() => {
    if (cameraRef.current) {
      cameraRef.current.position.z = zoom;
    }
  }, [zoom]);

  const updateCameraZoom = (newZoom: number) => {
    if (cameraRef.current) {
      cameraRef.current.position.z = newZoom;
      onZoomChange?.(newZoom);
    }
  };
  
  const resetView = () => {
    if (controlsRef.current) {
      controlsRef.current.reset();
    }
    
    if (cameraRef.current) {
      cameraRef.current.position.z = 2;
      onZoomChange?.(2);
    }
  };
  
  const rotateModel = (deltaX: number, deltaY: number) => {
    if (modelRef.current) {
      modelRef.current.rotation.y += deltaX;
      modelRef.current.rotation.x += deltaY;
    }
  };

  return {
    containerRef,
    canvasRef,
    isLoading,
    hasError,
    updateCameraZoom,
    resetView,
    rotateModel,
    sceneRef,
    modelRef
  };
};
