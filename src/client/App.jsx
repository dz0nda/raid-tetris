import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Route, Switch } from 'react-router-dom'
import { SnackbarProvider } from 'notistack'
import { Grid, Backdrop, CircularProgress } from '@mui/material'

import params from '../shared/params'
import useWindowDimensions from './hooks/useWindowDimensions'
import Header from './pages/Header'
import Footer from './pages/Footer'
import Login from './pages/Login'
import Game from './pages/Game'
import Test from './components/login/test'
// import Game from './components/game/Game'
import Snackbar from './components/common/Snackbar'

import { actions } from './store/reducers'

function App(props) {
  const { host, port } = params.server
  const { connected, reqConnect, isLoading } = props
  const { width, height } = useWindowDimensions()

  useEffect(() => {
    if (!connected) {
      reqConnect({ host, port })
    }
  }, [connected])

  return (
    <Grid
      container
      direction="column"
      justifyContent="space-between"
      style={{ height: '100vh' }}
    >
      <Grid item>
        <Header />
      </Grid>
      <Grid item>
        <Switch>
          <Route path="/:room[:name]" component={Game} />
          <Route path="/" component={Login} />
        </Switch>
        <Backdrop
          // className={classes.backdrop}
          open={!connected || isLoading || width < 600 || height < 420}
          transitionDuration={500}
        >
          <CircularProgress color="primary" />
        </Backdrop>
        <SnackbarProvider maxSnack={3}>
          <Snackbar />
        </SnackbarProvider>
      </Grid>
      <Grid item>
        <Footer />
      </Grid>
    </Grid>
  )
}

// App.defaultProps = {
//   connected: true,
//   isLoading: false
// }

App.propTypes = {
  connected: PropTypes.bool.isRequired,
  reqConnect: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired
}

const mapStateToProps = (state) => ({
  connected: state.app.connected
})

const mapDispatchToProps = {
  reqConnect: actions.reqConnect
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
