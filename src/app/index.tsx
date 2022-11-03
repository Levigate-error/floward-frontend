import React, { FC } from 'react';
import GlobalStyle from 'styles/global';
import { ThemeProvider } from 'styled-components';
import Theme from 'styles/theme';
import Styled from 'styles/app';
import Layout from 'layouts/Layout';
import { Provider } from 'react-redux';
import store from 'store';
import { BrowserRouter } from 'react-router-dom';
import { SnackbarProvider } from 'notistack';
import { ErrorBoundary } from 'react-error-boundary';
import Routes from './routes';
import GlobalFunctionality from './globalFunctionality';
import ErrorFallback from './errorFallback';
import ApiProvider from './apiProvider';
import 'antd/dist/antd.min.css';

const App: FC = () => (
  <Provider store={store}>
    <ApiProvider>
      <ThemeProvider theme={Theme}>
        <SnackbarProvider maxSnack={3}>
          <GlobalStyle />
          <Styled.Wrapper>
            <ErrorBoundary
              FallbackComponent={ErrorFallback}
              onReset={() => {
                window.location.reload();
              }}
            >
              <BrowserRouter>
                <GlobalFunctionality />
                <Layout>
                  <Routes />
                </Layout>
              </BrowserRouter>
            </ErrorBoundary>
          </Styled.Wrapper>
        </SnackbarProvider>
      </ThemeProvider>
    </ApiProvider>
  </Provider>
);

export default App;
