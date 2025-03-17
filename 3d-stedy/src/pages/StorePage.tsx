import {
  GoogleReCaptcha,
  GoogleReCaptchaProvider,
} from 'react-google-recaptcha-v3';

import React, { useEffect, useState } from 'react';
import { DrawerCustom } from '@/components/layout/components';
import FooterCart from '@/components/layout/components/FooterCart';
import PopoverHelper from '@/components/layout/components/PopoverHelper';
import {
  Box,
  CssBaseline,
  Modal,
  SpeedDial,
  SpeedDialProps,
  styled,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { MainLayout } from '@/components/layout';
import MainMenu from '@/components/layout/components/MainMenu';
import { OutdoorKitchenWorld } from '@/components/threejs/outdoor-kitchen/OutdoorKitchenWorld';
import { IndoorKitchenWorld } from '@/components/threejs/indoor-kitchen/IndoorKitchenWorld';
import { useNavigate, useParams } from 'react-router-dom';
import MenuMobile from '@/components/layout/components/MenuMobiles/MenuMobiles';
import IconArrowNext from '/icons/icon-arrow-next.png';
import {
  drawerStore,
  useBrandStore,
  useCategoriesStore,
  useStyleStore,
} from '@/store';
import { productStore } from '@/store/storeProducts';
import { getStoreDetail } from '@/services';
import ModalSeries from '@/components/layout/components/ModalSeries';
import { useCheckoutStore } from '@/store/useCheckoutStore';
import { UseCustomer } from '@/store/useCustomer';
import CustomerInfoPage from './CustomerInfoPage';
import CheckoutPage from './CheckoutPage';
import { GuideLineUserDesktop } from '@/components/joyride/GuideLineUserDesktop';
import { GuideLineUserModelsDesktop } from '@/components/joyride/GuideLineUserModelsDesktop';
import { ACTION_CAPTCHA, KEY_CAPTCHA } from '@/configs/constant';
import { Helmet } from 'react-helmet';
import { isEmpty } from 'lodash';
import ModalTemplates from '@/components/layout/components/ModalTemplates';
import DrawerTemplate from '@/components/layout/components/DrawerTemplate';
import MenuMobilesTemplate from '@/components/layout/components/MenuMobiles/MenuMobilesTemplate';
import Kitchen from '@/components/layout/components/Kitchen';
import Galleyisland from '@/components/layout/components/Galleyisland';
import Backwall from '@/components/layout/components/Backwall';
import Floor from '@/components/layout/components/Floor';
import { useKitchenStore } from '@/store/useKitchenStore';
import PopoverHelperIndo from '@/components/layout/components/PopoverHelperIndo';
import Light from '@/components/layout/components/Light';
interface LocalState {
  direction: SpeedDialProps['direction'];
  isExpanded: boolean;
}
const StorePage: React.FC = () => {
  const { openHandleDrawer, closeDrawer } = drawerStore();
  const { tenantId, storeId } = useParams();
  const navigate = useNavigate();
  const theme = useTheme();
  const { fetchProducts, clearListCart } = productStore();
  const { fetchStyles } = useStyleStore();
  const { fetchCategories } = useCategoriesStore();
  const {
    activeStore,
    setActiveStore,
    setActiveSeries,
    isVisibleModalSeries,
    setIsVisibleModalSeries,
    showTemplateModal,
    setShowTemplateModal,
  } = useBrandStore();
  const { showCheckout, setShowCheckout } = useCheckoutStore();
  const { showCustomer, setShowCustomer } = UseCustomer();
  const isIndoorKitchen = activeStore && !isEmpty(activeStore.kitchenTemplates);
  const isInteroStore = tenantId === 'intero' || tenantId === 'intero-2';
  const {
    isBackwallDisabled,
    isBackwallVisible,
    setBackwallDisabled,
    setBackwallVisible,
    setKitchenDisabled,
    setGalleyislandDisabled,
  } = useKitchenStore();
  const hanldeGetStoreDetail = async () => {
    try {
      const data = await getStoreDetail(storeId as string);
      if (data) {
        // check show modal acitve series
        if (data?.series && data?.series?.length > 0) {
          setIsVisibleModalSeries(true);
        } else {
          fetchProducts(storeId as string);
          setIsVisibleModalSeries(false);
        }
        //reset state active series
        setActiveSeries(null);
        // set state active store
        setActiveStore(data);
      } else {
        // back to select store
        navigate(`/${tenantId}`);
      }
    } catch (e) {
      // Remove console.error
    }
  };

  // check store active
  useEffect(() => {
    // TODO check has template => Display TemplateModal
    if (isIndoorKitchen) {
      setShowTemplateModal(true);
    }

    if (activeStore?.id !== storeId) {
      hanldeGetStoreDetail();
    } else {
      //reset state active series
      setActiveSeries(null);
      // check show modal acitve series
      if (activeStore?.series && activeStore?.series?.length > 0) {
        setIsVisibleModalSeries(true);
      } else {
        fetchProducts(storeId as string);
        setIsVisibleModalSeries(false);
      }
    }
    clearListCart();
    setShowCheckout(false);
    setShowCustomer(false);
    // openHandleDrawer();
    closeDrawer();
  }, [activeStore, storeId]);

  // fetch category, product, style
  useEffect(() => {
    fetchCategories(tenantId as string);
    fetchStyles(tenantId as string);
  }, []);

  const [state, setState] = useState<LocalState>({
    direction: 'right',
    isExpanded: true,
  });
  const isMobile = useMediaQuery(theme.breakpoints.down('tablet'));
  const handleClick = () => {
    setState((prev) => ({
      ...prev,
      isExpanded: !prev.isExpanded,
    }));
  };
  return (
    <>
      <Helmet>
        <title>{activeStore?.tenant?.name}</title>
        <link
          rel="icon"
          type="image/svg+xml"
          href={activeStore?.tenant?.thumbnail}
        />
      </Helmet>
      <GoogleReCaptchaProvider
        reCaptchaKey={`${import.meta.env.VITE_RECAPTCHA_KEY}`}
      >
        <MainLayout>
          {!isMobile && <GuideLineUserDesktop />}
          {!isMobile && <GuideLineUserModelsDesktop />}
          {!isVisibleModalSeries && !showTemplateModal && isMobile && (
            <MainMenu>
              {isIndoorKitchen ? (
                // TODO Implement LEFT MENU UI for Indoor mobile
                <MenuMobilesTemplate />
              ) : (
                <MenuMobile />
              )}
            </MainMenu>
          )}

          <Box
            className="store-page"
            sx={{ height: '100%', overflow: 'hidden' }}
          >
            {!isInteroStore && <PopoverHelper />}
            {isInteroStore && (
              <>
                <Box
                  sx={{
                    ...styleHeaderBox,
                    zoom: isMobile ? 0.8 : 1,
                    top: isMobile ? '190px !important' : '80px',
                    display: isBackwallVisible ? 'block' : 'none',

                    '& .MuiSpeedDial-actions': {
                      position: 'static',
                      transform: 'none',
                      padding: '0 !important',
                      margin: '0 !important',
                      height: '40px',
                      alignItems: 'center',
                    },
                    'button.active': {
                      background: 'transparent',
                      img: {
                        filter: 'drop-shadow(0px 100px 0 #ffffff)',
                        transform: 'translateY(-100px)',
                      },
                    },
                      button: {
                        width: 40,
                        minWidth: 40,
                        height: 40,
                        overflow: 'hidden',
                        background: 'white',
                        ':hover': {
                          background: 'transparent',
                          img: {
                            filter: 'drop-shadow(0px 100px 0 #ffffff)',
                            transform: 'translateY(-100px)',
                          },
                        },
                        ':focus': {
                          border: 'none',
                          outline: 'none',
                        },
                        ':active': {
                          border: 'none',
                          outline: 'none',
                          boxShadow: 'none !important',
                        },
                        boxShadow: 'none !important',
                      },
                      background: 'white',
                    borderRadius: state.isExpanded ? '8px' : '8px',
                    padding: state.isExpanded ? '15px' : '0px',
                    margin: state.isExpanded ? '10px' : '0px',
                  }}
                >
                  <StyledSpeedDial
                    sx={{
                      width: state.isExpanded ? 'max-content' : '40px',
                      transition: 'all 0.3s ease',
                      overflow: 'hidden',
                      '#openPopover': {
                        transform: state.isExpanded
                          ? 'rotate(180deg)'
                          : 'rotate(0deg)',
                        transition: 'transform 0.3s ease',
                      },
                      '& .MuiSpeedDial-actions': {
                        opacity: state.isExpanded ? 1 : 0,
                        transition: 'all 0.3s ease',
                        flexDirection: 'column !important',
                        alignItems: 'flex-start !important',
                        height: 'auto !important',
                        gap: '10px !important',
                        '& > *': {
                          margin: '0 !important',
                        },
                      },
                    }}
                    ariaLabel="SpeedDial playground example"
                    icon={
                      <Box
                        onClick={handleClick}
                        sx={{
                          width: '100%',
                          height: '100%',
                          display: 'flex',
                          alignItems: 'center',
                          margin: '0 !important',
                          float: 'left' ,
                          justifyContent: 'center',
                        }}
                      >
                        <img
                          id="openPopover"
                          src={IconArrowNext}
                          alt={'Arrow Next'}
                          style={{
                           
                          }}
                          width={isMobile ? 30 : 50}
                          height={isMobile ? 30 : 50}
                        />
                      </Box>
                    }
                    open={state.isExpanded}
                    direction={state.direction}
                  >
                    <Box sx={{ display: state.isExpanded ? '' : 'none' }}>
                      <PopoverHelperIndo />
                      <Galleyisland />
                      <Kitchen />
                      <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                        <Backwall />
                        <Floor />
                      </Box>
                      <Light />
                    </Box>
                    
                  </StyledSpeedDial>
                  {!state.isExpanded && (
                    <Typography
                    onClick={handleClick}
                      sx={{
                        position: 'relative',
                        width: '100px',
                        height: '40px',
                        display: state.isExpanded ? 'none' : 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#2D3B2D',
                        fontFamily: 'Century Gothic',
                        fontSize: '16px',
                        textAlign: 'center',
                        fontWeight: '549',
                      }}
                    >
                      Menu
                      view
                    </Typography>
                  )}
                </Box>
              </>
            )}

            <Box
              sx={{
                display: 'flex',
                flexGrow: 1,
                position: 'relative',
                overflow: 'hidden',
                height: '100%',
              }}
            >
              <CssBaseline />
              {!isVisibleModalSeries && !showTemplateModal && !isMobile && (
                <MainMenu>
                  {isIndoorKitchen ? (
                    // TODO Implement LEFT MENU UI for Indoor
                    <DrawerTemplate />
                  ) : (
                    <DrawerCustom />
                  )}
                </MainMenu>
              )}

              <Box
                onClick={() => {
                  // closeDrawer();
                }}
                sx={{
                  position: 'absolute',
                  width: '100%',
                  height: '100%',
                  canvas: {
                    flexGrow: 1,
                    width: '100% !important',
                  },
                }}
              >
                {isIndoorKitchen ? (
                  <IndoorKitchenWorld />
                ) : (
                  <OutdoorKitchenWorld />
                )}
              </Box>
              <Box
                component="main"
                sx={{
                  flexGrow: 1,
                  p: 0,
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                {!isVisibleModalSeries && <FooterCart />}
              </Box>
            </Box>
          </Box>
          <Modal open={showCheckout}>
            <CheckoutPage />
          </Modal>
          <Modal open={showCustomer}>
            <CustomerInfoPage />
          </Modal>
          <ModalSeries
            isVisibleModalSeries={isVisibleModalSeries}
            activeStore={activeStore}
          />
          <ModalTemplates
            isVisibleModalTemplate={showTemplateModal}
            activeStore={activeStore}
          />
        </MainLayout>
        <GoogleReCaptcha
          action={ACTION_CAPTCHA}
          onVerify={(token) => {
            localStorage.setItem(KEY_CAPTCHA, token);
          }}
        />
      </GoogleReCaptchaProvider>
    </>
  );
};
const StyledSpeedDial = styled(SpeedDial)(({ theme }) => ({
  '& .MuiSpeedDial-actions': {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '0 8px',

    '& .MuiTypography-root': {
      margin: '0 8px',
    },

    '& .MuiButton-root': {
      height: '32px',
      margin: '0 4px',
    },
  },

  '&.MuiSpeedDial-directionUp, &.MuiSpeedDial-directionLeft': {
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
  '&.MuiSpeedDial-directionDown, &.MuiSpeedDial-directionRight': {
    top: theme.spacing(2),
    left: theme.spacing(2),
  },
}));
const styleHeaderBox = {
  zIndex: 999,
  background: 'transparent',
  display: 'flex',
  gap: '16px',
  position: 'fixed',
  right: '16px',
};

export default StorePage;
