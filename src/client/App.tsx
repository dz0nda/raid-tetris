import React, { FC } from 'react';
import { Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { AppShell, MantineProvider, useMantineTheme } from '@mantine/core';
import { Notifications } from '@mantine/notifications';

import { history, store } from './store';

import { Footer } from './pages/common/Footer';
import { Header } from './pages/common/Header';
import { GameAside } from './components/game/GameAside';
import { Game } from './pages/Game';

export const App: FC = () => {
  const theme = useMantineTheme();

  const mantineTheme = {
    main: {
      background: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.white,
      radius: theme.radius.md,
    },
  };

  return (
    <React.StrictMode>
      <Provider store={store}>
        {/* <AuthenticationModal /> */}
        <MantineProvider
          withNormalizeCSS
          withGlobalStyles
          theme={{
            fontFamily: 'Greycliff CF, sans-serif',
            fontFamilyMonospace: 'Monaco, Courier, monospace',
            headings: { fontFamily: 'Greycliff CF, sans-serif' },
          }}
        >
          <Notifications />
          <AppShell
            styles={mantineTheme}
            layout="default"
            // navbarOffsetBreakpoint="md"
            // asideOffsetBreakpoint="sm"
            navbar={<GameAside />}
            // aside={<GameAside />}
            footer={<Footer />}
            header={<Header />}
          >
            <ConnectedRouter history={history}>
              <Switch>
                {/* <Route path="/:room[:name]" component={Game} /> */}
                <Route path="/" component={Game} />
              </Switch>
            </ConnectedRouter>
          </AppShell>
        </MantineProvider>
      </Provider>
    </React.StrictMode>
  );
};
