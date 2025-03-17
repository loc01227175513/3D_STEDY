import { emitter, THREE_EVENTS } from '@/utils/events';
import { Environment, OrbitControls, Stage } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import {
  Suspense,
  useEffect,
  useMemo,
  useRef,
  useState,
  useCallback,
} from 'react';
import { CircularProgress } from '@mui/material';
import { EffectComposer, SSAO } from '@react-three/postprocessing';
import * as THREE from 'three';
import { use3DCaptureStore } from '@/store/use3DCaptureStore';
import ErrorGLTFBoundary from '../ErrorGLTFBoundary';


import { use3DEnvironmentStore } from '@/store/use3DEnviromentStore';
import { useBrandStore } from '@/store/useBrandStore';
import { ProductEntity, KitchenTemplateEntity } from '@/types/model';
import { buildGlftPath } from '@/utils/helper';
import { use3DScreenshotIndoorkitchen } from '../hooks/use3DScreenshotIndokitchen';
import { use3DScreenshotIndoisland } from '../hooks/use3DScreenshotIndoisland';
import { use3DScreenshotIndokitchenisland } from '../hooks/use3DScreenshotIndokitchenisland';

import { useMaterial } from '../hooks/useMaterial';
import { useOrbitControl } from '../hooks/useOrbitControl';
import { GalleyTemplate } from './templates/GalleyTemplate';
import { useDimensionStore } from '@/store/useDimensionStore';
import { useModelState } from './templates/components/ModelStateManager';
import { useKitchenStore } from '@/store/useKitchenStore';
import { HighlightManager } from './templates/components/highlight/HighlightManager';
import { drawerStore, useHighlightStore, productStore } from '@/store';
import { ChoseModelShowCategory } from '@/store/ShowCategoryModel';
import { LoadingSpinner } from '../components/LoadingSpinner';

// Add ScreenshotQueue class
class ScreenshotQueue {
  private queue: Array<() => Promise<void>>;
  private isProcessing: boolean;
  private isCancelled: boolean;

  constructor() {
    this.queue = [];
    this.isProcessing = false;
    this.isCancelled = false;
  }

  cancel() {
    this.isCancelled = true;
    this.queue = []; // Clear the queue
  }

  async add(task: () => Promise<void>) {
    this.queue.push(task);
    if (!this.isProcessing) {
      await this.process();
    }
  }

  private async process() {
    if (this.isProcessing || this.queue.length === 0) return;

    this.isProcessing = true;
    this.isCancelled = false;

    while (this.queue.length > 0 && !this.isCancelled) {
      const task = this.queue.shift();
      if (task) {
        try {
          await task();
        } catch (error) {
          console.error('Error processing task:', error);
          this.cancel(); // Cancel remaining tasks if one fails
          break;
        }
      }
    }

    this.isProcessing = false;
    this.isCancelled = false;
  }
}

function useSunlightMovement(): [number, number, number] {
  const [position, setPosition] = useState<[number, number, number]>([0, 0, 0]);
  const [direction, setDirection] = useState(1); // 1: thuận, -1: ngược

  useEffect(() => {
    let time = 0;
    const updatePosition = () => {
      time += 0.04 * direction; // Tăng hoặc giảm time dựa vào direction
      const radius = 10;
      const x = Math.sin(time) * radius;
      const y = Math.cos(time) * radius;
      
      setPosition([x, 20, -y]);

      // Khi hoàn thành một vòng, đổi hướng
      if (Math.abs(time) >= 2 * Math.PI) {
        setDirection((prev) => -prev); // Đảo hướng quay
      }
    };

    const interval = setInterval(updatePosition, 100);
    return () => clearInterval(interval);
  }, [direction]);

  return position;
}


export function IndoorKitchenWorld({}) {
  const orbitControlRef: any = useRef();
  const canvasRef: any = useRef();
  const galleyTemplateRef = useRef<any>(null);
  const screenshotQueue = useRef(new ScreenshotQueue());
  const { captureBase64StringKitchenIsland } = use3DCaptureStore();
  const modelState = useModelState();
  const {
    kitchenComponents,
    islandComponents,
    highlightedMeshNumber,
    isIslandVisible,
    isKitchenVisible,
    savedReplacedModels,
    setKitchenBound,
    setHighlightedComponent,
    setHighlightedMeshNumber,
    setIsIslandVisible,
    setIsKitchenVisible,
    setSavedReplacedModels,
    setIslandComponents,
    setKitchenComponents,
    setFloorComponents,
  } = modelState;
  const {
    setKitchenDisabled,
    setBackwallDisabled,
    setGalleyislandDisabled,
    setFloorDisabled,
  } = useKitchenStore();
  const { environmentState } = use3DEnvironmentStore();
  const { fullScreen, handleScreenshot } = use3DScreenshotIndoorkitchen(
    canvasRef,
    orbitControlRef
  );
  const { fullScreenIndo, handleScreenshotIndo } = use3DScreenshotIndoisland(
    canvasRef,
    orbitControlRef
  );
  const { fullScreenIndoKitchenIsland, handleScreenshotIndoKitchenIsland } =
    use3DScreenshotIndokitchenisland(canvasRef, orbitControlRef);
  const { showDimension, setShowDimension } = useDimensionStore();
  const { changeMaterialForModules } = useMaterial();

  const { zoomInOut, moveOrbitToCenter, cameraToFrontView } =
    useOrbitControl(orbitControlRef);

  const { activeTemplate } = useBrandStore();

  const [kitchenTemplate, setKitchenTemplate] = useState<any>(null);
  const templateRef: any = useRef();
  const { closeDrawer } = drawerStore();
  const { toggleModel } = ChoseModelShowCategory();
  const { setHighlightedMesh } = useHighlightStore();
  const { resetColors } = productStore();

  const [isCapturing, setIsCapturing] = useState(false);
  const [hasCancelled, setHasCancelled] = useState(false);

  const [isFloorVisible, setIsFloorVisible] = useState(true);
  const [isBackWallVisible, setIsBackWallVisible] = useState(true);

  const [isLightOn, setIsLightOn] = useState(false);

  const sunlightPosition = useSunlightMovement();

  // Use sunlightPosition only if the light is on, otherwise set to default
  const effectiveSunlightPosition = isLightOn ? sunlightPosition : [-5, 20, 5] as [number, number, number];

  useEffect(() => {
    const handleZoom = (zoomStep: number) => {
      zoomInOut(zoomStep);
    };

    const handleFullScreen = () => {
      fullScreen();
    };

    const handleFrontView = () => {
      if (templateRef.current?.kitchenBound) {
        cameraToFrontView(templateRef.current.kitchenBound);
      }
    };

    const handleRemoveAllModel = async () => {
      if (templateRef.current) {
        // Reset highlights using HighlightManager
        const highlightManager = HighlightManager.getInstance();
        highlightManager.clearAllHighlights();

        // Reset category and highlight states
        toggleModel([]);
        setHighlightedMesh(null);

        // Reset colors
        resetColors();

        // Close drawer
        closeDrawer();

        // Use resetReplacedModels from GalleyTemplate which handles everything
        await templateRef.current.resetReplacedModels();
        
        // Just show loading indicator during reset
        setIsReloading(true);
        if (activeTemplate) {
          setKitchenTemplate({
            ...activeTemplate,
            kitchenPath: buildGlftPath(activeTemplate.kitchenPath),
            islandPath: activeTemplate.islandPath
              ? buildGlftPath(activeTemplate.islandPath)
              : null,
            floorPath: activeTemplate.floorPath
              ? buildGlftPath(activeTemplate.floorPath)
              : null,
          });
        }
        setTimeout(() => {
          setIsReloading(false);
        }, 500);
      }
    };

    const handleCancelScreenshot = () => {
      screenshotQueue.current.cancel();
      setKitchenDisabled(false);
      setBackwallDisabled(false);
      setGalleyislandDisabled(false);
      setFloorDisabled(false);
      setShowDimension(false);
      
      // Xóa listener sau khi gọi
      emitter.off(THREE_EVENTS.cancelScreenshot, handleCancelScreenshot);
    };

    const handleScreenShotIndoorKitchen = async () => {
      if (!templateRef.current) return;

      setIsCapturing(true); 
      await screenshotQueue.current.add(async () => {
        setShowDimension(false);
        setIsFloorVisible(false );
        setIsIslandVisible(false);
        setIsKitchenVisible(true);
        setIsBackWallVisible(true); 
        await handleScreenshot(
          templateRef.current.kitchenBound,
          templateRef.current.kitchenSize
        );
      });

      setIsCapturing(false); // Kết thúc chụp ảnh
    };
    const handleScreenShotIndoorIslandCheckout = async () => {
      if (!templateRef.current) return;

      setIsCapturing(true); // Bắt đầu chụp ảnh

      
      await screenshotQueue.current.add(async () => {
        setIsFloorVisible(false );
        setIsBackWallVisible(false); 
        setIsKitchenVisible(false);
        setIsIslandVisible(true);
      

        await handleScreenshotIndo(
          templateRef.current.islandBound || templateRef.current.kitchenBound,
          templateRef.current.islandSize || templateRef.current.kitchenSize
        );


      });

      setIsCapturing(false); // Kết thúc chụp ảnh
    };


    const handleScreenShotIndoorKitchenIsland = async () => {
      if (!templateRef.current) return;
      setIsFloorVisible(true);
      setIsBackWallVisible(true); 
      setIsIslandVisible(true);
      setIsKitchenVisible(true);
      await screenshotQueue.current.add(async () => {
        await handleScreenshotIndoKitchenIsland(
          templateRef.current.kitchenBound,
          templateRef.current.kitchenSize
        );
      });
    };





    const handleScreenShotIndoorIslandSingle = async () => {
      if (!templateRef.current) return;
      screenshotQueue.current.add(async () => {
        setShowDimension(true);
        setIsKitchenVisible(false);
        setIsIslandVisible(true);
        await handleScreenshotIndo(
          templateRef.current.islandBound || templateRef.current.kitchenBound,
          templateRef.current.islandSize || templateRef.current.kitchenSize
        );
      });
    };



    const handleScreenShotIndoorKitchenSingle = () => {
      if (!templateRef.current) return;
      screenshotQueue.current.add(async () => {
 
        await handleScreenshot(
          templateRef.current.kitchenBound,
          templateRef.current.kitchenSize
        );
      });
    };

    const handleScreenShotIndoorBackWall = async () => {
      await screenshotQueue.current.add(async () => {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        if (!templateRef.current) return;
        setShowDimension(true);
        await handleScreenshot(
          templateRef.current.kitchenBound,
          templateRef.current.kitchenSize
        );
      });
    };

    const handleChangeMaterial = (name: string, texture: string) => {
      if (!templateRef.current?.kitchenModuleRefs) return;
      changeMaterialForModules(
        templateRef.current.kitchenModuleRefs,
        name,
        texture
      );
    };

    emitter.on(THREE_EVENTS.zoom, handleZoom);
    emitter.on(THREE_EVENTS.fullScreen, handleFullScreen);
    emitter.on(THREE_EVENTS.frontView, handleFrontView);
    emitter.on(THREE_EVENTS.removeAllModel, handleRemoveAllModel);
    emitter.on(THREE_EVENTS.cancelScreenshot, handleCancelScreenshot);
    emitter.on(
      THREE_EVENTS.screenShotIndoorKitchen,
      handleScreenShotIndoorKitchen
    );
    emitter.on(
      THREE_EVENTS.screenShotIndoorKitchenSingle,
      handleScreenShotIndoorKitchenSingle
    );
    emitter.on(
      THREE_EVENTS.screenShotIndoorIsland,
      handleScreenShotIndoorIslandCheckout
    );
    emitter.on(
      THREE_EVENTS.screenShotIndoorBackWall,
      handleScreenShotIndoorBackWall
    );
    emitter.on(
      THREE_EVENTS.screenShotIndoorIslandSingle,
      handleScreenShotIndoorIslandSingle
    );
    emitter.on(
      THREE_EVENTS.screenShotIndoorKitchenIsland,
      handleScreenShotIndoorKitchenIsland
    );
    emitter.on(THREE_EVENTS.changeMaterial, handleChangeMaterial);

    // Cleanup function
    return () => {
      emitter.off(THREE_EVENTS.zoom, handleZoom);
      emitter.off(THREE_EVENTS.fullScreen, handleFullScreen);
      emitter.off(THREE_EVENTS.frontView, handleFrontView);
      emitter.off(THREE_EVENTS.removeAllModel, handleRemoveAllModel);
      emitter.off(THREE_EVENTS.cancelScreenshot, handleCancelScreenshot);
      emitter.off(
        THREE_EVENTS.screenShotIndoorKitchen,
        handleScreenShotIndoorKitchen
      );
      emitter.off(
        THREE_EVENTS.screenShotIndoorKitchenSingle,
        handleScreenShotIndoorKitchenSingle
      );
      emitter.off(
        THREE_EVENTS.screenShotIndoorBackWall,
        handleScreenShotIndoorBackWall
      );
      emitter.off(
        THREE_EVENTS.screenShotIndoorIslandSingle,
        handleScreenShotIndoorIslandSingle
      );
      emitter.off(
        THREE_EVENTS.screenShotIndoorKitchenIsland,
        handleScreenShotIndoorKitchenIsland
      );
      emitter.off(THREE_EVENTS.changeMaterial, handleChangeMaterial);
    };
  }, [
    activeTemplate,
    zoomInOut,
    fullScreen,
    cameraToFrontView,
    handleScreenshot,
    handleScreenshotIndo,
    changeMaterialForModules,
  ]);

  useEffect(() => {
    if (activeTemplate) {
      // Reset state when template changes
      setIsReloading(true);
      if (templateRef.current) {
        templateRef.current.resetReplacedModels();
      }
      setHighlightedComponent(null);
      setHighlightedMeshNumber(null);
      setIsIslandVisible(true);
      setIsKitchenVisible(true);
      setSavedReplacedModels(new Map());
      setKitchenComponents([]);
      setIslandComponents([]);
      setFloorComponents([]);
      setKitchenTemplate({
        ...activeTemplate,
        kitchenPath: buildGlftPath(activeTemplate.kitchenPath),
        islandPath: activeTemplate.islandPath
          ? buildGlftPath(activeTemplate.islandPath)
          : null,
        floorPath: activeTemplate.floorPath
          ? buildGlftPath(activeTemplate.floorPath)
          : null,
      });
      // Reset loading state after a short delay
      const timeoutId = setTimeout(() => {
        setIsReloading(false);
      }, 500);

      return () => clearTimeout(timeoutId);
    }
  }, [activeTemplate]);

  const [isReloading, setIsReloading] = useState(false);

  const _replaceModule = useCallback(async (product: ProductEntity) => {
    try {
      if (!product) {
        throw new Error('No product provided to _replaceModule');
      }

      if (templateRef.current && templateRef.current.replaceModule) {
        await templateRef.current.replaceModule(product);
      }
    } catch (error) {
      // Keep error handling without console.log
    }
  }, []);

  useEffect(() => {
    const handleReplaceModule = async (data: {
      product: ProductEntity;
      kitchenComponents: THREE.Object3D<THREE.Object3DEventMap>[];
      component: THREE.Object3D;
      highlightedComponents: THREE.Object3D<THREE.Object3DEventMap>[];
      matchingComponents: THREE.Object3D<THREE.Object3DEventMap>[];
    }) => {
      if (!data || !data.product || !activeTemplate) return;
      try {
        await _replaceModule(data.product);
      } catch (error) {
        // Keep error handling without console.log
      }
    };

    emitter.on(THREE_EVENTS.replaceModule, handleReplaceModule);
    return () => {
      emitter.off(THREE_EVENTS.replaceModule, handleReplaceModule);
    };
  }, [_replaceModule, activeTemplate]);

  useEffect(() => {
    if (!activeTemplate) return;

    const handleModelClick = () => {
      // Xử lý click model nếu cần
    };

    emitter.on(THREE_EVENTS.onModelClicked, handleModelClick);

    return () => {
      emitter.off(THREE_EVENTS.onModelClicked, handleModelClick);
    };
  }, [activeTemplate]);

  // const resetReplacedModels = async () => {
  //   // Clear the replaced models
  //   savedReplacedModels.clear();
  //   setSavedReplacedModels(new Map());

  //   // Reset highlighted states
  //   setHighlightedComponent(null);
  //   setHighlightedMeshNumber(null);

  //   // Reset last applied textures
  //   // setLastAppliedTextures(new Map());

  //   // Reset visibility states
  //   setIsKitchenVisible(true);
  //   setIsIslandVisible(true);
  //   // setIsBackWallVisible(true);

  //   // Emit success event
  //   emitter.emit(THREE_EVENTS.replaceSuccess);
  // };
  useEffect(() => {
    const handleToggleLight = () => {
      setIsLightOn(prev => !prev);
      console.log('Light toggled');
    };
    emitter.on(THREE_EVENTS.TOGGLE_LIGHT, handleToggleLight);
    return () => {
      emitter.off(THREE_EVENTS.TOGGLE_LIGHT, handleToggleLight);
    };
  }, []);
  return (
    <div style={{ 
      width: '100%', 
      height: window.innerWidth <= 768 ? '100%' : '130vh',
      position: 'relative' 
    }}>
      <Canvas
        shadows
        gl={{ preserveDrawingBuffer: true }}
        camera={{
          fov: 75,
          near: 0.1,
          far: 1000,
          position: [0, 0, 20],
        }}
        ref={canvasRef}
        style={{
          backgroundColor: 'rgb(245, 245, 245)',
          cursor: 'pointer',
          opacity: isReloading ? 0.5 : 1,
          transition: 'opacity 0.2s ease-in-out',
        }}
      >
        <ambientLight intensity={1} color="#d1d5db" />
        <directionalLight
          position={effectiveSunlightPosition}
          intensity={1.0}
          color="#EBB91A"
          castShadow
          shadow-mapSize-width={4096}
          shadow-mapSize-height={4096}
          shadow-camera-far={100}
          shadow-camera-left={-20}
          shadow-camera-right={20}
          shadow-camera-top={20}
          shadow-camera-bottom={-20}
          shadow-radius={10}
          shadow-bias={-0.0015}
        />
        <pointLight
          position={[10, 10, 10]}
          intensity={0.8}
          color="#FFFFFF"
          decay={2}
          distance={50}
        />

        <Stage shadows={false} environment={environmentState}>
          {/* <primitive object={new THREE.AxesHelper(5)} /> */}

          {kitchenTemplate && (
         <> <Suspense fallback={<LoadingSpinner />} >
              <ErrorGLTFBoundary >
                <GalleyTemplate
                  ref={templateRef}
                  template={kitchenTemplate}
                  isIslandVisible={isIslandVisible}
                  setIsIslandVisible={setIsIslandVisible}
                  isKitchenVisible={isKitchenVisible}
                  setIsKitchenVisible={setIsKitchenVisible}
                  isFloorVisible={isFloorVisible}
                  setIsFloorVisible={setIsFloorVisible}
                  isBackWallVisible={isBackWallVisible}
                  setIsBackWallVisible={setIsBackWallVisible}
                  castShadow={true}
                />
              </ErrorGLTFBoundary>
              </Suspense>
              </>
          )}

          {/* {greenBoxModule}
          {showDimension && models.length > 0 && (
            <Dimension bound={worldBound} size={kitchenSize} color="red" />
          )} */}
          <mesh
            castShadow
            receiveShadow
            rotation={[-Math.PI / 2, 0, 0]}
            position={[0, 0.01, 0]}
          >
            <planeGeometry args={[15, 15]} />
            <shadowMaterial opacity={0.2} />
          </mesh>
        </Stage>
        <OrbitControls
          ref={orbitControlRef}
          makeDefault
          minPolarAngle={0}
          maxPolarAngle={Math.PI / 2 - 0.001}
          // maxPolarAngle={Math.PI / 2.15}
          // minAzimuthAngle={-Math.PI / 3}
          // maxAzimuthAngle={Math.PI / 3}
          // minDistance={Math.max(kitchenSize.x * 0.0001, 3.5)}
          minDistance={3.5}
          maxDistance={5}
          target={[-300, 20, 150]}
        />
        <Environment preset={environmentState} blur={1.5} />
        {/* <EffectComposer>
          <SSAO
            radius={1.2}
            intensity={25}
            luminanceInfluence={0.5}
            color={new THREE.Color('#4b5563')}
            samples={128}
            rings={8}
            distanceScaling={true}
            bias={0.25}
            worldDistanceThreshold={0.6}
            worldDistanceFalloff={0.6}
            worldProximityThreshold={0.6}
            worldProximityFalloff={0.6}
          />
        </EffectComposer> */}
      </Canvas>
      {(  isCapturing) && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 9999,
            cursor: 'not-allowed',
          }}
        >
          <div style={{ 
            padding: '20px', 
            borderRadius: '8px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '10px'
            
          }}>
            <CircularProgress sx={{ color: '#EBB91A' }} />
            <div style={{ color: 'white', fontSize: '14px' }}>
              {isCapturing ? 'Taking pictures...' : ''}
            </div>
          </div>
        </div>
      )}
      {/* {selectedModule && (
        <ContextMenu
          removeModelFn={isRemovable() ? onRemoveModule : undefined}
          kitchenModelRef={selectedModule}
        />
      )} */}
    </div>
  );
}
