import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  paper: (props) => ({
    // backgroundColor: 'rgba(0,0,0,0.1)',
    backgroundColor: props.dark ? 'rgba(0, 0, 0, 0.4)' : 0,
  }),
  typography: {
    fontWeight: 'bold',
  },
});

function BoxInfo(props) {
  const { field, value, dark } = props;
  const classes = useStyles({ dark });

  return (
    <Box>
      <Typography variant="caption" style={{ fontWeight: 'normal' }}>
        {field}
      </Typography>
      <Paper className={classes.paper} variant="outlined">
        <Typography className={classes.typography} align="center">
          {value}
        </Typography>
      </Paper>
    </Box>
  );
}

BoxInfo.defaultProps = {
  dark: false,
};

BoxInfo.propTypes = {
  field: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  dark: PropTypes.bool,
};

export default BoxInfo;
