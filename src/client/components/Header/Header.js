import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Grid from '@material-ui/core/Grid';

import HeaderLogo from './HeaderLogo';
import HeaderHomeContainer from '../../containers/Header/HeaderHomeContainer';
import HeaderStateContainer from '../../containers/Header/HeaderStateContainer';

function Header() {
  return (
    <AppBar position="static" color="inherit">
      <Grid container alignItems="center">
        <Grid item xs={3}>
          <HeaderHomeContainer />
        </Grid>
        <Grid item xs={6}>
          <HeaderLogo />
        </Grid>
        <Grid item xs={3}>
          <HeaderStateContainer />
        </Grid>
      </Grid>
    </AppBar>
  );
}

export default Header;
