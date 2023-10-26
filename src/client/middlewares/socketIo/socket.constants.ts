import { Socket } from 'socket.io-client';
import { push } from 'connected-react-router';

import ev from '@/shared/events';
import { ESocketEvent, IClientEvent, IEvent, IServerEvent, IStateEvent } from './socket.types';
import { resJoinRoom, resLogin, resLogout, socketUpdate } from '@/client/store/slices/user.slice';
import {
  updateGame,
  updateGameChat,
  updateGamePlayers,
  updateGameSettings,
  updatePlayer,
} from '@/client/store/reducers/app';

export const defaultSocketEvents: IEvent[] = [
  {
    action: 'NOOP',
    dispatch: (socket, store, action) => {
      console.debug('NOOP event called. Have you implemented your events?');
    },
  },
];

export const initialStateEvents: IStateEvent[] = [
  {
    action: ESocketEvent.SOCKET_CONNECTED,
    dispatch: (socket, store, _next, _action) => (_socket: Socket) =>
      store.dispatch(socketUpdate({ id: socket.id, connected: true })),
  },
  {
    action: ESocketEvent.SOCKET_DISCONNECTED,
    dispatch: (socket, store, _next, _action) => (_socket: Socket) =>
      store.dispatch(socketUpdate({ id: socket.id, connected: false })),
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
      // console.log('resLogin3423', data);
      dispatch(resLogin(data.payload));
      // dispatch(push(`${data.payload.room}[${data.payload.name}]`));
    },
  },
  {
    action: ev.RESPONSE_LOGOUT,
    dispatch: (_, data, dispatch) => {
      dispatch(resLogout(data.payload));
      dispatch(push('/'));
    },
  },
  {
    action: ev.RESPONSE_JOIN_ROOM,
    dispatch: (_, data, dispatch) => {
      dispatch(resJoinRoom(data.payload));
      dispatch(push(`${data.payload.room.room}[${data.payload.username}]`));
    },
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
    action: ev.REQUEST_LOGOUT,
    dispatch: (socket, store, action) => socket.emit(ev.REQUEST_LOGOUT, action.payload),
  },
  {
    action: ev.REQUEST_JOIN_ROOM,
    dispatch: (socket, store, action) => socket.emit(ev.REQUEST_JOIN_ROOM, action.payload),
  },
  {
    action: ev.REQUEST_START_GAME,
    dispatch: (socket, store, action) => {
      socket.emit(ev.REQUEST_START_GAME, action.payload);
    },
  },
  {
    action: ev.REQUEST_MOVE,
    dispatch: (socket, store, action) => {
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
