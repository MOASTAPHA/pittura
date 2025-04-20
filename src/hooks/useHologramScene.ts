
import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';

interface HologramSceneConfig {
  modelUrl: string;
  isHologramActive: boolean;
}

export const useHologramScene = ({ modelUrl, isHologramActive }: HologramSceneConfig) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  // Store references to Three.js objects for cleanup
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const composerRef = useRef<EffectComposer | null>(null);
  const controlsRef = useRef<OrbitControls | null>(null);
  const modelRef = useRef<THREE.Object3D | null>(null);

  const loadModel = (scene: THREE.Scene, url: string) => {
    setIsLoading(true);
    const loader = new GLTFLoader();

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

        model.traverse((child) => {
          if (child instanceof THREE.Mesh) {
            const hologramMaterial = new THREE.MeshPhongMaterial({
              color: 0x00aaff,
              emissive: 0x0088ff,
              emissiveIntensity: 0.5,
              transparent: true,
              opacity: 0.7,
              wireframe: false,
              flatShading: false,
            });
            
            (child as any).originalMaterial = child.material;
            child.material = hologramMaterial;
          }
        });

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
        setIsLoading(false);
      }
    );
  };

  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) return;

    const initThreeJs = () => {
      try {
        const container = containerRef.current;
        if (!container) return;

        const scene = new THREE.Scene();
        scene.background = new THREE.Color(0x000000);
        sceneRef.current = scene;

        const aspect = container.clientWidth / container.clientHeight;
        const camera = new THREE.PerspectiveCamera(45, aspect, 0.1, 1000);
        camera.position.set(0, 0, 3);
        cameraRef.current = camera;

        const renderer = new THREE.WebGLRenderer({
          canvas: canvasRef.current!,
          antialias: true,
          alpha: true
        });
        renderer.setSize(container.clientWidth, container.clientHeight);
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.outputEncoding = THREE.sRGBEncoding;
        rendererRef.current = renderer;

        const ambientLight = new THREE.AmbientLight(0x0088ff, 0.3);
        scene.add(ambientLight);

        const directionalLight = new THREE.DirectionalLight(0x00ffff, 0.8);
        directionalLight.position.set(1, 1, 1);
        scene.add(directionalLight);

        const blueLight = new THREE.PointLight(0x0088ff, 1, 50);
        blueLight.position.set(0, 2, 0);
        scene.add(blueLight);

        const renderScene = new RenderPass(scene, camera);
        const bloomPass = new UnrealBloomPass(
          new THREE.Vector2(container.clientWidth, container.clientHeight),
          1.5,
          0.4,
          0.85
        );

        const composer = new EffectComposer(renderer);
        composer.addPass(renderScene);
        composer.addPass(bloomPass);
        composerRef.current = composer;

        const controls = new OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;
        controls.dampingFactor = 0.05;
        controls.autoRotate = true;
        controls.autoRotateSpeed = 1;
        controlsRef.current = controls;

        loadModel(scene, modelUrl);

        const animate = () => {
          if (!controlsRef.current || !rendererRef.current || !sceneRef.current || !cameraRef.current || !composerRef.current) return;
          
          requestAnimationFrame(animate);
          controlsRef.current.update();

          if (isHologramActive && modelRef.current) {
            const time = Date.now() * 0.001;
            modelRef.current.position.y = Math.sin(time) * 0.1;
            composerRef.current.render();
          } else {
            rendererRef.current.render(sceneRef.current, cameraRef.current);
          }
        };

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
  }, [modelUrl, isHologramActive]);

  return {
    containerRef,
    canvasRef,
    isLoading,
    hasError,
    sceneRef,
    modelRef
  };
};
