import { io, Socket } from 'socket.io-client';
import { push } from 'connected-react-router';
// import serverEventHandler from './middleware/server';
import { IEvent, IClientEvent, IServerEvent, IStateEvent } from '@client/store/events/event.interface';
import { updateConnection, updateInfos } from '../../../store/reducers/app';

import ev from '../../../../shared/events';
import { gameState, updateGame, updateGameChat, updateGameSettings } from '../../../store/reducers/game';
import { updatePlayer } from '../../../store/reducers/player';
// import { resLogin } from '@client/store/events/server';

export enum ESocketEvent {
  CONNECT = 'connect',
  CONNECT_ERROR = 'connect_error',
  CONNECT_TIMEOUT = 'connect_timeout',
  RECONNECT = 'reconnect',
  RECONNECT_ATTEMPT = 'reconnect_attempt',
  RECONNECTING = 'reconnecting',
  RECONNECT_ERROR = 'reconnect_error',
  RECONNECT_FAILED = 'reconnect_failed',
  DISCONNECT = 'disconnect',
}

export enum EServerEvent {
  res_UPDATE_APP_INFOS = '@INFOS',
  res_LOGIN = '@LOGIN',
  res_LOGOUT = '@LOGOUT',
  res_UPDATE_GAME = '@UPDATE_GAME',
  res_UPDATE_GAME_OWNER = '@UPDATE_GAME_OWNER',
  res_UPDATE_GAME_PLAYERS = '@UPDATE_GAME_PLAYERS',
  res_UPDATE_GAME_SETTINGS = '@UPDATE_GAME_SETTINGS',
  res_UPDATE_GAME_CHAT = '@UPDATE_GAME_CHAT',
  res_START_GAME = '@START_GAME',
  res_UPDATE_PLAYER = '@UPDATE_PLAYER',
}

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
    action: ESocketEvent.CONNECT,
    dispatch: (socket, store, _next, _action) => (_socket: Socket) =>
      store.dispatch(updateConnection({ id: socket.id, connected: true, isLoading: false })),
  },
  {
    action: ESocketEvent.DISCONNECT,
    dispatch: (socket, store, _next, _action) => (_socket: Socket) =>
      store.dispatch(updateConnection({ id: socket.id, connected: false, isLoading: true })),
  },
];

export const initialServerEvents: IServerEvent[] = [
  {
    action: ev.res_UPDATE_APP_INFOS,
    dispatch: (_, data, dispatch) => dispatch(updateInfos(data.payload)),
  },
  {
    action: ev.res_LOGIN,
    dispatch: (_, data, dispatch) => {
      console.log('resLogin3423', data);
      dispatch(push(`/${data.payload.room}[${data.payload.name}]`));
    },
  },
  {
    action: ev.res_LOGOUT,
    dispatch: (_, data, dispatch) => dispatch(push(`/${data.payload.room}[${data.payload.name}]`)),
  },
  {
    action: ev.res_START_GAME,
    dispatch: (_, data, dispatch) => dispatch(push(`/${data.payload.room}[${data.payload.name}]`)),
  },
  {
    action: ev.res_UPDATE_GAME,
    dispatch: (_, data, dispatch) => dispatch(push(`/${data.payload.room}[${data.payload.name}]`)),
  },
  {
    action: ev.res_UPDATE_GAME_CHAT,
    dispatch: (_, data, dispatch) => dispatch(updateGameChat(data.payload)),
  },
  {
    action: ev.res_UPDATE_GAME_PLAYERS,
    dispatch: (_, data, dispatch) => dispatch(push(`/${data.payload.room}[${data.payload.name}]`)),
  },
  {
    action: ev.res_UPDATE_GAME_SETTINGS,
    dispatch: (_, data, dispatch) => dispatch(updateGameSettings(data.payload)),
  },
  {
    action: ev.res_UPDATE_PLAYER,
    dispatch: (_, data, dispatch) => dispatch(updatePlayer(data.payload)),
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
  initializedSocket = null,
  clientEvents = defaultSocketEvents,
  serverEvents = initialServerEvents,
  stateEvents = initialStateEvents,
  id = DEFAULT_SOCKET_ID,
) {
  SOCKET_INITIALIZED[id] = false;
  SOCKETS[id] = initializedSocket;
  registerSocketEvents(id, clientEvents, serverEvents, stateEvents);

  return (store: any) => (next: any) => (action: any) => {
    const { payload } = action;

    if (action.type === `app/reqConnect` && !SOCKET_INITIALIZED[id]) {
      if (getSocket(id) === null) {
        SOCKETS[id] = io(`http://${payload.host}:${payload.port}/${payload.namespace || ''}`, {
          transports: ['websocket'],
        });
        const socket = getSocket(id);

        // registerServerEvents(id, getSocketEvents(id, SERVER_EVENT_KEY), store.dispatch);
        /** Register events **/
        if (socket) {
          getSocketEvents(id, STATE_EVENT_KEY).forEach((stateEvent) => {
            const { action, dispatch } = stateEvent as IStateEvent;

            // const eventAction = evt.dispatch;
            socket.on(action, dispatch(socket, store, next, action));
            // {
            // switch (action as ESocketEvent) {
            //   case ESocketEvent.CONNECT:
            //     console.log('In: Socket is connected.');
            //     store.dispatch(updateConnection({ id: socket.id, connected: true, isLoading: false }));
            //     break;
            //   case ESocketEvent.DISCONNECT:
            //     console.log('Socket is disconnected.');
            //     store.dispatch(updateConnection({ id: socket.id, connected: false, isLoading: true }));
            //     break;
            //   default:
            //     break;
            // }
            //     dispatch(socket, store, next, action);
            //   });
          });

          getSocketEvents(id, SERVER_EVENT_KEY).forEach((serverEvent) => {
            const { action, dispatch } = serverEvent as IServerEvent;

            socket.on(action, (data: any) => {
              console.log('acctionnn', action);
              dispatch(action, data, store.dispatch);
            });
            // {
            //   console.log(serverEvent, data);
            //   const { status, payload } = data;

            //   if (status === 500) {
            //     store.dispatch({ type: 'app/error', payload });
            //   } else {
            //     switch (event as EServerEvent) {
            //       case EServerEvent.res_UPDATE_APP_INFOS:
            //         store.dispatch(updateInfos(payload));
            //         break;
            //       case EServerEvent.res_LOGIN:
            //         console.log('res_LOGIN', data);
            //         store.dispatch(push(`/${payload.room}[${payload.name}]`));
            //         break;
            //       case EServerEvent.res_LOGOUT:
            //         store.dispatch(updateGame(gameState));
            //         store.dispatch(push('/'));
            //         break;
            //       case EServerEvent.res_START_GAME:
            //         if (status === 100) {
            //         } else {
            //           store.dispatch(updateGame(gameState));
            //           store.dispatch(push('/'));
            //         }
            //         break;
            //       case EServerEvent.res_UPDATE_PLAYER:
            //         store.dispatch(updatePlayer(payload.player));
            //         store.dispatch(push('/'));
            //         break;
            //       default:
            //         break;
            //     }
            //   }
            //   // dispatch(action, data, store.dispatch);
            // });
          });
        }

        // registerStateEvents(id, getSocketEvents(id, STATE_EVENT_KEY), {
        //   store,
        //   next,
        //   action,
        // });

        //
        // Socket has been initialized, but is disconnected
        //
      } else {
        const socket = getSocket(id);
        if (socket) {
          socket.connect();
        }
      }

      //
      // Toggle status from disconnected, to connected ( false -> true )
      //
      toggleInitStatus(id);
    }

    const socket = getSocket(id);

    if (socket != null && getInitStatus(id) === true) {
      console.log('socketio type: ', action.type);
      switch (action.type) {
        //
        // Server Events
        //
        // case `${id}_${SERVER_EVENT}`:
        //   serverEventHandler(getSocketEvents(id, SERVER_EVENT_KEY) as IServerEvent[], store.dispatch)(
        //     action.payload.type,
        //     action.payload.data,
        //   );
        //   // getSocketEvents(id, SERVER_EVENT_KEY).some((evt) => {
        //   //   const event = evt as IServerEvent;

        //   //   if (event.action === action.payload.type) {
        //   //     event.dispatch(action.payload.type, action.payload.data, store.dispatch);
        //   //   }
        //   // });
        //   break;

        //
        // State Events
        // //
        // case `${id}_${STATE_EVENT_KEY}`:
        //   getSocketEvents(id, STATE_EVENT_KEY).some((evt) => {
        //     const event = evt as IStateEvent;

        //     if (event.action.toString() === action.payload.type) {
        //       event.dispatch(socket, store, next, action)();
        //       return true;
        //     }
        //     return false;
        //   });
        //   break;

        // //
        // // socketID_DISCONNECT ( disconnect event )
        // //
        // case `${id}_DISCONNECT`:
        //   socket.disconnect();
        //   toggleInitStatus(id);
        //   break;

        //
        // Client Events
        //
        default:
          getSocketEvents(id, CLIENT_EVENT_KEY).some((evt) => {
            const event = evt as IClientEvent;

            if (action.type === event.action) {
              // clientEventHandler(event, socket, store, action);
              if (event.dispatch) {
                event.dispatch(socket, store, action);
              } else {
                socket.emit(action.type, action.payload);
              }

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
