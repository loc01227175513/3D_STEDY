import React from 'react';
import useDrawerTemplateOpen from '@/store/drawerTemplateOpen';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import BedroomParentIcon from '@mui/icons-material/BedroomParent';
import CarRentalIcon from '@mui/icons-material/CarRental';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CountertopsIcon from '@mui/icons-material/Countertops';
import FenceIcon from '@mui/icons-material/Fence';
import KingBedIcon from '@mui/icons-material/KingBed';
import KitchenIcon from '@mui/icons-material/Kitchen';
import LocalParkingIcon from '@mui/icons-material/LocalParking';
import SettingsPhoneIcon from '@mui/icons-material/SettingsPhone';
import SolarPowerIcon from '@mui/icons-material/SolarPower';
import SquareFootIcon from '@mui/icons-material/SquareFoot';
import WaterIcon from '@mui/icons-material/Water';
import { Box, IconButton, Paper, Stack, Typography } from '@mui/material';

import ChipTag from '@/components/chipTag';
import ReadMore from '@/components/readMore';

import { MenuButton } from './style';

const DesignModel = (): React.JSX.Element => {
  const { open, setOpen } = useDrawerTemplateOpen();

  const handleDrawerToggle = () => {
    setOpen(!open);
  };

  const content = `The Sumatra is not only contemporary and spacious but boasts a clever and practical floorplan. High
  ceilings and seamless flow set it apart as one of our most popular home designs. This stunning 2
  bedroom home with additional designated media/multipurpose room has been designed and built to the
  highest standards and would suit the most fastidious of buyers.

  Designed to Impress. This open plan home has seamless flow from the spacious living areas to an
  expansive outdoor entrance room through large stacker doors allowing dsasasasasasasasasasasasasasasasa
  sasasasasasasasasasasasasasasasasasasasasasasasasasasasasasasasasasasasasasasasasasasasasasasasasasasasa...`;

  return (
    // <AuthGuard>
    <Stack spacing={3}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <IconButton
            color="inherit"
            aria-label="toggle drawer"
            onClick={handleDrawerToggle}
            edge="start"
            sx={{
              ...MenuButton,
              position: 'fixed',
              left: open ? '400px' : '20px',
              zIndex: 1200,
              transition: 'left 0.3s ease-in-out',
              bgcolor: '#D9E6FF',
              '&:hover': {
                bgcolor: 'background.paper',
              },
            }}
          >
            <Box
              component="img"
              src="/Images/selectFloorPlan/closeDraw.svg"
              alt="external2D"
              width={10}
              sx={{
                transform: open ? 'rotate(0deg)' : 'rotate(180deg)',
                transition: 'transform 0.3s ease-in-out',
              }}
            />
          </IconButton>
          <Box>
            <Typography>Turnkey | Halcyon</Typography>
            <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold' }}>
              Site 201 | Sumatra Hip Facade
            </Typography>

            <Box sx={{ display: 'flex', gap: 4, mb: 2 }}>
              <Typography sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
                {' '}
                <KingBedIcon sx={{ fontSize: '26px' }} /> 2 Bed
              </Typography>
              <Typography sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
                {' '}
                <CountertopsIcon sx={{ fontSize: '26px' }} /> 2 Bath
              </Typography>
              <Typography sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
                {' '}
                <CarRentalIcon sx={{ fontSize: '26px' }} /> 2 Car
              </Typography>
              <Typography sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
                {' '}
                <SquareFootIcon sx={{ fontSize: '26px' }} /> 229.7 m²
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>

      <Box sx={{ display: 'flex', gap: 4 }}>
        {/* Left side - Image */}
        <Box sx={{ flex: 1 }}>
          <Box
            component="img"
            src="/Images/selectFloorPlan/PRODUCT2.jpg"
            alt="Floor Plan"
            sx={{
              width: '100%',
              height: '450px',
              borderRadius: 1,
              objectFit: 'cover',
              mb: 2,
            }}
          />
          {/* Thumbnail images */}
          <Box sx={{ display: 'flex', gap: 2, mt: 0.1 }}>
            {[
              '/Images/selectFloorPlan/PRODUCT1.jpg',
              '/Images/selectFloorPlan/PRODUCT2.jpg',
              '/Images/selectFloorPlan/PRODUCT3.jpg',
            ].map((img, index) => (
              <Box
                key={index}
                component="img"
                src={img}
                alt={`Thumbnail ${index + 1}`}
                sx={{
                  width: 'calc(33.33% - 8px)',
                  height: '140px',
                  borderRadius: 1,
                  objectFit: 'cover',
                  cursor: 'pointer',
                  '&:hover': {
                    opacity: 0.8,
                    transition: 'opacity 0.2s',
                  },
                }}
              />
            ))}
          </Box>
        </Box>

        {/* Right side - Content */}
        <Box sx={{ flex: 1 }}>
          <Paper elevation={0} sx={{ p: 2, bgcolor: 'background.default', maxWidth: '100%' }}>
            <ReadMore content={content} />
          </Paper>

          <Box sx={{ mt: 3 }}>
            <ChipTag
              features={[
                { text: 'Built-In Wardrobes', icon: <CheckCircleIcon /> },
                { text: 'Solar Panels', icon: <SolarPowerIcon /> },
                { text: 'Secure Parking', icon: <LocalParkingIcon /> },
                { text: 'Dishwasher', icon: <KitchenIcon /> },
                { text: 'Intercom', icon: <SettingsPhoneIcon /> },
                { text: 'Solar Hot Water', icon: <WaterIcon /> },
                { text: 'Fully Fenced', icon: <FenceIcon /> },
                { text: 'Bedrooms', icon: <BedroomParentIcon /> },
                { text: 'Air Conditioning', icon: <AcUnitIcon /> },
              ]}
              columns={3}
              gap={2}
              defaultIconSize={20}
              defaultIconColor="#464646"
            />
          </Box>
        </Box>
      </Box>
    </Stack>
    // </AuthGuard>
  );
};

export default DesignModel;
