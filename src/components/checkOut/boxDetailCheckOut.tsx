import React from 'react';
import { Box, Typography } from '@mui/material';

import ButtonCommon from '@/components/button/ButtonCommon';

interface Item {
  name: string;
  quantity: string;
  price: number;
}

interface BoxDetailCheckOutProps {
  title: string;
  images: string[];
  items: Item[];
  onDownloadQuote?: () => void;
}

const BoxDetailCheckOut: React.FC<BoxDetailCheckOutProps> = ({ title, images, items, onDownloadQuote }) => {
  const calculateSubtotal = () => {
    return items.reduce((sum, item) => sum + item.price, 0);
  };

  return (
    <Box sx={{ mt: 4 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3, gap: 10 }}>
        <Typography variant="h6" sx={{ fontSize: '24px', fontWeight: 'bold' }}>
          {title}
        </Typography>
        <ButtonCommon
          onClick={onDownloadQuote}
          startIcon={<Box component="img" src="/Images/download.svg" alt="download" sx={{ width: 20 }} />}
          sx={{ bgcolor: '#0F6FFF', color: 'white', height: '37px', '&:hover': { bgcolor: '#0052CC' } }}
        >
          Download Quote Only
        </ButtonCommon>
      </Box>

      {/* Images Grid */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 2,
          mb: 4,
        }}
      >
        {images.map((image, index) => (
          <Box
            key={index}
            component="img"
            src={image}
            alt={`${title} View ${index + 1}`}
            sx={{ width: '100%', borderRadius: 1 }}
          />
        ))}
      </Box>

      {/* Items Table */}
      <Box sx={{ mt: 3 }}>
        <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 100px 100px', gap: 2, mb: 2 }}>
          <Typography sx={{ fontSize: '16px', fontWeight: 'bold', color: '#6B7280' }}>
            YOUR ITEMS {title.toUpperCase()}
          </Typography>
          <Typography sx={{ fontSize: '16px', fontWeight: 'bold', color: '#6B7280' }}>Color</Typography>
          <Typography sx={{ fontSize: '16px', fontWeight: 'bold', color: '#6B7280', textAlign: 'right' }}>
            Price
          </Typography>
        </Box>

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: '1fr 100px 100px',

            '& > *': {
              py: 2,
            },
          }}
        >
          {items.map((item, index) => (
            <React.Fragment key={index}>
              <Typography sx={{ color: '#4B5563', bgcolor: '#F0F0F0', px: 2, my: 0.2 }}>{item.name}</Typography>
              <Typography sx={{ color: '#4B5563', bgcolor: '#F0F0F0', px: 2, my: 0.2 }}>-</Typography>
              <Typography sx={{ textAlign: 'right', color: '#4B5563', bgcolor: '#F0F0F0', px: 2, my: 0.2 }}>
                ${item.price.toLocaleString()}
              </Typography>
            </React.Fragment>
          ))}

          <Box
            sx={{
              gridColumn: '1 / -1',
              mt: 2,
              pt: 2,
              display: 'flex',
              justifyContent: 'flex-end',
              borderBottom: '1px solid #e0e0e0',
            }}
          >
            <Typography sx={{ fontWeight: 500 }}>SUB TOTAL:</Typography>
            <Typography sx={{ fontWeight: 'bold' }}>${calculateSubtotal().toLocaleString()}</Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default BoxDetailCheckOut;
