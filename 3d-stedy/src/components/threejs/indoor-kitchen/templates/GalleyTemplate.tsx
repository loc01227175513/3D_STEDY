import {
  KitchenTemplateEntity,
  ProductEntity,
  WorldBound,
  StyleEntity,
} from '@/types/model';
import { useGLTF } from '@react-three/drei';
import {
  forwardRef,
  memo,
  useImperativeHandle,
  lazy,
  Suspense,
  useState,
  useEffect,
  useRef,
} from 'react';
import * as THREE from 'three';
import { emitter, THREE_EVENTS } from '@/utils/events';
import { useThree } from '@react-three/fiber';
import { useDimensionStore } from '@/store/useDimensionStore';
import { IndoorDimension } from '../IndoorDimension';
import { use3DCaptureStore } from '@/store/use3DCaptureStore';

import { useModelReplacement } from '../hooks/useModelReplacement';
import { LoadingSpinner } from '../../components/LoadingSpinner';
import { handleComponentClick } from './components/ComponentClickHandler';
import { SceneManager } from './components/SceneManager';
import { useModelState } from './components/ModelStateManager';
import { ModelEffects } from './components/ModelEffects';
import { ModelEventHandlers } from './components/ModelEventHandlers';
import { MaterialManager } from './components/MaterialManager';
import { HighlightManager } from './components/highlight/HighlightManager';
import { DimensionManager } from './components/DimensionManager';
import { log } from 'node:console';
import { useKitchenStore } from '@/store/useKitchenStore';
import { drawerStore, productStore, useBrandStore } from '@/store';
import { ChoseModelShowCategory } from '@/store/ShowCategoryModel';
import { useHighlightStore } from '@/store/useHighlightStore';
// Lazy load components
const KitchenComponents = lazy(() =>
  import('./components/KitchenComponents').then((module) => ({
    default: module.KitchenComponents,
  }))
);

const IslandComponents = lazy(() =>
  import('./components/IslandComponents').then((module) => ({
    default: module.IslandComponents,
  }))
);
const FloorComponents = lazy(() =>
  import('./components/FloorComponents').then((module) => ({
    default: module.FloorComponents,
  }))
);

interface GalleyTemplateProps {
  template: KitchenTemplateEntity;
  isIslandVisible: boolean;
  setIsIslandVisible: (visible: boolean) => void;
  isKitchenVisible: boolean;
  setIsKitchenVisible: (visible: boolean) => void;
  isFloorVisible: boolean;
  setIsFloorVisible: (visible: boolean) => void;
  isBackWallVisible: boolean;
  setIsBackWallVisible: (visible: boolean) => void;
  castShadow?: boolean;
}

export const GalleyTemplate = memo(
  forwardRef(({ template, isIslandVisible, setIsIslandVisible, isKitchenVisible, setIsKitchenVisible, isFloorVisible, setIsFloorVisible, isBackWallVisible, setIsBackWallVisible, castShadow }: GalleyTemplateProps, ref) => {
    const { scene: kitchenScene } = useGLTF(template.kitchenPath);
    const { camera, gl } = useThree();
    const canvasRef = useRef(gl.domElement);
    const { setTotalDimension, showDimension } = useDimensionStore();
    const { captureBase64StringKitchenIsland } = use3DCaptureStore();
    const { fridgeCabinetWidth, tallCabinetWidth } = useKitchenStore();

    let islandScene: any;
    let floorScene: any;
    if (template.islandPath) {
      ({ scene: islandScene } = useGLTF(template.islandPath));
    }
    if (template.floorPath) {
      ({ scene: floorScene } = useGLTF(template.floorPath));
    }
    const { kitchenWidth } = useKitchenStore();
    //  console.log('kitchenWidth', kitchenWidth);

    const modelState = useModelState();
    const {
      kitchenBound,
      highlightedComponent,
      kitchenComponents,
      islandComponents,
      highlightedMeshNumber,
      savedReplacedModels,
      setKitchenBound,
      setHighlightedComponent,
      setHighlightedMeshNumber,
      setSavedReplacedModels,
      setIslandComponents,
      setKitchenComponents,
    } = modelState;

    const { replacedModels, replaceModule, isReplacing } =
      useModelReplacement(islandScene);

    const [highlightedMesh, setHighlightedMesh] =
      useState<THREE.Object3D | null>(null);
    const [lastAppliedTextures, setLastAppliedTextures] = useState<
      Map<
        string,
        {
          texture: string;
          materialType: string;
          isIsland: boolean;
        }
      >
    >(new Map());

    const { closeDrawer } = drawerStore();
    const { toggleModel } = ChoseModelShowCategory();
    const { setHighlightedMesh: useHighlightStoreSetHighlightedMesh } =
      useHighlightStore();

    useImperativeHandle(ref, () => ({
      kitchenBound,
      kitchenSize: new THREE.Vector3(
        kitchenScene.scale.x,
        kitchenScene.scale.y,
        kitchenScene.scale.z
      ),

      kitchenModuleRefs: [...kitchenComponents, ...islandComponents],
      replaceModule: async (product: ProductEntity) => {
        try {
          await replaceModule(
            product,
            highlightedComponent,
            islandComponents,
            template,
            kitchenComponents
          );
        } catch (error) {
          throw error;
        }
      },
      resetReplacedModels,
      logReplacement: async () => {
        // Removed console.log statement
      },
    }));

    const resetReplacedModels = async () => {
      try {
        // Reset colors và các state khác

        // Clear replaced models và reset states
        replacedModels.clear();
        setSavedReplacedModels(new Map());
        setHighlightedComponent(null);
        setHighlightedMeshNumber(null);
        setHighlightedMesh(null);
        setLastAppliedTextures(new Map());

        // Reset visibility states
        setIsKitchenVisible(true);
        setIsIslandVisible(true);
        setIsBackWallVisible(true);
        setIsFloorVisible(true);

        // Reset floor components
        if (floorScene) {
          const floorComponents: THREE.Object3D<THREE.Object3DEventMap>[] = [];
          floorScene.traverse((child: THREE.Object3D) => {
            if (child instanceof THREE.Mesh) {
              floorComponents.push(child);
            }
          });
          modelState.setFloorComponents(floorComponents);
        } else {
          modelState.setFloorComponents([]);
        }

        // Reset highlights
        const highlightManager = HighlightManager.getInstance();
        highlightManager.resetHighlights(
          kitchenComponents.filter(
            (comp) =>
              modelState.isComponentVisible(comp) &&
              modelState.isComponentRaycastable(comp)
          ),
          islandComponents.filter(
            (comp) =>
              modelState.isComponentVisible(comp) &&
              modelState.isComponentRaycastable(comp)
          ),
          replacedModels,
          floorScene
            ? [floorScene].filter(
                (comp) =>
                  modelState.isComponentVisible(comp) &&
                  modelState.isComponentRaycastable(comp)
              )
            : []
        );

        // Đợi một chút để state được reset
        await new Promise((resolve) => setTimeout(resolve, 100));

        // Emit success event
        emitter.emit(THREE_EVENTS.replaceSuccess);
      } catch (error) {
        console.error('Error resetting models:', error);
      }
    };

 

    useEffect(() => {
      const handleBackCheckout = () => {
        setIsKitchenVisible(true);
        setIsIslandVisible(true);
        setIsBackWallVisible(true);
        setIsFloorVisible(true);
      };

      emitter.on(THREE_EVENTS.BackCheckout, handleBackCheckout);

      return () => {
        emitter.off(THREE_EVENTS.BackCheckout, handleBackCheckout);
      };
    }, []);

    useEffect(() => {
      const handleBackCheckout = () => {
        setIsKitchenVisible(false);
        setIsIslandVisible(false);
        setIsBackWallVisible(true);
        setIsFloorVisible(false);
      };

      emitter.on(THREE_EVENTS.screenShotIndoorBackWall, handleBackCheckout);

      return () => {
        emitter.off(THREE_EVENTS.screenShotIndoorBackWall, handleBackCheckout);
      };
    }, []);
    useEffect(() => {
      const handleBackCheckout = () => {
        setIsKitchenVisible(true);
        setIsIslandVisible(false);
        setIsBackWallVisible(false);
        setIsFloorVisible(false);
      };

      emitter.on(
        THREE_EVENTS.screenShotIndoorKitchenSingle,
        handleBackCheckout
      );

      return () => {
        emitter.off(
          THREE_EVENTS.screenShotIndoorKitchenSingle,
          handleBackCheckout
        );
      };
    }, []);
    useEffect(() => {
      const handleBackCheckout = () => {
        setIsKitchenVisible(false);
        setIsIslandVisible(true);
        setIsBackWallVisible(false);
        setIsFloorVisible(false);
      };

      emitter.on(THREE_EVENTS.screenShotIndoorIslandSingle, handleBackCheckout);

      return () => {
        emitter.off(
          THREE_EVENTS.screenShotIndoorIslandSingle,
          handleBackCheckout
        );
      };
    }, []);

    useEffect(() => {
      const handleToggleBackWall = (visible: boolean) => {
        setIsBackWallVisible(visible);
      };

      emitter.on(THREE_EVENTS.toggleBackWall, handleToggleBackWall);

      return () => {
        emitter.off(THREE_EVENTS.toggleBackWall, handleToggleBackWall);
      };
    }, []);

    useEffect(() => {
      const handleToggleBackWall = (visible: boolean) => {
        setIsFloorVisible(visible);
      };

      emitter.on(THREE_EVENTS.toggleFloor, handleToggleBackWall);

      return () => {
        emitter.off(THREE_EVENTS.toggleFloor, handleToggleBackWall);
      };
    }, []);

    useEffect(() => {
      const handleKitchenIslandScreenshot = () => {
        setIsKitchenVisible(true);
        setIsIslandVisible(true);
        setIsBackWallVisible(true);
        setIsFloorVisible(false);
      };

      emitter.on(
        THREE_EVENTS.screenShotIndoorKitchenIsland,
        handleKitchenIslandScreenshot
      );

      return () => {
        emitter.off(
          THREE_EVENTS.screenShotIndoorKitchenIsland,
          handleKitchenIslandScreenshot
        );
      };
    }, []);

    useEffect(() => {
      const handleCanvasClick = (event: MouseEvent) => {
        if (!canvasRef.current) return;

        const rect = canvasRef.current.getBoundingClientRect();
        const x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
        const y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

        const raycaster = new THREE.Raycaster();
        const mouse = new THREE.Vector2(x, y);

        // Tạo danh sách tất cả các mesh cần kiểm tra
        const allMeshes: THREE.Mesh[] = [];

        // Thêm các mesh từ components gốc
        [...kitchenComponents, ...islandComponents].forEach((component) => {
          const isKitchenComponent = kitchenComponents.includes(component);
          const isIslandComponent = islandComponents.includes(component);

          if (
            (isKitchenComponent && !isKitchenVisible) ||
            (isIslandComponent && !isIslandVisible) ||
            !modelState.isComponentVisible(component) ||
            !modelState.isComponentRaycastable(component)
          ) {
            return;
          }

          component.traverse((child) => {
            if (child instanceof THREE.Mesh) {
              allMeshes.push(child);
            }
          });
        });

        raycaster.setFromCamera(mouse, camera);
        const intersects = raycaster.intersectObjects(allMeshes, true);

        if (intersects.length > 0) {
          const clickedObject = intersects[0].object;

          // Tìm parent là model đã thay thế nếu có
          let targetObject: THREE.Object3D | null = clickedObject;
          while (targetObject && !targetObject.userData?.isReplacedModel) {
            targetObject = targetObject.parent;
          }

          handleComponentClick({
            component: targetObject || clickedObject,
            kitchenWidth,
            kitchenComponents,
            islandComponents,
            replacedModels,
            floorComponents: [floorScene],
            template,
            isReplacing,
            onHighlight: setHighlightedComponent,
            onMeshNumber: setHighlightedMeshNumber,
            isComponentVisible: modelState.isComponentVisible,
            isComponentRaycastable: modelState.isComponentRaycastable,
            updateComponentVisibility: modelState.updateComponentVisibility,
          });
        } else {
          // Click không trúng component nào, chỉ reset highlight
          if (highlightedComponent) {
            setHighlightedComponent(null);
            setHighlightedMeshNumber(null);
          }
        }
      };

      const canvas = canvasRef.current;
      if (canvas) {
        canvas.addEventListener('click', handleCanvasClick);
        canvas.addEventListener('dragover', handleDragOver);
        canvas.addEventListener('drop', handleDrop);
      }

      return () => {
        if (canvas) {
          canvas.removeEventListener('click', handleCanvasClick);
          canvas.removeEventListener('dragover', handleDragOver);
          canvas.removeEventListener('drop', handleDrop);
        }
      };
    }, [
      kitchenComponents,
      islandComponents,
      highlightedMesh,
      replacedModels,
      modelState,
    ]);

    const handleDragOver = (e: DragEvent) => {
      e.preventDefault();
      if (!e.dataTransfer) return;
      e.dataTransfer.dropEffect = 'move';

      const intersectedMesh = findIntersectedMesh(e);

      if (intersectedMesh && intersectedMesh !== highlightedMesh) {
        // Remove highlight từ mesh cũ
        if (highlightedMesh) {
          const material = (highlightedMesh as THREE.Mesh)
            .material as THREE.MeshStandardMaterial;
          material.emissive.setHex(0x000000);
          material.emissiveIntensity = 0;
        }

        // Add highlight cho mesh mới
        const material = (intersectedMesh as THREE.Mesh)
          .material as THREE.MeshStandardMaterial;
        material.emissive.setHex(0x666666);
        material.emissiveIntensity = 0.5;

        setHighlightedMesh(intersectedMesh);
      } else if (!intersectedMesh && highlightedMesh) {
        // Remove highlight khi không có intersection
        const material = (highlightedMesh as THREE.Mesh)
          .material as THREE.MeshStandardMaterial;
        material.emissive.setHex(0x000000);
        material.emissiveIntensity = 0;
        setHighlightedMesh(null);
      }
    };

    const handleDrop = async (e: DragEvent) => {
      e.preventDefault();
      try {
        if (!e.dataTransfer) return;
        const productData = e.dataTransfer.getData('product');
        const color = e.dataTransfer.getData('color');
        const islandType = e.dataTransfer.getData('islandType');

        if (productData && highlightedComponent) {
          const product = JSON.parse(productData) as ProductEntity;
          if (!product) return;

          // Use the existing replaceModule function to handle the replacement
          await replaceModule(
            product,
            highlightedComponent,
            islandComponents,
            template,
            kitchenComponents
          );
        } else if (color) {
          const intersectedMesh = findIntersectedMesh(e);
          if (!intersectedMesh) return;

          // Kiểm tra xem mesh có phải là một trong các thành phần tường được cho phép không
          const allowedWallComponents = [
            'Back_Wall_Left',
            'Back_Wall',
            'Back_Wall001',
            'Back_Wall002',
            'Back_Wall_Right',
          ];

          if (!allowedWallComponents.includes(intersectedMesh.name)) {
            return; // Nếu không phải là thành phần tường được cho phép, không thực hiện thay đổi màu
          }

          // Remove highlight
          if (highlightedMesh) {
            const material = (highlightedMesh as THREE.Mesh)
              .material as THREE.MeshStandardMaterial;
            material.emissive.setHex(0x000000);
            material.emissiveIntensity = 0;
            setHighlightedMesh(null);
          }

          const meshName = intersectedMesh.name.toLowerCase();
          const type = meshName.includes('benchtop') ? 'benchtop' : 'cabinet';

          // Áp dụng màu trực tiếp lên mesh
          const material = (intersectedMesh as THREE.Mesh)
            .material as THREE.MeshStandardMaterial;
          material.color.setStyle(color);

          // Emit sự kiện để cập nhật store
          emitter.emit(THREE_EVENTS.colorPickerChange, {
            color,
            targetType: type,
            islandType,
          });
        }
      } catch (error) {
        console.error('Error handling drop:', error);
      }
    };

    const findIntersectedMesh = (event: DragEvent) => {
      if (!canvasRef.current) return null;

      const rect = canvasRef.current.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

      const raycaster = new THREE.Raycaster();
      const mouse = new THREE.Vector2(x, y);

      // Tìm tất cả các mesh có thể tương tác
      const meshes = [...kitchenComponents, ...islandComponents].flatMap(
        (component) => {
          const meshes: THREE.Mesh[] = [];
          component.traverse((child) => {
            if (child instanceof THREE.Mesh) {
              meshes.push(child);
            }
          });
          return meshes;
        }
      );

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(meshes, true);

      return intersects.length > 0 ? intersects[0].object : null;
    };

    const isKitchenComponentVisible = (component: THREE.Object3D) => {
      return isKitchenVisible && modelState.isComponentVisible(component);
    };

    const isKitchenComponentRaycastable = (component: THREE.Object3D) => {
      return isKitchenVisible && modelState.isComponentRaycastable(component);
    };

    const isIslandComponentVisible = (component: THREE.Object3D) => {
      return isIslandVisible && modelState.isComponentVisible(component);
    };

    const isIslandComponentRaycastable = (component: THREE.Object3D) => {
      return isIslandVisible && modelState.isComponentRaycastable(component);
    };

    useEffect(() => {
      const handleUpdateDimensions = () => {
        if (!kitchenScene) return;

        try {
          // Tính toán kích thước tổng thể của kitchen
          const kitchenBox = new THREE.Box3().setFromObject(kitchenScene);
          const kitchenSize = new THREE.Vector3();
          kitchenBox.getSize(kitchenSize);

          if (islandScene) {
            // Nếu có island, tính toán kích thước tổng thể bao gồm cả island
            const islandBox = new THREE.Box3().setFromObject(islandScene);
            const islandSize = new THREE.Vector3();
            islandBox.getSize(islandSize);

            // Chuyển đổi và làm tròn xuống số nguyên
            const totalSize = new THREE.Vector3(
              Math.floor(Math.max(kitchenSize.x, islandSize.x) * 1000),
              Math.floor(Math.max(kitchenSize.y, islandSize.y) * 1000),
              Math.floor(Math.max(kitchenSize.z, islandSize.z) * 1000)
            );

            setTotalDimension(totalSize);
          } else {
            // Chuyển đổi và làm tròn xuống số nguyên khi không có island
            const totalSize = new THREE.Vector3(
              Math.floor(kitchenSize.x / 1000),
              Math.floor(kitchenSize.y / 1000),
              Math.floor(kitchenSize.z / 1000)
            );
            setTotalDimension(totalSize);
          }
        } catch (error) {
          console.error('Error calculating dimensions:', error);
        }
      };

      // Thực hiện tính toán kích thước ngay khi component mount
      handleUpdateDimensions();

      // Đăng ký event listener
      emitter.on(THREE_EVENTS.updateDimensions, handleUpdateDimensions);

      return () => {
        emitter.off(THREE_EVENTS.updateDimensions, handleUpdateDimensions);
      };
    }, [kitchenScene, islandScene]);

    useEffect(() => {
      const handleResetAll = () => {
        resetReplacedModels();
      };

      emitter.on(THREE_EVENTS.removeAllModel, handleResetAll);

      return () => {
        emitter.off(THREE_EVENTS.removeAllModel, handleResetAll);
      };
    }, [
      replacedModels,
      setSavedReplacedModels,
      setHighlightedComponent,
      setHighlightedMeshNumber,
      setHighlightedMesh,
      setLastAppliedTextures,
      setIsKitchenVisible,
      setIsIslandVisible,
      setIsBackWallVisible,
      setIsFloorVisible,
      kitchenComponents,
      islandComponents,
      floorScene,
      modelState,
    ]);

    useEffect(() => {
      const handleReloadTemplate = (reloadTemplate: KitchenTemplateEntity) => {
        if (reloadTemplate.kitchenPath === template.kitchenPath) {
          // Re-initialize components
          if (kitchenScene) {
            setKitchenComponents([...kitchenScene.children]);
          }
          if (islandScene) {
            setIslandComponents([...islandScene.children]);
          }
        }
      };

      return () => {};
    }, [
      template,
      kitchenScene,
      islandScene,
      setKitchenComponents,
      setIslandComponents,
    ]);

    // Thêm useEffect mới để xử lý scale kích thước
    useEffect(() => {
      if (!kitchenComponents.length) return;

      // Find reference components
      const divider = kitchenComponents.find((comp) =>
        comp.name.includes('Divider001')
      );
      const cabinetWallR = kitchenComponents.find((comp) =>
        comp.name.includes('Cabinet_Wall_R')
      );
      if (!divider || !cabinetWallR) return;

      const dividerPosition = divider.position.clone();
      const cabinetWallRPosition = cabinetWallR.position.clone();

      const leftComponentNames = [
        'Shelf_Low_Double_Door',
        'Shelf_Low_Double_Door_1',
        'Shelf_Low_Double_Door_2',
     
        'Back_Wall001',
        // 'Back_Wall002',
      ];

      const rightComponentNames = [
        'Tall Cabinet',
        'Cabinet_High',
        'Back_Wall_k',
        // 'Back_Wall002'
      ];

      // Find panels and their associated components
      const leftPanel = kitchenComponents.find(comp => comp.name === 'Left_Panel');
      const rightPanel = kitchenComponents.find(comp => comp.name === 'Right_Panel');
      const backWallRight = kitchenComponents.find(comp => comp.name === 'Back_Wall_Right');
      const backWallLeft = kitchenComponents.find(comp => comp.name === 'Back_Wall_Left');

      const calculateDivisionRatiofridge = (width: number) => {
        // Ensure width is within bounds
        const boundedWidth = Math.max(600, Math.min(1200, width));
        
        // Calculate ratio: 6 at 600, 2 at 1200
        // Using linear interpolation: ratio = 6 - (width - 600) * (6 - 2) / (1200 - 600)
        const ratio = 6 - ((boundedWidth - 600) * (6 - 3)) / (1200 - 600);
        return ratio;
      };
      const calculateDivisionRatiotall = (width: number) => {
        // Ensure width is within bounds
        const boundedWidth = Math.max(600, Math.min(1200, width));
        
        // Calculate ratio: 6 at 600, 2 at 1200
        // Using linear interpolation: ratio = 6 - (width - 600) * (6 - 2) / (1200 - 600)
        const ratio = 6 - ((boundedWidth - 600) * (6 - 2)) / (1200 - 600);
        return ratio;
      };

      const fridgeDivisionRatio = calculateDivisionRatiofridge(fridgeCabinetWidth);
      const tallDivisionRatio = calculateDivisionRatiotall(tallCabinetWidth);
      
      const baseWidthLeft = 2000 - fridgeCabinetWidth / fridgeDivisionRatio;
      const baseWidthRight = 2000 - tallCabinetWidth / tallDivisionRatio;
      const scaleXLeft = kitchenWidth / baseWidthLeft;
      const scaleXRight = kitchenWidth / baseWidthRight;
      const scaleY = 1.5;
      const scaleZ = 1.6;

      kitchenComponents.forEach((component) => {
        const isLeftComponent = leftComponentNames.some((name) =>
          component.name.includes(name)
        );
        const isRightComponent = rightComponentNames.some((name) =>
          component.name.includes(name)
        );

        // Handle left components
        if (isLeftComponent) {
          const box = new THREE.Box3().setFromObject(component);
          const rightEdge = box.max.x;
          const distanceToKeep = dividerPosition.x - rightEdge;

          if (component instanceof THREE.Mesh) {
            component.scale.set(scaleXLeft, scaleY, scaleZ);
          }
          component.traverse((child) => {
            if (child instanceof THREE.Mesh) {
              child.scale.set(scaleXLeft, scaleY, scaleZ);
            }
          });

          const newBox = new THREE.Box3().setFromObject(component);
          const newRightEdge = newBox.max.x;
          const adjustment = dividerPosition.x - distanceToKeep - newRightEdge;
          component.position.x += adjustment;

          // If this is a Shelf component, update Left_Panel and Back_Wall_Left positions to match
          if (component.name.includes('Shelf_Low_Double_Door')) {
            if (leftPanel) {
              // Scale Left_Panel
              if (leftPanel instanceof THREE.Mesh) {
                leftPanel.scale.set(scaleXLeft, scaleY, scaleZ);
              }
              leftPanel.traverse((child) => {
                if (child instanceof THREE.Mesh) {
                  child.scale.set(scaleXLeft, scaleY, scaleZ);
                }
              });

              // Position Left_Panel relative to the shelf
              leftPanel.position.x = component.position.x;
              leftPanel.position.y = component.position.y;
              leftPanel.position.z = component.position.z;
            }

            if (backWallLeft) {
              // Scale Back_Wall_Left
              if (backWallLeft instanceof THREE.Mesh) {
                backWallLeft.scale.set(scaleXLeft, scaleY, scaleZ);
              }
              backWallLeft.traverse((child) => {
                if (child instanceof THREE.Mesh) {
                  child.scale.set(scaleXLeft, scaleY, scaleZ);
                }
              });

              // Position Back_Wall_Left relative to the shelf
              backWallLeft.position.x = component.position.x;
              backWallLeft.position.y = component.position.y;
              backWallLeft.position.z = component.position.z;
            }
          }
        }

        // Handle right components
        if (isRightComponent) {
          const box = new THREE.Box3().setFromObject(component);
          const leftEdge = box.min.x;
          const distanceToKeep = cabinetWallRPosition.x - leftEdge;

          if (component instanceof THREE.Mesh) {
            component.scale.set(scaleXRight, scaleY, scaleZ);
          }
          component.traverse((child) => {
            if (child instanceof THREE.Mesh) {
              child.scale.set(scaleXRight, scaleY, scaleZ);
            }
          });

          const newBox = new THREE.Box3().setFromObject(component);
          const newLeftEdge = newBox.min.x;
          const adjustment = cabinetWallRPosition.x - distanceToKeep - newLeftEdge;
          component.position.x += adjustment;

          // If this is Cabinet_High, update Right_Panel and Back_Wall_Right positions to match
          if (component.name.includes('Cabinet_High')) {
            if (rightPanel) {
              // Scale Right_Panel
              if (rightPanel instanceof THREE.Mesh) {
                rightPanel.scale.set(scaleXRight, scaleY, scaleZ);
              }
              rightPanel.traverse((child) => {
                if (child instanceof THREE.Mesh) {
                  child.scale.set(scaleXRight, scaleY, scaleZ);
                }
              });

              // Position Right_Panel relative to Cabinet_High
              rightPanel.position.x = component.position.x;
              rightPanel.position.y = component.position.y;
              rightPanel.position.z = component.position.z;
            }

            if (backWallRight) {
              // Scale Back_Wall_Right
              if (backWallRight instanceof THREE.Mesh) {
                backWallRight.scale.set(scaleXRight, scaleY, scaleZ);
              }
              backWallRight.traverse((child) => {
                if (child instanceof THREE.Mesh) {
                  child.scale.set(scaleXRight, scaleY, scaleZ);
                }
              });

              // Position Back_Wall_Right relative to Cabinet_High
              backWallRight.position.x = component.position.x;
              backWallRight.position.y = component.position.y;
              backWallRight.position.z = component.position.z;
            }
          }
        }
      });

      // Update overall dimensions
      const kitchenBox = new THREE.Box3().setFromObject(kitchenScene);
      const kitchenSize = new THREE.Vector3();
      kitchenBox.getSize(kitchenSize);

      setTotalDimension(
        new THREE.Vector3(
          Math.floor(kitchenSize.x * 1000),
          Math.floor(kitchenSize.y * 1000),
          Math.floor(kitchenSize.z * 1000)
        )
      );
    }, [kitchenComponents, kitchenWidth]);

    return (
      <group>
        <SceneManager
          kitchenScene={kitchenScene}
          islandScene={islandScene}
          floorScene={floorScene}
          template={template}
          onBoundUpdate={setKitchenBound}
        />

        <ModelEffects
          kitchenScene={kitchenScene}
          islandScene={islandScene}
          floorScene={floorScene}
          replacedModels={replacedModels}
          isReplacing={isReplacing}
          template={template}
          modelState={{
            setKitchenComponents,
            setIslandComponents,
            setHighlightedMeshNumber,
            setSavedReplacedModels,
          }}
        />

        {/* Add Floor Components */}
        {template.floorPath && floorScene && (
          <group visible={isFloorVisible}>
            <Suspense fallback={null}>
              <FloorComponents
                floorComponents={[floorScene]}
                onComponentClick={(component) =>
                  handleComponentClick({
                    kitchenWidth,
                    component,
                    kitchenComponents,
                    islandComponents,
                    floorComponents: [floorScene],
                    replacedModels,
                    template,
                    isReplacing,
                    onHighlight: setHighlightedComponent,
                    onMeshNumber: setHighlightedMeshNumber,
                    isComponentVisible: isKitchenComponentVisible,
                    isComponentRaycastable: isKitchenComponentRaycastable,
                    updateComponentVisibility:
                      modelState.updateComponentVisibility,
                  })
                }
                isReplacing={isReplacing}
                highlightedMeshNumber={highlightedMeshNumber}
                replacedModels={replacedModels}
              />
            </Suspense>
            <group>
              {Array.from(replacedModels.entries()).map(
                ([key, model]: [
                  string,
                  THREE.Object3D,
                ]): JSX.Element | null => {
                  const isFloorModel =
                    floorScene &&
                    [floorScene].some(
                      (comp: THREE.Object3D) =>
                        comp.name === model.userData?.originalComponent ||
                        comp.name.includes(model.userData?.originalMeshNumber)
                    );
                  if (isFloorModel) {
                    if (castShadow) {
                      model.traverse((child: THREE.Object3D) => {
                        if (child instanceof THREE.Mesh) {
                          child.castShadow = true;
                        }
                      });
                    }

                    return (
                      <group key={key}>
                        <primitive object={model} />
                        <MaterialManager scene={model} isFloor />
                      </group>
                    );
                  }
                  return null;
                }
              )}
            </group>
          </group>
        )}

        <DimensionManager
          showDimension={showDimension}
          kitchenBound={kitchenBound}
          kitchenScene={kitchenScene}
        />

        <ModelEventHandlers
          setIsIslandVisible={setIsIslandVisible}
          setIsKitchenVisible={setIsKitchenVisible}
          setIsFloorVisible={setIsFloorVisible}
          setIsBackWallVisible={setIsBackWallVisible}
          islandScene={islandScene}
          kitchenScene={kitchenScene}
          setIslandComponents={setIslandComponents}
          setKitchenComponents={setKitchenComponents}
        />

        <MaterialManager scene={kitchenScene} />
        {islandScene && <MaterialManager scene={islandScene} isIsland />}
        {floorScene && <MaterialManager scene={floorScene} isFloor />}
        <Suspense fallback={<LoadingSpinner />}>
          {/* Back Wall components - controlled by isBackWallVisible */}
          <group visible={isBackWallVisible}>
            <KitchenComponents
              kitchenComponents={kitchenComponents.filter((comp) =>
                [
                  'Back_Wall001',
                  'Back_Wall_Left',
                  'Back_Wall002',
                  'Back_Wall_Right',
                  'Back_Wall',
                  'Back_Wall_k',
                ].includes(comp.name)
              )}
              onComponentClick={(component) =>
                handleComponentClick({
                  kitchenWidth,
                  component,
                  kitchenComponents,
                  islandComponents,
                  replacedModels,
                  template,
                  isReplacing,
                  onHighlight: setHighlightedComponent,
                  onMeshNumber: setHighlightedMeshNumber,
                  isComponentVisible: isKitchenComponentVisible,
                  isComponentRaycastable: isKitchenComponentRaycastable,
                  updateComponentVisibility:
                    modelState.updateComponentVisibility,
                })
              }
              isReplacing={isReplacing}
              highlightedMeshNumber={highlightedMeshNumber}
              replacedModels={replacedModels}
            />
          </group>

          {/* Other kitchen components - controlled by isKitchenVisible */}
          <group visible={isKitchenVisible}>
            <KitchenComponents
              kitchenComponents={kitchenComponents.filter(
                (comp) =>
                  ![
                    'Back_Wall001',
                    'Back_Wall_Left',
                    'Back_Wall002',
                    'Back_Wall_Right',
                    'Back_Wall',
                    'Back_Wall_k',
                  ].includes(comp.name)
              )}
              onComponentClick={(component) =>
                handleComponentClick({
                  kitchenWidth,
                  component,
                  kitchenComponents,
                  islandComponents,
                  replacedModels,
                  template,
                  isReplacing,
                  onHighlight: setHighlightedComponent,
                  onMeshNumber: setHighlightedMeshNumber,
                  isComponentVisible: isKitchenComponentVisible,
                  isComponentRaycastable: isKitchenComponentRaycastable,
                  updateComponentVisibility:
                    modelState.updateComponentVisibility,
                })
              }
              isReplacing={isReplacing}
              highlightedMeshNumber={highlightedMeshNumber}
              replacedModels={replacedModels}
            />
            <group>
              {Array.from(replacedModels.entries()).map(
                ([key, model]: [
                  string,
                  THREE.Object3D,
                ]): JSX.Element | null => {
                  const isKitchenModel = kitchenComponents.some(
                    (comp: THREE.Object3D) =>
                      comp.name === model.userData?.originalComponent ||
                      comp.name.includes(model.userData?.originalMeshNumber)
                  );
                  if (isKitchenModel) {
                    if (castShadow) {
                      model.traverse((child: THREE.Object3D) => {
                        if (child instanceof THREE.Mesh) {
                          child.castShadow = true;
                        }
                      });
                    }

                    return (
                      <group key={key}>
                        <primitive object={model} />
                        <MaterialManager scene={model} />
                      </group>
                    );
                  }
                  return null;
                }
              )}
            </group>
          </group>
        </Suspense>

        {template.islandPath && (
          <Suspense fallback={<LoadingSpinner />}>
            <group visible={isIslandVisible}>
              <IslandComponents
                islandComponents={islandComponents}
                replacedModels={replacedModels}
                onComponentClick={(component) =>
                  handleComponentClick({
                    kitchenWidth,
                    component,
                    kitchenComponents,
                    islandComponents,
                    replacedModels,
                    template,
                    isReplacing,
                    onHighlight: setHighlightedComponent,
                    onMeshNumber: setHighlightedMeshNumber,
                    isComponentVisible: isIslandComponentVisible,
                    isComponentRaycastable: isIslandComponentRaycastable,
                    updateComponentVisibility:
                      modelState.updateComponentVisibility,
                  })
                }
                isReplacing={isReplacing}
                highlightedMeshNumber={highlightedMeshNumber}
              />
              <group>
                {Array.from(replacedModels.entries()).map(
                  ([key, model]: [
                    string,
                    THREE.Object3D,
                  ]): JSX.Element | null => {
                    const isIslandModel = islandComponents.some(
                      (comp: THREE.Object3D) =>
                        comp.name === model.userData?.originalComponent ||
                        comp.name.includes(model.userData?.originalMeshNumber)
                    );
                    if (isIslandModel) {
                      if (castShadow) {
                        model.traverse((child: THREE.Object3D) => {
                          if (child instanceof THREE.Mesh) {
                            child.castShadow = true;
                          }
                        });
                      }

                      return (
                        <group key={key}>
                          <primitive object={model} />
                          <MaterialManager scene={model} isIsland />
                        </group>
                      );
                    }
                    return null;
                  }
                )}
              </group>
            </group>
          </Suspense>
        )}
        {highlightedComponent && (
          <group>
            <MaterialManager
              scene={highlightedComponent}
              isIsland={islandComponents.some(
                (comp) =>
                  comp.name === highlightedComponent.name ||
                  comp.name.includes(
                    highlightedComponent.userData?.originalMeshNumber
                  )
              )}
              lastAppliedTexture={
                lastAppliedTextures.get(highlightedComponent.uuid)?.texture
              }
            />
          </group>
        )}
      </group>
    );
  })
);
