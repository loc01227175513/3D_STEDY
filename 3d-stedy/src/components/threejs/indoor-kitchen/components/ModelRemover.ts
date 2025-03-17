import * as THREE from 'three';
import { useMaterial } from '../../hooks/useMaterial';
import { useModelMatcher } from './ModelMatcher';

export const useModelRemover = () => {
  const { highlightScene } = useMaterial();
  const { matchComponent, matchByNamePrefix } = useModelMatcher();

  const handleRangehoodComponentRemoval = (
    allComponents: THREE.Object3D<THREE.Object3DEventMap>[],
    highlightedComponent: THREE.Object3D
  ) => {
    if (highlightedComponent.name.includes('Shelf_High_Double_Door')) {
      const rangehoodComponents = allComponents.filter(
        (comp) =>
          comp.name === 'Rangehood_Inalto_120cm' ||
          comp.name === 'Rangehood_Inalto_120cm_1' ||
          comp.name === 'Rangehood_Inalto_120cm_2' ||
          comp.userData?.originalComponent === 'Rangehood_Inalto_120cm' ||
          comp.userData?.originalComponent === 'Rangehood_Inalto_120cm_1' ||
          comp.userData?.originalComponent === 'Rangehood_Inalto_120cm_2'
      );

      rangehoodComponents.forEach((rangehoodComponent) => {
        rangehoodComponent.visible = false;
        rangehoodComponent.userData.isHidden = true;
        // highlightScene(rangehoodComponent as THREE.Group, false);
      });
    }
  };

  const handleSinkComponentRemoval = (
    allComponents: THREE.Object3D<THREE.Object3DEventMap>[],
    highlightedComponent: THREE.Object3D
  ) => {
    // Tìm và ẩn Sink_Double_Stand_Alone_1 khi thay thế Cabinet_Sink_Double_Door
    if (highlightedComponent.name.includes('Cabinet_Sink_Double_Door')) {
      const sinkComponent = allComponents.find(
        (comp) =>
          comp.name === 'Sink_Double_Stand_Alone_1' ||
          comp.name === 'Sink_Double_Stand_Alone001' ||
          comp.userData?.originalComponent === 'Sink_Double_Stand_Alone_1' ||
          comp.userData?.originalComponent === 'Sink_Double_Stand_Alone001'
      );

      if (sinkComponent) {
        sinkComponent.visible = false;
        sinkComponent.userData.isHidden = true;
        // highlightScene(sinkComponent as THREE.Group, false);
      }

      // Tìm và ẩn Cabinet_Sink_Double_Door002
      const sinkDoorComponent = allComponents.find(
        (comp) =>
          comp.name === 'Cabinet_Sink_Double_Door002' ||
          comp.userData?.originalComponent === 'Cabinet_Sink_Double_Door002'
      );

      if (sinkDoorComponent) {
        sinkDoorComponent.visible = false;
        sinkDoorComponent.userData.isHidden = true;
        // highlightScene(sinkDoorComponent as THREE.Group, false);
      }
    }
  };

  const handleOvenComponentRemoval = (
    allComponents: THREE.Object3D<THREE.Object3DEventMap>[],
    highlightedComponent: THREE.Object3D
  ) => {
    // Tìm và ẩn Cabinet_Oven001_1 và Cabinet_Oven001_2 khi thay thế các component liên quan đến lò nướng
    if (highlightedComponent.name.toLowerCase().includes('oven')) {
      const ovenCabinetComponents = allComponents.filter(
        (comp) =>
          comp.name === 'Cabinet_Oven001' ||
          comp.name === 'Cabinet_Oven001_1' ||
          comp.name === 'Cabinet_Oven001_2' ||
          comp.name === 'Cabinet_Oven_1' ||
          comp.name === 'Cabinet_Oven_3' ||
          comp.name === 'Cabinet_Oven_2' ||
          comp.userData?.originalComponent === 'Cabinet_Oven001' ||
          comp.userData?.originalComponent === 'Cabinet_Oven001_1' ||
          comp.userData?.originalComponent === 'Cabinet_Oven001_2' ||
          comp.userData?.originalComponent === 'Cabinet_Oven_1' ||
          comp.userData?.originalComponent === 'Cabinet_Oven_2'
      );

      ovenCabinetComponents.forEach((component) => {
        component.visible = false;
        component.userData.isHidden = true;
        // highlightScene(component as THREE.Group, false);
      });

      // Check if the oven is not from the specified path
      // const isNotSpecifiedPath = !highlightedComponent.userData?.path?.includes(
      //   'Intero/GalleyTemplateA/Components/Kitchen/Kitchen_Oven'
      // );

      // if (isNotSpecifiedPath) {
      //   // Find and hide CookTop_60cm
      //   const cookTopComponent = allComponents.find(
      //     (comp) =>
      //       comp.name === 'CookTop_60cm' ||
      //       comp.userData?.originalComponent === 'CookTop_60cm'
      //   );

      //   if (cookTopComponent) {
      //     cookTopComponent.visible = false;
      //     cookTopComponent.userData.isHidden = true;
      //     // highlightScene(cookTopComponent as THREE.Group, false);
      //   }
      // }
    }
  };

  const removeOldModel = (
    comp: THREE.Object3D<THREE.Object3DEventMap>,
    meshNumber: string | null,
    highlightedComponent: THREE.Object3D,
    componentName?: string,
    allComponents?: THREE.Object3D<THREE.Object3DEventMap>[]
  ) => {
    // Special handling for Scene model
    if (highlightedComponent.name === 'Scene') {
      highlightedComponent.visible = false;
      highlightedComponent.userData.isHidden = true;
      return;
    }

    // Nếu có allComponents, tìm và ẩn tất cả components có cùng prefix
    if (allComponents) {
      // Xử lý đặc biệt cho sink components
      handleSinkComponentRemoval(allComponents, highlightedComponent);
      // Xử lý đặc biệt cho oven components
      handleOvenComponentRemoval(allComponents, highlightedComponent);
      // Xử lý đặc biệt cho rangehood components
      handleRangehoodComponentRemoval(allComponents, highlightedComponent);

      const componentsToHide = allComponents.filter((c) =>
        matchByNamePrefix(c, highlightedComponent)
      );

      componentsToHide.forEach((c) => {
        // Ẩn component bằng cách set visible = false
        c.visible = false;
        // Đánh dấu component đã bị ẩn
        c.userData.isHidden = true;
        // Vẫn giữ highlight state để có thể khôi phục sau này nếu cần
        // highlightScene(c as THREE.Group, false);
      });
      return;
    }

    // Nếu không có allComponents, xử lý ẩn một component
    const { isMatch } = matchComponent(
      comp,
      highlightedComponent,
      meshNumber,
      componentName
    );

    if (isMatch) {
      // Ẩn component bằng cách set visible = false
      comp.visible = false;
      // Đánh dấu component đã bị ẩn
      comp.userData.isHidden = true;
      // Vẫn giữ highlight state để có thể khôi phục sau này nếu cần
      // highlightScene(comp as THREE.Group, false);
    }
  };

  // Thêm hàm mới để khôi phục model đã ẩn nếu cần
  const restoreHiddenModel = (comp: THREE.Object3D<THREE.Object3DEventMap>) => {
    if (comp.userData.isHidden) {
      comp.visible = true;
      comp.userData.isHidden = false;
    }
  };

  return {
    removeOldModel,
    restoreHiddenModel,
  };
};
