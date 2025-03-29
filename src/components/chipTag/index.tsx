import React from 'react';
import { Box, Paper, Typography } from '@mui/material';

import { FeaturePaper } from './styles';

export interface FeatureTag {
  text: string;
  icon: React.ReactNode;
  iconSize?: number;
  iconColor?: string;
}

interface ChipTagProps {
  features: FeatureTag[];
  columns?: number;
  gap?: number;
  defaultIconSize?: number;
  defaultIconColor?: string;
}

const ChipTag: React.FC<ChipTagProps> = ({
  features,
  columns = 3,
  gap = 2,
  defaultIconSize = 20,
  defaultIconColor = '#464646',
}) => {
  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: `repeat(${columns}, 1fr)`,
        gap: gap,
        width: '100%',
      }}
    >
      {features.map((feature) => (
        <Paper key={feature.text} sx={FeaturePaper}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, width: '100%' }}>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                '& svg': {
                  fontSize: `${feature.iconSize || defaultIconSize}px`,
                  color: feature.iconColor || defaultIconColor,
                },
              }}
            >
              {feature.icon}
            </Box>
            <Typography
              variant="body2"
              sx={{
                fontWeight: 'bold',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              {feature.text}
            </Typography>
          </Box>
        </Paper>
      ))}
    </Box>
  );
};

export default ChipTag;
