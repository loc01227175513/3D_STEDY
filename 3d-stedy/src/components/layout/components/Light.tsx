import * as React from 'react';
import {
  Box,
  Button,
  Typography,
  styled,
  useMediaQuery,
  useTheme,
  SpeedDial,
  SpeedDialProps,
} from '@mui/material';
import CircleIcon from '@mui/icons-material/Circle';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import IconArrowNext from '/icons/icon-arrow-next.png';
import { emitter, THREE_EVENTS } from '@/utils/events';
import { useEffect, useState } from 'react';
import { BackwallProps } from '@/types/backwall';
import { useKitchenStore } from '@/store/useKitchenStore';

export default function Light(props: BackwallProps): React.ReactElement {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('tablet'));
  const {

    isFloorDisabled,
    setLightDisabled,
    isLightDisabled,
  } = useKitchenStore();

  const handleToggleDisable = () => {
    const newDisabledState = !isLightDisabled;
    console.log('newDisabledState', newDisabledState);
    setLightDisabled(newDisabledState);
    emitter.emit(THREE_EVENTS.TOGGLE_LIGHT, newDisabledState);
  };



  return (
    <Box 
      sx={{ 
        display: 'flex', 
        flexDirection: 'column',
 
        background: '#fff',
      }}
    >
      <Typography
        sx={{
          color: '#4A4747',
          fontWeight: 800,
          fontSize: '12px',
          lineHeight: '32px',
          letterSpacing: '0.1em',
          marginBottom: '8px'
        }}
      >
        Light
      </Typography>
      <Box 
        sx={{ 
          display: 'flex', 
          gap: '12px',
          alignItems: 'center'
        }}
      >
        <Button
          onClick={handleToggleDisable}
          startIcon={
            isLightDisabled ? (
              <CheckCircleOutlineIcon
                sx={{ fontSize: 16, color: '#fff !important' }}
              />
            ) : (
              <CircleIcon sx={{ fontSize: 8, color: '#4A4747 !important' }} />
            )
          }
          sx={{
            textTransform: 'none',
            minWidth: '100px !important',
            height: '32px',
            px: 2,
            borderRadius: '8px',
            border: `1px solid ${isLightDisabled ? '#00A76F' : '#e0e0e0'} !important`,
            color: `${isLightDisabled ? '#fff' : '#4A4747'} !important`,
            fontSize: '12px',
            fontWeight: 700,
            background: `${isLightDisabled ? '#00A76F' : '#fff'} !important`,
            boxShadow: 'none',
            '&:hover': {
              background: `${isLightDisabled ? '#00A76F' : '#fff'} !important`,
              border: `1px solid ${isLightDisabled ? '#00A76F' : '#e0e0e0'} !important`,
              boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
            },
          }}
        >
          {isLightDisabled ? 'Play' : 'Pause'}
        </Button>
        
      </Box>
    </Box>
  );
}
