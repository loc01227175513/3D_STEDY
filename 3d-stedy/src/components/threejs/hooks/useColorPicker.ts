import { useState, useEffect } from 'react';
import { emitter, THREE_EVENTS } from '@/utils/events';
import { productStore } from '@/store';
import { StyleEntity } from '@/types/model';

interface ColorPickerState {
  color: string;
  targetType: 'cabinet' | 'benchtop' | null;
  islandType: 'island' | 'kitchen';
}

export const useColorPicker = () => {
  const [colorState, setColorState] = useState<ColorPickerState>({
    color: '#fff',
    targetType: null,
    islandType: 'island'
  });

  const { setCabinetColor, setBenchtopColor } = productStore();

  const handleColorChange = (color: string, targetType: 'cabinet' | 'benchtop', islandType: 'island' | 'kitchen') => {
    setColorState({
      color,
      targetType,
      islandType
    });

    // Emit sự kiện để thay đổi màu
    emitter.emit(
      THREE_EVENTS.changeMaterialBackWall,
      `${islandType}_${targetType}`,
      targetType,
      color
    );

    // Tạo style entity mới
    const newStyle: StyleEntity = {
      id: 1,
      type: targetType === 'cabinet' ? 'CABINET' : 'BENCHTOP',
      name: 'Custom Color',
      path: color,
      tenantIds: [],
      serieIds: [],
      default: false
    };

    // Cập nhật store
    if (targetType === 'cabinet') {
      setCabinetColor(newStyle);
    } else {
      setBenchtopColor(newStyle);
    }
  };

  // Lắng nghe sự kiện từ color picker
  useEffect(() => {
    const handleColorPickerChange = (data: {
      color: string;
      targetType: 'cabinet' | 'benchtop';
      islandType: 'island' | 'kitchen';
    }) => {
      handleColorChange(data.color, data.targetType, data.islandType);
    };

    emitter.on(THREE_EVENTS.colorPickerChange, handleColorPickerChange);

    return () => {
      emitter.off(THREE_EVENTS.colorPickerChange, handleColorPickerChange);
    };
  }, []);

  return {
    colorState,
    handleColorChange
  };
}; 
