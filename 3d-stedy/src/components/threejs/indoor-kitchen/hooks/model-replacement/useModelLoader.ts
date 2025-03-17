import { useThreeModule } from '../../../hooks/useThreeModule';
import { buildGlftPath } from '@/utils/helper';
import * as THREE from 'three';

export const useModelLoader = () => {
  const { loadGLTFModule } = useThreeModule();

  const loadModel = async (modelPath: string): Promise<THREE.Scene | null> => {
    try {
      const newModelScene = await loadGLTFModule(buildGlftPath(modelPath));
      if (!newModelScene) {
        return null;
      }
      return newModelScene;
    } catch (error) {
      console.error('Lỗi khi tải model:', error);
      return null;
    }
  };

  return {
    loadModel
  };
}; 