import React from 'react'
// import { makeStyles } from '@material-ui/core/styles';
import { Container, Grid, Box, Paper, Card, CardContent } from '@mui/material'

import GameRoom from '../components/game/GameRoom'
import GameBoard from '../components/game/GameBoard'
import GameChat from '../components/game/GameChat'
import RoomInfo from '../components/game/RoomInfo'

function Game() {
  return (
    <Container maxWidth="lg">
          <Card>
            <CardContent>
      <Grid container direction="column">
        <Grid item xs>
              <RoomInfo />
        </Grid>
        <Grid item xs>
              <Grid
                container
                alignItems="center"
                >
                <Grid item xs>
                  <GameRoom />
                </Grid>
                <Grid
                  item
                  xs={5}
                  >
                  <GameBoard />
                </Grid>
                <Grid item xs sx={{ border: '1px solid black', heigh: '100%' }}>
                  <GameChat />
                </Grid>
              </Grid>
        </Grid>
      </Grid>
            </CardContent>
                  </Card>
    </Container>
  )
}

export default Game
