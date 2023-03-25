import { useSnackbar } from 'notistack';
import { useMutation } from 'react-query';
import { api } from '../../../services/api';
import { useToken } from '../../useToken';

export type LoginData = {
  email: string;
  password: string;
};
export const useAuthMutation = () => {
  const { enqueueSnackbar } = useSnackbar();
  const storeToken = useToken();

  return useMutation((data: LoginData) => api.post(`auth/generate-jwt`, data), {
    onSuccess: async (response) => {
      storeToken.storeToken(response.data.token);
    },
    onError: (error) => {
      // @ts-ignore
      enqueueSnackbar(error.response.data.message, { variant: 'error' });
    },
  });
};
