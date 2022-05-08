/**
  * Socketio Redux Middleware.
  * @module socketio-middleware
  */

import getIOClient from './middleware/ioclient';
import { initialStateEvents } from './state/defaultEvents';
import { defaultSocketEvents } from './client/defaultEvents';
// import { onSocketEvents } from './client/defaultEvents';
import serverEventHandler from './middleware/server';
import clientEventHandler from './middleware/client';

/**
  * The default socket ID when initializing the middleware and no ID is passed
  * @constant
  * @default 'DEFAULT'
  * @type {string}
  * @since v1.0.0
  */
export const DEFAULT_SOCKET_ID = 'DEFAULT';

/**
  * The key prefix for "client" events
  * @constant
  * @default 'client'
  * @type {string}
  * @since v1.0.0
  */
export const CLIENT_EVENT_KEY = 'client';


/**
  * The key prefix for "server" events
  * @constant
  * @default 'server'
  * @type {string}
  * @since v1.0.0
  */
export const SERVER_EVENT_KEY = 'server';

/**
  * The key prefix for "state" events
  * @constant
  * @default 'state'
  * @type {string}
  * @since v1.0.0
  */
export const STATE_EVENT_KEY = 'state';

/**
  * The event for socket.io "on" events
  * @constant
  * @default '*'
  * @type {string}
  * @since v1.0.0
  * @example
  * socket.on('*', function(){  });
  */
export const SERVER_EVENT = '*';


/**
  * The default options to configure socket.io. See socket.io documentation on configuration options.
  * @constant
  * @default '{ transports: ['websocket'] }'
  * @type {object}
  * @since v1.0.0
  * @example
  * import * as socketMiddleware from 'socket.io-middleware'
  * const options = { namespace: '/chat' };
  * export default socketMiddleware.socketio(null, [], [], [], 'CHAT', options);
  */
export const DEFAULT_SOCKETIO_OPTIONS = {
  transports: ['websocket'],
};

/**
  * Key-value pair of socket ID's and their initialization state
  * @constant
  * @default '{}'
  * @type {object}
  * @since v1.0.0
  */
export const SOCKET_INITIALIZED = {};

/**
  * Key-value pair of socket ID's and the websocket
  * @constant
  * @default '{}'
  * @type {object}
  * @since v1.0.0
  */
export const SOCKETS = {};

/**
  * Key-value pair of socket ID's and the redux actions with their associated function handlers
  * @constant
  * @default '{}'
  * @type {object}
  * @since v1.0.0
  */
export const EVENTS = {};

/**
  * Check the status of the socket
  * @param {string} id - the socket ID
  * @since v1.0.0
  * @return {boolean} The initialization status
  */
export function isInitialized(id) {
  return SOCKET_INITIALIZED[id] || false;
}

/**
  * Check if the redux action type is the ID_CONNECT action and if the socket is connected
  * @param {object} action - the redux action
  * @param {string} id - the socket ID
  * @param {boolean} connected - the socket connected status
  * @since v1.0.0
  * @return {boolean} If it's a connect event and the socket is not connected
  */
export function isConnectAction(action, id, connected) {
  return action.type === `${id}_CONNECT` && !connected;
};

/**
  * Returns the socket.io instance
  * @param {string} id - the socket ID
  * @since v1.0.0
  * @return {socket|null} the socket.io instance 
  */
export function getSocket(id) {
  return SOCKETS[id] || null;
};

/**
  * Generates the socket.io connect string, appends namespace if available in the options
  * @param {object} payload - the options passed from the redux ID_CONNECT action 
  * @since v1.0.0
  * @return {string} The connection string
  * @example
  * http://localhost:3000/chat
  */
export function generateConnectString(payload) {
  let connStr = `${payload.host}:${payload.port}`;
  if (payload.namespace) {
    connStr += `/${payload.namespace}`;
  }
  return connStr;
};

/**
  * Overrides socket.io's socket.onevent for server events ( SERVER_EVENT ) with the associated socket ID
  * @param {string} id - the socket ID
  * @since v1.0.0
  */
export function onEventOverride(id) {
  const socket = getSocket(id);
  const onevent = socket.onevent;

  socket.onevent = (packet) => {
    const args = packet.data || [];
    packet.data = [SERVER_EVENT].concat(args);
    onevent.call(socket, packet);
  };
};

/**
  * Attaches redux action types to socket.on events with the associated dispatch function handler.
  * @param {string} id - the socket ID
  * @param {array} events - an array of state events { action, dispatch }
  * @param {object} redux - the redux middleware handlers { store, next, action }
  * @since v1.0.0
  */
export function registerStateEvents(id, events, redux) {
  const socket = getSocket(id);
  events.map((evt) => {
    let eventAction = evt.dispatch;
    socket.on(evt.action.toString(), eventAction(
      socket,
      redux.store,
      redux.next,
      redux.action
    ));
  });
};

/**
  * Toggles the socket initialization ( connection ) status
  * @param {string} id - the socket ID
  * @since v1.0.0
  */
export function toggleInitStatus(id) {
  SOCKET_INITIALIZED[id] = !SOCKET_INITIALIZED[id];
}

/**
  * Gets the socket initialization ( connection ) status
  * @param {string} id - the socket ID
  * @since v1.0.0
  * @return {boolean} If the socket is initialized
  */
export function getInitStatus(id) {
  return SOCKET_INITIALIZED[id];
}

/**
  * Attaches redux action types to socket.on server ( default: * ) events. A function, serverEventHandler, wraps all the server events
  * @param {string} id - the socket ID
  * @param {array} events - an array of state events { action, dispatch }
  * @param {function} dispatch - the redux middleware dispatch function
  * @since v1.0.0
  */
export function registerServerEvents(id, events, dispatch) {
  const socket = getSocket(id);

  onEventOverride(id);
  socket.on(SERVER_EVENT, serverEventHandler(events, dispatch));
}

/**
  * Sets all socket events to the associated socket ID
  * @param {string} id - the socket ID
  * @param {array} client - array of client events
  * @param {array} server - array of server events
  * @param {array} state - array of state events
  * @since v1.0.0
  */
export function registerSocketEvents(id, client, server, state) {
  EVENTS[id] = {};
  EVENTS[id][CLIENT_EVENT_KEY] = client;
  EVENTS[id][SERVER_EVENT_KEY] = server;
  EVENTS[id][STATE_EVENT_KEY] = state;
}

/**
  * Gets a list of socket events with the associated socket ID and event key
  * @param {string} id - the socket ID
  * @param {string} key - the event key
  * @since v1.0.0
  * @return {array} The events array
  */
export function getSocketEvents(id, key) {
  return EVENTS[id][key];
}

/**
  * Initializes the middleware, binds sockets and events to the module state
  * @param {socket} initializedSocket - an initialized socket.io instance
  * @param {array} clientEvents - array of client events
  * @param {array} serverEvents - array of server events
  * @param {array} stateEvents - array of state events
  * @param {string} id - the socket ID to bind all the events to
  * @param {object} options - socket.io configuration options
  * @since v1.0.0
  * @return {function} The next redux action
  */
export function socketio(
  initializedSocket = null,
  clientEvents = defaultSocketEvents,
  serverEvents = defaultSocketEvents,
  stateEvents = initialStateEvents,
  id = DEFAULT_SOCKET_ID,
  options = DEFAULT_SOCKETIO_OPTIONS
) {

  //
  // Keep track of the socket state and functions used
  //
  SOCKET_INITIALIZED[id] = false;
  SOCKETS[id] = initializedSocket;
  registerSocketEvents(id, clientEvents, serverEvents, stateEvents);

  const IO = getIOClient();

  return store => next => action => {
    const IS_CONNECT_ACTION = isConnectAction(action, id, SOCKET_INITIALIZED[id]);

    // got socketID_CONNECT event
    if (IS_CONNECT_ACTION) {

      //
      // If no socket has been initialized
      //
      if (getSocket(id) === null) {
        const CONN_STRING = generateConnectString(action.payload);

        SOCKETS[id] = IO.connect(CONN_STRING, options);

        registerServerEvents(id,
          getSocketEvents(id, SERVER_EVENT_KEY),
          store.dispatch
        );

        registerStateEvents(id,
          getSocketEvents(id, STATE_EVENT_KEY),
          { store, next, action }
        );

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
      switch(action.type) {

        //
        // Server Events
        //
        case `${id}_${SERVER_EVENT}`:
          serverEventHandler(getSocketEvents(id, SERVER_EVENT_KEY),
            store.dispatch
          )(action.payload.type, action.payload.data);
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
};

export default socketio;