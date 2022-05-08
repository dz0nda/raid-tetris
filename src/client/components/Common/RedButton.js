import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

function RedButton(props) {
  const { name, handleSubmit, disabled } = props;

  return (
    <Button color="primary" variant="contained" size="small" onClick={handleSubmit} disabled={disabled} fullWidth>
      <Typography variant="button" color="textPrimary" style={{ fontWeight: 'bold' }}>
        {name}
      </Typography>
    </Button>
  );
}

RedButton.propTypes = {
  name: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  disabled: PropTypes.bool.isRequired,
};

export default RedButton;
