import React from 'react';
import ListIcon from '@mui/icons-material/ViewList';
import GridIcon from '@mui/icons-material/ViewModule';
import { Box, Button, FormControl, MenuItem, Select, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material';

import OrderedCommunitiesGrid from './orderedCommunitiesGrid';
import OrderedCommunitiesList from './orderedCommunitiesList';

interface OrderedItem {
  id: number;
  name: string;
}

interface OrderedCommunitiesProps {
  orderedItems: OrderedItem[];
  viewMode: 'list' | 'grid';
  onViewModeChange: (event: React.MouseEvent<HTMLElement>, newMode: 'list' | 'grid') => void;
  onRemoveItem: (id: number) => void;
  onReorderItems?: (items: OrderedItem[]) => void;
}

// Simplified manual drag and drop implementation
const OrderedCommunities = ({
  orderedItems,
  viewMode,
  onViewModeChange,
  onRemoveItem,
  onReorderItems,
}: OrderedCommunitiesProps): React.JSX.Element => {
  // Handle dropping an item

  // Render grid view if viewMode is grid
  if (viewMode === 'grid') {
    return (
      <Box
        sx={{
          width: '100%',
          maxWidth: '100%',
          minWidth: '100%',
          overflow: 'hidden',
          p: 2,
          backgroundColor: '#F5F5F5',
          borderRadius: 2,
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Typography sx={{ fontWeight: 'bold' }}>Community</Typography>
            <FormControl size="small" sx={{ minWidth: 220 }}>
              <Select defaultValue="lorem" sx={{ bgcolor: '#f9f9f9', fontWeight: 'bold', color: '#969696' }}>
                <MenuItem value="lorem">Lorem ipsum dolor sit</MenuItem>
                <MenuItem value="halcyon">Halcyon</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <ToggleButtonGroup
            value={viewMode}
            exclusive
            onChange={onViewModeChange}
            size="small"
            sx={{
              '& .MuiToggleButton-root': {
                color: '#767676',
                '&.Mui-selected': {
                  backgroundColor: '#000',
                  color: '#fff',
                  '&:hover': {
                    backgroundColor: '#000',
                  },
                },
              },
            }}
          >
            <ToggleButton value="list" aria-label="list view">
              <ListIcon />
              <Typography sx={{ ml: 0.5 }}>List</Typography>
            </ToggleButton>
            <ToggleButton value="grid" aria-label="grid view">
              <GridIcon />
              <Typography sx={{ ml: 0.5 }}>Grid</Typography>
            </ToggleButton>
          </ToggleButtonGroup>
        </Box>

        <Typography variant="body2" sx={{ mb: 2 }}>
          Drag the items into the order you prefer. Click the arrow on the right of the item to reveal additional
          configuration options.
        </Typography>

        <OrderedCommunitiesGrid
          orderedItems={orderedItems}
          viewMode={viewMode}
          onViewModeChange={onViewModeChange}
          onRemoveItem={onRemoveItem}
          onReorderItems={onReorderItems}
        />

        <Box sx={{ display: 'flex', justifyContent: 'flex-start', gap: 2, mt: 2 }}>
          <Button variant="contained" color="primary" sx={{ bgcolor: '#000' }}>
            Save
          </Button>
          <Button variant="outlined" sx={{ bgcolor: '#EAEAEA', color: '#000', border: 'none' }}>
            Cancel
          </Button>
        </Box>
      </Box>
    );
  }

  // Default list view
  return (
    <Box sx={{ width: '100%', p: 2, backgroundColor: '#F5F5F5', borderRadius: 2 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Typography sx={{ fontWeight: 'bold' }}>Community</Typography>
          <FormControl size="small" sx={{ minWidth: 220 }}>
            <Select defaultValue="lorem" sx={{ bgcolor: '#F5F5F5', fontWeight: 'bold', color: '#969696' }}>
              <MenuItem value="lorem">Lorem ipsum dolor sit</MenuItem>
              <MenuItem value="halcyon">Halcyon</MenuItem>
            </Select>
          </FormControl>
        </Box>

        <ToggleButtonGroup
          value={viewMode}
          exclusive
          onChange={onViewModeChange}
          size="small"
          sx={{
            '& .MuiToggleButton-root': {
              color: '#767676',
              '&.Mui-selected': {
                backgroundColor: '#000',
                color: '#fff',
                '&:hover': {
                  backgroundColor: '#000',
                },
              },
            },
          }}
        >
          <ToggleButton value="list" aria-label="list view">
            <ListIcon />
            <Typography sx={{ ml: 0.5 }}>List</Typography>
          </ToggleButton>
          <ToggleButton value="grid" aria-label="grid view">
            <GridIcon />
            <Typography sx={{ ml: 0.5 }}>Grid</Typography>
          </ToggleButton>
        </ToggleButtonGroup>
      </Box>

      <Typography variant="body2" sx={{ mb: 2 }}>
        Drag the items into the order you prefer. Click the arrow on the right of the item to reveal additional
        configuration options.
      </Typography>

      <OrderedCommunitiesList
        orderedItems={orderedItems}
        viewMode={viewMode}
        onViewModeChange={onViewModeChange}
        onRemoveItem={onRemoveItem}
        onReorderItems={onReorderItems}
      />

      <Box sx={{ display: 'flex', justifyContent: 'flex-start', gap: 2 }}>
        <Button variant="contained" color="primary" sx={{ bgcolor: '#000' }}>
          Save
        </Button>
        <Button variant="outlined" sx={{ bgcolor: '#EAEAEA', color: '#000', border: 'none' }}>
          Cancel
        </Button>
      </Box>
    </Box>
  );
};

export default OrderedCommunities;
