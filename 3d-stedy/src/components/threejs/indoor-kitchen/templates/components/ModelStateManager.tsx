import { useState } from 'react';
import * as THREE from 'three';
import { WorldBound } from '../../../../../types/model';

interface ModelStateManagerProps {
  onStateChange: {
    setKitchenComponents: (components: THREE.Object3D<THREE.Object3DEventMap>[]) => void;
    setIslandComponents: (components: THREE.Object3D<THREE.Object3DEventMap>[]) => void;
    setHighlightedComponent: (component: THREE.Object3D | null) => void;
    setHighlightedMeshNumber: (number: string | null) => void;
  };
}

export const useModelState = () => {
  const [kitchenBound, setKitchenBound] = useState<WorldBound | null>(null);
  const [highlightedComponent, setHighlightedComponent] = useState<THREE.Object3D | null>(null);
  const [kitchenComponents, setKitchenComponents] = useState<THREE.Object3D<THREE.Object3DEventMap>[]>([]);
  const [islandComponents, setIslandComponents] = useState<THREE.Object3D<THREE.Object3DEventMap>[]>([]);
  const [highlightedMeshNumber, setHighlightedMeshNumber] = useState<string | null>(null);
  const [isIslandVisible, setIsIslandVisible] = useState(true);
  const [isKitchenVisible, setIsKitchenVisible] = useState(true);
  const [savedReplacedModels, setSavedReplacedModels] = useState<Map<string, THREE.Object3D>>(new Map());

  return {
    kitchenBound,
    setKitchenBound,
    highlightedComponent,
    setHighlightedComponent,
    kitchenComponents,
    setKitchenComponents,
    islandComponents,
    setIslandComponents,
    highlightedMeshNumber,
    setHighlightedMeshNumber,
    isIslandVisible,
    setIsIslandVisible,
    isKitchenVisible,
    setIsKitchenVisible,
    savedReplacedModels,
    setSavedReplacedModels,
  };
}; 