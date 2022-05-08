import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { playerStateProp, gameStateProp } from '../../reducers/reducers.types';
import actions from '../../actions';

import GameRoom from '../../components/Game/GameRoom';
import GameRank from '../../components/Game/GameRank';

function GameRoomContainer(props) {
  const { name, room, settings, players, reqStartGame, reqOwner } = props;
  const { nbPlayers, nbLoosers } = settings;
  const [open, setOpen] = useState(false);

  const handleStart = () => reqStartGame({ name, room });

  const handleSetOwner = (newOwner) => reqOwner({ newOwner });

  useEffect(() => {
    if (nbPlayers !== 0 && nbLoosers === nbPlayers) setOpen(true);
    else setOpen(false);
  }, [nbLoosers, nbPlayers]);

  const handleOpenRank = () => {
    setOpen(true);
  };

  const handleCloseRank = () => {
    setOpen(false);
  };

  return (
    <>
      <GameRoom
        name={name}
        room={room}
        settings={settings}
        players={players}
        handleStart={handleStart}
        handleOpen={handleOpenRank}
      />
      <GameRank
        settings={settings}
        players={players}
        open={open}
        handleClose={handleCloseRank}
        handleSetOwner={handleSetOwner}
      />
    </>
  );
}

GameRoomContainer.propTypes = {
  name: playerStateProp.name.isRequired,
  room: gameStateProp.room.isRequired,
  settings: gameStateProp.settings.isRequired,
  players: gameStateProp.players.isRequired,
  reqStartGame: PropTypes.func.isRequired,
  reqOwner: PropTypes.func.isRequired,
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

export default connect(mapStateToProps, mapDispatchToProps)(GameRoomContainer);
