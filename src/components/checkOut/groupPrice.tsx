import React, { useState } from 'react';
import { Box, Button, Typography } from '@mui/material';

import ModalSaveProject from '../modal/modalSaveProject';

interface GroupPriceProps {
  total: number;
  onSaveDesign?: () => void;
}

const GroupPrice: React.FC<GroupPriceProps> = ({ total, onSaveDesign }) => {
  const [openSaveModal, setOpenSaveModal] = useState(false);

  const handleOpenSaveModal = () => {
    setOpenSaveModal(true);
  };

  const handleCloseSaveModal = () => {
    setOpenSaveModal(false);
  };

  const handleSave = () => {
    if (onSaveDesign) {
      onSaveDesign();
    }
    setOpenSaveModal(false);
  };

  const handleSaveAndView = () => {
    if (onSaveDesign) {
      onSaveDesign();
    }
    setOpenSaveModal(false);
    // Additional logic for viewing details can be added here
  };

  return (
    <>
      <Box
        sx={{
          position: 'fixed',
          bottom: 20,
          right: 20,
          display: 'flex',
          alignItems: 'center',
          gap: 2,
          padding: '12px 20px',
          borderRadius: '8px',
          zIndex: 1000,
        }}
      >
        <Box display="flex" alignItems="center" gap={1}>
          <Typography variant="h6" sx={{ color: '#666' }}>
            TOTAL:
          </Typography>
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
            $ {total.toLocaleString()}
          </Typography>
        </Box>
        <Button
          variant="contained"
          onClick={handleOpenSaveModal}
          sx={{
            backgroundColor: '#296df6',
            '&:hover': {
              backgroundColor: '#1756d8',
            },
            textTransform: 'none',
            fontWeight: 'bold',
          }}
        >
          Save Design
        </Button>
      </Box>

      <ModalSaveProject
        open={openSaveModal}
        onClose={handleCloseSaveModal}
        onSave={handleSave}
        onSaveAndView={handleSaveAndView}
      />
    </>
  );
};

export default GroupPrice;
