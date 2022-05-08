import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { keys } from '../../constants/keys';
import useKey from '../../hooks/useKey';
import useInterval from '../../hooks/useInterval';
import { playerStateProp, settingsProp } from '../../reducers/reducers.types';
import actions from '../../actions';

import GameBoard from '../../components/Game/GameBoard';
import GameLoose from '../../components/Game/GameLoose';

function GameBoardContainer(props) {
  const { settings, player, reqMove } = props;
  const { started, nbPlayers } = settings;
  const { stage, stagePiece, score, lines, mallus, rank, dropTime, loose, win } = player;
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    setOpen(loose || win);
  }, [loose, win]);

  const handleCloseLoose = () => {
    setOpen(false);
  };

  useInterval(() => reqMove({ keyCode: keys.KDOWN }), started, dropTime);
  useKey((event) => reqMove({ keyCode: event.keyCode }), started, loose);

  return (
    <>
      <GameBoard
        stage={stage}
        pieceOne={stagePiece[0]}
        pieceTwo={stagePiece[1]}
        score={score}
        lines={lines}
        mallus={mallus}
      />
      <GameLoose rank={rank} nbPlayers={nbPlayers} open={open} handleClose={handleCloseLoose} />
    </>
  );
}

GameBoardContainer.propTypes = {
  settings: PropTypes.shape(settingsProp).isRequired,
  player: PropTypes.shape(playerStateProp).isRequired,
  reqMove: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  settings: state.game.settings,
  player: state.player,
});

const mapDispatchToProps = {
  reqStartGame: actions.reqStartGame,
  reqMove: actions.reqMove,
};

export default connect(mapStateToProps, mapDispatchToProps)(GameBoardContainer);
