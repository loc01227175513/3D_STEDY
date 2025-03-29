import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';

export const DRAWER_WIDTH = 400;
export const DRAWER_DASHBOARD = 250;
export const MainContent = styled(Box)(({ theme }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: 0,
  minHeight: '100vh',
  backgroundColor: theme.palette.background.default,
}));

export const MainContentShift = styled(MainContent)(({ theme }) => ({
  marginLeft: -DRAWER_WIDTH,
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.easeOut,
    duration: theme.transitions.duration.enteringScreen,
  }),
}));

export const DrawerHeader = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(2),
  borderBottom: `1px solid white`,
}));

export const MenuButton = {
  position: 'fixed',
  top: '50%',
  transform: 'translateY(-50%)',
  left: (open: boolean) => (open ? 280 : 0),
  zIndex: 9999,
  transition: 'all 0.2s ease-in-out',
  backgroundColor: '#d9e6ff',
  width: '30px',
  height: '60px',
  borderRadius: '4px',
  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  '&:hover': {
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
  },
};

export const RoomBox = {
  borderRadius: 1,
  p: 1,
  mb: 1,
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  gap: 2,
  '&:hover': {
    bgcolor: 'action.hover',
  },
};

export const FeaturePaper = {
  p: 1,
  boxShadow: 'none',
  display: 'flex',
  alignItems: 'center',
  gap: 1,
};
