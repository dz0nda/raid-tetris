/* eslint-disable no-unused-vars */
import * as actions from '../../../actions';
import ev from '../../../../shared/events';

const action = ev.RECONNECT_FAILED;

// eslint-disable-next-line no-shadow
const dispatch = (socket, store, next, action) => (attemptNumber) => {
  console.error('socket: Reconnection failed');

  store.dispatch({
    type: ev.UPDATE_CONNECTION,
    payload: {
      id: null,
      connected: false,
      snackbar: {
        message: 'socket: Reconnection failed',
        variant: 'error',
      },
    },
  });
};

export default {
  action,
  dispatch,
};
