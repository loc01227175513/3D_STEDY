import { useMediaQuery, useTheme } from '@mui/material';
import React from 'react';

import { MainLayout } from '@/components/layout';

const HomePage: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('tablet'));

  return (
    <MainLayout>
      <div>
        <center style={{  width: '100%', paddingTop: '15%', textAlign: 'center' ,fontSize: '2.4rem' }}>
          <h3>WELCOME TO VIRTUAL ENGINEERING LANDING PAGE!</h3>
        </center>
        <center style={{ display: 'none' }}>
          <a href="/grill-king">GRILL KING</a>
        </center>
        <center style={{ display: 'none' }}>
          <a href="/stelle-kitchen">STELLE OUTDOOR KITCHEN</a>
        </center>
        <center style={{ display: 'none' }}>
          <a href="/intero">INTERO KITCHEN</a>
        </center>
        <center style={{ display: 'none' }}>
          <a href="/ve">VE KITCHEN</a>
        </center>
      </div>
    </MainLayout>
  );
};

export default HomePage;
