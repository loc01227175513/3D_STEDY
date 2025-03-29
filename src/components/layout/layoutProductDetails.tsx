import React, { useState } from 'react';
import { DRAWER_WIDTH, MainContent, MainContentShift, RoomBox } from '@/pages/public/style';
import { paths } from '@/paths.config';
import useDrawerTemplateOpen from '@/store/drawerTemplateOpen';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { Box, Button, Drawer, Stack, Typography } from '@mui/material';
import { Outlet, useNavigate } from 'react-router-dom';

import DrawerHeaderComponent from '@/components/button/DrawerHeader';

const LayoutProductDetails = (): React.JSX.Element => {
  const navigate = useNavigate();
  const { open } = useDrawerTemplateOpen();
  const [selectedRoom, setSelectedRoom] = useState<string | null>(null);

  const handleRoomClick = (roomName: string) => {
    setSelectedRoom(selectedRoom === roomName ? null : roomName);
  };

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
        <Box component="img" src="/Images/LOGO1.svg" alt="Stockland" sx={{ width: 200, height: 50 }} />
        <DrawerHeaderComponent title={paths.design.productDetails.design.title} onBackClick={handleBackToFloorplan} />

        <Box sx={{ p: 2 }}>
          <Stack spacing={3}>
            <Typography variant="h6" sx={{ mb: 1, fontWeight: 100, color: 'black' }}>
              BRONTE - Y03
            </Typography>
            <Box>
              <Box
                onClick={() => navigate(paths.design.internal.path)}
                sx={{ display: 'flex', alignItems: 'center', gap: 0.2, mb: 1 }}
              >
                <Button
                  sx={{
                    backgroundColor: '#296df6',
                    color: 'white',
                    padding: '4px',
                    m: 0.5,

                    minWidth: '32px',
                    borderRadius: '8px',
                  }}
                >
                  <Box component="img" src="/icons/icon-next.svg" sx={{ width: 25, height: 25 }} />
                </Button>
                <Typography variant="h6" sx={{ fontWeight: 'bold', padding: '4px', color: '#296df6' }}>
                  EXTERNAL
                </Typography>
              </Box>

              <Box sx={RoomBox} onClick={() => handleRoomClick('external')}>
                <Box
                  component="img"
                  src="/Images/selectFloorPlan/KITCHEN7.svg"
                  sx={{ width: '50%', height: '100px', bgcolor: '#e0e0e0', borderRadius: 1 }}
                />
                <Box sx={{ width: '50%', height: '100px', display: 'flex', flexDirection: 'column' }}>
                  <Box>
                    <Typography sx={{ fontWeight: 'bold' }}>Avoca - R03</Typography>
                    <Typography variant="body2" color="text.secondary">
                      12.0x16
                    </Typography>
                  </Box>
                  {selectedRoom === 'external' && (
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        color: '#296df6',
                        cursor: 'pointer',
                        marginTop: 'auto',
                      }}
                      onClick={() => navigate(paths.design.internal.path)}
                    >
                      <Typography sx={{ fontSize: '0.875rem', fontWeight: 'bold' }}>Go to 3D Design</Typography>
                      <KeyboardArrowRightIcon
                        sx={{ ml: 0.5, backgroundColor: '#296df6', color: 'white', borderRadius: '50%' }}
                      />
                    </Box>
                  )}
                </Box>
              </Box>
            </Box>

            <Box>
              <Box
                onClick={() => navigate(paths.design.designModel.path)}
                sx={{ display: 'flex', alignItems: 'center', gap: 0.2, mb: 1 }}
              >
                <Button
                  sx={{
                    backgroundColor: '#296df6',
                    color: 'white',
                    padding: '4px',
                    m: 0.5,

                    minWidth: '32px',
                    borderRadius: '8px',
                  }}
                >
                  <Box component="img" src="/icons/icon-next.svg" sx={{ width: 25, height: 25 }} />
                </Button>
                <Typography variant="h6" sx={{ fontWeight: 'bold', padding: '4px', color: '#296df6' }}>
                  INTERNAL
                </Typography>
              </Box>
              {[
                { image: '/Images/selectFloorPlan/KITCHEN.png', name: 'Livingroom', size: '4.9x4.8' },
                { image: '/Images/selectFloorPlan/KITCHEN1.svg', name: 'Bathroom', size: '3.0x5.0' },
                { image: '/Images/selectFloorPlan/KITCHEN6.svg', name: 'Kitchen', size: '8.0x4.8' },
              ].map((room) => (
                <Box key={room.name} sx={RoomBox} onClick={() => handleRoomClick(room.name)}>
                  <Box
                    component="img"
                    src={room.image}
                    sx={{ width: '50%', height: '100px', bgcolor: '#e0e0e0', borderRadius: 1 }}
                  />
                  <Box sx={{ width: '50%', height: '100px', display: 'flex', flexDirection: 'column' }}>
                    <Box>
                      <Typography sx={{ fontWeight: 'bold' }}>{room.name}</Typography>
                      <Typography variant="body2" color="text.secondary">
                        {room.size}
                      </Typography>
                    </Box>
                    {selectedRoom === room.name && (
                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          color: '#296df6',
                          cursor: 'pointer',
                          marginTop: 'auto',
                        }}
                        onClick={() => navigate(paths.design.designModel.path)}
                      >
                        <Typography sx={{ fontSize: '0.875rem', fontWeight: 'bold' }}>Go to 3D Design</Typography>
                        <KeyboardArrowRightIcon
                          sx={{ ml: 0.5, backgroundColor: '#296df6', color: 'white', borderRadius: '50%' }}
                        />
                      </Box>
                    )}
                  </Box>
                </Box>
              ))}
            </Box>
          </Stack>
        </Box>
      </Drawer>

      {open ? (
        <MainContent>
          <Outlet />
        </MainContent>
      ) : (
        <MainContentShift>
          <Outlet />
        </MainContentShift>
      )}
    </Box>
  );
};

export default LayoutProductDetails;
