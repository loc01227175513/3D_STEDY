import React, { useState } from 'react';
import FilterListIcon from '@mui/icons-material/FilterList';
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Popover,
  Select,
  SelectChangeEvent,
  Typography,
} from '@mui/material';

// Filter params interface
export interface FilterParams {
  keyword?: string;
  status?: string;
  page?: number;
  limit?: number;
  createFrom?: string;
  createTo?: string;
}

interface ShowFilterProps {
  filterValues: FilterParams;
  onFilterChange: (filters: FilterParams) => void;
  statusOptions?: { value: string; label: string }[];
  filterButtonStyles?: React.CSSProperties | Record<string, unknown>;
}

export const ShowFilter: React.FC<ShowFilterProps> = ({
  filterValues,
  onFilterChange,
  statusOptions = [
    { value: '', label: 'All' },
    { value: 'New', label: 'New' },
    { value: 'Contacted', label: 'Contacted' },
    { value: 'In Progress', label: 'In Progress' },
    { value: 'Qualified', label: 'Qualified' },
    { value: 'Unqualified', label: 'Unqualified' },
    { value: 'Closed', label: 'Closed' },
  ],
  filterButtonStyles = {},
}) => {
  const [filterAnchorEl, setFilterAnchorEl] = useState<null | HTMLElement>(null);
  const [localFilterValues, setLocalFilterValues] = useState<FilterParams>(filterValues);

  const filterOpen = Boolean(filterAnchorEl);

  // Handle status change in filter
  const handleStatusChange = (event: SelectChangeEvent<string>) => {
    const status = event.target.value;
    setLocalFilterValues({
      ...localFilterValues,
      status,
    });
  };

  // Apply filter updates
  const handleApplyFilter = () => {
    if (onFilterChange) {
      onFilterChange(localFilterValues);
    }
    setFilterAnchorEl(null);
  };

  return (
    <>
      <Button
        startIcon={<FilterListIcon />}
        variant="text"
        size="small"
        sx={filterButtonStyles}
        onClick={(e) => setFilterAnchorEl(e.currentTarget)}
      >
        Filter
      </Button>

      <Popover
        open={filterOpen}
        anchorEl={filterAnchorEl}
        onClose={() => setFilterAnchorEl(null)}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <Box sx={{ p: 2, width: 300 }}>
          <Typography variant="subtitle1" sx={{ mb: 2 }}>
            Filters
          </Typography>

          <FormControl fullWidth size="small" sx={{ mb: 2 }}>
            <InputLabel>Status</InputLabel>
            <Select value={localFilterValues.status || ''} label="Status" onChange={handleStatusChange}>
              {statusOptions.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
            <Button variant="outlined" size="small" onClick={() => setFilterAnchorEl(null)} sx={{ mr: 1 }}>
              Cancel
            </Button>
            <Button variant="contained" size="small" onClick={handleApplyFilter}>
              Apply
            </Button>
          </Box>
        </Box>
      </Popover>
    </>
  );
};

export default ShowFilter;
