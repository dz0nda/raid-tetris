import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { ThemeProvider } from '@emotion/react';
import { ConnectedRouter } from 'connected-react-router';
import { CssBaseline } from '@mui/material';

// import '@fontsource/roboto/300.css'
// import '@fontsource/roboto/400.css'
// import '@fontsource/roboto/500.css'
// import '@fontsource/roboto/700.css'

import store, { history } from './store';
import theme from './theme';
import App from './App';

createRoot(document.getElementById('tetris')).render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <ConnectedRouter history={history}>
        <CssBaseline />
        <App />
      </ConnectedRouter>
    </ThemeProvider>
  </Provider>,
);
