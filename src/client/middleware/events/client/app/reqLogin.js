import ev from '../../../../../shared/events';

export const dispatch = (socket, store, action) => {
  const { name, room } = action.payload;

  store.dispatch({
    type: ev.UPDATE_LOG,
    payload: {
      isLoading: true,
      snackbar: {
        message: 'login: Trying to login...',
        variant: 'info',
      },
    },
  });

  socket.emit(action.type, {
    name,
    room,
  });
};

export default {
  action: ev.req_LOGIN,
  dispatch,
};
