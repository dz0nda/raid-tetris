import React from 'react';
import PropTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  RedIconButton: {
    color: 'grey',
    '&:hover': {
      color: 'red',
    },
  },
});

function RedIconButton(props) {
  const { onClick, disabled, children } = props;
  const classes = useStyles();

  return (
    <IconButton onClick={onClick} disabled={disabled} className={classes.RedIconButton}>
      {children}
    </IconButton>
  );
}

RedIconButton.defaultProps = {
  disabled: false,
};

RedIconButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  children: PropTypes.node.isRequired,
};

export default RedIconButton;
