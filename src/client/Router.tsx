import React, { FC, useEffect, useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
import { AppShell, useMantineTheme, LoadingOverlay } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
// import { useDisclosure } from '@mantine/hooks';

// import useWindowDimensions from './hooks/useWindowDimensions';
import { useAppDispatch, useAppSelector } from '@/client/store';
import { reqConnect, selectSocketConnected } from '@/client/store/reducers/socket';

import params from '../shared/params';
import { Header } from './pages/Header';
import { Footer } from './pages/Footer';

// import { Login } from './pages/Login';
import { Login } from './pages/Login2';
import { Game } from './pages/Game';
import { history } from './store';
import { GameAside } from './components/game/GameAside';
import { useSocketConnect } from './hooks/useSocketConnect';

export const Router: FC = () => {
  const { host, port } = params.server;
  const theme = useMantineTheme();
  // const connected = useSocketConnect();
  // const [opened, setOpened] = useState(false);
  // const { connected, reqConnect, isLoading } = props;
  // const connected = useAppSelector(selectSocketConnected);
  // const isLoading = useAppSelector(selectAppLoading);
  // const dispatch = useAppDispatch();
  // const { width, height } = useWindowDimensions();
  // const [visible, { toggle }] = useDisclosure(false);

  // useEffect(() => {
  //   if (!connected) {
  //     dispatch(reqConnect({}));
  //   }
  // }, [connected]);

  return (
    <ConnectedRouter history={history}>
      <Switch>
        <Route path="/:room[:name]" component={Game} />
        <Route path="/" component={Login} />
      </Switch>
    </ConnectedRouter>
  );
};
