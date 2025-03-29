import React from 'react';
import { Box, Typography } from '@mui/material';

interface BoxImageProps {
  name?: string;
  image: string;
  width?: string | number;
  height?: string | number;
  alt?: string;
  showTitle?: boolean;
  overlayText?: string;
}

const BoxImage: React.FC<BoxImageProps> = ({ name, image, width, height, alt, showTitle = true, overlayText }) => {
  return (
    <Box
      sx={{
        margin: '10px 0px 10px 10px',
        display: 'flex',
        alignItems: 'flex-start',
        width: '100%',
        maxWidth: width,
        position: 'relative',
      }}
    >
      <Box
        component="img"
        src={image}
        alt={alt || name}
        sx={{
          width: showTitle ? '50%' : '100%',
          height: height,
          objectFit: 'cover',
          borderRadius: '10px',
        }}
      />
      {overlayText && (
        <Typography
          sx={{
            position: 'absolute',
            bottom: '20px',
            left: '20px',
            color: 'white',
            fontWeight: 'bold',
            fontSize: '24px',
            textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
          }}
        >
          {overlayText}
        </Typography>
      )}
      {showTitle && name && (
        <Box sx={{ pl: 3, width: '50%', display: 'flex', alignItems: 'flex-start' }}>
          <Typography sx={{ fontWeight: 'bold' }}>{name}</Typography>
        </Box>
      )}
    </Box>
  );
};

export default BoxImage;
