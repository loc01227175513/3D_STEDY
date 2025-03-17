import { useState, useEffect } from 'react';
import * as THREE from 'three';
import { WorldBound } from '@/types/model';

interface VisibilityState {
  visible: boolean;
  raycastable: boolean;
}

export const useModelState = () => {
  const [kitchenBound, setKitchenBound] = useState<WorldBound | null>(null);
  const [highlightedComponent, setHighlightedComponent] = useState<THREE.Object3D | null>(null);
  const [kitchenComponents, setKitchenComponents] = useState<THREE.Object3D<THREE.Object3DEventMap>[]>([]);
  const [islandComponents, setIslandComponents] = useState<THREE.Object3D<THREE.Object3DEventMap>[]>([]);
  const [floorComponents, setFloorComponents] = useState<THREE.Object3D<THREE.Object3DEventMap>[]>([]);
  const [highlightedMeshNumber, setHighlightedMeshNumber] = useState<string | null>(null);
  const [isIslandVisible, setIsIslandVisible] = useState(true);
  const [isKitchenVisible, setIsKitchenVisible] = useState(true);
  const [savedReplacedModels, setSavedReplacedModels] = useState<Map<string, THREE.Object3D>>(new Map());
  const [componentVisibilityState, setComponentVisibilityState] = useState<Map<string, VisibilityState>>(new Map());

  // Helper function để cập nhật visibility của một component
  const updateComponentVisibility = (
    component: THREE.Object3D,
    visible: boolean,
    raycastable: boolean = visible
  ) => {
    // Cập nhật state
    setComponentVisibilityState(prev => {
      const newState = new Map(prev);
      newState.set(component.uuid, { visible, raycastable });
      return newState;
    });

    // Cập nhật trực tiếp trên object
    component.visible = visible;
    component.traverse(child => {
      if (child instanceof THREE.Mesh) {
        child.visible = visible;
        child.raycast = raycastable ? child.raycast : () => null;
      }
    });
  };

  // Helper function để kiểm tra visibility của một component
  const isComponentVisible = (component: THREE.Object3D): boolean => {
    const state = componentVisibilityState.get(component.uuid);
    return state?.visible !== false;
  };

  // Helper function để kiểm tra raycastable của một component
  const isComponentRaycastable = (component: THREE.Object3D): boolean => {
    const state = componentVisibilityState.get(component.uuid);
    return state?.raycastable !== false;
  };

  // Helper function để đồng bộ visibility giữa model cũ và mới khi replace
  const syncVisibilityOnReplace = (oldModel: THREE.Object3D, newModel: THREE.Object3D) => {
    const state = componentVisibilityState.get(oldModel.uuid);
    if (state) {
      updateComponentVisibility(newModel, state.visible, state.raycastable);
    }
  };

  // Khởi tạo visibility state cho components mới
  useEffect(() => {
    const newVisibilityState = new Map<string, VisibilityState>();
    
    const initComponent = (component: THREE.Object3D) => {
      if (!componentVisibilityState.has(component.uuid)) {
        newVisibilityState.set(component.uuid, { visible: true, raycastable: true });
      } else {
        newVisibilityState.set(component.uuid, componentVisibilityState.get(component.uuid)!);
      }
    };

    // Khởi tạo cho kitchen components
    kitchenComponents.forEach(initComponent);

    // Khởi tạo cho island components
    islandComponents.forEach(initComponent);

    // Khởi tạo cho replaced models
    savedReplacedModels.forEach(initComponent);

    if (newVisibilityState.size > 0) {
      setComponentVisibilityState(newVisibilityState);
    }
  }, [kitchenComponents, islandComponents, savedReplacedModels]);

  return {
    kitchenBound,
    highlightedComponent,
    kitchenComponents,
    islandComponents,
    floorComponents,
    highlightedMeshNumber,
    isIslandVisible,
    isKitchenVisible,
    savedReplacedModels,
    componentVisibilityState,
    setKitchenBound,
    setHighlightedComponent,
    setKitchenComponents,
    setIslandComponents,
    setFloorComponents,
    setHighlightedMeshNumber,
    setIsIslandVisible,
    setIsKitchenVisible,
    setSavedReplacedModels,
    setComponentVisibilityState,
    updateComponentVisibility,
    isComponentVisible,
    isComponentRaycastable,
    syncVisibilityOnReplace,
  };
}; 