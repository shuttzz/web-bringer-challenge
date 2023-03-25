// @mui
import { Card, CircularProgress, Container, Stack } from '@mui/material';
import Timeline from '@mui/lab/Timeline';
import Page from '../components/Page';
import { FormProvider, RHFTextField } from '../components/hook-form';
import { LoadingButton } from '@mui/lab';
import { styled } from '@mui/material/styles';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import React, { useState } from 'react';
import { api } from '../services/api';
import { Track } from '../shared/api';
import CopyClipboard from '../components/CopyClipboard';
import TrackingEventsItem from './TrackingEventsItem';
import { useSnackbar } from 'notistack';

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
  trackingNumber: string;
};
export default function TrackingEvents() {
  const [track, setTrack] = useState<Track>({} as Track);
  const [isLoading, setIsLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  const TrackEventsSchema = Yup.object().shape({
    trackingNumber: Yup.string().required('Tracking Number is required'),
  });

  const defaultValues = {
    trackingNumber: '',
  };

  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(TrackEventsSchema),
    defaultValues,
  });

  const { handleSubmit } = methods;

  const onSubmit = async ({ trackingNumber }: FormValuesProps) => {
    try {
      setIsLoading(true);
      const { data } = await api.get<Track>('tracking/events', {
        params: {
          trackingNumber,
        },
      });

      setTrack(data);
    } catch (error: any) {
      console.log('Error', error);
      enqueueSnackbar(error.response.data.message, { variant: 'error' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Page title="Track Events">
      <RootStyle>
        <Container maxWidth={false}>
          <ContentStyle>
            <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
              <Stack spacing={3} sx={{ mb: 4 }}>
                <RHFTextField name="trackingNumber" label="Tracking Number" />
              </Stack>

              <LoadingButton
                fullWidth
                size="large"
                type="submit"
                variant="contained"
                loading={isLoading}
              >
                Search
              </LoadingButton>
            </FormProvider>
          </ContentStyle>

          {(Object.keys(track).length > 0 || isLoading) && (
            <Card sx={{ p: 3, mt: 3 }}>
              {isLoading ? (
                <Stack spacing={2} alignItems={'center'} justifyContent={'center'}>
                  <CircularProgress />
                </Stack>
              ) : (
                <Stack spacing={2}>
                  <Stack
                    spacing={2}
                    direction="row"
                    alignItems="center"
                    justifyContent="space-around"
                  >
                    <CopyClipboard
                      value={track?.label?.tracking_number}
                      placeholder="Tracking Number"
                      label="Tracking Number"
                      size="small"
                    />

                    <CopyClipboard
                      value={track?.label?.external_tracking_number}
                      placeholder="External Tracking Number"
                      label="External Tracking Number"
                      size="small"
                    />
                  </Stack>

                  <Timeline sx={{ mt: 2 }}>
                    {track?.parcel_tracking_items?.map((parcelTrackingItem, index) => (
                      <TrackingEventsItem
                        key={index}
                        item={parcelTrackingItem}
                        lastTrackingItem={index === 0}
                        firstTrackingItem={track?.parcel_tracking_items?.length - 1 === index}
                      />
                    ))}
                  </Timeline>
                </Stack>
              )}
            </Card>
          )}
        </Container>
      </RootStyle>
    </Page>
  );
}
