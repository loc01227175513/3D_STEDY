import { SxProps } from '@mui/material';

interface ButtonStyles {
  optionsButton: (isActive: boolean) => SxProps;
  floorButton: (isActive: boolean) => SxProps;
  buttonGroup: SxProps;
  viewModeButton: (isActive: boolean) => SxProps;
  viewModeButtonGroup: SxProps;
}

export const buttonStyles: ButtonStyles = {
  buttonGroup: {
    width: '100%',
    height: '45px',
    backgroundColor: 'white',
    padding: 0,
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
    borderRadius: '8px',
    border: '1px solid #E0E0E0',
    '& .MuiButton-root': {
      border: 'none',
      borderRadius: 0,
      flex: 1,
      textTransform: 'none',
      fontSize: '14px',
    },
  },
  optionsButton: (isActive: boolean) => ({
    bgcolor: isActive ? '#333' : '#fff',
    color: isActive ? '#fff' : '#000',
    '&:hover': { bgcolor: isActive ? '#444' : '#f5f5f5' },
    borderRadius: '8px 0 0 8px !important',
    fontWeight: 'bold',
    minWidth: 'unset',
  }),
  floorButton: (isActive: boolean) => ({
    bgcolor: isActive ? '#333' : '#fff',
    color: isActive ? '#fff' : '#000',
    '&:hover': { bgcolor: isActive ? '#444' : '#f5f5f5' },
    borderRadius: '0 8px 8px 0 !important',
    fontWeight: 'bold',
    minWidth: 'unset',
    borderLeft: isActive ? 'none' : '1px solid #E0E0E0',
  }),
  viewModeButtonGroup: {
    width: '100%',
    height: '45px',
    backgroundColor: 'white',
    padding: 0,
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
    borderRadius: '5px',
    border: '1px solid #E0E0E0',
    overflow: 'hidden',
    '& .MuiButton-root': {
      border: 'none',
      borderRadius: 0,
      flex: 1,
      textTransform: 'none',
      position: 'relative',
      '&:not(:last-child)::after': {
        content: '""',
        position: 'absolute',
        right: 0,
        top: '10%',
        height: '80%',
        width: '1px',
        backgroundColor: '#E0E0E0',
      },
    },
    '& .MuiButton-root:first-of-type': {
      borderRadius: '5px 0 0 5px !important',
    },
    '& .MuiButton-root:last-of-type': {
      borderRadius: '0 5px 5px 0 !important',
    },
  },
  viewModeButton: (isActive: boolean) => ({
    bgcolor: isActive ? '#296df6' : '#fff',
    color: isActive ? '#fff' : '#000',
    fontWeight: 'bold',
    fontSize: '16px',
    '&:hover': {
      bgcolor: isActive ? '#1756d8' : '#f5f5f5',
    },
    minWidth: 'unset',
    padding: '6px 16px',
    '& .MuiButton-startIcon': {
      marginRight: '4px',
    },
    '&::after': {
      display: isActive ? 'none' : 'block',
    },
  }),
};
