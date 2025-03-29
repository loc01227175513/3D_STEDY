import React, { useState } from 'react';
import { DRAWER_WIDTH, MainContent, MainContentShift } from '@/pages/public/style';
import { paths } from '@/paths.config';
import useDrawerTemplateOpen from '@/store/drawerTemplateOpen';
import useToolbarStore from '@/store/Toolbar';
import { Box, Button, Drawer, Stack } from '@mui/material';
import { Outlet, useNavigate } from 'react-router-dom';

import BoxImage from '@/components/boxImage';
import DrawerHeaderComponent from '@/components/button/DrawerHeader';
import FloatingToolbar from '@/components/floatingToolbar/floatingToolbar';
import Modal from '@/components/modal/Modal';
import { ColourContent, DimensionContent, OptionsContent } from '@/components/tabDesign/tabDesign';

import GroupPrice from '../checkOut/groupPrice';

const LayoutModeDesign = (): React.JSX.Element => {
  const navigate = useNavigate();
  const { open } = useDrawerTemplateOpen();
  const [viewMode, setViewMode] = useState<'DIMENSION' | 'COLOUR' | 'OPTIONS'>('DIMENSION');
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

  const handleViewModeChange = (mode: 'DIMENSION' | 'COLOUR' | 'OPTIONS') => {
    setViewMode(mode);
  };

  const renderContent = () => {
    switch (viewMode) {
      case 'DIMENSION':
        return <DimensionContent />;
      case 'COLOUR':
        return <ColourContent />;
      case 'OPTIONS':
        return <OptionsContent />;
      default:
        return null;
    }
  };
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
          },
        }}
      >
        <DrawerHeaderComponent title={paths.design.productDetails.floorplan.title} onBackClick={handleBackClick} />

        <Box sx={{ p: 2 }}>
          <Stack spacing={3}>
            <BoxImage image="/Images/selectFloorPlan/EDIT_MODEL.svg" alt="external2D" height={150} showTitle={false} />

            <Stack direction="row" spacing={0} sx={{ width: '100%' }}>
              <Button
                variant={viewMode === 'DIMENSION' ? 'contained' : 'outlined'}
                onClick={() => handleViewModeChange('DIMENSION')}
                sx={{
                  flex: 1,
                  borderRadius: '4px ',
                  fontWeight: '500',
                  borderColor: '#d0d0d0',
                  backgroundColor: viewMode === 'DIMENSION' ? '#296df6' : '#fff',
                  color: viewMode === 'DIMENSION' ? '#fff' : '#000',
                  '&:hover': {
                    backgroundColor: viewMode === 'DIMENSION' ? '#1976d2' : '#f5f5f5',
                    borderColor: '#d0d0d0',
                  },
                  textTransform: 'uppercase',
                }}
              >
                Dimension
              </Button>
              <Button
                variant={viewMode === 'COLOUR' ? 'contained' : 'outlined'}
                onClick={() => handleViewModeChange('COLOUR')}
                sx={{
                  flex: 1,
                  borderRadius: '4px ',
                  fontWeight: '500',
                  borderColor: '#d0d0d0',
                  backgroundColor: viewMode === 'COLOUR' ? '#296df6' : '#fff',
                  color: viewMode === 'COLOUR' ? '#fff' : '#000',
                  '&:hover': {
                    backgroundColor: viewMode === 'COLOUR' ? '#1976d2' : '#f5f5f5',
                    borderColor: '#d0d0d0',
                  },
                  textTransform: 'uppercase',
                  mx: '8px',
                }}
              >
                Colour
              </Button>
              <Button
                variant={viewMode === 'OPTIONS' ? 'contained' : 'outlined'}
                onClick={() => handleViewModeChange('OPTIONS')}
                sx={{
                  flex: 1,
                  borderRadius: '4px ',
                  fontWeight: '500',
                  borderColor: '#d0d0d0',
                  backgroundColor: viewMode === 'OPTIONS' ? '#296df6' : '#fff',
                  color: viewMode === 'OPTIONS' ? '#fff' : '#000',
                  '&:hover': {
                    backgroundColor: viewMode === 'OPTIONS' ? '#1976d2' : '#f5f5f5',
                    borderColor: '#d0d0d0',
                  },
                  textTransform: 'uppercase',
                }}
              >
                Options
              </Button>
            </Stack>

            {renderContent()}
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

export default LayoutModeDesign;
