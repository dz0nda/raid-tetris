import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import { push } from 'connected-react-router';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import actions from '../../actions';
import { appStateProp, gameStateProp, playerStateProp } from '../../reducers/reducers.types';

import LoginForm from '../../components/Login/LoginForm';
import LoginRooms from '../../components/Login/LoginRooms';

function LoginContainer(props) {
  const { name, room, games, reqLogin, reqPush } = props;

  // console.log()
  if (name !== '' && room !== '') {
    reqPush(`/${room}[${name}]`);
  }

  const initialLoginState = {
    value: '',
    err: false,
  };

  const [loginNameState, setLoginNameState] = useState(initialLoginState);
  const [loginRoomState, setLoginRoomState] = useState(initialLoginState);

  const handleName = (e) => {
    setLoginNameState({
      ...loginNameState,
      value: e.target.value,
    });
  };

  const handleRoom = (e) => {
    setLoginRoomState({
      ...loginRoomState,
      value: e.target.value,
    });
  };

  const handleSubmit = () => reqLogin({ name: loginNameState.value, room: loginRoomState.value });

  return (
    <>
      <LoginForm
        name={{ ...loginNameState, handle: handleName }}
        room={{ ...loginRoomState, handle: handleRoom }}
        handleSubmit={handleSubmit}
      />
      <LoginRooms games={games} onClickRoom={handleRoom} />
    </>
  );
}

LoginContainer.propTypes = {
  name: playerStateProp.name.isRequired,
  room: gameStateProp.room.isRequired,
  games: appStateProp.games.isRequired,
  reqLogin: PropTypes.func.isRequired,
  reqPush: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  name: state.player.name,
  room: state.game.room,
  games: state.app.infos.games,
});

const mapDispatchToProps = {
  reqLogin: actions.reqLogin,
  reqPush: push,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LoginContainer));
