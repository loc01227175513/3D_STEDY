import { Box, Button, FormControl, styled, Typography } from '@mui/material';

interface StyledButtonProps {
  isSelected?: boolean;
}

// Custom styled components for pagination
export const PaginationRoot = styled('nav')(({ theme }) => ({
  marginTop: theme.spacing(6),
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  width: '100%',
}));

export const PaginationInfo = styled(Typography)(({ theme }) => ({
  fontSize: '1rem',
  color: theme.palette.text.secondary,
  flex: '1 1 auto',
}));

export const PaginationList = styled('ul')({
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center',
  justifyContent: 'center',
  padding: 0,
  margin: 0,
  listStyle: 'none',
  flex: '2 1 auto',
});

export const RowsPerPageContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1),
  flex: '1 1 auto',
  justifyContent: 'flex-end',
}));

export const RowsPerPageLabel = styled(Typography)(({ theme }) => ({
  fontSize: '0.875rem',
  color: theme.palette.text.secondary,
}));

export const RowsPerPageSelect = styled(FormControl)(({ theme }) => ({
  minWidth: 80,
  marginLeft: theme.spacing(1),
}));

export const PaginationButton = styled(Button, {
  shouldForwardProp: (prop) => prop !== 'isSelected',
})<StyledButtonProps>(({ theme, isSelected }) => ({
  margin: theme.spacing(0.8),
  minWidth: 45,
  height: 45,
  fontSize: '1rem',
  fontWeight: isSelected ? 600 : 400,
  padding: theme.spacing(1, 1.5),
  borderRadius: theme.shape.borderRadius,
  color: isSelected ? theme.palette.primary.contrastText : theme.palette.text.primary,
  backgroundColor: isSelected ? '#296DF6' : theme.palette.background.paper,
  border: `1px solid ${isSelected ? theme.palette.primary.main : theme.palette.divider}`,
  boxShadow: isSelected ? theme.shadows[2] : 'none',
  '&:hover': {
    backgroundColor: isSelected ? theme.palette.primary.dark : theme.palette.action.hover,
    boxShadow: theme.shadows[2],
  },
  '&:focus': {
    boxShadow: `0 0 0 3px ${theme.palette.primary.light}`,
  },
  '&.Mui-disabled': {
    opacity: 0.5,
  },
  transition: theme.transitions.create(['background-color', 'box-shadow', 'border-color'], {
    duration: theme.transitions.duration.short,
  }),
}));

export const NavButton = styled(PaginationButton)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  minWidth: 50,
  height: 45,
  '& .MuiSvgIcon-root': {
    fontSize: '1.5rem',
  },
}));

export { default, usePagination } from './pagination';
