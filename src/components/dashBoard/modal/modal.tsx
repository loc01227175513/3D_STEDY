import React from 'react';
import { Box, ClickAwayListener, Paper, Popper, Typography } from '@mui/material';

interface ActionModalProps {
  open: boolean;
  onClose: () => void;
  onStartDesign: () => void;
  onArchive: () => void;
  anchorEl: HTMLElement | null;
}

const actionItemStyle = {
  py: 1.5,
  px: 2,
  cursor: 'pointer',
  '&:hover': {
    backgroundColor: '#f5f5f5',
  },
  display: 'flex',
  alignItems: 'center',
  gap: 1,
};

const headerStyle = {
  py: 1.5,
  px: 2,
  borderBottom: '1px solid #E0E0E0',
};

export const ActionModal: React.FC<ActionModalProps> = ({ open, onClose, onStartDesign, onArchive, anchorEl }) => {
  return (
    <Popper open={open} anchorEl={anchorEl} placement="bottom-end" style={{ zIndex: 1300 }}>
      <ClickAwayListener onClickAway={onClose}>
        <Paper
          elevation={3}
          sx={{
            width: 200,
            bgcolor: 'background.paper',
            borderRadius: '8px',
            mt: 0.5,
            overflow: 'hidden',
          }}
        >
          <Box sx={headerStyle}>
            <Typography sx={{ color: '#6E6E6E', fontWeight: 500 }}>Action</Typography>
          </Box>
          <Box sx={actionItemStyle} onClick={onStartDesign}>
            <Typography sx={{ color: '#0066FF' }}>Start design</Typography>
          </Box>
          <Box sx={{ ...actionItemStyle, borderTop: '1px solid #E0E0E0' }} onClick={onArchive}>
            <Typography sx={{ color: '#FF0000' }}>Archive floorplan</Typography>
          </Box>
        </Paper>
      </ClickAwayListener>
    </Popper>
  );
};

export default ActionModal;
