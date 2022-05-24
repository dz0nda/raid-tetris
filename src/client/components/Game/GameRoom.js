import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';

import { TABLE_PLAYERS_COLUMNS } from '../../constants/tables';

import { gameStateProp, playerStateProp } from '../../reducers/reducers.types';
import RedIconButton from '../Common/RedIconButton';
import BoxInfo from '../Common/BoxInfo';
import RedButton from '../Common/RedButton';

import VirtualizedList from '../Common/VirtualizedList';

const useStyles = makeStyles({
  grid: {
    height: '100%',
  },
  gridItemInfos: {
    height: '33%',
  },
  box: {
    height: '100%',
  },
  tab: {
    fontWeight: 'bold',
  },
  paper: {
    height: '30vh',
  },
  boxRanking: {
    height: '100%',
  },
  tabRanking: {
    fontWeight: 'bold',
  },
  paperRanking: {
    height: '33vh',
  },
});

function GameRoom(props) {
  const { name, room, settings, players, handleStart, handleOpen } = props;
  const { owner, started } = settings;
  const classes = useStyles();
  const playersList = Object.values(players);

  const renderPlayersHeader = () => {
    return (
      <AppBar position="static" color="default">
        <Grid container justifyContent="space-between" alignItems="center">
          <Grid item>
            <Tabs value={0} indicatorColor="primary" textColor="primary">
              <Tab disabled className={classes.tabRanking} label="Players" style={{ color: 'red' }} />
            </Tabs>
          </Grid>
          <Grid item>
            <RedIconButton onClick={handleOpen}>
              <SupervisorAccountIcon fontSize="small" />
            </RedIconButton>
          </Grid>
        </Grid>
      </AppBar>
    );
  };

  return (
    <Grid container justifyContent="center" alignItems="center" className={classes.grid}>
      <Grid item sm={6} md={10}>
        <Box className={classes.box}>
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <BoxInfo field="Logged as" value={name} className="roomName" id="roomName" />
            </Grid>
            <Grid item xs={6}>
              <BoxInfo field="room name" value={room} />
            </Grid>
            <Grid item xs={6}>
              <BoxInfo field="room owner" value={owner} />
            </Grid>
            <Grid item xs={12}>
              <RedButton
                className="startButton"
                name="start game"
                handleSubmit={handleStart}
                disabled={started || !(name === owner)}
              />
            </Grid>
          </Grid>
        </Box>
      </Grid>
      <Grid item sm={6} md={12}>
        <Box className={classes.box}>
          {renderPlayersHeader()}
          <Paper variant="outlined" className={classes.paper} elevation={0}>
            <VirtualizedList
              owner={owner}
              rowCount={playersList.length}
              rowGetter={({ index }) => playersList[index]}
              columns={TABLE_PLAYERS_COLUMNS}
            />
          </Paper>
        </Box>
      </Grid>
    </Grid>
  );
}

GameRoom.propTypes = {
  name: playerStateProp.name.isRequired,
  room: gameStateProp.room.isRequired,
  settings: gameStateProp.settings.isRequired,
  players: gameStateProp.players.isRequired,
  handleStart: PropTypes.func.isRequired,
  handleOpen: PropTypes.func.isRequired,
};

export default GameRoom;
