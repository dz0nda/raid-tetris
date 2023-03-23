import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createUseStyles } from 'react-jss';
import { Container, Grid, AppBar, Box, Tabs, Tab, Paper, Typography } from '@mui/material';
// import { connect } from 'react-redux';

import { playerStateProp, gameStateProp } from '../../store/reducers/types';
// import actions from '../../actions';
import { TABLE_PLAYERS_COLUMNS } from '../../constants/tables';

// import GameRoom from '../../components/Game/GameRoom';
// import GameRank from '../../components/Game/GameRank';

import VList from '../common/VList';
import { actions } from '../../store/reducers/game';

import BoxInfo from '../common/BoxInfo';
import Button from '../common/Button';

const useStyles = createUseStyles({
  grid: {
    // height: '100%'
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

function RoomInfo(props) {
  const { name, room, settings, reqStartGame } = props;
  const { owner, started } = settings;

  const handleStart = () => reqStartGame({ name, room });

  return (
    <Grid container justifyContent="space-between" alignItems="center">
      <Grid item xs>
        <Grid container spacing={1} alignItems="center" sx={{ border: '1px solid black' }}>
          <Grid item xs={4}>
            <BoxInfo field="Logged as" value={name} className="roomName" id="roomName" />
          </Grid>
          <Grid item xs={4}>
            <BoxInfo field="room name" value={room} />
          </Grid>
          <Grid item xs={4}>
            <BoxInfo field="room owner" value={owner} />
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs container justifyContent="flex-end" alignItems="center" style={{ border: '1px solid black' }}>
        <Box>
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <Button title="Start Game" onClick={handleStart} disabled={started || !(name === owner)} />
            </Grid>
          </Grid>
        </Box>
      </Grid>
    </Grid>
  );
}

RoomInfo.propTypes = {
  name: PropTypes.string.isRequired,
  room: PropTypes.string.isRequired,
  settings: gameStateProp.settings.isRequired,
  reqStartGame: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  name: state.player.name,
  room: state.game.room,
  settings: state.game.settings,
  players: state.game.players,
});

const mapDispatchToProps = {
  reqStartGame: actions.reqStartGame,
  reqOwner: actions.reqOwner,
};

// export default connect(mapStateToProps, mapDispatchToProps)(GameRoomContainer);
export default connect(mapStateToProps, mapDispatchToProps)(RoomInfo);
