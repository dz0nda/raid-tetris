/* eslint-disable no-unused-vars */
import ev from '../../../../shared/events';

const action = ev.CONNECT_TIMEOUT;

// eslint-disable-next-line no-shadow
const dispatch = (socket, store, next, action) => () => {
  console.error('socket: Connection timeout');

  store.dispatch({
    type: ev.UPDATE_CONNECTION,
    payload: {
      id: socket.id,
      connected: true,
      snackbar: {
        message: 'socket: Connection timeout',
        variant: 'error',
      },
    },
  });
};

export default {
  action,
  dispatch,
};
