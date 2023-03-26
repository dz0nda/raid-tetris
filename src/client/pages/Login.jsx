import * as React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';

import { actions } from '../store/reducers/app';

function generate(element) {
  return [0, 1, 2].map((value) =>
    React.cloneElement(element, {
      key: value,
    }),
  );
}

export function Login(props) {
  const { reqLogin } = props;

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      username: data.get('username'),
      room: data.get('room'),
    });
    reqLogin({ name: data.get('username'), room: data.get('room') });
  };

  return (
    // <ThemeProvider theme={theme}>
    <Container component="main" maxWidth="xs">
      {/* <CssBaseline /> */}
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component="h1" variant="h5">
          Join or create a room
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField id="username" name="username" label="Username" margin="normal" required fullWidth autoFocus />
          <TextField id="room" name="room" label="Room" margin="normal" required fullWidth />
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
            Log in
          </Button>
        </Box>
      </Box>
      <Divider />
      {/* <Box
        sx={{
          marginTop: 4,
          border: '1px solid black'
        //   display: 'flex',
        //   flexDirection: 'column',
        //   alignItems: 'center'
        }}
      >
        <Typography sx={{ mt: 4, mb: 2 }} variant="h5" component="div">
          Icon with text
        </Typography>
        <List>
          {generate(
            <ListItem>
              <ListItemIcon>
                <FolderIcon />
              </ListItemIcon>
              <ListItemText
                primary="Single-line item"
                secondary="Secondary text"
              />
            </ListItem>
          )}
        </List>
      </Box> */}
    </Container>
    // </ThemeProvider>
  );
}

Login.propTypes = {
  games: PropTypes.object.isRequired,
  reqLogin: PropTypes.func.isRequired,
  reqPush: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  games: state.app.infos.games,
});

const mapDispatchToProps = {
  reqLogin: actions.reqLogin,
  // reqPush: push,
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
