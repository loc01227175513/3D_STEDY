import * as THREE from 'three';

export class ComponentIdentifier {
  static getMeshNumber(componentName: string): string | null {
    const meshMatch = componentName.match(/Mesh(\d{3})/);
    const isDishwasher = componentName.includes('Dishwasher');
    const isMicrowave = componentName.includes('Microwave_Sharp34L001');
    const isOven = componentName.includes('Oven001');
    const isOven1 = componentName === 'Oven001_1';

    if (isDishwasher) return '016';
    if (isMicrowave) return '024';
    if (isOven1) return '026';
    if (isOven) return '025';
    if (meshMatch) return meshMatch[1];
    return null;
  }

  static getNamePrefix(name: string): string {
    const parts = name.split('_');
    if (/^\d+$/.test(parts[parts.length - 1])) {
      parts.pop();
    }
    return parts.join('_');
  }

  static isIslandComponent(componentName: string): boolean {
    return componentName.toLowerCase().includes('island');
  }

  static findMatchingComponents(
    component: THREE.Object3D,
    meshNumber: string | null,
    kitchenComponents: THREE.Object3D<THREE.Object3DEventMap>[],
    islandComponents: THREE.Object3D<THREE.Object3DEventMap>[]
  ): THREE.Object3D[] {
    const isIslandComponent = this.isIslandComponent(component.name);
    const isOven1 = component.name === 'Oven001_1';
    const isOven = component.name.includes('Oven001');

    return [...kitchenComponents, ...islandComponents].filter((comp) => {
      const compMatch = comp.name.match(/Mesh(\d{3})/);
      const isCompDishwasher = comp.name.includes('Dishwasher');
      const isCompMicrowave = comp.name.includes('Microwave_Sharp34L001');
      const compIsIsland = this.isIslandComponent(comp.name);
      const shouldMatchIsland = isIslandComponent === compIsIsland;

      const componentPrefix = this.getNamePrefix(component.name);
      const compPrefix = this.getNamePrefix(comp.name);
      const isMatchingName = componentPrefix === compPrefix;

      if (meshNumber) {
        if (isOven1) {
          return comp.name === 'Oven001_1' && shouldMatchIsland;
        } else if (isOven) {
          return (
            comp.name.includes('Oven001') &&
            comp.name !== 'Oven001_1' &&
            shouldMatchIsland
          );
        }

        return (
          (compMatch && compMatch[1] === meshNumber && shouldMatchIsland) ||
          (isCompDishwasher && meshNumber === '016' && shouldMatchIsland) ||
          (isCompMicrowave && meshNumber === '024' && shouldMatchIsland)
        );
      }

      return isMatchingName && shouldMatchIsland;
    });
  }
}
