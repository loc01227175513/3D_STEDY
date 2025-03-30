import React, { useState } from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Button, Menu, MenuItem } from '@mui/material';

export interface Column {
  id: string;
  label: string;
}

interface ShowSortProps {
  columns: Column[];
  sortField: string;
  sortDirection: 'asc' | 'desc';
  onSortChange: (sortBy: string, direction: 'asc' | 'desc') => void;
  sortButtonStyles?: React.CSSProperties | Record<string, unknown>;
}

export const ShowSort: React.FC<ShowSortProps> = ({
  columns,
  sortField,
  sortDirection,
  onSortChange,
  sortButtonStyles = {},
}) => {
  const [sortAnchorEl, setSortAnchorEl] = useState<null | HTMLElement>(null);
  const sortOpen = Boolean(sortAnchorEl);

  // Handle sort option selection
  const handleSortSelect = (field: string) => {
    const newDirection = field === sortField && sortDirection === 'desc' ? 'asc' : 'desc';

    if (onSortChange) {
      onSortChange(field, newDirection);
    }

    setSortAnchorEl(null);
  };

  return (
    <>
      <Button
        endIcon={<ExpandMoreIcon />}
        variant="text"
        size="small"
        sx={sortButtonStyles}
        onClick={(e) => setSortAnchorEl(e.currentTarget)}
      >
        Sort by
      </Button>

      <Menu open={sortOpen} anchorEl={sortAnchorEl} onClose={() => setSortAnchorEl(null)}>
        {columns.map((column) => (
          <MenuItem key={column.id} onClick={() => handleSortSelect(column.id)} selected={sortField === column.id}>
            {column.label} {sortField === column.id && (sortDirection === 'asc' ? '↑' : '↓')}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

export default ShowSort;
