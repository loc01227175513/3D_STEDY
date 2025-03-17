import { Spinner } from '@/components/spinner';
import theme from '@/themes';
import { Box, Modal, useMediaQuery } from '@mui/material';
import React from 'react';

interface Prop {
  loading: boolean;
}

const LoadingModal = ({ loading }: Prop) => {
  const isMobile = useMediaQuery(theme.breakpoints.down('tablet'));

  return (
    <Modal open={loading} >
      <Spinner size="large" loading={loading}>
        <Box
          sx={{
            position: 'absolute',
            top: '0',
            bottom: '0',
            left: '0',
            right: '0',
            margin: isMobile ? 'auto' : 'auto',
            height: 'max-content',
            // maxWidth: '926px',
            width: 'max-content',
            maxHeight: isMobile ? '80vh' : '80vh',
            overflow: 'hidden',
            backgroundColor: isMobile ? 'white' : '#4A4747',
            backdropFilter: 'blur(10px)',
            borderRadius: '6px',
            ':focus': {
              border: '1px solid white',
              outline: 'none',
            },
            ':focus-visible': {
              border: '1px solid white',
              outline: 'none',
            },
            ':active': {
              border: '1px solid white',
              outline: 'none',
            },
            border: '1px solid white',
            display: 'flex',
            flexDirection: 'column',
            minHeight: '350px',
          }}
        ></Box>
      </Spinner>
    </Modal>
  );
};

export default LoadingModal;
