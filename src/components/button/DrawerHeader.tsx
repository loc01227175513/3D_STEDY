import React from 'react';
import { DrawerHeader } from '@/pages/public/style';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { IconButton, Typography } from '@mui/material';

interface DrawerHeaderProps {
  onBackClick: () => void;
  title?: string;
}

const DrawerHeaderComponent: React.FC<DrawerHeaderProps> = ({ onBackClick, title = 'Back to Floorplan' }) => {
  return (
    <DrawerHeader>
      <IconButton onClick={onBackClick} size="small" sx={{ backgroundColor: 'white' }}>
        <ArrowBackIcon />
      </IconButton>
      <Typography variant="h6" sx={{ ml: 1 }}>
        {title}
      </Typography>
    </DrawerHeader>
  );
};

export default DrawerHeaderComponent;
