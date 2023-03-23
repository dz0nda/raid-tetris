import React from 'react';
import PropTypes from 'prop-types';
// import { makeStyles } from '@material-ui/core/styles';
import { Box, Typography, Paper } from '@mui/material';

// const useStyles = makeStyles({
//   paper: (props) => ({
//     backgroundColor: props.dark ? 'rgba(0, 0, 0, 0.4)' : 0,
//   }),
//   typography: {
//     fontWeight: 'bold',
//   },
// });

function BoxInfo(props) {
  const { field, value, dark } = props;
  //   const classes = useStyles({ dark });

  return (
    <Box>
      <Typography variant="caption" style={{ fontWeight: 'normal' }}>
        {field}
      </Typography>
      <Paper variant="outlined">
        <Typography align="center">{value}</Typography>
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
