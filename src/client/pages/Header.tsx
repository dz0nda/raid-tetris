import React, { FC } from 'react';
import { Header as MantineHeader } from '@mantine/core';

import PropTypes from 'prop-types';
import { useSelector, connect } from 'react-redux';
import { AppBar, Grid, IconButton, Typography } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';

import { useAppDispatch, useAppSelector } from '../store';

import { reqLogout, selectAppInfos } from '../store/reducers/app';
import logo from '../assets/header.png';

export const Header: FC = () => {
  const dispatch = useAppDispatch();
  const infos = useAppSelector(selectAppInfos);

  return (
    <MantineHeader height={{ base: 50, md: 70 }} p="md">
      <Grid container alignItems="center" justifyContent="center">
        <Grid item xs={3} justifyContent="center">
          <Grid container justifyContent="center">
            <IconButton onClick={() => dispatch(reqLogout())}>
              <HomeIcon />
            </IconButton>
          </Grid>
        </Grid>
        <Grid item xs={6}>
          <Grid container justifyContent="center">
            <img src={logo} width="35%" alt="Logo" />
          </Grid>
        </Grid>
        <Grid item xs={3}>
          <Grid container direction="column" alignItems="center">
            <Grid item>
              <Typography variant="caption">
                {infos.nbPlayers}
                {infos.nbPlayers > 1 ? ' players' : ' player'}
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="caption">
                {infos.nbGames}
                {infos.nbGames > 1 ? ' rooms' : ' room'}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </MantineHeader>
  );
};

// Header.propTypes = {
//   reqLogout: PropTypes.func.isRequired,
// };

// const mapDispatchToProps = {
//   reqLogout: actions.reqLogout,
// };

// export default connect(null, mapDispatchToProps)(Header);
