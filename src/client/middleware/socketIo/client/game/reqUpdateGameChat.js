import ev from '../../../../../shared/events';

export const dispatch = (socket, store, action) => {
  const { room } = store.getState().game;
  const { name } = store.getState().player;

  const { message } = action.payload;

  const payload = {
    room,
    name,
    text: message,
  };

  socket.emit(action.type, payload);
};

export default {
  action: ev.req_UPDATE_GAME_CHAT,
  dispatch,
};
