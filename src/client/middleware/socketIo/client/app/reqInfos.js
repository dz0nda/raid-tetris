import ev from '../../../../../shared/events';

export const dispatch = (socket, store, action) => {
  socket.emit(action.type, {});
};

export default {
  action: ev.req_UPDATE_APP_INFOS,
  dispatch,
};
