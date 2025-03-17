import { Box, Paper, ToggleButton, ToggleButtonGroup } from '@mui/material';
import { useRef, useState } from 'react';
import { emitter, THREE_EVENTS } from '@/utils/events';
import { SketchPicker } from 'react-color';
import { useColorPicker } from '@/components/threejs/hooks/useColorPicker';

interface DraggableColorPickerProps {
  onColorChange?: (color: string) => void;
  islandType?: 'island' | 'kitchen';
}

interface DraggableColorSpotProps {
  color: string;
  islandType?: 'island' | 'kitchen' | 'backwall2';
}

export const DraggableColorPicker = ({ 
  onColorChange,
  islandType = 'island' 
}: DraggableColorPickerProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x: 100, y: 100 });
  const [targetType, setTargetType] = useState<'cabinet' | 'benchtop'>('cabinet');
  const dragRef = useRef<{ startX: number; startY: number }>({ startX: 0, startY: 0 });
  
  const { colorState } = useColorPicker();

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    dragRef.current = {
      startX: e.pageX - position.x,
      startY: e.pageY - position.y,
    };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;

    const newX = e.pageX - dragRef.current.startX;
    const newY = e.pageY - dragRef.current.startY;
    
    setPosition({ x: newX, y: newY });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleColorChange = (newColor: any) => {
    // Emit sự kiện color picker change
    emitter.emit(THREE_EVENTS.colorPickerChange, {
      color: newColor.hex,
      targetType,
      islandType
    });

    onColorChange?.(newColor.hex);
  };

  return (
    <Paper
      elevation={3}
      sx={{
        position: 'fixed',
        left: position.x,
        top: position.y,
        cursor: isDragging ? 'grabbing' : 'grab',
        zIndex: 9999,
        backgroundColor: 'transparent',
      }}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      <Box sx={{ p: 1 }}>
        <Box sx={{ mb: 1 }}>
          <ToggleButtonGroup
            value={targetType}
            exclusive
            onChange={(e, value) => value && setTargetType(value)}
            size="small"
            fullWidth
          >
            <ToggleButton value="cabinet">
              Tủ
            </ToggleButton>
            <ToggleButton value="benchtop">
              Mặt bàn
            </ToggleButton>
          </ToggleButtonGroup>
        </Box>
        <SketchPicker
          color={colorState.color}
          onChange={handleColorChange}
          disableAlpha
        />
      </Box>
    </Paper>
  );
};

export const DraggableColorSpot: React.FC<DraggableColorSpotProps> = ({ 
  color,
  islandType = 'kitchen'
}) => {
  const handleDragStart = (e: React.DragEvent) => {
    e.dataTransfer.setData('color', color);
    e.dataTransfer.setData('islandType', islandType);
  };

  return (
    <Box
      draggable
      onDragStart={handleDragStart}
      sx={{
        width: '100%',
        paddingBottom: '100%', // Tạo hình vuông
        backgroundColor: color,
        cursor: 'grab',
        transition: 'transform 0.2s',
        position: 'relative',
        '&:hover': {
          transform: 'scale(1.1)',
          zIndex: 1
        },
        '&:active': {
          cursor: 'grabbing',
        }
      }}
    />
  );
}; 
