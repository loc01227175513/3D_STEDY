import React from 'react';
import { Box, Typography } from '@mui/material';

import ButtonCommon from '@/components/button/ButtonCommon';

interface ExternalItem {
  name: string;
  price: number;
  image: string;
  image2?: string;
}

interface ExternalCheckOutProps {
  items: ExternalItem[];
  onDownloadQuote: () => void;
}

const ExternalCheckOut = ({ items, onDownloadQuote }: ExternalCheckOutProps): React.JSX.Element => {
  // Calculate subtotal from items
  const calculateSubtotal = (): number => {
    return items.reduce((total, item) => total + item.price, 0);
  };

  return (
    <Box>
      <Box
        sx={{
          pt: 5,
          borderBottom: '1px solid #e0e0e0',
        }}
      />
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: '1fr',
          gap: 4,
          pt: 2,
          alignItems: 'start',
        }}
      >
        {/* Title and Download Button */}
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3, gap: 10 }}>
          <Typography
            variant="h6"
            sx={{
              fontSize: '26px',
              color: '#000',
              fontWeight: 'bold',
            }}
          >
            EXTERNAL
          </Typography>
          <ButtonCommon
            onClick={onDownloadQuote}
            startIcon={<Box component="img" src="/Images/download.svg" alt="download" sx={{ width: 20 }} />}
            sx={{ bgcolor: '#0F6FFF', color: 'white', height: '37px', '&:hover': { bgcolor: '#0052CC' } }}
          >
            Download Quote Only
          </ButtonCommon>
        </Box>

        {/* Images Section */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: 2,
            mb: 4,
          }}
        >
          {/* Left side - Image */}
          {items.map((item, index) => (
            <React.Fragment key={index}>
              <Box
                sx={{
                  borderRadius: 0.1,
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Box
                  component="img"
                  src={item.image}
                  alt="House External View"
                  sx={{
                    width: '100%',
                    height: 'auto',
                    borderRadius: 0.1,
                    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
                  }}
                />
              </Box>
              {item.image2 && (
                <Box
                  sx={{
                    borderRadius: 0.1,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <Box
                    component="img"
                    src={item.image2}
                    alt="House External View 2"
                    sx={{
                      width: '100%',
                      height: 'auto',
                      borderRadius: 0.1,
                      boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
                    }}
                  />
                </Box>
              )}
            </React.Fragment>
          ))}
        </Box>

        {/* Items List */}
        <Box sx={{ mt: 3 }}>
          <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 100px ', gap: 2, mb: 2 }}>
            <Typography sx={{ fontSize: '16px', fontWeight: 'bold', color: '#6B7280' }}>YOUR ITEMS EXTERNAL</Typography>

            <Typography sx={{ fontSize: '16px', fontWeight: 'bold', color: '#6B7280', textAlign: 'right' }}>
              Price
            </Typography>
          </Box>
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: '1fr  100px',
              '& > *': {
                py: 2,
              },
            }}
          >
            {items.map((item, index) => (
              <React.Fragment key={index}>
                <Typography sx={{ color: '#4B5563', bgcolor: '#F0F0F0', px: 2, my: 0.2 }}>{item.name}</Typography>
                <Typography sx={{ textAlign: 'right', color: '#4B5563', bgcolor: '#F0F0F0', px: 2, my: 0.2 }}>
                  ${item.price.toLocaleString()}
                </Typography>
              </React.Fragment>
            ))}

            {/* Subtotal */}
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
              <Typography sx={{ fontWeight: 500, mr: 2 }}>SUB TOTAL:</Typography>
              <Typography sx={{ fontWeight: 'bold' }}>${calculateSubtotal().toLocaleString()}</Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default ExternalCheckOut;
