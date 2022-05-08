/* eslint-disable no-unused-vars */
import * as actions from '../../../actions';
import ev from '../../../../shared/events';

const action = ev.RECONNECT_ERROR;

// eslint-disable-next-line no-shadow
const dispatch = (socket, store, next, action) => (attemptNumber) => {
  console.error('socket: Reconnection error');

  store.dispatch({
    type: ev.UPDATE_CONNECTION,
    payload: {
      id: null,
      connected: false,
      snackbar: {
        message: 'socket: Reconnection error',
        variant: 'error',
      },
    },
  });
};

export default {
  action,
  dispatch,
};
