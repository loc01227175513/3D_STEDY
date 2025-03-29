import React from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { Box, Button, Dialog, IconButton, MenuItem, Select, Stack, TextField, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

interface ModalSaveProjectProps {
  open: boolean;
  onClose: () => void;
  onSave?: () => void;
  onSaveAndView?: () => void;
}

const ModalSaveProject: React.FC<ModalSaveProjectProps> = ({ open, onClose, onSave, onSaveAndView }) => {
  const navigate = useNavigate();

  const handleSaveAndView = () => {
    if (onSaveAndView) {
      onSaveAndView();
    }
    navigate('/checkout-bill');
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          position: 'fixed',
          right: 0,
          top: 0,
          bottom: 0,
          m: 0,
          width: '440px',
          maxWidth: '100%',
          minHeight: '100vh',
          height: '100vh',
          maxHeight: '100vh',
          borderRadius: 0,
          bgcolor: '#fff',
          boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
          transform: 'translateX(100%)',
          animation: 'slideIn 0.3s forwards',
          '@keyframes slideIn': {
            from: { transform: 'translateX(100%)' },
            to: { transform: 'translateX(0)' },
          },
          overflowY: 'hidden',
        },
      }}
      sx={{
        '& .MuiDialog-container': {
          alignItems: 'flex-end',
          justifyContent: 'flex-end',
        },
      }}
      fullScreen
    >
      <Box
        sx={{
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            pt: 4,
            pb: 3,
            width: '100%',
          }}
        >
          <Box
            component="img"
            src="/Images/selectFloorPlan/checkout.svg"
            alt="Save Project"
            sx={{ width: 48, height: 48, mb: 1, borderRadius: '50%' }}
          />
          <Box
            sx={{
              width: '390px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              borderBottom: '1px solid #E0E0E0',
              pb: 3,
            }}
          >
            <Typography variant="h6" sx={{ fontSize: '1.125rem', fontWeight: 'bold', mb: 0.5 }}>
              Save Project
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Enter customer information
            </Typography>
          </Box>
          <IconButton
            onClick={onClose}
            size="small"
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: 'text.secondary',
            }}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        </Box>

        <Box
          sx={{
            flex: 1,
            overflowY: 'auto',
            px: 3,
            py: 3,
            '&::-webkit-scrollbar': {
              width: '8px',
            },
            '&::-webkit-scrollbar-track': {
              background: '#f1f1f1',
            },
            '&::-webkit-scrollbar-thumb': {
              background: '#888',
              borderRadius: '4px',
            },
            '&::-webkit-scrollbar-thumb:hover': {
              background: '#555',
            },
          }}
        >
          <Stack spacing={3}>
            <Box>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 1, color: '#000' }}>
                Project name
              </Typography>
              <TextField
                fullWidth
                variant="outlined"
                defaultValue="Celestial Gate"
                size="small"
                InputProps={{
                  sx: { borderRadius: 1 },
                }}
              />
            </Box>
            <Box>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 1, color: '#000' }}>
                Customer name
              </Typography>
              <TextField
                fullWidth
                variant="outlined"
                defaultValue="John Smith"
                size="small"
                InputProps={{
                  sx: { borderRadius: 1 },
                }}
              />
            </Box>
            <Box>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 1, color: '#000' }}>
                Phone number
              </Typography>
              <Box sx={{ display: 'flex' }}>
                <Select
                  size="small"
                  defaultValue="+61"
                  sx={{
                    width: '80px',
                    borderRadius: '4px 0 0 4px',
                    backgroundColor: '#F5F5F5',
                    '& .MuiOutlinedInput-notchedOutline': {
                      borderRight: '1px solid #E0E0E0',
                      borderColor: 'rgba(0, 0, 0, 0.23)',
                    },
                    '&:hover': {
                      backgroundColor: '#F5F5F5',
                    },
                  }}
                >
                  <MenuItem value="+61">+61</MenuItem>
                  <MenuItem value="+84">+84</MenuItem>
                  <MenuItem value="+1">+1</MenuItem>
                </Select>
                <TextField
                  fullWidth
                  variant="outlined"
                  defaultValue="123-456-789"
                  size="small"
                  placeholder="Enter phone number"
                  InputProps={{
                    sx: {
                      borderRadius: '0 4px 4px 0',
                      '.MuiOutlinedInput-notchedOutline': {
                        borderLeft: 'none',
                      },
                      '&:hover .MuiOutlinedInput-notchedOutline': {
                        borderLeft: 'none',
                      },
                      '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        borderLeft: 'none',
                      },
                    },
                  }}
                />
              </Box>
            </Box>
            <Box>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 1, color: '#000' }}>
                Email
              </Typography>
              <TextField
                fullWidth
                variant="outlined"
                defaultValue="john.smith@example.com"
                size="small"
                InputProps={{
                  sx: { borderRadius: 1 },
                }}
              />
            </Box>
            <Box>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 1, color: '#000' }}>
                Address
              </Typography>
              <TextField
                fullWidth
                variant="outlined"
                defaultValue="90 Cobden St, South Melbourne VIC 3205, Australia"
                multiline
                rows={2}
                size="small"
                InputProps={{
                  sx: { borderRadius: 1 },
                }}
              />
            </Box>
            <Box
              sx={{
                width: '100%',
                borderBottom: '2px dashed #E0E0E0',
                mb: 2,
              }}
            />
            <Box>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 1, color: '#000' }}>
                Consultant
              </Typography>
              <Select
                fullWidth
                value="Darcy Hoang (you)"
                size="small"
                sx={{
                  borderRadius: 1,
                  bgcolor: '#F5F5F5',
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'rgba(0, 0, 0, 0.23)',
                  },
                  '&:hover': {
                    bgcolor: '#F5F5F5',
                  },
                }}
              >
                <MenuItem value="Darcy Hoang (you)">Darcy Hoang (you)</MenuItem>
              </Select>
            </Box>
          </Stack>
        </Box>

        <Box
          sx={{
            p: 2,
            display: 'flex',
            gap: 2,
            bgcolor: '#fff',
          }}
        >
          <Button
            fullWidth
            variant="contained"
            onClick={onSave}
            sx={{
              bgcolor: '#296df6',
              color: 'white',
              width: '80px',
              fontSize: '14px',

              '&:hover': { bgcolor: '#1756d8' },
              textTransform: 'none',
              height: 40,
              borderRadius: 3,
            }}
          >
            Save
          </Button>
          <Button
            fullWidth
            variant="outlined"
            onClick={handleSaveAndView}
            sx={{
              color: '#296df6',
              borderColor: 'none',
              border: 'none',
              fontSize: '14px',
              bgcolor: '#E8F0FE',
              '&:hover': {
                bgcolor: '#d4e4fd',
                borderColor: '#1756d8',
              },
              textTransform: 'none',
              height: 40,
              borderRadius: 3,
            }}
          >
            Save & View Detail
          </Button>
          <Button
            fullWidth
            variant="text"
            onClick={onClose}
            sx={{
              color: '#666',
              fontSize: '14px',
              width: '88px',
              bgcolor: '#F5F5F5',
              '&:hover': { bgcolor: '#E5E5E5' },
              textTransform: 'none',
              height: 40,
              borderRadius: 3,
            }}
          >
            Close
          </Button>
        </Box>
      </Box>
    </Dialog>
  );
};

export default ModalSaveProject;
