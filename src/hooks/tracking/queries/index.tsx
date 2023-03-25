import { api } from '../../../services/api';
import { Track } from '../../../shared/api';
import { useQuery } from 'react-query';
import { useSnackbar } from 'notistack';

export const fetchTrackingEvents = async (trackingNumber: string): Promise<Track> => {
  if (!trackingNumber) {
    return {} as Track;
  }

  const { data } = await api.get<Track>('tracking/events', {
    params: {
      trackingNumber,
    },
  });

  console.log('COMO FICOU O RESULTADO', data);

  return data;
};

export const useTrackingEvents = (trackingNumber: string) => {
  const { enqueueSnackbar } = useSnackbar();

  return useQuery<Track, Error>(['tracking-key'], () => fetchTrackingEvents(trackingNumber), {
    onError: (error: Error) => {
      // @ts-ignore
      enqueueSnackbar(error.response.data.message, { variant: 'error' });
    },
  });
};
