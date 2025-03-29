import React, { useState } from 'react';
import { Box, Divider, Typography } from '@mui/material';

import SelectEdit from '../../../../components/dashBoard/select/select';
import TextFieldEdit from '../../../../components/dashBoard/textFieldEdit/textFieldEdit';
import ProjectPage from '../communities';

const EditCustomerPage = (): React.JSX.Element => {
  // Customer information state
  const [fullName, setFullName] = useState('Join Smith');
  const [state, setState] = useState('NSW');
  const [address, setAddress] = useState('90 Cobden St, South Melbourne VIC 3205, Australia');
  const [phoneNumber, setPhoneNumber] = useState('123-456-789');
  const [community, setCommunity] = useState('Join Smith');
  const [createAt, setCreateAt] = useState('2023-04-20');
  const [email, setEmail] = useState('john.smith@example.com');
  const [leadSource, setLeadSource] = useState('Internal Website');
  const [region, setRegion] = useState('Join Smith');
  const [countryCode, setCountryCode] = useState('+61');
  const [consultant, setConsultant] = useState('not_assigned');

  // Country code options
  const countryCodeOptions = [
    { value: '+61', label: '+61' },
    { value: '+1', label: '+1' },
    { value: '+44', label: '+44' },
    { value: '+86', label: '+86' },
    { value: '+81', label: '+81' },
    { value: '+84', label: '+84' },
  ];

  // Consultant options
  const consultantOptions = [
    { value: 'not_assigned', label: '— Not Assigned —' },
    { value: 'john_doe', label: 'John Doe' },
    { value: 'jane_smith', label: 'Jane Smith' },
    { value: 'michael_brown', label: 'Michael Brown' },
    { value: 'emily_davis', label: 'Emily Davis' },
  ];

  return (
    <Box sx={{ maxWidth: '100%', margin: '0 auto', padding: 3 }}>
      <Typography variant="h6" sx={{ mb: 3, fontWeight: 'bold', fontSize: '1.2rem', color: 'black' }}>
        User Detail :
      </Typography>

      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
        {/* Left Column */}
        <Box sx={{ flex: 1, minWidth: '250px' }}>
          <Typography variant="subtitle2" gutterBottom>
            Full name
          </Typography>
          <TextFieldEdit value={fullName} onChange={(e) => setFullName(e.target.value)} sx={{ mb: 2 }} />

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

          <Typography variant="subtitle2" gutterBottom>
            Email
          </Typography>
          <TextFieldEdit value={email} onChange={(e) => setEmail(e.target.value)} sx={{ mb: 2 }} />
        </Box>

        {/* Middle Column */}
        <Box sx={{ flex: 1, minWidth: '250px' }}>
          <Typography variant="subtitle2" gutterBottom>
            State
          </Typography>
          <TextFieldEdit value={state} onChange={(e) => setState(e.target.value)} sx={{ mb: 2 }} />

          <Typography variant="subtitle2" gutterBottom>
            Community
          </Typography>
          <TextFieldEdit value={community} onChange={(e) => setCommunity(e.target.value)} sx={{ mb: 2 }} />

          <Typography variant="subtitle2" gutterBottom>
            Region
          </Typography>
          <TextFieldEdit value={region} onChange={(e) => setRegion(e.target.value)} sx={{ mb: 2 }} />
        </Box>

        {/* Right Column */}
        <Box sx={{ flex: 1, minWidth: '250px' }}>
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

          <Typography variant="subtitle2" gutterBottom>
            Create at
          </Typography>
          <TextFieldEdit value={createAt} onChange={(e) => setCreateAt(e.target.value)} sx={{ mb: 2 }} />

          <Typography variant="subtitle2" gutterBottom>
            Lead Source
          </Typography>
          <TextFieldEdit value={leadSource} onChange={(e) => setLeadSource(e.target.value)} sx={{ mb: 2 }} />
        </Box>
      </Box>

      {/* Horizontal divider */}
      <Divider
        sx={{
          my: 3,
          borderColor: '#e0e0e0',
          borderBottomWidth: 2,
          borderStyle: 'dashed',
        }}
      />

      {/* Saler/Consultant section */}
      <Box>
        <Typography variant="subtitle2" gutterBottom>
          Saler/ Consultant
        </Typography>
        <SelectEdit
          value={consultant}
          onChange={(e) => setConsultant(e.target.value as string)}
          options={consultantOptions}
          sx={{ mb: 2, maxWidth: '300px' }}
        />
      </Box>
      <Box>
        <Typography variant="subtitle2" gutterBottom sx={{ fontWeight: 'bold', fontSize: '1.2rem', color: 'black' }}>
          Project List
        </Typography>

        <ProjectPage />
      </Box>
    </Box>
  );
};

export default EditCustomerPage;
