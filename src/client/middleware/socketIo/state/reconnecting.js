/* eslint-disable no-unused-vars */
import * as actions from '../../../actions';
import ev from '../../../../shared/events';

const action = ev.RECONNECTING;

// eslint-disable-next-line no-shadow
const dispatch = (socket, store, next, action) => (attemptNumber) => {
  store.dispatch({
    type: ev.UPDATE_CONNECTION,
    payload: {
      id: null,
      connected: false,
      snackbar: {
        message: 'socket: Reconnecting...',
        variant: 'warning',
      },
    },
  });
};

export default {
  action,
  dispatch,
};
