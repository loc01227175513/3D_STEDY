import React from 'react';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Box, IconButton, Typography } from '@mui/material';

import { StatusChip, StatusType } from '@/components/dashBoard/chip/chip';
import DataGrid, { Column } from '@/components/dashBoard/dataGrid/dataGrid';

import { dashboardContainerStyle, emailStyle, fullNameContainerStyle, fullNameStyle } from '../style/index';

interface UserRow extends Record<string, unknown> {
  id: number;
  userName: string;
  mobile: string;
  email: string;
  role: string;
  createAt: string;
  status: StatusType;
}

const UserPage = (): React.JSX.Element => {
  // Mock data
  const rows: UserRow[] = [
    {
      id: 1,
      userName: 'John Smith',
      mobile: '+61 412 345 678',
      email: 'john.smith@example.com',
      role: 'Supper Admin',
      createAt: '2023-01-15',
      status: 'Active',
    },
    {
      id: 2,
      userName: 'Emily Johnson',
      mobile: '+61 423 456 789',
      email: 'emily.johnson@example.com',
      role: 'Project Manager',
      createAt: '2023-02-10',
      status: 'Active',
    },
    {
      id: 3,
      userName: 'Michael Brown',
      mobile: '+61 434 567 890',
      email: 'michael.brown@example.com',
      role: 'Sale',
      createAt: '2023-03-05',
      status: 'Absent',
    },
    {
      id: 4,
      userName: 'Sarah Davis',
      mobile: '+61 445 678 901',
      email: 'sarah.davis@example.com',
      role: 'Project Manager',
      createAt: '2023-04-20',
      status: 'Active',
    },
    {
      id: 5,
      userName: 'David Wilson',
      mobile: '+61 456 789 012',
      email: 'david.wilson@example.com',
      role: 'Project Manager',
      createAt: '2023-05-12',
      status: 'Absent',
    },
    {
      id: 6,
      userName: 'Jessica Martinez',
      mobile: '+61 467 890 123',
      email: 'jessica.martinez@example.com',
      role: 'Admin',
      createAt: '2023-06-18',
      status: 'Absent',
    },
    {
      id: 7,
      userName: 'James Anderson',
      mobile: '+61 478 901 234',
      email: 'james.anderson@example.com',
      role: 'Sale',
      createAt: '2023-09-14',
      status: 'Active',
    },
    {
      id: 8,
      userName: 'James Anderson',
      mobile: '+61 478 901 234',
      email: 'james.anderson@example.com',
      role: 'Project Manager',
      createAt: '2023-09-14',
      status: 'Active',
    },
  ];

  const formatStatus = (value: unknown) => {
    const status = value as 'Active' | 'Absent';
    let icon;

    switch (status) {
      case 'Active':
        icon = <Box component="img" src="/dashboard/active.svg" sx={{ width: '18px', height: '18px' }} />;
        break;
      case 'Absent':
        icon = <Box component="img" src="/dashboard/deactive.svg" sx={{ width: '18px', height: '18px' }} />;
        break;
      default:
        icon = null;
    }

    return <StatusChip status={status} icon={icon} />;
  };

  const formatUserName = (userName: unknown, row: UserRow) => {
    return (
      <Box sx={fullNameContainerStyle}>
        <Typography sx={fullNameStyle}>{userName as string}</Typography>
        <Typography sx={emailStyle}>{row.email}</Typography>
      </Box>
    );
  };

  const columns: Column<UserRow>[] = [
    {
      id: 'userName',
      label: 'User Name',
      format: formatUserName,
      minWidth: 150,
      flex: 1,
    },
    {
      id: 'mobile',
      label: 'Mobile',
      minWidth: 150,
      flex: 1,
    },
    {
      id: 'email',
      label: 'Email',
      minWidth: 200,
      flex: 1.5,
    },
    {
      id: 'role',
      label: 'Role',
      minWidth: 150,
      flex: 1,
    },
    {
      id: 'createAt',
      label: 'Create at',
      minWidth: 120,
      flex: 0.8,
    },
    {
      id: 'status',
      label: 'Status',
      format: formatStatus,
      minWidth: 120,
      flex: 0.8,
    },
  ];

  const handleRowClick = (row: UserRow) => {
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
      <DataGrid<UserRow>
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

export default UserPage;
