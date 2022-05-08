import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import TextField from '@material-ui/core/TextField';

import RedIconButton from '../Common/RedIconButton';

function LoginForm(props) {
  const { name, room, handleSubmit } = props;

  return (
    <Grid container justify="center" alignItems="center" spacing={2}>
      <Grid item xs={5}>
        <TextField
          fullWidth
          label="username"
          value={name.value}
          onChange={name.handle}
          onKeyPress={(ev) => {
            if (ev.key === 'Enter') handleSubmit();
          }}
        />
      </Grid>
      <Grid item xs={5}>
        <TextField
          fullWidth
          label="room"
          value={room.value}
          onChange={room.handle}
          onKeyPress={(ev) => {
            if (ev.key === 'Enter') handleSubmit();
          }}
        />
      </Grid>
      <Grid item xs={2}>
        <RedIconButton onClick={handleSubmit}>
          <ArrowForwardIcon />
        </RedIconButton>
      </Grid>
    </Grid>
  );
}

const FormPropTypes = PropTypes.shape({
  value: PropTypes.string.isRequired,
  handle: PropTypes.func.isRequired,
});

LoginForm.propTypes = {
  name: FormPropTypes.isRequired,
  room: FormPropTypes.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};

export default LoginForm;
