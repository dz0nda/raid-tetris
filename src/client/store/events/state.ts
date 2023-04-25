import ev from '../../../shared/events';

import { updateConnection } from '../reducers/app';
import { IStateEvent } from './event.interface';

export const connect: IStateEvent = {
  action: ev.CONNECT,

  dispatch: (socket, store, next, action) => () => {
    console.log('Socket is connecting.');
    const { router } = store.getState();

    store.dispatch(
      updateConnection({
        id: socket.id,
        connected: true,
        snackbar: {
          message: 'socket: Connected',
          variant: 'success',
        },
      }),
    );

    if (router.location.pathname && router.location.pathname !== '/') {
      // console.log('pathname', router.location.pathname);
      // const room = router.location.pathname.split('/')[1].split('[')[0].trim();
      // const name = router.location.pathname.split('/')[1].split('[')[1].split(']')[0].trim();
      // if (room && name) {
      //   store.dispatch(
      //     reqLogin({
      //       name,
      //       room,
      //     }),
      //   );
      // }
    } else {
      // store.dispatch({
      //   type: ev.req_UPDATE_APP_INFOS,
      //   payload: {},
      // });
    }

    return next(action);
  },
};

export const connectError: IStateEvent = {
  action: ev.CONNECT_ERROR,

  dispatch: (socket, store) => () => {
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

export const connectTimeout: IStateEvent = {
  action: ev.CONNECT_TIMEOUT,

  dispatch: (socket, store) => () => {
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

export const disconnect: IStateEvent = {
  action: ev.DISCONNECT,

  dispatch: (_, store) => () => {
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

export const reconnect: IStateEvent = {
  action: ev.RECONNECT,

  dispatch: (_, store) => () => {
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

export const reconnectAttempt: IStateEvent = {
  action: ev.RECONNECT_ATTEMPT,

  dispatch: (_, store) => (attemptNumber: number) => {
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

export const reconnectError: IStateEvent = {
  action: ev.RECONNECT_ERROR,

  dispatch: (_, store) => () => {
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

export const reconnectFailed: IStateEvent = {
  action: ev.RECONNECT_FAILED,

  dispatch: (_, store) => () => {
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

export const reconnecting: IStateEvent = {
  action: ev.RECONNECTING,

  dispatch: (_, store) => () => {
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
  disconnect,
  reconnect,
  reconnectAttempt,
  reconnectError,
  reconnectFailed,
  reconnecting,
];
