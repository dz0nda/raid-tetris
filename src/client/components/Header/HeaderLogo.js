import React from 'react';
import Grid from '@material-ui/core/Grid';

import logo from '../../img/header.png';

function HeaderLogo() {
  return (
    <Grid container justifyContent="center">
      <img src={logo} width="35%" alt="Logo" />
    </Grid>
  );
}

export default HeaderLogo;
