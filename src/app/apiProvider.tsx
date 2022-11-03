import React, { FC, memo } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      staleTime: 0,
      cacheTime: 0,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      retryOnMount: false,
    },
  },
});

const ApiProvider: FC = memo(({ children }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
));

ApiProvider.displayName = 'ApiProvider';

export default ApiProvider;
