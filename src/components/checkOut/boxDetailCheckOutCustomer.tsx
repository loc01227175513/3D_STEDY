import React from 'react';
import { Box, Typography } from '@mui/material';

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

const BoxDetailCheckOutCustomer: React.FC<BoxDetailCheckOutProps> = ({ title, images, items }) => {
  const calculateSubtotal = () => {
    return items.reduce((sum, item) => sum + item.price, 0);
  };

  return (
    <Box sx={{ mt: 4 }}>
      <Box sx={{ display: 'flex', alignItems: 'end', justifyContent: 'space-between', mb: 3, gap: 10 }}>
        <Typography variant="h6" sx={{ fontSize: '27px', fontWeight: 'bold' }}>
          {title}
        </Typography>
        {title !== '1.Kitchen ESTIMATE' && (
          <Typography variant="h6" sx={{ fontSize: '12px' }}>
            Date: 19/09/2024
          </Typography>
        )}
      </Box>

      {/* Items Table */}
      <Box sx={{ mt: 3 }}>
        <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 100px 100px', mb: 2 }}>
          <Typography sx={{ fontSize: '16px', fontWeight: 'bold', color: '#6B7280' }}>Room/Area</Typography>

          <Typography sx={{ fontSize: '16px', fontWeight: 'bold', color: '#6B7280' }}>Color</Typography>
          <Typography sx={{ fontSize: '16px', fontWeight: 'bold', color: '#6B7280', textAlign: 'right' }}>
            Subtotal
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
              <Typography
                sx={{ color: '#4B5563', bgcolor: '#F0F0F0', px: 2, my: 0.2, borderRadius: '10px 0px 0px 10px' }}
              >
                {item.name}
              </Typography>

              <Typography
                sx={{
                  color: '#4B5563',
                  bgcolor: '#F0F0F0',
                  px: 2,
                  my: 0.2,
                }}
              >
                {item.quantity}
              </Typography>

              <Typography
                sx={{
                  textAlign: 'right',
                  color: '#4B5563',
                  bgcolor: '#F0F0F0',
                  px: 2,
                  my: 0.2,
                  borderRadius: '0px 10px 10px 0px',
                }}
              >
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
              alignItems: 'center',
            }}
          >
            <Typography sx={{ fontWeight: 500, fontSize: '12px' }}>TOTAL:</Typography>
            <Typography sx={{ fontWeight: 'bold', color: '#087FFA', fontSize: '16px' }}>
              ${calculateSubtotal().toLocaleString()}
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* Images Gallery */}
      {images.length > 0 && (
        <Box sx={{ mt: 2, mb: 3, display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 2 }}>
          {images.map((image, index) => (
            <Box
              key={index}
              component="img"
              src={image}
              alt={`Project image ${index + 1}`}
              sx={{ width: '100%', aspectRatio: '1/1', objectFit: 'cover', borderRadius: '8px', height: 350 }}
            />
          ))}
        </Box>
      )}
    </Box>
  );
};

export default BoxDetailCheckOutCustomer;
