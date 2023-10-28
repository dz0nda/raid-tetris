import ev from '../../../../../shared/events';

export const dispatch = (socket, store, action) => {
  const { room } = store.getState().game;
  const { id } = store.getState().app;

  socket.emit(action.type, {
    room,
    name: id,
    keyCode: action.payload.keyCode,
  });
};

export default {
  action: ev.req_UPDATE_PLAYER,
  dispatch,
};
