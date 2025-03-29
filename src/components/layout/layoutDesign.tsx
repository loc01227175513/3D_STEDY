import React, { useState } from 'react';
import { DRAWER_WIDTH, MainContent, MainContentShift } from '@/pages/public/style';
import { paths } from '@/paths.config';
import useDrawerTemplateOpen from '@/store/drawerTemplateOpen';
import useToolbarStore from '@/store/Toolbar';
import View3dIcon from '@mui/icons-material/ViewInAr';
import ViewModuleIcon from '@mui/icons-material/ViewModule';
import VrPanoIcon from '@mui/icons-material/VrPano';
import { Box, Button, ButtonGroup, Drawer, Stack, Typography } from '@mui/material';
import { Outlet, useNavigate } from 'react-router-dom';

import BoxImage from '@/components/boxImage';
import DrawerHeaderComponent from '@/components/button/DrawerHeader';
import FloatingToolbar from '@/components/floatingToolbar/floatingToolbar';
import Modal from '@/components/modal/Modal';

import GroupPrice from '../checkOut/groupPrice';
import { buttonStyles } from './components';

const LayoutDesign = (): React.JSX.Element => {
  const navigate = useNavigate();
  const { open } = useDrawerTemplateOpen();
  const [viewMode, setViewMode] = useState<'2D' | '3D' | 'VIRTUAL'>('2D');
  const [activeTab, setActiveTab] = useState<'OPTIONS' | 'FLOOR'>('OPTIONS');
  const [openConfirmModal, setOpenConfirmModal] = useState(false);

  const { handleZoomIn, handleZoomOut, handleReset, handleUndo, handleFullscreen, handleRoofToggle } =
    useToolbarStore();

  const handleBackClick = () => {
    setOpenConfirmModal(true);
  };

  const handleSaveAndExit = () => {
    navigate(paths.floorplan.path);
    setOpenConfirmModal(false);
  };

  const handleContinueDesign = () => {
    setOpenConfirmModal(false);
  };

  const handleDiscardAndExit = () => {
    navigate(paths.floorplan.path);
    setOpenConfirmModal(false);
  };

  const handleViewModeChange = (mode: '2D' | '3D' | 'VIRTUAL') => {
    setViewMode(mode);
    switch (mode) {
      case '2D':
        navigate(paths.design.external.path);
        break;
      case '3D':
        navigate(paths.design.internal.path);
        break;
      case 'VIRTUAL':
        navigate(paths.design.virtual.path);
        break;
    }
  };

  const externalOptions = [
    { name: 'GA04 G4 Coastal Cottage', image: '/Images/selectFloorPlan/KITCHEN2 (1).svg' },
    { name: 'GA04 G4 Country Natural', image: '/Images/selectFloorPlan/KITCHEN2 (2).svg' },
    { name: 'GA04 G4 Rainforest Natural', image: '/Images/selectFloorPlan/KITCHEN2 (3).svg' },
    { name: 'GA04 G4 Urban Cottage', image: '/Images/selectFloorPlan/KITCHEN2 (4).svg' },
  ];
  const handleSaveDesign = () => {
    // Handle save design logic here
    console.log('Saving design...');
  };

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <FloatingToolbar
        onZoomIn={handleZoomIn}
        onZoomOut={handleZoomOut}
        onReset={handleReset}
        onUndo={handleUndo}
        onFullscreen={handleFullscreen}
        onRoofToggle={handleRoofToggle}
      />

      <Modal
        open={openConfirmModal}
        onClose={() => setOpenConfirmModal(false)}
        title="Save design before leaving ?"
        onSave={handleSaveAndExit}
        onContinue={handleContinueDesign}
        onDiscard={handleDiscardAndExit}
        fullWidth={false}
      />

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
            '&::-webkit-scrollbar': {
              display: 'none',
            },
            '-ms-overflow-style': 'none',
            'scrollbar-width': 'none',
          },
        }}
      >
        <Box component="img" src="/Images/LOGO1.svg" alt="Stockland" width={200} height={50} />

        <DrawerHeaderComponent title={paths.design.productDetails.floorplan.title} onBackClick={handleBackClick} />

        <Box sx={{ p: 2 }}>
          <Stack spacing={3}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'black' }}>
                BRONTE - Y03
              </Typography>
              <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#666' }}>
                / EXTERNAL
              </Typography>
            </Box>

            <BoxImage
              image="/Images/selectFloorPlan/Rectangle 154322.svg"
              alt="external2D"
              height={150}
              width={700}
              showTitle={false}
            />

            <ButtonGroup variant="contained" sx={buttonStyles.viewModeButtonGroup}>
              <Button
                startIcon={<ViewModuleIcon />}
                onClick={() => handleViewModeChange('2D')}
                sx={buttonStyles.viewModeButton(viewMode === '2D')}
              >
                2D
              </Button>
              <Button
                startIcon={<View3dIcon />}
                onClick={() => handleViewModeChange('3D')}
                sx={buttonStyles.viewModeButton(viewMode === '3D')}
              >
                3D
              </Button>
              <Button
                startIcon={<VrPanoIcon />}
                onClick={() => handleViewModeChange('VIRTUAL')}
                sx={buttonStyles.viewModeButton(viewMode === 'VIRTUAL')}
              >
                VIRTUAL
              </Button>
            </ButtonGroup>

            <ButtonGroup variant="contained" sx={buttonStyles.buttonGroup}>
              <Button sx={buttonStyles.optionsButton(activeTab === 'OPTIONS')} onClick={() => setActiveTab('OPTIONS')}>
                OPTIONS
              </Button>
              <Button sx={buttonStyles.floorButton(activeTab === 'FLOOR')} onClick={() => setActiveTab('FLOOR')}>
                FLOOR
              </Button>
            </ButtonGroup>

            <Stack spacing={2}>
              {externalOptions.map((option) => (
                <BoxImage key={option.name} name={option.name} image={option.image} height={100} />
              ))}
            </Stack>
          </Stack>
        </Box>
      </Drawer>

      {open ? (
        <MainContent>
          <Outlet />
          <GroupPrice total={37623} onSaveDesign={handleSaveDesign} />
        </MainContent>
      ) : (
        <MainContentShift>
          <Outlet />
          <GroupPrice total={37623} onSaveDesign={handleSaveDesign} />
        </MainContentShift>
      )}
    </Box>
  );
};

export default LayoutDesign;
