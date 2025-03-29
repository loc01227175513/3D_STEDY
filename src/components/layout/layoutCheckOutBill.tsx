import React from 'react';
import { DRAWER_WIDTH, MainContent, MainContentShift } from '@/pages/public/style';
import { paths } from '@/paths.config';
import useDrawerTemplateOpen from '@/store/drawerTemplateOpen';
import { Box, Drawer, Stack } from '@mui/material';
import { Outlet, useNavigate } from 'react-router-dom';

import DrawerHeaderComponent from '@/components/button/DrawerHeader';

import BoxImage from '../boxImage';

const LayoutProductDetails = (): React.JSX.Element => {
  const navigate = useNavigate();
  const { open } = useDrawerTemplateOpen();

  const handleBackToFloorplan = () => {
    navigate(paths.floorplan.path);
  };

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <Drawer
        variant="persistent"
        anchor="left"
        open={open}
        sx={{
          width: DRAWER_WIDTH,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: DRAWER_WIDTH,
            boxSizing: 'border-box',
            borderRight: '1px solid',
            borderColor: 'divider',
            backgroundColor: '#F0F0F0',
          },
        }}
      >
        <DrawerHeaderComponent title={paths.design.checkoutBill.title} onBackClick={handleBackToFloorplan} />

        <Box sx={{ p: 2 }}>
          <Stack spacing={3}>
            <BoxImage
              image="/Images/selectFloorPlan/Rectangle 154322.svg"
              alt="external2D"
              height={150}
              width={700}
              showTitle={false}
              overlayText="Kitchen"
            />
          </Stack>
        </Box>
      </Drawer>

      {open ? (
        <MainContent sx={{ bgcolor: '#F5F5F5' }}>
          <Outlet />
        </MainContent>
      ) : (
        <MainContentShift sx={{ bgcolor: '#F5F5F5' }}>
          <Outlet />
        </MainContentShift>
      )}
    </Box>
  );
};

export default LayoutProductDetails;
