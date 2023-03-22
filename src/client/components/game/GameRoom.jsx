import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { createUseStyles } from 'react-jss'
import {
  Container,
  Grid,
  AppBar,
  Box,
  // Button,
  Tabs,
  Tab,
  Paper,
  Slide,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography
} from '@mui/material'
import SupervisorAccount from '@mui/icons-material/SupervisorAccount'
// import { connect } from 'react-redux';

// import { playerStateProp, gameStateProp } from '../../reducers/reducers.types';
// import actions from '../../actions';
import {
  TABLE_PLAYERS_COLUMNS,
  TABLE_PLAYERS_RANK
} from '../../constants/tables'

// import GameRoom from '../../components/Game/GameRoom';
// import GameRank from '../../components/Game/GameRank';

import Button from '../common/Button'
import VList from '../common/VList'
import { actions } from '../../store/reducers/game'

import BoxInfo from '../common/BoxInfo'

const useStyles = createUseStyles({
  grid: {
    height: '100%'
  },
  gridItemInfos: {
    height: '33%'
  },
  box: {
    height: '100%'
  },
  tab: {
    fontWeight: 'bold'
  },
  paper: {
    height: '55vh'
  },
  boxRanking: {
    height: '100%'
  },
  tabRanking: {
    fontWeight: 'bold'
  },
  paperRanking: {
    height: '33vh'
  }
})

const Transition = React.forwardRef((props, ref) => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <Slide direction="up" ref={ref} {...props} />
))

function GameRoom(props) {
  const { name, room, settings, players, reqStartGame, reqOwner } = props
  const { owner, nbPlayers, nbLoosers } = settings
  const [open, setOpen] = useState(false)
  const playersList = Object.values(players)
  const classes = useStyles()

  const handleSetOwner = (newOwner) => reqOwner({ newOwner })

  useEffect(() => {
    if (nbPlayers !== 0 && nbLoosers === nbPlayers) setOpen(true)
    else setOpen(false)
  }, [nbLoosers, nbPlayers])

  const handleOpenRank = () => {
    setOpen(true)
  }

  const handleCloseRank = () => {
    setOpen(false)
  }

  return (
    <>
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        // className={classes.grid}
      >
        <Grid item sm={6} md={12}>
          <Box className={classes.box}>
            <AppBar
              position="static"
              color="default"
              elevation={0}
              sx={{ borderRadius: 1 }}
            >
              <Grid
                container
                justifyContent="space-between"
                alignItems="center"
              >
                <Grid item>
                  <Tabs value={0} indicatorColor="primary" textColor="primary">
                    <Tab
                      disabled
                      className={classes.tabRanking}
                      label="Players"
                      style={{ color: 'red' }}
                    />
                  </Tabs>
                </Grid>
                <Grid item>
                  <IconButton onClick={handleOpenRank}>
                    <SupervisorAccount fontSize="small" />
                  </IconButton>
                </Grid>
              </Grid>
            </AppBar>
            <Paper sx={{ height: '55vh' }} elevation={0}>
              <VList
                owner={owner}
                rowCount={playersList.length}
                rowGetter={({ index }) => playersList[index]}
                columns={TABLE_PLAYERS_COLUMNS}
              />
            </Paper>
          </Box>
        </Grid>
      </Grid>

      {/* Modal */}
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleCloseRank}
        fullWidth
      >
        <DialogTitle>
          <Typography variant="h5" style={{ color: 'red', fontWeight: 'bold' }}>
            PLAYERS
          </Typography>
        </DialogTitle>
        <DialogContent>
          <Paper className={classes.paper} elevation={0}>
            <VList
              owner={owner}
              rowCount={playersList.length}
              rowGetter={({ index }) => playersList[index]}
              columns={TABLE_PLAYERS_RANK}
              handleSetOwner={handleSetOwner}
            />
          </Paper>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseRank} title="Close" />
        </DialogActions>
      </Dialog>
    </>
  )
}

{
  /* <GameRank
  settings={settings}
  players={players}
  open={open}
  handleClose={handleCloseRank}
  handleSetOwner={handleSetOwner}
/> */
}
// GameRoomContainer.propTypes = {
//   name: playerStateProp.name.isRequired,
//   room: gameStateProp.room.isRequired,
//   settings: gameStateProp.settings.isRequired,
//   players: gameStateProp.players.isRequired,
//   reqStartGame: PropTypes.func.isRequired,
//   reqOwner: PropTypes.func.isRequired,
// };

// GameRoom.defaultProps = {
//   name: 'name',
//   room: 'room',
//   settings: {
//     owner: 'user1',
//     started: false,
//     status: 'stop',
//     dropTime: 1500,
//     nbLoosers: 0,
//     nbPlayers: 1,
//     pieces: []
//   },
//   players: [],
//   reqStartGame: () => {
//     console.log('reqStartGame')
//   },
//   reqOwner: () => {
//     console.log('reqOwner')
//   }
// }

const mapStateToProps = (state) => ({
  name: state.player.name,
  room: state.game.room,
  settings: state.game.settings,
  players: state.game.players
})

const mapDispatchToProps = {
  reqStartGame: actions.reqStartGame,
  reqOwner: actions.reqOwner
}

// export default connect(mapStateToProps, mapDispatchToProps)(GameRoomContainer);
export default connect(mapStateToProps, mapDispatchToProps)(GameRoom)
