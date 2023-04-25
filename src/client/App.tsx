import React, { FC, useEffect, useState } from 'react';
import { AppShell, useMantineTheme } from '@mantine/core';
// import { useSelector, useDispatch } from 'react-redux'
// import { connect } from 'react-redux';
import { Notifications } from '@mantine/notifications';

import params from '../shared/params';
import useWindowDimensions from './hooks/useWindowDimensions';
import { Header } from './pages/Header';
import { Footer } from './pages/Footer';

// import { actions } from './store/reducers/app';
import { reqConnect } from './store/reducers/app';
import { selectAppConnected, selectAppLoading } from './store/reducers/app';
import { useAppDispatch, useAppSelector } from './store';

import { Router } from './Router';
// interface AppProps {
//   connected: boolean;
//   reqConnect: (payload: { host: string; port: string }) => void;
//   isLoading: boolean;
// }

export const App: FC = () => {
  const { host, port } = params.server;
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);
  // const { connected, reqConnect, isLoading } = props;
  const connected = useAppSelector(selectAppConnected);
  const isLoading = useAppSelector(selectAppLoading);
  const dispatch = useAppDispatch();
  const { width, height } = useWindowDimensions();

  useEffect(() => {
    if (!connected) {
      dispatch(reqConnect({ host, port }));
    }
  }, [connected]);

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
        <Router />
        {/* <Switch>
          <Route path="/:room[:name]" component={Game} />
          <Route path="/" component={Login} />
        </Switch> */}
      </AppShell>
    </>
  );
  // return (
  //   <Grid container direction="column" justifyContent="space-between" style={{ height: '100vh' }}>
  //     <Grid item>
  //       <Header />
  //     </Grid>
  //     <Grid item>
  //       <Switch>
  //         <Route path="/" component={Game} />
  //         {/* <Route path="/" component={Login} /> */}
  //       </Switch>
  //       <Backdrop
  //         // className={classes.backdrop}
  //         open={!connected || isLoading || width < 600 || height < 420}
  //         transitionDuration={500}
  //       >
  //         <CircularProgress color="primary" />
  //       </Backdrop>
  //       <SnackbarProvider maxSnack={3}>
  //         <Snackbar />
  //       </SnackbarProvider>
  //     </Grid>
  //     <Grid item>
  //       <Footer />
  //     </Grid>
  //   </Grid>
  // );
};

// App.defaultProps = {
//   connected: true,
//   isLoading: false
// }

// App.propTypes = {
//   connected: PropTypes.bool.isRequired,
//   reqConnect: PropTypes.func.isRequired,
//   isLoading: PropTypes.bool.isRequired,
// };

// const mapStateToProps = (state) => ({
//   connected: state.app.connected,
// });

// const mapDispatchToProps = {
//   reqConnect: actions.reqConnect,
// };

// export const App = connect(mapStateToProps, mapDispatchToProps)(AppComponent);
