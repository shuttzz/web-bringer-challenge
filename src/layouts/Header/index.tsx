// @mui
import { AppBar, Button, Stack, useTheme } from '@mui/material';
import { Link } from 'react-router-dom';

export default function Header() {
  const theme = useTheme();

  return (
    <AppBar
      sx={{
        bgcolor: theme.palette.background.paper,
        height: 50,
        justifyContent: 'center',
      }}
    >
      <Stack direction="row" spacing={2} justifyContent="center">
        <Button component={Link} to="/auth" variant="contained">
          Auth JWT
        </Button>

        <Button component={Link} to="/tracking-events" variant="contained">
          Track Events
        </Button>
      </Stack>
    </AppBar>
  );
}
