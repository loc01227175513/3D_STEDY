import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';

export const ToolbarContainer = styled(Box)(() => ({
  position: 'fixed',
  top: 20,
  right: 20,
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
  padding: '8px',
  borderRadius: '8px',
  zIndex: 1000,
}));

export const ButtonGroup = styled(Box)({
  display: 'flex',
  flexDirection: 'row',
  gap: '4px',
  backgroundColor: '#F0F0F0',
  padding: '10px',
  borderRadius: '8px',
  '& .MuiIconButton-root': {
    backgroundColor: 'white',
    borderRadius: '4px',
    '& .MuiSvgIcon-root': {
      color: '#000000',
    },
    '&:hover': {
      backgroundColor: '#e0e0e0',
    },
  },
});

export const RoofControl = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '12px 16px',
  backgroundColor: '#F0F0F0',
  borderRadius: '8px',
  width: '100%',
  boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
  '& .roof-label': {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    color: '#333',
    '& .MuiSvgIcon-root': {
      color: '#000000',
    },
  },
});
