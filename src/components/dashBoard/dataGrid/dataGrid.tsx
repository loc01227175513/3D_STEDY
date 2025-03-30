import React, { createContext, useContext, useState } from 'react';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import SearchIcon from '@mui/icons-material/Search';
import { Box, Checkbox, CircularProgress, IconButton, InputAdornment, TextField } from '@mui/material';
import {
  GridColDef,
  gridPageCountSelector,
  gridPageSelector,
  GridRowSelectionModel,
  DataGrid as MuiDataGrid,
  useGridApiContext,
  useGridSelector,
} from '@mui/x-data-grid';

import { useDebouncedSearch } from '../../../utils/debounce';
import { CustomPagination } from '../CustomPagination';
import { LoadButtonWithIcon } from '../loadButtonWithIcon/loadButtonWithIcon';
import { ActionModal } from '../modal/modal';
import { FilterParams, ShowFilter } from '../showFilter';
import { ShowSort } from '../showSort';
import SkeletonLoader from '../skeleton';
import { Status, StatusTabOption } from '../status';
import { dataGridStyles } from './index';

// Types for props
export interface Column<T> {
  id: string;
  label: string;
  minWidth?: number;
  align?: 'right' | 'left' | 'center';
  format?: (value: unknown, row: T) => React.ReactNode;
  sortable?: boolean;
  filterable?: boolean;
  flex?: number;
}

export interface DataGridProps<T> {
  columns: Column<T>[];
  rows: T[];
  totalRows?: number; // Total rows for server-side pagination
  rowsPerPageOptions?: number[];
  defaultRowsPerPage?: number;
  showTabs?: boolean;
  showCheckboxes?: boolean;
  showSearch?: boolean;
  showFilter?: boolean;
  showSort?: boolean;
  loading?: boolean;
  filterParams?: FilterParams;
  onFilterChange?: (filters: FilterParams) => void;
  onSortChange?: (sortBy: string, direction: 'asc' | 'desc') => void;
  onRowClick?: (row: T) => void;
  getRowId: (row: T) => string | number;
  customRowAction?: (row: T) => React.ReactNode;
  statusOptions?: { value: string; label: string }[];
  statusTabOptions?: StatusTabOption[];
  pageSizeOptions?: { value: string; label: string }[];
}

// Create a context for the DataGrid props
const DataGridContext = createContext<{
  pageSizeOptions?: { value: string; label: string }[];
}>({});

// Custom pagination component using our extracted component
function CustomPaginationWrapper() {
  const apiRef = useGridApiContext();
  const page = useGridSelector(apiRef, gridPageSelector);
  const pageCount = useGridSelector(apiRef, gridPageCountSelector);
  const { state } = apiRef.current;
  const pageSize = state.pagination.paginationModel.pageSize;
  const rowCount = state.rows.totalRowCount;

  // Get custom options from context
  const { pageSizeOptions } = useContext(DataGridContext);

  // Handle page change
  const handlePageChange = (newPage: number) => {
    apiRef.current.setPage(newPage);
  };

  // Handle page size change
  const handlePageSizeChange = (newPageSize: number) => {
    // First update the DataGrid's internal state
    apiRef.current.setPageSize(newPageSize);

    // Then trigger the model change event which will update parent filters
    const paginationModel = { ...state.pagination.paginationModel, pageSize: newPageSize };
    apiRef.current.setPaginationModel(paginationModel);
  };

  return (
    <CustomPagination
      page={page}
      pageSize={pageSize}
      rowCount={rowCount}
      pageCount={pageCount}
      onPageChange={handlePageChange}
      onPageSizeChange={handlePageSizeChange}
      pageSizeOptions={pageSizeOptions}
      paginationStyles={dataGridStyles}
    />
  );
}

export const DataGrid = <T extends Record<string, unknown>>(props: DataGridProps<T>): React.JSX.Element => {
  const {
    columns,
    rows,
    totalRows,
    rowsPerPageOptions = [7, 10, 25, 50],
    defaultRowsPerPage = 7,
    showCheckboxes = true,
    showFilter = true,
    showSort = true,
    showTabs = true,
    loading = false,
    filterParams = {},
    onFilterChange,
    onSortChange,
    onRowClick,
    getRowId,
    customRowAction,
    statusOptions,
    statusTabOptions,
    pageSizeOptions,
  } = props;

  const [selectionModel, setSelectionModel] = useState<GridRowSelectionModel>([]);
  const [tabValue, setTabValue] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState<T | null>(null);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  // Search, filter, and sort states
  const [searchValue, setSearchValue] = useState(filterParams.keyword || '');
  const [sortField, setSortField] = useState<string>('');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  const [filterValues, setFilterValues] = useState<FilterParams>({
    status: filterParams.status || '',
    limit: filterParams.limit || defaultRowsPerPage,
    page: filterParams.page || 0,
    keyword: filterParams.keyword || '',
  });

  // Status filter options - use provided options or default
  const STATUS_OPTIONS = statusOptions || [
    { value: '', label: 'All' },
    { value: 'New', label: 'New' },
    { value: 'Contacted', label: 'Contacted' },
    { value: 'In Progress', label: 'In Progress' },
    { value: 'Qualified', label: 'Qualified' },
    { value: 'Unqualified', label: 'Unqualified' },
    { value: 'Closed', label: 'Closed' },
  ];

  // Apply search debounce using utility function
  const debouncedSearch = useDebouncedSearch(onFilterChange, filterValues);

  // Handle search input change
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchValue(value);
    debouncedSearch(value);
  };

  // Handle filter change
  const handleFilterChange = (newFilters: FilterParams) => {
    setFilterValues(newFilters);
    if (onFilterChange) {
      onFilterChange(newFilters);
    }
  };

  // Handle sort change
  const handleSortChange = (field: string, direction: 'asc' | 'desc') => {
    setSortField(field);
    setSortDirection(direction);

    if (onSortChange) {
      onSortChange(field, direction);
    }
  };

  // Handle tab change
  const handleTabChange = (newValue: number, statusValue?: string) => {
    setTabValue(newValue);

    setFilterValues({
      ...filterValues,
      status: statusValue || '',
    });

    if (onFilterChange) {
      onFilterChange({
        ...filterValues,
        status: statusValue || '',
      });
    }
  };

  // Convert our columns to MUI X DataGrid columns
  const gridColumns: GridColDef[] = columns.map((column) => ({
    field: column.id,
    headerName: column.label,
    width: column.minWidth || 150,
    minWidth: column.minWidth || 150, // Ensure minimum width
    flex: column.id === 'fullName' ? 1.5 : column.id === 'community' || column.id === 'floorplan' ? 1.2 : 1, // Add flex to all columns
    sortable: column.sortable !== false,
    filterable: column.filterable !== false,
    align: column.align || 'left',
    headerAlign: column.align || 'left',
    renderCell: column.format ? (params) => column.format!(params.value, params.row as T) : undefined,
    headerClassName: 'bold-header',
  }));

  // Add custom action column if needed
  if (customRowAction) {
    gridColumns.push({
      field: 'actions',
      headerName: 'Action',
      width: 50,
      align: 'center',
      headerAlign: 'center',
      sortable: false,
      minWidth: 140,
      filterable: false,
      renderCell: (params) => {
        return (
          <Box sx={{ display: 'flex', gap: 1 }}>
            <LoadButtonWithIcon
              iconSrc="/dashboard/Load.svg"
              text="Load"
              onClick={(e) => handleLoadClick(e, params.row as T)}
            />
            <Box
              sx={{ display: 'flex', justifyContent: 'center', backgroundColor: '#EBF1FF', borderRadius: '8px', p: 1 }}
            >
              <IconButton size="small" onClick={(e) => handleActionClick(e, params.row as T)}>
                <MoreVertIcon fontSize="small" />
              </IconButton>
            </Box>
          </Box>
        );
      },
    });
  }

  // Add these new handlers
  const handleActionClick = (event: React.MouseEvent<HTMLElement>, row: T) => {
    event.stopPropagation();
    setSelectedRow(row);
    setAnchorEl(event.currentTarget);
    setIsModalOpen(true);
  };

  const handleLoadClick = (event: React.MouseEvent<HTMLElement>, row: T) => {
    event.stopPropagation();
    console.log('Load action for row:', row);
    // Implement your load functionality here
  };

  const handleClose = () => {
    setIsModalOpen(false);
    setAnchorEl(null);
  };

  const handleStartDesign = () => {
    // Handle start design action here
    console.log('Start design for row:', selectedRow);
    setIsModalOpen(false);
  };

  const handleArchive = () => {
    // Handle archive action here
    console.log('Archive row:', selectedRow);
    setIsModalOpen(false);
  };

  return (
    <Box sx={dataGridStyles.container}>
      {/* Custom Toolbar */}
      <Box sx={dataGridStyles.toolbar}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box sx={dataGridStyles.checkboxContainer}>
            <Checkbox size="small" sx={dataGridStyles.checkbox} />
            <ArrowDropDownIcon sx={dataGridStyles.dropdownIcon} />
          </Box>
        </Box>

        <IconButton size="small">
          <Box component="img" src="/dashboard/save.svg" sx={{ width: '18px', height: '18px' }} />
        </IconButton>
        <IconButton size="small">
          <Box component="img" src="/dashboard/delete.svg" sx={{ width: '18px', height: '18px' }} />
        </IconButton>

        {showTabs && (
          <Status
            tabValue={tabValue}
            onTabChange={handleTabChange}
            tabOptions={statusTabOptions}
            tabStyles={dataGridStyles}
          />
        )}

        <Box sx={dataGridStyles.flexGrow} />

        <TextField
          placeholder="Search"
          size="small"
          value={searchValue}
          onChange={handleSearchChange}
          sx={dataGridStyles.searchField}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <SearchIcon fontSize="small" />
              </InputAdornment>
            ),
          }}
        />

        {showFilter && (
          <ShowFilter
            filterValues={filterValues}
            onFilterChange={handleFilterChange}
            statusOptions={STATUS_OPTIONS}
            filterButtonStyles={dataGridStyles.filterButton}
          />
        )}

        {showSort && (
          <ShowSort
            columns={columns}
            sortField={sortField}
            sortDirection={sortDirection}
            onSortChange={handleSortChange}
            sortButtonStyles={dataGridStyles.sortButton}
          />
        )}
      </Box>

      <Box sx={dataGridStyles.gridContainer}>
        {loading ? (
          <SkeletonLoader variant="table" count={defaultRowsPerPage} animation="pulse" />
        ) : (
          <DataGridContext.Provider value={{ pageSizeOptions }}>
            <MuiDataGrid
              sx={{
                ...dataGridStyles.dataGrid,
                width: '100%',
                height: 'calc(100vh - 250px)', // Set explicit height
                '& .MuiDataGrid-columnHeaders': {
                  whiteSpace: 'nowrap',
                  width: '100%',
                  maxWidth: '100%',
                },
                '& .MuiDataGrid-row': {
                  width: '100%',
                  maxWidth: '100%',
                },
                '& .MuiDataGrid-footerContainer': {
                  position: 'sticky',
                  bottom: 0,
                  width: '100%',
                  backgroundColor: 'white',
                  zIndex: 5,
                },
                '& .MuiDataGrid-virtualScroller': {
                  // Ensure scrollbar is visible
                  overflowY: 'auto !important',
                  overflowX: 'auto !important',
                },
              }}
              autoHeight={false} // Set to false to enable scrolling
              hideFooterSelectedRowCount
              rowHeight={52}
              rows={rows}
              rowCount={totalRows || rows.length}
              paginationMode="server"
              pageSizeOptions={rowsPerPageOptions}
              columns={gridColumns}
              initialState={{
                pagination: {
                  paginationModel: { page: filterValues.page || 0, pageSize: filterValues.limit || defaultRowsPerPage },
                },
              }}
              onPaginationModelChange={(model) => {
                // Update both page and limit in filter values
                setFilterValues({
                  ...filterValues,
                  limit: model.pageSize,
                  page: model.page,
                });

                if (onFilterChange) {
                  onFilterChange({
                    ...filterValues,
                    limit: model.pageSize,
                    page: model.page,
                  });
                }
              }}
              onRowClick={(params) => {
                if (onRowClick) {
                  onRowClick(params.row as T);
                }
              }}
              checkboxSelection={showCheckboxes}
              onRowSelectionModelChange={(newSelectionModel) => {
                setSelectionModel(newSelectionModel);
              }}
              rowSelectionModel={selectionModel}
              loading={loading}
              disableRowSelectionOnClick
              slots={{
                pagination: CustomPaginationWrapper,
                loadingOverlay: () => (
                  <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                    <CircularProgress />
                  </Box>
                ),
              }}
              getRowId={getRowId}
            />
          </DataGridContext.Provider>
        )}
      </Box>

      <ActionModal
        open={isModalOpen}
        onClose={handleClose}
        onStartDesign={handleStartDesign}
        onArchive={handleArchive}
        anchorEl={anchorEl}
      />
    </Box>
  );
};

export default DataGrid;
