import React, { useState } from 'react';
import DescriptionIcon from '@mui/icons-material/Description';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import SendIcon from '@mui/icons-material/Send';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Box, Paper, SelectChangeEvent, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

import ButtonEdit from '../../../../components/dashBoard/buttonEdit/buttonEdit';
import SelectEdit from '../../../../components/dashBoard/select/select';
import TextFieldEdit from '../../../../components/dashBoard/textFieldEdit/textFieldEdit';
import { useCreateLeadMutation } from '../../../../graphql/mutations/createLead.generated';
import { useCommunitiesQuery } from '../../../../graphql/queries/communities.generated';
import { useProductsQuery } from '../../../../graphql/queries/products.generated';
import { useNavigate } from 'react-router-dom';
import { paths } from '../../../../paths.config';
import { ToastMessage } from '../../../../utils/toast';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  height: '100%',
  borderRadius: 0,
  boxShadow: 'none',
}));

const AddLeadPage = (): React.JSX.Element => {
  // Customer information state
  const [customerName, setCustomerName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [leadSource, setLeadSource] = useState('');

  // Project information state
  const [communityId, setCommunityId] = useState('');
  const [floorPlanId, setFloorPlanId] = useState<number | null>(null);
  const [selectedFloorPlan, setSelectedFloorPlan] = useState<{ image: string; price: string } | null>(null);
  const [totalPrice, setTotalPrice] = useState('$0.00');

  // GraphQL queries and mutation
  const [communitiesResult] = useCommunitiesQuery();
  const [productsResult] = useProductsQuery();
  const [createLeadState, executeCreateLead] = useCreateLeadMutation();
  const navigate = useNavigate();
  // Create options arrays from GraphQL data
  const communityOptions =
    communitiesResult.data?.communities.items.map((community) => ({
      value: community.id,
      label: community.name,
    })) || [];

  const floorPlanOptions =
    productsResult.data?.products.items.map((product) => ({
      value: product.id,
      label: product.name,
      image: product.thumbnail,
      price: product.price ? `$${product.price.toFixed(2)}` : '$0.00',
    })) || [];

  // Handle select change
  const handleCommunityChange = (event: SelectChangeEvent<unknown>) => {
    setCommunityId(event.target.value as string);
  };

  const handleFloorPlanChange = (event: SelectChangeEvent<unknown>) => {
    const selectedId = event.target.value as string;
    console.log('Selected floor plan ID:', selectedId);
    setFloorPlanId(parseInt(selectedId, 10));

    // Find the selected floor plan from options
    const selectedPlan = floorPlanOptions.find((option) => option.value === selectedId);
    if (selectedPlan) {
      setSelectedFloorPlan({
        image: selectedPlan.image,
        price: selectedPlan.price,
      });
      setTotalPrice(selectedPlan.price);
    }
  };

  // Handle save button click
  const handleSave = async () => {
    try {
      // Validate required fields
      if (!floorPlanId) {
        console.error('Floor plan is required');
        return;
      }

      const result = await executeCreateLead({
        createLeadInput: {
          full_name: customerName,
          phone: phoneNumber,
          email: email,
          address: address,
          lead_source: leadSource,
          communityId: communityId,
          productId: floorPlanId,
        },
      });

      if (result.error) {
        throw result.error;
      }

      // Show success toast
      ToastMessage('success', 'Lead created successfully');
      
      // Navigate back to dashboard
      navigate(paths.dashboard);
    } catch (error) {
      console.error('Error creating lead:', error);
      ToastMessage('error', 'Failed to create lead');
    }
  };

  return (
    <Box sx={{ maxWidth: 1400, margin: '0 auto', padding: 2 }}>
      <Box sx={{ display: 'flex', gap: 3 }}>
        {/* Left Column - Customer Information */}
        <Box sx={{ flex: 1 }}>
          <StyledPaper elevation={0} sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
            <Typography
              gutterBottom
              sx={{
                fontWeight: 'bold',
                fontSize: '1.5rem',
                mb: 2,
              }}
            >
              Lead Information
            </Typography>
            <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
              <Typography variant="subtitle2" gutterBottom sx={{ fontSize: '1rem', fontWeight: '500' }}>
                Full name
              </Typography>
              <TextFieldEdit value={customerName} onChange={(e) => setCustomerName(e.target.value)} sx={{ mb: 2 }} />

              <Typography variant="subtitle2" gutterBottom sx={{ fontSize: '1rem' }}>
                Phone number
              </Typography>
              <TextFieldEdit value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} sx={{ mb: 2 }} />

              <Typography variant="subtitle2" gutterBottom sx={{ fontSize: '1rem' }}>
                Email
              </Typography>
              <TextFieldEdit value={email} onChange={(e) => setEmail(e.target.value)} sx={{ mb: 2 }} />

              <Typography variant="subtitle2" gutterBottom sx={{ fontSize: '1rem' }}>
                Address
              </Typography>
              <TextFieldEdit
                multiline
                rows={2}
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                sx={{ mb: 2 }}
              />
              <Typography variant="subtitle2" gutterBottom sx={{ fontSize: '1rem' }}>
                Lead Source
              </Typography>
              <TextFieldEdit value={leadSource} onChange={(e) => setLeadSource(e.target.value)} sx={{ mb: 2 }} />
              <Box sx={{ mt: 'auto' }}>
                <Typography variant="subtitle2" gutterBottom sx={{ fontSize: '1rem' }}>
                  Consultant
                </Typography>
                <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
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
                    text="ASSIGN"
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
                      fontSize: '0.75rem',
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
                    text="ASSIGN"
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
                      fontSize: '0.75rem',
                    }}
                  />
                </Box>
              </Box>
            </Box>
          </StyledPaper>
        </Box>

        {/* Right Column - Project Template */}
        <Box sx={{ flex: 1 }}>
          <StyledPaper elevation={0} sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
            <Typography gutterBottom sx={{ fontWeight: 'bold', fontSize: '1.5rem', mb: 2 }}>
              Community Template
            </Typography>

            <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
              <Typography variant="subtitle2" gutterBottom sx={{ fontSize: '1rem', fontWeight: '500' }}>
                Community name
              </Typography>
              <SelectEdit
                options={communityOptions}
                value={communityId}
                onChange={handleCommunityChange}
                sx={{ mb: 2 }}
                disabled={communitiesResult.fetching}
              />

              <Typography variant="subtitle2" gutterBottom sx={{ fontSize: '1rem' }}>
                Floor plan
              </Typography>
              <SelectEdit
                options={floorPlanOptions}
                value={floorPlanId}
                onChange={handleFloorPlanChange}
                sx={{ mb: 2 }}
                disabled={productsResult.fetching}
              />

              {/* Project Image */}
              <Box
                sx={{
                  width: '100%',
                  flex: 1,
                  bgcolor: '#d6e8f9',
                  borderRadius: 1,
                  mt: 2,
                  mb: 2,
                  overflow: 'hidden',
                }}
              >
                <Box
                  component="img"
                  src={selectedFloorPlan?.image || '/Images/selectFloorPlan/KITCHEN2 (4).svg'}
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
                    text="VIEW PROJECT"
                    icon={<VisibilityIcon />}
                    sx={{
                      bgcolor: '#EBF1FF',
                      fontWeight: 'bold',
                      color: '#1976d2',
                      flex: 1,
                      height: 40,
                      boxShadow: 'none',
                      fontSize: '0.75rem',
                      '&:hover': {
                        bgcolor: '#d0e8fd',
                      },
                    }}
                  />
                  <ButtonEdit
                    text="QUOTATION DETAIL"
                    icon={<DescriptionIcon />}
                    sx={{
                      bgcolor: '#ffffff',
                      color: '#000000',
                      minHeight: '40px',
                      height: 40,
                      border: '2px solid rgb(146, 145, 145)',
                      flex: 1,
                      boxShadow: 'none',
                      fontSize: '0.75rem',
                      '&:hover': {
                        bgcolor: '#f5f5f5',
                      },
                    }}
                  />
                  <ButtonEdit
                    text="SEND QUOTATION"
                    icon={<SendIcon />}
                    sx={{
                      bgcolor: '#ffffff',
                      color: '#000000',
                      border: '2px solid rgb(146, 145, 145)',
                      height: 40,
                      flex: 1,
                      boxShadow: 'none',
                      fontSize: '0.75rem',
                      '&:hover': {
                        bgcolor: '#f5f5f5',
                      },
                    }}
                  />
                </Box>
              </Box>
            </Box>
          </StyledPaper>
        </Box>
      </Box>

      {/* Save and Cancel Buttons */}
      <Box sx={{ display: 'flex', gap: 2, m: 3, justifyContent: 'flex-end' }}>
        <ButtonEdit
          text="SAVE"
          sx={{
            backgroundColor: '#296DF6',
            height: 40,
            boxShadow: 'none',
            px: 3,
          }}
          onClick={handleSave}
          disabled={createLeadState.fetching}
        />
        <ButtonEdit
          text="CANCEL"
          onClick={() => navigate(paths.dashboard)}
          variant="outlined"
          sx={{
            color: 'black',
            backgroundColor: '#EAEAEA',
            border: 'none',
            height: 40,
            boxShadow: 'none',
            px: 3,
          }}
        />
      </Box>
    </Box>
  );
};

export default AddLeadPage;
