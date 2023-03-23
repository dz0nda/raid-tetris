import React from 'react';
import PropTypes from 'prop-types';
import { Button as MaterialButton, Typography } from '@mui/material';

function Button(props) {
  const { title, onClick, disabled } = props;

  return (
    <MaterialButton color="primary" variant="contained" size="small" onClick={onClick} disabled={disabled} fullWidth>
      <Typography variant="button" style={{ fontWeight: 'bold' }}>
        {title}
      </Typography>
    </MaterialButton>
  );
}

Button.defaultProps = {
  onClick: () => {},
  disabled: false,
};

Button.propTypes = {
  title: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
};

export default Button;
