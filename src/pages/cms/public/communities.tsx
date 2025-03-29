import React from 'react';
import ConstructionIcon from '@mui/icons-material/Construction';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Box, IconButton } from '@mui/material';

import { StatusChip, StatusType } from '@/components/dashBoard/chip/chip';
import DataGrid, { Column } from '@/components/dashBoard/dataGrid/dataGrid';

import { dashboardContainerStyle } from '../style/index';

interface ProjectRow extends Record<string, unknown> {
  id: number;
  thumbnail: string;
  name: string;
  state: string;
  category: string;
  status: StatusType;
}

const CommunitiesPage = (): React.JSX.Element => {
  // Mock data
  const rows: ProjectRow[] = [
    {
      id: 1,
      thumbnail: '/Images/selectFloorPlan/Rectangle -1.svg',
      name: 'B by Halcyon',
      state: 'VIC',
      category: 'Home Buying & Selling',
      status: 'Active',
    },
    {
      id: 2,
      thumbnail: '/Images/selectFloorPlan/Rectangle -1.svg',
      name: 'Halcyon Coves',
      state: 'QLD',
      category: 'Renting & Leasing',
      status: 'Active',
    },
    {
      id: 3,
      thumbnail: '/Images/selectFloorPlan/Rectangle -1.svg',
      name: 'Halcyon Dales',
      state: 'VIC',
      category: 'Property Investment',
      status: 'Active',
    },
    {
      id: 4,
      thumbnail: '/Images/selectFloorPlan/Rectangle -1.svg',
      name: 'Halcyon Edgebrook',
      state: 'WA',
      category: 'New Developments',
      status: 'Active',
    },
    {
      id: 5,
      thumbnail: '/Images/selectFloorPlan/Rectangle -1.svg',
      name: 'Halcyon Highlands',
      state: 'NSW',
      category: 'Home Design & Renovation',
      status: 'Active',
    },
    {
      id: 6,
      thumbnail: '/Images/selectFloorPlan/Rectangle -1.svg',
      name: 'Halcyon Rise',
      state: 'QLD',
      category: 'Local Businesses & Startups',
      status: 'Active',
    },
    {
      id: 7,
      thumbnail: '/Images/selectFloorPlan/Rectangle -1.svg',
      name: 'Halcyon Horizon',
      state: 'VIC',
      category: 'Job Opportunities',
      status: 'Active',
    },
    {
      id: 8,
      thumbnail: '/Images/selectFloorPlan/Rectangle -1.svg',
      name: 'Halcyon Jardin',
      state: 'WA',
      category: 'Arts & Culture',
      status: 'Active',
    },
  ];

  const formatStatus = (value: unknown) => {
    const status = value as 'Active' | 'Deactive' | 'Building';
    let icon;

    switch (status) {
      case 'Active':
        icon = <Box component="img" src="/dashboard/active.svg" sx={{ width: '18px', height: '18px' }} />;
        break;
      case 'Deactive':
        icon = <Box component="img" src="/dashboard/deactive.svg" sx={{ width: '18px', height: '18px' }} />;
        break;
      case 'Building':
        icon = <ConstructionIcon fontSize="small" />;
        break;
      default:
        icon = null;
    }

    return <StatusChip status={status} icon={icon} />;
  };

  const formatThumbnail = (value: unknown, row: ProjectRow) => {
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

  const columns: Column<ProjectRow>[] = [
    {
      id: 'thumbnail',
      label: 'Thumbnail',
      minWidth: 120,
      flex: 0.8,
      format: formatThumbnail,
    },
    {
      id: 'name',
      label: 'Communities name',
      minWidth: 200,
      flex: 1.5,
    },
    {
      id: 'state',
      label: 'State',
      minWidth: 100,
      flex: 0.8,
    },
    {
      id: 'category',
      label: 'Category',
      minWidth: 200,
      flex: 1.5,
    },
    {
      id: 'status',
      label: 'Status',
      format: formatStatus,
      minWidth: 120,
      flex: 0.8,
    },
  ];

  const handleRowClick = (row: ProjectRow) => {
    console.log('Row clicked:', row);
  };

  const rowActions: () => React.JSX.Element = () => {
    return (
      <IconButton size="small">
        <MoreVertIcon />
      </IconButton>
    );
  };

  return (
    <Box sx={dashboardContainerStyle}>
      <DataGrid<ProjectRow>
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

export default CommunitiesPage;
