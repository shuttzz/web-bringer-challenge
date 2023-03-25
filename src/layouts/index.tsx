import { Outlet } from 'react-router-dom';
// @mui
import { Box, Container } from '@mui/material';
import Header from './Header';

export default function AppLayout() {
  return (
    <Box
      sx={{
        display: { lg: 'flex' },
        minHeight: { lg: 1 },
      }}
    >
      <Header />

      <Container sx={{ marginTop: 8 }}>
        <Outlet />
      </Container>
    </Box>
  );
}
