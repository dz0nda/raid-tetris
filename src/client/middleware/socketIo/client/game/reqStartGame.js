import ev from '../../../../../shared/events';

export const dispatch = (socket, store, action) => {
  // dispatch an action with the store to the server
  const { name } = store.getState().player;
  const { room } = store.getState().game;

  const payload = {
    name,
    room,
  };

  socket.emit(action.type, payload);
};

export default {
  action: ev.req_START_GAME,
  dispatch,
};
