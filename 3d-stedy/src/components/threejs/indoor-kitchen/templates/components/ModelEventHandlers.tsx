import { useEffect } from 'react';
import * as THREE from 'three';
import { THREE_EVENTS, emitter } from '@/utils/events';

interface ModelEventHandlersProps {
  setIsIslandVisible: (visible: boolean) => void;
  setIsKitchenVisible: (visible: boolean) => void;
  setIsFloorVisible: (visible: boolean) => void;
  setIsBackWallVisible: (visible: boolean) => void;
  islandScene?: THREE.Scene | THREE.Group;
  kitchenScene?: THREE.Scene | THREE.Group;
  setIslandComponents: (components: THREE.Object3D<THREE.Object3DEventMap>[]) => void;
  setKitchenComponents: (components: THREE.Object3D<THREE.Object3DEventMap>[]) => void;
}

export const ModelEventHandlers = ({
  setIsIslandVisible,
  setIsKitchenVisible,
  setIsFloorVisible,
  setIsBackWallVisible,
  islandScene,
  kitchenScene,
  setIslandComponents,
  setKitchenComponents
}: ModelEventHandlersProps) => {
  // Khởi tạo island components khi mount
  useEffect(() => {
    if (islandScene) {
      const components: THREE.Object3D<THREE.Object3DEventMap>[] = [];
      islandScene.traverse((child: THREE.Object3D<THREE.Object3DEventMap>) => {
        if (child instanceof THREE.Mesh) {
          components.push(child.clone());
        }
      });
      setIslandComponents(components);
    }
  }, [islandScene]);

  // Khởi tạo kitchen components khi mount
  useEffect(() => {
    if (kitchenScene) {
      const components: THREE.Object3D<THREE.Object3DEventMap>[] = [];
      kitchenScene.traverse((child: THREE.Object3D<THREE.Object3DEventMap>) => {
        if (child instanceof THREE.Mesh) {
          components.push(child.clone());
        }
      });
      setKitchenComponents(components);
    }
  }, [kitchenScene]);

  // Xử lý toggle island, kitchen, floor, and back wall
  useEffect(() => {
    const handleToggleIsland = (visible: boolean) => {
      setIsIslandVisible(visible);
    };

    const handleToggleKitchen = (visible: boolean) => {
      setIsKitchenVisible(visible);
    };

    const handleToggleFloor = (visible: boolean) => {
      setIsFloorVisible(visible);
    };

    const handleToggleBackWall = (visible: boolean) => {
      setIsBackWallVisible(visible);
    };

    emitter.on(THREE_EVENTS.TOGGLE_ISLAND, handleToggleIsland);
    emitter.on(THREE_EVENTS.TOGGLE_KITCHEN, handleToggleKitchen);
    emitter.on(THREE_EVENTS.toggleFloor, handleToggleFloor);
    emitter.on(THREE_EVENTS.toggleBackWall, handleToggleBackWall);

    return () => {
      emitter.off(THREE_EVENTS.TOGGLE_ISLAND, handleToggleIsland);
      emitter.off(THREE_EVENTS.TOGGLE_KITCHEN, handleToggleKitchen);
      emitter.off(THREE_EVENTS.toggleFloor, handleToggleFloor);
      emitter.off(THREE_EVENTS.toggleBackWall, handleToggleBackWall);
    };
  }, [setIsIslandVisible, setIsKitchenVisible, setIsFloorVisible, setIsBackWallVisible]);

  return null;
}; 