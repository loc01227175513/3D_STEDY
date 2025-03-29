import React, { ChangeEvent, useState } from 'react';
import FloorPlanPage from '@/pages/cms/public/floorPlan';
import { Box, FormControl, MenuItem, Paper, Select, Typography } from '@mui/material';
import Grid2 from '@mui/material/Grid2';
import { styled } from '@mui/material/styles';

import ButtonEdit from '@/components/dashBoard/buttonEdit/buttonEdit';
import TextFieldEdit from '@/components/dashBoard/textFieldEdit/textFieldEdit';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  height: '100%',
  borderRadius: 0,
  boxShadow: 'none',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
}));

const EditCommunitiesPage = (): React.JSX.Element => {
  const [communityName, setCommunityName] = useState('Halcyon Highlands');
  const [description, setDescription] = useState(
    'A community offering a cool climate and picturesque landscapes on the Darling Downs.'
  );

  return (
    <Box sx={{ maxWidth: 1400, margin: '0 auto', padding: 3 }}>
      <Grid2 container spacing={3}>
        {/* Left Column - Information Section */}
        <Grid2 size={6}>
          <StyledPaper elevation={0}>
            <Box>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                Information
              </Typography>
              <Box sx={{ mt: 2 }}>
                <Typography variant="subtitle2" gutterBottom sx={{ fontSize: '1rem' }}>
                  Community name
                </Typography>
                <TextFieldEdit
                  value={communityName}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => setCommunityName(e.target.value)}
                />

                <Typography variant="subtitle2" gutterBottom sx={{ fontSize: '1rem' }}>
                  Category
                </Typography>
                <FormControl fullWidth sx={{ mb: 3 }}>
                  <Select
                    displayEmpty
                    defaultValue=""
                    sx={{
                      bgcolor: '#f5f5f5',
                      borderRadius: 3,
                      '& .MuiOutlinedInput-notchedOutline': {
                        border: 'none',
                      },
                    }}
                    renderValue={(selected) => {
                      if (!selected) {
                        return <em>Select category</em>;
                      }
                      return selected;
                    }}
                  >
                    <MenuItem value="">
                      <em>Select category</em>
                    </MenuItem>
                    <MenuItem value="residential">Residential</MenuItem>
                    <MenuItem value="commercial">Commercial</MenuItem>
                    <MenuItem value="industrial">Industrial</MenuItem>
                  </Select>
                </FormControl>

                <Typography variant="subtitle2" gutterBottom sx={{ fontSize: '1rem' }}>
                  Description
                </Typography>
                <TextFieldEdit
                  multiline
                  rows={4}
                  value={description}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => setDescription(e.target.value)}
                />
              </Box>
            </Box>

            <Box sx={{ display: 'flex', gap: 2, mt: 3 }}>
              <ButtonEdit
                text="SAVE"
                variant="contained"
                sx={{ backgroundColor: '#296DF6', fontWeight: 'bold', height: 44 }}
              />
              <ButtonEdit
                text="CANCEL"
                variant="outlined"
                sx={{ color: 'black', backgroundColor: '#EAEAEA', border: 'none', height: 44 }}
              />
            </Box>
          </StyledPaper>
        </Grid2>

        {/* Right Column - Product Model Section */}
        <Grid2 size={6}>
          <StyledPaper elevation={0}>
            <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                Portfolio
              </Typography>

              {/* Image gallery layout with large image on left and 3 smaller on right */}
              <Box sx={{ display: 'flex', gap: 2, mb: 2, height: '390px' }}>
                {/* Main large image */}
                <Box
                  component="img"
                  src="/Images/selectFloorPlan/PRODUCT2.jpg"
                  sx={{
                    width: '70%',
                    height: '100%',
                    borderRadius: 2,
                    objectFit: 'cover',
                  }}
                />

                {/* Column of smaller images */}
                <Box sx={{ display: 'flex', flexDirection: 'column', width: '30%', gap: 2 }}>
                  <Box
                    component="img"
                    src="/Images/selectFloorPlan/Rectangle -1.svg"
                    sx={{
                      width: '100%',
                      height: '32%',
                      borderRadius: 2,
                      objectFit: 'cover',
                    }}
                  />
                  <Box
                    component="img"
                    src="/Images/selectFloorPlan/KITCHEN2 (2).svg"
                    sx={{
                      width: '100%',
                      height: '32%',
                      borderRadius: 2,
                      objectFit: 'cover',
                    }}
                  />
                  <Box
                    component="img"
                    src="/Images/selectFloorPlan/Rectangle -1.svg"
                    sx={{
                      width: '100%',
                      height: '32%',
                      borderRadius: 2,
                      objectFit: 'cover',
                    }}
                  />
                </Box>
              </Box>
            </Box>

            {/* Start design button */}
            <Box sx={{ display: 'flex', gap: 2, mt: 3 }}>
              <ButtonEdit
                text="START DESIGN"
                variant="contained"
                startIcon={
                  <Box component="span" sx={{ display: 'flex', alignItems: 'center' }}>
                    🖌️
                  </Box>
                }
                sx={{
                  backgroundColor: '#296DF6',
                  fontWeight: 'bold',
                  color: 'white',
                  height: 44,
                  '&:hover': {
                    backgroundColor: '#296DF6',
                  },
                }}
              />
            </Box>
          </StyledPaper>
        </Grid2>
        <Grid2 size={12}>
          <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
            List Of FloorPlan
          </Typography>
          <FloorPlanPage />
        </Grid2>
      </Grid2>
    </Box>
  );
};

export default EditCommunitiesPage;
