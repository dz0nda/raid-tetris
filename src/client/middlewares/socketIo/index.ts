import { Socket, io } from 'socket.io-client';
import { push } from 'connected-react-router';
// import serverEventHandler from './middleware/server';
// import { IClientEvent, IEvent, IServerEvent, IStateEvent } from '@/client/store/events/event.interface';

import { updateConnection } from '@/client/store/reducers/socket';
import {
  resLogin,
  updateGame,
  updateGameChat,
  updateGamePlayers,
  updateGameSettings,
  updatePlayer,
} from '@/client/store/reducers/app';
// import { updatePlayer } from '@/client/store/reducers/player';

import ev from '@/shared/events';
// import { resLogin } from '@/client/store/events/server';

export interface IEvent {
  action: string;
  dispatch: (socket: Socket, store: any, action?: any) => any;
}

export interface IClientEvent {
  action: string;
  dispatch: (socket: Socket, store: any, action?: any) => any;
}

export interface IServerEvent {
  action: string;
  dispatch: (
    action: string,
    data: { status: number; payload: any; message?: string },
    dispatch: (payload: any) => any,
  ) => any;
}

export interface IStateEvent {
  action: string;
  dispatch: (socket: Socket, store: any, next: (action: string) => void, action: string) => any;
}

export enum ESocketEvent {
  SOCKET_CONNECTED = 'connect',
  SOCKET_CONNECTION_ERROR = 'connect_error',
  SOCKET_CONNECTION_TIMEOUT = 'connect_timeout',
  SOCKET_RECONNECTED = 'reconnect',
  SOCKET_RECONNECTION_ATTEMPT = 'reconnect_attempt',
  SOCKET_RECONNECTING = 'reconnecting',
  SOCKET_RECONNECTION_ERROR = 'reconnect_error',
  SOCKET_RECONNECTION_FAILED = 'reconnect_failed',
  SOCKET_DISCONNECTED = 'disconnect',
}

export enum EServerEvent {
  res_UPDATE_APP_INFOS = '@INFOS',
  RESPONSE_LOGIN = '@LOGIN',
  RESPONSE_LOGOUT = '@LOGOUT',
  RESPONSE_UPDATE_GAME = '@UPDATE_GAME',
  RESPONSE_UPDATE_GAME_OWNER = '@UPDATE_GAME_OWNER',
  RESPONSE_UPDATE_GAME_PLAYERS = '@UPDATE_GAME_PLAYERS',
  RESPONSE_UPDATE_GAME_SETTINGS = '@UPDATE_GAME_SETTINGS',
  RESPONSE_UPDATE_GAME_CHAT = '@UPDATE_GAME_CHAT',
  RESPONSE_START_GAME = '@START_GAME',
  RESPONSE_UPDATE_PLAYER = '@UPDATE_PLAYER',
}

// export enum EClientEvent {
//   REQUEST_LOGIN = ev.REQUEST_LOGIN,
//   REQUEST_LOGOUT = ev.REQUEST_LOGOUT,
// }

export const defaultSocketEvents: IEvent[] = [
  {
    action: 'NOOP',
    dispatch: (socket, store, action) => {
      console.debug('NOOP event called. Have you implemented your events?');
    },
  },
];

// export const initialStateEvents: IStateEvent[] = [
//   {
//     action: 'connecting',
//     dispatch: (_store, _next, _action) => (_socket: Socket) => {
//       console.log('Socket is connecting.');
//     },
//   },
//   {
//     action: 'connect',
//     dispatch: (_store, next, action) => (_socket: Socket) => {
//       // console.log('Socket connected.');
//     },
//   },
//   {
//     action: 'disconnect',
//     dispatch: (_store, _next, _action) => (_socket: Socket) => {
//       console.log('Socket disconnected.');
//     },
//   },
//   {
//     action: 'reconnecting',
//     dispatch: (_store, _next, _action) => (_socket: Socket) => {
//       console.log('Socket reconnecting.');
//     },
//   },
// ];

export const initialStateEvents: IStateEvent[] = [
  {
    action: ESocketEvent.SOCKET_CONNECTED,
    dispatch: (socket, store, _next, _action) => (_socket: Socket) =>
      store.dispatch(updateConnection({ id: socket.id, connected: true, isLoading: false })),
  },
  {
    action: ESocketEvent.SOCKET_DISCONNECTED,
    dispatch: (socket, store, _next, _action) => (_socket: Socket) =>
      store.dispatch(updateConnection({ id: socket.id, connected: false, isLoading: true })),
  },
];

export const initialServerEvents: IServerEvent[] = [
  // {
  //   action: ev.res_UPDATE_APP_INFOS,
  //   dispatch: (_, data, dispatch) => {}, //dispatch(updateInfos(data.payload)),
  // },
  {
    action: ev.RESPONSE_LOGIN,
    dispatch: (_, data, dispatch) => {
      console.log('resLogin3423', data);
      dispatch(resLogin(data.payload));
      dispatch(push(`${data.payload.room}[${data.payload.name}]`));
    },
  },
  {
    action: ev.RESPONSE_LOGOUT,
    dispatch: (_, data, dispatch) => dispatch(push('/')),
  },
  {
    action: ev.RESPONSE_START_GAME,
    dispatch: (_, data, dispatch) => dispatch(updateGamePlayers(data.payload)),
  },
  {
    action: ev.RESPONSE_UPDATE_GAME,
    dispatch: (_, data, dispatch) => dispatch(updateGame(data.payload)),
  },
  {
    action: ev.RESPONSE_UPDATE_GAME_CHAT,
    dispatch: (_, data, dispatch) => dispatch(updateGameChat(data.payload)),
  },
  {
    action: ev.RESPONSE_UPDATE_GAME_PLAYERS,
    dispatch: (_, data, dispatch) => dispatch(updateGamePlayers(data.payload)),
  },
  {
    action: ev.RESPONSE_UPDATE_GAME_SETTINGS,
    dispatch: (_, data, dispatch) => dispatch(updateGameSettings(data.payload)),
  },
  {
    action: ev.RESPONSE_UPDATE_PLAYER,
    dispatch: (_, data, dispatch) => dispatch(updatePlayer(data.payload)),
  },
];

export const initialClientEvents: IClientEvent[] = [
  {
    action: ev.REQUEST_LOGIN,
    dispatch: (socket, store, action) => socket.emit(ev.REQUEST_LOGIN, action.payload),
  },
  {
    action: ev.REQUEST_START_GAME,
    dispatch: (socket, store, action) => {
      console.log('dsqdsd');
      socket.emit(ev.REQUEST_START_GAME, action.payload);
    },
  },
  {
    action: ev.REQUEST_MOVE,
    dispatch: (socket, store, action) => {
      console.log('dsqdsd');
      socket.emit(ev.REQUEST_MOVE, action.payload);
    },
  },
];

// const serverEventHandler = (serverEvents: IServerEvent[], dispatch: any) => (event: any, data: any) => {
//   serverEvents.some((e) => {
//     if (e.action === event) {
//       e.dispatch(event, data, dispatch);
//       return true;
//     }
//     return false;
//   });
// };

export const DEFAULT_SOCKET_ID = 'DEFAULT';
export const CLIENT_EVENT_KEY = 'client';
export const SERVER_EVENT_KEY = 'server';
export const STATE_EVENT_KEY = 'state';
export const SERVER_EVENT = '*';

export const DEFAULT_SOCKETIO_OPTIONS = {
  transports: ['websocket'],
};

export const SOCKET_INITIALIZED: { [key: string]: boolean } = {};

export const SOCKETS: { [key: string]: Socket | null } = {};

export type EVENTS_ENUM = typeof CLIENT_EVENT_KEY | typeof SERVER_EVENT_KEY | typeof STATE_EVENT_KEY;
export const EVENTS: {
  [key: string]: {
    [CLIENT_EVENT_KEY]: IClientEvent[];
    [SERVER_EVENT_KEY]: IServerEvent[];
    [STATE_EVENT_KEY]: IStateEvent[];
  };
} = {};

export const isInitialized = (id: string) => SOCKET_INITIALIZED[id] || false;

// export const isConnectAction = (action: any, _: string, connected: boolean) =>
//   action.type === `app/reqConnect` && !connected;
// return action.type === `${id}_CONNECT` && !connected;

export const getSocket = (id: string): Socket | null => SOCKETS[id] || null;

// export const generateConnectString = (payload: { host: string; port: number; namespace?: string }) => {
//   let connStr = `http://${payload.host}:${payload.port}`;

//   if (payload.namespace) {
//     connStr += `/${payload.namespace}`;
//   }

//   return connStr;
// };

// export function onEventOverride(id: string) {
//   const socket = getSocket(id);
//   const { onevent } = socket;

//   socket.onevent = (packet: any) => {
//     const args = packet.data || [];
//     // eslint-disable-next-line no-param-reassign
//     packet.data = [SERVER_EVENT].concat(args);
//     onevent.call(socket, packet);
//   };
// }

export function registerStateEvents(id: string, events: any[], redux: any) {
  const socket = getSocket(id);
  // eslint-disable-next-line array-callback-return
  events.map((evt) => {
    const eventAction = evt.dispatch;
    socket?.on(evt.action.toString(), eventAction(socket, redux.store, redux.next, redux.action));
  });
}

export const toggleInitStatus = (id: string) => (SOCKET_INITIALIZED[id] = !SOCKET_INITIALIZED[id]);

export const getInitStatus = (id: string) => SOCKET_INITIALIZED[id];

// export function registerServerEvents(id: string, events: any[], dispatch: any) {
//   const socket = getSocket(id);

//   onEventOverride(id);
//   socket?.on(SERVER_EVENT, serverEventHandler(events, dispatch));
// }

export function registerSocketEvents(id: string, client: IClientEvent[], server: IServerEvent[], state: IStateEvent[]) {
  EVENTS[id] = {
    [CLIENT_EVENT_KEY]: client,
    [SERVER_EVENT_KEY]: server,
    [STATE_EVENT_KEY]: state,
  };
}

export const getSocketEvents = (id: string, key: EVENTS_ENUM) => EVENTS[id][key];

export function socketio(
  initializedSocket: Socket | null = null,
  clientEvents = initialClientEvents,
  serverEvents = initialServerEvents,
  stateEvents = initialStateEvents,
  id = DEFAULT_SOCKET_ID,
) {
  SOCKET_INITIALIZED[id] = false;
  SOCKETS[id] = initializedSocket;

  const host = process.env.REACT_APP_SOCKET_HOST || '0.0.0.0';
  const port = process.env.REACT_APP_SOCKET_PORT || '3000';
  const namespace = process.env.REACT_APP_SOCKET_NAMESPACE || '';

  registerSocketEvents(id, clientEvents, serverEvents, stateEvents);

  return (store: any) => (next: any) => (action: any) => {
    const { payload } = action;

    if (action.type === `socket/reqConnect` && !SOCKET_INITIALIZED[id]) {
      if (getSocket(id) === null) {
        console.log('Initializing socket...');
        SOCKETS[id] = io(`http://${host}:${port}/${namespace || ''}`, {
          transports: ['websocket'],
        });
      }

      const socket = getSocket(id);

      getSocketEvents(id, STATE_EVENT_KEY).map((stateEvent) => {
        const { action, dispatch } = stateEvent as IStateEvent;

        console.log('got state event: ', action, dispatch);

        socket?.on(action, dispatch(socket, store, next, action));
      });

      getSocketEvents(id, SERVER_EVENT_KEY).forEach((serverEvent) => {
        const { action, dispatch } = serverEvent as IServerEvent;

        socket?.on(action, (data: any) => dispatch(action, data, store.dispatch));
      });
      // } else {
      //   const socket = getSocket(id);
      //   if (socket) {
      //     socket.connect();
      //   }
      // }

      toggleInitStatus(id);
    }

    const socket = getSocket(id);

    console.log('socketio type: ', socket, getInitStatus(id));
    if (socket != null && getInitStatus(id) === true) {
      getSocketEvents(id, CLIENT_EVENT_KEY).some((evt) => {
        const event = evt as IClientEvent;

        if (action.type === event.action) {
          // clientEventHandler(event, socket, store, action);
          if (event.dispatch) {
            console.log('socketio middleware: ', action.type, action.payload);
            event.dispatch(socket, store, action);
          } else {
            socket.emit(action.type, action.payload);
          }

          return true;
        }
        return false;
      });
    }

    next(action);
  };
}

export default socketio;
