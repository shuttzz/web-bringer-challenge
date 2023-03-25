// @mui
import {
  Alert,
  Container,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import Page from '../components/Page';
import { styled } from '@mui/material/styles';
import { useEffect, useState } from 'react';

import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useAuthMutation } from '../hooks/auth/queries';
import { FormProvider, RHFTextField } from '../components/hook-form';
import Iconify from '../components/Iconify';
import { LoadingButton } from '@mui/lab';
import { useToken } from '../hooks/useToken';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex',
  },
}));

const ContentStyle = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  padding: theme.spacing(12, 0),
}));

type FormValuesProps = {
  email: string;
  password: string;
  afterSubmit?: string;
};

export default function Auth() {
  const [showPassword, setShowPassword] = useState(false);
  const [token, setToken] = useState('');

  const storeToken = useToken();

  useEffect(() => {
    setToken(storeToken.token);
  }, [storeToken.token]);

  const useAuthJWT = useAuthMutation();

  const LoginSchema = Yup.object().shape({
    email: Yup.string().email('Email must be a valid email address').required('Email is required'),
    password: Yup.string().required('Password is required'),
  });

  const defaultValues = {
    email: '',
    password: '',
  };

  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(LoginSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { errors },
  } = methods;

  const onSubmit = async ({ email, password }: FormValuesProps) => {
    const response = await useAuthJWT.mutate({ email, password });
    console.log('RESPONSE NA TELA DE AUTH', useAuthJWT.data);
  };

  return (
    <Page title="Generate JWT">
      <RootStyle>
        <Container maxWidth={false}>
          <ContentStyle>
            <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
              <Stack spacing={3} sx={{ mb: 4 }}>
                {!!errors.afterSubmit && (
                  <Alert severity="error">{errors.afterSubmit.message}</Alert>
                )}

                <RHFTextField name="email" label="Email address" />

                <RHFTextField
                  name="password"
                  label="Password"
                  type={showPassword ? 'text' : 'password'}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                          <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Stack>

              <LoadingButton
                fullWidth
                size="large"
                type="submit"
                variant="contained"
                loading={useAuthJWT.isLoading}
              >
                Generate JWT
              </LoadingButton>
            </FormProvider>
          </ContentStyle>

          {token && (
            <TextField label="token" placeholder="Token" multiline value={token} fullWidth />
          )}
        </Container>
      </RootStyle>
    </Page>
  );
}
