import { Socket } from 'socket.io-client';

export interface IEvent {
  action: string;
  dispatch: (socket: Socket, store: any, action?: any) => any;
}

export type IClientEvent = IEvent;

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
