import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

function HeaderState(props) {
  const { nbPlayers, nbGames } = props;

  return (
    <Grid container direction="column" alignItems="center">
      <Grid item>
        <Typography variant="caption">
          {nbPlayers}
          {nbPlayers > 1 ? ' players' : ' player'}
        </Typography>
      </Grid>
      <Grid item>
        <Typography variant="caption">
          {nbGames}
          {nbGames > 1 ? ' rooms' : ' room'}
        </Typography>
      </Grid>
    </Grid>
  );
}

HeaderState.propTypes = {
  nbPlayers: PropTypes.number.isRequired,
  nbGames: PropTypes.number.isRequired,
};

export default HeaderState;
