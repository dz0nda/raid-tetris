import { Socket } from 'socket.io-client';

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
