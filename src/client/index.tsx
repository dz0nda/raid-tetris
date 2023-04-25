import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { ThemeProvider } from '@emotion/react';
import { ConnectedRouter } from 'connected-react-router';
import { CssBaseline } from '@mui/material';

// import '@fontsource/roboto/300.css'
// import '@fontsource/roboto/400.css'
// import '@fontsource/roboto/500.css'
// import '@fontsource/roboto/700.css'

import { store, history } from './store';
import theme from './theme';
import { App } from './App';

const root = ReactDOM.createRoot(document.getElementById('tetris') as HTMLElement);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
);
