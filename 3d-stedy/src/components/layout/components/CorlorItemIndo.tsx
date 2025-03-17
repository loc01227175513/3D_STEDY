import { drawerStore, productStore } from '@/store';
import {
  Box,
  CircularProgress,
  Typography,
  useMediaQuery,
} from '@mui/material';
import { emitter, THREE_EVENTS } from '@/utils/events';
import * as React from 'react';
import { useEffect } from 'react';
import theme from '@/themes';
import { Bounce, toast } from 'react-toastify';
import { StyleEntity } from '@/types/model';

interface ColorItemProps {
  item: StyleEntity;
  onCloseDrawer: () => void;
  islandType?: 'island' | 'kitchen' | 'backwall2' | 'floor';
}
export default function ColorItem({
  item,
  onCloseDrawer,
  islandType = 'island',
}: ColorItemProps): React.ReactElement {
  const { activeTypeStyle } = drawerStore();
  const {
    listCart,
    isLoading,
    cabinetColor,
    benchtopColor,
    setLoading,
    setCabinetColor,
    setBenchtopColor,
    setCabinetColorKitchen,
    setBenchtopColorKitchen,
    setCabinetColorIsland,
    setBenchtopColorIsland,
    setIslandType,
    setMaterialChangeEvent,
  } = productStore();
  const isMobile = useMediaQuery(theme.breakpoints.down('tablet'));

  useEffect(() => {
    setIslandType(islandType);
  }, [islandType]);

  function setStyle() {
    setLoading(true);

    // Xử lý đặc biệt cho backwall2
    if (islandType === 'backwall2') {
      setCabinetColor(item);
      const backwallNames = [
        'Back_Wall_Left',
        'Back_Wall',
        'Back_Wall001',
        'Back_Wall002',
        'Back_Wall_Right'
      ];

      backwallNames.forEach(name => {
        setMaterialChangeEvent(
          name,
          'backwall',
          `${import.meta.env.VITE_S3_URL}/${item.path}`
        );
      });
      onCloseDrawer();
      return;
    }

    // Xử lý đặc biệt cho floor tiles
    if (islandType === 'floor') {
      setCabinetColor(item);
      setMaterialChangeEvent(
        'floor',
        'floor_tiles',
        `${import.meta.env.VITE_S3_URL}/${item.path}`
      );
      onCloseDrawer();
      return;
    }

    // Xử lý cho kitchen và island
    if (item?.type === 'CABINET') {
      if (islandType === 'kitchen') {
        setCabinetColorKitchen(item);
      } else if (islandType === 'island') {
        setCabinetColorIsland(item);
      }
      setCabinetColor(item);
    } else {
      if (islandType === 'kitchen') {
        setBenchtopColorKitchen(item);
      } else if (islandType === 'island') {
        setBenchtopColorIsland(item);
      }
      setBenchtopColor(item);
    }

    // Emit sự kiện thay đổi vật liệu với prefix tương ứng
    const prefix = islandType === 'kitchen' ? 'kitchen' : 'island';
    setMaterialChangeEvent(
      `${prefix}_${item?.type?.toLowerCase()}`,
      item?.type?.toLowerCase() || '',
      `${import.meta.env.VITE_S3_URL}/${item.path}`
    );
    onCloseDrawer();
  }

  const selectedStyle =
    islandType === 'backwall2' ? cabinetColor :
    islandType === 'floor' ? cabinetColor :  // Thêm điều kiện cho floor tiles
    activeTypeStyle === 'CABINET' ? cabinetColor : benchtopColor;

  return (
    <Box
      sx={{
        cursor: 'pointer',
        display: 'flex',
        gap: '8px',
        justifyContent: 'start',
        alignItems: 'center',
        flexDirection: 'column',
        borderRadius: '10px',
        height: 'max-content',
        ':focus': {
          border: 'none',
          outline: 'none',
          background: 'transparent !important',
          boxShadow: 'none !important',
        },
        ':focus-visible': {
          border: 'none',
          outline: 'none',
          background: 'transparent !important',
          boxShadow: 'none !important',
        },
      }}
      onClick={() => {
        setStyle();
      }}
    >
      <Box
        sx={{
          height: isMobile ? 'auto' : '110px',
          display: 'flex',
          width: isMobile ? '100%' : '110px',
          boxSizing: 'border-box',
          border: selectedStyle == item ? '1px solid black' : '1px solid white',
        }}
      >
       <Box
          sx={{
            width: isMobile ? '100%' : '105px',
            height: '105px',
            background: `url(${import.meta.env.VITE_S3_URL}/${item.path})`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            backgroundPosition: 'center center',
          }}
        />
      </Box>
      <Typography
        sx={{
          width: '105px',
          textWrap: 'wrap',
          fontSize: '14px',
          fontWeight: '500',
          display: '-webkit-box',
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          WebkitLineClamp: 2,
          lineClamp: 2,
        }}
      >
        {item.name}
      </Typography>
      {selectedStyle == item && isLoading && (
        <Box
          sx={{
            position: 'absolute',
            marginTop: '45px',
          }}
        >
          <CircularProgress size={20} sx={{ color: '#EBB91A' }} />
        </Box>
      )}
    </Box>
  );
}
