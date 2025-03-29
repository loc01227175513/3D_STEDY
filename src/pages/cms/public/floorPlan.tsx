import React, { useState } from 'react';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Box, IconButton, Switch, Typography } from '@mui/material';

import DataGrid, { Column } from '@/components/dashBoard/dataGrid/dataGrid';

import {
  communityFloorplanStyle,
  dashboardContainerStyle,
  fullNameContainerStyle,
  fullNameStyle,
} from '../style/index';

interface FloorplanRow extends Record<string, unknown> {
  id: number;
  thumbnail: string;
  name: string;
  communities: string;
  status: 'Active' | 'Deactive' | 'Draft';
}

const FloorPlanPage = (): React.JSX.Element => {
  // Mock data
  const initialRows: FloorplanRow[] = [
    {
      id: 1,
      thumbnail: '/Images/selectFloorPlan/KITCHEN2 (2).svg',
      name: 'Site 46 | Bulla',
      communities: 'Halcyon Highlands',
      status: 'Active',
    },
    {
      id: 2,
      thumbnail: '/Images/selectFloorPlan/Rectangle -1.svg',
      name: 'Site 29 | Ridley',
      communities: 'Halcyon Highlands',
      status: 'Deactive',
    },
    {
      id: 3,
      thumbnail: '/Images/selectFloorPlan/Rectangle -1.svg',
      name: 'Site 2 | Gladstone',
      communities: 'Halcyon Highlands',
      status: 'Active',
    },
    {
      id: 4,
      thumbnail: '/Images/selectFloorPlan/Rectangle -1.svg',
      name: 'Site 7 | Gladstone',
      communities: 'Halcyon Highlands',
      status: 'Deactive',
    },
    {
      id: 5,
      thumbnail: '/Images/selectFloorPlan/KITCHEN2 (2).svg',
      name: 'Site 53 | Ridley',
      communities: 'Halcyon Highlands',
      status: 'Active',
    },
    {
      id: 6,
      thumbnail: '/Images/selectFloorPlan/Rectangle -1.svg',
      name: 'Site 34 | Oakland',
      communities: 'Halcyon Highlands',
      status: 'Deactive',
    },
    {
      id: 7,
      thumbnail: '/Images/selectFloorPlan/Rectangle -1.svg',
      name: 'Site 5 | Willow',
      communities: 'Halcyon Highlands',
      status: 'Active',
    },
    {
      id: 8,
      thumbnail: '/Images/selectFloorPlan/Rectangle -1.svg',
      name: 'Site 229 | Addis',
      communities: 'Halcyon Highlands',
      status: 'Active',
    },
  ];

  // State to manage the rows
  const [rows, setRows] = useState<FloorplanRow[]>(initialRows);

  const formatName = (value: unknown) => {
    const name = value as string;
    return (
      <Box sx={fullNameContainerStyle}>
        <Typography sx={fullNameStyle}>{name}</Typography>
      </Box>
    );
  };

  const formatCommunity = (value: unknown) => {
    const community = value as string;
    return (
      <Typography color="primary" sx={communityFloorplanStyle}>
        {community}
      </Typography>
    );
  };

  const formatStatus = (value: unknown, row: FloorplanRow) => {
    const status = value as 'Active' | 'Deactive' | 'Draft';

    const handleToggle = (event: React.ChangeEvent<HTMLInputElement>) => {
      // Update the status in the rows array
      const updatedRows = rows.map((r) => {
        if (r.id === row.id) {
          return {
            ...r,
            status: event.target.checked ? ('Active' as const) : ('Deactive' as const),
          };
        }
        return r;
      });

      setRows(updatedRows);
    };

    return (
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Switch
          checked={status === 'Active'}
          size="small"
          onChange={handleToggle}
          sx={{
            '& .MuiSwitch-switchBase.Mui-checked': {
              color: '#1976d2',
              '&:hover': {
                backgroundColor: 'rgba(25, 118, 210, 0.08)',
              },
            },
            '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
              backgroundColor: '#1976d2',
            },
          }}
          disabled={status === 'Draft'}
        />
        <Typography
          variant="body2"
          sx={{
            ml: 1,
            color: status === 'Active' ? '#1976d2' : status === 'Draft' ? '#e65100' : 'text.secondary',
          }}
        >
          {status === 'Active' ? 'ON' : 'OFF'}
        </Typography>
      </Box>
    );
  };

  const formatThumbnail = (value: unknown, row: FloorplanRow) => {
    const thumbnail = value as string;
    return (
      <Box
        component="img"
        src={thumbnail}
        alt={row.name}
        width={100}
        height={100}
        sx={{ objectFit: 'cover', borderRadius: '10px' }}
      />
    );
  };

  const columns: Column<FloorplanRow>[] = [
    { id: 'thumbnail', label: 'Thumbnail', format: formatThumbnail, minWidth: 100, flex: 1 },
    { id: 'name', label: 'Name', format: formatName, minWidth: 180, flex: 1.5 },
    { id: 'communities', label: 'Communities', format: formatCommunity, minWidth: 200, flex: 1.5 },
    { id: 'status', label: 'Status', format: formatStatus, minWidth: 100, flex: 1 },
  ];

  const handleRowClick = () => {
    console.log('Row clicked');
  };

  const rowActions = () => {
    return (
      <IconButton size="small">
        <MoreVertIcon />
      </IconButton>
    );
  };

  return (
    <Box sx={dashboardContainerStyle}>
      <DataGrid<FloorplanRow>
        columns={columns}
        rows={rows}
        getRowId={(row) => row.id}
        onRowClick={handleRowClick}
        customRowAction={rowActions}
        defaultRowsPerPage={7}
      />
    </Box>
  );
};

export default FloorPlanPage;
