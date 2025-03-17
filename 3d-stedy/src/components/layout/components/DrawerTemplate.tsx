import {
  drawerStore,
  productStore,
  useBrandStore,
  useHighlightStore,
} from '@/store';
import { GuideLineStore } from '@/store/storeGuideline';
import { emitter, THREE_EVENTS } from '@/utils/events';

import { Box, Button, IconButton, Tabs, Typography } from '@mui/material';
import Tab from '@mui/material/Tab';
import * as React from 'react';
import { useEffect, useState } from 'react';

import { CATEGORY } from '@/configs/constant';
import { ChoseModelShowCategory } from '@/store/ShowCategoryModel';

import { Spinner } from '../../spinner/index';
import SearchInput from '../components/SearchInput';
import CategoriesIndo from './CategoriesIndo';
import ColorPalette from './ColorPalette';
import ColourTemplate, { TabPanel } from './ColourTemplate';
import CustomBreadcrumbs from './CustomBreadcrumbs';
import DimensionTemplate from './DimensionTemplate';
import GridItem, { ActionButton } from './GridItemIndo';
import NotFound from './NotFound';
import SortAndViewOptions from './SortAndViewOptions';
import { Drawer, DrawerHeader, drawerStyles, iconButtonStyles } from './styles';
import iconDrawer from '/icons/ic_drawer.svg';
import { useKitchenStore } from '@/store/useKitchenStore';
import { HighlightManager } from '@/components/threejs/indoor-kitchen/templates/components/highlight/HighlightManager';
import { ProductEntity } from '@/types/model';
import  SkinTemplate  from './SkinTemplate';
type DrawerCustomProps = {
  selectedCategory?: string;
};

const DrawerTemplate: React.FC<DrawerCustomProps> = React.memo(
  ({ selectedCategory }) => {
    const [category, setCategory] = useState<string>('product');
    const [showBorder, setShowBorder] = useState(false);
    const [activeTab, setActiveTab] = useState<string>('dimension');
    const { showOnceModels, setShowGuideLineModels } = GuideLineStore();
    const { openDrawer, toggleDrawer, changeTypeStyle } = drawerStore();
    const { setHighlightedMesh } = useHighlightStore();
    const { toggleModel } = ChoseModelShowCategory();

    const ChoseModelShowCategory1 = ChoseModelShowCategory();

    const {
      isLoadingFetchProduct,
      categoryId,
      listFilteredProducts,
      listCart,
      filterProductsByCategory,
    } = productStore();

    const { activeTemplate, setShowTemplateModal } = useBrandStore();
    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
      setActiveTab(newValue);
    };
    const { kitchenWidth } = useKitchenStore();
    const onChangeTypeStyle = (child: string) => {
      changeTypeStyle(child);
    };

    const handleAnimationAddRangeHood = () => {
      setCategory('product');
      setShowBorder(true);
      // Set border to false after 300ms
      setTimeout(() => {
        setShowBorder(false);
      }, 300);
    };

    useEffect(() => {
      emitter.on(
        THREE_EVENTS.animationAddRangeHood,
        handleAnimationAddRangeHood
      );
      return () => {
        emitter.off(
          THREE_EVENTS.animationAddRangeHood,
          handleAnimationAddRangeHood
        );
      };
    }, []);

    useEffect(() => {
      if (selectedCategory) {
        filterProductsByCategory(selectedCategory, activeTemplate?.id);
      }
    }, [selectedCategory, activeTemplate?.id]);

    useEffect(() => {
      if (ChoseModelShowCategory1.categories.length > 0) {
        setActiveTab('component');
        setCategory('product');
      } else {
        // Luôn chuyển về tab dimension nếu không có categories
        setActiveTab('dimension');
      }
    }, [ChoseModelShowCategory1.categories]);

    useEffect(() => {
      const handleSequentialSteps = async () => {
        try {
          // Bước 1: Chuyển đến tab color
          setActiveTab('color');

          await new Promise((resolve) => setTimeout(resolve, 100));

          // Bước 2: Chuyển đến style
          emitter.emit(THREE_EVENTS.SWITCH_TO_BACKWALL_TAB);
        } catch (error) {
          console.error('Lỗi khi thực hiện các bước:', error);
        }
      };

      emitter.on(THREE_EVENTS.SEQUENTIAL_STEPS, handleSequentialSteps);

      return () => {
        emitter.off(THREE_EVENTS.SEQUENTIAL_STEPS, handleSequentialSteps);
      };
    }, []);
    useEffect(() => {
      const handleSequentialSteps = async () => {
        try {
          // Bước 1: Chuyển đến tab color
          setActiveTab('color');
          await new Promise((resolve) => setTimeout(resolve, 100));
          emitter.emit(THREE_EVENTS.SWITCH_TO_BACK_FLASH_TAB);
        } catch (error) {
          console.error('Lỗi khi thực hiện các bước:', error);
        }
      };

      emitter.on(
        THREE_EVENTS.SWITCH_TO_BACKWALL_TAB_AND_BACK_FLASH_TAB,
        handleSequentialSteps
      );

      return () => {
        emitter.off(
          THREE_EVENTS.SWITCH_TO_BACKWALL_TAB_AND_BACK_FLASH_TAB,
          handleSequentialSteps
        );
      };
    }, []);
    useEffect(() => {
      emitter.on(THREE_EVENTS.SWITCH_TO_COLOR_TAB, () => {
        setActiveTab('color');
      });
      return () => {
        emitter.off(THREE_EVENTS.SWITCH_TO_COLOR_TAB, () => {
          setActiveTab('color');
        });
      };
    }, []);

    useEffect(() => {
      // Reset highlight and category when drawer is closed
      if (!openDrawer) {
        setHighlightedMesh(null);
        toggleModel([]);

        // Reset highlights using HighlightManager
        const highlightManager = HighlightManager.getInstance();
        highlightManager.clearAllHighlights();
      }
    }, [openDrawer]);

    useEffect(() => {
      const handleKeyPress = (event: KeyboardEvent) => {
        if (event.key === 'Escape') {
          toggleDrawer();
        }
      };

      window.addEventListener('keydown', handleKeyPress);

      return () => {
        window.removeEventListener('keydown', handleKeyPress);
      };
    }, [toggleDrawer]);

    const handleCloseDrawer = () => {
      toggleDrawer();
      toggleModel([]); // Reset categories
      setHighlightedMesh(null); // Reset highlight state

      // Reset highlights using HighlightManager
      const highlightManager = HighlightManager.getInstance();
      highlightManager.clearAllHighlights();

      if (!showOnceModels && listCart.length !== 0) {
        setShowGuideLineModels(true);
      }
    };

    return (
      <Drawer
        variant="permanent"
        open={openDrawer}
        sx={{ 
          ...drawerStyles, 
          padding: '0px',
          transition: openDrawer ? 'none' : 'all 0.6s ease-in-out',
          '& .MuiDrawer-paper': {
            transition: openDrawer ? 'none' : 'all 0.6s ease-in-out',
            backgroundColor: openDrawer ? 'white' : 'rgba(255, 255, 255, 0.3)',
            '& > *': {
              color: '#2D3B2D',
              opacity: '1 !important'
            }
          }
        }}
      >
        <DrawerHeader
          sx={{
            marginTop: '12px',
            border: 'none',
            background: 'transparent',
            padding: 0,
            minHeight: 'unset',
            justifyContent: 'start',
          }}
        >
          {openDrawer && activeTemplate && <CustomBreadcrumbs />}
          <IconButton
            disableRipple={true}
            onClick={handleCloseDrawer}
            sx={{
              ...iconButtonStyles,
              margin: openDrawer ? '0 0 0 auto' : 'auto',
              paddingRight: openDrawer ? '0px' : '8px',
            }}
          ></IconButton>
        </DrawerHeader>
        <Box>
          {!openDrawer && (
            <Typography
            onClick={handleCloseDrawer}
              sx={{
                position: 'absolute',
                padding: '50px 8px ',
                right: '10px',
                height: 'max-content',
                top: 0,
                bottom: 0,
                marginTop: 'auto',
                marginBottom: 'auto',
                color: '#2D3B2D',
                fontSize: '18px',
                fontFamily: 'Century Gothic',
                lineHeight: '1.2',
                fontWeight: '400',
                textAlign: 'left',
                marginRight: '8px',
              }}
            >
               Components & 
              <br />
              Dimension
            </Typography>
          )}
          <IconButton
            className="__closeButton"
            disableRipple={true}
            onClick={handleCloseDrawer}
            sx={{
              position: 'absolute',
              padding: '20px 8px',
              background: '#4A4747',
              borderRadius: '6px',
              right: '-15px',
              height: 'max-content',
              top: 0,
              bottom: 0,
              marginTop: 'auto',
              marginBottom: 'auto',
              ':focus': {
                border: 'none',
                outline: 'none',
              },
            }}
          >
            <img
              src={iconDrawer}
              alt=""
              style={{
                transform: openDrawer ? '' : 'rotate(180deg)',
                color: 'white',
                height: '16px',
                width: 'auto',
              }}
            />
          </IconButton>
        </Box>
        {/* component */}
        {openDrawer && (
          <Box
            sx={{
              height: '100%',
              overflow: 'auto',
              '&::-webkit-scrollbar': {
                display: 'none',
              },
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
            }}
          >
            <Box sx={{ height: '100%', overflow: 'visible' }}>
              <Tabs
                className="__tabMenuContainer"
                value={activeTab}
                onChange={handleChange}
                sx={{
                  minHeight: '34px',
                  marginTop: '12px',
                  marginLeft: '24px',
                  height: 'max-content',
                  justifyContent: 'start',
                  color: '#ffffff',
                  '.MuiTabs-indicator': {
                    backgroundColor: 'transparent',
                  },
                  '.Mui-selected': {
                    color: '#ffffff !important',
                    backgroundColor: '#4a4747',
                  },
                  button: {
                    minHeight: 'unset',
                    padding: '8px 12px',
                    outline: 'none',
                    backgroundColor: '#e2e2e2',
                    marginRight: '8px',
                  },
                }}
              >
                {ChoseModelShowCategory1.categories.length > 0 && (
                  <Tab
                    className="__tabMenu"
                    disableRipple={true}
                    value="component"
                    label="COMPONENTS"
                  />
                )}
                <Tab disableRipple={true} value="dimension" label="DIMENSION" />
                <Tab disableRipple={true} value="color" label="COLOUR" />
                <Tab disableRipple={true} value="skin" label="Scheme" />
              </Tabs>

              <TabPanel
                sx={{ boxShadow: 0.5 }}
                initialValue="component"
                value={activeTab}
              >
                {ChoseModelShowCategory1.categories.length > 0 && (
                  <Box sx={{ padding: '0px 18px' }}>
                    <SearchInput
                      sx={{
                        margin: '20px 0px 20px',
                        padding: '0px 13px 0px 13px',
                        // background: 'red',
                      }}
                    />
                    <Box>
                      <CategoriesIndo
                        selectedCategory={ChoseModelShowCategory1.categories}
                      />
                    </Box>
                    {openDrawer && category === 'product' && (
                      <SortAndViewOptions />
                    )}
                    <Box
                      sx={{
                        marginTop: '10px',
                        overflow: 'scroll',
                        scrollbarWidth: 'none',
                        msOverflowStyle: 'none',
                        flexGrow: 1,
                        display: 'flex',
                        flexWrap: 'wrap',
                        position: 'relative',
                      }}
                    >
                      {openDrawer &&
                        category === 'product' &&
                        !listCart.some((p) => p.categoryId === CATEGORY.BBQ) &&
                        categoryId === CATEGORY.RANGE_HOOD && (
                          <Box
                            sx={{
                              position: 'absolute',
                              background: 'white',
                              opacity: 0.8,
                              width: '100%',
                              height: '100%',
                              zIndex: 9999,
                              display: 'flex',
                            }}
                          >
                            <Box
                              sx={{
                                position: 'absolute',
                                background: 'white',
                                opacity: 0.8,
                                width: '100%',
                                height: '100%',
                              }}
                            />
                            <Box
                              sx={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'start',
                                fontWeight: 'bold',
                                flexDirection: 'column',
                                margin: 'auto',
                              }}
                            >
                              <ActionButton
                                onClick={() =>
                                  filterProductsByCategory(
                                    CATEGORY.BBQ,
                                    activeTemplate?.id
                                  )
                                }
                                label="ADD BBQ"
                                isFullWidth={false}
                                isLoading={false}
                                active={false}
                              />
                            </Box>
                          </Box>
                        )}
                      {openDrawer && category === 'product' && (
                        <Spinner loading={isLoadingFetchProduct}>
                          <Box
                            className="__tabProductContainer"
                            sx={{
                              maxHeight: 'calc(100vh - 300px)',
                              overflowY: 'auto',
                              display: 'flex',
                              alignItems: 'flex-start',
                              justifyContent: 'flex-start',
                              margin: '0 auto',
                              flexWrap: 'wrap',
                              gap: '15px',
                              width: '100%',
                              padding: '15px',
                              border: showBorder
                                ? '3px solid red'
                                : '1px solid transparent',
                              transition: 'border 0.3s ease-in-out',
                              '&::-webkit-scrollbar': {
                                display: 'none',
                              },
                              scrollbarWidth: 'none',
                              msOverflowStyle: 'none',
                            }}
                          >
                            {listFilteredProducts.length > 0 &&
                              (kitchenWidth < 4000
                                ? listFilteredProducts
                                    .filter(
                                      (item) =>
                                        item.path.includes(
                                          'Intero/GalleyTemplateA/Components/'
                                        ) ||
                                        item.path.includes(
                                          'Intero/GalleyTemplateA/Floor/'
                                        )
                                    )
                                    .map(
                                      (item: ProductEntity, index: number) => (
                                        <GridItem
                                          key={`${item.name}-${index}`}
                                          item={item}
                                          replay="replay"
                                        />
                                      )
                                    )
                                : listFilteredProducts
                                    .filter(
                                      (item) =>
                                        item.path.includes(
                                          'Intero/GalleyTemplateB/Components/'
                                        ) ||
                                        item.path.includes(
                                          'Intero/GalleyTemplateA/Floor/'
                                        ) ||
                                        item.path.includes(
                                          'Intero/GalleyTemplateA/Components/Island/'
                                        )
                                    )
                                    .map(
                                      (item: ProductEntity, index: number) => (
                                        <GridItem
                                          key={`${item.name}-${index}`}
                                          item={item}
                                          replay="replay"
                                        />
                                      )
                                    ))}
                          </Box>
                          {listFilteredProducts.length === 0 && <NotFound />}
                        </Spinner>
                      )}
                      {openDrawer && category === 'style' && (
                        <Box
                          sx={{
                            flexGrow: 1,
                            overflow: 'scroll',
                            '&::-webkit-scrollbar': {
                              display: 'none',
                            },
                            scrollbarWidth: 'none',
                            msOverflowStyle: 'none',
                          }}
                        >
                          <ColorPalette />
                        </Box>
                      )}
                    </Box>
                  </Box>
                )}

                {ChoseModelShowCategory1.categories.length === 0 && (
                  <Box sx={{ padding: '24px 26px' }}>
                    {/* Xóa phần UI bật tắt model */}
                  </Box>
                )}
              </TabPanel>

              <TabPanel initialValue="dimension" value={activeTab}>
                <Box sx={{ paddingRight: '24px' }}>
                  <DimensionTemplate />
                </Box>
              </TabPanel>

              <TabPanel initialValue="color" value={activeTab}>
                <Box sx={{ paddingRight: '24px' }}>
                  <ColourTemplate />
                </Box>
              </TabPanel>

              <TabPanel initialValue="skin" value={activeTab}>
                <Box sx={{ paddingRight: '24px' }}>
                  <SkinTemplate />
                </Box>
              </TabPanel>
            </Box>
          </Box>
        )}
      </Drawer>
    );
  }
);

export default DrawerTemplate;

export const boxShadowAccordion = {
  boxShadow: '0px 3px 6px #00000029 !important',
};

export const buttonNoneForcus = {
  '&:focus': {
    outline: 'none',
    border: 'none',
  },
};
