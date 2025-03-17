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
import { useEffect } from 'react';
import { GalleyislandProps } from '@/types/galleyisland';
import { useKitchenStore } from '@/store/useKitchenStore';
import { drawerStore } from '@/store';

// Copy StyledSpeedDial từ PopoverHelper

export default function Galleyisland(): React.ReactElement<GalleyislandProps> {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('tablet'));
  const { closeDrawer } = drawerStore();
  const {
    isGalleyislandDisabled,
    isGalleyislandVisible,
    setGalleyislandDisabled,
    setGalleyislandVisible,
    setAllDisabled,
    setKitchenDisabled,
    setBackwallDisabled,
    setFloorDisabled,
  } = useKitchenStore();

  const [state, setState] = React.useState({
    direction: 'right' as SpeedDialProps['direction'],
    isExpanded: true,
  });

  const handleToggleDisable = () => {
    const newState = !isGalleyislandDisabled;
    setGalleyislandDisabled(newState);
    emitter.emit(THREE_EVENTS.TOGGLE_ISLAND, newState);
  };

  const handleClick = () => {
    setState((prev) => ({
      ...prev,
      isExpanded: !prev.isExpanded,
    }));
  };

  const handleView = () => {
    setTimeout(() => {
      emitter.emit(THREE_EVENTS.screenShotIndoorIslandSingle);
    }, 0);
    setGalleyislandDisabled(true);
    setKitchenDisabled(false);
    setBackwallDisabled(false);
    setFloorDisabled(false);
    closeDrawer();
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
          marginBottom: '8px',
        }}
      >
        GALLEY ISLAND
      </Typography>
      <Box
        sx={{
          display: 'flex',
          gap: '2px',
          alignItems: 'center',
        }}
      >
        <Button
          onClick={handleToggleDisable}
          startIcon={
            isGalleyislandDisabled ? (
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
            border: `1px solid ${isGalleyislandDisabled ? '#00A76F' : '#e0e0e0'} !important`,
            color: `${isGalleyislandDisabled ? '#fff' : '#4A4747'} !important`,
            fontSize: '12px',
            fontWeight: 700,
            background: `${isGalleyislandDisabled ? '#00A76F' : '#fff'} !important`,
            boxShadow: 'none',
            '&:hover': {
              background: `${isGalleyislandDisabled ? '#00A76F' : '#fff'} !important`,
              border: `1px solid ${isGalleyislandDisabled ? '#00A76F' : '#e0e0e0'} !important`,
              boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
            },
          }}
        >
          {isGalleyislandDisabled ? 'Enable' : 'Disable'}
        </Button>
        <Button
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
        </Button>
      </Box>
    </Box>
  );
}
