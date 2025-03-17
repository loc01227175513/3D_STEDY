import React, { useRef } from 'react';
import { Box, Grid2, useMediaQuery, Typography } from '@mui/material';
import { MainLayout } from '@/components/layout';
import TableCart, { ListCard } from '@/components/checkout/TableCart';
import BillCheckout from '@/components/checkout/BillCheckout';
import theme from '@/themes';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import { UseCustomer } from '@/store/useCustomer';
import { useCheckoutStore } from '@/store/useCheckoutStore';
import { use3DCaptureStore } from '@/store/use3DCaptureStore';
import { emitter, THREE_EVENTS } from '@/utils/events';
import { useKitchenStore } from '@/store/useKitchenStore';

const CheckoutPage: React.FC = () => {
  const isMobile = useMediaQuery(theme.breakpoints.down('desktop'));
  const { captureBase64String, captureBase64StringIsland } = use3DCaptureStore();
  const { setBackwallDisabled, setKitchenDisabled, setGalleyislandDisabled, setFloorDisabled } = useKitchenStore();

  const pdfContentPageOneRef = useRef<HTMLDivElement>(null);
  const { setShowCustomer } = UseCustomer();
  const { setShowCheckout } = useCheckoutStore();

  const handleClickReceiveEstimate = async (): Promise<void> => {
    setShowCustomer(true);
  };

  const handleClickBack = () => {
    // Cancel any ongoing screenshots
    emitter.emit(THREE_EVENTS.cancelScreenshot);

    // Reset các trạng thái visible
    setBackwallDisabled(true);
    setKitchenDisabled(true); 
    setGalleyislandDisabled(true);
    setFloorDisabled(true);
    emitter.emit(THREE_EVENTS.BackCheckout);

    // Đóng checkout
    setShowCheckout(false);
  };

  return (
    <MainLayout>
      <Grid2
        className="checkout-page"
        container
        sx={{
          background: 'white',
          flexGrow: 1,
          overflow: isMobile ? 'scroll' : 'hidden',
        }}
        spacing={isMobile ? 0 : 6}
      >
        <Grid2 size={{ mobile: 12, tablet: 12, desktop: 8 }}>
          <Box
            onClick={handleClickBack}
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'start',
              cursor: 'pointer',
              marginLeft: '20px',
              marginTop: '20px',
              color: 'black',
              gap: '8px',
              width: 'max-content',
            }}
          >
            <Box
              sx={{
                background: 'black',
                display: 'flex',
                borderRadius: '50px',
                alignItems: 'center',
                justifyContent: 'center',
                width: '35px',
                height: '35px',
                cursor: 'pointer',
              }}
            >
              <ArrowBackRoundedIcon sx={{ color: 'white' }} />
            </Box>
            Back
          </Box>

          {isMobile ? (
            <Box ref={pdfContentPageOneRef}>
              <ListCard title={'Your items'} />
            </Box>
          ) : (
            <Box sx={{ height: '100%' }} ref={pdfContentPageOneRef}>
              <TableCart title={'Your items'} />
            </Box>
          )}
        </Grid2>
        <Grid2
          size={{ mobile: 12, tablet: 12, desktop: 4 }}
          sx={{
            height: isMobile ? 'max-content' : 'initial',
            marginTop: isMobile ? 'auto' : '0',
            background: '#F5F5F5',
          }}
        >
          <BillCheckout onClickReceiveEstimate={handleClickReceiveEstimate} />
        </Grid2>
      </Grid2>
    </MainLayout>
  );
};

export default CheckoutPage;
