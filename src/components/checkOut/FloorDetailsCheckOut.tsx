import React from 'react';
import { Box, Typography } from '@mui/material';

interface FloorFeature {
  label: string;
  value: number;
}

interface FloorDetailsCheckOutProps {
  floorName: string;
  features: FloorFeature[];
  price: number;
}

const FloorDetailsCheckOut: React.FC<FloorDetailsCheckOutProps> = ({ floorName, features, price }) => {
  return (
    <Box sx={{ pl: 3 }}>
      <Typography
        variant="h6"
        sx={{
          mb: 2,

          fontSize: '22px',
          fontWeight: 'bold',
        }}
      >
        Floor Details
      </Typography>
      <Box>
        <Typography
          variant="subtitle1"
          sx={{
            fontSize: '18px',
            fontWeight: 'bold',
            bgcolor: '#F0F0F0',
            color: 'black',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'start',
            borderRadius: 1,
            height: '42px',
            px: 2,
            py: 1,
            width: '100%',
          }}
        >
          {floorName}
        </Typography>

        <Box>
          {features.map((feature, index) => (
            <Typography
              key={index}
              sx={{
                my: 0.2,
                fontSize: '18px',
                fontWeight: 200,
                bgcolor: '#F0F0F0',
                color: 'rgb(44, 44, 44)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'start',
                borderRadius: 1,
                height: '42px',
                px: 2,

                width: '100%',
              }}
            >
              □ {feature.value} {feature.label}
            </Typography>
          ))}
        </Box>

        <Box
          sx={{
            fontSize: '18px',
            fontWeight: 200,
            bgcolor: '#F0F0F0',
            color: 'black',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'start',
            borderRadius: 1,
            height: '42px',
            px: 2,
            py: 1,
            gap: 20,
            width: '100%',
          }}
        >
          <Typography sx={{ color: 'black', fontWeight: 500 }}>Pricing</Typography>
          <Typography
            sx={{
              color: 'black',
              fontWeight: 500,
            }}
          >
            $ {price.toLocaleString()}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default FloorDetailsCheckOut;
