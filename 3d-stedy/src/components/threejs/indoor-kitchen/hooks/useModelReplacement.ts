import * as THREE from 'three';
import { ProductEntity, KitchenTemplateEntity } from '@/types/model';
import { useModelReplacer } from '../components/ModelReplacer';

export const useModelReplacement = (islandScene: THREE.Scene | null) => {
  const { replacedModels, replaceModule, isReplacing } = useModelReplacer(islandScene);

  const handleReplacement = async (
    product: ProductEntity,
    highlightedComponent: THREE.Object3D | null,
    islandComponents: THREE.Object3D<THREE.Object3DEventMap>[],
    template: KitchenTemplateEntity,
    kitchenComponents: THREE.Object3D<THREE.Object3DEventMap>[] = [],
    matchingComponents?: THREE.Object3D<THREE.Object3DEventMap>[]
  ) => {
    try {
      // Store highlight state before replacement
      const wasHighlighted = highlightedComponent?.userData?.isHighlighted;
      
      await replaceModule(
        product,
        highlightedComponent,
        islandComponents,
        template,
        kitchenComponents,
        matchingComponents
      );

      // If component was highlighted before, ensure new model is highlighted
      if (wasHighlighted && highlightedComponent) {
        const meshNumber = highlightedComponent.userData?.originalMeshNumber;
        if (meshNumber && replacedModels.has(meshNumber)) {
          const newModel = replacedModels.get(meshNumber);
          if (newModel) {
            newModel.userData.isHighlighted = true;
          }
        }
      }
    } catch (error) {
      console.error('Error in handleReplacement:', error);
    }
  };

  return {
    replacedModels,
    replaceModule: handleReplacement,
    isReplacing,
  };
};
