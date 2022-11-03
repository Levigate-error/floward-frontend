import React, {
  FC, lazy, Suspense, useMemo,
} from 'react';
import { State } from 'store/types';
import { useSelector } from 'react-redux';
import { AvailableLayouts, LayoutProps } from './types';

const AuthedLayout = lazy(() => import('layouts/Authed'));
const NotAuthedLayout = lazy(() => import('layouts/NotAuthed'));
const Loading = lazy(() => import('components/Loading'));

const Layout: FC<LayoutProps> = ({ children }) => {
  const { user } = useSelector((state: State) => state.auth);

  const layout = useMemo<AvailableLayouts | null>(() => (
    user ? 'authed' : 'not-authed'), [user]);

  switch (layout) {
    case 'authed':
      return (
        <Suspense fallback={null}>
          <AuthedLayout>
            {children}
          </AuthedLayout>
        </Suspense>
      );
    case 'not-authed':
      return (
        <Suspense fallback={null}>
          <NotAuthedLayout>
            {children}
          </NotAuthedLayout>
        </Suspense>
      );
    default:
      return (
        <Suspense fallback={null}>
          <Loading />
        </Suspense>
      );
  }
};

export default Layout;
