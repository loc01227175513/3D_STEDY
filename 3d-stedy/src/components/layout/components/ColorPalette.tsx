import * as React from 'react';
import { drawerStore, useBrandStore, useStyleStore } from '@/store';
import { Box, useMediaQuery, Typography } from '@mui/material';
import ColorItem from './CorlorItem';
import theme from '@/themes';
import { Spinner } from '@/components/spinner';
import { DraggableColorSpot } from './DraggableColorPicker';

const ColorPalette: React.FC<{
  sx?: object;
  onCloseDrawer?: () => void;
}> = ({ sx, onCloseDrawer }) => {
  const { activeTypeStyle } = drawerStore();
  const isMobile = useMediaQuery(theme.breakpoints.down('tablet'));
  const { isLoading, dataStyle } = useStyleStore();
  const { activeSeries } = useBrandStore();
  // console.log('activeSeries:', activeSeries);
  
  // Filter by active series
  const filteredDataStyles = activeSeries?.id
    ? dataStyle?.filter((p) => p.serieIds?.includes(activeSeries.id))
    : dataStyle;
  // console.log('filteredDataStyles:', filteredDataStyles);

  return (
    <Spinner loading={isLoading} size={isMobile ? 'small' : 'medium'}>
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '10px',
          justifyContent: '',
          ...sx,
        }}
      >
        {(filteredDataStyles || [])
          .filter((s) => s.type === activeTypeStyle)
          .map((item, index) => (
            <ColorItem
              key={index}
              item={item}
              onCloseDrawer={() => {
                onCloseDrawer && onCloseDrawer();
              }}
            />
          ))}
      </Box>
    </Spinner>
  );
};

const PRESET_COLORS = [
  // Reds
  '#FF0000', // Red
  '#FF4D4D', // Light Red
  '#B30000', // Dark Red
  '#FF9999', // Pink Red
  
  // Blues
  '#0000FF', // Blue
  '#4D4DFF', // Light Blue
  '#00008B', // Dark Blue
  '#ADD8E6', // Light Sky Blue
  
  // Greens
  '#00FF00', // Green
  '#90EE90', // Light Green
  '#006400', // Dark Green
  '#98FB98', // Pale Green
  
  // Yellows & Oranges
  '#FFD700', // Gold
  '#FFA500', // Orange
  '#FF6B6B', // Coral
  '#FFFF00', // Yellow
  
  // Purples
  '#800080', // Purple
  '#9370DB', // Medium Purple
  '#DA70D6', // Orchid
  '#FF00FF', // Magenta
  
  // Browns
  '#8B4513', // Saddle Brown
  '#DEB887', // Burlywood
  '#D2691E', // Chocolate
  '#CD853F', // Peru
  
  // Neutrals
  '#FFFFFF', // White
  '#000000', // Black
  '#808080', // Gray
  '#C0C0C0', // Silver
  
  // Pastels
  '#FFB6C1', // Light Pink
  '#E6E6FA', // Lavender
  '#F0FFF0', // Honeydew
  '#F5F5DC', // Beige
];

interface DraggableColorPaletteProps {
  islandType?: 'island' | 'kitchen' | 'backwall2';
}

export const DraggableColorPalette: React.FC<DraggableColorPaletteProps> = ({ islandType = 'kitchen' }) => {
  return (
    <Box>
      <Typography variant="body2" sx={{ mb: 1, color: '#666', margin: '10px' }}>
        Drag colour into model to change
      </Typography>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(5, 1fr)',
          gap: 1,
          p: 2,
          backgroundColor: 'white',
          borderRadius: 1,
          border: '1px solid #eee',
          maxWidth: 300,
        }}
      >
        {PRESET_COLORS.map((color) => (
          <DraggableColorSpot
            key={color}
            color={color}
            islandType={islandType}
          />
        ))}
      </Box>
    </Box>
  );
};

export default ColorPalette;
