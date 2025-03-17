import { productStore } from '@/store';
import { KitchenTemplateEntity, Model } from '@/types/model';
import { useGLTF } from '@react-three/drei';
import { forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import * as THREE from 'three';
import { useMaterial } from '../../hooks/useMaterial';

interface LShapeTemplateProps {
  template: KitchenTemplateEntity;
}

export const LShapeTemplate = forwardRef(
  ({ template }: LShapeTemplateProps, ref) => {
    const { scene: kitchenScene } = useGLTF(template.kitchenPath);

    let islandScene;
    if (template.islandPath) {
      ({ scene: islandScene } = useGLTF(template.islandPath));
    }

    const { cabinetColor, benchtopColor } = productStore();

    const [highlight, setHighlight] = useState(null);
    const [size, setSize] = useState({ x: 0, y: 0, z: 0 });

    const { highlightScene, changeMaterialForScene } = useMaterial();

    // Expose methods, props to parent component
    useImperativeHandle(ref, () => ({
      scene: kitchenScene,
      setHighlight,
      size,
    }));

    useEffect(() => {
      if (!kitchenScene || highlight == null) return;

      highlightScene(kitchenScene, highlight);
    }, [highlight]);

    // scene is loaded
    useEffect(() => {
      if (!kitchenScene) return;

      // Create a bounding box around the scene
      const size = new THREE.Box3()
        .setFromObject(kitchenScene)
        .getSize(new THREE.Vector3());
      setSize(size);

      kitchenScene.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          // child.castShadow = true;
          child.receiveShadow = true;
        }
      });

      if (benchtopColor) {
        changeMaterialForScene(
          kitchenScene,
          benchtopColor.type.toLowerCase(),
          `${import.meta.env.VITE_S3_URL}/${benchtopColor?.path}`
        );
      }

      // load current style
      if (cabinetColor) {
        changeMaterialForScene(
          kitchenScene,
          cabinetColor.type.toLowerCase(),
          `${import.meta.env.VITE_S3_URL}/${cabinetColor?.path}`
        );
      }

      // emitter.emit(THREE_EVENTS.onModelDidLoad, { scene, model });
    }, [kitchenScene]);

    return (
      <group>
        {kitchenScene && (
          <primitive object={kitchenScene} scale={1.5} position={[0, 0, 0]} />
        )}

        {islandScene && (
          <primitive object={islandScene} scale={1.5} position={[0, 0, 2.5]} />
        )}
      </group>
    );
  }
);
