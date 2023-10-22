import React, { FC } from 'react';
import { AppShell, MantineProvider, useMantineTheme } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import { ConnectedRouter } from 'connected-react-router';
import { Route, Switch } from 'react-router-dom';

import { Footer } from './pages/common/Footer';

import { history } from './store';
import { Header } from './pages/common/Header';
import { Tetris } from './components/board/Tetris';

export const App: FC = () => {
  const theme = useMantineTheme();

  const mantineTheme = {
    main: {
      background: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
    },
  };

  return (
    <MantineProvider withNormalizeCSS withGlobalStyles>
      <Notifications />
      <AppShell
        styles={mantineTheme}
        layout="default"
        navbarOffsetBreakpoint="md"
        // asideOffsetBreakpoint="sm"
        // navbar={<GameAside />}
        // aside={<GameAside />}
        footer={<Footer />}
        header={<Header />}
      >
        <ConnectedRouter history={history}>
          <Switch>
            {/* <Route path="/:room[:name]" component={Game} /> */}
            <Route path="/" component={Tetris} />
          </Switch>
        </ConnectedRouter>
      </AppShell>
    </MantineProvider>
  );
};
