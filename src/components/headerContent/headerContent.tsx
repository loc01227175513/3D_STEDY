import React from 'react';
import useDrawerTemplateOpen from '@/store/drawerTemplateOpen';
import AddIcon from '@mui/icons-material/Add';
import { Box, Stack, SxProps, Theme, Typography } from '@mui/material';

import ButtonCommon from '../button/ButtonCommon';

interface HeaderContentProps {
  title: string;
  showAddButton?: boolean;
  onAddClick?: () => void;
  icon?: React.ReactNode;
  buttonText?: string;
  buttonIcon?: React.ReactNode;
  sx?: SxProps<Theme>;
}

const HeaderContent: React.FC<HeaderContentProps> = ({
  title,
  showAddButton = true,
  onAddClick,
  icon,
  buttonText = 'Add new',
  buttonIcon = <AddIcon />,
  sx,
}) => {
  const { openDashboard, setOpenDashboard } = useDrawerTemplateOpen();
  const handleDrawerToggle = () => {
    setOpenDashboard(!openDashboard);
  };
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
            onClick={handleDrawerToggle}
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 32,
              height: 32,
              borderRadius: '50%',
              backgroundColor: 'rgba(41, 109, 246, 0.1)',
              color: 'black',
              cursor: 'pointer',
              transition: 'transform 0.3s ease',
              transform: openDashboard ? 'rotate(0deg)' : 'rotate(180deg)',
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
          <ButtonCommon startIcon={buttonIcon} onClick={onAddClick}>
            {buttonText}
          </ButtonCommon>
        )}
      </Stack>
    </Box>
  );
};

export default HeaderContent;
