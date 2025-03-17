import { useBrandStore } from '@/store';
import { Button } from '@mui/material';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';

interface ShowModalBackTemplateProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export default function ShowModalBackTemplate({
  open,
  setOpen,
}: ShowModalBackTemplateProps) {
  const handleClose = () => setOpen(false);
  const { setShowTemplateModal } = useBrandStore();

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography
            id="modal-modal-title"
            variant="h5"
            sx={{ textAlign: 'center' }}
            component="h3"
          >
            Confirm
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 1, fontSize: '17px' , textAlign: 'center' }}>
            Do you want to choose the template again?
          </Typography>

          <Box sx={{ mt: 2, gap: 10, textAlign: 'center' }}>
            <Button
              sx={{ ...customButtonStyle }}
              onClick={() => {
                setShowTemplateModal(true);
                setOpen(false);
              }}
              color="warning"
              variant="contained"
            >
              Confirm
            </Button>
            <Button
              sx={{ ...customButtonStyle, ml: 1 }}
              onClick={() => {
                setOpen(false);
              }}
              color="primary"
              variant="contained"
            >
              Cancel
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}

const customButtonStyle = {
  outline: 'none',
  ':focus': { outline: 'none' },
  button: {
  },
  backgroundColor: '#000',
  minWidth: '100px',
};

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  p: 4,
  borderRadius: '6px',
  outline: 'none',
  border: 'none',
};
