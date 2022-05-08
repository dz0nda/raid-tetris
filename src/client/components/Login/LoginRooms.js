import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import FileCopyOutlinedIcon from '@material-ui/icons/FileCopyOutlined';

import { appStateProp } from '../../reducers/reducers.types';

import RedIconButton from '../Common/RedIconButton';

function LoginGamesMap(games, onClickRoom) {
  const { length } = games;

  if (length === 0) {
    return (
      <Grid container item justify="center">
        No rooms available
      </Grid>
    );
  }

  return games.map((game) => (
    <ListItem value={game} key={game.room}>
      <ListItemText primary={`${game.room}`} secondary={`Owned by ${game.settings.owner}`} />
      <ListItemText
        primary={settings.started ? 'Game started' : 'Game not started'}
        secondary={`${Object.keys(game.players).length} players`}
      />
      <ListItemSecondaryAction>
        <RedIconButton onClick={() => onClickRoom({ target: { value: game.room } })}>
          <FileCopyOutlinedIcon />
        </RedIconButton>
      </ListItemSecondaryAction>
    </ListItem>
  ));
}

function LoginRooms(props) {
  const { games, onClickRoom } = props;

  return (
    <Grid container justify="center" alignItems="center" spacing={10}>
      <Grid item xs={12}>
        <Card>
          <CardHeader title="Available rooms" />
          <CardContent>
            <Grid item xs={12} style={{ maxHeight: 350, overflow: 'auto' }}>
              <List style={{ maxHeight: '100%' }}>{LoginGamesMap(games, onClickRoom)}</List>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}

LoginRooms.propTypes = {
  games: appStateProp.games.isRequired,
  onClickRoom: PropTypes.func.isRequired,
};

export default LoginRooms;
