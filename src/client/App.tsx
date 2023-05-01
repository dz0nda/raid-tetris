import React, { FC } from 'react';
import { AppShell, useMantineTheme } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
// import { useDisclosure } from '@mantine/hooks';

// import useWindowDimensions from './hooks/useWindowDimensions';

import params from '../shared/params';
import { Header } from './pages/Header';
import { Footer } from './pages/Footer';

// import { Login } from './pages/Login';
import { GameAside } from './components/game/GameAside';
import { useSocketConnect } from './hooks/useSocketConnect';
import { Router } from './Router';

export const App: FC = () => {
  const { host, port } = params.server;
  const theme = useMantineTheme();
  const connected = useSocketConnect();
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
    <>
      <Notifications />
      <AppShell
        styles={{
          main: {
            background: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
          },
        }}
        navbarOffsetBreakpoint="sm"
        asideOffsetBreakpoint="sm"
        // navbar={
        //   <Navbar p="md" hiddenBreakpoint="sm" hidden={!opened} width={{ sm: 200, lg: 300 }}>
        //     <Text>Application navbar</Text>
        //   </Navbar>
        // }
        aside={<GameAside />}
        // aside={
        //   // <MediaQuery smallerThan="sm" styles={{ display: 'none' }}>
        //   <Aside p="md" hiddenBreakpoint="sm" width={{ sm: 200, lg: 300 }}>
        //     <Text>Application sidebar</Text>
        //   </Aside>
        //   // </MediaQuery>
        // }
        footer={<Footer />}
        header={<Header />}
      >
        {/* <LoadingOverlay visible={visible} overlayBlur={2} /> */}
        <Router />
        {/* <ConnectedRouter history={history}>
          <Switch>
            <Route path="/:room[:name]" component={Game} />
            <Route path="/" component={Login} />
          </Switch>
        </ConnectedRouter> */}
      </AppShell>
    </>
  );
};
