import React from 'react';
import { Box, Chip, ChipProps } from '@mui/material';

// Status Chip Types and Colors
export type StatusType =
  | 'New'
  | 'Contacted'
  | 'Informed'
  | 'Follow-up'
  | 'Qualified'
  | 'Proposal Sent'
  | 'Negotiation'
  | 'Contracted'
  | 'Lost'
  | 'Active'
  | 'Deactive'
  | 'Draft'
  | 'Building'
  | 'Paid'
  | 'Cancel'
  | 'Absent';

export const STATUS_COLORS: Record<StatusType, ChipProps['color']> = {
  New: 'info',
  Contacted: 'success',
  Informed: 'warning',
  'Follow-up': 'warning',
  Qualified: 'success',
  'Proposal Sent': 'info',
  Negotiation: 'secondary',
  Contracted: 'success',
  Lost: 'error',
  Active: 'success',
  Deactive: 'default',
  Draft: 'warning',
  Building: 'warning',
  Paid: 'success',
  Cancel: 'default',
  Absent: 'default',
};

interface StatusChipProps {
  status: StatusType;
  icon?: React.ReactNode;
}

export const StatusChip: React.FC<StatusChipProps> = ({ status, icon }) => {
  const chipColor = STATUS_COLORS[status] || 'default';

  // Map of MUI color names to their background and text colors
  const colorMap = {
    primary: { bg: '#e3f2fd', text: '#1976d2' },
    warning: { bg: '#fff3e0', text: '#e65100' },
    success: { bg: '#e8f5e9', text: '#2e7d32' },
    info: { bg: '#e3f2fd', text: '#0d47a1' },
    error: { bg: '#ffebee', text: '#c62828' },
    secondary: { bg: '#f3e5f5', text: '#7b1fa2' },
    default: { bg: '#f5f5f5', text: '#424242' },
  };

  const colors = colorMap[chipColor as keyof typeof colorMap] || colorMap.default;

  return (
    <Chip
      label={
        icon ? (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            {icon}
            {status}
          </Box>
        ) : (
          status
        )
      }
      size="small"
      sx={{
        borderRadius: '4px',
        fontWeight: 'medium',
        opacity: 0.9,
        bgcolor: colors.bg,
        color: colors.text,
      }}
    />
  );
};

// Source Chip Types and Colors
export type SourceType = 'Website' | 'Referral' | 'Sale';

export const SOURCE_STYLES: Record<SourceType, { bgcolor: string; color: string }> = {
  Website: { bgcolor: '#e3f2fd', color: '#1565c0' },
  Referral: { bgcolor: '#fff8e1', color: '#ff8f00' },
  Sale: { bgcolor: '#e8f5e9', color: '#2e7d32' },
};

interface SourceChipProps {
  source: SourceType;
}

export const SourceChip: React.FC<SourceChipProps> = ({ source }) => {
  const style = SOURCE_STYLES[source] || { bgcolor: '#f0f0f0', color: '#000' };

  return (
    <Chip
      label={source}
      size="small"
      sx={{
        border: `2px solid ${style.color}`,
        fontWeight: 'bold',
        color: style.color,
        borderRadius: '4px',
        bgcolor: '#fff',
        opacity: 0.9,
      }}
    />
  );
};
