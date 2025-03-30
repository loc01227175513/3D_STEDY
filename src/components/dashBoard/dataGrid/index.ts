import { SxProps, Theme } from '@mui/material';

// DataGrid styles
export const dataGridStyles = {
  container: {
    width: '100%',
    mb: 2,
    display: 'flex',
    flexDirection: 'column',
    height: 'calc(100vh - 130px)', // Fixed height based on viewport
    borderRadius: '8px',
    overflow: 'hidden', // Keep container overflow hidden to maintain fixed height
    boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.05)',
    boxSizing: 'border-box',
    maxWidth: '100%',
  },

  // Toolbar styles
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    mb: 1,
    p: 1,
    borderBottom: '1px solid rgba(0, 0, 0, 0.05)',
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
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden', // Keep container hidden to maintain fixed height
    width: '100%', // Constrain width to 100% of parent
    maxWidth: '100%', // Ensure it doesn't grow beyond parent width
    boxSizing: 'border-box',
    '& .bold-header': {
      fontWeight: 800,
    },
  },
  dataGrid: {
    height: '100%',
    border: 'none',
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
    width: '100%', // Constrain width
    maxWidth: '100%', // Prevent expansion
    boxSizing: 'border-box',
    tableLayout: 'fixed',
    '& .MuiDataGrid-main': {
      flexGrow: 1,
      overflow: 'hidden', // Keep main container hidden
      width: '100%', // Constrain width
      maxWidth: '100%',
      boxSizing: 'border-box',
    },
    '& .MuiDataGrid-virtualScroller': {
      // Only allow scrolling on the virtual scroller
      overflowY: 'auto !important', // Force scrollbar visible
      overflowX: 'auto !important', // Force scrollbar visible
      width: '100%',
      maxWidth: '100%',
      // Firefox scrollbar styling
      scrollbarWidth: 'thin',
      scrollbarColor: '#c1c1c1 #f1f1f1',
      // Add custom scrollbar styling for better visibility
      '&::-webkit-scrollbar': {
        width: '10px',
        height: '10px',
      },
      '&::-webkit-scrollbar-track': {
        backgroundColor: '#f1f1f1',
        borderRadius: '4px',
      },
      '&::-webkit-scrollbar-thumb': {
        backgroundColor: '#c1c1c1',
        borderRadius: '4px',
        border: '1px solid #f1f1f1',
        '&:hover': {
          backgroundColor: '#a8a8a8',
        },
      },
    },
    '& .MuiDataGrid-columnHeaders': {
      backgroundColor: '#F6F8FA',
      borderRadius: '10px',
      '& .MuiDataGrid-columnHeader': {
        backgroundColor: '#F6F8FA',
        overflow: 'hidden', // Prevent expansion
        whiteSpace: 'nowrap', // Prevent text wrapping
        textOverflow: 'ellipsis', // Show ellipsis for overflow
      },
      '& .MuiDataGrid-columnHeaderTitle': {
        fontWeight: 'bold',
        fontSize: '15px',
        color: '#000000',
        textTransform: 'capitalize',
        letterSpacing: '0.5px',
        overflow: 'hidden', // Prevent expansion
        textOverflow: 'ellipsis', // Show ellipsis for overflow
      },
    },
    '& .MuiDataGrid-row': {
      width: '100%', // Constrain row width
      '& .MuiDataGrid-cell': {
        borderBottom: 'none',
        maxWidth: 'inherit', // Respect parent width constraints
      },
    },
    '& .MuiDataGrid-cell': {
      display: 'flex',
      alignItems: 'center',
      whiteSpace: 'normal',
      overflow: 'hidden', // Changed from visible to hidden
      textOverflow: 'ellipsis', // Add ellipsis for text overflow
      lineHeight: 'normal',
      wordWrap: 'break-word',
      padding: '8px 16px',
      borderRight: 'none',
      maxWidth: '100%', // Constrain cell width
    },
    '& .MuiDataGrid-footerContainer': {
      justifyContent: 'center',
      borderTop: '1px solid rgba(0, 0, 0, 0.05)',
      position: 'sticky',
      bottom: 0,
      backgroundColor: 'white',
      zIndex: 2, // Increase z-index to ensure it stays on top
    },
  },

  // Pagination styles
  paginationContainer: {
    display: 'flex',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
    p: 1,
    backgroundColor: 'white',
    position: 'sticky', // Make pagination sticky at bottom
    bottom: 0,
    zIndex: 3, // Higher z-index than the footer container
    minHeight: '56px', // Ensure minimum height for pagination
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
