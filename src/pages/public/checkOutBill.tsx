import React from 'react';
import useDrawerTemplateOpen from '@/store/drawerTemplateOpen';
import { Box, IconButton, Stack, Typography } from '@mui/material';

import BoxDetailCheckOut from '@/components/checkOut/boxDetailCheckOut';
import CustomerInfoCheckOut from '@/components/checkOut/CustomerInfoCheckOut';
import ExternalCheckOut from '@/components/checkOut/ExternalCheckOut';
import FloorDetailsCheckOut from '@/components/checkOut/FloorDetailsCheckOut';
import TotalCheckoutControl from '@/components/checkOut/TotalCheckoutControl';

import { MenuButton } from './style';

const CheckOutBill = (): React.JSX.Element => {
  const { open, setOpen } = useDrawerTemplateOpen();

  const handleDrawerToggle = () => {
    setOpen(!open);
  };

  const handleEditDesign = () => {
    // Handle edit design logic
  };

  const handleDownloadQuote = () => {
    // Handle download quote logic
  };

  const customerInfo = {
    customer: 'Adam Smith',
    consultant: 'Join',
    mobile: '0466497286',
    date: '10-07-2024',
    email: 'john.smith@example.com',
    address: '90 Cobden St, South Melbourne VIC 3205, Australia',
  };

  // Example validation errors - in real app, this would come from form validation
  const errors = {
    // email: 'Invalid email format',
    // mobile: 'Invalid phone number'
  };

  const floorFeatures = [
    { label: 'Bed', value: 2 },
    { label: 'Bath', value: 2 },
    { label: 'Car', value: 2 },
  ];

  // External items data
  const externalItems = [
    {
      image: '/Images/selectFloorPlan/Rectangle -1.svg',
      name: 'Exterior Wall Paint',
      price: 5200,
      image2: '/Images/selectFloorPlan/Rectangle -1.svg',
    },
  ];

  return (
    // <AuthGuard>
    <Stack spacing={3}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <IconButton
            color="inherit"
            aria-label="toggle drawer"
            onClick={handleDrawerToggle}
            edge="start"
            sx={{
              ...MenuButton,
              position: 'fixed',
              left: open ? '400px' : '20px',
              zIndex: 1200,
              transition: 'left 0.3s ease-in-out',
              bgcolor: '#D9E6FF',
              '&:hover': {
                bgcolor: 'background.paper',
              },
            }}
          >
            <Box
              component="img"
              src="/Images/selectFloorPlan/closeDraw.svg"
              alt="external2D"
              width={10}
              sx={{
                transform: open ? 'rotate(0deg)' : 'rotate(180deg)',
                transition: 'transform 0.3s ease-in-out',
              }}
            />
          </IconButton>
        </Box>
      </Box>

      {/* Customer Information and Floor Details Section */}
      <Box
        sx={{
          bgcolor: '#f5f5f5',
          p: 2,
          borderRadius: 1,
        }}
      >
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 0,
          }}
        >
          {/* Customer Information */}
          <CustomerInfoCheckOut customerInfo={customerInfo} errors={errors} />

          {/* Floor Details */}
          <FloorDetailsCheckOut floorName="Established Bronte Gold" features={floorFeatures} price={890000} />
        </Box>
      </Box>

      {/* External Section */}
      <Box sx={{ p: 2 }}>
        <ExternalCheckOut items={externalItems} onDownloadQuote={handleDownloadQuote} />
      </Box>

      <Box sx={{ p: 2 }}>
        <Typography
          variant="h6"
          sx={{
            pt: 2,
            fontSize: '14px',
            color: '#6E6E6E',
            fontWeight: 'bold',
            letterSpacing: '2px',
          }}
        >
          INTERNAL
        </Typography>

        {/* Kitchen Section */}
        <BoxDetailCheckOut
          title="KITCHEN"
          images={[
            '/Images/selectFloorPlan/Rectangle -1.svg',
            '/Images/selectFloorPlan/Rectangle -2.svg',
            '/Images/selectFloorPlan/Rectangle -3.svg',
          ]}
          items={[
            { name: 'Kitchen Oven', quantity: '-', price: 9766 },
            { name: 'Fridge Cabinet Cupboard Double Door', quantity: '-', price: 1066 },
            { name: 'Kitchen Cabinet Single Door Left', quantity: '-', price: 4091 },
            { name: 'Kitchen Cupboard Double Door', quantity: '-', price: 10029 },
            { name: 'Kitchen Cupboard Single Door Left', quantity: '-', price: 1000 },
            { name: 'Kitchen Cupboard Single Door Right', quantity: '-', price: 1000 },
            { name: 'Tall Cabinet', quantity: '-', price: 1000 },
            { name: 'Kitchen Cooktop 60CM', quantity: '-', price: 2200 },
          ]}
          onDownloadQuote={() => {}}
        />
        <BoxDetailCheckOut
          title="LiVING ROOM"
          images={[
            '/Images/selectFloorPlan/Rectangle -1.svg',
            '/Images/selectFloorPlan/Rectangle -2.svg',
            '/Images/selectFloorPlan/Rectangle -3.svg',
          ]}
          items={[
            { name: 'Kitchen Oven', quantity: '-', price: 9766 },
            { name: 'Fridge Cabinet Cupboard Double Door', quantity: '-', price: 1066 },
            { name: 'Kitchen Cabinet Single Door Left', quantity: '-', price: 4091 },
            { name: 'Kitchen Cupboard Double Door', quantity: '-', price: 10029 },
            { name: 'Kitchen Cupboard Single Door Left', quantity: '-', price: 1000 },
            { name: 'Kitchen Cupboard Single Door Right', quantity: '-', price: 1000 },
            { name: 'Tall Cabinet', quantity: '-', price: 1000 },
            { name: 'Kitchen Cooktop 60CM', quantity: '-', price: 2200 },
          ]}
          onDownloadQuote={() => {}}
        />
        <BoxDetailCheckOut
          title="BATHROOM"
          images={[
            '/Images/selectFloorPlan/Rectangle -1.svg',
            '/Images/selectFloorPlan/Rectangle -2.svg',
            '/Images/selectFloorPlan/Rectangle -3.svg',
          ]}
          items={[
            { name: 'Kitchen Oven', quantity: '-', price: 9766 },
            { name: 'Fridge Cabinet Cupboard Double Door', quantity: '-', price: 1066 },
            { name: 'Kitchen Cabinet Single Door Left', quantity: '-', price: 4091 },
            { name: 'Kitchen Cupboard Double Door', quantity: '-', price: 10029 },
            { name: 'Kitchen Cupboard Single Door Left', quantity: '-', price: 1000 },
            { name: 'Kitchen Cupboard Single Door Right', quantity: '-', price: 1000 },
            { name: 'Tall Cabinet', quantity: '-', price: 1000 },
            { name: 'Kitchen Cooktop 60CM', quantity: '-', price: 2200 },
          ]}
          onDownloadQuote={() => {}}
        />

        {/* Total and Controls */}
        <TotalCheckoutControl total={37623} onEditDesign={handleEditDesign} onDownloadQuote={handleDownloadQuote} />
      </Box>
    </Stack>
    // </AuthGuard>
  );
};

export default CheckOutBill;
