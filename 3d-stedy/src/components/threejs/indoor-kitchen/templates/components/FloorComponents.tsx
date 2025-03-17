import { drawerStore } from '@/store';
import { memo, useEffect } from 'react';
import * as THREE from 'three';
import { emitter, THREE_EVENTS } from '@/utils/events';
import { useKitchenStore } from '@/store/useKitchenStore';
interface FloorComponentsProps {
  floorComponents: THREE.Object3D[];
  onComponentClick?: (component: THREE.Object3D) => void;
  isReplacing?: boolean;
  highlightedMeshNumber?: string | null;
  replacedModels?: Map<string, THREE.Object3D>;
}

export const FloorComponents = memo(({ 
  floorComponents,
  onComponentClick,
  isReplacing,
  highlightedMeshNumber,
  replacedModels 
}: FloorComponentsProps) => {
  const { openHandleDrawer } = drawerStore();
const {kitchenWidth} = useKitchenStore();
  useEffect(() => {
    // Cleanup old events
    emitter.removeAllListeners(THREE_EVENTS.COMPONENT_NAME_FLOOR);
    emitter.removeAllListeners(THREE_EVENTS.REQUEST_FLOOR_COMPONENTS);
    
    // Emit floor component events
    const emitComponentEvents = () => {
      const uniqueComponents = new Set();
      floorComponents.forEach((component) => {
        if (!uniqueComponents.has(component.name)) {
          uniqueComponents.add(component.name);
          emitter.emit(THREE_EVENTS.COMPONENT_NAME_FLOOR, {
            name: component.name
          });
        }
        
        // Also traverse child meshes to register them
        component.traverse((child) => {
          if (child instanceof THREE.Mesh && !uniqueComponents.has(child.name)) {
            uniqueComponents.add(child.name);
            emitter.emit(THREE_EVENTS.COMPONENT_NAME_FLOOR, {
              name: child.name
            });
          }
        });
      });
    };

    // Listen for floor component requests
    emitter.on(THREE_EVENTS.REQUEST_FLOOR_COMPONENTS, emitComponentEvents);
    
    // Emit initial events
    emitComponentEvents();

    // Cleanup on unmount
    return () => {
      emitter.removeAllListeners(THREE_EVENTS.COMPONENT_NAME_FLOOR);
      emitter.removeAllListeners(THREE_EVENTS.REQUEST_FLOOR_COMPONENTS);
    };
  }, [floorComponents]);

  return (
    <group>
      {floorComponents.map((component, index) => {
        // Apply shadows and configure material
        component.traverse((child) => {
          if (child instanceof THREE.Mesh) {
            child.receiveShadow = true;
            child.castShadow = true;
            if (child.material) {
              const material = child.material as THREE.MeshStandardMaterial;
              material.needsUpdate = true;
            }
          }
        });

        return (
          <primitive 
          castShadow
          receiveShadow
            key={`floor-${index}`} 
            object={component}
            scale={[
              kitchenWidth < 4000 ? 2.6 : 3.6, 
              kitchenWidth < 4000 ? 2 : 2.2, 
              2]}
            position={[0, -0.01, -1]}
 
            onClick={(e: React.MouseEvent) => {
              if (isReplacing) return;
              e.stopPropagation();
              openHandleDrawer();
              onComponentClick?.(component);
            }}
          />
        );
      })}
    </group>
  );
}); 