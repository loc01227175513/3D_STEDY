import * as THREE from 'three';

interface ModelMatcherResult {
  isMatch: boolean;
  matchType: 'mesh' | 'name' | 'special' | null;
}
import { useKitchenStore } from '@/store/useKitchenStore';
export const useModelMatcher = () => {
  const { kitchenWidth } = useKitchenStore();
  const getOvenId = (name: string) => {
    const ovenPattern = /Oven\d{3}_\d+/;
    const match = name.match(ovenPattern);
    return match ? match[0] : null;
  };

  const getNamePrefix = (name: string) => {
    const parts = name.split('_');
    if (/^\d+$/.test(parts[parts.length - 1])) {
      parts.pop();
    }
    return parts.join('_');
  };

  const checkIslandContext = (
    comp: THREE.Object3D,
    highlightedComponent: THREE.Object3D
  ) => {
    const compIsIsland = comp.name.toLowerCase().includes('island');
    const isHighlightedIsland = highlightedComponent.name
      .toLowerCase()
      .includes('island');
    return {
      compIsIsland,
      isHighlightedIsland,
      isSameContext: compIsIsland === isHighlightedIsland,
    };
  };

  const matchByMeshNumber = (
    comp: THREE.Object3D,
    meshNumber: string
  ): boolean => {
    const compMatch = comp.name.match(/Mesh(\d{3})/);
    return !!(compMatch && compMatch[1] === meshNumber && meshNumber !== '015');
  };

  const matchSpecialComponents = (
    comp: THREE.Object3D,
    meshNumber: string,
    highlightedComponent: THREE.Object3D
  ): boolean => {
    const isCompDishwasher = comp.name.includes('Dishwasher');
    const isCompMicrowave = comp.name.includes('Microwave_Sharp34L001');
    const isCompOven = /Oven\d{3}_\d+/.test(comp.name);
    const isHighlightedOven = /Oven\d{3}_\d+/.test(highlightedComponent.name);
    const isSameOven =
      isCompOven &&
      isHighlightedOven &&
      getOvenId(comp.name) === getOvenId(highlightedComponent.name);

    // Xử lý đặc biệt cho Cabinet_Opening và Dishwasher
    const isCompCabinetOpening = comp.name.includes('Cabinet_Opening');
    const isHighlightedCabinetOpening =
      highlightedComponent.name.includes('Cabinet_Opening');
    const isHighlightedDishwasher =
      highlightedComponent.name.includes('Dishwasher');

    // Nếu component hiện tại là Cabinet_Opening và component được highlight là Dishwasher
    // hoặc ngược lại, thì cũng coi như match
    const isCabinetDishwasherPair =
      (isCompCabinetOpening && isHighlightedDishwasher) ||
      (isCompDishwasher && isHighlightedCabinetOpening);

    return (
      (isCompDishwasher && meshNumber === '016') ||
      (meshNumber === '016' && comp.name.match(/Mesh(\d{3})/)?.[1] === '016') ||
      (isCompMicrowave && meshNumber === '024') ||
      (meshNumber === '024' && comp.name.match(/Mesh(\d{3})/)?.[1] === '024') ||
      isSameOven ||
      isCabinetDishwasherPair
    );
  };

  const isInOvenGroup = (name: string) => {
    return name.includes('Cabinet_Oven') || 
           name.includes('Oven001') || 
           /Cabinet_Oven_[1-4]/.test(name) ||
           /Cabinet_Oven001_[1-2]/.test(name);
  };

  const matchByNamePrefix = (
    comp: THREE.Object3D,
    highlightedComponent: THREE.Object3D
  ): boolean => {
    // Special handling for Scene model
    if (comp.name === 'Scene' || highlightedComponent.name === 'Scene') {
      return comp.name === 'Scene' && highlightedComponent.name === 'Scene';
    }

    // Kiểm tra nếu component thuộc nhóm Oven
    if (isInOvenGroup(comp.name) || isInOvenGroup(highlightedComponent.name)) {
      return isInOvenGroup(comp.name) && isInOvenGroup(highlightedComponent.name);
    }

    // Xử lý đặc biệt cho Cabinet_Opening và Dishwasher
    const isCompCabinetOpening1 = comp.name.includes('Cabinet_Opening_1');
    const isCompCabinetOpening2 = comp.name.includes('Cabinet_Opening_2');
    const isCompDishwasher = comp.name.includes('Dishwasher');
    const isHighlightedCabinetOpening1 =
      highlightedComponent.name.includes('Cabinet_Opening_1');
    const isHighlightedCabinetOpening2 =
      highlightedComponent.name.includes('Cabinet_Opening_2');
    const isHighlightedDishwasher =
      highlightedComponent.name.includes('Dishwasher');

    // Xử lý đặc biệt cho Sink_Double_Stand_Alone001 và Cabinet_Sink_Double_Door
    const isCompSink = comp.name.includes('Sink_Double_Stand_Alone');
    const isCompCabinetSink = comp.name.includes('Cabinet_Sink_Double_Door');
    const isHighlightedSink = highlightedComponent.name.includes('Sink_Double_Stand_Alone');
    const isHighlightedCabinetSink = highlightedComponent.name.includes('Cabinet_Sink_Double_Door');

    
    // Kiểm tra path cho sink components
    if ((isCompSink && isHighlightedCabinetSink) || (isHighlightedSink && isCompCabinetSink)) {
      const cabinetComponent = isCompCabinetSink ? comp : highlightedComponent;
      const isNotSpecifiedPath = !cabinetComponent.userData?.path?.includes(
        'Intero/GalleyTemplateA/Components/Island/KitchenIsland_Cabinet_Sink_Double_Door'
      );
      
      if (!isNotSpecifiedPath) {
        return false;
      }
    }
    
    // Kiểm tra nếu component thuộc nhóm Sink hoặc Cabinet Sink
    const isInSinkGroup = (name: string) => {
      return (
        name.includes('Sink_Double_Stand_Alone') ||
        name.includes('Cabinet_Sink_Double_Door')
      );
    };

    // Nếu một trong các component thuộc nhóm Sink
    if (isInSinkGroup(comp.name) || isInSinkGroup(highlightedComponent.name)) {
      return isInSinkGroup(comp.name) && isInSinkGroup(highlightedComponent.name);
    }

    // Kiểm tra nếu component thuộc nhóm Cabinet_Opening hoặc Dishwasher
    const isInGroup = (name: string) => {
      return (
        name.includes('Cabinet_Opening_1') ||
        name.includes('Cabinet_Opening_2') ||
        name.includes('Dishwasher')
      );
    };

    // Nếu một trong các component thuộc nhóm
    if (isInGroup(comp.name) || isInGroup(highlightedComponent.name)) {
      // Cho phép match giữa bất kỳ component nào trong nhóm
      return isInGroup(comp.name) && isInGroup(highlightedComponent.name);
    }

    // Xử lý các trường hợp thông thường
    const compPrefix = getNamePrefix(comp.name);
    const highlightedPrefix = getNamePrefix(highlightedComponent.name);
    return compPrefix === highlightedPrefix && compPrefix !== '';
  };

  const matchComponent = (
    comp: THREE.Object3D,
    highlightedComponent: THREE.Object3D,
    meshNumber: string | null,
    componentName?: string
  ): ModelMatcherResult => {
    // Kiểm tra các components đặc biệt không được remove
    const specialComponents = [
      'Cabinet_Microwave_2',
      'Cabinet_Opening_2',
      // 'Cabinet_Sink_Double_Door_2',
      'Cabinet_Four_Drawer_2',
    ];

    if (specialComponents.includes(comp.name)) {
      return { isMatch: false, matchType: null };
    }

    const { compIsIsland, isSameContext } = checkIslandContext(
      comp,
      highlightedComponent
    );

    // Kiểm tra nếu là Cabinet_Opening thì match với Dishwasher
    if (
      (highlightedComponent.name.includes('Cabinet_Opening') &&
        comp.name.includes('Dishwasher')) ||
      (highlightedComponent.name.includes('Dishwasher') &&
        comp.name.includes('Cabinet_Opening'))
    ) {
      return { isMatch: true, matchType: 'special' };
    }

    // Xử lý đặc biệt cho Oven001_1
    if (highlightedComponent.name === 'Cabinet_Oven001') {
      return {
        isMatch: comp.name === 'Oven001_1' && isSameContext,
        matchType: comp.name === 'Oven001_1' ? 'special' : null,
      };
    }

    if (meshNumber) {
      //check mesh number trùng với highlighted component
      if (matchByMeshNumber(comp, meshNumber) && isSameContext) {
        return { isMatch: true, matchType: 'mesh' };
      }
      if (
        //check mesh number trùng với highlighted component và không phải là island
        matchSpecialComponents(comp, meshNumber, highlightedComponent) &&
        !compIsIsland
      ) {
        return { isMatch: true, matchType: 'special' };
      }
    }

    // Kiểm tra trùng tên component
    if (componentName && comp.name === componentName && isSameContext) {
      return { isMatch: true, matchType: 'name' };
    }

    // Kiểm tra trùng namePrefix
    if (matchByNamePrefix(comp, highlightedComponent) && isSameContext) {
      return { isMatch: true, matchType: 'name' };
    }

    return { isMatch: false, matchType: null };
  };

  return {
    matchComponent,
    getNamePrefix,
    checkIslandContext,
    matchByNamePrefix,
  };
};
