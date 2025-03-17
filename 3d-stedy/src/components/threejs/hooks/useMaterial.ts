import { emitter, THREE_EVENTS } from '@/utils/events';
import * as THREE from 'three';
import { productStore } from '@/store';

// Cache for loaded textures to prevent redundant loading
const textureCache = new Map<string, THREE.Texture>();

// Store original materials to restore after highlight
const originalMaterials = new WeakMap<
  THREE.Object3D,
  THREE.MeshStandardMaterial
>();

// Cache riêng cho kitchen và island
const kitchenTextureCache = new Map<string, THREE.Texture[]>();
const islandTextureCache = new Map<string, THREE.Texture[]>();

export const useMaterial = () => {
  const textureLoader = new THREE.TextureLoader();

  const highlightScene = (scene: THREE.Object3D, highlight: boolean) => {
    scene.traverse((child: any) => {
      if (child instanceof THREE.Mesh) {
        if (highlight) {
          // Store original material if not already stored
          if (!originalMaterials.has(child)) {
            originalMaterials.set(child, child.material);
          }
          // Clone the material for highlighting but keep original texture
          const highlightMaterial = new THREE.MeshStandardMaterial();
          const originalMaterial = originalMaterials.get(child);

          // Copy properties from original material
          if (originalMaterial) {
            highlightMaterial.map = originalMaterial.map;
            highlightMaterial.normalMap = originalMaterial.normalMap;
            highlightMaterial.roughnessMap = originalMaterial.roughnessMap;
            highlightMaterial.metalnessMap = originalMaterial.metalnessMap;
            highlightMaterial.alphaMap = originalMaterial.alphaMap;
            highlightMaterial.aoMap = originalMaterial.aoMap;
            highlightMaterial.emissiveMap = originalMaterial.emissiveMap;
            highlightMaterial.name = originalMaterial.name;
          }

          highlightMaterial.color.set(0xff0000);
          highlightMaterial.emissive.set(0x0000ff);
          highlightMaterial.emissiveIntensity = 0.1;
          child.material = highlightMaterial;
        } else {
          // Restore original material if exists
          const originalMaterial = originalMaterials.get(child);
          if (originalMaterial) {
            child.material = originalMaterial;
            originalMaterials.delete(child);
          }
        }
      }
    });
  };
  const highlightSceneIndoor = (scene: THREE.Object3D, highlight: boolean) => {
    scene.traverse((child: any) => {
      if (child instanceof THREE.Mesh) {
        if (highlight) {
          // Store original material if not already stored
          if (!originalMaterials.has(child)) {
            originalMaterials.set(child, child.material);
          }
          // Clone the material for highlighting but keep original texture
          const highlightMaterial = new THREE.MeshStandardMaterial();
          const originalMaterial = originalMaterials.get(child);

          // Copy properties from original material
          if (originalMaterial) {
            highlightMaterial.map = originalMaterial.map;
            highlightMaterial.normalMap = originalMaterial.normalMap;
            highlightMaterial.roughnessMap = originalMaterial.roughnessMap;
            highlightMaterial.metalnessMap = originalMaterial.metalnessMap;
            highlightMaterial.alphaMap = originalMaterial.alphaMap;
            highlightMaterial.aoMap = originalMaterial.aoMap;
            highlightMaterial.emissiveMap = originalMaterial.emissiveMap;
            highlightMaterial.name = originalMaterial.name;
          }

          highlightMaterial.color.set(0xff0000);
          highlightMaterial.emissive.set(0x0000ff);
          highlightMaterial.emissiveIntensity = 0.1;
          child.material = highlightMaterial;
        } else {
          // Restore original material if exists
          const originalMaterial = originalMaterials.get(child);
          if (originalMaterial) {
            child.material = originalMaterial;
            originalMaterials.delete(child);
          }
        }
      }
    });
  };

  const loadTextureFromCache = async (
    texturePath: string
  ): Promise<THREE.Texture> => {
    if (textureCache.has(texturePath)) {
      return textureCache.get(texturePath)!;
    }

    try {
      const texture = await new Promise<THREE.Texture>((resolve, reject) => {
        textureLoader.load(
          texturePath + `?t=${Date.now()}`,
          (texture) => resolve(texture),
          undefined,
          (error) => reject(error)
        );
      });

      textureCache.set(texturePath, texture);
      return texture;
    } catch (error) {
      throw new Error(`Failed to load texture: ${texturePath}`);
    }
  };

  const loadKitchenTexture = async (
    texturePath: string,
    type: string = 'default',
    normalMapPath?: string,
    occlusionMapPath?: string,
    roughnessMapPath?: string,
    metallicMapPath?: string
  ): Promise<THREE.Texture[]> => {
    const cacheKey = `kitchen_${type}_${texturePath}`;

    if (kitchenTextureCache.has(cacheKey)) {
      return kitchenTextureCache.get(cacheKey)!;
    }

    try {
      const textures: (THREE.Texture | null)[] = await Promise.all([
        new Promise<THREE.Texture>((resolve, reject) => {
          textureLoader.load(
            texturePath + `?t=${Date.now()}`,
            (texture) => resolve(texture),
            undefined,
            (error) => reject(error)
          );
        }),
        normalMapPath ? new Promise<THREE.Texture>((resolve, reject) => {
          textureLoader.load(
            normalMapPath + `?t=${Date.now()}`,
            (texture) => resolve(texture),
            undefined,
            (error) => reject(error)
          );
        }) : Promise.resolve(null),
        occlusionMapPath ? new Promise<THREE.Texture>((resolve, reject) => {
          textureLoader.load(
            occlusionMapPath + `?t=${Date.now()}`,
            (texture) => resolve(texture),
            undefined,
            (error) => reject(error)
          );
        }) : Promise.resolve(null),
        roughnessMapPath ? new Promise<THREE.Texture>((resolve, reject) => {
          textureLoader.load(
            roughnessMapPath + `?t=${Date.now()}`,
            (texture) => resolve(texture),
            undefined,
            (error) => reject(error)
          );
        }) : Promise.resolve(null),
        metallicMapPath ? new Promise<THREE.Texture>((resolve, reject) => {
          textureLoader.load(
            metallicMapPath + `?t=${Date.now()}`,
            (texture) => resolve(texture),
            undefined,
            (error) => reject(error)
          );
        }) : Promise.resolve(null),
      ]);

      const nonNullTextures = textures.filter((texture): texture is THREE.Texture => texture !== null);
      kitchenTextureCache.set(cacheKey, nonNullTextures);
      return nonNullTextures;
    } catch (error) {
      throw new Error(`Failed to load kitchen texture: ${texturePath}`);
    }
  };

  const loadIslandTexture = async (
    texturePath: string,
    type: string = 'default',
    normalMapPath?: string,
    occlusionMapPath?: string,
    roughnessMapPath?: string,
    metallicMapPath?: string
  ): Promise<THREE.Texture[]> => {
    const cacheKey = `island_${type}_${texturePath}`;

    if (islandTextureCache.has(cacheKey)) {
      return islandTextureCache.get(cacheKey)!;
    }

    try {
      const textures: (THREE.Texture | null)[] = await Promise.all([
        new Promise<THREE.Texture>((resolve, reject) => {
          textureLoader.load(
            texturePath + `?t=${Date.now()}`,
            (texture) => resolve(texture),
            undefined,
            (error) => reject(error)
          );
        }),
        normalMapPath ? new Promise<THREE.Texture>((resolve, reject) => {
          textureLoader.load(
            normalMapPath + `?t=${Date.now()}`,
            (texture) => resolve(texture),
            undefined,
            (error) => reject(error)
          );
        }) : Promise.resolve(null),
        occlusionMapPath ? new Promise<THREE.Texture>((resolve, reject) => {
          textureLoader.load(
            occlusionMapPath + `?t=${Date.now()}`,
            (texture) => resolve(texture),
            undefined,
            (error) => reject(error)
          );
        }) : Promise.resolve(null),
        roughnessMapPath ? new Promise<THREE.Texture>((resolve, reject) => {
          textureLoader.load(
            roughnessMapPath + `?t=${Date.now()}`,
            (texture) => resolve(texture),
            undefined,
            (error) => reject(error)
          );
        }) : Promise.resolve(null),
        metallicMapPath ? new Promise<THREE.Texture>((resolve, reject) => {
          textureLoader.load(
            metallicMapPath + `?t=${Date.now()}`,
            (texture) => resolve(texture),
            undefined,
            (error) => reject(error)
          );
        }) : Promise.resolve(null),
      ]);

      const nonNullTextures = textures.filter((texture): texture is THREE.Texture => texture !== null);
      islandTextureCache.set(cacheKey, nonNullTextures);
      return nonNullTextures;
    } catch (error) {
      throw new Error(`Failed to load island texture: ${texturePath}`);
    }
  };

  const handleKitchenMaterial = (
    scene: THREE.Object3D,
    texturePath: string,
    materialType: string,
    updatePromises: Promise<void>[]
  ) => {
    // Get kitchen components
    const kitchenModels: string[] = [];
    emitter.removeAllListeners(THREE_EVENTS.COMPONENT_NAME_KITCHEN);

    const handleKitchenComponent = (data: any) => {
      kitchenModels.push(data.name);
    };

    emitter.on(THREE_EVENTS.COMPONENT_NAME_KITCHEN, handleKitchenComponent);
    emitter.emit(THREE_EVENTS.REQUEST_KITCHEN_COMPONENTS);

    // Wait a bit for components to be collected
    setTimeout(() => {
      scene.traverse((child) => {
        if (child instanceof THREE.Mesh && child.material) {
          const material = child.material as THREE.MeshStandardMaterial;

          if (!kitchenModels.includes(child.name)) return;
          if (!material.name.toLowerCase().includes(materialType.toLowerCase()))
            return;

          const isBenchtopMaterial = materialType
            .toLowerCase()
            .includes('benchtop');
          if (isBenchtopMaterial) {
            const normalMatrix = new THREE.Matrix3().getNormalMatrix(
              child.matrixWorld
            );
            const worldNormal = new THREE.Vector3(0, 1, 0)
              .applyMatrix3(normalMatrix)
              .normalize();
            const upVector = new THREE.Vector3(0, 1, 0);
            const dotProduct = worldNormal.dot(upVector);

            if (dotProduct < 0.7) return;
          }

          if (texturePath.startsWith('http')) {
            updatePromises.push(
              (async () => {
                try {
                  const textures = await loadKitchenTexture(
                    texturePath,
                    materialType,
                    undefined,
                    undefined,
                    undefined,
                    undefined
                  );
                  if (material.map) {
                    material.map.dispose();
                  }
                  material.map = textures[0];

                  textures[0].wrapS = textures[0].wrapT = THREE.RepeatWrapping;
                  textures[0].colorSpace = THREE.SRGBColorSpace;
                  textures[0].generateMipmaps = true;
                  textures[0].minFilter = THREE.LinearMipmapLinearFilter;
                  textures[0].magFilter = THREE.LinearFilter;
                  textures[0].anisotropy = 16;

                  if (isBenchtopMaterial) {
                    textures[0].rotation = 0;
                    textures[0].repeat.set(1, 1);
                    textures[0].center.set(0.5, 0.5);
                    textures[0].offset.set(0, 0);
                    textures[0].flipY = false;

                    material.roughness = 0.5;
                    material.metalness = 0.2;
                    material.envMapIntensity = 1.0;
                  }

                  material.needsUpdate = true;

                  const originalMaterial = originalMaterials.get(child);
                  if (originalMaterial) {
                    if (originalMaterial.map) {
                      originalMaterial.map.dispose();
                    }
                    originalMaterial.map = textures[0].clone();

                    if (isBenchtopMaterial) {
                      originalMaterial.map.rotation = 0;
                      originalMaterial.map.repeat.set(1, 1);
                      originalMaterial.map.center.set(0.5, 0.5);
                      originalMaterial.map.offset.set(0, 0);
                      originalMaterial.map.flipY = false;
                      originalMaterial.map.anisotropy = 16;

                      originalMaterial.roughness = 0.5;
                      originalMaterial.metalness = 0.2;
                      originalMaterial.envMapIntensity = 1.0;
                    }

                    originalMaterial.needsUpdate = true;
                  }
                } catch (error) {
                  console.warn('Failed to update kitchen material:', error);
                }
              })()
            );
          } else {
            material.color.setStyle(texturePath);
            material.needsUpdate = true;
            material.color.convertSRGBToLinear();

            const originalMaterial = originalMaterials.get(child);
            if (originalMaterial) {
              originalMaterial.color.set(texturePath);
              originalMaterial.needsUpdate = true;
              originalMaterial.color.convertSRGBToLinear();
            }
          }
        }
      });
    }, 100);
  };

  const handleIslandMaterial = (
    scene: THREE.Object3D,
    texturePath: string,
    materialType: string,
    updatePromises: Promise<void>[]
  ) => {
    // Get island components
    const islandModels: string[] = [];
    emitter.removeAllListeners(THREE_EVENTS.COMPONENT_NAME_ISLAND);

    const handleIslandComponent = (data: any) => {
      islandModels.push(data.name);
    };

    emitter.on(THREE_EVENTS.COMPONENT_NAME_ISLAND, handleIslandComponent);
    emitter.emit(THREE_EVENTS.REQUEST_ISLAND_COMPONENTS);

    // Wait a bit for components to be collected
    setTimeout(() => {
      scene.traverse((child) => {
        if (child instanceof THREE.Mesh && child.material) {
          const material = child.material as THREE.MeshStandardMaterial;

          if (!islandModels.includes(child.name)) return;
          if (!material.name.toLowerCase().includes(materialType.toLowerCase()))
            return;

          const isBenchtopMaterial = materialType
            .toLowerCase()
            .includes('benchtop');
          if (isBenchtopMaterial) {
            const normalMatrix = new THREE.Matrix3().getNormalMatrix(
              child.matrixWorld
            );
            const worldNormal = new THREE.Vector3(0, 1, 0)
              .applyMatrix3(normalMatrix)
              .normalize();
            const upVector = new THREE.Vector3(0, 1, 0);
            const dotProduct = worldNormal.dot(upVector);

            if (dotProduct < 0.7) return;
          }

          // Store original material for kitchen if not already stored
          if (islandModels.includes(child.name)) {
            const originalMaterial = originalMaterials.get(child);
            if (!originalMaterial) {
              originalMaterials.set(child, material);
            }
          }

          // Handle island material change
          if (texturePath.startsWith('http')) {
            updatePromises.push(
              (async () => {
                try {
                  const textures = await loadIslandTexture(
                    texturePath,
                    materialType,
                    undefined,
                    undefined,
                    undefined,
                    undefined
                  );
                  if (material.map) {
                    material.map.dispose();
                  }
                  material.map = textures[0];

                  textures[0].wrapS = textures[0].wrapT = THREE.RepeatWrapping;
                  textures[0].colorSpace = THREE.SRGBColorSpace;
                  textures[0].generateMipmaps = true;
                  textures[0].minFilter = THREE.LinearMipmapLinearFilter;
                  textures[0].magFilter = THREE.LinearFilter;
                  textures[0].anisotropy = 16;

                  if (isBenchtopMaterial) {
                    textures[0].rotation = 0;
                    textures[0].repeat.set(1, 1);
                    textures[0].center.set(0.5, 0.5);
                    textures[0].offset.set(0, 0);
                    textures[0].flipY = false;

                    material.roughness = 0.5;
                    material.metalness = 0.2;
                    material.envMapIntensity = 1.0;
                  }

                  material.needsUpdate = true;

                  const originalMaterial = originalMaterials.get(child);
                  if (originalMaterial) {
                    if (originalMaterial.map) {
                      originalMaterial.map.dispose();
                    }
                    originalMaterial.map = textures[0].clone();

                    if (isBenchtopMaterial) {
                      originalMaterial.map.rotation = 0;
                      originalMaterial.map.repeat.set(1, 1);
                      originalMaterial.map.center.set(0.5, 0.5);
                      originalMaterial.map.offset.set(0, 0);
                      originalMaterial.map.flipY = false;
                      originalMaterial.map.anisotropy = 16;

                      originalMaterial.roughness = 0.5;
                      originalMaterial.metalness = 0.2;
                      originalMaterial.envMapIntensity = 1.0;
                    }

                    originalMaterial.needsUpdate = true;
                  }
                } catch (error) {
                  console.warn('Failed to update island material:', error);
                }
              })()
            );
          } else {
            // Restore original material for kitchen if switching back
            if (originalMaterials.has(child)) {
              const originalMaterial = originalMaterials.get(child);
              if (originalMaterial) {
                material.copy(originalMaterial);
                originalMaterials.delete(child);
              }
            } else {
              // If no original material, store the current material as original
              originalMaterials.set(child, material);
            }
            material.color.setStyle(texturePath);
            material.needsUpdate = true;
            material.color.convertSRGBToLinear();
          }
        }
      });
    }, 100);
  };

  const handleFloorMaterial = (
    scene: THREE.Object3D,
    texturePath: string,
    updatePromises: Promise<void>[]
  ) => {
    // Get floor components
    const floorModels: string[] = [];
    emitter.removeAllListeners(THREE_EVENTS.COMPONENT_NAME_FLOOR);

    const handleFloorComponent = (data: any) => {
      floorModels.push(data.name);
    };

    emitter.on(THREE_EVENTS.COMPONENT_NAME_FLOOR, handleFloorComponent);
    emitter.emit(THREE_EVENTS.REQUEST_FLOOR_COMPONENTS);

    // Wait a bit for components to be collected
    setTimeout(() => {
      scene.traverse((child) => {
        if (child instanceof THREE.Mesh && child.material) {
          const material = child.material as THREE.MeshStandardMaterial;
          if (!floorModels.includes(child.name)) return;

          if (texturePath.startsWith('http')) {
            updatePromises.push(
              (async () => {
                try {
                  const texture = await loadTextureFromCache(texturePath);
                  if (material.map) {
                    material.map.dispose();
                  }
                  material.map = texture;

                  texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
                  texture.repeat.set(2, 2);
                  texture.colorSpace = THREE.SRGBColorSpace;
                  texture.generateMipmaps = true;
                  texture.minFilter = THREE.LinearMipmapLinearFilter;
                  texture.magFilter = THREE.LinearFilter;

                  material.needsUpdate = true;

                  const originalMaterial = originalMaterials.get(child);
                  if (originalMaterial) {
                    if (originalMaterial.map) {
                      originalMaterial.map.dispose();
                    }
                    originalMaterial.map = texture.clone();
                    originalMaterial.map.wrapS = originalMaterial.map.wrapT =
                      THREE.RepeatWrapping;
                    originalMaterial.map.repeat.set(2, 2);
                    originalMaterial.needsUpdate = true;
                  }
                } catch (error) {
                  console.warn('Failed to update floor material:', error);
                }
              })()
            );
          }
        }
      });
    }, 100);
  };

  const handleBackwallMaterial = (
    scene: THREE.Object3D,
    texturePath: string,
    materialType: string,
    updatePromises: Promise<void>[]
  ) => {
    const backwallNames = [
      'Back_Wall_Left',
      'Back_Wall',
      'Back_Wall001',
      'Back_Wall002',
      'Back_Wall_Right',
    ];

    scene.traverse((child) => {
      if (child instanceof THREE.Mesh && child.material) {
        const material = child.material as THREE.MeshStandardMaterial;
        if (!backwallNames.includes(child.name)) return;

        if (texturePath.startsWith('http')) {
          updatePromises.push(
            (async () => {
              try {
                const texture = await loadTextureFromCache(texturePath);
                if (material.map) {
                  material.map.dispose();
                }
                material.map = texture;

                texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
                texture.colorSpace = THREE.SRGBColorSpace;
                texture.generateMipmaps = true;
                texture.minFilter = THREE.LinearMipmapLinearFilter;
                texture.magFilter = THREE.LinearFilter;
                texture.anisotropy = 16;

                material.needsUpdate = true;

                const originalMaterial = originalMaterials.get(child);
                if (originalMaterial) {
                  if (originalMaterial.map) {
                    originalMaterial.map.dispose();
                  }
                  originalMaterial.map = texture.clone();
                  originalMaterial.needsUpdate = true;
                }
              } catch (error) {
                console.warn('Failed to update backwall material:', error);
              }
            })()
          );
        }
      }
    });
  };

  const changeMaterialForScene = async (
    scene: THREE.Object3D,
    materialName: string,
    texturePath: string,
    selectedComponent?: THREE.Object3D | null
  ) => {
    const updatePromises: Promise<void>[] = [];

    scene.traverse((child) => {
      if (child instanceof THREE.Mesh && child.material) {
        const material = child.material as THREE.MeshStandardMaterial;

        // Skip if not selected component when one is specified
        if (selectedComponent && child !== selectedComponent) return;

        // Check if this is a benchtop material
        const isBenchtopMaterial = materialName
          .toLowerCase()
          .includes('benchtop');

        // For benchtop materials, check if the surface is facing upward
        if (isBenchtopMaterial) {
          // Get the normal vector of the face
          const normalMatrix = new THREE.Matrix3().getNormalMatrix(
            child.matrixWorld
          );
          const worldNormal = new THREE.Vector3(0, 1, 0)
            .applyMatrix3(normalMatrix)
            .normalize();

          // Check if the surface is mostly facing upward (dot product with up vector)
          const upVector = new THREE.Vector3(0, 1, 0);
          const dotProduct = worldNormal.dot(upVector);

          // If not facing upward enough, skip this mesh for benchtop materials
          if (dotProduct < 0.7) {
            // Threshold for considering a surface "upward-facing"
            return;
          }
        }

        // Apply material to all meshes that match the material name pattern
        if (material.name.toLowerCase().includes(materialName.toLowerCase())) {
          if (texturePath.startsWith('http')) {
            updatePromises.push(
              (async () => {
                try {
                  const texture = await loadTextureFromCache(texturePath);
                  if (material.map) {
                    material.map.dispose();
                  }
                  material.map = texture;
                  // For benchtop textures, adjust UV mapping to be top-down
                  if (isBenchtopMaterial) {
                    texture.rotation = 0;
                    texture.repeat.set(1, 1);
                    texture.center.set(0.5, 0.5);
                  }
                  material.needsUpdate = true;

                  // Update original material if this object is highlighted
                  const originalMaterial = originalMaterials.get(child);
                  if (originalMaterial) {
                    if (originalMaterial.map) {
                      originalMaterial.map.dispose();
                    }
                    originalMaterial.map = texture.clone();
                    if (isBenchtopMaterial) {
                      originalMaterial.map.rotation = 0;
                      originalMaterial.map.repeat.set(1, 1);
                      originalMaterial.map.center.set(0.5, 0.5);
                    }
                    originalMaterial.needsUpdate = true;
                  }
                } catch (error) {
                  console.warn(`Failed to update material: ${error}`);
                }
              })()
            );
          } else {
            material.color.set(texturePath);
            material.needsUpdate = true;
            material.color.convertSRGBToLinear();

            // Update original material if this object is highlighted
            const originalMaterial = originalMaterials.get(child);
            if (originalMaterial) {
              originalMaterial.color.set(texturePath);
              originalMaterial.needsUpdate = true;
              originalMaterial.color.convertSRGBToLinear();
            }
          }
        }
      }
    });

    await Promise.all(updatePromises);
  };

  const changeMaterialForScene2Value = async (
    scene: THREE.Object3D,
    materialType: string,
    texturePath: string,
    selectedComponent?: THREE.Object3D | null
  ) => {
    const updatePromises: Promise<void>[] = [];

    // Lấy state từ store để xác định màu sắc và type
    const { islandType } = productStore.getState();

    const handleMaterialChange = () => {
      // Xác định loại component đang thay đổi
      if (materialType.toLowerCase() === 'floor_tiles') {
        handleFloorMaterial(scene, texturePath, updatePromises);
        return;
      }

      if (materialType.toLowerCase() === 'backwall') {
        handleBackwallMaterial(
          scene,
          texturePath,
          materialType,
          updatePromises
        );
        return;
      }

      // Xử lý kitchen và island dựa theo state
      if (islandType === 'kitchen') {
        handleKitchenMaterial(scene, texturePath, materialType, updatePromises);
      } else if (islandType === 'island') {
        handleIslandMaterial(scene, texturePath, materialType, updatePromises);
      }
    };

    handleMaterialChange();
    await Promise.all(updatePromises);
  };

  const changeMaterialForModules = async (
    kitchenModuleRefs: any,
    name: string,
    texture: string,
    selectedComponent?: THREE.Object3D | null
  ) => {
    if (!kitchenModuleRefs?.current) return;

    const promises = kitchenModuleRefs.current.map(async (ref: any) => {
      const scene = ref.current?.scene;
      if (!scene) return;

      await changeMaterialForScene(scene, name, texture, selectedComponent);
    });

    await Promise.all(promises);
  };

  const cleanupTextures = () => {
    textureCache.forEach((texture) => {
      texture.dispose();
    });
    textureCache.clear();

    kitchenTextureCache.forEach((textures) => {
      textures.forEach((texture) => {
        texture.dispose();
      });
    });
    kitchenTextureCache.clear();

    islandTextureCache.forEach((textures) => {
      textures.forEach((texture) => {
        texture.dispose();
      });
    });
    islandTextureCache.clear();
  };

  return {
    highlightScene,
    highlightSceneIndoor,
    changeMaterialForScene,
    changeMaterialForModules,
    changeMaterialForScene2Value,
    cleanupTextures,
  };
};
