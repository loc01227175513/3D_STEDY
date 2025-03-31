import React, { useCallback, useEffect, useState } from 'react';
import { useRemoveLeadsMutation } from '@/graphql/mutations/removeLeads.generated';
import { useLeadsQuery } from '@/graphql/queries/leads.generated';
import { buildGraphQLVariables } from '@/utils/graphql';
import { ToastMessage } from '@/utils/toast';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Box, IconButton, Tooltip, Typography } from '@mui/material';

import { SourceChip, SourceType, StatusChip, StatusType } from '@/components/dashBoard/chip/chip';
import DataGrid, { Column } from '@/components/dashBoard/dataGrid/dataGrid';
import { FilterParams } from '@/components/dashBoard/showFilter';

import { dashboardContainerStyle, fullNameContainerStyle } from './style/index';

// Interface definition for a lead row
interface LeadRow extends Record<string, unknown> {
  id: string | number;
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
  // State for filter parameters
  const [filterParams, setFilterParams] = useState<FilterParams>({
    keyword: '',
    status: '',
    page: 0,
    limit: 5,
  });

  // State for selected rows
  const [selectedRows, setSelectedRows] = useState<(string | number)[]>([]);

  // Track deleted IDs to filter them out immediately
  const [deletedIds, setDeletedIds] = useState<string[]>([]);

  // Query with filter parameters
  const [queryResult, reexecuteQuery] = useLeadsQuery(buildGraphQLVariables(filterParams, 5));

  const [, removeLeads] = useRemoveLeadsMutation();

  const { data, fetching } = queryResult;

  // Reset deleted IDs when the data is refreshed
  useEffect(() => {
    if (!fetching) {
      setDeletedIds([]);
    }
  }, [data, fetching]);

  // Handle filter changes from the DataGrid
  const handleFilterChange = useCallback((newFilters: FilterParams) => {
    setFilterParams((prev: FilterParams) => ({
      ...prev,
      ...newFilters,
    }));
  }, []);

  // Handle sort changes from the DataGrid
  const handleSortChange = useCallback((sortBy: string, direction: 'asc' | 'desc') => {
    console.log(`Sorting by ${sortBy} in ${direction} order`);
    // Currently the GraphQL API might not support sorting
    // This would be implemented if the API supports it
  }, []);

  // Handle selection changes from DataGrid
  const handleSelectionChange = useCallback(
    (selectedIds: (string | number)[]) => {
      // Filter out any deleted IDs from the selection
      const validSelectedIds = selectedIds.filter((id) => !deletedIds.includes(id.toString()));
      setSelectedRows(validSelectedIds);
    },
    [deletedIds]
  );

  // Handle delete action
  const handleDeleteClick = useCallback(async () => {
    if (selectedRows.length === 0) {
      console.log('No rows selected for deletion');
      ToastMessage('warning', 'No leads selected for deletion');
      return;
    }

    try {
      // Convert any numeric IDs to strings if needed
      const stringIds = selectedRows.map((id) => id.toString());

      console.log('Deleting leads with IDs:', stringIds);

      // First update UI immediately by marking these items as deleted
      setDeletedIds((prev) => [...prev, ...stringIds]);

      // Also clear the selection since these items are being deleted
      setSelectedRows([]);

      // Then perform the actual deletion in the backend
      const result = await removeLeads({
        leadIds: stringIds,
      });

      if (result.data?.removeLeads) {
        console.log('Delete successful:', result);
        // Show success message with toast
        ToastMessage('success', `Successfully deleted ${stringIds.length} lead${stringIds.length > 1 ? 's' : ''}`);

        // Refresh the data after deletion to sync with server
        reexecuteQuery();
      } else if (result.error) {
        console.error('Error in mutation result:', result.error);
        ToastMessage('error', `Failed to delete: ${result.error.message}`);

        // If deletion failed, remove these IDs from the deletedIds list
        setDeletedIds((prev) => prev.filter((id) => !stringIds.includes(id)));
      }
    } catch (error) {
      console.error('Error deleting leads:', error);
      ToastMessage('error', `An error occurred: ${error instanceof Error ? error.message : 'Unknown error'}`);

      // If deletion failed, remove the IDs from deletedIds
      const stringIds = selectedRows.map((id) => id.toString());
      setDeletedIds((prev) => prev.filter((id) => !stringIds.includes(id)));
    }
  }, [selectedRows, removeLeads, reexecuteQuery]);

  const rows: LeadRow[] = React.useMemo(() => {
    if (!data?.leads?.items?.length) return [];

    // Log the raw data to see if it contains unique items
    console.log('Raw data from API:', data.leads.items);

    // Create a Set to ensure we don't have duplicate IDs
    const uniqueIds = new Set<string>();

    const mappedRows = data.leads.items
      // Filter out rows that have been deleted locally
      .filter((lead) => lead.id && !deletedIds.includes(lead.id.toString()))
      .map((lead, index) => {
        // Destructure with defaults to avoid repetitive null checks
        const { id, createdAt, community, product, full_name, email, phone, state, sale_agent, status, lead_source } =
          lead;

        // Generate a unique ID for each row
        // If ID is null or undefined, use the index
        // If ID is a UUID string, use it directly
        const rowId = id
          ? typeof id === 'string' && id.includes('-')
            ? id // Use UUID as is
            : Number(id) // Convert to number for numeric IDs
          : `idx-${index}`; // Use index as fallback for null IDs

        // Check for duplicates
        if (uniqueIds.has(String(rowId))) {
          console.warn(`Duplicate ID found: ${rowId}, using index-based ID as fallback`);
          // Assign a guaranteed unique ID based on index
          return {
            id: `row-${index}-${Date.now()}`,
            createAt: createdAt
              ? new Date(createdAt).toLocaleString('en-US', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                })
              : '',
            community: community ? (typeof community === 'object' ? community.name || '' : community) : '',
            floorplan: product?.name || '',
            fullName: full_name || '',
            email: email || '',
            phone: phone || '',
            state: state || '',
            saleAgent: sale_agent || 'Not Assigned',
            status: (status as StatusType) || 'New',
            leadSource: (lead_source as SourceType) || 'Website',
          };
        }

        uniqueIds.add(String(rowId));

        return {
          id: rowId,
          createAt: createdAt
            ? new Date(createdAt).toLocaleString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
              })
            : '',
          community: community ? (typeof community === 'object' ? community.name || '' : community) : '',
          floorplan: product?.name || '',
          fullName: full_name || '',
          email: email || '',
          phone: phone || '',
          state: state || '',
          saleAgent: sale_agent || 'Not Assigned',
          status: (status as StatusType) || 'New',
          leadSource: (lead_source as SourceType) || 'Website',
        };
      });

    // Log the mapped rows to see if they're unique
    console.log('Mapped rows with unique IDs:', mappedRows);
    console.log('Unique IDs count:', uniqueIds.size, 'Total rows:', mappedRows.length);

    return mappedRows;
  }, [data?.leads?.items, deletedIds]);

  const getStatusChip = (status: unknown) => {
    return <StatusChip status={status as StatusType} />;
  };

  const getSourceChip = (source: unknown) => {
    return <SourceChip source={source as SourceType} />;
  };

  const formatFullName = (fullName: unknown, row: LeadRow) => {
    return (
      <Box sx={fullNameContainerStyle}>
        <Tooltip title={fullName as string}>
          <Typography
            sx={{
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              display: 'block',
              width: '100%',
              fontWeight: 600,
              fontSize: '14px',
            }}
          >
            {fullName as string}
          </Typography>
        </Tooltip>
        <Tooltip title={row.email as string}>
          <Typography
            sx={{
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              display: 'block',
              width: '100%',
              color: 'text.secondary',
              fontSize: '12px',
            }}
          >
            {row.email as string}
          </Typography>
        </Tooltip>
      </Box>
    );
  };

  const formatCommunity = (community: unknown) => {
    return (
      <Tooltip title={community as string}>
        <Typography
          color="primary"
          sx={{
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            display: 'block',
            width: '100%',
            fontWeight: 500,
          }}
        >
          {community as string}
        </Typography>
      </Tooltip>
    );
  };

  const formatFloorplan = (floorplan: unknown) => {
    return (
      <Tooltip title={floorplan as string}>
        <Typography
          color="primary"
          sx={{
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            display: 'block',
            width: '100%',
            fontWeight: 500,
          }}
        >
          {floorplan as string}
        </Typography>
      </Tooltip>
    );
  };

  const columns: Column<LeadRow>[] = [
    { id: 'createAt', label: 'Create At', minWidth: 120, flex: 1 },
    { id: 'community', label: 'Community', format: formatCommunity, minWidth: 150, flex: 1.2 },
    { id: 'floorplan', label: 'Floorplan', format: formatFloorplan, minWidth: 150, flex: 1.2 },
    { id: 'fullName', label: 'Full name', format: formatFullName, minWidth: 200, flex: 1.5 },
    { id: 'phone', label: 'Phone', minWidth: 120, flex: 1 },
    { id: 'state', label: 'State', minWidth: 80, align: 'center', flex: 0.8 },
    { id: 'saleAgent', label: 'Sale Agent', minWidth: 120, flex: 1 },
    { id: 'status', label: 'Status', format: getStatusChip, minWidth: 120, flex: 1 },
    { id: 'leadSource', label: 'Lead Source', format: getSourceChip, minWidth: 120, flex: 1 },
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
    <Box sx={dashboardContainerStyle}>
      <DataGrid<LeadRow>
        columns={columns}
        rows={rows}
        totalRows={data?.leads?.total || rows.length}
        getRowId={(row) => row.id}
        onRowClick={handleRowClick}
        customRowAction={rowActions}
        defaultRowsPerPage={10}
        rowsPerPageOptions={[1, 5, 10, 20, 50, 100]}
        loading={fetching}
        filterParams={filterParams}
        onFilterChange={handleFilterChange}
        onSortChange={handleSortChange}
        onSelectionChange={handleSelectionChange}
        onDeleteClick={handleDeleteClick}
      />
    </Box>
  );
};

export default Dashboard;
