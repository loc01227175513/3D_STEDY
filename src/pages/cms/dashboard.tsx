import React from 'react';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Box, IconButton, Typography } from '@mui/material';

import { SourceChip, SourceType, StatusChip, StatusType } from '@/components/dashBoard/chip/chip';
import DataGrid, { Column } from '@/components/dashBoard/dataGrid/dataGrid';

import {
  communityFloorplanStyle,
  dashboardContainerStyle,
  emailStyle,
  fullNameContainerStyle,
  fullNameStyle,
} from './style/index';
import { AuthGuard } from '@/components/auth/authGuard';
import { Outlet } from 'react-router';

interface LeadRow extends Record<string, unknown> {
  id: number;
  createAt: string;
  community: string;
  floorplan: string;
  fullName: string;
  email: string;
  phone: string;
  state: string;
  saleAgent: string;
  status: StatusType;
  leadSource: SourceType;
}

const Dashboard = (): React.JSX.Element => {
  // Mock data
  const rows: LeadRow[] = [
    {
      id: 1,
      createAt: '2023-01-15',
      community: 'Halcyon Gables',
      floorplan: 'Site 42 | Fraser 31',
      fullName: 'John Smith',
      email: 'john.smith@example.com',
      phone: '+61 400 123 456',
      state: 'VIC',
      saleAgent: 'Not Assigned',
      status: 'New',
      leadSource: 'Website',
    },
    {
      id: 2,
      createAt: '2023-02-10',
      community: 'Halcyon Vista',
      floorplan: 'Site 45 | Aria 70',
      fullName: 'Emily Johnson',
      email: 'emily.johnson@example.com',
      phone: '+61 412 757 654',
      state: 'QLD',
      saleAgent: 'Emily Johnson',
      status: 'Contacted',
      leadSource: 'Sale',
    },
    {
      id: 3,
      createAt: '2023-03-25',
      community: 'Halcyon Evergreen',
      floorplan: 'Site 36 | Napier',
      fullName: 'Michael Brown',
      email: 'michael.brown@example.com',
      phone: '+61 423 456 757',
      state: 'VIC',
      saleAgent: 'Michael Brown',
      status: 'Informed',
      leadSource: 'Referral',
    },
    {
      id: 4,
      createAt: '2023-04-20',
      community: 'Halcyon Promenade',
      floorplan: 'Site 242 Avoca G7',
      fullName: 'Sarah Davis',
      email: 'sarah.davis@example.com',
      phone: '+61 434 757 012',
      state: 'WA',
      saleAgent: 'Sarah Davis',
      status: 'Follow-up',
      leadSource: 'Website',
    },
    {
      id: 5,
      createAt: '2023-05-12',
      community: 'Halcyon Gables',
      floorplan: 'Site 14 | Daintree G4',
      fullName: 'David Wilson',
      email: 'david.wilson@example.com',
      phone: '+61 445 654 321',
      state: 'NSW',
      saleAgent: 'David Wilson',
      status: 'Qualified',
      leadSource: 'Sale',
    },
    {
      id: 6,
      createAt: '2023-06-18',
      community: 'Halcyon Coves',
      floorplan: 'Site 85 | Avalon 35',
      fullName: 'Jessica Martinez',
      email: 'jessica.martinez@example.com',
      phone: '+61 456 321 987',
      state: 'QLD',
      saleAgent: 'Jessica Martinez',
      status: 'Proposal Sent',
      leadSource: 'Referral',
    },
    {
      id: 7,
      createAt: '2023-07-14',
      community: 'Halcyon Promenade',
      floorplan: 'Site 238 Monterey H2',
      fullName: 'James Anderson',
      email: 'james.anderson@example.com',
      phone: '+61 467 987 654',
      state: 'VIC',
      saleAgent: 'James Anderson',
      status: 'Negotiation',
      leadSource: 'Website',
    },
    {
      id: 8,
      createAt: '2023-09-14',
      community: 'Halcyon Vista',
      floorplan: 'Site 138 | Somo 15',
      fullName: 'James Anderson',
      email: 'james.anderson@example.com',
      phone: '+61 475 234 567',
      state: 'WA',
      saleAgent: 'James Anderson',
      status: 'Contracted',
      leadSource: 'Sale',
    },
    {
      id: 9,
      createAt: '2023-07-14',
      community: 'Halcyon Gables',
      floorplan: 'Site 5 | Kimberley G3',
      fullName: 'Jean David',
      email: 'james.anderson@example.com',
      phone: '+61 475 234 567',
      state: 'WA',
      saleAgent: 'Jean David',
      status: 'Lost',
      leadSource: 'Referral',
    },
  ];

  const getStatusChip = (status: unknown) => {
    return <StatusChip status={status as StatusType} />;
  };

  const getSourceChip = (source: unknown) => {
    return <SourceChip source={source as SourceType} />;
  };

  const formatFullName = (fullName: unknown, row: LeadRow) => {
    return (
      <Box sx={fullNameContainerStyle}>
        <Typography sx={fullNameStyle}>{fullName as string}</Typography>
        <Typography sx={emailStyle}>{row.email}</Typography>
      </Box>
    );
  };

  const formatCommunity = (community: unknown) => {
    return (
      <Typography color="primary" sx={communityFloorplanStyle}>
        {community as string}
      </Typography>
    );
  };

  const formatFloorplan = (floorplan: unknown) => {
    return (
      <Typography color="primary" sx={communityFloorplanStyle}>
        {floorplan as string}
      </Typography>
    );
  };

  const columns: Column<LeadRow>[] = [
    { id: 'createAt', label: 'Create At', minWidth: 100, flex: 1 },
    { id: 'community', label: 'Community', format: formatCommunity, minWidth: 180, flex: 1 },
    { id: 'floorplan', label: 'Floorplan', format: formatFloorplan, minWidth: 150, flex: 1 },
    { id: 'fullName', label: 'Full name', format: formatFullName, minWidth: 200, flex: 1.5 },
    { id: 'phone', label: 'Phone', minWidth: 120, flex: 1 },
    { id: 'state', label: 'State', minWidth: 100, align: 'center', flex: 0.5 },
    { id: 'saleAgent', label: 'Sale Agent', minWidth: 120, flex: 1 },
    { id: 'status', label: 'Status', format: getStatusChip, minWidth: 120, flex: 1.2 },
    { id: 'leadSource', label: 'Lead Source', format: getSourceChip, minWidth: 100, flex: 1 },
  ];

  const handleRowClick = (row: LeadRow) => {
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
    <AuthGuard>
      <Box sx={dashboardContainerStyle}>
        <DataGrid<LeadRow>
          columns={columns}
          rows={rows}
          getRowId={(row) => row.id}
          onRowClick={handleRowClick}
        customRowAction={rowActions}
        defaultRowsPerPage={7}
      />
    </Box>
    <Outlet />
    </AuthGuard>
  );
};

export default Dashboard;
