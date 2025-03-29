import React from 'react';
import AddIcon from '@mui/icons-material/Add';
import { Box, Button, Stack, SxProps, Theme, Typography } from '@mui/material';

interface HeaderContentProps {
  title: string;
  showAddButton?: boolean;
  onAddClick?: () => void;
  icon?: React.ReactNode;
  sx?: SxProps<Theme>;
}

const HeaderContent: React.FC<HeaderContentProps> = ({ title, showAddButton = true, onAddClick, icon, sx }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        p: 2,
        borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
        backgroundColor: '#fff',
        ...sx,
      }}
    >
      <Stack direction="row" alignItems="center" spacing={2} sx={{ flex: 1 }}>
        {icon && (
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 32,
              height: 32,
              borderRadius: '50%',
              backgroundColor: 'rgba(41, 109, 246, 0.1)',
              color: 'black',
            }}
          >
            {icon}
          </Box>
        )}
        <Typography
          variant="h6"
          component="h1"
          sx={{
            fontWeight: 600,
            color: '#1a1a1a',
          }}
        >
          {title}
        </Typography>
        {showAddButton && (
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={onAddClick}
            sx={{
              backgroundColor: '#296df6',

              '&:hover': {
                backgroundColor: '#1565c0',
              },
            }}
          >
            Add new
          </Button>
        )}
      </Stack>
    </Box>
  );
};

export default HeaderContent;
