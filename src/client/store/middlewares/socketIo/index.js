import io from 'socket.io-client';
import { initialStateEvents } from './middleware/defaultEvents';
import { defaultSocketEvents } from './client/defaultEvents';
import serverEventHandler from './middleware/server';
import clientEventHandler from './middleware/client';

export const DEFAULT_SOCKET_ID = 'DEFAULT';
export const CLIENT_EVENT_KEY = 'client';
export const SERVER_EVENT_KEY = 'server';
export const STATE_EVENT_KEY = 'state';
export const SERVER_EVENT = '*';

export const DEFAULT_SOCKETIO_OPTIONS = {
  transports: ['websocket'],
};

export const SOCKET_INITIALIZED = {};

export const SOCKETS = {};

export const EVENTS = {};

export function isInitialized(id) {
  return SOCKET_INITIALIZED[id] || false;
}

export function isConnectAction(action, id, connected) {
  return action.type === `${id}_CONNECT` && !connected;
}

export function getSocket(id) {
  return SOCKETS[id] || null;
}

export function generateConnectString(payload) {
  let connStr = `http://${payload.host}:${payload.port}`;
  console.log(connStr);
  if (payload.namespace) {
    connStr += `/${payload.namespace}`;
  }
  return connStr;
}

export function onEventOverride(id) {
  const socket = getSocket(id);
  const { onevent } = socket;

  socket.onevent = (packet) => {
    const args = packet.data || [];
    // eslint-disable-next-line no-param-reassign
    packet.data = [SERVER_EVENT].concat(args);
    onevent.call(socket, packet);
  };
}

export function registerStateEvents(id, events, redux) {
  const socket = getSocket(id);
  // eslint-disable-next-line array-callback-return
  events.map((evt) => {
    const eventAction = evt.dispatch;
    socket.on(evt.action.toString(), eventAction(socket, redux.store, redux.next, redux.action));
  });
}

export function toggleInitStatus(id) {
  SOCKET_INITIALIZED[id] = !SOCKET_INITIALIZED[id];
}

export function getInitStatus(id) {
  return SOCKET_INITIALIZED[id];
}

export function registerServerEvents(id, events, dispatch) {
  const socket = getSocket(id);

  onEventOverride(id);
  socket.on(SERVER_EVENT, serverEventHandler(events, dispatch));
}

export function registerSocketEvents(id, client, server, state) {
  EVENTS[id] = {};
  EVENTS[id][CLIENT_EVENT_KEY] = client;
  EVENTS[id][SERVER_EVENT_KEY] = server;
  EVENTS[id][STATE_EVENT_KEY] = state;
}

export function getSocketEvents(id, key) {
  return EVENTS[id][key];
}

export function socketio(
  initializedSocket = null,
  clientEvents = defaultSocketEvents,
  serverEvents = defaultSocketEvents,
  stateEvents = initialStateEvents,
  id = DEFAULT_SOCKET_ID,
  options = DEFAULT_SOCKETIO_OPTIONS,
) {
  //
  // Keep track of the socket state and functions used
  //
  SOCKET_INITIALIZED[id] = false;
  SOCKETS[id] = initializedSocket;
  registerSocketEvents(id, clientEvents, serverEvents, stateEvents);

  const IO = io;

  console.log(IO);
  return (store) => (next) => (action) => {
    console.log('middle');
    const IS_CONNECT_ACTION = isConnectAction(action, id, SOCKET_INITIALIZED[id]);

    // got socketID_CONNECT event
    if (IS_CONNECT_ACTION) {
      //
      // If no socket has been initialized
      //
      if (getSocket(id) === null) {
        const CONN_STRING = generateConnectString(action.payload);

        console.log(CONN_STRING);
        SOCKETS[id] = IO.connect(CONN_STRING, options);

        registerServerEvents(id, getSocketEvents(id, SERVER_EVENT_KEY), store.dispatch);

        registerStateEvents(id, getSocketEvents(id, STATE_EVENT_KEY), {
          store,
          next,
          action,
        });

        //
        // Socket has been initialized, but is disconnected
        //
      } else {
        const socket = getSocket(id);
        socket.connect();
      }

      //
      // Toggle status from disconnected, to connected ( false -> true )
      //
      toggleInitStatus(id);
    }

    const socket = getSocket(id);

    if (socket != null && getInitStatus(id) === true) {
      switch (action.type) {
        //
        // Server Events
        //
        case `${id}_${SERVER_EVENT}`:
          serverEventHandler(getSocketEvents(id, SERVER_EVENT_KEY), store.dispatch)(
            action.payload.type,
            action.payload.data,
          );
          break;

        //
        // State Events
        //
        case `${id}_${STATE_EVENT_KEY}`:
          getSocketEvents(id, STATE_EVENT_KEY).some((evt) => {
            if (evt.action.toString() === action.payload.type) {
              evt.dispatch(socket, store, next, action)();
              return true;
            }
            return false;
          });
          break;

        //
        // socketID_DISCONNECT ( disconnect event )
        //
        case `${id}_DISCONNECT`:
          socket.disconnect();
          toggleInitStatus(id);
          break;

        //
        // Client Events
        //
        default:
          getSocketEvents(id, CLIENT_EVENT_KEY).some((event) => {
            if (action.type === event.action) {
              clientEventHandler(event, socket, store, action);
              return true;
            }
            return false;
          });
      }
    }

    return next(action);
  };
}

export default socketio;
