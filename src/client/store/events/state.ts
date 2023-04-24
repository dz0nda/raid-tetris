/* eslint-disable no-unused-vars */
import ev from '../../../shared/events';

export const connect = {
  action: ev.CONNECT,

  dispatch: (socket, store, _next, _action) => () => {
    const { router } = store.getState();

    store.dispatch({
      type: ev.UPDATE_CONNECTION,
      payload: {
        id: socket.id,
        connected: true,
        snackbar: {
          message: 'socket: Connected',
          variant: 'success',
        },
      },
    });

    if (router.location.pathname && router.location.pathname !== '/') {
      console.log('pathname', router.location.pathname);
      const room = router.location.pathname.split('/')[1].split('[')[0].trim();
      const name = router.location.pathname.split('/')[1].split('[')[1].split(']')[0].trim();

      if (room && name) {
        store.dispatch({
          type: ev.req_LOGIN,
          payload: {
            name,
            room,
          },
        });
      }
    } else {
      store.dispatch({
        type: ev.req_UPDATE_APP_INFOS,
        payload: {},
      });
    }
  },
};

export const connectError = {
  action: ev.CONNECT_ERROR,

  dispatch: (socket, store, _next, _action) => () => {
    console.error('socket: Connection error');

    store.dispatch({
      type: ev.UPDATE_CONNECTION,
      payload: {
        id: socket.id,
        connected: true,
        snackbar: {
          message: 'socket: Connection error',
          variant: 'error',
        },
      },
    });
  },
};

export const connectTimeout = {
  action: ev.CONNECT_TIMEOUT,

  dispatch: (socket, store, _next, _action) => () => {
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
  },
};

export const disconect = {
  action: ev.DISCONNECT,

  dispatch: (_socket, store, _next, _action) => () => {
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
  },
};

export const reconnect = {
  action: ev.RECONNECT,

  dispatch: (_socket, store, _next, _action) => () => {
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
  },
};

export const reconnectAttempt = {
  action: ev.RECONNECT_ATTEMPT,

  dispatch: (_socket, store, _next, _action) => (attemptNumber) => {
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
  },
};

export const reconnectError = {
  action: ev.RECONNECT_ERROR,

  dispatch: (_socket, store, _next, _action) => (_attemptNumber) => {
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
  },
};

export const reconnectFailed = {
  action: ev.RECONNECT_FAILED,

  dispatch: (_socket, store, _next, _action) => (_attemptNumber) => {
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
  },
};

export const reconnecting = {
  action: ev.RECONNECTING,

  dispatch: (_socket, store, _next, _action) => (_attemptNumber) => {
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
  },
};

export default [
  connect,
  connectError,
  connectTimeout,
  disconect,
  reconnect,
  reconnectAttempt,
  reconnectError,
  reconnectFailed,
  reconnecting,
];
