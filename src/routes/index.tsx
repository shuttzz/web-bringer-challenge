import { ElementType, lazy, Suspense } from 'react';
import { Navigate, useLocation, useRoutes } from 'react-router-dom';
// layouts
import AppLayout from '../layouts';
// components
import LoadingScreen from '../components/LoadingScreen';

// ----------------------------------------------------------------------

const Loadable = (Component: ElementType) => (props: any) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { pathname } = useLocation();

  return (
    <Suspense fallback={<LoadingScreen isDashboard={pathname.includes('/dashboard')} />}>
      <Component {...props} />
    </Suspense>
  );
};

export default function Router() {
  return useRoutes([
    {
      path: '/',
      element: <AppLayout />,
      children: [
        { path: '/', element: <Navigate to="/auth" replace />, index: true },
        { path: '/auth', element: <Auth /> },
        { path: '/tracking-events', element: <PageThree /> },
      ],
    },
  ]);
}

// Dashboard
const Auth = Loadable(lazy(() => import('../pages/Auth')));
const PageThree = Loadable(lazy(() => import('../pages/TrackingEvents')));
