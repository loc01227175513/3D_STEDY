import React from 'react';
import { Box, Typography } from '@mui/material';

import ButtonCommon from '@/components/button/ButtonCommon';

interface TotalCheckoutControlProps {
  total: number;
  onEditDesign?: () => void;
  onDownloadQuote?: () => void;
}

const TotalCheckoutControl: React.FC<TotalCheckoutControlProps> = ({ total, onEditDesign, onDownloadQuote }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        pt: 2,
        mt: 4,
        pb: 2,
      }}
    >
      <Box sx={{ display: 'flex', gap: 2 }}>
        <ButtonCommon
          onClick={onEditDesign}
          sx={{
            bgcolor: '#000000',
            color: 'white',
            borderRadius: 2,
            '&:hover': {
              bgcolor: '#333333',
            },
            px: 3,
          }}
        >
          Edit Design
        </ButtonCommon>
        <ButtonCommon
          onClick={onDownloadQuote}
          sx={{
            bgcolor: '#0F6FFF',
            color: 'white',
            borderRadius: 2,
            '&:hover': {
              bgcolor: '#0052CC',
            },
            px: 3,
          }}
        >
          Download Quote
        </ButtonCommon>
      </Box>

      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Typography
          sx={{
            fontSize: '18px',
            color: '#296DF6',

            borderRadius: 2,
            fontWeight: 500,
          }}
        >
          TOTAL:
        </Typography>
        <Typography
          sx={{
            fontSize: '30px',
            color: '#0F6FFF',
            fontWeight: 'bold',
          }}
        >
          $ {total.toLocaleString()}
        </Typography>
      </Box>
    </Box>
  );
};

export default TotalCheckoutControl;
