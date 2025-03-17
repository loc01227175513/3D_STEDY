import { useEffect, useState } from 'react';
import * as THREE from 'three';
import { MaterialManager } from './MaterialManager';
import { WorldBoundManager } from './WorldBoundManager';
import { KitchenTemplateEntity, WorldBound } from '@/types/model';

interface SceneManagerProps {
  kitchenScene: THREE.Scene | THREE.Group;
  islandScene?: THREE.Scene | THREE.Group;
  floorScene?: THREE.Scene | THREE.Group;
  template: KitchenTemplateEntity;
  onBoundUpdate: (bound: WorldBound) => void;
}

export const SceneManager = ({
  kitchenScene,
  islandScene,
  floorScene,
  template,
  onBoundUpdate,
}: SceneManagerProps) => {
  return (
    <>
      <MaterialManager scene={kitchenScene} />
      {islandScene && <MaterialManager scene={islandScene} isIsland />}
      {floorScene && <MaterialManager scene={floorScene} isFloor />}
      <WorldBoundManager
        kitchenScene={kitchenScene}
        islandScene={islandScene}
        floorScene={floorScene}
        template={template}
        onBoundUpdate={onBoundUpdate}
      />
    </>
  );
};
