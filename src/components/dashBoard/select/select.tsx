import React from 'react';
import { MenuItem, Select as MuiSelect, SelectChangeEvent, SelectProps } from '@mui/material';

interface SelectOption {
  value: string;
  label: string;
}

interface SelectEditProps extends Omit<SelectProps, 'onChange'> {
  options: SelectOption[];
  onChange?: (event: SelectChangeEvent<unknown>) => void;
  defaultValue?: string;
}

const SelectEdit: React.FC<SelectEditProps> = (props) => {
  const { options, sx, onChange, value, defaultValue, ...otherProps } = props;

  return (
    <MuiSelect
      value={value || defaultValue || ''}
      onChange={onChange}
      fullWidth
      {...otherProps}
      sx={{
        bgcolor: '#f5f5f5',
        '& .MuiOutlinedInput-notchedOutline': {
          border: 'none',
        },
        '& .MuiSelect-select': {
          p: 2,
          display: 'flex',
          alignItems: 'center',
        },
        ...sx,
      }}
    >
      {options.map((option) => (
        <MenuItem key={option.value} value={option.value}>
          {option.label}
        </MenuItem>
      ))}
    </MuiSelect>
  );
};

export default SelectEdit;
