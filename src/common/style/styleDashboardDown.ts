const styleDashboardDown = {
  sx: {
    backgroundColor: '#fff',
    borderRadius: '8px',
    padding: '8px 12px',
    '&:hover': {
      backgroundColor: '#f5f5f5',
    },
  },
  sxIcon: {
    color: '#666',
    backgroundColor: '#e0e0e0',
    borderRadius: '50%',
    width: '40px',
    height: '40px',
    minWidth: '40px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: '12px',
  },
  sxText: {
    '& .MuiListItemText-primary': {
      color: '#000',
      fontSize: '14px',
      fontWeight: 'bold',
    },
    '& .MuiListItemText-secondary': {
      color: '#666',
      fontSize: '12px',
    },
  },
  sxArrow: {
    right: '12px',
  },
  startNewDesign: {
    borderRadius: '8px',
    backgroundColor: '#296df6',
    my: 2,
    '&:hover': {
      backgroundColor: 'rgba(41, 109, 246, 0.8)',
    },
  },
  startNewDesignIcon: {
    color: 'white',
  },
  startNewDesignText: {
    '& .MuiListItemText-primary': {
      color: 'white',
      fontSize: '14px',
      fontWeight: 'bold',
    },
  },
};
const styleDashboard = {
  sx: {
    backgroundColor: '#fff',
    borderRadius: '8px',
    padding: '8px 12px',
    my: 1,
  },
  sxIcon: {
    color: 'black',
  },
  sxText: {
    '& .MuiListItemText-primary': {
      color: '#000',
      fontSize: '14px',
    },
  },
  //   +++++++++++++++++++++++++++++++++++++++++++++++++++
  sxUsers: {
    backgroundColor: '#fff',
    borderRadius: '8px',
    padding: '8px 12px',
    marginTop: 4,
  },
  sxUsersIcon: {
    color: 'black',
  },
  sxUsersText: {
    '& .MuiListItemText-primary': {
      color: '#000',
      fontSize: '14px',
    },
  },
};

export { styleDashboardDown, styleDashboard };
