import * as THREE from 'three';
import {
  CircularProgress,
  Box,
  Button,
  ClickAwayListener,
  Tooltip,
  Typography,
  useMediaQuery,
  Accordion,
  AccordionDetails,
  Modal,
  Grid2,
} from '@mui/material';
import * as React from 'react';
import { ProductEntity } from '@/types/model';
import {
  drawerStore,
  productStore,
  useBrandStore,
  useDisableItemsStore,
} from '@/store';
import {
  itemPriceStyle,
  itemTextStyle,
  styleButtonMobile,
  styleModalProduct,
} from './styles';
import { emitter, THREE_EVENTS } from '@/utils/events';
import theme from '@/themes';
import { formatInputCurrency } from '@/utils/currency';
import { useState, useEffect, useRef, useCallback } from 'react';
import { buildThumbnailPath } from '@/utils/helper';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import { GuideLineStore } from '@/store/storeGuideline';
import { useKitchenStore } from '@/store/useKitchenStore';
import { useMappingStore } from '@/store/useMappingStore';

type ReplaceHandler = (product: ProductEntity) => void;

interface ModelDimensions {
  name: string;
  width: number;
  widthMm: number;
}

interface DimensionsData {
  totalWidthUnits: number;
  totalWidthMm: number;
  totalHeightUnits?: number;
  totalHeightMm?: number;
  totalDepthUnits?: number;
  totalDepthMm?: number;
  components: ModelDimensions[];
}

interface GridItemProps {
  item: ProductEntity;
  replay?: string;
  onCloseDrawer?: () => void;
  shelfDimensions?: DimensionsData | null;
}

// Thêm mapping giữa component và product lúc ban đầu của thằng chưa replace
const getComponentProductMapping = (dimensions: DimensionsData | null) => {
  const mapping: Array<{
    componentPattern: string | string[];
    productName: string | string[];
  }> = [
    {
      componentPattern: [
        'Cabinet_Opening_2',
        'Cabinet_Opening_1',
        'Cabinet_Opening',
        'Dishwasher',
      ],
      productName: ['Island Bench Dishwasher'],
    },
    {
      componentPattern: [
        'Shelf_High_Single_Door_R_1',
        'Shelf_High_Single_Door_R',
      ],
      productName:
        dimensions?.totalWidthMm && Math.abs(dimensions.totalWidthMm) <= 709
          ? 'Kitchen Cupboard Single Door'
          : 'Kitchen Cupboard Double Door',
    },
    {
      componentPattern: [
        'Shelf_High_Single_Door_L_1',
        'Shelf_High_Single_Door_L',
        'Shelf_High_Single_Door_R',
      ],
      productName:
        dimensions?.totalWidthMm && Math.abs(dimensions.totalWidthMm) <= 709
          ? 'Kitchen Cupboard Single Door'
          : 'Kitchen Cupboard Double Door',
    },
    {
      componentPattern: 'Shelf_High_Double_Door_1',
      productName: 'Kitchen Cupboard Double Door',
    },
    {
      componentPattern: 'Shelf_Low_Double_Door',
      productName: 'Fridge Cabinet Cupboard Double Door',
    },
    {
      componentPattern: ['Cabinet_Single_Door_L_4', 'Cabinet_Single_Door_L_3'],

      productName:
        dimensions?.totalWidthMm && Math.abs(dimensions.totalWidthMm) <= 821
          ? 'Kitchen Cabinet Single Door'
          : 'Kitchen Cabinet Double Door',
    },
    {
      componentPattern: ['Cabinet_Single_Door_R_3', 'Cabinet_Single_Door_R_2'],
      productName:
        dimensions?.totalWidthMm && Math.abs(dimensions.totalWidthMm) <= 821
          ? 'Kitchen Cabinet Single Door'
          : 'Kitchen Cabinet Double Door',
    },
    {
      componentPattern: [
        'Cabinet_Oven_3',
        'Cabinet_Oven001',
        'Cabinet_Oven001_2',
        'Cabinet_Oven_3',
        'Cabinet_Oven',
        'Oven',
      ],
      productName: 'Kitchen Oven',
    },
    {
      componentPattern: 'CookTop_60cm',
      productName: 'Kitchen CookTop 60CM',
    },
    {
      componentPattern: ['Cabinet_High_2', 'Cabinet_High'],
      productName: 'Tall Cabinet',
    },
    {
      componentPattern: [
        'Cabinet_Microwave_2',
        'Cabinet_Microwave_3',
        'Cabinet_Microwave_1',
        'Cabinet_Microwave',
      ],
      productName: 'Island Bench Cabinet Microwave',
    },

    {
      componentPattern: [
        'Cabinet_Sink_Double_Door_2',
        'Cabinet_Sink_Double_Door_3',
        'Cabinet_Sink_Double_Door_7',
        'Cabinet_Sink_Double_Door',
        'Sink_Double_Stand_Alone',
      ],
      productName: 'Island Bench Cabinet Sink Double Door',
    },
    {
      componentPattern: ['Cabinet_Four_Drawer_2', 'Cabinet_Four_Drawer_3'],
      productName: 'Island Bench Cabinet Four Drawer',
    },
    {
      componentPattern: 'Scene',
      productName: 'Floor Tiles Chevron',
    },
  ];
  return mapping;
};

interface DynamicMapping {
  componentPattern: string | string[];
  productName: string[];
}

const initialDynamicMapping: Record<string, DynamicMapping> = {
  Shelf_High_Single_Door_R_1: {
    componentPattern: [
      'Shelf_High_Single_Door_R_1',
      'Shelf_High_Single_Door_R',
    ],
    productName: [],
  },
  Shelf_High_Single_Door_L_1: {
    componentPattern: [
      'Shelf_High_Single_Door_L_1',
      'Shelf_High_Single_Door_L',
    ],
    productName: [],
  },
  Shelf_High_Double_Door_1: {
    componentPattern: ['Shelf_High_Double_Door_1', 'Shelf_High_Double_Door'],
    productName: [],
  },
  Shelf_Low_Double_Door: {
    componentPattern: 'Shelf_Low_Double_Door',
    productName: [],
  },
  Cabinet_Single_Door_L: {
    componentPattern: ['Cabinet_Single_Door_L_4', 'Cabinet_Single_Door_L_3'],
    productName: [],
  },
  Cabinet_Single_Door_R: {
    componentPattern: [
      'Cabinet_Single_Door_R_3',
      'Cabinet_Single_Door_R_2',
      'Cabinet_Single_Door_R',
    ],
    productName: [],
  },
  Cabinet_Oven: {
    componentPattern: [
      'Cabinet_Oven_3',
      'Cabinet_Oven001_1',
      'Cabinet_Oven001_2',
      'Cabinet_Oven_3',
      'Cabinet_Oven',
      'Oven',
    ],
    productName: [],
  },
  CookTop: {
    componentPattern: 'CookTop_60cm',
    productName: [],
  },
  Cabinet_High: {
    componentPattern: ['Cabinet_High_2', 'Cabinet_High'],
    productName: [],
  },
  Cabinet_Microwave: {
    componentPattern: [
      'Cabinet_Microwave_2',
      'Cabinet_Microwave_3',
      'Cabinet_Microwave_1',
      'Cabinet_Microwave',
    ],
    productName: [],
  },
  Cabinet_Opening: {
    componentPattern: ['Cabinet_Opening_2', 'Cabinet_Opening_1', 'Dishwasher'],
    productName: [],
  },
  Cabinet_Sink: {
    componentPattern: [
      'Cabinet_Sink_Double_Door_2',
      'Cabinet_Sink_Double_Door_3',
      'Cabinet_Sink_Double_Door_7',
      'Cabinet_Sink_Double_Door',
      'Sink_Double_Stand_Alone',
    ],
    productName: [],
  },
  Cabinet_Four_Drawer: {
    componentPattern: ['Cabinet_Four_Drawer_2', 'Cabinet_Four_Drawer_3'],
    productName: [],
  },
  Scene: {
    componentPattern: 'Scene',
    productName: [],
  },
};

export default function GridItem({
  item,
  replay,
  onCloseDrawer,
  shelfDimensions,
}: GridItemProps): React.ReactElement | null {
  const {
    dynamicMapping,
    modelMapping,
    highlightedComponent,
    dimensions,
    setDynamicMapping,
    updateDynamicMapping,
    updateModelMapping,
    setHighlightedComponent,
    setDimensions,
    setLastReplacedModel
  } = useMappingStore();

  const [openTooltip, setOpenTooltip] = useState<boolean>(false);
  const { openModalProduct, setShowHideModal } = drawerStore();
  const { activeStore } = useBrandStore();
  const { setShowTemplateModal } = useBrandStore();
  const { setShowGuideLineModels, showOnceModels } = GuideLineStore();
  const { disabledItems, setDisabledItem } = useDisableItemsStore();
  const isMobile = useMediaQuery(theme.breakpoints.down('tablet'));
  const { isLoading, setLoading, activeProduct, setActiveProduct, listCart } = productStore();

  // Store component data in ref to persist between renders
  const componentDataRef = useRef<{
    kitchenComponents?: THREE.Object3D<THREE.Object3DEventMap>[];
    component?: THREE.Object3D<THREE.Object3DEventMap>;
    highlightedComponents?: THREE.Object3D<THREE.Object3DEventMap>[];
    componentName?: string;
    matchingComponents?: THREE.Object3D<THREE.Object3DEventMap>[];
  }>({});

  useEffect(() => {
    const handleModelClick = (eventData: any) => {
      const kitchenComponents = eventData?.kitchenComponents;
      const component = eventData?.component;
      const highlightedComponents = eventData?.highlightedComponents;
      const componentName = eventData?.componentName;
      const matchingComponents = eventData?.matchingComponents;

      componentDataRef.current = {
        kitchenComponents,
        component,
        highlightedComponents,
        componentName,
        matchingComponents,
      };
    };

    const handleTemplateLoad = (eventData: any) => {
      const { products, totalPrice, isReplacement, replacedProduct } =
        eventData;

      if (products && products.length > 0) {
        // Get current cart
        const currentCart = productStore.getState().listCart;

        // If this is a replacement, update only the replaced product
        if (isReplacement && replacedProduct) {
          const updatedCart = currentCart.map((cartItem: ProductEntity) => {
            // Match by ID instead of position
            if (cartItem.id === replacedProduct.old.id) {
              // Return the new product with all its properties
              const updatedProduct = {
                ...replacedProduct.new,
                position: cartItem.position, // Keep original position
                price:
                  typeof replacedProduct.new.price === 'number'
                    ? replacedProduct.new.price
                    : 0,
              };
              return updatedProduct;
            }
            // Keep existing product with its price
            return {
              ...cartItem,
              price: typeof cartItem.price === 'number' ? cartItem.price : 0,
            };
          });

          // Update store with modified cart
          productStore.getState().reloadListCart([...updatedCart]);
        } else {
          // For initial load, use all products with validated prices
          const validProducts = products.map((product: ProductEntity) => ({
            ...product,
            price: typeof product.price === 'number' ? product.price : 0,
          }));

          productStore.getState().reloadListCart([...validProducts]);
        }

        // Force UI update
        setActiveProduct(null);
        setTimeout(() => {
          setActiveProduct(products[0]);
        }, 0);
      }
    };

    emitter.on(THREE_EVENTS.onModelClicked, handleModelClick);
    emitter.on(THREE_EVENTS.onTemplateDidLoad, handleTemplateLoad);

    return () => {
      emitter.off(THREE_EVENTS.onModelClicked, handleModelClick);
      emitter.off(THREE_EVENTS.onTemplateDidLoad, handleTemplateLoad);
    };
  }, []);

  useEffect(() => {
    const handleHighlightComponent = (data: {
      componentName: string;
      dimensions?: DimensionsData;
    }) => {
      const componentKey = Object.keys(dynamicMapping).find((key) => {
        const mapping = dynamicMapping[key];
        if (Array.isArray(mapping.componentPattern)) {
          return mapping.componentPattern.some((pattern) =>
            data.componentName.includes(pattern)
          );
        }
        return data.componentName.includes(mapping.componentPattern as string);
      });

      if (componentKey) {
        const mappedProduct = modelMapping[data.componentName];
        const initialMappedProduct = initialDynamicMapping[componentKey]?.productName;

        if (mappedProduct || initialMappedProduct?.length > 0) {
          const productName = mappedProduct
            ? mappedProduct.productName
            : initialMappedProduct[0];

          updateDynamicMapping(componentKey, {
            ...dynamicMapping[componentKey],
            productName: [productName],
          });
        }
      }

      setHighlightedComponent(data.componentName);
      if (data.dimensions) {
        setDimensions(data.dimensions);
      }
    };

    const handleReplacedModelInfo = (data: {
      componentName: string;
      productName: string;
    }) => {
      // Cập nhật mapping trong store
      updateModelMapping(data.componentName, data.productName);

      // Tìm component key và log quá trình tìm kiếm
      const componentKey = Object.keys(dynamicMapping).find((key) => {
        const mapping = dynamicMapping[key];
        const isMatch = Array.isArray(mapping.componentPattern)
          ? mapping.componentPattern.some((pattern) =>
              data.componentName.includes(pattern)
            )
          : data.componentName.includes(mapping.componentPattern as string);

        return isMatch;
      });

      if (componentKey) {
        // Cập nhật state với sản phẩm mới replace
        updateDynamicMapping(componentKey, {
          ...dynamicMapping[componentKey],
          productName: [data.productName],
        });
      }

      setLastReplacedModel({
        ...data,
        meshNumber: '',
      });
      setHighlightedComponent(data.componentName);
    };

    emitter.on(
      THREE_EVENTS.HIGHLIGHT_COMPONENT_CATEGORY,
      handleHighlightComponent
    );
    emitter.on(THREE_EVENTS.REPLACED_MODEL_INFO, handleReplacedModelInfo);

    return () => {
      emitter.off(
        THREE_EVENTS.HIGHLIGHT_COMPONENT_CATEGORY,
        handleHighlightComponent
      );
      emitter.off(THREE_EVENTS.REPLACED_MODEL_INFO, handleReplacedModelInfo);
    };
  }, [dynamicMapping, updateDynamicMapping, updateModelMapping, setHighlightedComponent, setDimensions]);

  const isDisabled: boolean = Boolean(
    disabledItems[item.id] ||
      (dimensions?.totalWidthMm &&
        ((Math.abs(dimensions.totalWidthMm) <= 709 &&
          item.name === 'Kitchen Cupboard Double Door') ||
          (Math.abs(dimensions.totalWidthMm) <= 821 &&
            item.name === 'Kitchen Cabinet Double Door') ||
          (Math.abs(dimensions.totalWidthMm) >= 709 &&
            item.name === 'Kitchen Cupboard Single Door') ||
          (Math.abs(dimensions.totalWidthMm) >= 821 &&
            item.name === 'Kitchen Cabinet Single Door')))
  );

  const shouldHide: boolean = Boolean(
    item.defaultSize &&
      ((item.defaultSize.w &&
        item.defaultSize.w < 600 &&
        item.name === 'Kitchen Cupboard Shelves Glass Door') ||
        (item.defaultSize.w &&
          item.defaultSize.w < 600 &&
          item.name === 'Kitchen Cupboard Shelves No Door') ||
        (item.defaultSize.w &&
          item.defaultSize.w < 600 &&
          item.name === 'Kitchen Cabinet Shelves Glass Door') ||
        (item.defaultSize.w &&
          item.defaultSize.w < 600 &&
          item.name === 'Kitchen Cabinet Shelves No Door'))
  );

  if (shouldHide) {
    return null;
  }

  const shouldHighlightBorder = useCallback(
    (itemName: string): boolean => {
      // Tìm component key trong dynamic mapping
      const componentKey = Object.keys(dynamicMapping).find((key) => {
        const mapping = dynamicMapping[key];
        if (Array.isArray(mapping.componentPattern)) {
          return mapping.componentPattern.some((pattern: string) =>
            highlightedComponent.includes(pattern)
          );
        }
        return highlightedComponent.includes(
          mapping.componentPattern as string
        );
      });

      if (componentKey) {
        // Kiểm tra trong modelMapping trước
        const mappedProduct = modelMapping[highlightedComponent];
        if (mappedProduct) {
          return mappedProduct.productName === itemName;
        }

        // Nếu không có trong modelMapping, kiểm tra trong initialDynamicMapping
        const initialMappedProduct =
          initialDynamicMapping[componentKey]?.productName;
        if (initialMappedProduct?.length > 0) {
          return initialMappedProduct.includes(itemName);
        }

        // Nếu chưa có mapping nào, kiểm tra theo static mapping
        const staticMapping = getComponentProductMapping(dimensions).find(
          (mapping) => {
            if (Array.isArray(mapping.componentPattern)) {
              return (
                mapping.componentPattern.some((pattern) =>
                  highlightedComponent.includes(pattern)
                ) &&
                (Array.isArray(mapping.productName)
                  ? mapping.productName.includes(itemName)
                  : mapping.productName === itemName)
              );
            }
            return (
              highlightedComponent.includes(mapping.componentPattern) &&
              (Array.isArray(mapping.productName)
                ? mapping.productName.includes(itemName)
                : mapping.productName === itemName)
            );
          }
        );

        return Boolean(staticMapping);
      }

      return false;
    },
    [dimensions, highlightedComponent, dynamicMapping, modelMapping]
  );

  const handleClickReplace: ReplaceHandler = useCallback(
    (product) => {
      if (!product) {
        return;
      }

      try {
        // Get the stored event data from the last model click
        const lastEventData = componentDataRef.current;
        const componentName = lastEventData?.componentName;

        // Lưu trạng thái vào store
        productStore.getState().setActiveProduct(product);

        emitter.emit(THREE_EVENTS.replaceModule, {
          product,
          kitchenComponents: lastEventData?.kitchenComponents || [],
          component: lastEventData?.component,
          highlightedComponents: lastEventData?.highlightedComponents || [],
          componentName: lastEventData?.componentName,
          matchingComponents: lastEventData?.matchingComponents || [],
        });

        if (isMobile && onCloseDrawer) {
          onCloseDrawer();
        }
      } catch (error) {
        console.error('Error in handleClickReplace:', error);
      }
    },
    [isMobile, onCloseDrawer]
  );

  const handleClickAway = () => {
    if (openTooltip) {
      setOpenTooltip(false);
      setActiveProduct(null);
    }
  };

  const handleTooltipClick = (event: React.MouseEvent) => {
    // Prevent click from closing the tooltip
    event.stopPropagation();
  };

  const renderActionPosition = () => {
    const isActive = openTooltip && isLoading;

    if (listCart.length == 0) {
      if (replay) {
        return (
          <ActionButton
            onClick={() => !isLoading && handleClickReplace(item)}
            isLoading={isActive}
            label="REPLACE "
            active={isActive}
            isEmptyCart={true}
            disabled={isDisabled || undefined}
          />
        );
      }

      return null;
    }
    switch (replay) {
      case 'replay':
        return (
          <ActionButton
            onClick={() => !isLoading && handleClickReplace(item)}
            isLoading={isActive}
            label="REPLACE"
            active={isActive}
            disabled={isDisabled || undefined}
          />
        );

      default:
        return null;
    }
  };

  const handleClick = useCallback(() => {
    if (isDisabled) return;

    const componentName = componentDataRef.current?.componentName;
    if (componentName && modelMapping[componentName]) {
      const mappedProduct = modelMapping[componentName];
      if (mappedProduct.productName !== item.name) {
        return;
      }
    }

    setLoading(true);
    setActiveProduct(item);

    if (onCloseDrawer) {
      onCloseDrawer();
    }

    Promise.resolve().then(() => {
      if (!showOnceModels && listCart.length !== 0) {
        setShowGuideLineModels(true);
      }
      setShowTemplateModal(false);
    });
  }, [
    isDisabled,
    item,
    onCloseDrawer,
    showOnceModels,
    listCart.length,
    setLoading,
    setActiveProduct,
    setShowGuideLineModels,
    setShowTemplateModal,
  ]);

  const handleDragStart = (e: React.DragEvent) => {
    e.dataTransfer.setData('product', JSON.stringify(item));
    e.dataTransfer.effectAllowed = 'move';
  };

  useEffect(() => {
    if (dimensions?.totalWidthMm) {
      const shouldDisable =
        (Math.abs(dimensions.totalWidthMm) <= 709 &&
          item.name === 'Kitchen Cupboard Double Door') ||
        (Math.abs(dimensions.totalWidthMm) <= 821 &&
          item.name === 'Kitchen Cabinet Double Door') ||
        (Math.abs(dimensions.totalWidthMm) >= 709 &&
          item.name === 'Kitchen Cupboard Single Door') ||
        (Math.abs(dimensions.totalWidthMm) >= 821 &&
          item.name === 'Kitchen Cabinet Single Door');

      if (Boolean(disabledItems[item.id]) !== shouldDisable) {
        setDisabledItem(item.id.toString(), shouldDisable);
      }
    }
  }, [
    dimensions?.totalWidthMm,
    item.name,
    item.id,
    setDisabledItem,
    disabledItems,
  ]);

  return isMobile ? (
    <Grid2
      size={6}
      sx={{
        height: 'max-content',
        '.MuiPaper-root ': {
          padding: '0px',
          height: 'max-content',
          boxShadow: 'none !important',
        },
      }}
    >
      <Accordion
        onClick={(event: React.MouseEvent) => {
          handleTooltipClick(event);
          setActiveProduct(item);
        }}
        expanded={openTooltip && activeProduct == item}
        id={`${item?.id}`}
        sx={{ '.MuiPaper-root ': { padding: '0px', height: 'max-content' } }}
      >
        <Accordion>
          <Box
            sx={{ background: '#EFEFEF', paddingTop: '4px' }}
            onClick={() => {
              setOpenTooltip(true);
            }}
          >
            {activeStore != null &&
              activeStore.tenant.settings.showPrice == true && (
                <Typography
                  sx={{
                    ...itemPriceStyle,
                    fontSize: '12px',
                    width: 'max-content',
                    padding: '4px 5px',
                    borderRadius: '2px',
                    marginLeft: 'auto',
                  }}
                >
                  {item?.price != 0
                    ? formatInputCurrency(
                        item?.price.toString() ?? '',
                        '$',
                        false
                      )
                    : ''}
                </Typography>
              )}
            <Box sx={{}}>
              <Box
                sx={{
                  width: '100%',
                  margin: '8px',
                  display: 'flex',
                  flexDirection: 'column',
                  cursor: 'pointer',
                  '.MuiBox-root': {
                    margin: '0px !important',
                  },
                  '&.MuiBox-root': {
                    margin: '0px !important',
                  },
                  paddingBottom: '15px',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <img
                    src={buildThumbnailPath(item.path!, item.thumbnail!)}
                    alt=""
                    width={120}
                    height={120}
                  />
                </div>
              </Box>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  overflow: 'hidden',
                  padding: '10px 12px',
                  background: 'white',
                }}
              >
                <Typography
                  sx={{
                    ...itemTextStyle,
                    display: ' -webkit-box',
                    WebkitLineClamp: '2 !important',
                    WebkitBoxOrient: 'vertical',
                    textOverflow: ' ellipsis',
                    overflow: 'hidden',
                    padding: 0,
                    fontWeight: '600',
                  }}
                >
                  {item.name}
                </Typography>
              </div>
            </Box>
          </Box>
        </Accordion>
        <AccordionDetails sx={{ padding: '0 !important' }}>
          <div
            onClick={() => setActiveProduct(item)}
            style={{
              marginBottom: '6px',
              padding: '0 8px',
              display: 'flex',
              flexDirection: 'row',
              overflow: 'hidden',
              justifyContent: 'space-between',
            }}
          >
            {renderActionPosition()}
          </div>
        </AccordionDetails>
      </Accordion>
    </Grid2>
  ) : (
    <>
      <ClickAwayListener
        onClickAway={handleClickAway}
        touchEvent={'onTouchEnd'}
        mouseEvent={'onMouseDown'}
      >
        <Box
          className="__gridItem"
          sx={{
            background: 'white',
            position: 'relative',
            cursor: isDisabled ? 'not-allowed' : 'pointer',
            width: 'calc(33.33% - 10px)',
            margin: 0,
            overflow: 'hidden',
            borderRadius: '4px',
            minWidth: '180px',
            flex: '0 0 calc(33.33% - 10px)',
            '&.MuiPaper-root': { boxShadow: 'none !important' },
            opacity: isDisabled ? 0.5 : 1,
            transition: 'all 0.3s ease',
            ...(shouldHighlightBorder(item.name) && {
              border: '2px solid #3692CF !important',
              boxShadow: '0 0 8px rgba(54, 146, 207, 0.5)',
              transform: 'scale(1.02)',
            }),
          }}
          onClick={handleClick}
          draggable
          onDragStart={handleDragStart}
        >
          {isDisabled && (
            <Box
              sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                zIndex: 2,
                color: '#4CAF50',
                fontWeight: 'bold',
                textAlign: 'center',
                width: '100%',
                padding: '10px',
                backgroundColor: 'rgba(255, 255, 255, 0.8)',
                fontSize: '12px'
              }}
            >
              {dimensions?.totalWidthMm && Math.abs(dimensions.totalWidthMm) <= 709 && item.name === 'Kitchen Cupboard Double Door' && 'Kitchen Cupboard Single Door'}
              {dimensions?.totalWidthMm && Math.abs(dimensions.totalWidthMm) <= 821 && item.name === 'Kitchen Cabinet Double Door' && 'Kitchen Cabinet Single Door'}
              {dimensions?.totalWidthMm && Math.abs(dimensions.totalWidthMm) >= 709 && item.name === 'Kitchen Cupboard Single Door' && 'Kitchen Cupboard Double Door'}
              {dimensions?.totalWidthMm && Math.abs(dimensions.totalWidthMm) >= 821 && item.name === 'Kitchen Cabinet Single Door' && 'Kitchen Cabinet Double Door'}
            </Box>
          )}
          <Tooltip
            onClick={(event: React.MouseEvent) => {
              handleTooltipClick(event);
              setActiveProduct(item);
            }}
            onClose={() => setOpenTooltip(false)}
            placement="right-start"
            disableFocusListener
            disableHoverListener
            disableTouchListener
            componentsProps={{
              tooltip: {
                sx: {
                  margin: '0 !important',
                  width: '100%',
                  maxWidth: '400px',
                  background: '#7F7F7F',
                  backgroundColor: '#7F7F7F',
                  color: 'white',
                  border: '1px solid #82996D',
                },
              },
            }}
            open={openTooltip && activeProduct == item}
            sx={{
              opacity: 1,
            }}
            title={
              <Box
                sx={{
                  width: '280px',
                  margin: '8px',
                  position: 'relative',
                  padding: '4px 0',
                  paddingBottom: '30px',
                }}
              >
                <Typography
                  sx={{
                    fontSize: '16px',
                    fontWeight: '500',
                    lineHeight: '1.1',
                  }}
                >
                  {item.name}
                </Typography>
                <Typography
                  sx={{
                    marginTop: '6px',
                    fontSize: '14px',
                    lineHeight: '24px',
                    overflow: 'hidden',
                    display: '-webkit-box',
                    '-webkit-line-clamp': 2,
                    lineClamp: 2,
                    '-webkit-box-orient': ' vertical',
                    height: '54px',
                  }}
                >
                  {item.description}
                </Typography>
                <Typography
                  onClick={() => setShowHideModal(true)}
                  sx={{
                    marginTop: '4px',
                    fontSize: '14px',
                    lineHeight: '1.3',
                    fontWeight: '600',
                    textDecoration: 'underline',
                    cursor: 'pointer',
                    position: 'absolute',
                    left: '0px',
                    bottom: '0px',
                  }}
                >
                  View more
                </Typography>
                <CloseRoundedIcon
                  onClick={() => handleClickAway()}
                  sx={{
                    color: 'white',
                    position: 'absolute',
                    top: '-5px',
                    right: '-10px',
                    background: 'transparent',
                    borderRadius: '50px',
                  }}
                />
              </Box>
            }
          >
            <Accordion
              expanded={openTooltip && activeProduct == item}
              id={`${item?.id}`}
            >
              <Accordion>
                <Box
                  sx={{ background: '#EFEFEF', paddingTop: '4px' }}
                  onClick={() => {
                    setOpenTooltip(true);
                  }}
                >
                  {activeStore != null &&
                    activeStore.tenant.settings.showPrice == true && (
                      <Typography
                        sx={{
                          ...itemPriceStyle,
                          fontSize: '12px',
                          width: 'max-content',
                          padding: '4px 5px',
                          borderRadius: '2px',
                          marginLeft: 'auto',
                        }}
                      >
                        {item?.price != 0
                          ? formatInputCurrency(
                              item?.price.toString() ?? '',
                              '$',
                              false
                            )
                          : ''}
                      </Typography>
                    )}
                  <Box sx={{}}>
                    <Box
                      sx={{
                        width: '100%',
                        margin: '8px',
                        display: 'flex',
                        flexDirection: 'column',
                        cursor: 'pointer',
                        '.MuiBox-root': {
                          margin: '0px !important',
                        },
                        '&.MuiBox-root': {
                          margin: '0px !important',
                        },
                        paddingBottom: '15px',
                      }}
                    >
                      <div
                        style={{
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}
                      >
                        <img
                          src={buildThumbnailPath(item.path!, item.thumbnail!)}
                          alt=""
                          width={120}
                          height={120}
                        />
                      </div>
                    </Box>
                    <div
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        overflow: 'hidden',
                        padding: '10px 12px',
                        background: 'white',
                      }}
                    >
                      <Typography
                        sx={{
                          ...itemTextStyle,
                          display: ' -webkit-box',
                          WebkitLineClamp: '2 !important',
                          WebkitBoxOrient: 'vertical',
                          textOverflow: ' ellipsis',
                          overflow: 'hidden',
                          padding: 0,
                          fontWeight: '600',
                        }}
                      >
                        {item.name}
                      </Typography>
                    </div>
                  </Box>
                </Box>
              </Accordion>

              <AccordionDetails sx={{ padding: '0 !important' }}>
                <div
                  onClick={() => setActiveProduct(item)}
                  style={{
                    marginBottom: '6px',
                    padding: '0 8px',
                    display: 'flex',
                    flexDirection: 'row',
                    overflow: 'hidden',
                    justifyContent: 'space-between',
                  }}
                >
                  {renderActionPosition()}
                </div>
              </AccordionDetails>
            </Accordion>
          </Tooltip>
        </Box>
      </ClickAwayListener>
      {!isMobile && (
        <Modal
          open={openModalProduct}
          onClose={() => setShowHideModal(false)}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          sx={{
            '.MuiBackdrop-root': {
              background: '#211d1e1c',
            },
          }}
        >
          <Box sx={styleModalProduct}>
            <Typography
              sx={{
                fontSize: '26px',
                fontWeight: 600,
                display: 'flex',
                alignItems: 'center',
              }}
              className={'desc-modal'}
            >
              {item?.name ?? ''}
              <CloseRoundedIcon
                onClick={() => setShowHideModal(false)}
                sx={{
                  color: 'white',
                  marginLeft: 'auto',
                  cursor: 'pointer',
                  width: '34px',
                  height: '34px',
                }}
              />
            </Typography>
            <Grid2 container>
              <Grid2 size={{ desktop: 4 }}>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: '15px',
                  }}
                >
                  <img
                    src={buildThumbnailPath(item?.path!, item?.thumbnail!)}
                    alt=""
                    width={'100%'}
                  />
                </div>
              </Grid2>
              <Grid2 size={{ desktop: 8 }}>
                <Typography id="modal-modal-description">
                  {item?.description ?? ''}
                </Typography>
              </Grid2>
            </Grid2>
          </Box>
        </Modal>
      )}
    </>
  );
}

// Common button styles extracted
const buttonStyles = {
  ...styleButtonMobile,
  fontSize: '11px',
  padding: '6px 16px',
  // maxWidth: 'max-content',
  width: '48%',
  maxWidth: 'none',
  background: 'white',
  ':hover': {
    background: 'black',
    color: 'white',
  },
  ':active': {
    background: 'black',
    color: 'white',
  },
  ':focus': {
    background: 'white',
    color: 'black',
  },
  margin: 0,
};

// Reusable button component
interface ActionButtonProps {
  onClick: () => void;
  isLoading: boolean;
  label: string;
  active: boolean;
  isFullWidth?: boolean;
  isEmptyCart?: boolean;
  disabled?: boolean;
}

export const ActionButton = ({
  onClick,
  isLoading,
  label,
  active,
  isFullWidth = true,
  isEmptyCart,
  disabled,
}: ActionButtonProps) => (
  <Button
    sx={{
      ...buttonStyles,
      width: isFullWidth ? '100%' : '48%',
      color: disabled ? '#ccc' : '#3692CF',
      border: `1px solid ${disabled ? '#ccc' : '#3692CF'}`,
      cursor: disabled ? 'not-allowed' : 'pointer',
      '&:hover': {
        background: disabled ? 'white' : 'black',
        color: disabled ? '#ccc' : 'white',
      },
    }}
    onClick={onClick}
    disabled={isLoading || disabled}
  >
    {active && isLoading ? (
      <CircularProgress size={16} color="success" />
    ) : (
      label
    )}
  </Button>
);
