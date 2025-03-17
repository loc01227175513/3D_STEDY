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
import {
  KitchenProps,
  KitchenState,
  StyleHeaderBoxProps,
  StyledSpeedDialProps,
  HandlersProps,
} from '@/types/kitchen';
import { useKitchenStore } from '@/store/useKitchenStore';
import { drawerStore } from '@/store';

const StyledSpeedDial = styled(SpeedDial)<StyledSpeedDialProps>(
  ({ theme }) => ({
    '& .MuiSpeedDial-actions': {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      padding: '0 8px',

      '& .MuiTypography-root': {
        margin: '0 8px',
      },

      '& .MuiButton-root': {
        height: '32px',
        margin: '0 4px',
      },
    },

    '&.MuiSpeedDial-directionUp, &.MuiSpeedDial-directionLeft': {
      bottom: theme.spacing(2),
      right: theme.spacing(2),
    },
    '&.MuiSpeedDial-directionDown, &.MuiSpeedDial-directionRight': {
      top: theme.spacing(2),
      left: theme.spacing(2),
    },
  })
);

export default function Kitchen(): React.ReactElement<KitchenProps> {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('tablet'));
  const {
    isKitchenDisabled,
    isKitchenVisible,
    setKitchenDisabled,
    setKitchenVisible,
    setAllDisabled,
    setBackwallDisabled,
    setGalleyislandDisabled,
    setFloorDisabled,
  } = useKitchenStore();
  const { closeDrawer } = drawerStore();

  const [state, setState] = useState<KitchenState>({
    direction: 'right',
    isExpanded: true,
    isDisabled: false,
    isKitchenVisible: true,
    isIslandVisible: false,
  });

  const handleToggleDisable = () => {
    const newDisabledState = !isKitchenDisabled;
    setKitchenDisabled(newDisabledState);
    emitter.emit(THREE_EVENTS.TOGGLE_KITCHEN, newDisabledState);
  };

  const handleClick = () => {
    setState((prev) => ({
      ...prev,
      isExpanded: !prev.isExpanded,
    }));
  };

  const handleView = () => {
    emitter.emit(THREE_EVENTS.screenShotIndoorKitchenSingle);
    setBackwallDisabled(false);
    setKitchenDisabled(true);
    setGalleyislandDisabled(false);
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
          marginBottom: '8px'
        }}
      >
        KITCHEN
      </Typography>
      <Box 
        sx={{ 
          display: 'flex', 
          gap: '2px',
          width: '100%',
          alignItems: 'center',
          justifyContent: 'start'
        }}
      >
        <Button
          onClick={handleToggleDisable}
          startIcon={
            isKitchenDisabled ? (
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
            border: `1px solid ${isKitchenDisabled ? '#00A76F' : '#e0e0e0'} !important`,
            color: `${isKitchenDisabled ? '#fff' : '#4A4747'} !important`,
            fontSize: '12px',
            fontWeight: 700,
            background: `${isKitchenDisabled ? '#00A76F' : '#fff'} !important`,
            boxShadow: 'none',
            '&:hover': {
              background: `${isKitchenDisabled ? '#00A76F' : '#fff'} !important`,
              border: `1px solid ${isKitchenDisabled ? '#00A76F' : '#e0e0e0'} !important`,
              boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
            },
          }}
        >
          {isKitchenDisabled ? 'Enable' : 'Disable'}
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
