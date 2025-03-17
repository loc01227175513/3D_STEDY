import { useEffect } from 'react';
import * as THREE from 'three';
import { useMaterial } from '../../../hooks/useMaterial';
import { productStore } from '@/store';

interface MaterialManagerProps {
  scene: THREE.Object3D;
  isIsland?: boolean;
  lastAppliedTexture?: string;
  isFloor?: boolean;
}

export const MaterialManager = ({ scene, isIsland, lastAppliedTexture, isFloor }: MaterialManagerProps) => {
  const { 
    benchtopColor, 
    cabinetColor, 
    materialChangeEvent,
    benchtopColorKitchen,
    cabinetColorKitchen,
    benchtopColorIsland,
    cabinetColorIsland,
    clearMaterialChangeEvent 
  } = productStore();
  const { changeMaterialForScene2Value } = useMaterial();

  // Lắng nghe thay đổi material từ store
  useEffect(() => {
    if (materialChangeEvent.event && materialChangeEvent.materialType && materialChangeEvent.texturePath) {
      changeMaterialForScene2Value(
        scene,
        materialChangeEvent.materialType,
        materialChangeEvent.texturePath
      );
      clearMaterialChangeEvent();
    }
  }, [materialChangeEvent, scene]);

  useEffect(() => {
    const applyInitialTextures = async () => {
      if (!scene) return;

      // Handle floor tiles materials
      if (isFloor && cabinetColor && cabinetColor.type === 'FLOORTILES') {
        await changeMaterialForScene2Value(
          scene,
          'floor_tiles',
          `${import.meta.env.VITE_S3_URL}/${cabinetColor?.path}`
        );
        return;
      }

      // Handle kitchen textures
      if (!isIsland) {
        if (benchtopColorKitchen) {
          await changeMaterialForScene2Value(
            scene,
            benchtopColorKitchen.type.toLowerCase(),
            `${import.meta.env.VITE_S3_URL}/${benchtopColorKitchen?.path}`
          );
        }

        if (cabinetColorKitchen) {
          await changeMaterialForScene2Value(
            scene,
            cabinetColorKitchen.type.toLowerCase(),
            `${import.meta.env.VITE_S3_URL}/${cabinetColorKitchen?.path}`
          );
        }
      }
      // Handle island textures
      else {
        if (benchtopColorIsland) {
          await changeMaterialForScene2Value(
            scene,
            benchtopColorIsland.type.toLowerCase(),
            `${import.meta.env.VITE_S3_URL}/${benchtopColorIsland?.path}`
          );
        }

        if (cabinetColorIsland) {
          await changeMaterialForScene2Value(
            scene,
            cabinetColorIsland.type.toLowerCase(),
            `${import.meta.env.VITE_S3_URL}/${cabinetColorIsland?.path}`
          );
        }
      }
    };

    applyInitialTextures();
  }, [
    scene, 
    isFloor,
    isIsland,
    benchtopColorKitchen,
    cabinetColorKitchen,
    benchtopColorIsland,
    cabinetColorIsland,
    benchtopColor,
    cabinetColor
  ]);

  return null;
};
