import React, { useState } from 'react';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { Box, Card, CardContent, CardMedia, Container, IconButton, styled, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import ButtonLoading from '@/components/button/buttonLoading';
import CustomPagination, { usePagination } from '@/components/pagination/pagination';
import Search from '@/components/search/Search';

const StyledCard = styled(Card)(() => ({
  boxShadow: 'none',
  cursor: 'pointer',
  // '&:hover': {
  //   boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
  // },
}));

const AddButton = styled(IconButton)(() => ({
  borderRadius: '50%',
  width: '2.5rem',
  height: '2.5rem',
  backgroundColor: '#EDEDED',
  '&:hover': {
    backgroundColor: '#fff',
  },
}));

interface FloorPlan {
  id: string;
  name: string;
  code: string;
  imageUrl: string;
}

const floorPlans: FloorPlan[] = [
  { id: '1', name: 'Avoca', code: 'R03', imageUrl: '/Images/selectFloorPlan/Rectangle -1.svg' },
  { id: '2', name: 'Mareeba', code: 'F03', imageUrl: '/Images/selectFloorPlan/Rectangle -2.svg' },
  { id: '3', name: 'Bronte', code: 'Y03', imageUrl: '/Images/selectFloorPlan/Rectangle -3.svg' },
  { id: '4', name: 'Avoca', code: 'R03', imageUrl: '/Images/selectFloorPlan/Rectangle -4.svg' },
  { id: '5', name: 'Mareeba', code: 'F03', imageUrl: '/Images/selectFloorPlan/Rectangle -5.svg' },
  { id: '6', name: 'Bronte', code: 'Y03', imageUrl: '/Images/selectFloorPlan/Rectangle -6.svg' },
  { id: '7', name: 'Avoca', code: 'R03', imageUrl: '/Images/selectFloorPlan/Rectangle -7.svg' },
  { id: '8', name: 'Mareeba', code: 'F03', imageUrl: '/Images/selectFloorPlan/Rectangle -8.svg' },
  { id: '8', name: 'Mareeba', code: 'F03', imageUrl: '/Images/selectFloorPlan/Rectangle -8.svg' },
];

const SelectFloorPlan = (): React.JSX.Element => {
  const [isLoading, setIsLoading] = useState(false);
  const { currentItems, page, pageCount, handlePageChange, itemsPerPage, handleItemsPerPageChange, totalItems } =
    usePagination(floorPlans, 8);

  const handleSearch = (searchTerm: string, state: string, community: string) => {
    setIsLoading(true);
    try {
      console.log(searchTerm, state, community);
      // Implement search logic here
    } finally {
      setIsLoading(false);
    }
  };
  const navigate = useNavigate();
  const handleFloorPlanSelect = (floorPlan: FloorPlan) => {
    console.log('Selected floor plan:', floorPlan);
    // Implement selection logic here
    navigate('/product-details');
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        height: '100vh',
        backgroundColor: '#f5f5f5',
        overflow: 'hidden',
      }}
    >
      <Container
        maxWidth={false}
        sx={{
          maxWidth: 'lg',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
          pt: 4,
          px: { xs: 2, sm: 3, md: 4 },
          pb: 0,
        }}
      >
        {/* Header */}
        <Box
          sx={{
            textAlign: 'center',
            mb: 4,
            maxWidth: 'md',
            width: '100%',
            alignSelf: 'center',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 1,
              mb: 1,
            }}
          >
            <Box
              component="img"
              src="https://www.stockland.com.au/contentassets/dc8ad9373bcb4f25a11b4cd5ad90c282/stockland-logo-long.svg"
              alt="Stockland"
              sx={{ width: 200, height: 50 }}
            />
          </Box>
          <Typography variant="h4" component="h2" sx={{ mb: 1, color: '#2c2c2c', fontWeight: 'bold', fontSize: 37 }}>
            Select a Floorplan
          </Typography>
          <Typography variant="h4" color="text.secondary" sx={{ fontSize: 33 }}>
            Easy to build your design
          </Typography>
        </Box>

        {/* Search */}
        <Box
          sx={{
            mb: 4,
            display: 'flex',
            gap: 1,
            maxWidth: '95%',
            width: '95%',
            alignSelf: 'center',
          }}
        >
          <Search placeholder="Search..." onSearch={handleSearch} />
          <ButtonLoading loading={isLoading} variant="contained" onClick={() => handleSearch('', '', '')}>
            <Box sx={{ minWidth: 'auto', justifyContent: 'center', alignItems: 'center', display: 'flex' }}>
              <Box component="img" src="/icons/search.svg" alt="Search" sx={{ width: 20, height: 20 }} />
            </Box>
          </ButtonLoading>
        </Box>

        {/* Content Area - Fixed height and scrollable */}
        <Box
          sx={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            mb: 2,
          }}
        >
          <Box
            sx={{
              width: '100%',
              display: 'flex',
              flexWrap: 'wrap',
              gap: 3,
              justifyContent: 'center',
              overflow: 'auto',
              flex: 1,
              pb: 2,
            }}
          >
            {currentItems.map((plan, index) => (
              <Box
                key={`${plan.id}-${index}`}
                sx={{
                  width: {
                    xs: '100%',
                    sm: 'calc(50% - 12px)',
                    md: 'calc(25% - 18px)',
                  },
                  p: 1,
                }}
              >
                <StyledCard onClick={() => handleFloorPlanSelect(plan)}>
                  <CardMedia component="img" height="180" image={plan.imageUrl} alt={plan.name} />
                  <CardContent
                    sx={{
                      p: 1,
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      backgroundColor: '#F5F5F5',
                    }}
                  >
                    <Typography variant="subtitle1" component="div" align="center" sx={{ fontSize: '1.5rem' }}>
                      {plan.name} - {plan.code}
                    </Typography>
                    <AddButton size="small">
                      <NavigateNextIcon />
                    </AddButton>
                  </CardContent>
                </StyledCard>
              </Box>
            ))}
          </Box>
        </Box>

        {/* Pagination - Fixed at the bottom */}
        <Box
          sx={{
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            py: 2,
            px: 4,
            backgroundColor: '#f5f5f5',
            position: 'relative',
          }}
        >
          <CustomPagination
            count={pageCount}
            page={page}
            onChange={handlePageChange}
            rowsPerPage={itemsPerPage}
            rowsPerPageOptions={[4, 8, 12, 16]}
            onRowsPerPageChange={handleItemsPerPageChange}
            totalItems={totalItems}
            showPageInfo
          />
        </Box>
      </Container>
    </Box>
  );
};

export default SelectFloorPlan;
