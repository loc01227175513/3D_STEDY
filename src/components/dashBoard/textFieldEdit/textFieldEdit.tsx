import React from 'react';
import { TextField, TextFieldProps } from '@mui/material';

type TextFieldEditProps = TextFieldProps & {
  // Add any additional props needed
};

const TextFieldEdit: React.FC<TextFieldEditProps> = (props) => {
  const { sx, ...otherProps } = props;

  return (
    <TextField
      fullWidth
      {...otherProps}
      sx={{
        mb: 3,
        bgcolor: '#f5f5f5',
        borderRadius: 3,
        '& .MuiOutlinedInput-notchedOutline': {
          border: 'none',
        },
        ...sx,
      }}
    />
  );
};

export default TextFieldEdit;
