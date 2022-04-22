import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Grid from '@mui/material/Grid';

// import params from '../../shared/params';
// import actions from '../actions';

import Login from './pages/Login';
import Game from './pages/Game';
import Header from './components/Header';
import Footer from './components/Footer';

const App = (props) => {
//   const { connected, reqConnect } = props;
//   const { host, port } = params.server;

//   if (!connected) reqConnect({ host, port });

  return (
    <Grid container direction="column" justify="space-between" style={{ height: '100vh' }}>
      <Grid item style={{ height: '7vh' }}>
        <Header />
      </Grid>
      <Grid item style={{ height: '65vh' }}>
          <BrowserRouter>
            <Routes>
                <Route exact path="/" element={<Login />} />
                <Route path="/:room[:name]" element={<Game />} />
                {/* <Route component={Error404} /> */}
            </Routes>
          </BrowserRouter>
        {/* <Backdrop
            className={classes.backdrop}
            open={!connected || isLoading || width < 600 || height < 420}
            transitionDuration={500}
        >
            <CircularProgress color="primary" />
        </Backdrop> */}
      </Grid>
      <Grid item style={{ height: '5vh' }}>
        <Footer />
      </Grid>
    </Grid>
  );
};

App.propTypes = {
  connected: PropTypes.bool.isRequired,
  reqConnect: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
//   connected: state.app.connected,
    // isLoading: state.app.isLoading,
});

const mapDispatchToProps = {
//   reqConnect: actions.reqConnect,
};

// export default connect(mapStateToProps, mapDispatchToProps)(App);
export default App;
