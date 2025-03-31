import React, { useEffect, useState } from 'react';
import { DRAWER_DASHBOARD } from '@/pages/public/style';
import { dashboard, dashboardDown } from '@/paths.config';
import useDrawerTemplateOpen from '@/store/drawerTemplateOpen';
import { ToastMessage } from '@/utils/toast';
import AddIcon from '@mui/icons-material/Add';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Box, Drawer, List, Stack } from '@mui/material';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';

import BoxImage from '@/components/boxImage';
import HeaderContent from '@/components/headerContent/headerContent';
import CustomListItem from '@/components/listItem/listItem';
import UserProfileItem from '@/components/listItem/userProfileItem';

import { AuthGuard } from '../auth/authGuard';

const LayoutDashboard = (): React.JSX.Element => {
  const navigate = useNavigate();
  const location = useLocation();
  const { openDashboard } = useDrawerTemplateOpen();
  const menuItems = Object.values(dashboard.children);
  const downItems = Object.values(dashboardDown.children);

  // Get only the setting item from downItems
  const settingItem = downItems[0]; // First item is the setting
  const userItem = downItems[1]; // Second item is the user

  // Track the current path to determine the active item
  const [currentPath, setCurrentPath] = useState(location.pathname);

  useEffect(() => {
    setCurrentPath(location.pathname);
  }, [location.pathname]);

  // Find the active item based on the current path
  const activeItem = [...menuItems, ...downItems].find((item) => item.path === currentPath) || menuItems[0];

  // Extract header content properties safely
  const headerTitle = activeItem.headerContent?.title || activeItem.title;
  const showAddButton =
    activeItem.headerContent?.showAddButton !== undefined ? activeItem.headerContent.showAddButton : true;
  const onAddClick = activeItem.headerContent?.onAddClick;

  // Create a wrapper function that passes the navigate function to onAddClick
  const handleAddClick = () => {
    if (onAddClick) {
      onAddClick(navigate);
    }
  };

  // Only the leads item has buttonText in paths.config.ts
  // We need to provide a default for other items
  let buttonText = 'Add new';
  // Check if the active item is the leads item (at path '/dashboard')
  if (activeItem.path === '/dashboard' && activeItem.title === 'Leads') {
    // The leads item has a buttonText property
    buttonText = 'Add Lead';
  }

  const handleItemClick = (path: string) => {
    navigate(path);
  };

  return (
    <AuthGuard>
      <Box sx={{ display: 'flex', minHeight: '100vh' }}>
        <Drawer
          variant={openDashboard ? 'permanent' : 'permanent'}
          open={openDashboard}
          sx={{
            width: openDashboard ? DRAWER_DASHBOARD : 250,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              width: DRAWER_DASHBOARD,
              boxSizing: 'border-box',
              backgroundColor: '#f8f8f8',
              borderRight: '1px solid rgba(0, 0, 0, 0.12)',
              display: 'flex',
              flexDirection: 'column',
              transform: openDashboard ? 'translateX(0)' : `translateX(-${DRAWER_DASHBOARD}px)`,
              transition: 'transform 225ms cubic-bezier(0, 0, 0.2, 1) 0ms',
            },
          }}
        >
          <Box sx={{ p: 2, flex: 1 }}>
            <Stack spacing={3}>
              <BoxImage image="/Images/LOGO1.svg" alt="Stockland" width={200} height={50} showTitle={false} />

              <List sx={{ mt: 2 }}>
                {menuItems.map((item) => (
                  <CustomListItem key={item.title} item={item} onClick={() => handleItemClick(item.path)} />
                ))}
              </List>
            </Stack>
          </Box>
          <Box sx={{ p: 2, borderTop: '1px solid rgba(0, 0, 0, 0.12)' }}>
            <List>
              {/* Render the setting item */}
              <CustomListItem
                key={settingItem.title}
                item={settingItem}
                onClick={() => handleItemClick(settingItem.path)}
              />

              {/* Render the user item with the new UserProfileItem component */}
              <UserProfileItem item={userItem} ToastMessage={ToastMessage} />
            </List>
          </Box>
        </Drawer>
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            marginLeft: openDashboard ? 0 : `-${DRAWER_DASHBOARD}px`,
            transition: 'margin-left 225ms cubic-bezier(0, 0, 0.2, 1) 0ms',
            width: '100%',
          }}
        >
          <HeaderContent
            title={headerTitle}
            icon={<ArrowBackIcon />}
            showAddButton={showAddButton}
            onAddClick={handleAddClick}
            buttonText={buttonText}
            buttonIcon={<AddIcon />}
          />
          <Box
            sx={{
              p: 3,
              height: 'calc(100vh - 64px)', // Subtract header height
              overflow: 'auto',
              width: '100%',
              position: 'relative',
            }}
          >
            <Outlet />
          </Box>
        </Box>
      </Box>
    </AuthGuard>
  );
};

export default LayoutDashboard;
