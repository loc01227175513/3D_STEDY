import { drawerStore } from '@/store';
import { ISLAND_Z, MODEL_CATEGORIES, determineCategory } from '../../constants/templateConstants';
import * as THREE from 'three';
import { useEffect, useMemo } from 'react';
import { emitter, THREE_EVENTS } from '@/utils/events';
interface IslandComponentsProps {
  islandComponents: THREE.Object3D<THREE.Object3DEventMap>[];
  replacedModels: Map<string, THREE.Object3D>;
  onComponentClick: (component: THREE.Object3D) => void;
  isReplacing: boolean;
  highlightedMeshNumber: string | null;
}

export const IslandComponents = ({
  islandComponents,
  replacedModels,
  onComponentClick,
  isReplacing,
  highlightedMeshNumber,
}: IslandComponentsProps) => {
  const { openHandleDrawer } = drawerStore();

  useEffect(() => {
    // Cleanup old events
    emitter.removeAllListeners(THREE_EVENTS.COMPONENT_NAME_ISLAND);
    emitter.removeAllListeners(THREE_EVENTS.REQUEST_ISLAND_COMPONENTS);
    
    // Emit events immediately
    const emitComponentEvents = () => {
      const uniqueComponents = new Set();
      islandComponents.forEach((component) => {
        if (!uniqueComponents.has(component.name)) {
          uniqueComponents.add(component.name);
          emitter.emit(THREE_EVENTS.COMPONENT_NAME_ISLAND, {
            name: component.name
          });
        }
      });
    };

    // Lắng nghe yêu cầu danh sách components
    emitter.on(THREE_EVENTS.REQUEST_ISLAND_COMPONENTS, emitComponentEvents);

    // Cleanup on unmount
    return () => {
      emitter.removeAllListeners(THREE_EVENTS.COMPONENT_NAME_ISLAND);
      emitter.removeAllListeners(THREE_EVENTS.REQUEST_ISLAND_COMPONENTS);
    };
  }, [islandComponents]);

  const renderedComponents = useMemo(() => {
    return islandComponents.map((component, index) => {
      const meshMatch = component.name.match(/Mesh(\d{3})/);
      const meshNumber = meshMatch ? meshMatch[1] : null;
      const replacedModel = meshNumber ? replacedModels.get(meshNumber) : null;
      const modelToRender = replacedModel || component;

      return (
        <group key={`island-${meshNumber || index}`}>
          <primitive
            castShadow
            receiveShadow
            object={modelToRender}
            onClick={(e: React.MouseEvent) => {
              if (isReplacing) return;
              e.stopPropagation();
              openHandleDrawer();
              onComponentClick(modelToRender);
            }}
            scale={1.5}
            position={[modelToRender.position.x, modelToRender.position.y, ISLAND_Z]}
          />
        </group>
      );
    });
  }, [islandComponents, replacedModels, isReplacing, onComponentClick, openHandleDrawer]);

  return <>{renderedComponents}</>;
};
