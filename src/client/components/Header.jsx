import React from 'react'
import PropTypes from 'prop-types'
import { useSelector, useDispatch, connect } from 'react-redux'
import { AppBar, Grid, IconButton, Typography } from '@mui/material'
import HomeIcon from '@mui/icons-material/Home'
import { actions } from '../store/reducers';

// import HeaderLogo from './HeaderLogo';
// import HeaderHomeContainer from '../../containers/Header/HeaderHomeContainer';
// import HeaderStateContainer from '../../containers/Header/HeaderStateContainer';
import logo from '../assets/header.png'

function Header(props) {
  const { reqLogout } = props;
  const infos = useSelector((state) => state.app.infos)

  return (
    <AppBar position="static" color="inherit">
      <Grid container alignItems="center" justifyContent="center">
        <Grid item xs={3} justifyContent="center">
          <Grid container justifyContent="center">
            <IconButton onClick={reqLogout}>
              <HomeIcon />
            </IconButton>
          </Grid>
        </Grid>
        <Grid item xs={6}>
          <Grid container justifyContent="center">
            <img src={logo} width="35%" alt="Logo" />
          </Grid>
        </Grid>
        <Grid item xs={3}>
          <Grid container direction="column" alignItems="center">
            <Grid item>
              <Typography variant="caption">
                {infos.nbPlayers}
                {infos.nbPlayers > 1 ? ' players' : ' player'}
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="caption">
                {infos.nbGames}
                {infos.nbGames > 1 ? ' rooms' : ' room'}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </AppBar>
  )
}


Header.propTypes = {
  reqLogout: PropTypes.func.isRequired,
};

const mapDispatchToProps = {
  reqLogout: actions.reqLogout
}

export default connect(null, mapDispatchToProps)(Header)
