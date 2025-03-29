import React, { ReactNode } from 'react';
import { Button, SxProps, Theme } from '@mui/material';

interface ButtonEditProps {
  text: string;
  icon?: ReactNode;
  sx?: SxProps<Theme>;
  variant?: 'contained' | 'outlined' | 'text';
  color?: 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning';
  size?: 'small' | 'medium' | 'large';
  onClick?: () => void;
  startIcon?: ReactNode;
  endIcon?: ReactNode;
  disabled?: boolean;
  fullWidth?: boolean;
  type?: 'button' | 'submit' | 'reset';
}

const ButtonEdit: React.FC<ButtonEditProps> = ({
  text,
  icon,
  sx,
  variant = 'contained',
  color = 'primary',
  size = 'medium',
  onClick,
  startIcon = icon,
  endIcon,
  disabled = false,
  fullWidth = false,
  type = 'button',
}) => {
  return (
    <Button
      variant={variant}
      color={color}
      size={size}
      onClick={onClick}
      startIcon={startIcon}
      endIcon={endIcon}
      disabled={disabled}
      fullWidth={fullWidth}
      type={type}
      sx={sx}
    >
      {text}
    </Button>
  );
};

export default ButtonEdit;
