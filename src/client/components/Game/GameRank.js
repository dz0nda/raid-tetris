import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import Slide from '@material-ui/core/Slide';
import Paper from '@material-ui/core/Paper';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';

import { TABLE_PLAYERS_RANK } from '../../constants/tables';
import { gameStateProp } from '../../reducers/reducers.types';

import VirtualizedList from '../Common/VirtualizedList';

const useStyles = makeStyles({
  box: {
    height: '100%',
  },
  tab: {
    fontWeight: 'bold',
  },
  paper: {
    height: '33vh',
  },
});

const Transition = React.forwardRef((props, ref) => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <Slide direction="up" ref={ref} {...props} />
));

function GameRank(props) {
  const { settings, players, open, handleSetOwner, handleClose } = props;
  const { owner } = settings;
  const classes = useStyles();

  const playersList = Object.values(players).sort((a, b) => a.rank - b.rank);

  return (
    <Dialog open={open} TransitionComponent={Transition} keepMounted onClose={handleClose} fullWidth>
      <DialogTitle>Game Ranking</DialogTitle>
      <DialogContent>
        <Paper variant="outlined" className={classes.paper} elevation={0}>
          <VirtualizedList
            owner={owner}
            rowCount={playersList.length}
            rowGetter={({ index }) => playersList[index]}
            columns={TABLE_PLAYERS_RANK}
            handleSetOwner={handleSetOwner}
          />
        </Paper>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary" autoFocus>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}

GameRank.propTypes = {
  settings: gameStateProp.settings.isRequired,
  players: gameStateProp.players.isRequired,
  open: PropTypes.bool.isRequired,
  handleSetOwner: PropTypes.func.isRequired,
  handleClose: PropTypes.func.isRequired,
};

export default GameRank;
