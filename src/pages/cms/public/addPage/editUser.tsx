import React, { useState } from 'react';
import { Box, Typography } from '@mui/material';

import SelectEdit from '../../../../components/dashBoard/select/select';
import TextFieldEdit from '../../../../components/dashBoard/textFieldEdit/textFieldEdit';
import CommunitiesPage from '../communities';

const EditUserPage = (): React.JSX.Element => {
  // Customer information state
  const [fullName, setFullName] = useState('Join Smith');
  const [address, setAddress] = useState('90 Cobden St, South Melbourne VIC 3205, Australia');
  const [phoneNumber, setPhoneNumber] = useState('123-456-789');
  const [email, setEmail] = useState('john.smith@example.com');
  const [countryCode, setCountryCode] = useState('+61');
  const [role, setRole] = useState('');

  // Country code options
  const countryCodeOptions = [
    { value: '+61', label: '+61' },
    { value: '+1', label: '+1' },
    { value: '+44', label: '+44' },
    { value: '+86', label: '+86' },
    { value: '+81', label: '+81' },
    { value: '+84', label: '+84' },
  ];

  // Role options
  const roleOptions = [
    { value: '', label: 'Select role' },
    { value: 'admin', label: 'Admin' },
    { value: 'user', label: 'User' },
    { value: 'manager', label: 'Manager' },
  ];

  return (
    <Box sx={{ maxWidth: '100%', margin: '0 auto', padding: 3 }}>
      <Typography variant="h6" sx={{ mb: 3, fontWeight: 'bold', fontSize: '1.2rem', color: 'black' }}>
        User Detail
      </Typography>

      <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 2 }}>
        {/* First Column - Full name */}
        <Box>
          <Typography variant="subtitle2" gutterBottom>
            Full name
          </Typography>
          <TextFieldEdit value={fullName} onChange={(e) => setFullName(e.target.value)} sx={{ mb: 2 }} />
        </Box>

        {/* Second Column - Phone Number */}
        <Box>
          <Typography variant="subtitle2" gutterBottom>
            Phone Number
          </Typography>
          <Box sx={{ display: 'flex', mb: 2 }}>
            <SelectEdit
              value={countryCode}
              onChange={(e) => setCountryCode(e.target.value as string)}
              options={countryCodeOptions}
              sx={{
                width: '80px',
                borderRadius: '8px 0 0 8px',
                border: '1px solid #e0e0e0',
                backgroundColor: '#fffff',
              }}
            />
            <TextFieldEdit
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              sx={{
                mb: 0,
                flex: 1,
                borderRadius: '0 8px 8px 0 !important',
                '& .MuiOutlinedInput-root': {
                  borderRadius: '0 4px 4px 0',
                },
              }}
            />
          </Box>
        </Box>

        {/* Third Column - Email */}
        <Box>
          <Typography variant="subtitle2" gutterBottom>
            Email
          </Typography>
          <TextFieldEdit value={email} onChange={(e) => setEmail(e.target.value)} sx={{ mb: 2 }} />
        </Box>
        {/* Address below the 3-column layout */}
        <Box sx={{ mt: 2 }}>
          <Typography variant="subtitle2" gutterBottom>
            Address
          </Typography>
          <TextFieldEdit
            multiline
            rows={2}
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            sx={{ mb: 2 }}
          />
        </Box>

        <Box sx={{ mt: 2 }}>
          <Typography variant="subtitle2" gutterBottom>
            Role
          </Typography>
          <SelectEdit
            value={role}
            onChange={(e) => setRole(e.target.value as string)}
            options={roleOptions}
            sx={{ width: '100%', maxWidth: '300px' }}
          />
        </Box>
      </Box>

      <Box sx={{ mt: 4 }}>
        <Typography variant="subtitle2" gutterBottom sx={{ fontWeight: 'bold', fontSize: '1.2rem', color: 'black' }}>
          Project List
        </Typography>
        <CommunitiesPage />
      </Box>
    </Box>
  );
};

export default EditUserPage;
