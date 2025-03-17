import { Box, Drawer, Typography } from '@mui/material';
import { useState } from 'react';
import DimensionTemplate from '../DimensionTemplate';
import ColourTemplate from '../ColourTemplate';
// import SearchIcon from '@mui/icons-material/Search';
// import ButtonApplyStyleItem from './ButtonApplyStyleItem';

interface DrawerStylesMobileProps {
  open: boolean;
  handleToggle: (status: string) => void;
  openSort: () => void;
}

const DrawerDimensionMobile: React.FC<DrawerStylesMobileProps> = ({
  open,
  handleToggle,
}) => {
  return (
    <>
      <Drawer
        anchor="bottom"
        open={open}
        onClose={handleToggle}
        sx={{
          zIndex: 999999999,
          '.MuiPaper-root': {
            height: '40vh',
            padding: '8px 16px',
            borderTopLeftRadius: '6px',
            borderTopRightRadius: '6px',
          },
        }}
      >
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <ColourTemplate />
        </Box>
      </Drawer>
    </>
  );
};

export default DrawerDimensionMobile;
