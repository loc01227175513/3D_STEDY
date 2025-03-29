import React, { useState } from 'react';
import { Box } from '@mui/material';

import CommunityList from '../../../components/dashBoard/communityList/communityList';
import OrderedCommunities from '../../../components/dashBoard/orderedCommunities/orderedCommunities';

interface CommunityItem {
  id: number;
  name: string;
  selected: boolean;
}

interface OrderedItem {
  id: number;
  name: string;
}

const CategoryPage = (): React.JSX.Element => {
  // State for the category items
  const [items, setItems] = useState<CommunityItem[]>([
    { id: 1, name: 'Halcyon Coves', selected: false },
    { id: 2, name: 'Halcyon Dales', selected: false },
    { id: 3, name: 'Halcyon Edgebrook', selected: false },
    { id: 4, name: 'Halcyon Evergreen', selected: false },
    { id: 5, name: 'Halcyon Gables', selected: false },
    { id: 6, name: 'Halcyon Greens', selected: false },
    { id: 7, name: 'Halcyon Highlands', selected: false },
    { id: 8, name: 'Halcyon Horizon', selected: false },
    { id: 9, name: 'Halcyon Jardin', selected: false },
    { id: 10, name: 'Urban Oasis', selected: false },
    { id: 11, name: 'EcoNest', selected: false },
    { id: 12, name: 'Solar Haven', selected: false },
  ]);

  // State for the ordered items on the right panel
  const [orderedItems, setOrderedItems] = useState<OrderedItem[]>([
    { id: 1, name: 'Halcyon Coves' },
    { id: 2, name: 'Halcyon Dales' },
    { id: 3, name: 'Halcyon Edgebrook' },
    { id: 4, name: 'Halcyon Evergreen' },
    { id: 5, name: 'Halcyon Evergreen' }, // Duplicate for demo
    { id: 6, name: 'Halcyon Gables' },
    { id: 7, name: 'Halcyon Greens' },
    { id: 8, name: 'Halcyon Highlands' },
    { id: 9, name: 'Halcyon Horizon' },
  ]);

  // State for view mode (list or grid)
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');

  // Handler for selecting all items
  const handleSelectAll = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newItems = items.map((item) => ({
      ...item,
      selected: event.target.checked,
    }));
    setItems(newItems);
  };

  // Handler for selecting individual item
  const handleSelectItem = (id: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
    const newItems = items.map((item) => (item.id === id ? { ...item, selected: event.target.checked } : item));
    setItems(newItems);
  };

  // Handler for adding selected items to the list
  const handleAddToList = () => {
    const selectedItems = items.filter((item) => item.selected);
    if (selectedItems.length === 0) return;

    const newOrderedItems = [...orderedItems];
    selectedItems.forEach((item) => {
      newOrderedItems.push({ id: item.id, name: item.name });
    });

    setOrderedItems(newOrderedItems);
  };

  // Handler for removing an item from the ordered list
  const handleRemoveItem = (id: number) => {
    const newOrderedItems = orderedItems.filter((_, index) => index !== id);
    setOrderedItems(newOrderedItems);
  };

  // Handler for changing view mode
  const handleViewModeChange = (_: React.MouseEvent<HTMLElement>, newMode: 'list' | 'grid') => {
    if (newMode !== null) {
      setViewMode(newMode);
    }
  };

  // Handler for reordering items
  const handleReorderItems = (reorderedItems: OrderedItem[]) => {
    setOrderedItems(reorderedItems);
  };

  return (
    <Box sx={{ display: 'flex', p: 2, gap: 4 }}>
      {/* Left panel - Item selection */}
      <Box sx={{ width: '30%', minWidth: 250 }}>
        <CommunityList
          items={items}
          onSelectAll={handleSelectAll}
          onSelectItem={handleSelectItem}
          onAddToList={handleAddToList}
        />
      </Box>

      {/* Right panel - Ordered items */}
      <Box sx={{ width: '70%' }}>
        <OrderedCommunities
          orderedItems={orderedItems}
          viewMode={viewMode}
          onViewModeChange={handleViewModeChange}
          onRemoveItem={handleRemoveItem}
          onReorderItems={handleReorderItems}
        />
      </Box>
    </Box>
  );
};

export default CategoryPage;
