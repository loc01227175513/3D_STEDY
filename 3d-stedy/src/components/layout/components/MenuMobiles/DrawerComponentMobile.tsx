import { useBrandStore } from '@/store';
import { Box, Button, Drawer, Typography } from '@mui/material';
import { useState } from 'react';
// import SearchIcon from '@mui/icons-material/Search';
// import ButtonApplyStyleItem from './ButtonApplyStyleItem';

interface DrawerStylesMobileProps {
  children: JSX.Element;
  open: boolean;
  handleToggle: (status: string) => void;
  openSort: () => void;
}

const DrawerComponentMobile: React.FC<DrawerStylesMobileProps> = ({
  open,
  handleToggle,
  children,
}) => {
  return (
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
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>{children}</Box>
    </Drawer>
  );
};

export default DrawerComponentMobile;
