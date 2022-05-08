import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';

import { playerStateProp, settingsProp } from '../../reducers/reducers.types';

const Transition = React.forwardRef(function Transition(props, ref) {
  // eslint-disable-next-line react/jsx-props-no-spreading
  return <Slide direction="up" ref={ref} {...props} />;
});

function GameBoardLoose(props) {
  const { rank, nbPlayers, open, handleClose } = props;

  return (
    <Dialog open={open} TransitionComponent={Transition} keepMounted onClose={handleClose} fullWidth>
      <DialogTitle>Game Over!</DialogTitle>
      <DialogContent>
        <DialogContentText>{`Rank: ${rank}/${nbPlayers}`}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}

GameBoardLoose.propTypes = {
  rank: playerStateProp.rank.isRequired,
  nbPlayers: settingsProp.nbPlayers.isRequired,
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
};

export default GameBoardLoose;
