import {
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineItem,
  TimelineOppositeContent,
  TimelineSeparator,
} from '@mui/lab';
import { Typography } from '@mui/material';
import { useMemo } from 'react';
import { ParcelTrackingItem } from '../shared/api';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

type TrackEventsItemProps = {
  item: ParcelTrackingItem;
  lastTrackingItem?: boolean;
  firstTrackingItem?: boolean;
};

export default function TrackingEventsItem({
  item,
  lastTrackingItem = false,
  firstTrackingItem = false,
}: TrackEventsItemProps) {
  const date = useMemo(
    () =>
      new Date(item.timestamp).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: '2-digit',
      }),
    [item.timestamp]
  );

  const hour = useMemo(
    () =>
      new Date(item.timestamp).toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
      }),
    [item.timestamp]
  );

  const status = useMemo(
    () =>
      item.tracking_code?.tracking_code_locales[0].description.toLocaleUpperCase() ||
      item.tracking_code_vendor?.tracking_code.tracking_code_locales[0].description.toLocaleUpperCase() ||
      'N/A',
    [
      item.tracking_code?.tracking_code_locales,
      item.tracking_code_vendor?.tracking_code.tracking_code_locales,
    ]
  );

  const getIconOrNot = (status: string) => {
    if (status === 'DELIVERED') {
      return <CheckCircleOutlineIcon />;
    } else if (firstTrackingItem) {
      return <LocalShippingIcon />;
    } else {
      return '';
    }
  };

  console.log('COMO É O ITEM', item);

  const location = useMemo(
    () =>
      `${item.location?.toLocaleUpperCase() ?? 'N/A'}, ${
        item.state?.toLocaleUpperCase() ?? 'N/A'
      }, ${item.city?.toLocaleUpperCase() ?? 'N/A'},`,
    [item.city, item.state]
  );

  const country = useMemo(() => item.country.name.toLocaleUpperCase(), [item.country.name]);

  return (
    <TimelineItem>
      <TimelineOppositeContent color="text.secondary">
        <Typography variant="body1">
          {date}
          <br />
        </Typography>
        <Typography variant="caption">{hour}</Typography>
      </TimelineOppositeContent>
      <TimelineSeparator>
        <TimelineDot color={lastTrackingItem ? 'success' : 'grey'}>
          {getIconOrNot(status)}
        </TimelineDot>
        <TimelineConnector />
      </TimelineSeparator>
      <TimelineContent>
        <Typography variant="body1">
          {status}
          <br />
        </Typography>
        <Typography variant="caption" color="text.secondary">
          {location}
          <br />
        </Typography>
        <Typography variant="caption" color="text.secondary">
          {country}
        </Typography>
      </TimelineContent>
    </TimelineItem>
  );
}
