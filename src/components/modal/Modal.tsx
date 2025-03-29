import React from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Typography } from '@mui/material';

import ButtonModal from '@/components/button/buttonModal';

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  children?: React.ReactNode;
  onSave?: () => void;
  onContinue?: () => void;
  onDiscard?: () => void;
  showActions?: boolean;
  maxWidth?: 'mobile' | 'tablet' | 'desktop';
  fullWidth?: boolean;
}

const Modal: React.FC<ModalProps> = ({
  open,
  onClose,
  title,
  children,
  onSave,
  onContinue,
  onDiscard,
  showActions = true,
  maxWidth = 'tablet',
  fullWidth = true,
}) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth={maxWidth}
      fullWidth={fullWidth}
      PaperProps={{
        sx: {
          borderRadius: '12px',
          padding: '60px',
        },
      }}
    >
      {title && (
        <DialogTitle
          sx={{
            p: 0,
            mb: 2,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Typography variant="h6" component="div" sx={{ margin: '0 auto' }}>
            {title}
          </Typography>
          <IconButton
            aria-label="close"
            onClick={onClose}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
      )}

      <DialogContent sx={{ p: 0, mb: showActions ? 5 : 0 }}>{children}</DialogContent>

      {showActions && (
        <DialogActions sx={{ p: 0, display: 'flex', gap: 1 }}>
          <ButtonModal title="Save Design" onClick={onSave} bgcolor="#296df6" />
          <ButtonModal title="Continue Design" onClick={onContinue} bgcolor="#296df6" />
          <ButtonModal variant="text" title="Discard Design" onClick={onDiscard} color="red" bgcolor="#F5F5F5" />
        </DialogActions>
      )}
    </Dialog>
  );
};

export default Modal;
