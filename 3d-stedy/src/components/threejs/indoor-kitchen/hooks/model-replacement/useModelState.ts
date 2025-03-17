import { useState } from 'react';
import * as THREE from 'three';
import { MODEL_CATEGORIES } from '../../constants/templateConstants';

export const useModelState = () => {
  const [replacedModels, setReplacedModels] = useState<Map<string, THREE.Object3D>>(
    new Map()
  );
  const [isReplacing, setIsReplacing] = useState(false);

  const getMeshNumber = (originalName: string): string | null => {
    const meshMatch = originalName.match(/Mesh(\d{3})/);
    const isDishwasher = originalName.includes('Dishwasher');
    const isMicrowave = originalName.includes('Microwave_Sharp34L001');
    const ovenMatch = originalName.match(/Oven(\d{3})/);

    if (isDishwasher) return '016';
    if (isMicrowave) return '024';
    if (meshMatch) return meshMatch[1];
    if (ovenMatch) return ovenMatch[1];

    return null;
  };

  const getCategory = (meshNumber: string): string | undefined => {
    const category = MODEL_CATEGORIES[meshNumber as keyof typeof MODEL_CATEGORIES];
    if (Array.isArray(category)) {
      return category[0];
    }
    return typeof category === 'string' ? category : undefined;
  };

  const updateReplacedModel = (meshNumber: string, model: THREE.Object3D) => {
    setReplacedModels((prev) => {
      const updated = new Map(prev);
      updated.set(meshNumber, model);
      return updated;
    });
  };

  const removeReplacedModel = (meshNumber: string) => {
    const oldModel = replacedModels.get(meshNumber);
    if (oldModel && oldModel.parent) {
      oldModel.parent.remove(oldModel);
      setReplacedModels((prev) => {
        const updated = new Map(prev);
        updated.delete(meshNumber);
        return updated;
      });
    }
  };

  return {
    replacedModels,
    isReplacing,
    setIsReplacing,
    getMeshNumber,
    getCategory,
    updateReplacedModel,
    removeReplacedModel
  };
}; 