import React, { useState } from 'react';
import { CommunitiesPage, CustomersPage } from '@/routes/imports';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { Box, Button, Tab, Tabs } from '@mui/material';

export default function AnalyticPage(): React.JSX.Element {
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderBottom: '1px solid #e0e0e0',
          mb: 3,
        }}
      >
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          sx={{
            '& .MuiTabs-indicator': {
              backgroundColor: 'primary.main',
              height: 2,
            },
            '& .MuiTab-root': {
              textTransform: 'none',
              fontWeight: 500,
              fontSize: '1rem',
              px: 3,
              py: 1.5,
              color: 'text.primary',
              '&.Mui-selected': {
                color: 'primary.main',
              },
            },
          }}
        >
          <Tab sx={{ fontWeight: 'bold !important' }} label="Customers" />
          <Tab sx={{ fontWeight: 'bold !important' }} label="Projects" />
        </Tabs>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Button
            variant="outlined"
            endIcon={<KeyboardArrowDownIcon />}
            sx={{
              textTransform: 'none',
              borderColor: '#e0e0e0',
              color: 'text.primary',
              borderRadius: 1,
              py: 0.5,
              px: 2,
              fontSize: '0.9rem',
            }}
          >
            13 Oct, 2099 - 13 Oct, 2199
          </Button>

          <Button
            variant="outlined"
            startIcon={<FileDownloadOutlinedIcon />}
            sx={{
              textTransform: 'none',
              borderColor: '#e0e0e0',
              color: 'text.primary',
              borderRadius: 1,
              py: 0.5,
              px: 2,
              fontSize: '0.9rem',
            }}
          >
            Export
          </Button>
        </Box>
      </Box>

      {/* Content based on tab */}
      <Box sx={{ mt: 2 }}>{tabValue === 0 ? <CustomersPage /> : <CommunitiesPage />}</Box>
    </Box>
  );
}
