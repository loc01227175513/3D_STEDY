import { Model } from '@/types/model';
import { useEffect, useState, useMemo } from 'react';
import * as THREE from 'three';
import { useMaterial } from '../../../hooks/useMaterial';
import { determineCategory } from '../../constants/templateConstants';
import { emitter, THREE_EVENTS } from '@/utils/events';
import { drawerStore } from '@/store';
import { useKitchenStore } from '@/store/useKitchenStore';
import { log } from 'node:console';

interface KitchenComponentsProps {
  kitchenComponents: THREE.Object3D<THREE.Object3DEventMap>[];
  onComponentClick: (component: THREE.Object3D) => void;
  isReplacing: boolean;
  highlightedMeshNumber: string | null;
  replacedModels: Map<string, THREE.Object3D>;
}

// Định nghĩa các nhóm component
const COMPONENT_GROUPS = {
  LEFT_SECTION: [
    'Shelf_Low_Double_Door',
    'Shelf_Low_Double_Door_1',
    'Shelf_Low_Double_Door_2',
 
  ],
  CENTER_SECTION: [
    'Cabinet_Single_Door_L',
    'Shelf_High_Single_Door_L',
    'Back_splash_L',
    'Back_splash_Middle',
    'Cabinet_Oven',
    'CookTop_60cm',
    'Shelf_High_Double_Door',
    'Cabinet_Oven001',
    'Rangehood_Inalto_120cm',
    'Cabinet_Single_Door_R',
    'Shelf_High_Single_Door_R',
    'Back_splash_Right',
    'Divider001',
    'Luxury_Cabinet1_High',
    'Luxury_Cabinet1_Single_Door_R',
    'Luxury_Cabinet1_Single_Door_L',
    'Luxury_Shelf1_High_Single_Door',
    'Luxury_Shelf1_High_Double_Door',
    'Luxury_Shelf1_High_Single_Door_L',
    'Luxury_Shelf1_Low_Double_Door',
    'rangehood',
    'Luxury_Shelf1_High_Double_Door'
  ],
  RIGHT_SECTION: [
    // 'Tall Cabinet',
    'Cabinet_High', 
    'Tall_Cabinet_primitive2',
    'Cabinet_Wall_R',  
    'Luxury_CupboardSingleDoor_Right',
    'Luxury_Shelf_High_Single_Door'
  ],
  BACK_WALL_SECTION: [
    'Back_Wall001',
    'Back_Wall_Left',
    'Back_Wall002',
    'Back_Wall_Right',
    // 'Back_Wall',
    'Back_Wall_k',
  
    'Left_Panel',
    'Right_Panel',
  ]
};

export const KitchenComponents = ({
  kitchenComponents,
  onComponentClick,
  isReplacing,
  highlightedMeshNumber,
}: KitchenComponentsProps) => {
  const { openHandleDrawer } = drawerStore();
  const { kitchenWidth  , fridgeCabinetWidth, tallCabinetWidth, kitchenCabinetWidth} = useKitchenStore();
  const width = kitchenWidth / 1000;
  const fridgeCabinetWidthWidth = fridgeCabinetWidth / 1000;
  const tallCabinetWidthWidth = tallCabinetWidth / 1000;
  const kitchenCabinetWidthWidth = kitchenCabinetWidth / 1000;

  // Định nghĩa scale cho từng loại component
  const COMPONENT_SCALES = useMemo(() => ({
    CENTER_SECTION: {
      width: width / 2,
      height: 1.5,
      depth: 1.6
    }
  }), [width, fridgeCabinetWidthWidth, tallCabinetWidthWidth, kitchenCabinetWidthWidth]);

  // Phân loại components theo section
  const groupedComponents = useMemo(() => {
    return {
      leftSection: kitchenComponents.filter(comp => 
        COMPONENT_GROUPS.LEFT_SECTION.some(name => comp.name.includes(name))),
      centerSection: kitchenComponents.filter(comp => 
        COMPONENT_GROUPS.CENTER_SECTION.some(name => comp.name.includes(name))),
      rightSection: kitchenComponents.filter(comp => 
        COMPONENT_GROUPS.RIGHT_SECTION.some(name => comp.name.includes(name))),
      backWallSection: kitchenComponents.filter(comp => 
        COMPONENT_GROUPS.BACK_WALL_SECTION.some(name => comp.name.includes(name)))
    };
  }, [kitchenComponents]);

  // Xác định scale cho component
  const getComponentScale = (component: THREE.Object3D) => {
    return COMPONENT_SCALES.CENTER_SECTION; // use center scale for all components
  };

  useEffect(() => {
    emitter.removeAllListeners(THREE_EVENTS.COMPONENT_NAME_KITCHEN);
    emitter.removeAllListeners(THREE_EVENTS.REQUEST_KITCHEN_COMPONENTS);

    const emitComponentEvents = () => {
      const uniqueComponents = new Set();
      kitchenComponents.forEach((component) => {
        if (!uniqueComponents.has(component.name)) {
          uniqueComponents.add(component.name);
          emitter.emit(THREE_EVENTS.COMPONENT_NAME_KITCHEN, {
            name: component.name,
          });
        }
      });
    };

    emitter.on(THREE_EVENTS.REQUEST_KITCHEN_COMPONENTS, emitComponentEvents);

    return () => {
      emitter.removeAllListeners(THREE_EVENTS.COMPONENT_NAME_KITCHEN);
      emitter.removeAllListeners(THREE_EVENTS.REQUEST_KITCHEN_COMPONENTS);
    };
  }, [kitchenComponents]);

  const renderSection = (components: THREE.Object3D[], sectionName: string) => {
    return components.map((component, index) => {
      const scale = getComponentScale(component);
      const meshMatch = component.name.match(/Mesh(\d{3})/);
      const meshNumber = meshMatch ? meshMatch[1] : null;

      return (
        <primitive
          castShadow
          receiveShadow
          key={`${sectionName}-${index}`}
          object={component}
          scale={[scale.width, scale.height, scale.depth]}
          position={[0, 0, 0]}
          onClick={(e: React.MouseEvent) => {
            if (isReplacing) return;
            e.stopPropagation();
            openHandleDrawer();
            onComponentClick(component);
          }}
        />
      );
    });
  };

  return (
    <>
      <group name="left-section">
        {renderSection(groupedComponents.leftSection, 'left')}
      </group>
      <group name="center-section">
        {renderSection(groupedComponents.centerSection, 'center')}
      </group>
      <group name="right-section">
        {renderSection(groupedComponents.rightSection, 'right')}
      </group>
      <group name="back-wall-section" >
        {renderSection(groupedComponents.backWallSection, 'back-wall')}
      </group>
    </>
  );
};
