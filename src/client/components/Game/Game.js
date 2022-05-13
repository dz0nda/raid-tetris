import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';

import GameRoomContainer from '../../containers/Game/GameRoomContainer';
import GameBoardContainer from '../../containers/Game/GameBoardContainer';
import GameChatContainer from '../../containers/Game/GameChatContainer';

const useStyles = makeStyles({
  container: {
    height: '100%',
    width: '100%',
  },
  card: {
    height: '100%',
  },
  grid: {
    height: '100%',
  },
  game: {
    height: '97%',
  },
  gridItem: {
    height: '100%',
    width: '100%',
  },
});

function Game() {
  const classes = useStyles();

  return (
    <Container maxWidth="lg" className={classes.container}>
      <Grid container spacing={2} alignItems="center" justifyContent="center" className={classes.gridItem}>
        <Grid item sm={12} md lg className={classes.game}>
          <GameRoomContainer />
        </Grid>
        <Grid item sm={6} md={4} lg={5} className={classes.game}>
          <GameBoardContainer />
        </Grid>
        <Grid item sm={6} md lg>
          <GameChatContainer className={classes.game} />
        </Grid>
      </Grid>
    </Container>
  );
}

export default Game;
