import React, { useState } from 'react';
import DescriptionIcon from '@mui/icons-material/Description';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import SendIcon from '@mui/icons-material/Send';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Box, Paper, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

import ButtonEdit from '../../../../components/dashBoard/buttonEdit/buttonEdit';
import TextFieldEdit from '../../../../components/dashBoard/textFieldEdit/textFieldEdit';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  height: '100%',
  borderRadius: 0,
  boxShadow: 'none',
}));

const EditLeadPage = (): React.JSX.Element => {
  // Customer information state
  const [customerName, setCustomerName] = useState('John Smith');
  const [phoneNumber, setPhoneNumber] = useState('+61 412 345 678');
  const [email, setEmail] = useState('john.smith@example.com');
  const [address, setAddress] = useState('90 Cobden St, South Melbourne VIC 3205, Australia');

  // Project information state
  const [projectName, setProjectName] = useState('BlueprintPro');
  const [totalPrice] = useState('$6,900.00');
  return (
    <Box sx={{ maxWidth: 1400, margin: '0 auto', padding: 3 }}>
      <Box sx={{ display: 'flex' }}>
        {/* Left Column - Customer Information */}
        <Box sx={{ flex: 1, mr: 1.5 }}>
          <StyledPaper elevation={0}>
            <Typography
              gutterBottom
              sx={{
                fontWeight: 'bold',
                fontSize: '1.5rem',
              }}
            >
              Customer Information
            </Typography>
            <Box sx={{ mt: 2 }}>
              <Typography variant="subtitle2" gutterBottom sx={{ fontSize: '1rem', fontWeight: '500' }}>
                Customer name
              </Typography>
              <TextFieldEdit value={customerName} onChange={(e) => setCustomerName(e.target.value)} />

              <Typography variant="subtitle2" gutterBottom sx={{ fontSize: '1rem' }}>
                Phone number
              </Typography>
              <TextFieldEdit value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />

              <Typography variant="subtitle2" gutterBottom sx={{ fontSize: '1rem' }}>
                Email
              </Typography>
              <TextFieldEdit value={email} onChange={(e) => setEmail(e.target.value)} />

              <Typography variant="subtitle2" gutterBottom sx={{ fontSize: '1rem' }}>
                Address
              </Typography>
              <TextFieldEdit multiline rows={2} value={address} onChange={(e) => setAddress(e.target.value)} />

              <Box sx={{ mt: 2 }}>
                <Typography variant="subtitle2" gutterBottom sx={{ fontSize: '1rem' }}>
                  Consultant
                </Typography>
                <Box sx={{ display: 'flex', gap: 1, mb: 3 }}>
                  <Box
                    sx={{
                      bgcolor: '#f5f5f5',
                      p: 2,
                      borderRadius: 1,
                      flex: 1,
                      display: 'flex',
                      alignItems: 'center',
                      height: 40,
                    }}
                  >
                    <Typography variant="body2">Not Assigned</Typography>
                  </Box>
                  <ButtonEdit
                    text="Assign"
                    icon={<PersonAddIcon />}
                    size="small"
                    sx={{
                      bgcolor: '#EBF1FF',
                      fontWeight: 'bold',
                      color: '#1976d2',
                      '&:hover': {
                        bgcolor: '#d0e8fd',
                      },
                      px: 2,
                      height: 40,
                      boxShadow: 'none',
                    }}
                  />
                </Box>

                <Typography variant="subtitle2" gutterBottom sx={{ fontSize: '1rem' }}>
                  Home Specialist
                </Typography>
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <Box
                    sx={{
                      bgcolor: '#f5f5f5',
                      p: 2,
                      borderRadius: 1,
                      flex: 1,
                      display: 'flex',
                      alignItems: 'center',
                      height: 40,
                    }}
                  >
                    <Typography variant="body2">Not Assigned</Typography>
                  </Box>
                  <ButtonEdit
                    text="Assign"
                    icon={<PersonAddIcon />}
                    size="small"
                    sx={{
                      bgcolor: '#EBF1FF',
                      fontWeight: 'bold',
                      color: '#1976d2',
                      '&:hover': {
                        bgcolor: '#d0e8fd',
                      },
                      px: 2,
                      height: 40,
                      boxShadow: 'none',
                    }}
                  />
                </Box>
              </Box>
            </Box>
          </StyledPaper>
        </Box>

        {/* Right Column - Project Template */}
        <Box sx={{ flex: 1, ml: 1.5 }}>
          <StyledPaper elevation={0} sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
            <Typography gutterBottom sx={{ fontWeight: 'bold', fontSize: '1.5rem' }}>
              Project Template
            </Typography>

            <Typography variant="subtitle2" gutterBottom sx={{ fontSize: '1rem', my: 0.8 }}>
              Project name
            </Typography>
            <TextFieldEdit value={projectName} onChange={(e) => setProjectName(e.target.value)} />

            {/* Project Image */}
            <Box
              sx={{
                width: '100%',
                flex: 1,
                bgcolor: '#d6e8f9',
                borderRadius: 1,
                mb: 2,
                overflow: 'hidden',
              }}
            >
              <Box
                component="img"
                src="/Images/selectFloorPlan/KITCHEN2 (4).svg"
                alt="House template"
                sx={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                }}
              />
            </Box>

            {/* Price and Buttons */}
            <Box sx={{ mt: 'auto' }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: '#6E6E6E' }}>
                  Total price:
                </Typography>
                <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                  {totalPrice}
                </Typography>
              </Box>

              <Box sx={{ display: 'flex', gap: 2 }}>
                <ButtonEdit
                  text="View project"
                  icon={<VisibilityIcon />}
                  sx={{
                    bgcolor: '#EBF1FF',
                    fontWeight: 'bold',
                    color: '#1976d2',
                    flex: 1,
                    height: 40,
                    boxShadow: 'none',
                    '&:hover': {
                      bgcolor: '#d0e8fd',
                    },
                  }}
                />
                <ButtonEdit
                  text="Quotation detail"
                  icon={<DescriptionIcon />}
                  sx={{
                    bgcolor: '#ffffff',
                    color: '#000000',
                    minHeight: '40px',
                    height: 40,
                    border: '2px solid rgb(146, 145, 145)',
                    flex: 1,
                    boxShadow: 'none',
                    '&:hover': {
                      bgcolor: '#f5f5f5',
                    },
                  }}
                />
                <ButtonEdit
                  text="Send quotation"
                  icon={<SendIcon />}
                  sx={{
                    bgcolor: '#ffffff',
                    color: '#000000',
                    border: '2px solid rgb(146, 145, 145)',
                    height: 40,
                    flex: 1,
                    boxShadow: 'none',
                    '&:hover': {
                      bgcolor: '#f5f5f5',
                    },
                  }}
                />
              </Box>
            </Box>
          </StyledPaper>
        </Box>
      </Box>

      {/* Save and Cancel Buttons */}
      <Box sx={{ display: 'flex', gap: 2, m: 3 }}>
        <ButtonEdit
          text="Save"
          sx={{
            backgroundColor: '#296DF6',
            height: 40,
            boxShadow: 'none',
          }}
        />
        <ButtonEdit
          text="Cancel"
          variant="outlined"
          sx={{
            color: 'black',
            backgroundColor: '#EAEAEA',
            border: 'none',
            height: 40,
            boxShadow: 'none',
          }}
        />
      </Box>
    </Box>
  );
};

export default EditLeadPage;
