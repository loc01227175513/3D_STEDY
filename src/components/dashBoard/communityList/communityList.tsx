import React from 'react';
import SearchIcon from '@mui/icons-material/Search';
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
} from '@mui/material';

interface CommunityItem {
  id: number;
  name: string;
  selected: boolean;
}

interface CommunityListProps {
  items: CommunityItem[];
  onSelectAll: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSelectItem: (id: number) => (event: React.ChangeEvent<HTMLInputElement>) => void;
  onAddToList: () => void;
}

const CommunityList = ({ items, onSelectAll, onSelectItem, onAddToList }: CommunityListProps): React.JSX.Element => {
  return (
    <Box sx={{ width: '100%', backgroundColor: '#F5F5F5', p: 2, borderRadius: 2 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <FormControl size="small" sx={{ minWidth: 280, mr: 4, backgroundColor: '#FFFFFF' }}>
          <Select defaultValue="all" sx={{ borderRadius: 2, fontWeight: 'bold' }}>
            <MenuItem value="all">All Community</MenuItem>
          </Select>
        </FormControl>

        <TextField
          size="small"
          // placeholder="Search"
          sx={{
            flexGrow: 1,

            '& .MuiOutlinedInput-root': {
              borderRadius: '12px',
              paddingRight: '8px',
              backgroundColor: '#FFFFFF',
            },
          }}
          InputProps={{
            startAdornment: <Typography sx={{ color: 'text.secondary', mx: 1 }}>Search</Typography>,
            endAdornment: <SearchIcon sx={{ color: 'action.active' }} />,
          }}
        />
      </Box>

      <Box sx={{ mb: 2 }}>
        <FormControlLabel
          control={
            <Checkbox
              checked={items.every((item) => item.selected)}
              indeterminate={items.some((item) => item.selected) && !items.every((item) => item.selected)}
              onChange={onSelectAll}
            />
          }
          label="Select all"
          sx={{ fontSize: '12px', ml: 1.2 }}
        />
        <Button
          variant="contained"
          size="small"
          sx={{ ml: 2, backgroundColor: '#000000', fontWeight: 'bold', textTransform: 'none' }}
          onClick={onAddToList}
        >
          Add to list
        </Button>
      </Box>

      <Paper variant="outlined" sx={{ maxHeight: 500, overflow: 'auto' }}>
        {items.map((item) => (
          <Box
            key={item.id}
            sx={{
              display: 'flex',
              alignItems: 'center',
              p: 1,
              borderBottom: '1px solid',
              borderColor: 'divider',
              '&:last-child': { borderBottom: 'none' },
            }}
          >
            <Checkbox checked={item.selected} onChange={onSelectItem(item.id)} />
            <Box
              sx={{
                width: 50,
                height: 50,
                bgcolor: 'grey.200',
                mr: 2,
              }}
            />
            <Typography>{item.name}</Typography>
          </Box>
        ))}
      </Paper>
    </Box>
  );
};

export default CommunityList;
