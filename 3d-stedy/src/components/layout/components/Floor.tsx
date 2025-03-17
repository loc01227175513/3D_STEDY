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

export default function Floor(props: BackwallProps): React.ReactElement {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('tablet'));
  const {
    isBackwallDisabled,
    isBackwallVisible,
    setBackwallDisabled,
    setBackwallVisible,
    setKitchenDisabled,
    setGalleyislandDisabled,
    setFloorDisabled,
    isFloorDisabled,
  } = useKitchenStore();

  const handleToggleDisable = () => {
    const newDisabledState = !isFloorDisabled;
    setFloorDisabled(newDisabledState);
    emitter.emit(THREE_EVENTS.toggleFloor, newDisabledState);
  };

  const handleView = () => {
    emitter.emit(THREE_EVENTS.screenShotIndoorBackWall);
    setBackwallDisabled(false);
    setKitchenDisabled(false);
    setGalleyislandDisabled(false);
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
        FLOOR
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
            isFloorDisabled ? (
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
            border: `1px solid ${isFloorDisabled ? '#00A76F' : '#e0e0e0'} !important`,
            color: `${isFloorDisabled ? '#fff' : '#4A4747'} !important`,
            fontSize: '12px',
            fontWeight: 700,
            background: `${isFloorDisabled ? '#00A76F' : '#fff'} !important`,
            boxShadow: 'none',
            '&:hover': {
              background: `${isFloorDisabled ? '#00A76F' : '#fff'} !important`,
              border: `1px solid ${isFloorDisabled ? '#00A76F' : '#e0e0e0'} !important`,
              boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
            },
          }}
        >
          {isFloorDisabled ? 'Enable' : 'Disable'}
        </Button>
          {/* <Button
            onClick={handleView}
            sx={{
              textTransform: 'none',
              height: '32px',
              borderRadius: '8px',
              border: '1px solid #e0e0e0 !important',
              minWidth: '80px !important',
              px: 2,
              color: '#4A4747',
              fontSize: '12px',
              fontWeight: 700,
              background: '#fff',
              boxShadow: 'none',
              '&:hover': {
                background: '#f5f5f5',
                boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
              },
            }}
          >
            View
          </Button> */}
      </Box>
    </Box>
  );
}
