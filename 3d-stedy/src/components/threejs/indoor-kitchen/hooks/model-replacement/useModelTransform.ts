import * as THREE from 'three';

export const useModelTransform = () => {
  const findTargetScene = (
    highlightedComponent: THREE.Object3D,
    islandScene: THREE.Scene
  ): THREE.Scene => {
    let targetScene = highlightedComponent;
    while (targetScene.parent && !(targetScene instanceof THREE.Scene)) {
      targetScene = targetScene.parent;
    }

    return targetScene instanceof THREE.Scene ? targetScene : islandScene;
  };

  return {
    findTargetScene
  };
}; 