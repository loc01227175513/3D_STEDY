import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

export const useThreeModule = () => {
  function setSizeFor3DObject(
    object: THREE.Object3D<THREE.Object3DEventMap>,
    desiredSize: THREE.Vector3
  ) {
    if (!object || !desiredSize) {
      return;
    }

    // Calculate the current size of the object
    const currentSize = new THREE.Box3()
      .setFromObject(object)
      .getSize(new THREE.Vector3());

    if (currentSize.x === 0 || currentSize.y === 0 || currentSize.z === 0) {
      return;
    }

    // Calculate the scaling factors
    const scaleX = desiredSize.x / currentSize.x;
    const scaleY = desiredSize.y / currentSize.y;
    const scaleZ = desiredSize.z / currentSize.z;

    // Apply scaling
    object.scale.set(scaleX, scaleY, scaleZ);
  }

  async function loadGLTFModule(url: string) {
    const loader = new GLTFLoader();

    try {
      const gltf: any = await new Promise((resolve, reject) => {
        loader.load(
          url,
          (gltf) => resolve(gltf),
          undefined,
          (error) => reject(error)
        );
      });

      return gltf.scene;
    } catch (error) {
      throw error;
    }
  }

  return { setSizeFor3DObject, loadGLTFModule };
};
