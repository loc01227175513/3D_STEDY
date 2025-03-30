import { SxProps } from '@mui/material';

// Box styles
export const dashboardContainerStyle: SxProps = {
  height: 'calc(100vh - 80px)', // Adjust based on your layout (subtract header/footer height)
  display: 'flex',
  flexDirection: 'column',
  padding: '16px',
};

// Typography styles
export const fullNameStyle: SxProps = {
  fontWeight: 600,
  fontSize: '14px',
};

export const emailStyle: SxProps = {
  color: 'text.secondary',
  fontSize: '12px',
};

export const fullNameContainerStyle: SxProps = {
  display: 'flex',
  flexDirection: 'column',
};

export const communityFloorplanStyle: SxProps = {
  fontWeight: 500,
  fontSize: '14px',
};
