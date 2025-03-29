import React from 'react';
import { Button, CircularProgress } from '@mui/material';

interface ButtonLoadingProps {
  loading?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  children?: React.ReactNode;
  type?: 'button' | 'submit' | 'reset';
  variant?: 'text' | 'outlined' | 'contained';
  color?: 'inherit' | 'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning';
  fullWidth?: boolean;
  size?: 'small' | 'medium' | 'large';
}

const ButtonLoading = ({
  loading = false,
  disabled = false,
  onClick,
  children,
  type = 'button',
  variant = 'contained',
  color = 'primary',
  fullWidth = false,
  size = 'medium',
}: ButtonLoadingProps): React.JSX.Element => {
  return (
    <Button
      type={type}
      variant={variant}
      color={color}
      disabled={disabled || loading}
      onClick={onClick}
      fullWidth={fullWidth}
      size={size}
      sx={{
        height: '50px',
        position: 'relative',
        minWidth: '5px',
        borderRadius: '8px',
        backgroundColor: '#296df6',
        '&.Mui-disabled': {
          backgroundColor: loading ? '#1976d2' : undefined,
          color: loading ? '#fff' : undefined,
        },
      }}
    >
      {loading && (
        <CircularProgress
          size={24}
          sx={{
            position: 'absolute',
            color: '#fff',
          }}
        />
      )}
      <span style={{ visibility: loading ? 'hidden' : 'visible' }}>{children}</span>
    </Button>
  );
};

export default ButtonLoading;
