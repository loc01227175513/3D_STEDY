import { SxProps, Theme } from '@mui/material/styles';

// Box styles
export const dashboardContainerStyle: SxProps<Theme> = {
  p: 2,
  height: '100vh',
  display: 'flex',
  flexDirection: 'column',
};

// Typography styles
export const fullNameStyle: SxProps<Theme> = {
  fontSize: '16px',
  wordBreak: 'break-word',
};

export const emailStyle: SxProps<Theme> = {
  fontSize: '12px',
  color: 'text.secondary',
  wordBreak: 'break-word',
};

export const fullNameContainerStyle: SxProps<Theme> = {
  width: '100%',
};

export const communityFloorplanStyle: SxProps<Theme> = {
  fontWeight: 'medium',
};
