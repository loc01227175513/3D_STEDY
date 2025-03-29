import React from 'react';
import { DRAWER_DASHBOARD } from '@/pages/public/style';
import { dashboard, dashboardDown } from '@/paths.config';
import useDrawerTemplateOpen from '@/store/drawerTemplateOpen';
import { ToastMessage } from '@/utils/toast';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Box, Drawer, List, Stack } from '@mui/material';
import { Outlet, useNavigate } from 'react-router-dom';

import BoxImage from '@/components/boxImage';
import HeaderContent from '@/components/headerContent/headerContent';
import CustomListItem from '@/components/listItem/listItem';
import UserProfileItem from '@/components/listItem/userProfileItem';

import { AuthGuard } from '../auth/authGuard';

const LayoutDashboard = (): React.JSX.Element => {
  const navigate = useNavigate();
  const { openDashboard } = useDrawerTemplateOpen();
  const menuItems = Object.values(dashboard.children);
  const downItems = Object.values(dashboardDown.children);

  // Get only the setting item from downItems
  const settingItem = downItems[0]; // First item is the setting
  const userItem = downItems[1]; // Second item is the user

  return (
    <AuthGuard>
      <Box sx={{ display: 'flex', minHeight: '100vh' }}>
        <Drawer
          variant="permanent"
          open={openDashboard}
          sx={{
            width: DRAWER_DASHBOARD,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              width: DRAWER_DASHBOARD,
              boxSizing: 'border-box',
              backgroundColor: '#f8f8f8',
              borderRight: '1px solid rgba(0, 0, 0, 0.12)',
              display: 'flex',
              flexDirection: 'column',
            },
          }}
        >
          <Box sx={{ p: 2, flex: 1 }}>
            <Stack spacing={3}>
              <BoxImage image="/Images/LOGO1.svg" alt="Stockland" width={200} height={50} showTitle={false} />

              <List sx={{ mt: 2 }}>
                {menuItems.map((item) => (
                  <CustomListItem key={item.title} item={item} onClick={() => navigate(item.path)} />
                ))}
              </List>
            </Stack>
          </Box>
          <Box sx={{ p: 2, borderTop: '1px solid rgba(0, 0, 0, 0.12)' }}>
            <List>
              {/* Render the setting item */}
              <CustomListItem key={settingItem.title} item={settingItem} onClick={() => navigate(settingItem.path)} />

              {/* Render the user item with the new UserProfileItem component */}
              <UserProfileItem item={userItem} ToastMessage={ToastMessage} />
            </List>
          </Box>
        </Drawer>
        <Box component="main" sx={{ flexGrow: 1 }}>
          <HeaderContent title="Leads" icon={<ArrowBackIcon />} />
          <Box sx={{ p: 3 }}>
            <Outlet />
          </Box>
        </Box>
      </Box>
    </AuthGuard>
  );
};

export default LayoutDashboard;
