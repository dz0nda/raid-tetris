import React, { FC } from 'react';
import { Header as MantineHeader } from '@mantine/core';

// import { Grid, IconButton, Typography } from '@mui/material';

import { useAppDispatch, useAppSelector } from '@/client/store';

import { selectAppInfos } from '@/client/store/reducers/app';
// import logo from '../assets/header.png';

export const Header: FC = () => {
  const dispatch = useAppDispatch();
  const { roomsAcc: nbRooms, playersAcc: nbPlayers } = useAppSelector(selectAppInfos);

  return (
    <MantineHeader height={{ base: 50, md: 70 }} p="md">
      {/* <Grid container alignItems="center" justifyContent="center">
        <Grid item xs={3} justifyContent="center">
          <Grid container justifyContent="center">
            <IconButton onClick={() => dispatch(reqLogout({}))}>
              <HomeIcon />
            </IconButton>
          </Grid>
        </Grid>
        <Grid item xs={3}>
          <Grid container direction="column" alignItems="center">
            <Grid item>
              <Typography variant="caption">
                {nbPlayers}
                {nbPlayers > 1 ? ' players' : ' player'}
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="caption">
                {nbRooms}
                {nbRooms > 1 ? ' rooms' : ' room'}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid> */}
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
