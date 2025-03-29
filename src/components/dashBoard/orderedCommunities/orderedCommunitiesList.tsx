import React, { useEffect, useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import DragHandleIcon from '@mui/icons-material/DragHandle';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Box, IconButton, List, ListItem, ListItemIcon, ListItemText, Paper, Typography } from '@mui/material';

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
const OrderedCommunitiesList = ({
  orderedItems,
  onRemoveItem,
  onReorderItems,
}: OrderedCommunitiesProps): React.JSX.Element => {
  const [items, setItems] = useState<OrderedItem[]>(orderedItems);
  const [draggedItemIndex, setDraggedItemIndex] = useState<number | null>(null);
  const [dragOverItemIndex, setDragOverItemIndex] = useState<number | null>(null);

  // Update local state when props change
  useEffect(() => {
    setItems(orderedItems);
  }, [orderedItems]);

  // Handle starting drag operation
  const handleDragStart = (index: number) => {
    setDraggedItemIndex(index);
    console.log('Drag started on item index:', index);
  };

  // Handle when dragging over another item
  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault(); // Necessary to allow dropping
    setDragOverItemIndex(index);
  };

  // Handle dropping an item
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    console.log('Drop event:', { draggedItemIndex, dragOverItemIndex });

    // Make sure we have valid indexes
    if (draggedItemIndex === null || dragOverItemIndex === null || draggedItemIndex === dragOverItemIndex) {
      setDraggedItemIndex(null);
      setDragOverItemIndex(null);
      return;
    }

    // Create a copy of the items array
    const newItems = [...items];

    // Remove the dragged item from its position
    const [draggedItem] = newItems.splice(draggedItemIndex, 1);

    // Insert the dragged item at the new position
    newItems.splice(dragOverItemIndex, 0, draggedItem);

    console.log('Reordered items:', newItems);

    // Update state
    setItems(newItems);

    // Notify parent component
    if (onReorderItems) {
      onReorderItems(newItems);
    }

    // Reset drag state
    setDraggedItemIndex(null);
    setDragOverItemIndex(null);
  };

  // Handle when dragging leaves a drop target
  const handleDragLeave = () => {
    // No need to reset dragOverItemIndex here as it would make highlighting jumpy
  };

  // Cleanup if drag ends without a valid drop
  const handleDragEnd = () => {
    setDraggedItemIndex(null);
    setDragOverItemIndex(null);
  };

  return (
    <Paper variant="outlined" sx={{ p: 2, mb: 2 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, p: 1, bgcolor: 'grey.100', borderRadius: 1 }}>
        <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
          B by Halcyon
        </Typography>
        <IconButton size="small" sx={{ ml: 'auto' }}>
          <AddIcon />
        </IconButton>
        <IconButton size="small">
          <MoreVertIcon />
        </IconButton>
      </Box>

      <List
        sx={{
          padding: 1,
          '& > *': {
            marginBottom: 1,
          },
        }}
      >
        {items.map((item, index) => (
          <ListItem
            key={`item-${item.id}`}
            draggable
            onDragStart={() => handleDragStart(index)}
            onDragOver={(e) => handleDragOver(e, index)}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onDragEnd={handleDragEnd}
            sx={{
              userSelect: 'none',
              padding: 1,
              backgroundColor: dragOverItemIndex === index ? 'rgba(25, 118, 210, 0.04)' : 'white',
              borderRadius: 1,
              border:
                draggedItemIndex === index
                  ? '1px solid #1976d2'
                  : dragOverItemIndex === index
                    ? '1px dashed #1976d2'
                    : '1px solid rgba(0, 0, 0, 0.12)',
              display: 'flex',
              alignItems: 'center',
              cursor: 'grab',
              '&:hover': {
                backgroundColor: 'rgba(0, 0, 0, 0.04)',
              },
              '&:active': {
                cursor: 'grabbing',
              },
            }}
          >
            <ListItemIcon
              sx={{
                minWidth: 48,
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              <DragHandleIcon
                style={{
                  color: draggedItemIndex === index ? '#1976d2' : '#666',
                  cursor: 'grab',
                }}
              />
            </ListItemIcon>

            <Box
              sx={{
                width: 30,
                height: 30,
                bgcolor: 'grey.200',
                mr: 2,
                borderRadius: '4px',
                flexShrink: 0,
              }}
            />

            <ListItemText
              primary={item.name}
              sx={{
                '.MuiTypography-root': {
                  fontWeight: draggedItemIndex === index ? 500 : 400,
                },
              }}
            />

            <Box sx={{ display: 'flex', ml: 'auto' }}>
              <IconButton
                size="small"
                onClick={() => onRemoveItem(item.id)}
                sx={{
                  '&:hover': {
                    color: 'error.main',
                  },
                }}
              >
                <DeleteIcon fontSize="small" />
              </IconButton>
              <IconButton
                size="small"
                sx={{
                  '&:hover': {
                    color: 'primary.main',
                  },
                }}
              >
                <MoreVertIcon fontSize="small" />
              </IconButton>
            </Box>
          </ListItem>
        ))}
      </List>
    </Paper>
  );
};

export default OrderedCommunitiesList;
