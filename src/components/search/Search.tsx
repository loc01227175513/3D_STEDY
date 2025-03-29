import React, { ReactNode, useState } from 'react';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { Box, InputBase, MenuItem, Paper, Select, SelectChangeEvent, styled } from '@mui/material';

interface SearchProps {
  onSearch?: (searchTerm: string, state: string, community: string) => void;
  placeholder?: string;
}

const SearchWrapper = styled(Paper)(() => ({
  padding: '2px 4px',
  height: 50,
  display: 'flex',
  alignItems: 'center',
  width: '100%',
  backgroundColor: '#F0F0F0',
  borderRadius: '4px',
  boxShadow: '0 1px 3px rgba(0,0,0,0.12)',
}));

const StyledSelect = styled(Select)(() => ({
  '& .MuiSelect-select': {
    padding: '8px 24px 8px 12px',
    fontSize: '14px',
  },
  '& .MuiOutlinedInput-notchedOutline': {
    border: 'none',
  },
}));

const Search = ({ onSearch, placeholder = 'Search...' }: SearchProps): React.JSX.Element => {
  const [searchTerm, setSearchTerm] = useState('');
  const [state, setState] = useState('');
  const [community, setCommunity] = useState('');

  const handleStateChange = (event: SelectChangeEvent) => {
    setState(event.target.value);
    if (onSearch) {
      onSearch(searchTerm, event.target.value, community);
    }
  };

  const handleCommunityChange = (event: SelectChangeEvent) => {
    setCommunity(event.target.value);
    if (onSearch) {
      onSearch(searchTerm, state, event.target.value);
    }
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    if (onSearch) {
      onSearch(event.target.value, state, community);
    }
  };

  return (
    <SearchWrapper>
      <InputBase
        sx={{
          ml: 1,
          flex: 1,
          fontSize: '1.5rem',
          '& input::placeholder': {
            color: 'black',
            opacity: 1,
            fontSize: '1.5rem',
          },
        }}
        placeholder={placeholder}
        value={searchTerm}
        onChange={handleSearchChange}
      />
      <Box sx={{ display: 'flex', alignItems: 'center', backgroundColor: 'white', marginRight: 1, borderRadius: 1 }}>
        <StyledSelect
          value={state}
          onChange={handleStateChange as (event: SelectChangeEvent<unknown>, child: ReactNode) => void}
          displayEmpty
          IconComponent={KeyboardArrowDownIcon}
          renderValue={(value): React.ReactNode => (
            <Box sx={{ fontSize: '1.5rem' }}>{(value as string) || 'State'}</Box>
          )}
          sx={{ minWidth: 120 }}
        >
          <MenuItem value="">All States</MenuItem>
          <MenuItem value="state1">State 1</MenuItem>
          <MenuItem value="state2">State 2</MenuItem>
          {/* Add more states as needed */}
        </StyledSelect>
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', backgroundColor: 'white', borderRadius: 1, marginRight: 1 }}>
        <StyledSelect
          value={community}
          onChange={handleCommunityChange as (event: SelectChangeEvent<unknown>, child: ReactNode) => void}
          displayEmpty
          IconComponent={KeyboardArrowDownIcon}
          renderValue={(value): React.ReactNode => (
            <Box sx={{ fontSize: '1.5rem' }}>{(value as string) || 'Community'}</Box>
          )}
          sx={{ minWidth: 120 }}
        >
          <MenuItem value="">All Communities</MenuItem>
          <MenuItem value="community1">Community 1</MenuItem>
          <MenuItem value="community2">Community 2</MenuItem>
          {/* Add more communities as needed */}
        </StyledSelect>
      </Box>
    </SearchWrapper>
  );
};

export default Search;
