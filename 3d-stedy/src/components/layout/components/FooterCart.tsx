import { productStore, useBrandStore, drawerStore } from '@/store';
import { useCheckoutStore } from '@/store/useCheckoutStore';
import { Model, ProductEntity } from '@/types/model';
import { formatInputCurrency } from '@/utils/currency';
import { THREE_EVENTS, emitter } from '@/utils/events';
import {
  Box,
  Button,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { delay } from 'lodash';
import * as React from 'react';
import { useEffect } from 'react';
import { Bounce, toast } from 'react-toastify';
import { use3DCaptureStore } from '@/store/use3DCaptureStore';
import { Await } from 'react-router-dom';

// Add new event for cancelling screenshots
const CANCEL_SCREENSHOT_EVENT = 'cancelScreenshot';

// Define finalScreenshot object
const finalScreenshot = {
  event: THREE_EVENTS.screenShotIndoorKitchenIsland,
  name: 'Indoor Kitchen Island Screenshot',
};

export default function FooterCart(): React.ReactElement {
  const theme = useTheme();
  const isTablet = !useMediaQuery(theme.breakpoints.down('desktop'));
  const isMobile = useMediaQuery(theme.breakpoints.down('tablet'));
  const { listCart, reloadListCart, isLoading } = productStore();
  const { setShowCheckout } = useCheckoutStore();
  const { activeStore } = useBrandStore();
  const { openModalProduct, setShowHideModal, toggleDrawer, openDrawer } = drawerStore();
  const { captureBase64String, captureBase64StringIsland } =
    use3DCaptureStore();
  // console.log('listCart', listCart);
  const calculateTotalPrice = (listCart: ProductEntity[]) => {
    return listCart.reduce((total, item) => {
      if (!item || !item.price) return total;
      const itemPrice =
        typeof item.price === 'string' ? parseFloat(item.price) : item.price;
      return total + (isNaN(itemPrice) ? 0 : itemPrice);
    }, 0);
  };

  const totalPrice = calculateTotalPrice(listCart);

  useEffect(() => {
    const handleModelRemove = (payload: any) => {
      const { models } = payload;
      const products = models.map((item: Model) => item.product);
      reloadListCart(products);
      // Cancel any ongoing screenshots when models are removed
      emitter.emit(CANCEL_SCREENSHOT_EVENT);
    };

    const handleTemplateLoad = (payload: any) => {
      if (payload.isReplacement && payload.replacedProduct) {
        const currentCart = listCart;
        const updatedCart = currentCart.map((item: ProductEntity) => {
          if (item.id === payload.replacedProduct.old.id) {
            const updatedProduct = {
              ...payload.replacedProduct.new,
              position: item.position,
              price:
                typeof payload.replacedProduct.new.price === 'number'
                  ? payload.replacedProduct.new.price
                  : 0,
            };
            return updatedProduct;
          }
          return {
            ...item,
            price: typeof item.price === 'number' ? item.price : 0,
          };
        });

        reloadListCart(updatedCart);
      } else {
        const products = payload.components
          ? payload.components.map((item: any) => item.product)
          : payload.products || [];

        const validProducts = products.map((product: ProductEntity) => ({
          ...product,
          price: typeof product.price === 'number' ? product.price : 0,
        }));

        reloadListCart(validProducts);
      }
    };

    emitter.on(THREE_EVENTS.onModelDidRemove, handleModelRemove);
    emitter.on(THREE_EVENTS.onTemplateDidLoad, handleTemplateLoad);

    return () => {
      emitter.off(THREE_EVENTS.onModelDidRemove, handleModelRemove);
      emitter.off(THREE_EVENTS.onTemplateDidLoad, handleTemplateLoad);
    };
  }, [reloadListCart, listCart]);

  useEffect(() => {}, [listCart, totalPrice]);

  const handleCheckout = () => {
    if (listCart.length == 0) {
      toast.warn('Please setup your kitchen.', {
        position: 'top-right',
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'dark',
        transition: Bounce,
      });
    } else {
      // Close drawer only if it's open
      if (openDrawer) {
        toggleDrawer();
      }

      try {
   
        emitter.emit(THREE_EVENTS.screenShotIndoorKitchenIsland, {});
        emitter.emit(THREE_EVENTS.screenShotIndoorKitchen, {});
        emitter.emit(THREE_EVENTS.screenShotIndoorIsland, {});
        emitter.emit(THREE_EVENTS.updateDimensions, {});
        
        // Proceed to checkout
        setShowCheckout(true);
      } catch (error) {
        console.error('Error during capture sequence:', error);
        toast.error(
          'An error occurred during checkout process. Please try again.',
          {
            position: 'top-right',
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'dark',
          }
        );
      }
    }
  };
  return (
    <div
      style={{
        ...styleContainerFooterBox(isTablet),
        marginTop: 'auto',
        padding: '10px',
        // backgroundColor: 'white',
        backgroundColor: isMobile ? 'white' : 'rgb(255 255 255 / 50%)',
        backdropFilter: 'blur(10px)',
        position: 'fixed',
        // borderTopLeftRadius: '20px',
        // borderBottomLeftRadius: '20px',
        borderRadius: '6px',
        width: isMobile ? '100%' : 'max-content',
        right: 0,
        bottom: 0,
      }}
    >
      <Box
        sx={{
          ...styleFooterBox,
          height: 'max-content',
          width: {
            desktop: 'max-content',
            tablet: 'max-content',
            mobile: '100%',
          },
          background: isMobile ? 'white !important' : 'transparent',
          zIndex: 999,
          position: 'relative',
        }}
      >
        {/* {(captureBase64String || captureBase64StringIsland) && (
          <Box sx={{ 
            display: 'flex',
            gap: '10px',
            marginBottom: '10px',
            width: '100%',
            maxWidth: isMobile ? '100%' : '400px'
          }}>
            {captureBase64String && (
              <Box sx={{ 
                flex: 1,
                position: 'relative',
                '& img': {
                  width: '100%',
                  height: 'auto',
                  borderRadius: '4px',
                  border: '1px solid #e0e0e0'
                }
              }}>
                <Typography sx={{
                  position: 'absolute',
                  top: '5px',
                  left: '5px',
                  background: 'rgba(0,0,0,0.5)',
                  color: 'white',
                  padding: '2px 6px',
                  borderRadius: '4px',
                  fontSize: '12px'
                }}>
                  Kitchen
                </Typography>
                <img src={captureBase64String} alt="Kitchen Preview" />
              </Box>
            )}
            
            {captureBase64StringIsland && (
              <Box sx={{ 
                flex: 1,
                position: 'relative',
                '& img': {
                  width: '100%',
                  height: 'auto',
                  borderRadius: '4px',
                  border: '1px solid #e0e0e0'
                }
              }}>
                <Typography sx={{
                  position: 'absolute',
                  top: '5px',
                  left: '5px',
                  background: 'rgba(0,0,0,0.5)',
                  color: 'white',
                  padding: '2px 6px',
                  borderRadius: '4px',
                  fontSize: '12px'
                }}>
                  Island
                </Typography>
                <img src={captureBase64StringIsland} alt="Island Preview" />
              </Box>
            )}
          </Box>
        )} */}

        {activeStore != null &&
          activeStore.tenant.settings.showPrice == true && (
            <Box sx={priceBoxStyles(isTablet, isMobile)}>
              <Typography sx={totalPriceLabelStyles}>Total price</Typography>
              <Typography sx={totalPriceValueStyles(isMobile)}>
                {formatInputCurrency(totalPrice.toString(), '$', false)}
              </Typography>
            </Box>
          )}
        <Button
          disabled={isLoading}
          onClick={() => {
            handleCheckout();
          }}
          sx={getQuoteButtonStyles(isTablet, isMobile, listCart)}
        >
          Get quote
        </Button>
      </Box>
    </div>
  );
}

const FooterContent = ({
  isMobile,
  w,
  h,
  d,
}: {
  w: number;
  h: number;
  d: number;
  isMobile: boolean;
}) => (
  <>
    <Typography
      sx={{
        ...footerTextLabelStyles,
        fontSize: isMobile ? '12px' : '14px',
        marginBottom: isMobile ? '4px' : '8px',
      }}
    >
      Total Dimension:
      <span style={{ fontWeight: '500' }}>
        W{w}mm x D{d}mm x H{h}mm
      </span>
    </Typography>
    <Typography
      sx={{
        ...footerTextLabelStyles,
        fontSize: isMobile ? '12px' : '14px',
        marginBottom: isMobile ? '4px' : '8px',
      }}
    >
      Style:
      <span style={{ fontWeight: '500' }}>
        Polytec Black (cabinets) Polytec Cinder (benchtops)
      </span>
    </Typography>
  </>
);

// Styles
const styleContainerFooterBox = (isTablet: boolean) => {
  return {
    // background: 'white',
    bottom: '0px',
    // width: !isTablet ? '100%' : 'calc(100% - 65px)',
  };
};

const styleFooterBox = {
  background: '#f5f5f5',
  bottom: '0px',
  display: 'flex',
  alignItems: 'center',
};

const footerTextLabelStyles = {
  color: '#666666',
  fontWeight: '700',
};

const totalPriceLabelStyles = {
  marginLeft: 'auto',
  color: '#000',
  fontSize: '11px',
  fontWeight: '600',
  marginBottom: '4px',
};

const totalPriceValueStyles = (isMobile: boolean) => ({
  marginLeft: 'auto',
  color: '#211d1e',
  fontSize: isMobile ? '22px' : '24px',
  fontWeight: '600',
});

const priceBoxStyles = (isTablet: boolean, isMobile: boolean) => ({
  marginLeft: isTablet ? 'auto' : isMobile ? '16px' : '32px',
  marginRight: isTablet ? '0px' : 'auto',
});

const getQuoteButtonStyles = (
  isTablet: boolean,
  isMobile: boolean,
  listCart: ProductEntity[]
) => ({
  height: 'max-content',
  marginLeft: '16px',
  marginRight: '16px',
  border: '1px solid #848484',
  fontSize: '14px',
  fontWeight: '600',
  width: !isTablet ? '70%' : 'max-content',
  padding: isMobile ? '12px 0px' : '15px 20px',
  borderRadius: '6px',
  color: 'white',
  background: listCart.length != 0 ? 'black' : '#848484',
  textTransform: 'uppercase',
  '&:hover': {
    background: '#848484',
    border: '1px solid #848484',
  },
  '&:focus': {
    background: '#848484',
    border: '1px solid #848484',
    outline: 'none',
  },
  minWidth: '123px',
  minHeight: '56.5px',
});
