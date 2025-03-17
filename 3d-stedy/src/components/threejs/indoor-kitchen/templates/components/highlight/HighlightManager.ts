import * as THREE from 'three';
import { useMaterial } from '../../../../hooks/useMaterial';
import { MaterialManager } from '../MaterialManager';
import { FC } from 'react';
import { useHighlightStore } from '../../../../../../store';

export class HighlightManager {
  private static instance: HighlightManager;
  private highlightScene: (
    component: THREE.Object3D,
    highlight: boolean
  ) => void;
  private currentHighlightedComponents: THREE.Object3D[] = [];
  private highlightedObjects: Set<THREE.Object3D>;
  private materialManagers: Map<
    THREE.Object3D,
    FC<{ scene: THREE.Object3D; isIsland?: boolean }>
  > = new Map();

  private constructor() {
    const { highlightSceneIndoor } = useMaterial();
    this.highlightScene = highlightSceneIndoor;
    this.highlightedObjects = new Set();
  }

  public static getInstance(): HighlightManager {
    if (!HighlightManager.instance) {
      HighlightManager.instance = new HighlightManager();
    }
    return HighlightManager.instance;
  }

  resetHighlights(
    kitchenComponents: THREE.Object3D[],
    islandComponents: THREE.Object3D[],
    replacedModels: Map<string, THREE.Object3D>,
    floorComponents: THREE.Object3D[] = []
  ): void {
    // Reset all highlights regardless of stored highlight
    const allComponents = [
      ...kitchenComponents,
      ...islandComponents,
      ...floorComponents,
    ];

    allComponents.forEach((comp) => {
      this.highlightScene(comp, false);
      this.highlightedObjects.delete(comp);
      this.materialManagers.delete(comp);
    });

    replacedModels.forEach((model) => {
      this.highlightScene(model, false);
      this.highlightedObjects.delete(model);
      this.materialManagers.delete(model);
    });

    this.currentHighlightedComponents = [];

    // Clear the stored highlight
    useHighlightStore.getState().setHighlightedMesh(null);
  }

  highlightComponents(components: THREE.Object3D[]): void {
    // Reset highlight cho các components hiện tại
    this.currentHighlightedComponents.forEach((comp) => {
      this.highlightScene(comp, false);
      this.highlightedObjects.delete(comp);
      this.materialManagers.delete(comp);
    });

    // Highlight các components mới
    components.forEach((comp) => {
      this.highlightScene(comp, true);
      this.highlightedObjects.add(comp);
      const isIsland = comp.name.toLowerCase().includes('island');
      this.materialManagers.set(comp, MaterialManager);
      // Store the highlighted mesh ID
      useHighlightStore.getState().setHighlightedMesh(comp.uuid);
    });

    this.currentHighlightedComponents = components;
  }

  // Thêm method mới để tìm các components có cùng prefix
  findComponentsWithSamePrefix(
    targetComponent: THREE.Object3D,
    allComponents: THREE.Object3D[]
  ): THREE.Object3D[] {
    // Xử lý đặc biệt cho sink group
    if (
      targetComponent.name.match(/Cabinet_Sink_Double_Door_\d+/) ||
      targetComponent.name === 'Sink_Double_Stand_Alone_1' ||
      targetComponent.userData?.isSinkGroup ||
      targetComponent.userData?.isSinkComponent
    ) {
      const relatedComponents = allComponents.filter((comp) => {
        // Check replaced models
        if (comp.userData?.isSinkGroup || comp.userData?.isSinkComponent) {
          return true;
        }
        // Check original components
        if (comp.name.match(/Cabinet_Sink_Double_Door_\d+/)) {
          return true;
        }
        if (
          comp.name === 'Sink_Double_Stand_Alone_1' ||
          comp.userData?.originalComponent === 'Sink_Double_Stand_Alone_1'
        ) {
          return true;
        }
        return false;
      });
      if (relatedComponents.length > 0) {
        return relatedComponents;
      }
    }

    // Xử lý đặc biệt cho Back_Wall
    if (targetComponent.name.includes('Back_Wall')) {
      const relatedComponents = allComponents.filter((comp) =>
        comp.name.includes('Back_Wall')
      );
      if (relatedComponents.length > 0) {
        return relatedComponents;
      }
    }

    // Xử lý đặc biệt cho Cabinet_Opening và Dishwasher
    if (
      targetComponent.name.includes('Cabinet_Opening') ||
      targetComponent.name.includes('Dishwasher')
    ) {
      const relatedComponents = allComponents.filter(
        (comp) =>
          comp.name.includes('Cabinet_Opening') ||
          comp.name.includes('Dishwasher')
      );
      if (relatedComponents.length > 0) {
        return relatedComponents;
      }
    }

    // Xử lý các trường hợp thông thường
    const prefix = this.getComponentPrefix(targetComponent.name);
    return allComponents.filter(
      (comp) => comp && this.getComponentPrefix(comp.name) === prefix
    );
  }

  private getComponentPrefix(name: string): string {
    // Lấy prefix trước số cuối cùng trong tên
    const match = name.match(/(.*?)_?\d+$/);
    return match ? match[1] : name;
  }

  isHighlighted(object: THREE.Object3D): boolean {
    return this.highlightedObjects.has(object);
  }

  clearAllHighlights(): void {
    this.highlightedObjects.forEach((obj) => {
      this.highlightScene(obj, false);
      this.materialManagers.delete(obj);
    });
    this.highlightedObjects.clear();
    this.currentHighlightedComponents = [];

    // Clear the stored highlight
    useHighlightStore.getState().setHighlightedMesh(null);
  }

  highlightComponent(object: THREE.Object3D): void {
    this.highlightComponents([object]);
  }
}
