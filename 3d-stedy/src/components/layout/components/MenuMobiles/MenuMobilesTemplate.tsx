import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { HighlightManager } from '@/components/threejs/indoor-kitchen/templates/components/highlight/HighlightManager';
import { LIST_SORT_TYPE, LIST_TEMPLATE_MOBILE } from '@/configs/constant';
import { CATEGORY } from '@/configs/constant';
import {
  drawerStore,
  productStore,
  useBrandStore,
  useCategoriesStore,
  useHighlightStore,
} from '@/store';
import { ChoseModelShowCategory } from '@/store/ShowCategoryModel';
import { GuideLineStore } from '@/store/storeGuideline';
import { useKitchenStore } from '@/store/useKitchenStore';
import theme from '@/themes';
import { THREE_EVENTS, emitter } from '@/utils/events';
import {
  Box,
  Button,
  Drawer,
  Grid2,
  Tab,
  Tabs,
  useMediaQuery,
} from '@mui/material';
import { memo, useEffect, useState } from 'react';
import CustomBreadcrumbs from '../CustomBreadcrumbs';
import DimensionTemplate from '../DimensionTemplate';
import DrawerComponentMobile from './DrawerComponentMobile';
import DrawerDimensionMobile from './DrawerDimensionMobile';
import DrawerSortMobile from './DrawerSortMobile';
import SearchInput from '../SearchInput';
import { buttonSort } from './style';
import GridItem, { ActionButton } from '../GridItemIndo';
import { Spinner } from '@/components/spinner';
import NotFound from '../NotFound';
import CategoriesIndo from '../CategoriesIndo';

const MenuMobilesTemplate: React.FC = memo(
  ({ selectedCategory }: { selectedCategory?: string }) => {
    const isMobile = useMediaQuery(theme.breakpoints.down('tablet'));
    const [viewType, setViewType] = useState<string>('grid');
    const [openSortPrice, setOpenSortPrice] = useState<boolean>(false);
    const [openCategories, setOpenCategories] = useState<boolean>(false);

    const [category, setCategory] = useState<string>('product');
    const [showBorder, setShowBorder] = useState(false);
    const [activeTab, setActiveTab] = useState<string>('dimension');
    const { showOnceModels, setShowGuideLineModels } = GuideLineStore();
    const { openDrawer, toggleDrawer, openHandleDrawer } = drawerStore();
    const { setHighlightedMesh } = useHighlightStore();
    const { toggleModel } = ChoseModelShowCategory();
    const { orderType, changeOrderType } = productStore();
    const ChoseModelShowCategory1 = ChoseModelShowCategory();
    const { dataCategories } = useCategoriesStore();
    const { activeSeries, activeTemplate, setShowTemplateModal } =
      useBrandStore();
    const {
      isLoadingFetchProduct,
      listCart,
      filterProductsByCategory,
      categoryId,
      listFilteredProducts,
    } = productStore();

    const { kitchenWidth } = useKitchenStore();

    const handleViewTypeChange = () =>
      setViewType(viewType === 'grid' ? 'list' : 'grid');

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
      setActiveTab(newValue);
    };
    const toggleSortPrice = () => setOpenSortPrice((prev) => !prev);

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
        console.log(selectedCategory, activeTemplate?.id);
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
    // console.log(listFilteredProducts);
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
      <>
        {activeTemplate && (
          <Box sx={{ padding: '8px 16px' }}>
            <CustomBreadcrumbs />
          </Box>
        )}
        <Tabs
          value={activeTab}
          onChange={handleChange}
          textColor="secondary"
          indicatorColor="secondary"
          className="__tabMenu_mobile"
          sx={{
            width: '100vw',
            background: 'white',
            minHeight: isMobile ? 'unset !important' : '48px',
            height: isMobile ? 'max-content' : '',
            zIndex: 99,
            'button:focus': { outline: 'none', border: 'none' },
            '.MuiTabs-flexContainer': {
              alignItems: 'center',
              height: isMobile ? 'max-content' : '48px',
              padding: '0 16px',
            },
            '.MuiTabs-scroller': {
              height: isMobile ? 'max-content' : '48px',
            },
            '.Mui-selected': {
              color: 'white !important',
              background: '#4A4747 !important',
              borderTopLeftRadius: '6px',
              borderTopRightRadius: '6px',
            },
            '.MuiTabs-indicator': {
              backgroundColor: 'transparent',
            },
            button: {
              minHeight: isMobile ? 'unset !important' : '48px',
              height: isMobile ? '40px' : '',
              fontSize: '13px',
            },
          }}
        >
          {LIST_TEMPLATE_MOBILE.map(({ name, type }, index) => (
            <Tab
              key={index}
              iconPosition="start"
              disableRipple
              sx={{
                width: '50%',
                color: 'black',
                fontSize: '15px',
                opacity: 1,
              }}
              value={type.toLowerCase()}
              label={name}
              onClick={() => {
                setActiveTab(type.toLowerCase());
                openHandleDrawer();
              }}
            />
          ))}
        </Tabs>
        <DrawerComponentMobile
          open={openDrawer && activeTab == 'component'}
          handleToggle={() => toggleDrawer()}
          openSort={() => {}}
        >
          <>
            {ChoseModelShowCategory1.categories.length > 0 && (
              <Box sx={{ padding: '0px' }}>
                <SearchInput
                  sx={{
                    margin: '20px 0px 20px',
                    background: 'white',
                  }}
                />
                <Box sx={{ display: 'none' }}>
                  <CategoriesIndo
                    selectedCategory={ChoseModelShowCategory1.categories}
                  />
                </Box>
                <Box sx={{ display: 'flex' }}>
                  {openDrawer && category === 'product' && (
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        marginBottom: '8px',
                        width: '100%',
                      }}
                    >
                      <Button
                        sx={{ ...buttonSort, marginRight: 'auto' }}
                        disableRipple={true}
                        onClick={() => setOpenCategories(true)}
                      >
                        {categoryId} <ArrowDropDownIcon />
                      </Button>
                      <img
                        onClick={() => {
                          setOpenSortPrice(true);
                        }}
                        src="/icons/icon-filter.png"
                        alt={'filter'}
                        width={24}
                        height={24}
                        style={{ marginLeft: 'auto', marginRight: '16px' }}
                      />
                      {/* <Box
                        sx={{ cursor: 'pointer', display: 'flex' }}
                        onClick={() => handleViewTypeChange()}
                      >
                        <img
                          src={`/icons/icon-${viewType}.png`}
                          alt={viewType}
                          width={24}
                          height={24}
                        />
                      </Box> */}
                    </Box>
                  )}
                </Box>
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
                    <Grid2
                      spacing={2}
                      container
                      className="__tabProductContainer"
                      sx={{
                        maxHeight: 'calc(40vh - 140px)',
                        overflowY: 'auto',
                        display: 'flex',
                        // alignItems: 'flex-start',
                        // justifyContent: 'space-between',
                        // margin: '0 auto',
                        flexWrap: 'wrap',
                        width: '100%',
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
                              .filter((item) =>
                                item.path.includes(
                                  'Intero/GalleyTemplateA/Components/'
                                )
                              )
                              .map((item, index) => (
                                <GridItem
                                  key={`${item.name}-${index}`}
                                  item={item}
                                  replay="replay"
                                />
                              ))
                          : listFilteredProducts
                              .filter(
                                (item) =>
                                  item.path.includes(
                                    'Intero/GalleyTemplateB/Components/'
                                  ) ||
                                  item.path.includes(
                                    'Intero/GalleyTemplateA/Components/Island/'
                                  )
                              )
                              .map((item, index) => (
                                <GridItem
                                  key={`${item.name}-${index}`}
                                  item={item}
                                  replay="replay"
                                />
                              )))}
                    </Grid2>
                    {listFilteredProducts.length === 0 && <NotFound />}
                  </Spinner>
                )}
              </Box>
            )}
          </>
        </DrawerComponentMobile>
        <DrawerDimensionMobile
          open={openDrawer && activeTab == 'color'}
          handleToggle={() => toggleDrawer()}
          openSort={() => {}}
        />
        <Drawer
          anchor="bottom"
          open={openDrawer && activeTab == 'dimension'}
          onClose={() => toggleDrawer()}
          sx={{
            zIndex: 9999999999,
            '.MuiPaper-root': {
              height: '70vh',
              padding: '8px 16px',
              borderTopLeftRadius: '6px',
              borderTopRightRadius: '6px',
            },
          }}
        >
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <DimensionTemplate />
          </Box>
        </Drawer>
        <DrawerSortMobile
          title="Sort By"
          listSortItems={LIST_SORT_TYPE}
          open={openSortPrice}
          handleClick={toggleSortPrice}
          activeItem={orderType}
          changeOrderType={changeOrderType}
          onClose={() => setOpenSortPrice(false)}
        />
        <Drawer
          anchor="bottom"
          open={openCategories}
          onClose={() => setOpenCategories(false)}
          sx={{
            zIndex: 9999999999,
            '.MuiPaper-root': {
              height: '40vh',
              padding: '24px 16px',
              borderTopLeftRadius: '6px',
              borderTopRightRadius: '6px',
            },
          }}
        >
          <Grid2 container spacing={1}>
            {dataCategories
              ?.filter((item) =>
                ChoseModelShowCategory1.categories.includes(item.id)
              )
              .map((item, index) => {
                return (
                  <Grid2
                    size={{ mobile: 4 }}
                    sx={{
                      overflow: 'hidden',
                      fontSize: '12px',
                      fontWeight: '500',
                      textTransform: 'uppercase',
                      padding: '11px 8px',
                      alignItems: 'center',
                      gap: '8px',
                      background:
                        categoryId === item.id ? '#F5F5F5' : 'transparent',
                      margin: '4px 0',
                      backgroundColor:
                        item?.id == categoryId ? '#4A4747' : 'white',
                      color: item?.id == categoryId ? 'white' : 'black',
                      display: 'flex',
                      flexDirection: 'column',
                      border: '1px solid #e1e1e1',
                      borderRadius: '8px',
                    }}
                    onClick={() => {
                      filterProductsByCategory(item.id, activeSeries?.id);
                      openCategories && setOpenCategories(false);
                    }}
                  >
                    <img
                      src={
                        item.thumbnail != null
                          ? item?.id == categoryId
                            ? `/${(item.thumbnail ?? '').replace('.svg', '-white.svg')}`
                            : `/${item.thumbnail}`
                          : `/icons/category/${item.thumbnail} `
                      }
                      alt={item.name}
                      width={40}
                      height={40}
                    />
                    {item.name}
                  </Grid2>
                );
              })}
          </Grid2>
        </Drawer>
      </>
    );
  }
);

export default MenuMobilesTemplate;
