import React from 'react';
import { Box, Typography } from '@mui/material';

interface CustomerInfo {
  customer: string;
  consultant: string;
  mobile: string;
  date: string;
  email: string;
  address: string;
}

interface CustomerInfoCheckOutProps {
  customerInfo: CustomerInfo;
  errors?: Partial<Record<keyof CustomerInfo, string>>;
}

const CustomerInfoCheckOut: React.FC<CustomerInfoCheckOutProps> = ({ customerInfo, errors = {} }) => {
  const infoFields = [
    { label: 'Customer', value: customerInfo.customer },
    { label: 'Consultant', value: customerInfo.consultant },
    { label: 'Mobile', value: customerInfo.mobile },
    { label: 'Date', value: customerInfo.date },
    { label: 'Email', value: customerInfo.email },
    { label: 'Address', value: customerInfo.address },
  ];

  return (
    <Box sx={{ pr: 3, height: '42px' }}>
      <Typography
        variant="h6"
        sx={{
          mb: 1,
          pb: 1,
          fontSize: '22px',
          fontWeight: 'bold',
        }}
      >
        Customer Information
      </Typography>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: 'auto 1fr',
          gap: 0,
          height: '42px',
        }}
      >
        {infoFields.map((field, index) => (
          <React.Fragment key={index}>
            <Typography
              sx={{
                bgcolor: '#F0F0F0',
                p: 1,
                mb: 0.2,
                borderRadius: '4px 0px 0px 4px',
                height: '42px',
                color: 'black',
                fontWeight: 'bold',
              }}
            >
              {field.label}
            </Typography>
            <Box
              sx={{
                bgcolor: '#F0F0F0',
                p: 1,
                mb: 0.2,
                borderRadius: '0 4px 4px 0px',
                height: '42px',
              }}
            >
              <Typography>{field.value}</Typography>
              {errors[field.label.toLowerCase() as keyof CustomerInfo] && (
                <Typography
                  sx={{
                    color: 'error.main',
                    fontSize: '0.75rem',
                    mt: 0.5,
                  }}
                >
                  {errors[field.label.toLowerCase() as keyof CustomerInfo]}
                </Typography>
              )}
            </Box>
          </React.Fragment>
        ))}
      </Box>
    </Box>
  );
};

export default CustomerInfoCheckOut;
