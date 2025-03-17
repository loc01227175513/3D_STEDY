import React, { useState, useMemo, useEffect } from 'react';
import { Grid2, Box } from '@mui/material';
import { productStore, useBrandStore, useCategoriesStore } from '@/store';
import { CategoryEntity } from '@/types/model';
import { emitter, THREE_EVENTS } from '@/utils/events';

interface CategoriesIndoProps {
  selectedCategory?: string[];
}

export default function CategoriesIndo({
  selectedCategory = [],
}: CategoriesIndoProps): JSX.Element {
  const { activeSeries } = useBrandStore();
  const { dataCategories } = useCategoriesStore();
  const { categoryId, filterProductsByCategory } = productStore();
  const { filterProductsByKeyword } = productStore();
  const [hoveredItemId, setHoveredItemId] = useState<string | null>(null);
  const [highlightedComponent, setHighlightedComponent] = useState<string | null>(null);

  // Lọc sản phẩm khi category thay đổi
  useMemo(() => {
    if (selectedCategory.length > 0) {
      // Lọc theo category đầu tiên để hiển thị sản phẩm
      filterProductsByCategory(selectedCategory[0], activeSeries?.id);
    }
  }, [selectedCategory, activeSeries?.id]);

  // Lắng nghe sự kiện highlight component
  useEffect(() => {
    const handleHighlightComponent = (data: { componentName: string }) => {
      setHighlightedComponent(data.componentName);

      // Khi nhận được component được highlight, tự động lọc sản phẩm
      if (data.componentName) {
        const componentName = data.componentName;
       
        // Chỉ check đặc biệt cho Cabinet_Sink_Double_Door
        if (componentName.includes('Cabinet_Sink_Double_Door_')) {
          //check  đặc biệt cho Sink
          filterProductsByKeyword('');
        } else {
          // Clear filter nếu click vào component khác
          filterProductsByKeyword('');
        }
        if (componentName.includes('Shelf_High_Single_Door_')) {
          filterProductsByKeyword('');
        }else {
          // Clear filter nếu click vào component khác
          filterProductsByKeyword('');
        }
      }
    };

    emitter.on(THREE_EVENTS.HIGHLIGHT_COMPONENT_CATEGORY, handleHighlightComponent);

    return () => {
      emitter.off(THREE_EVENTS.HIGHLIGHT_COMPONENT_CATEGORY, handleHighlightComponent);
    };
  }, [filterProductsByKeyword]);

  const handleOnChange = (item: CategoryEntity) => {
    filterProductsByCategory(item.id, activeSeries?.id);
  };

  const handleDragStart = (e: React.DragEvent, item: CategoryEntity) => {
    e.dataTransfer.setData('category', JSON.stringify({
      id: item.id,
      name: item.name,
      type: 'category'
    }));
    e.dataTransfer.effectAllowed = 'move';
  };

  return (
    <Box
      className="__tabCateContainer"
      sx={{
        display: 'flex',
        gap: '9px',
        width: '100%',
        flexWrap: 'wrap',
      }}
    >
      {dataCategories?.filter(item => selectedCategory.includes(item.id)).map((item, index) => {
        const isHovered = hoveredItemId === item.id;
        const isActive = selectedCategory.includes(item.id);

        return (
          <Grid2
            draggable
            onDragStart={(e) => handleDragStart(e, item)}
            onClick={() => {
              handleOnChange(item);
              filterProductsByKeyword('');
            }}
            onMouseEnter={() => setHoveredItemId(item.id)}
            onMouseLeave={() => setHoveredItemId(null)}
            key={`child-${index}`}
            sx={{
              width: '100px',
              borderRadius: '4px',
              border: '1px solid rgb(193, 191, 191)',
              fontWeight: '500',
              cursor: 'pointer',
              ':hover': {
                backgroundColor: '#4A4747',
                color: 'white',
              },
              padding: '16px 0px',
              backgroundColor: categoryId === item.id ? '#6A6A6A' : 'white',
              color: categoryId === item.id ? 'white' : 'black',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              overflow: 'hidden',
              flexDirection: 'column',
              fontSize: '12px',
            }}
          >
            <img
              src={
                item.thumbnail != null
                  ? isHovered || categoryId === item.id
                    ? `/${(item.thumbnail ?? '').replace('.svg', '-white.svg')}`
                    : `/${item.thumbnail}`
                  : `/icons/category/${item.id}.svg`
              }
              alt={item.name}
              width={40}
              height={40}
            />
            <Box sx={{
              width: '90%',
              textAlign: 'center',
              minHeight: '32px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              '& span': {
                display: 'block',
                wordWrap: 'break-word',
                wordBreak: 'normal',
                whiteSpace: 'pre-wrap',
                lineHeight: '1.2',
                maxWidth: '100%'
              }
            }}>
              <span>{item.name}</span>
            </Box>
          </Grid2>
        );
      })}
    </Box>
  );
} 