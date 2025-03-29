import React from 'react';
import { Button } from '@mui/material';

interface ButtonModalProps {
  variant?: 'text' | 'outlined' | 'contained';
  onClick?: () => void;
  title: string;
  color?: string;
  hoverColor?: string;
  textColor?: string;
  bgcolor?: string;
}

const ButtonModal: React.FC<ButtonModalProps> = ({
  variant = 'contained',
  onClick,
  title,
  color = '#296df6',
  hoverColor = '#1756d8',
  textColor = 'white',
  bgcolor = '#296df6',
}) => {
  return (
    <Button
      variant={variant}
      onClick={onClick}
      sx={{
        bgcolor: bgcolor,
        padding: '10px 20px',
        color: variant === 'text' ? color : textColor,
        textTransform: 'capitalize',
        fontWeight: 'bold',
        '&:hover': {
          bgcolor: variant === 'text' ? `${color}10` : hoverColor,
        },
      }}
    >
      {title}
    </Button>
  );
};

export default ButtonModal;
