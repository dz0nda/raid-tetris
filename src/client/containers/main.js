import React from 'react';
import PropTypes from 'prop-types';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';
import { SnackbarProvider } from 'notistack';

import useWindowDimensions from '../hooks/useWindowDimensions';

import Snackbar from './Snackbar';
import Login from '../components/Login/Login';
import Game from '../components/Game/Game';
import Error404 from '../components/Common/Error404';

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));

function Main(props) {
  const { connected, isLoading } = props;
  const classes = useStyles();
  const { width, height } = useWindowDimensions();

  return (
    <>
      <Switch>
        <Route path="/:room[:name]" component={Game} />
        {/* <Route path="/" component={Login} /> */}
        <Route component={Login} />
      </Switch>
      <Backdrop
        className={classes.backdrop}
        open={!connected || isLoading || width < 600 || height < 420}
        transitionDuration={500}
      >
        <CircularProgress color="primary" />
      </Backdrop>
      <SnackbarProvider maxSnack={3}>
        <Snackbar />
      </SnackbarProvider>
    </>
  );
}

Main.propTypes = {
  connected: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  isLoading: state.app.isLoading,
});

export default connect(mapStateToProps)(Main);
