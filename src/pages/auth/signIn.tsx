import React from 'react';
import { useAuthStore } from '@/apollo/stores/useAuthStore';
import { LoginFormValues } from '@/common/interface';
import { paths } from '@/paths.config';
import { saveAccessToken, saveRefreshToken } from '@/utils/storage';
import { Email, Lock, Visibility, VisibilityOff } from '@mui/icons-material';
import { Box, Checkbox, FormControlLabel, IconButton, InputAdornment, Typography } from '@mui/material';
import { Field, Form, Formik } from 'formik';
import { Link } from 'react-router-dom';
import * as Yup from 'yup';

import { useLoginMutation } from '../../graphql/mutations/login.generated';
import { BackgroundContainer, FormContainer, ImageContainer, StyledButton, StyledField, StyledForm } from './styles';

const validationSchema = Yup.object({
  email: Yup.string().email('Invalid email address').required('Email is required'),
  password: Yup.string().required('Password is required'),
});

export default function SignInPage(): React.JSX.Element {
  const [showPassword, setShowPassword] = React.useState(false);
  const { setUser } = useAuthStore();
  const [error, setError] = React.useState<string | null>(null);

  const [login, { loading }] = useLoginMutation();

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = async (variables: { input: { email: string; password: string } }) => {
    try {
      const result = await login({
        variables,
      });

      if (result.data?.login) {
        setUser(result.data.login.user);
        const accessToken = result.data.login.accessToken || '';
        const refreshToken = result.data.login.refreshToken || '';
        saveAccessToken(accessToken);
        saveRefreshToken(refreshToken);

        // Use window.location.replace instead of React Router navigation
        window.location.replace(paths.dashboard);
        return true;
      } else {
        setError('Invalid email or password');
        return false;
      }
    } catch (err) {
      console.error('Login error:', err);
      setError('An error occurred');
      return false;
    }
  };

  const handleSubmit = async (
    values: LoginFormValues,
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
  ) => {
    try {
      await handleLogin({
        input: {
          email: values.email,
          password: values.password,
        },
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <BackgroundContainer>
      <ImageContainer />
      <FormContainer>
        <StyledForm>
          <Box
            sx={{
              backgroundColor: 'white',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
              padding: '1rem 2rem 2rem',
              borderRadius: '12px',
            }}
          >
            <Box sx={{ textAlign: 'center', mb: 4 }}>
              <Box
                component="img"
                src="https://www.stockland.com.au/contentassets/dc8ad9373bcb4f25a11b4cd5ad90c282/stockland-logo-long.svg"
                alt="Stockland"
                sx={{
                  width: '150px',
                }}
              />
              <Typography variant="h5" sx={{ mb: 1, fontWeight: 500, color: '#296df6' }}>
                Login
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{
                  borderBottom: '1px solid #e0e0e0',
                  paddingBottom: '15px',
                  marginBottom: '15px',
                  fontWeight: 500,
                }}
              >
                Enter your details to login.
              </Typography>
            </Box>

            <Formik
              initialValues={{
                email: '',
                password: '',
              }}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ errors, touched, isSubmitting }) => (
                <Form>
                  <Box sx={{ mb: 3 }}>
                    <Typography variant="body2" sx={{ mb: 1 }}>
                      Email Address
                    </Typography>
                    <Box sx={{ position: 'relative' }}>
                      <Email
                        sx={{
                          position: 'absolute',
                          left: '10px',
                          top: '50%',
                          transform: 'translateY(-50%)',
                          color: '#718096',
                          fontSize: '20px',
                        }}
                      />
                      <StyledField name="email" type="email" placeholder="Enter your email" />
                    </Box>
                    {errors.email && touched.email && (
                      <Typography color="error" variant="caption">
                        {errors.email}
                      </Typography>
                    )}
                  </Box>

                  <Box sx={{ mb: 3 }}>
                    <Typography variant="body2" sx={{ mb: 1 }}>
                      Password
                    </Typography>
                    <Box sx={{ position: 'relative' }}>
                      <Lock
                        sx={{
                          position: 'absolute',
                          left: '10px',
                          top: '50%',
                          transform: 'translateY(-50%)',
                          color: '#718096',
                          fontSize: '20px',
                        }}
                      />
                      <StyledField
                        name="password"
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Enter your password"
                      />
                      <InputAdornment
                        position="end"
                        sx={{ position: 'absolute', right: 8, top: '50%', transform: 'translateY(-50%)' }}
                      >
                        <IconButton onClick={handleTogglePassword} size="small">
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    </Box>
                    {errors.password && touched.password && (
                      <Typography color="error" variant="caption">
                        {errors.password}
                      </Typography>
                    )}
                  </Box>

                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                    <FormControlLabel
                      control={<Field as={Checkbox} name="keepLoggedIn" size="small" />}
                      label={<Typography variant="body2">Keep me logged in</Typography>}
                    />
                    <Link
                      to="/forgot-password"
                      style={{ color: '#1d1d1d', textDecoration: 'underline', fontSize: '0.875rem' }}
                    >
                      Forgot password ?
                    </Link>
                  </Box>

                  <StyledButton type="submit" variant="contained" disabled={isSubmitting || loading}>
                    {isSubmitting || loading ? 'Logging in...' : 'Login'}
                  </StyledButton>

                  {error && (
                    <Typography color="error" variant="body2" sx={{ mt: 2, textAlign: 'center' }}>
                      {error}
                    </Typography>
                  )}
                </Form>
              )}
            </Formik>
          </Box>
          <Box sx={{ textAlign: 'center', mt: 3 }}>
            <Typography variant="body2">
              Don&apos;t have an account?{' '}
              <Link to="/register" style={{ color: '#1a73e8', textDecoration: 'underline' }}>
                Register
              </Link>
            </Typography>
          </Box>
        </StyledForm>
      </FormContainer>
    </BackgroundContainer>
  );
}
