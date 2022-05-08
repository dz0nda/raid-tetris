import ev from '../../../../../shared/events';

export const dispatch = (socket, store, action) => {
  const { name } = store.getState().player;
  const { room } = store.getState().game;

  const payload = {
    name,
    room,
    newOwner: action.payload.newOwner,
  };

  socket.emit(action.type, payload);
};

export default {
  action: ev.req_UPDATE_GAME_OWNER,
  dispatch,
};
