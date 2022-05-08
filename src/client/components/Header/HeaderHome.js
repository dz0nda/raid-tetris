import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import HomeIcon from '@material-ui/icons/Home';
import RedIconButton from '../Common/RedIconButton';

function HeaderHome(props) {
  const { reqLogout } = props;

  return (
    <Grid container justify="center">
      <RedIconButton onClick={reqLogout}>
        <HomeIcon />
      </RedIconButton>
    </Grid>
  );
}

HeaderHome.propTypes = {
  reqLogout: PropTypes.func.isRequired,
};

export default HeaderHome;
