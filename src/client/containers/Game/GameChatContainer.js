import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import actions from '../../actions';
import { chatStatePropTypes } from '../../reducers/reducers.types';

import GameChat from '../../components/Game/GameChat';

function GameChatContainer(props) {
  const { chat, reqChat } = props;
  const [message, setMessage] = useState('');

  const handleMessage = (e) => {
    setMessage(e.target.value);
  };

  const handleSubmit = () => {
    if (!message) return;

    reqChat({ message });

    setMessage('');
  };

  return <GameChat chat={chat} message={message} handleMessage={handleMessage} handleSubmit={handleSubmit} />;
}

GameChatContainer.propTypes = {
  chat: chatStatePropTypes.isRequired,
  reqChat: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  chat: state.game.chat,
});

const mapDispatchToProps = {
  reqChat: actions.reqChat,
};

export default connect(mapStateToProps, mapDispatchToProps)(GameChatContainer);
