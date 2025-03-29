import React from 'react';
import { Button, ButtonProps } from '@mui/material';

interface ButtonCommonProps extends ButtonProps {
  children: React.ReactNode;
}

const ButtonCommon = ({ children, sx, ...props }: ButtonCommonProps) => {
  return (
    <Button
      variant="contained"
      sx={{
        bgcolor: '#296df6',
        color: 'white',
        padding: '8px 24px',
        textTransform: 'none',
        fontWeight: 'bold',
        fontSize: '16px',
        height: 'fit-content',
        '&:hover': {
          bgcolor: '#1756d0',
        },
        ...sx,
      }}
      {...props}
    >
      {children}
    </Button>
  );
};

export default ButtonCommon;
