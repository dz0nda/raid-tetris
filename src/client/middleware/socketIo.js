import io from 'socket.io-client';
import * as EVENTS from './events';

export const DEFAULT_SOCKET_ID = 'DEFAULT';
export const DEFAULT_SOCKETIO_OPTIONS = {
  transports: ['websocket'],
};

export const SOCKET_INITIALIZED = {};
export const SOCKETS = {};

export function toggleInitStatus(id) {
  SOCKET_INITIALIZED[id] = !SOCKET_INITIALIZED[id];
}

export function isConnectAction(action, id) {
  return action.type === `${id}_CONNECT` && !SOCKET_INITIALIZED[id];
}

export const socketio = (id = DEFAULT_SOCKET_ID, options = DEFAULT_SOCKETIO_OPTIONS) => {
  if (!SOCKETS[id]) {
    SOCKETS[id] = null;
    SOCKET_INITIALIZED[id] = false;
  }

  const clientEvents = EVENTS.client;
  const serverEvents = EVENTS.server;
  const stateEvents = EVENTS.state;

  return (store) => (next) => (action) => {
    const IS_CONNECT_ACTION = isConnectAction(action, id);

    if (IS_CONNECT_ACTION) {
      if (!SOCKETS[id]) {
        const CONN_STRING = `${action.payload.host}:${action.payload.port}${
          action.payload.namespace ? `/${action.payload.namespace}` : ''
        }`;
        SOCKETS[id] = io.connect(CONN_STRING, options);

        // Register server events
        serverEvents.forEach((event) => {
          SOCKETS[id].on(event.action.toString(), (data) => event.dispatch(SOCKETS[id], data, store.dispatch));
        });

        // Register state events
        stateEvents.forEach((event) => {
          SOCKETS[id].on(event.action.toString(), event.dispatch(SOCKETS[id], store, next, action));
        });
      } else {
        SOCKETS[id].connect();
      }

      toggleInitStatus(id);
    }

    if (SOCKETS[id] && SOCKET_INITIALIZED[id]) {
      switch (action.type) {
        case `${id}_DISCONNECT`:
          SOCKETS[id].disconnect();
          toggleInitStatus(id);
          break;
        case `${id}_server`:
          serverEvents.some((event) => {
            if (action.payload.type === event.action) {
              event.dispatch(SOCKETS[id], action.payload.data, store.dispatch);
              return true;
            }
            return false;
          });
          break;
        case `${id}_state`:
          stateEvents.some((event) => {
            if (event.action.toString() === action.payload.type) {
              event.dispatch(SOCKETS[id], store, next, action)();
              return true;
            }
            return false;
          });
          break;
        default:
          clientEvents.some((event) => {
            if (action.type === event.action) {
              if (event.dispatch) {
                event.dispatch(SOCKETS[id], store, action);
              } else {
                SOCKETS[id].emit(action.type, action.payload);
              }
              return true;
            }
            return false;
          });
      }
    }

    return next(action);
  };
};

export default socketio;
