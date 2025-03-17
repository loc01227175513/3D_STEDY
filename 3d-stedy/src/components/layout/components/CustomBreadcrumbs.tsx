import { useBrandStore } from '@/store';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import { Box, Breadcrumbs, Link } from '@mui/material';
import { useState } from 'react';
import ShowModalBackTemplate from './ShowModalBackTemplate';

const CustomBreadcrumbs = () => {
  const { activeTemplate } = useBrandStore();
  const [open, setOpen] = useState(false);

  return (
    <Breadcrumbs
      sx={{ padding: '0px 16px' }}
      separator={'|'}
      aria-label="breadcrumb"
    >
      <Link
        key="1"
        onClick={() => {
          setOpen(true);
        }}
        color="inherit"
        sx={{
          color: 'black',
          textDecoration: 'none',
          ':hover': { color: 'black' },
          cursor: 'pointer',
          fontWeight: '600',
          fontSize: '16px',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
        }}
      >
        <div
          style={{
            background: 'black',
            display: 'flex',
            borderRadius: '50px',
            alignItems: 'center',
            justifyContent: 'center',
            width: '35px',
            height: '35px',
            cursor: 'pointer',
          }}
        >
          <ArrowBackRoundedIcon sx={{ color: 'white' }} />
        </div>
        Back
      </Link>
      <Box
        key="2"
        sx={{
          color: 'black',
          textDecoration: 'none',
          ':hover': { color: 'black' },
          fontWeight: '600',
          fontSize: '16px',
          borderRadius: '10px',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
        }}
      >
        {activeTemplate?.name}
      </Box>

      <ShowModalBackTemplate open={open} setOpen={setOpen} />

    </Breadcrumbs>
  );
};

export default CustomBreadcrumbs;