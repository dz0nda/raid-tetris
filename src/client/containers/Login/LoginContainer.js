import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import actions from '../../actions';
import { appStateProp } from '../../reducers/reducers.types';

import LoginForm from '../../components/Login/LoginForm';
import LoginRooms from '../../components/Login/LoginRooms';

function LoginContainer(props) {
  const { games, reqLogin } = props;

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
  games: appStateProp.games.isRequired,
  reqLogin: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  games: state.app.infos.games,
});

const mapDispatchToProps = {
  reqLogin: actions.reqLogin,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LoginContainer));
