/* eslint-disable no-unused-vars */
import * as actions from '../../../actions';
import ev from '../../../../shared/events';

const action = ev.DISCONNECT;

// eslint-disable-next-line no-shadow
const dispatch = (socket, store, next, action) => () => {
  console.error('socket: Disconnected');

  store.dispatch({
    type: ev.UPDATE_CONNECTION,
    payload: {
      id: null,
      connected: false,
      snackbar: {
        message: 'socket: Disconnected',
        variant: 'error',
      },
    },
  });
};

export default {
  action,
  dispatch,
};
