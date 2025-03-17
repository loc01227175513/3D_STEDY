import { ProductEntity } from '@/types/model';
import { useState, useEffect } from 'react';
import { emitter, THREE_EVENTS } from '@/utils/events';
import * as THREE from 'three';
import { useMeshProductStore } from '@/store/useMeshProductStore';

export interface UpdateMappingPayload {
  componentType: string;
  productName: string;
  replacedProduct: ProductEntity;
  mesh: THREE.Mesh;
}

export const useSpecialComponentMatching = () => {
  const { updateMapping, normalizeComponentName, findMatchingProduct } = useMeshProductStore();

  useEffect(() => {
    const handleUpdateMapping = (payload: UpdateMappingPayload) => {
      const { componentType, productName, replacedProduct, mesh } = payload;

      try {
        const normalizedProductName = normalizeComponentName(productName);
        
        try {
          updateMapping(componentType, normalizedProductName);
          
          // Store replacement info in mesh's userData
          if (!mesh.userData) mesh.userData = {};
          mesh.userData.replacementInfo = {
            productName: normalizedProductName,
            replacedProduct: replacedProduct,
            componentType: componentType
          };
          
        } catch (error) {
          console.error('Error updating meshProductMapping:', error);
        }

      } catch (error) {
        console.error('Error in updateDynamicMapping:', error);
      }
    };

    emitter.on(THREE_EVENTS.updateMapping, handleUpdateMapping);
    return () => {
      emitter.off(THREE_EVENTS.updateMapping, handleUpdateMapping);
    };
  }, [updateMapping, normalizeComponentName]);

  const updateDynamicMapping = (
    componentType: string, 
    productName: string, 
    replacedProduct: ProductEntity,
    mesh: THREE.Mesh
  ) => {
    emitter.emit(THREE_EVENTS.updateMapping, {
      componentType,
      productName,
      replacedProduct,
      mesh
    });
  };

  return {
    findMatchingProduct,
    normalizeComponentName,
    updateDynamicMapping
  };
}; 