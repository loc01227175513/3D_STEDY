import React from 'react';
import { Box, Stack, Typography } from '@mui/material';

import BoxDetailCheckOutCustomer from '@/components/checkOut/boxDetailCheckOutCustomer';

const CheckOutBill = (): React.JSX.Element => {
  return (
    // <AuthGuard>
    <Stack spacing={3}>
      <Box component="img" src="/Images/LOGO1.svg" alt="Stockland" width={200} height={50} />

      <Box sx={{ p: 2 }}>
        {/* Kitchen Section */}
        <BoxDetailCheckOutCustomer
          title="1.Kitchen ESTIMATE"
          images={[
            '/Images/selectFloorPlan/Rectangle -1.svg',
            '/Images/selectFloorPlan/Rectangle -2.svg',
            '/Images/selectFloorPlan/Rectangle -3.svg',
            '/Images/selectFloorPlan/Rectangle -4.svg',
          ]}
          items={[
            { name: 'Kitchen', quantity: '-', price: 9766 },
            { name: 'Bath', quantity: '-', price: 1066 },
            { name: 'Living', quantity: '-', price: 4091 },
          ]}
          onDownloadQuote={() => {}}
        />
      </Box>

      {/* Footer */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          px: 2,
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          width: '100%',
          py: 1,
          backgroundColor: 'background.paper',

          borderColor: 'divider',
          zIndex: 1000,
        }}
      >
        <Typography variant="body2" sx={{ color: '#296DF6', fontSize: '11px' }}>
          Copyright © 2025
          <span style={{ fontWeight: 'bold' }}>Stockland Halcyon Communities.</span>
        </Typography>
        <Typography variant="body2" sx={{ fontSize: '11px' }}>
          Page 1/4
        </Typography>
      </Box>
    </Stack>
    // </AuthGuard>
  );
};

export default CheckOutBill;
