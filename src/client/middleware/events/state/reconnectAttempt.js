/* eslint-disable no-unused-vars */
import * as actions from '../../../actions';
import ev from '../../../../shared/events';

const action = ev.RECONNECT_ATTEMPT;

// eslint-disable-next-line no-shadow
const dispatch = (socket, store, next, action) => (attemptNumber) => {
  store.dispatch({
    type: ev.UPDATE_CONNECTION,
    payload: {
      id: null,
      connected: false,
      snackbar: {
        message: `socket: Reconnecting attempt ${attemptNumber}`,
        variant: 'info',
      },
    },
  });
};

export default {
  action,
  dispatch,
};
