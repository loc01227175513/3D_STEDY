import * as THREE from 'three';
import { emitter, THREE_EVENTS } from '@/utils/events';
import { KitchenTemplateEntity, ProductEntity } from '@/types/model';
import { ChoseModelShowCategory } from '@/store/ShowCategoryModel';
import { ComponentIdentifier } from '../identifier/ComponentIdentifier';

export class EventManager {
  static emitEvents(
    categories: string[] | null,
    meshNumber: string | null,
    targetComponent: THREE.Object3D,
    matchingComponents: THREE.Object3D[],
    replacedModel: THREE.Object3D | undefined,
    template: KitchenTemplateEntity,
    isIslandComponent: boolean,
    kitchenComponents: THREE.Object3D<THREE.Object3DEventMap>[]
  ) {
    if (!categories || categories.length === 0) return;

    ChoseModelShowCategory.getState().toggleModel(categories);

    const currentProduct = template.products.find((p) =>
      meshNumber
        ? p.position === meshNumber
        : targetComponent.name === 'Scene' 
          ? categories.some(cat => cat === 'floor')  // Special handling for Scene
          : categories.some(cat => p.categoryId === cat?.replace('_model', ''))
    );

    if (template.products && template.products.length > 0) {
      emitter.emit(THREE_EVENTS.onTemplateDidLoad, {
        products: template.products,
      });
    }

    // Emit highlight event trước khi emit model clicked
    if (targetComponent && targetComponent.name) {
      emitter.emit(THREE_EVENTS.HIGHLIGHT_COMPONENT_CATEGORY, {
        componentName: targetComponent.name
      });
    }

    emitter.emit(THREE_EVENTS.onModelClicked, {
      categories,
      component: targetComponent,
      highlightedComponents: [...matchingComponents, replacedModel].filter(
        Boolean
      ),
      isReady: true,
      currentProduct: currentProduct,
      isIslandComponent,
      kitchenComponents,
      componentName: ComponentIdentifier.getNamePrefix(targetComponent.name),
      matchingComponents: matchingComponents,
    });
  }
}
