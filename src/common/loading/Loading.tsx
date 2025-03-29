import React from 'react';
import { alpha, Box, keyframes, Typography, useTheme } from '@mui/material';

export interface LoadingProps {
  message?: string;
  fullScreen?: boolean;
  fontSize?: 'regular' | 'large' | 'extra-large';
  contrast?: 'standard' | 'high';
  showBlur?: boolean;
}

// Advanced orbital animation
const orbitRotateKeyframes = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

// Particle rotation animation
const particleRotateKeyframes = keyframes`
  0% {
    transform: rotate(0deg) translateX(0) scale(1);
  }
  30% {
    transform: rotate(120deg) translateX(0) scale(1.2);
  }
  70% {
    transform: rotate(240deg) translateX(0) scale(1);
  }
  100% {
    transform: rotate(360deg) translateX(0) scale(1);
  }
`;

// Shimmer effect animation
const shimmerKeyframes = keyframes`
  0% {
    background-position: -200% 0;
    opacity: 0.5;
  }
  100% {
    background-position: 200% 0;
    opacity: 1;
  }
`;

// Pulse glow animation
const pulseGlowKeyframes = keyframes`
  0% {
    box-shadow: 0 0 0 0 rgba(66, 133, 244, 0.6);
    opacity: 1;
  }
  70% {
    box-shadow: 0 0 0 15px rgba(66, 133, 244, 0);
    opacity: 0.8;
  }
  100% {
    box-shadow: 0 0 0 0 rgba(66, 133, 244, 0);
    opacity: 1;
  }
`;

// Fade in animation
const fadeInKeyframes = keyframes`
  0% {
    opacity: 0;
    transform: translateY(10px) scale(0.98);
  }
  100% {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
`;

export const Loading: React.FC<LoadingProps> = ({
  message = 'Đang tải...',
  fullScreen = false,
  fontSize = 'regular',
  contrast = 'standard',
  showBlur = false,
}) => {
  const theme = useTheme();

  // Get font size based on preference (accessible for elderly)
  const getFontSize = () => {
    switch (fontSize) {
      case 'large':
        return '1.8rem';
      case 'extra-large':
        return '2.2rem';
      default:
        return '1.6rem';
    }
  };

  // Text color based on contrast setting
  const getTextColor = () => {
    return contrast === 'high' ? '#000000' : '#333344';
  };

  const containerStyle = {
    ...(fullScreen
      ? {
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          ...(showBlur ? { backdropFilter: 'blur(8px)' } : {}),
          zIndex: 9999,
        }
      : {}),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '2rem',
    width: fullScreen ? '100%' : 'auto',
    height: fullScreen ? '100%' : 'auto',
  } as const;

  const contentBoxStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '3rem',
    animation: `${fadeInKeyframes} 0.5s ease-out forwards`,
    position: 'relative',
  } as const;

  // Size calculation based on font size
  const spinnerSize = fontSize === 'extra-large' ? 120 : fontSize === 'large' ? 100 : 80;
  const orbitSize = spinnerSize * 0.8;
  const particleSize = orbitSize * 0.18;

  // Primary color with fallback
  const primaryColor = theme.palette.primary.main || '#4285F4';
  const secondaryColor = theme.palette.secondary.main || '#EA4335';
  const accentColor1 = theme.palette.success?.main || '#34A853';
  const accentColor2 = theme.palette.warning?.main || '#FBBC05';

  return (
    <Box role="status" aria-label="Đang tải nội dung" sx={containerStyle}>
      <Box sx={contentBoxStyle}>
        {/* Advanced orbital loading spinner */}
        <Box
          sx={{
            position: 'relative',
            width: spinnerSize,
            height: spinnerSize,
            marginBottom: '2rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {/* Center pulsing circle */}
          <Box
            sx={{
              width: spinnerSize * 0.25,
              height: spinnerSize * 0.25,
              borderRadius: '50%',
              backgroundColor: primaryColor,
              animation: `${pulseGlowKeyframes} 2s infinite cubic-bezier(0.4, 0, 0.6, 1)`,
              zIndex: 3,
            }}
          />

          {/* Orbit 1 */}
          <Box
            sx={{
              position: 'absolute',
              top: (spinnerSize - orbitSize) / 2,
              left: (spinnerSize - orbitSize) / 2,
              width: orbitSize,
              height: orbitSize,
              borderRadius: '50%',
              border: `1px solid ${alpha(primaryColor, 0.2)}`,
              animation: `${orbitRotateKeyframes} 4s linear infinite`,
            }}
          >
            {/* Particle 1 */}
            <Box
              sx={{
                position: 'absolute',
                top: -particleSize / 2,
                left: orbitSize / 2 - particleSize / 2,
                width: particleSize,
                height: particleSize,
                borderRadius: '50%',
                backgroundColor: primaryColor,
                boxShadow: `0 0 10px ${alpha(primaryColor, 0.6)}`,
              }}
            />
          </Box>

          {/* Orbit 2 */}
          <Box
            sx={{
              position: 'absolute',
              top: (spinnerSize - orbitSize * 1.3) / 2,
              left: (spinnerSize - orbitSize * 1.3) / 2,
              width: orbitSize * 1.3,
              height: orbitSize * 1.3,
              borderRadius: '50%',
              border: `1px solid ${alpha(secondaryColor, 0.2)}`,
              animation: `${orbitRotateKeyframes} 6s linear infinite reverse`,
            }}
          >
            {/* Particle 2 */}
            <Box
              sx={{
                position: 'absolute',
                top: -particleSize / 2,
                left: (orbitSize * 1.3) / 2 - particleSize / 2,
                width: particleSize,
                height: particleSize,
                borderRadius: '50%',
                backgroundColor: secondaryColor,
                boxShadow: `0 0 10px ${alpha(secondaryColor, 0.6)}`,
              }}
            />
          </Box>

          {/* Orbit 3 */}
          <Box
            sx={{
              position: 'absolute',
              top: (spinnerSize - orbitSize * 0.7) / 2,
              left: (spinnerSize - orbitSize * 0.7) / 2,
              width: orbitSize * 0.7,
              height: orbitSize * 0.7,
              borderRadius: '50%',
              border: `1px solid ${alpha(accentColor1, 0.2)}`,
              animation: `${orbitRotateKeyframes} 3s linear infinite`,
            }}
          >
            {/* Particle 3 */}
            <Box
              sx={{
                position: 'absolute',
                top: -particleSize / 2,
                left: (orbitSize * 0.7) / 2 - particleSize / 2,
                width: particleSize,
                height: particleSize,
                borderRadius: '50%',
                backgroundColor: accentColor1,
                boxShadow: `0 0 10px ${alpha(accentColor1, 0.6)}`,
              }}
            />
          </Box>

          {/* Orbit 4 (diagonal) */}
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: spinnerSize,
              height: spinnerSize,
              animation: `${particleRotateKeyframes} 8s ease-in-out infinite`,
            }}
          >
            <Box
              sx={{
                position: 'absolute',
                top: spinnerSize / 2,
                left: spinnerSize / 2,
                width: particleSize,
                height: particleSize,
                borderRadius: '50%',
                backgroundColor: accentColor2,
                boxShadow: `0 0 10px ${alpha(accentColor2, 0.6)}`,
                transform: `translateX(${orbitSize / 2 - particleSize / 2}px)`,
              }}
            />
          </Box>

          {/* Shimmer effect overlay */}
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              borderRadius: '50%',
              background: `linear-gradient(90deg, transparent, ${alpha(primaryColor, 0.1)}, transparent)`,
              backgroundSize: '200% 100%',
              animation: `${shimmerKeyframes} 2s infinite linear`,
              zIndex: 2,
            }}
          />
        </Box>

        {message && (
          <Typography
            variant="h5"
            component="p"
            sx={{
              color: getTextColor(),
              fontSize: getFontSize(),
              fontWeight: contrast === 'high' ? 700 : 500,
              textAlign: 'center',
              maxWidth: '100%',
              lineHeight: 1.5,
              letterSpacing: '0.02em',
              textShadow: '0 1px 2px rgba(0, 0, 0, 0.05)',
            }}
          >
            {message}
          </Typography>
        )}
      </Box>
    </Box>
  );
};
