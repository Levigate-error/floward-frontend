import React, {
  FC,
  Suspense,
  lazy,
} from 'react';
import {
  Route, Routes as RouterRoutes,
} from 'react-router-dom';
import Loading from 'components/Loading';
import PAGE_SLUGS from 'consts/pageSlugs';

const CountryListingTablePage = lazy(() => import('pages/CountryListing'));
const CountryDetailsTablePage = lazy(() => import('pages/CountryDetails'));
const AuthPage = lazy(() => import('pages/Auth'));

const Routes: FC = () => (
  <RouterRoutes>
    <Route
      path={`/${PAGE_SLUGS.Auth}`}
      element={(
        <Suspense fallback={<Loading />}>
          <AuthPage />
        </Suspense>
      )}
    />
    <Route
      path={`/${PAGE_SLUGS.CountryListing}`}
      element={(
        <Suspense fallback={<Loading />}>
          <CountryListingTablePage />
        </Suspense>
      )}
    />
    <Route
      path={`/${PAGE_SLUGS.CountryDetails}/:id`}
      element={(
        <Suspense fallback={<Loading />}>
          <CountryDetailsTablePage />
        </Suspense>
      )}
    />
  </RouterRoutes>
);

export default Routes;
