import ev from '../../../../../shared/events';

export const dispatch = (socket, store, action) => {
  const state = store.getState();
  const { name } = state.player;
  const { room } = state.game;

  socket.emit(action.type, {
    name,
    room,
  });
};

export default {
  action: ev.req_LOGOUT,
  dispatch,
};
