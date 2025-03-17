import { useEffect } from 'react';
import * as THREE from 'three';
import { KitchenTemplateEntity } from '@/types/model';
import { THREE_EVENTS, emitter } from '@/utils/events';

interface ModelEffectsProps {
  kitchenScene: THREE.Scene | THREE.Group;
  islandScene?: THREE.Scene | THREE.Group;
  floorScene?: THREE.Scene | THREE.Group;
  replacedModels: Map<string, THREE.Object3D>;
  isReplacing: boolean;
  template: KitchenTemplateEntity;
  modelState: {
    setKitchenComponents: (components: THREE.Object3D[]) => void;
    setIslandComponents: (components: THREE.Object3D[]) => void;
    setHighlightedMeshNumber: (number: string | null) => void;
    setSavedReplacedModels: (models: Map<string, THREE.Object3D>) => void;
  };
}

export const ModelEffects = ({
  kitchenScene,
  islandScene,
  floorScene,
  replacedModels,
  isReplacing,
  template,
  modelState
}: ModelEffectsProps) => {
  // Effect để load kitchen components
  useEffect(() => {
    if (!kitchenScene) return;

    const components: THREE.Object3D<THREE.Object3DEventMap>[] = [];
    kitchenScene.traverse((child: THREE.Object3D<THREE.Object3DEventMap>) => {
      if (child instanceof THREE.Mesh) {
        components.push(child);
      }
    });
    modelState.setKitchenComponents(components);
  }, [kitchenScene]);

  // Effect để load island components
  useEffect(() => {
    if (!islandScene) return;

    const components: THREE.Object3D<THREE.Object3DEventMap>[] = [];
    islandScene.traverse((child: THREE.Object3D<THREE.Object3DEventMap>) => {
      if (child instanceof THREE.Mesh) {
        components.push(child.clone());
      }
    });
    modelState.setIslandComponents(components);
  }, [islandScene]);

  // Effect để reset highlighted mesh number
  useEffect(() => {
    if (!isReplacing) {
      modelState.setHighlightedMeshNumber(null);
    }
  }, [isReplacing]);

  // Effect để lưu replacedModels
  useEffect(() => {
    if (replacedModels.size > 0) {
      const newSavedModels = new Map(replacedModels);
      modelState.setSavedReplacedModels(newSavedModels);
    }
  }, [replacedModels]);

  return null;
}; 