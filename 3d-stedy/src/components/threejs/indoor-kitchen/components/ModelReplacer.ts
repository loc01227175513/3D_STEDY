import * as THREE from 'three';
import { ProductEntity, KitchenTemplateEntity } from '@/types/model';
import { useModelLoader } from '../hooks/model-replacement/useModelLoader';
import { useModelState } from '../hooks/model-replacement/useModelState';
import { useModelTransform } from '../hooks/model-replacement/useModelTransform';
import { useModelUpdate } from '../hooks/model-replacement/useModelUpdate';
import { useModelRemover } from './ModelRemover';
import { useProductManager } from './ProductManager';
import { useModelMatcher } from './ModelMatcher';
import { HighlightManager } from '../templates/components/highlight/HighlightManager';
import { emitter, THREE_EVENTS } from '@/utils/events';
import { useSpecialComponentMatching } from '../hooks/model-replacement/useSpecialComponentMatching';

export const useModelReplacer = (islandScene: THREE.Scene | null) => {
  const { loadModel } = useModelLoader();
  const {
    replacedModels,
    isReplacing,
    setIsReplacing,
    getMeshNumber,
    updateReplacedModel,
    removeReplacedModel,
  } = useModelState();
  const { findTargetScene } = useModelTransform();
  const { updateTemplateProducts, emitTemplateUpdate } = useModelUpdate();
  const { removeOldModel } = useModelRemover();
  const { validateProduct } = useProductManager();
  const { matchByNamePrefix } = useModelMatcher();
  const highlightManager = HighlightManager.getInstance();
  const { findMatchingProduct, updateDynamicMapping } =
    useSpecialComponentMatching();

  const findComponentWithHighestNumber = (
    components: THREE.Object3D[]
  ): THREE.Object3D | null => {
    let maxNumber = -1;
    let selectedComponent = null;

    components.forEach((comp) => {
      const match = comp.name.match(/\d+$/);
      if (match) {
        const number = parseInt(match[0]);
        if (number > maxNumber) {
          maxNumber = number;
          selectedComponent = comp;
        }
      }
    });

    return selectedComponent;
  };

  const replaceModule = async (
    product: ProductEntity,
    highlightedComponent: THREE.Object3D | null,
    islandComponents: THREE.Object3D<THREE.Object3DEventMap>[],
    template: KitchenTemplateEntity,
    kitchenComponents: THREE.Object3D<THREE.Object3DEventMap>[] = [],
    matchingComponents?: THREE.Object3D<THREE.Object3DEventMap>[]
  ) => {
    console.log('Product path:', product?.path);
    
    if (
      isReplacing ||
      !highlightedComponent ||
      !islandScene ||
      !validateProduct(product, product?.path)
    ) {
      return;
    }

    try {
      setIsReplacing(true);

      // Special handling for Scene model
      const isSceneModel = highlightedComponent.name === 'Scene';
      if (isSceneModel) {
        const newModelScene = await loadModel(product.path);
        if (!newModelScene) {
          return;
        }

        const newGroup = new THREE.Group();
        newGroup.name = 'Scene';
        newGroup.userData = {
          isReplacedModel: true,
          originalComponent: 'Scene',
          productId: product.id,
          clickable: true
        };

        newModelScene.traverse((child: THREE.Object3D) => {
          if (child instanceof THREE.Mesh) {
            const newMesh = child.clone();
            if (child.material) {
              newMesh.material = child.material.clone();
            }
            newMesh.userData = { ...newGroup.userData };
            newMesh.castShadow = true;
            newMesh.receiveShadow = true;
            newGroup.add(newMesh);
          }
        });

        // Copy transform from original Scene
        newGroup.position.copy(highlightedComponent.position);
        newGroup.rotation.copy(highlightedComponent.rotation);
        newGroup.scale.copy(highlightedComponent.scale);

        // Add to target scene and update
        const targetScene = findTargetScene(highlightedComponent, islandScene);
        targetScene.add(newGroup);
        newGroup.updateMatrixWorld(true);

        // Hide original Scene
        highlightedComponent.visible = false;
        highlightedComponent.userData.isHidden = true;

        // Update replaced models map and ensure clickable properties
        newGroup.traverse((child: THREE.Object3D) => {
          if (child instanceof THREE.Mesh) {
            child.userData = {
              ...child.userData,
              isReplacedModel: true,
              originalComponent: 'Scene',
              productId: product.id,
              clickable: true
            };
          }
        });
        updateReplacedModel('Scene', newGroup);

        // Highlight new model
        highlightManager.highlightComponents([newGroup]);

        // Emit events
        emitter.emit(THREE_EVENTS.replaceSuccess, {
          product,
          meshNumber: '',
          componentName: 'Scene'
        });

        emitter.emit(THREE_EVENTS.REPLACED_MODEL_INFO, {
          componentName: 'Scene',
          productName: product.name
        });

        return;
      }

      const newModelScene = await loadModel(product.path);
      if (!newModelScene) {
        return;
      }

      // highlightManager.resetHighlights(
      //   kitchenComponents,
      //   islandComponents,
      //   replacedModels
      // );

      const meshNumber = getMeshNumber(highlightedComponent.name);

      let oldProduct = null;

      if (meshNumber) {
        oldProduct =
          template.products.find((p) => p.position === meshNumber) || null;
      }

      if (!oldProduct) {
        oldProduct = findMatchingProduct(
          highlightedComponent.name,
          template.products
        );
      }

      const { updatedProducts, totalPrice } = updateTemplateProducts(
        template,
        product,
        oldProduct,
        meshNumber || ''
      );

      if (meshNumber) {
        removeReplacedModel(meshNumber);
      }

      const targetScene = findTargetScene(highlightedComponent, islandScene);

      const componentsToCheck = matchingComponents || [
        ...islandComponents,
        ...kitchenComponents,
      ];

      const componentsWithSamePrefix = componentsToCheck.filter((c) =>
        matchByNamePrefix(c, highlightedComponent)
      );

      const representativeComponent =
        findComponentWithHighestNumber(componentsWithSamePrefix) ||
        highlightedComponent;

      const totalBox = new THREE.Box3();
      const isNotSpecifiedPath = !product?.path?.includes(
        'Intero/GalleyTemplateA/Components/Island/KitchenIsland_Cabinet_Sink_Double_Door'
      );

      const isKitchenOvenB = !(
        product?.path?.includes('Intero/GalleyTemplateB/Components/Kitchen/Kitchen_Oven') ||
        product?.path?.includes('Intero/GalleyTemplateA/Components/Kitchen/Kitchen_Oven')
      );

      const isKitchenIslandSink =
        product.name?.includes('KitchenIsland') &&
        product.name?.includes('Cabinet Sink');

      componentsWithSamePrefix.forEach((comp) => {
        if (isKitchenIslandSink) {
          const box = new THREE.Box3().setFromObject(comp);
          totalBox.union(box);
        } else {
          if (comp.name.includes('Sink_Double_Stand_Alone')) {
            if (isNotSpecifiedPath) {
              return;
            }
          }

          if (comp.name.includes('Dishwasher')) {
            return;
          }

          if (isKitchenOvenB && (comp.name.includes('Cabinet_Oven001_1') || comp.name.includes('Cabinet_Oven001_2'))) {
            return;
          }

          const box = new THREE.Box3().setFromObject(comp);
          totalBox.union(box);
        }
      });

      const totalCenter = totalBox.getCenter(new THREE.Vector3());
      const totalSize = totalBox.getSize(new THREE.Vector3());

      const savedProperties = new Map<
        string,
        {
          isHighlighted: boolean;
          userData: any;
          name: string;
        }
      >();

      componentsWithSamePrefix.forEach((comp) => {
        savedProperties.set(comp.name, {
          isHighlighted: highlightManager.isHighlighted(comp),
          userData: { ...comp.userData },
          name: comp.name,
        });
      });

      const newGroupForAll = new THREE.Group();
      newGroupForAll.name = representativeComponent.name;

      newGroupForAll.userData = {
        ...representativeComponent.userData,
        isReplacedModel: true,
        originalComponent: representativeComponent.name,
        originalMeshNumber: meshNumber,
        productId: product.id,
        clickable: true,
      };

      newModelScene.traverse((child: THREE.Object3D) => {
        if (child instanceof THREE.Mesh) {
          const newMesh = child.clone();
          if (child.material) {
            newMesh.material = child.material.clone();
          }
          // Set shadow properties
          newMesh.castShadow = true;
          newMesh.receiveShadow = true;

          const savedProps = savedProperties.get(representativeComponent.name);
          if (savedProps) {
            newMesh.userData = {
              ...savedProps.userData,
              isReplacedModel: true,
              originalComponent: representativeComponent.name,
              originalMeshNumber: meshNumber,
              productId: product.id,
              clickable: true,
            };
            newMesh.name = savedProps.name;
          }

          newGroupForAll.add(newMesh);
        }
      });

      const key = meshNumber || highlightedComponent.name;
      updateReplacedModel(key, newGroupForAll);

      const newBox = new THREE.Box3().setFromObject(newGroupForAll);
      const newSize = newBox.getSize(new THREE.Vector3());
      const newCenter = newBox.getCenter(new THREE.Vector3());

      const scaleX = totalSize.x / newSize.x;
      const scaleY = totalSize.y / newSize.y;
      const scaleZ = totalSize.z / newSize.z;

      // Set fixed height for Cabinet Sink when !isNotSpecifiedPath
      if (!isNotSpecifiedPath && product.name?.includes('Cabinet Sink')) {
        const fixedHeight = 1.933 ; // Fixed height in meters
        const currentHeight = newSize.y * scaleY;
        const adjustedScaleY = fixedHeight / newSize.y;
        newGroupForAll.scale.set(scaleX, adjustedScaleY, scaleZ);
      } else if (product?.path?.includes('Kitchen_CookTop')) {
        // Get cooktop size
        let cooktopSize = 77; // default size
        if (product.path?.includes('90cm')) {
          cooktopSize = 90;
        } else if (product.path?.includes('60cm')) {
          cooktopSize = 70;
        }

        // Base scale values
        const baseScaleY = 1.5;
        const baseScaleZ = 1.6;
        
        // Calculate scale relative to 70cm model
        const sizeRatio = cooktopSize / 70;
        const scaleX = 1.2 * sizeRatio;

        // Apply the calculated scale
        newGroupForAll.scale.set(scaleX, baseScaleY, baseScaleZ);

        // Set base position
        newGroupForAll.position.set(0, -0.01, 0);

        // Calculate center offset
        const centerOffset = new THREE.Vector3();
        if (cooktopSize !== 70) {
            // Calculate the difference in width from 70cm model
            const widthDiff = (cooktopSize - 70) / 100; // Convert to meters
            // Center offset is half the width difference
            centerOffset.x = widthDiff / 6;
            if (cooktopSize < 70) {
                centerOffset.x *= -1; // Negative offset for smaller sizes
            }
        }

        // Apply center offset
        newGroupForAll.position.add(centerOffset);
      } else {
        if (!product?.path?.includes('Kitchen_Rangehood')) {
          newGroupForAll.scale.set(scaleX, scaleY, scaleZ);
        } else {
          newGroupForAll.scale.set(1.5, 1.25, scaleZ); // Keep original scale for x and y axis for Kitchen_Rangehood
        }
      }

      newBox.setFromObject(newGroupForAll);
      newCenter.copy(newBox.getCenter(new THREE.Vector3()));

      const offset = new THREE.Vector3().subVectors(totalCenter, newCenter);
      if (!product?.path?.includes('Kitchen_Rangehood') && !product?.path?.includes('Kitchen_CookTop')) {
        offset.y =
          representativeComponent.position.y - newGroupForAll.position.y;
      } else if (product?.path?.includes('Kitchen_Rangehood')) {
        // For Kitchen_Rangehood, calculate y position using scaleY but don't apply the scale
        const scaledHeight = newSize.y * scaleY;
        offset.y = representativeComponent.position.y + (scaledHeight - newSize.y) / 2;
      }

      newGroupForAll.position.copy(offset);

      const worldQuaternion = new THREE.Quaternion();
      representativeComponent.getWorldQuaternion(worldQuaternion);
      newGroupForAll.quaternion.copy(worldQuaternion);

      componentsWithSamePrefix.forEach((comp) => {
        const compMeshNumber = getMeshNumber(comp.name);
        if (compMeshNumber && replacedModels.has(compMeshNumber)) {
          const oldModel = replacedModels.get(compMeshNumber);
          if (oldModel && oldModel.parent) {
            oldModel.parent.remove(oldModel);
          }
          replacedModels.delete(compMeshNumber);
        } else if (!compMeshNumber && replacedModels.has(comp.name)) {
          const oldModel = replacedModels.get(comp.name);
          if (oldModel && oldModel.parent) {
            oldModel.parent.remove(oldModel);
          }
          replacedModels.delete(comp.name);
        }
      });

      targetScene.add(newGroupForAll);
      newGroupForAll.updateMatrixWorld(true);
      targetScene.updateMatrixWorld(true);

      removeOldModel(
        representativeComponent,
        meshNumber,
        representativeComponent,
        representativeComponent.name,
        componentsToCheck
      );

      // Highlight new model after replacement
      highlightManager.highlightComponents([newGroupForAll]);

      const getComponentType = (componentName: string): string => {
        const name = componentName.toLowerCase();

        if (name.includes('dishwasher')) return 'dishwasher';
        if (name.includes('cabinet_opening')) return 'cabinet_opening';
        if (name.includes('cabinet_microwave')) return 'cabinet_microwave';
        if (name.includes('cabinet_sink_double_door'))
          return 'Cabinet_Sink_Double_Door';
        if (name.includes('cabinet_four_drawer')) return 'Cabinet_Four_Drawer';
        if (name.includes('cabinet_high')) return 'Cabinet_High';
        if (name.includes('shelf_high_single_door_r'))
          return 'Shelf_High_Single_Door_R';
        if (name.includes('shelf_high_double_door'))
          return 'Shelf_High_Double_Door';
        if (name.includes('shelf_high_single_door_l'))
          return 'Shelf_High_Single_Door_L';
        if (name.includes('shelf_low_double_door'))
          return 'Shelf_Low_Double_Door';
        if (name.includes('cabinet_single_door_l'))
          return 'Cabinet_Single_Door_L';
        if (name.includes('cabinet_single_door_r'))
          return 'Cabinet_Single_Door_R';
        if (name.includes('cabinet_oven')) return 'Cabinet_Oven';
        if (name.includes('cooktop')) return 'CookTop';

        return '';
      };

      const componentType = getComponentType(highlightedComponent.name);

      if (componentType) {
        // Get the first mesh from the group
        let firstMesh: THREE.Mesh | null = null;
        newGroupForAll.traverse((child) => {
          if (child instanceof THREE.Mesh && !firstMesh) {
            firstMesh = child;
          }
        });

        if (firstMesh) {
          updateDynamicMapping(
            componentType,
            product.name || '',
            product,
            firstMesh
          );
        }
      }

      emitter.emit(THREE_EVENTS.replaceSuccess, {
        product,
        meshNumber: meshNumber || '',
        componentName: highlightedComponent.name,
      });

      emitter.emit(THREE_EVENTS.REPLACED_MODEL_INFO, {
        componentName: highlightedComponent.name,
        productName: product.name,
      });

      emitTemplateUpdate(
        updatedProducts,
        totalPrice,
        oldProduct,
        product,
        meshNumber || ''
      );
    } catch (error) {
      console.error('Lỗi trong quá trình thay thế model:', error);
    } finally {
      setIsReplacing(false);
    }
  };

  return {
    replacedModels,
    replaceModule,
    isReplacing,
  };
};
