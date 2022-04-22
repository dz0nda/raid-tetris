import React from 'react';
import { Container, Grid, Typography } from '@mui/material';

// import LoginContainer from '../../containers/Login/LoginContainer';

const Game = () => (
  <Container maxWidth="sm" style={{ height: '100%' }}>
    <Grid container alignItems="center" style={{ height: '100%' }}>
      <Grid item xs>
        {/* <LoginContainer /> */}
        <Typography>
          Hello Gane
        </Typography>
      </Grid>
    </Grid>
  </Container>
);

export default Game;
