import { SxProps, Theme } from '@mui/material';

// DataGrid styles
export const dataGridStyles = {
  container: {
    width: '100%',
    mb: 2,
  },

  // Toolbar styles
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    mb: 1,
    p: 1,
  },
  checkboxContainer: {
    display: 'flex',
    alignItems: 'center',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  checkbox: {
    '& .MuiSvgIcon-root': {
      fontSize: 25,
    },
    padding: '4px',
  },
  dropdownIcon: {
    color: '#6E6E6E',
    fontSize: 20,
  },
  tabsContainer: {
    ml: 2,
    minHeight: '32px',
    '& .MuiTabs-indicator': {
      display: 'none',
    },
  },
  tab: (isSelected: boolean): SxProps<Theme> => ({
    minHeight: '32px',
    py: 0,
    px: 1,
    minWidth: '60px',
    border: '1px solid #E0E0E0',
    mx: 0.5,
    borderRadius: '8px',
    color: isSelected ? 'white !important' : 'inherit',
    bgcolor: isSelected ? 'black' : 'transparent',
    '&:hover': {
      bgcolor: isSelected ? 'black' : 'rgba(0, 0, 0, 0.04)',
    },
  }),
  tabWithPadding: (isSelected: boolean): SxProps<Theme> => ({
    minHeight: '32px',
    py: 0,
    px: 2,
    borderRadius: '8px',
    border: '1px solid #E0E0E0',
    mx: 0.5,
    color: isSelected ? 'white !important' : 'inherit',
    bgcolor: isSelected ? 'black' : 'transparent',
    '&:hover': {
      bgcolor: isSelected ? 'black' : 'rgba(0, 0, 0, 0.04)',
    },
  }),
  flexGrow: {
    flexGrow: 1,
  },
  searchField: {
    mr: 1,
    width: '360px',
    '& .MuiOutlinedInput-root': {
      borderRadius: '8px',
      '& fieldset': {
        borderRadius: '8px',
        border: '1px solid #E0E0E0',
      },
    },
  },
  filterButton: {
    border: '1px solid #E0E0E0',
    borderRadius: '8px',
    mr: 1,
    color: '#6E6E6E',
    textTransform: 'capitalize',
  },
  sortButton: {
    border: '1px solid #E0E0E0',
    borderRadius: '8px',
    color: '#6E6E6E',
    textTransform: 'capitalize',
  },

  // DataGrid styles
  gridContainer: {
    height: 'calc(100vh - 200px)',
    width: '100%',
    '& .bold-header': {
      fontWeight: 800,
    },
  },
  dataGrid: {
    height: '100%',
    border: 'none',
    '& .MuiDataGrid-columnHeaders': {
      backgroundColor: '#F6F8FA',
      borderRadius: '10px',
      '& .MuiDataGrid-columnHeader': {
        backgroundColor: '#F6F8FA',
      },
      '& .MuiDataGrid-columnHeaderTitle': {
        fontWeight: 'bold',
        fontSize: '15px',
        color: '#000000',
        textTransform: 'capitalize',
        letterSpacing: '0.5px',
      },
    },
    '& .MuiDataGrid-row': {
      '& .MuiDataGrid-cell': {
        borderBottom: 'none',
      },
    },
    '& .MuiDataGrid-cell': {
      display: 'flex',
      alignItems: 'center',
      whiteSpace: 'normal',
      overflow: 'visible',
      lineHeight: 'normal',
      wordWrap: 'break-word',
      padding: '8px 16px',
      borderRight: 'none',
    },
    '& .MuiDataGrid-footerContainer': {
      justifyContent: 'center',
      borderTop: 'none',
    },
  },

  // Pagination styles
  paginationContainer: {
    display: 'flex',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
    p: 1,
  },
  pageButton: (isSelected: boolean): SxProps<Theme> => ({
    minWidth: '32px',
    height: '32px',
    padding: '0',
    mx: 0.5,
    border: '2px solid #E0E0E0',
    fontWeight: 'bold',
    fontSize: '0.875rem',
    bgcolor: isSelected ? '#296DF6' : 'transparent',
    color: isSelected ? 'white' : 'text.primary',
    '&:hover': {
      bgcolor: isSelected ? 'primary.dark' : 'rgba(0, 0, 0, 0.04)',
    },
    borderRadius: '4px',
  }),
  paginationNavButton: {
    mx: 0.5,
    textTransform: 'none',
    border: '2px solid #E0E0E0',
    borderRadius: '8px',
    fontWeight: 'bold',
    fontSize: '0.875rem',
  },
  actionCell: {
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: '#EBF1FF',
    borderRadius: '8px',
  },
};

export { default } from './dataGrid';
