
import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

interface ThreeSceneConfig {
  modelUrl: string;
  zoom: number;
  onZoomChange?: (zoom: number) => void;
}

export const useThreeScene = ({ modelUrl, zoom, onZoomChange }: ThreeSceneConfig) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  // Store references to Three.js objects for cleanup
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const controlsRef = useRef<OrbitControls | null>(null);
  const modelRef = useRef<THREE.Object3D | null>(null);

  const loadDefaultModel = (scene: THREE.Scene) => {
    // Create a fallback simple geometry when model fails to load
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshStandardMaterial({ 
      color: 0x6080ff,
      metalness: 0.3,
      roughness: 0.4,
    });
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);
    modelRef.current = cube;
    
    // Add simple animation
    const animate = () => {
      if (cube && !hasError) {
        cube.rotation.y += 0.01;
        requestAnimationFrame(animate);
      }
    };
    animate();
    
    setIsLoading(false);
  };

  const loadModel = (scene: THREE.Scene, url: string) => {
    setIsLoading(true);
    const loader = new GLTFLoader();
    
    // First check if URL is accessible
    fetch(url)
      .then(response => {
        if (!response.ok) {
          throw new Error(`Failed to fetch model: ${response.status} ${response.statusText}`);
        }
        // If URL is accessible, proceed with GLTFLoader
        loader.load(
          url,
          (gltf) => {
            const model = gltf.scene;
            const box = new THREE.Box3().setFromObject(model);
            const center = box.getCenter(new THREE.Vector3());
            model.position.sub(center);

            const size = box.getSize(new THREE.Vector3());
            const maxDim = Math.max(size.x, size.y, size.z);
            if (maxDim > 0) {
              model.scale.multiplyScalar(1.5 / maxDim);
            }

            scene.add(model);
            modelRef.current = model;
            setIsLoading(false);
          },
          (xhr) => {
            const progress = (xhr.loaded / xhr.total) * 100;
            console.log(`Loading model: ${Math.round(progress)}%`);
          },
          (error) => {
            console.error('Error loading model:', error);
            setHasError(true);
            loadDefaultModel(scene);
          }
        );
      })
      .catch(error => {
        console.error('Error fetching model URL:', error);
        setHasError(true);
        loadDefaultModel(scene);
      });
  };

  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) return;

    const initThreeJs = () => {
      try {
        const container = containerRef.current;
        if (!container) return;

        // Scene setup
        const scene = new THREE.Scene();
        scene.background = new THREE.Color(0x222222);
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
          alpha: true
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

        // Controls
        const controls = new OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;
        controls.dampingFactor = 0.05;
        controls.screenSpacePanning = false;
        controls.enableZoom = true;
        controls.minDistance = 1;
        controls.maxDistance = 10;
        controlsRef.current = controls;

        // Load the 3D model (with network error handling via fetch)
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

    const cleanup = initThreeJs();
    return () => {
      if (cleanup) cleanup();
    };
  }, [modelUrl, zoom]);

  const updateCameraZoom = (newZoom: number) => {
    if (cameraRef.current) {
      cameraRef.current.position.z = newZoom;
      onZoomChange?.(newZoom);
    }
  };

  const resetView = () => {
    if (cameraRef.current && controlsRef.current) {
      cameraRef.current.position.set(0, 0, 2);
      controlsRef.current.reset();
      onZoomChange?.(2);
    }
  };

  return {
    containerRef,
    canvasRef,
    isLoading,
    hasError,
    updateCameraZoom,
    resetView
  };
};
