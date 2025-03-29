import { Box, Button } from '@mui/material';
import { styled } from '@mui/system';
import { Field } from 'formik';

export const StyledForm = styled('div')({
  maxWidth: '500px',
  width: '100%',
  margin: '0 auto',
  marginTop: '100px',
  padding: '2rem',
  borderRadius: '12px',
});

export const StyledField = styled(Field)({
  width: '100%',
  padding: '0.75rem 0.75rem 0.75rem 2.5rem',

  border: '1px solid #e2e8f0',
  borderRadius: '4px',
  '&:focus': {
    outline: 'none',
    borderColor: '#3182ce',
  },
});

export const StyledButton = styled(Button)({
  width: '100%',
  padding: '0.75rem',
  backgroundColor: '#1a73e8',
  color: 'white',
  border: 'none',
  borderRadius: '15px',
  cursor: 'pointer',
  textTransform: 'none',
  '&:hover': {
    backgroundColor: '#1557b0',
  },
});

export const BackgroundContainer = styled(Box)({
  width: '100%',
  height: '100vh',
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
});

export const ImageContainer = styled(Box)({
  height: '50%',
  margin: '40px 70px 0 70px',
  borderRadius: '50px',
  background: `url("https://www.stockland.com.au/globalassets/halcyon/havsto0006_house_2647_r2-flip.png?width=1297&height=808&rmode=Crop&format=webp&hmac=9aacc59e62f037ad2b0dde8f96f7f80024499f69278b1452c83094f79623d6dc")`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
});

export const FormContainer = styled(Box)({
  width: '100%',
  height: '100%',
  position: 'absolute',
  top: '0',
  left: '0',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '2rem',
});
