import * as React from 'react';
import {
  Box,
  Button,
  Menu,
  MenuItem,
  SpeedDial,
  SpeedDialAction,
  SpeedDialProps,
  styled,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import IconFullScreen from '/icons/icon-fullscreen.png';
import IconZoomIn from '/icons/icon-zoom-in.png';
import IconZoomOut from '/icons/icon-zoom-out.png';
import IconRuler from '/icons/icon_ruler.png';
import IconArrowNext from '/icons/icon-arrow-next.png';
import IconRefresh from '/icons/icon-refresh.png';
import IconFrontView from '/icons/icon-style-cabinet.png';
import { emitter, THREE_EVENTS } from '@/utils/events';
import { productStore } from '@/store';
import DarkModeRoundedIcon from '@mui/icons-material/DarkModeRounded';
import LightModeIcon from '@mui/icons-material/LightMode';
import LivingRoundedIcon from '@mui/icons-material/LivingRounded';
import WbTwilightRoundedIcon from '@mui/icons-material/WbTwilightRounded';
import { use3DEnvironmentStore } from '@/store/use3DEnviromentStore';
import { useDimensionStore } from '@/store/useDimensionStore';
import { fullscreenStore } from '@/store/fullscreenStore';
import { useMappingStore } from '@/store/useMappingStore';
import { useMeshProductStore } from '@/store/useMeshProductStore';

const ZOOM_STEP = 2;

export default function PopoverHelperIndo(): React.ReactElement {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('tablet'));
  const { listCart, clearListCart } = productStore();
  const [isExpanded, setIsExpanded] = React.useState(true);
  const { environmentState, setEnvironmentState } = use3DEnvironmentStore();
  const { showDimension, setShowDimension } = useDimensionStore();
  const { showFullScreen, setShowFullScreen } = fullscreenStore();
  const { resetStore } = useMappingStore();
  const { reset: resetMeshProductStore } = useMeshProductStore();

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);


  const handleShowChangeLight = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <>
      <Box 
        sx={{ 
          '& .MuiButtonBase-root': {
            width: '40px !important',
            height: '40px !important',
            minWidth: '40px',
            borderRadius: '50%',
            padding: 0,
            
            '&:hover': {
              backgroundColor: '#4A4747',
            },
            '&.active': {
              backgroundColor: '#4A4747',
            }
          }
        }}
      >
        
              <Button onClick={handleShowChangeLight} disableRipple={true}>
                <LightModeIcon sx={{ color: '#707070' }} />
              </Button>
              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                  'aria-labelledby': 'basic-button',
                }}
              >
                <MenuItem
                  selected={environmentState === 'city'}
                  onClick={handleClose}
                  sx={{ gap: '5px' }}
                >
                  <Box
                    sx={{ display: 'flex', alignItems: 'center', gap: '7px' }}
                    onClick={() => setEnvironmentState('city')}
                  >
                    <LivingRoundedIcon sx={{ color: '#707070' }} /> Natural
                  </Box>
                </MenuItem>
                <MenuItem
                  selected={environmentState === 'sunset'}
                  onClick={handleClose}
                  sx={{ gap: '5px' }}
                >
                  <Box
                    sx={{ display: 'flex', alignItems: 'center', gap: '7px' }}
                    onClick={() => setEnvironmentState('sunset')}
                  >
                    <WbTwilightRoundedIcon sx={{ color: '#707070' }} /> Sunset
                  </Box>
                </MenuItem>
                <MenuItem
                  selected={environmentState === 'night'}
                  onClick={handleClose}
                  sx={{ gap: '5px' }}
                >
                  <Box
                    sx={{ display: 'flex', alignItems: 'center', gap: '7px' }}
                    onClick={() => setEnvironmentState('night')}
                  >
                    <DarkModeRoundedIcon sx={{ color: '#707070' }} /> Night
                  </Box>
                </MenuItem>
              </Menu>
       
   
        <Button
          onClick={() => setShowDimension(!showDimension)}
          className={showDimension ? 'active' : ''}
        >
          <img
            src={IconRuler}
            alt={'Show dimension'}
            width={isMobile ? 20 : 24}
            height={isMobile ? 20 : 24}
            style={{
              margin: 'auto',
              filter: showDimension ? 'drop-shadow(0px 100px 0 #ffffff)' : '',
              transform: showDimension ? 'translateY(-100px)' : '',
            
            }}
          />
        </Button>
        <Button
          onClick={() => emitter.emit(THREE_EVENTS.zoom, -ZOOM_STEP)}
        >
          <img
            src={IconZoomIn}
            alt={'Zoom In'}
            width={isMobile ? 20 : 24}
            height={isMobile ? 20 : 24}
          />
        </Button>
        <Button
          onClick={() => emitter.emit(THREE_EVENTS.zoom, ZOOM_STEP)}
        >
          <img
            src={IconZoomOut}
            alt={'Zoom Out'}
            width={isMobile ? 20 : 24}
            height={isMobile ? 20 : 24}
          />
        </Button>
        <Button
          onClick={() => emitter.emit(THREE_EVENTS.frontView)}
        >
          <img
            src={IconFrontView}
            alt={'Front view'}
            width={isMobile ? 20 : 24}
            height={isMobile ? 20 : 24}
          />
        </Button>
        <Button
          onClick={() => {
            clearListCart();
            resetStore();
            resetMeshProductStore();
            emitter.emit(THREE_EVENTS.removeAllModel);
          }}
        >
          <img
            src={IconRefresh}
            alt={'Refresh'}
            width={isMobile ? 20 : 24}
            height={isMobile ? 20 : 24}
          />
        </Button>
        <Button
          onClick={() => emitter.emit(THREE_EVENTS.fullScreen)}
          className={showFullScreen ? 'active' : ''}
        >
          <img
            src={IconFullScreen}
            alt={'Full Screen'}
            width={isMobile ? 20 : 24}
            height={isMobile ? 20 : 24}
          />
        </Button>
      </Box>
    </>
  );
}


