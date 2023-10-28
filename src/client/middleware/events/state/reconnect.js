/* eslint-disable no-unused-vars */
import * as actions from '../../../actions';
import ev from '../../../../shared/events';

const action = ev.RECONNECT;

// eslint-disable-next-line no-shadow
const dispatch = (socket, store, next, action) => () => {
  store.dispatch({
    type: ev.UPDATE_CONNECTION,
    payload: {
      id: null,
      connected: false,
      snackbar: {
        message: 'socket: Reconnected',
        variant: 'success',
      },
    },
  });
};

export default {
  action,
  dispatch,
};
