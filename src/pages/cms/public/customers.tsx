import React from 'react';
import { Box, Typography } from '@mui/material';

import DataGrid, { Column } from '@/components/dashBoard/dataGrid/dataGrid';
import { LoadButtonWithIcon } from '@/components/dashBoard/loadButtonWithIcon/loadButtonWithIcon';

import { dashboardContainerStyle, emailStyle, fullNameContainerStyle, fullNameStyle } from '../style/index';

interface CustomerRow extends Record<string, unknown> {
  id: number;
  fullname: string;
  email: string;
  phone: string;
  state: string;
  community: string;
  region: string;
  sale: string;
  createAt: string;
}

const CustomersPage = (): React.JSX.Element => {
  // Mock data
  const rows: CustomerRow[] = [
    {
      id: 1,
      fullname: 'Join Smith',
      email: 'john.smith@example.com',
      phone: '+61 400 123 456',
      state: 'NSW',
      community: 'Corporate',
      region: 'Darling Downs',
      sale: 'Not Assigned',
      createAt: '2023-01-15',
    },
    {
      id: 2,
      fullname: 'Emily Johnson',
      email: 'emily.johnson@example.com',
      phone: '+61 412 987 654',
      state: 'QLD',
      community: 'Residential',
      region: 'Geelong Region',
      sale: 'Emily Johnson',
      createAt: '2023-02-10',
    },
    {
      id: 3,
      fullname: 'Michael Brown',
      email: 'michael.brown@example.com',
      phone: '+61 423 456 789',
      state: 'VIC',
      community: 'Halcyon',
      region: 'Gold Coast',
      sale: 'Michael Brown',
      createAt: '2023-03-05',
    },
    {
      id: 4,
      fullname: 'Sarah Davis',
      email: 'sarah.davis@example.com',
      phone: '+61 434 789 012',
      state: 'WA',
      community: 'Shopping Centres',
      region: 'Ipswich, Logan and Redland Bay',
      sale: 'Sarah Davis',
      createAt: '2023-04-20',
    },
    {
      id: 5,
      fullname: 'David Wilson',
      email: 'david.wilson@example.com',
      phone: '+61 445 654 321',
      state: 'NSW',
      community: 'Logistics',
      region: "Melbourne's North",
      sale: 'David Wilson',
      createAt: '2023-05-12',
    },
    {
      id: 6,
      fullname: 'Jessica Martinez',
      email: 'jessica.martinez@example.com',
      phone: '+61 456 321 987',
      state: 'QLD',
      community: 'Workplace',
      region: "Melbourne's South East",
      sale: 'Jessica Martinez',
      createAt: '2023-06-18',
    },
    {
      id: 7,
      fullname: 'James Anderson',
      email: 'james.anderson@example.com',
      phone: '+61 467 987 654',
      state: 'VIC',
      community: 'Retail',
      region: 'North West Sydney',
      sale: 'James Anderson',
      createAt: '2023-07-14',
    },
    {
      id: 8,
      fullname: 'James Anderson',
      email: 'james.anderson@example.com',
      phone: '+61 478 234 567',
      state: 'WA',
      community: 'Apartments',
      region: 'South East',
      sale: 'James Anderson',
      createAt: '2023-09-14',
    },
    {
      id: 9,
      fullname: 'Jean David',
      email: 'james.anderson@example.com',
      phone: '+61 478 234 567',
      state: 'WA',
      community: 'Apartments',
      region: 'Sunshine Coast and Moreton Bay',
      sale: 'Jean David',
      createAt: '2023-09-14',
    },
  ];

  const formatCustomer = (fullname: unknown, row: CustomerRow) => {
    return (
      <Box sx={fullNameContainerStyle}>
        <Typography sx={fullNameStyle}>{fullname as string}</Typography>
        <Typography sx={emailStyle}>{row.email}</Typography>
      </Box>
    );
  };

  const columns: Column<CustomerRow>[] = [
    {
      id: 'fullname',
      label: 'Fullname',
      format: formatCustomer,
      minWidth: 200,
      flex: 1.5,
    },
    {
      id: 'phone',
      label: 'Phone',
      minWidth: 150,
      flex: 1,
    },
    {
      id: 'state',
      label: 'State',
      minWidth: 100,
      flex: 0.5,
    },
    {
      id: 'community',
      label: 'Community',
      minWidth: 150,
      flex: 1,
    },
    {
      id: 'region',
      label: 'Region',
      minWidth: 180,
      flex: 1.2,
    },
    {
      id: 'sale',
      label: 'Sale',
      minWidth: 150,
      flex: 1,
    },
    {
      id: 'createAt',
      label: 'Create At',
      minWidth: 120,
      flex: 0.8,
    },
  ];

  const handleRowClick = (row: CustomerRow) => {
    console.log('Row clicked:', row);
  };

  const rowActions: () => React.JSX.Element = () => {
    return (
      <LoadButtonWithIcon
        text="Manage"
        onClick={() => {}}
        containerSx={{
          display: 'flex',
          justifyContent: 'center',
          borderRadius: '4px',
          px: 2,
          backgroundColor: 'primary.main',
        }}
        buttonSx={{
          minWidth: 'auto',
          color: 'white',
          textTransform: 'none',
          p: 0,
          '&:hover': {
            backgroundColor: 'transparent',
          },
        }}
      />
    );
  };

  return (
    <Box sx={dashboardContainerStyle}>
      <DataGrid<CustomerRow>
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

export default CustomersPage;
