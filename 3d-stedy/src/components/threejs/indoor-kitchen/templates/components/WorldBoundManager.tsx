import { useEffect } from 'react';
import * as THREE from 'three';
import { KitchenTemplateEntity, WorldBound } from '@/types/model';
import { ISLAND_Z } from '../../constants/templateConstants';
import { emitter, THREE_EVENTS } from '@/utils/events';

interface WorldBoundManagerProps {
  kitchenScene: THREE.Scene | THREE.Group;
  islandScene?: THREE.Scene | THREE.Group;
  floorScene?: THREE.Scene | THREE.Group;
  template: KitchenTemplateEntity;
  onBoundUpdate: (bound: WorldBound) => void;
}

export const WorldBoundManager = ({
  kitchenScene,
  islandScene,
  floorScene,
  template,
  onBoundUpdate,
}: WorldBoundManagerProps) => {
  useEffect(() => {
    if (!kitchenScene || (template.islandPath && !islandScene)) return;

    const kitchenSize = new THREE.Box3()
      .setFromObject(kitchenScene)
      .getSize(new THREE.Vector3());

    const kitchenBound: WorldBound = {
      xMin: -kitchenSize.x / 2,
      xMax: kitchenSize.x / 2,
      zMin: 0,
      zMax: kitchenSize.z,
      yMin: 0,
      yMax: kitchenSize.y,
    };

    if (islandScene) {
      const islandSize = new THREE.Box3()
        .setFromObject(islandScene)
        .getSize(new THREE.Vector3());
      kitchenBound.zMax += ISLAND_Z + islandSize.z;
    }

    onBoundUpdate(kitchenBound);

    // Emit template load event with products and calculate total price
    if (template.products && template.products.length > 0) {
      // Calculate total price
      const totalPrice = template.products.reduce((sum, product) => {
        return sum + (product.price || 0);
      }, 0);

      // Update products in store with prices
      const productsWithPrices = template.products.map((product) => ({
        ...product,
        price: product.price || 0,
      }));

      emitter.emit(THREE_EVENTS.onTemplateDidLoad, {
        products: productsWithPrices,
        totalPrice: totalPrice,
      });
    }
  }, [kitchenScene, islandScene, template.products]);

  return null;
};
