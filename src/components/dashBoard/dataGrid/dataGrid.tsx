import React, { useState } from 'react';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import FilterListIcon from '@mui/icons-material/FilterList';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import SearchIcon from '@mui/icons-material/Search';
import { Box, Button, Checkbox, IconButton, InputAdornment, Tab, Tabs, TextField, Typography } from '@mui/material';
import {
  GridColDef,
  gridPageCountSelector,
  gridPageSelector,
  GridRowSelectionModel,
  DataGrid as MuiDataGrid,
  useGridApiContext,
  useGridSelector,
} from '@mui/x-data-grid';

import { LoadButtonWithIcon } from '../loadButtonWithIcon/loadButtonWithIcon';
import { ActionModal } from '../modal/modal';
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
  rowsPerPageOptions?: number[];
  defaultRowsPerPage?: number;
  showTabs?: boolean;
  showCheckboxes?: boolean;
  showSearch?: boolean;
  showFilter?: boolean;
  showSort?: boolean;
  onFilterChange?: (filters: Record<string, unknown>) => void;
  onSortChange?: (sortBy: string, direction: 'asc' | 'desc') => void;
  onRowClick?: (row: T) => void;
  getRowId: (row: T) => string | number;
  customRowAction?: (row: T) => React.ReactNode;
}

// Custom pagination component
function CustomPagination() {
  const apiRef = useGridApiContext();
  const page = useGridSelector(apiRef, gridPageSelector);
  const pageCount = useGridSelector(apiRef, gridPageCountSelector);
  const { state } = apiRef.current;
  const pageSize = state.pagination.paginationModel.pageSize;
  const rowCount = state.rows.totalRowCount;

  const from = page * pageSize + 1;
  const to = Math.min((page + 1) * pageSize, rowCount);

  // Generate page numbers
  const renderPageNumbers = () => {
    const pageNumbers = [];

    // Simple approach to match screenshot exactly showing "1 2 3 4 5 ... 9"
    const totalPages = Math.min(pageCount, 9); // Limit to 9 pages in screenshot

    for (let i = 0; i < totalPages; i++) {
      // Show numbers 1-5, then ellipsis, then 9 (if more than 5 pages)
      if (i < 5 || i === totalPages - 1) {
        pageNumbers.push(
          <Button
            key={i}
            size="small"
            variant={page === i ? 'contained' : 'text'}
            onClick={() => apiRef.current.setPage(i)}
            sx={dataGridStyles.pageButton(page === i)}
          >
            {i + 1}
          </Button>
        );
      } else if (i === 5) {
        // Add ellipsis after 5
        pageNumbers.push(
          <Typography key="ellipsis" variant="body2" sx={{ mx: 0.5 }}>
            ...
          </Typography>
        );
      }
    }

    return pageNumbers;
  };

  return (
    <Box sx={dataGridStyles.paginationContainer}>
      {/* Left side - Result count */}
      <Typography variant="body2" color="text.secondary">
        Viewing {from}-{to} of {rowCount} results
      </Typography>

      {/* Middle - Page numbers */}
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{renderPageNumbers()}</Box>

      {/* Right side - Previous/Next buttons */}
      <Box>
        <Button
          size="small"
          disabled={page === 0}
          onClick={() => apiRef.current.setPage(page - 1)}
          sx={dataGridStyles.paginationNavButton}
        >
          Previous
        </Button>
        <Button
          size="small"
          disabled={page >= pageCount - 1}
          onClick={() => apiRef.current.setPage(page + 1)}
          sx={dataGridStyles.paginationNavButton}
        >
          Next
        </Button>
      </Box>
    </Box>
  );
}

export const DataGrid = <T extends Record<string, unknown>>(props: DataGridProps<T>): React.JSX.Element => {
  const {
    columns,
    rows,
    rowsPerPageOptions = [7, 10, 25, 50],
    defaultRowsPerPage = 7,
    showCheckboxes = true,
    showSearch = true,
    showFilter = true,
    showSort = true,
    onRowClick,
    getRowId,
    customRowAction,
  } = props;

  const [selectionModel, setSelectionModel] = useState<GridRowSelectionModel>([]);
  const [tabValue, setTabValue] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState<T | null>(null);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  // Convert our columns to MUI X DataGrid columns
  const gridColumns: GridColDef[] = columns.map((column) => ({
    field: column.id,
    headerName: column.label,
    width: column.minWidth || 150,
    sortable: column.sortable !== false,
    filterable: column.filterable !== false,
    align: column.align || 'left',
    headerAlign: column.align || 'left',
    flex: column.flex !== undefined ? column.flex : column.minWidth ? 0 : 1,
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

        <Tabs value={tabValue} onChange={handleTabChange} sx={dataGridStyles.tabsContainer}>
          <Tab label="All" sx={dataGridStyles.tab(tabValue === 0)} />
          <Tab label="Active" sx={dataGridStyles.tabWithPadding(tabValue === 1)} />
          <Tab label="Archive" sx={dataGridStyles.tabWithPadding(tabValue === 2)} />
        </Tabs>

        <Box sx={dataGridStyles.flexGrow} />

        <TextField
          placeholder="Search"
          size="small"
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
          <Button startIcon={<FilterListIcon />} variant="text" size="small" sx={dataGridStyles.filterButton}>
            Filter
          </Button>
        )}

        {showSort && (
          <Button endIcon={<ExpandMoreIcon />} variant="text" size="small" sx={dataGridStyles.sortButton}>
            Sort by
          </Button>
        )}
      </Box>

      <Box sx={dataGridStyles.gridContainer}>
        <MuiDataGrid
          rows={rows}
          columns={gridColumns}
          getRowId={(row) => getRowId(row as T)}
          autoHeight={false}
          disableRowSelectionOnClick
          disableColumnResize
          getRowHeight={() => 'auto'}
          getEstimatedRowHeight={() => 100}
          checkboxSelection={showCheckboxes}
          onRowSelectionModelChange={(newSelectionModel) => {
            setSelectionModel(newSelectionModel);
          }}
          rowSelectionModel={selectionModel}
          onRowClick={(params) => {
            if (onRowClick) {
              onRowClick(params.row as T);
            }
          }}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: defaultRowsPerPage,
              },
            },
          }}
          pageSizeOptions={rowsPerPageOptions}
          slots={{
            toolbar: undefined,
            pagination: CustomPagination,
          }}
          slotProps={{
            toolbar: {
              showQuickFilter: showSearch,
            },
          }}
          sx={dataGridStyles.dataGrid}
        />
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
