import React, { useState } from 'react';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { Box, Button, Typography } from '@mui/material';

interface ReadMoreProps {
  content: string;
  maxHeight?: string;
  gradientHeight?: string;
  buttonStyle?: React.CSSProperties;
  typographyStyle?: React.CSSProperties;
}

const ReadMore: React.FC<ReadMoreProps> = ({
  content,
  maxHeight = '500px',
  gradientHeight = '100px',
  buttonStyle,
  typographyStyle,
}) => {
  const [showFullContent, setShowFullContent] = useState(false);

  return (
    <Box sx={{ position: 'relative' }}>
      <Typography
        variant="body1"
        sx={{
          width: '100%',
          maxHeight: showFullContent ? 'none' : maxHeight,
          overflow: showFullContent ? 'visible' : 'hidden',
          lineHeight: 1.5,
          wordBreak: 'break-word',
          position: 'relative',
          ...typographyStyle,
          '&::after': {
            content: '""',
            position: 'absolute',
            bottom: 0,
            left: 0,
            width: '100%',
            height: showFullContent ? 0 : gradientHeight,
            background: 'linear-gradient(180deg, transparent, white)',
            transition: 'height 0.3s ease',
          },
        }}
      >
        {content}
      </Typography>
      <Box sx={{ display: 'flex', justifyContent: 'flex-start', mt: 2 }}>
        <Button
          variant="text"
          onClick={() => setShowFullContent(!showFullContent)}
          sx={{
            color: '#296df6',
            border: '1px solid #296df6',
            fontWeight: 'bold',
            textTransform: 'none',
            fontSize: '14px',
            padding: '4px',
            '&:hover': {
              backgroundColor: 'transparent',
              textDecoration: 'underline',
            },
            ...buttonStyle,
          }}
        >
          {showFullContent ? 'Show less' : 'Read more'}
          <KeyboardArrowDownIcon
            sx={{
              fontSize: '14px',
              transform: showFullContent ? 'rotate(180deg)' : 'none',
              transition: 'transform 0.3s ease',
            }}
          />
        </Button>
      </Box>
    </Box>
  );
};

export default ReadMore;
