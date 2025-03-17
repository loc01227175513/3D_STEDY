import { useEffect } from 'react';
import * as THREE from 'three';
import { KitchenTemplateEntity } from '@/types/model';
import { HighlightManager } from './highlight/HighlightManager';
import { ComponentIdentifier } from './identifier/ComponentIdentifier';
import { CategoryManager } from './category/CategoryManager';
import { EventManager } from './events/EventManager';
import { emitter, THREE_EVENTS } from '@/utils/events';
import {
  calculateModelDimensions,
  isShelfHighSingleDoor,
  isSinkComponent,
} from './utils/ComponentUtils';
import { drawerStore } from '@/store';

interface ComponentClickHandlerProps {
  component: THREE.Object3D;
  kitchenComponents: THREE.Object3D<THREE.Object3DEventMap>[];
  islandComponents: THREE.Object3D<THREE.Object3DEventMap>[];
  floorComponents?: THREE.Object3D<THREE.Object3DEventMap>[];
  replacedModels: Map<string, THREE.Object3D>;
  kitchenWidth: number;
  template: KitchenTemplateEntity;
  isReplacing: boolean;
  onHighlight: (component: THREE.Object3D | null) => void;
  onMeshNumber: (number: string | null) => void;
  isComponentVisible: (component: THREE.Object3D) => boolean;
  isComponentRaycastable: (component: THREE.Object3D) => boolean;
  updateComponentVisibility: (
    component: THREE.Object3D,
    visible: boolean,
    raycastable?: boolean
  ) => void;
}

export const handleComponentClick = ({
  kitchenWidth,
  component,
  kitchenComponents,
  islandComponents,
  floorComponents,
  replacedModels,
  template,
  isReplacing,
  onHighlight,
  onMeshNumber,
  isComponentVisible,
  isComponentRaycastable,
  updateComponentVisibility,
}: ComponentClickHandlerProps) => {
  if (isReplacing) return;

  const highlightManager = HighlightManager.getInstance();

  // Xử lý click ra ngoài (component là null hoặc undefined)
  if (!component) {
    highlightManager.resetHighlights(
      kitchenComponents.filter(
        (comp: THREE.Object3D) =>
          isComponentVisible(comp) && isComponentRaycastable(comp)
      ),
      islandComponents.filter(
        (comp: THREE.Object3D) =>
          isComponentVisible(comp) && isComponentRaycastable(comp)
      ),
      replacedModels,
      floorComponents?.filter(
        (comp: THREE.Object3D) =>
          isComponentVisible(comp) && isComponentRaycastable(comp)
      )
    );
    onHighlight(null);
    onMeshNumber(null);
    return;
  }
  // Chặn click cho Cabinet_Wall_R
  if (component.name === 'Cabinet_Wall_R') {
    return;
  }
  if (component.name === 'Rangehood_Inalto_120cm' || component.name === 'Rangehood_Inalto_120cm_1') {
    return;
  }

  // Chặn click cho Divider001
  if (component.name === 'Divider001') {
    return;
  }
  if (component.name === 'Bar_L_1' || component.name === 'Bar_R_1') {
    return;
  }
  if (component.name === 'Left_Panel' || component.name === 'Right_Panel') {
    return;
  }

  // Kiểm tra visibility
  if (!isComponentVisible(component) || !isComponentRaycastable(component)) {
    return;
  }
  console.log('component.name', component.name);
  
  // Reset highlights chỉ khi không phải là thao tác replace
  if (!replacedModels.has(component.name)) {
    highlightManager.resetHighlights(
      kitchenComponents.filter(
        (comp: THREE.Object3D) =>
          isComponentVisible(comp) && isComponentRaycastable(comp)
      ),
      islandComponents.filter(
        (comp: THREE.Object3D) =>
          isComponentVisible(comp) && isComponentRaycastable(comp)
      ),
      replacedModels,
      floorComponents?.filter(
        (comp: THREE.Object3D) =>
          isComponentVisible(comp) && isComponentRaycastable(comp)
      )
    );
  }

  // Xử lý đặc biệt cho Scene component
  if (component.name === 'Scene' || component.userData?.originalComponent === 'Scene') {
    // Find the actual Scene component to highlight (either original or replaced)
    const sceneToHighlight = component.userData?.isReplacedModel ? component : replacedModels.get('Scene') || component;

    // Highlight component Scene
    highlightManager.highlightComponents([sceneToHighlight]);
    onHighlight(sceneToHighlight);
    onMeshNumber(null);

    // Get category info for Scene
    const { categories } = CategoryManager.getCategoryInfo(
      null,
      sceneToHighlight,
      false,
      false
    );

    // Emit events
    EventManager.emitEvents(
      categories,
      null,
      sceneToHighlight,
      [sceneToHighlight], // Pass Scene component as matching components
      undefined,
      template,
      false,
      kitchenComponents.filter(
        (comp) => isComponentVisible(comp) && isComponentRaycastable(comp)
      )
    );

    // Emit highlight event with dimensions
    setTimeout(() => {
      const dimensions = calculateModelDimensions(sceneToHighlight);
      emitter.emit(THREE_EVENTS.HIGHLIGHT_COMPONENT_CATEGORY, {
        componentName: sceneToHighlight.name,
        isScene: true,
        dimensions: {
          totalWidthMm: dimensions.width * 1000,
          components: [{
            name: sceneToHighlight.name,
            width: dimensions.width,
            widthMm: dimensions.widthMm,
          }]
        }
      });
    }, 0);

    return;
  }

  // Xử lý đặc biệt cho Back_splash components
  if (component.name.startsWith('Back_splash')) {
    // Tìm tất cả Back_splash components
    const backSplashComponents = [
      ...kitchenComponents,
      ...islandComponents,
    ].filter(
      (comp) =>
        (comp.name === 'Back_splash_L' ||
          comp.name === 'Back_splash_Middle' ||
          comp.name === 'Back_splash_Right' ||
          comp.name === 'Back_splash_Left') &&
        isComponentVisible(comp) &&
        isComponentRaycastable(comp)
    );

    // Highlight tất cả Back_splash components
    if (backSplashComponents.length > 0) {
      highlightManager.highlightComponents(backSplashComponents);
      onHighlight(component);
      onMeshNumber(ComponentIdentifier.getMeshNumber(component.name));

      // Emit events
      const { categories } = CategoryManager.getCategoryInfo(
        ComponentIdentifier.getMeshNumber(component.name),
        component,
        false,
        false
      );

      // Emit events với setTimeout
      setTimeout(() => {
        // Emit event chuyển tab cho Back_splash
        emitter.emit(THREE_EVENTS.SWITCH_TO_BACKWALL_TAB_AND_BACK_FLASH_TAB);

        // Emit event highlight category
        emitter.emit(THREE_EVENTS.HIGHLIGHT_COMPONENT_CATEGORY, {
          componentName: component.name,
        });
      }, 0);

      EventManager.emitEvents(
        categories,
        ComponentIdentifier.getMeshNumber(component.name),
        component,
        backSplashComponents,
        undefined,
        template,
        false,
        kitchenComponents.filter(
          (comp) => isComponentVisible(comp) && isComponentRaycastable(comp)
        )
      );

      return;
    }
  }

  // Xử lý đặc biệt cho Shelf_High_Single_Door
  if (isShelfHighSingleDoor(component.name)) {
    const shelfComponents = [...kitchenComponents, ...islandComponents].filter(
      (comp) =>
        isShelfHighSingleDoor(comp.name) &&
        isComponentVisible(comp) &&
        isComponentRaycastable(comp)
    );

    if (shelfComponents.length > 0) {
      const dimensions = shelfComponents.map((comp) =>
        calculateModelDimensions(comp)
      );
      const totalWidth = dimensions.reduce(
        (max, dim) => Math.max(max, dim.width),
        0
      );

      setTimeout(() => {
        emitter.emit(THREE_EVENTS.HIGHLIGHT_COMPONENT_CATEGORY, {
          componentName: component.name,
          dimensions: {
            totalWidthMm: totalWidth * 1000,
            components: dimensions.map((dim) => ({
              name: component.name,
              width: dim.width,
              widthMm: dim.widthMm,
            })),
          },
        });
      }, 0);
    }
  }

  // Thêm xử lý đặc biệt cho Cabinet_Opening và Dishwasher
  if (
    component.name.includes('Cabinet_Opening') ||
    component.name.includes('Dishwasher')
  ) {
    const allComponents = [...kitchenComponents, ...islandComponents];
    const openingComponents = allComponents.filter(
      (comp) =>
        (comp.name.includes('Cabinet_Opening') ||
          comp.name.includes('Dishwasher') ||
          comp.userData?.originalComponent?.includes('Cabinet_Opening') ||
          comp.userData?.originalComponent?.includes('Dishwasher')) &&
        isComponentVisible(comp) &&
        isComponentRaycastable(comp)
    );

    // Thêm các replaced models liên quan
    const openingReplacedModels = Array.from(replacedModels.values()).filter(
      (model) =>
        model.userData?.originalComponent?.includes('Cabinet_Opening') ||
        model.userData?.originalComponent?.includes('Dishwasher')
    );

    const allOpeningComponents = [
      ...openingComponents,
      ...openingReplacedModels,
    ];

    if (allOpeningComponents.length > 0) {
      // Highlight tất cả components
      highlightManager.highlightComponents(allOpeningComponents);

      // Tìm representative component
      const representativeComponent =
        allOpeningComponents.find(
          (comp) =>
            comp.name.includes('Cabinet_Opening') ||
            comp.userData?.originalComponent?.includes('Cabinet_Opening')
        ) || component;

      onHighlight(representativeComponent);
      onMeshNumber(
        ComponentIdentifier.getMeshNumber(representativeComponent.name)
      );

      // Emit events
      const { categories } = CategoryManager.getCategoryInfo(
        ComponentIdentifier.getMeshNumber(representativeComponent.name),
        representativeComponent,
        false,
        ComponentIdentifier.isIslandComponent(representativeComponent.name)
      );

      EventManager.emitEvents(
        categories,
        ComponentIdentifier.getMeshNumber(representativeComponent.name),
        representativeComponent,
        allOpeningComponents,
        replacedModels.get(
          ComponentIdentifier.getMeshNumber(representativeComponent.name) || ''
        ),
        template,
        ComponentIdentifier.isIslandComponent(representativeComponent.name),
        kitchenComponents.filter(
          (comp) => isComponentVisible(comp) && isComponentRaycastable(comp)
        )
      );

      return;
    }
  }

  // Thêm xử lý đặc biệt cho Sink components
  if (
    component.name.includes('Sink_Double_Stand_Alone') ||
    component.name.includes('Cabinet_Sink_Double_Door')
  ) {
    const allComponents = [...kitchenComponents, ...islandComponents];
    const sinkComponents = allComponents.filter(
      (comp) =>
        (comp.name.includes('Sink_Double_Stand_Alone') ||
          comp.name.includes('Cabinet_Sink_Double_Door') ||
          comp.userData?.originalComponent?.includes(
            'Sink_Double_Stand_Alone'
          ) ||
          comp.userData?.originalComponent?.includes(
            'Cabinet_Sink_Double_Door'
          )) &&
        isComponentVisible(comp) &&
        isComponentRaycastable(comp)
    );

    // Thêm các replaced models liên quan đến sink
    const sinkReplacedModels = Array.from(replacedModels.values()).filter(
      (model) =>
        model.userData?.originalComponent?.includes(
          'Sink_Double_Stand_Alone'
        ) ||
        model.userData?.originalComponent?.includes(
          'Cabinet_Sink_Double_Door'
        ) ||
        model.name.includes('Sink_Double_Stand_Alone') ||
        model.name.includes('Cabinet_Sink_Double_Door')
    );

    const allSinkComponents = [...sinkComponents, ...sinkReplacedModels];

    if (allSinkComponents.length > 0) {
      // Highlight tất cả sink components
      highlightManager.highlightComponents(allSinkComponents);

      // Tìm Cabinet_Sink_Double_Door component để làm representative
      const cabinetComponent =
        allSinkComponents.find(
          (comp) =>
            comp.name.includes('Cabinet_Sink_Double_Door') ||
            comp.userData?.originalComponent?.includes(
              'Cabinet_Sink_Double_Door'
            )
        ) || component;

      onHighlight(cabinetComponent);
      onMeshNumber(ComponentIdentifier.getMeshNumber(cabinetComponent.name));

      // Calculate dimensions for all sink components together
      const dimensions = allSinkComponents.map((comp) =>
        calculateModelDimensions(comp)
      );
      const totalWidth = dimensions.reduce((sum, dim) => sum + dim.width, 0);

      setTimeout(() => {
        emitter.emit(THREE_EVENTS.HIGHLIGHT_COMPONENT_CATEGORY, {
          componentName: cabinetComponent.name,
          dimensions: {
            totalWidthMm: totalWidth * 1000,
            components: dimensions.map((dim, index) => ({
              name: allSinkComponents[index].name,
              width: dim.width,
              widthMm: dim.widthMm,
            })),
          },
        });
      }, 0);

      // Emit events
      const { categories } = CategoryManager.getCategoryInfo(
        ComponentIdentifier.getMeshNumber(cabinetComponent.name),
        cabinetComponent,
        false,
        ComponentIdentifier.isIslandComponent(cabinetComponent.name)
      );

      EventManager.emitEvents(
        categories,
        ComponentIdentifier.getMeshNumber(cabinetComponent.name),
        cabinetComponent,
        allSinkComponents,
        replacedModels.get(
          ComponentIdentifier.getMeshNumber(cabinetComponent.name) || ''
        ),
        template,
        ComponentIdentifier.isIslandComponent(cabinetComponent.name),
        kitchenComponents.filter(
          (comp) => isComponentVisible(comp) && isComponentRaycastable(comp)
        )
      );

      return;
    }
  }

  // Thêm xử lý đặc biệt cho Cabinet_Oven và CookTop_60cm
  if (
    component.name.includes('Cabinet_Oven') ||
    component.name.includes('Oven')
    // || component.name.includes('CookTop_60cm')
  ) {
    const allComponents = [...kitchenComponents, ...islandComponents];
    const ovenComponents = allComponents.filter(
      (comp) =>
        (comp.name.includes('Cabinet_Oven') || comp.name.includes('Oven')) &&
        // || comp.name.includes('CookTop_60cm')
        comp.name !== 'Cabinet_Oven001_2' &&
        isComponentVisible(comp) &&
        isComponentRaycastable(comp)
    );

    // Thêm các replaced models liên quan đến oven và cooktop
    const ovenReplacedModels = Array.from(replacedModels.values()).filter(
      (model) =>
        (model.userData?.originalComponent?.includes('Cabinet_Oven') ||
          model.userData?.originalComponent?.includes('Oven') ||
          model.userData?.originalComponent?.includes('CookTop_60cm')) &&
        !model.userData?.originalComponent?.includes('Cabinet_Oven001_2')
    );

    const allOvenComponents = [...ovenComponents, ...ovenReplacedModels];

    if (allOvenComponents.length > 0) {
      // Highlight tất cả oven components
      highlightManager.highlightComponents(allOvenComponents);

      // Declare representativeComponent outside the conditional blocks
      let representativeComponent;

      // Select the appropriate oven component based on kitchen width
      const targetOvenComponent =
        kitchenWidth < 4000 ? 'Cabinet_Oven_2' : 'Cabinet_Oven_3';

      // Find the representative component using the target name
      representativeComponent =
        allOvenComponents.find(
          (comp) =>
            comp.name === targetOvenComponent ||
            comp.userData?.originalComponent === targetOvenComponent
        ) || component;

      onHighlight(representativeComponent);
      onMeshNumber(
        ComponentIdentifier.getMeshNumber(representativeComponent.name)
      );

      // Emit events
      const { categories } = CategoryManager.getCategoryInfo(
        ComponentIdentifier.getMeshNumber(representativeComponent.name),
        representativeComponent,
        false,
        ComponentIdentifier.isIslandComponent(representativeComponent.name)
      );

      EventManager.emitEvents(
        categories,
        ComponentIdentifier.getMeshNumber(representativeComponent.name),
        representativeComponent,
        allOvenComponents,
        replacedModels.get(
          ComponentIdentifier.getMeshNumber(representativeComponent.name) || ''
        ),
        template,
        ComponentIdentifier.isIslandComponent(representativeComponent.name),
        kitchenComponents.filter(
          (comp) => isComponentVisible(comp) && isComponentRaycastable(comp)
        )
      );

      return;
    }
  }

  // Emit highlight event và xử lý backWall
  setTimeout(() => {
    // Kiểm tra xem có phải model đã replace không trước khi emit event
    if (!component.userData?.isReplacedModel) {
      // Tính toán dimensions cho model gốc
      const dimensions = calculateModelDimensions(component);
      emitter.emit(THREE_EVENTS.HIGHLIGHT_COMPONENT_CATEGORY, {
        componentName: component.name,
        dimensions: {
          totalWidthMm: dimensions.width * 1000,
          components: [
            {
              name: component.name,
              width: dimensions.width,
              widthMm: dimensions.widthMm,
            },
          ],
        },
      });
    }

    // Thêm xử lý chuyển tab khi click vào backWall
    const nameParts = component.name.toLowerCase().split('_');
    const mainType = nameParts[0];
    const subType = nameParts.length > 1 ? nameParts[1] : null;

    if (
      mainType === 'back' &&
      (subType === 'wall' ||
        subType === 'wall001' ||
        subType === 'wall002' ||
        subType === 'wall_left' ||
        subType === 'wall_right')
    ) {
      emitter.emit(THREE_EVENTS.SEQUENTIAL_STEPS);
    }
  }, 0);

  // Kiểm tra xem object có phải là model đã thay thế không
  if (component.userData?.isReplacedModel) {
    // Tìm root model đã thay thế (trường hợp click vào child mesh)
    let rootModel = component;
    while (rootModel.parent && rootModel.parent.userData?.isReplacedModel) {
      rootModel = rootModel.parent;
    }

    // Chỉ highlight model được click nếu nó visible và raycastable
    if (isComponentVisible(rootModel) && isComponentRaycastable(rootModel)) {
      highlightManager.highlightComponents([rootModel]);
      onHighlight(rootModel);
      onMeshNumber(rootModel.userData?.originalMeshNumber);

      // Tính toán dimensions cho model đã replace
      const dimensions = calculateModelDimensions(rootModel);

      // Emit event với delay để đảm bảo thứ tự xử lý đúng
      setTimeout(() => {
        emitter.emit(THREE_EVENTS.HIGHLIGHT_COMPONENT_CATEGORY, {
          componentName:
            rootModel.userData?.originalComponent || rootModel.name,
          dimensions: {
            totalWidthMm: dimensions.width * 1000,
            components: [
              {
                name: rootModel.userData?.originalComponent || rootModel.name,
                width: dimensions.width,
                widthMm: dimensions.widthMm,
              },
            ],
          },
        });
      }, 50);
    }

    // Emit events cho model đã thay thế
    const isIslandComponent =
      rootModel.userData?.isIsland ||
      ComponentIdentifier.isIslandComponent(
        rootModel.userData?.originalComponent || ''
      );

    const { categories } = CategoryManager.getCategoryInfo(
      rootModel.userData?.originalMeshNumber,
      rootModel,
      rootModel.userData?.originalComponent === 'Oven001_1',
      isIslandComponent
    );

    EventManager.emitEvents(
      categories,
      rootModel.userData?.originalMeshNumber,
      rootModel,
      [rootModel],
      rootModel,
      template,
      isIslandComponent,
      kitchenComponents.filter(
        (comp) => isComponentVisible(comp) && isComponentRaycastable(comp)
      )
    );

    return;
  }

  // Tìm model đã thay thế dựa trên meshNumber hoặc tên
  const meshNumber = ComponentIdentifier.getMeshNumber(component.name);
  let replacedModel = null;
  let replacedModelsGroup: THREE.Object3D[] = [];

  if (meshNumber && replacedModels.has(meshNumber)) {
    // Tìm theo meshNumber
    replacedModel = replacedModels.get(meshNumber);
    replacedModelsGroup = [replacedModel!];
  } else {
    // Tìm theo prefix của tên component
    const componentPrefix = component.name.replace(/(_\d+)?$/, ''); // Loại bỏ số ở cuối

    // Tìm tất cả replaced models có cùng prefix
    for (const [key, model] of replacedModels.entries()) {
      const originalComponent = model.userData?.originalComponent as string;
      if (originalComponent && originalComponent.startsWith(componentPrefix)) {
        replacedModelsGroup.push(model);
      }
    }

    // Nếu tìm thấy ít nhất một model, lấy model đầu tiên làm model chính
    if (replacedModelsGroup.length > 0) {
      replacedModel = replacedModelsGroup[0];
    }
  }

  // Nếu tìm thấy replaced model, xử lý tương tự như trên
  if (replacedModel && replacedModelsGroup.length > 0) {
    // Lọc các models visible và raycastable
    const visibleModels = replacedModelsGroup.filter(
      (model) => isComponentVisible(model) && isComponentRaycastable(model)
    );

    if (visibleModels.length > 0) {
      highlightManager.highlightComponents(visibleModels);
      onHighlight(replacedModel);
      onMeshNumber(replacedModel.userData?.originalMeshNumber);

      // Emit events
      const isIslandComponent =
        replacedModel.userData?.isIsland ||
        ComponentIdentifier.isIslandComponent(
          replacedModel.userData?.originalComponent || ''
        );

      const { categories } = CategoryManager.getCategoryInfo(
        replacedModel.userData?.originalMeshNumber,
        replacedModel,
        replacedModel.userData?.originalComponent === 'Oven001_1',
        isIslandComponent
      );

      EventManager.emitEvents(
        categories,
        replacedModel.userData?.originalMeshNumber,
        replacedModel,
        visibleModels,
        replacedModel,
        template,
        isIslandComponent,
        kitchenComponents.filter(
          (comp) => isComponentVisible(comp) && isComponentRaycastable(comp)
        )
      );

      return;
    }
  }

  // Tìm tất cả components có cùng prefix và đang visible/raycastable
  const allComponents = [...kitchenComponents, ...islandComponents];
  const componentsToHighlight = highlightManager
    .findComponentsWithSamePrefix(component, allComponents)
    .filter((comp) => isComponentVisible(comp) && isComponentRaycastable(comp));

  // Tìm các replaced models tương ứng và đang visible/raycastable
  const replacedComponentsToHighlight = componentsToHighlight
    .map((comp) => {
      const meshNum = ComponentIdentifier.getMeshNumber(comp.name);
      if (meshNum && replacedModels.has(meshNum)) {
        const replacedModel = replacedModels.get(meshNum);
        return replacedModel &&
          isComponentVisible(replacedModel) &&
          isComponentRaycastable(replacedModel)
          ? replacedModel
          : null;
      }
      return isComponentVisible(comp) && isComponentRaycastable(comp)
        ? comp
        : null;
    })
    .filter(Boolean) as THREE.Object3D[];

  // Highlight tất cả components tìm được
  highlightManager.highlightComponents(replacedComponentsToHighlight);

  // Cập nhật UI state với component được click
  const targetComponent =
    replacedModels.get(
      ComponentIdentifier.getMeshNumber(component.name) || ''
    ) || component;
  if (
    isComponentVisible(targetComponent) &&
    isComponentRaycastable(targetComponent)
  ) {
    onHighlight(targetComponent);
    onMeshNumber(ComponentIdentifier.getMeshNumber(component.name));
  }

  const { categories } = CategoryManager.getCategoryInfo(
    ComponentIdentifier.getMeshNumber(component.name),
    targetComponent,
    component.name === 'Oven001_1',
    ComponentIdentifier.isIslandComponent(component.name)
  );

  // Emit events chỉ với các components đang visible và raycastable
  EventManager.emitEvents(
    categories,
    ComponentIdentifier.getMeshNumber(component.name),
    targetComponent,
    componentsToHighlight,
    replacedModels.get(ComponentIdentifier.getMeshNumber(component.name) || ''),
    template,
    ComponentIdentifier.isIslandComponent(component.name),
    kitchenComponents.filter(
      (comp) => isComponentVisible(comp) && isComponentRaycastable(comp)
    )
  );

  // Sau khi tìm được replacedComponentsToHighlight
  if (replacedComponentsToHighlight.length > 0) {
    const dimensions = replacedComponentsToHighlight.map((comp) =>
      calculateModelDimensions(comp)
    );
    const totalWidth = dimensions.reduce(
      (max, dim) => Math.max(max, dim.width),
      0
    );

    setTimeout(() => {
      emitter.emit(THREE_EVENTS.HIGHLIGHT_COMPONENT_CATEGORY, {
        componentName: component.name,
        dimensions: {
          totalWidthMm: totalWidth * 1000,
          components: dimensions.map((dim) => ({
            name: component.name,
            width: dim.width,
            widthMm: dim.widthMm,
          })),
        },
      });
    }, 0);
  }
};
