import * as THREE from 'three';
import { MODEL_CATEGORIES } from '../../../constants/templateConstants';

interface CategoryInfo {
  categories: string[];
}

export class CategoryManager {
  static getCategoryInfo(
    meshNumber: string | null,
    targetComponent: THREE.Object3D,
    isOven1: boolean,
    isIsland: boolean = false
  ): CategoryInfo {
    if (meshNumber) {
      if (isOven1) {
        return {
          categories: ['kitchen-wall'],
        };
      }
      const category =
        MODEL_CATEGORIES[meshNumber as keyof typeof MODEL_CATEGORIES];
      // Convert the category to string array, handling both string and array cases
      const categories =
        typeof category === 'string' ? [category] : [...category];
      return { categories };
    }

    const name = targetComponent.name.toLowerCase();
    const nameParts = name.split('_');
    const mainType = nameParts[0];
    const subType = nameParts.length > 1 ? nameParts[1] : null;

    // Xử lý cho Cabinet_Oven
    if (mainType === 'cabinet' && subType === 'oven') {
      // Check if it's specifically Cabinet_Oven001
      if (
        targetComponent.name.includes('Cabinet_Oven001') ||
        targetComponent.name.includes('Cabinet_Oven_1') ||
        targetComponent.name.includes('Cabinet_Oven_3') ||
        targetComponent.name.includes('Cabinet_Oven001_2')||
        targetComponent.name.includes('Cabinet_Oven')
        
      ) {
        return {
          categories: ['kitchen-oven'],
        };
      }
      return {
        categories: ['kitchen-oven'],
      };
    }

    // Xử lý cho CookTop_60cm
    if (mainType === 'cooktop' && subType === '60cm') {
      return {
        categories: ['kitchen-cooktop'],
      };
    }

    // Xử lý cho Cabinet_High
    if (mainType === 'cabinet' && subType === 'high') {
      return {
        categories: ['kitchen-tallcabinet'],
      };
    }
    if (mainType === 'Luxury' && subType === 'high') {
     return {
        categories: ['kitchen-tallcabinet'],
      };
    } 
    if (mainType === 'scene') {
      return {
        categories: ['floor', 'kitchen', 'island'],
      };
    }

    // Xử lý cho Bar_R và Bar_L
    // if (mainType === 'bar' && (subType === 'r' || subType === 'l')) {
    //   return {
    //     categories: ['island-bar'],
    //   };
    // }

    // Xử lý cho Divider001
    // if (mainType === 'divider001' ||
    //     mainType === 'left' && subType === 'panel' ||
    //     mainType === 'right' && subType === 'panel' ||
    //     targetComponent.name === 'Cabinet_Wall_R' ||
    //     targetComponent.name === 'Cabinet_Wall_R_1') {
    //   return {
    //     categories: ['kitchen-panel'],
    //   };
    // }

    // Xử lý cho Back_Wall
    // if (mainType === 'back' && (subType === 'wall' || subType === 'wall001' || subType === 'wall002' || subType === 'wall_left' || subType === 'wall_right')) {
    //   return {
    //     categories: ['kitchen-wall'],
    //   };
    // }

    // Xử lý cho Rangehood
    // if (mainType === 'rangehood') {
    //   return {
    //     categories: ['kitchen-rangehood'],
    //   };
    // }

    // Xử lý cho Back_splash
    // if (mainType === 'back' && subType === 'splash') {
    //   return {
    //     categories: ['kitchen-backsplash'],
    //   };
    // }

    // Xử lý cho Shelf và Cabinet
    // Xử lý cho Shelf low
    if (mainType === 'shelf' && subType === 'low') {
      return {
        categories: ['kitchen-fridgecabinet'],
      };
    }

    // Xử lý cho Shelf high
    if (mainType === 'shelf' && subType === 'high') {
      // Kiểm tra nếu là Shelf_High_Double_Door
      if (targetComponent.name.toLowerCase().includes('double_door')) {
        return {
          categories: ['kitchen-cupboard', 'kitchen-rangehood'],
        };
      }
      return {
        categories: ['kitchen-cupboard'],
      };
    }

    // Xử lý cho Cabinet single
    if (mainType === 'cabinet' && subType === 'single') {
      return {
        categories: ['kitchen-cabinet'],
      };
    }

    // Xử lý cho các loại Cabinet đặc biệt
    if (
      mainType === 'cabinet' &&
      (subType === 'microwave' ||
        subType === 'opening' ||
        subType === 'sink' ||
        subType === 'four')
    ) {
      return {
        categories: ['island-cabinet'],
      };
    }

    if (targetComponent.name.includes('Luxury_Cabinet1_High') || targetComponent.name.includes('Luxury_Cabinet1_High_1') ) {
      return {
        categories: ['kitchen-tallcabinet'],
      };
    }

    if (targetComponent.name.includes('Luxury_Shelf1_High_Double_Door') || targetComponent.name.includes('Luxury_Shelf1_High_Single_Door_L') || targetComponent.name.includes('Luxury_Shelf1_High_Single_Door')  || targetComponent.name.includes('rangehood')  ) {
      return {
        categories: ['kitchen-cupboard','kitchen-rangehood'],
      };
    }

    if (targetComponent.name.includes('Luxury_Cabinet1_Single_Door')) {
      return {
        categories: ['kitchen-cabinet'],
      };
    }

    if (targetComponent.name.includes('Luxury_Shelf1_Low_Double_Door')) {
      return {
        categories: ['kitchen-fridgecabinet'],
      };
    }

    let category = subType || mainType;
    return { categories: [category] };
  }
}
