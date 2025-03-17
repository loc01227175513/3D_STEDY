import * as THREE from 'three';

export interface ModelDimensions {
  width: number;
  height: number;
  depth: number;
  widthMm: number;
  heightMm: number;
  depthMm: number;
}

/**
 * Tính toán kích thước của model
 */
export const calculateModelDimensions = (model: THREE.Object3D): ModelDimensions => {
  const box = new THREE.Box3().setFromObject(model);
  const size = new THREE.Vector3();
  box.getSize(size);
  return {
    width: size.x,
    height: size.y,
    depth: size.z,
    widthMm: size.x * 1000,
    heightMm: size.y * 1000,
    depthMm: size.z * 1000
  };
};

/**
 * Kiểm tra nếu là Shelf_High_Single_Door
 */
export const isShelfHighSingleDoor = (name: string): boolean => {
  return name.startsWith('Shelf_High_Single_Door_');
};

/**
 * Kiểm tra nếu là sink component
 */
export const isSinkComponent = (name: string): boolean => {
  return name.includes('Cabinet_Sink_Double_Door') || 
         name.includes('Sink_Double_Stand_Alone_1');
}; 