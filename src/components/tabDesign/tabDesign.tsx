import React from 'react';
import { Box, Button, Typography } from '@mui/material';

export const DimensionContent = (): React.JSX.Element => (
  <Box>
    <Typography variant="h6">Dimension Settings</Typography>
    {/* Add dimension specific content */}
  </Box>
);

export const ColourContent = (): React.JSX.Element => (
  <Box>
    <Typography variant="h6">Colour Settings</Typography>
    <Box sx={{ mt: 3 }}>
      <Box
        sx={{
          display: 'flex',
          borderBottom: '1px solid #e0e0e0',
          mb: 3,
        }}
      >
        <Button
          sx={{
            color: '#000',
            textTransform: 'none',
            minWidth: 'auto',
            px: 2,
            py: 1,
            '&:hover': {
              backgroundColor: 'transparent',
              color: '#1976d2',
            },
          }}
        >
          Kitchen Island
        </Button>
        <Button
          sx={{
            color: '#1976d2',
            textTransform: 'none',
            minWidth: 'auto',
            px: 2,
            py: 1,
            borderBottom: '2px solid #1976d2',
            '&:hover': {
              backgroundColor: 'transparent',
              color: '#1976d2',
            },
          }}
        >
          Kitchen Cabinet
        </Button>
        <Button
          sx={{
            color: '#000',
            textTransform: 'none',
            minWidth: 'auto',
            px: 2,
            py: 1,
            '&:hover': {
              backgroundColor: 'transparent',
              color: '#1976d2',
            },
          }}
        >
          Backwall
        </Button>
      </Box>

      <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <input type="checkbox" checked />
          <Typography>Cabinet & Cupboard</Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <input type="checkbox" />
          <Typography>Benchtop</Typography>
        </Box>
      </Box>
      <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <input type="checkbox" />
          <Typography>Backsplash</Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <input type="checkbox" />
          <Typography>Kicker</Typography>
        </Box>
      </Box>

      <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 2, mt: 3 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 }}>
          <Box
            sx={{
              width: '100%',
              height: 80,
              bgcolor: '#000000',
              borderRadius: 1,
              cursor: 'pointer',
            }}
          />
          <Typography variant="caption">Black Natural</Typography>
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 }}>
          <Box
            sx={{
              width: '100%',
              height: 80,
              bgcolor: '#2C2C2C',
              borderRadius: 1,
              cursor: 'pointer',
            }}
          />
          <Typography variant="caption">Blackened Legno Natural</Typography>
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 }}>
          <Box
            sx={{
              width: '100%',
              height: 80,
              bgcolor: '#D3D3D3',
              borderRadius: 1,
              cursor: 'pointer',
            }}
          />
          <Typography variant="caption">Oyster Grey</Typography>
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 }}>
          <Box
            sx={{
              width: '100%',
              height: 80,
              bgcolor: '#8B4513',
              borderRadius: 1,
              cursor: 'pointer',
            }}
          />
          <Typography variant="caption">Planked Urban</Typography>
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 }}>
          <Box
            sx={{
              width: '100%',
              height: 80,
              bgcolor: '#FFFFFF',
              border: '1px solid #E0E0E0',
              borderRadius: 1,
              cursor: 'pointer',
            }}
          />
          <Typography variant="caption">Polar White Natural</Typography>
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 }}>
          <Box
            sx={{
              width: '100%',
              height: 80,
              bgcolor: '#808080',
              borderRadius: 1,
              cursor: 'pointer',
            }}
          />
          <Typography variant="caption">Possum</Typography>
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 }}>
          <Box
            sx={{
              width: '100%',
              height: 80,
              bgcolor: '#DEB887',
              borderRadius: 1,
              cursor: 'pointer',
            }}
          />
          <Typography variant="caption">Seasoned Oak Natural</Typography>
        </Box>
      </Box>
    </Box>
  </Box>
);

export const OptionsContent = () => (
  <Box>
    <Typography variant="h6">Options Settings</Typography>
    {/* Add options specific content */}
  </Box>
);
