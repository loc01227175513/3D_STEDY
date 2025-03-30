import React from 'react';
import { Box, Skeleton, Stack } from '@mui/material';

export type SkeletonVariant = 'text' | 'rectangular' | 'circular' | 'grid' | 'table';

interface SkeletonProps {
  variant?: SkeletonVariant;
  width?: number | string;
  height?: number | string;
  count?: number;
  animation?: 'pulse' | 'wave' | false;
  spacing?: number;
  sx?: Record<string, unknown>;
  className?: string;
}

export const SkeletonLoader: React.FC<SkeletonProps> = ({
  variant = 'text',
  width = '100%',
  height = 60,
  count = 1,
  animation = 'pulse',
  spacing = 1,
  sx = {},
  className,
}) => {
  const renderSkeleton = () => {
    const skeletons = [];

    for (let i = 0; i < count; i++) {
      skeletons.push(
        <Skeleton
          key={i}
          variant={variant === 'grid' || variant === 'table' ? 'rectangular' : variant}
          width={width}
          height={height}
          animation={animation}
          sx={{ ...sx, borderRadius: variant === 'circular' ? '50%' : 1 }}
          className={className}
        />
      );
    }

    return skeletons;
  };

  const renderTableSkeleton = () => {
    return (
      <Box sx={{ width: '100%' }}>
        {/* Header */}
        <Box sx={{ display: 'flex', mb: 1 }}>
          {Array(9)
            .fill(0)
            .map((_, index) => (
              <Box key={index} sx={{ flex: index === 4 ? 1.5 : 1, px: 1 }}>
                <Skeleton variant="text" height={40} animation={animation} />
              </Box>
            ))}
        </Box>

        {/* Rows */}
        {Array(count)
          .fill(0)
          .map((_, rowIndex) => (
            <Box key={rowIndex} sx={{ display: 'flex', py: 0.5 }}>
              {Array(9)
                .fill(0)
                .map((_, colIndex) => (
                  <Box key={colIndex} sx={{ flex: colIndex === 4 ? 1.5 : 1, px: 1 }}>
                    <Skeleton variant="rectangular" height={50} animation={animation} sx={{ borderRadius: 1 }} />
                  </Box>
                ))}
            </Box>
          ))}
      </Box>
    );
  };

  const renderGridSkeleton = () => {
    return (
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
          gap: 2,
          width: '100%',
        }}
      >
        {Array(count)
          .fill(0)
          .map((_, index) => (
            <Box key={index} sx={{ width: '100%' }}>
              <Skeleton
                variant="rectangular"
                width="100%"
                height={160}
                animation={animation}
                sx={{ borderRadius: 1, mb: 1 }}
              />
              <Skeleton variant="text" width="80%" height={30} animation={animation} />
              <Skeleton variant="text" width="60%" height={20} animation={animation} />
            </Box>
          ))}
      </Box>
    );
  };

  if (variant === 'table') {
    return renderTableSkeleton();
  }

  if (variant === 'grid') {
    return renderGridSkeleton();
  }

  return (
    <Stack spacing={spacing} width={typeof width === 'number' ? `${width}px` : width}>
      {renderSkeleton()}
    </Stack>
  );
};

export default SkeletonLoader;
