import React from 'react';
import { Box, Button, SxProps, Theme } from '@mui/material';

interface LoadButtonWithIconProps {
  iconSrc?: string;
  iconComponent?: React.ReactNode;
  text: string;
  onClick: (e: React.MouseEvent<HTMLElement>) => void;
  buttonSx?: SxProps<Theme>;
  iconSx?: SxProps<Theme>;
  containerSx?: SxProps<Theme>;
  size?: 'small' | 'medium' | 'large';
}

export const LoadButtonWithIcon: React.FC<LoadButtonWithIconProps> = ({
  iconSrc,
  iconComponent,
  text,
  onClick,
  buttonSx = { minWidth: 'auto', color: 'primary.main', textTransform: 'none', p: 0 },
  iconSx = { width: '12px', height: '12px' },
  containerSx = {
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: '#EBF1FF',
    borderRadius: '8px',
    px: 2,
  },
  size = 'small',
}) => {
  // Generate the icon based on whether iconSrc or iconComponent is provided
  const startIcon = iconSrc ? <Box component="img" src={iconSrc} sx={iconSx} /> : iconComponent;

  return (
    <Box sx={containerSx}>
      <Button startIcon={startIcon} size={size} onClick={onClick} sx={buttonSx}>
        {text}
      </Button>
    </Box>
  );
};

export default LoadButtonWithIcon;
