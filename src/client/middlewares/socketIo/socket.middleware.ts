import { Socket, io } from 'socket.io-client';
import { IClientEvent, IServerEvent, IStateEvent } from './socket.types';
import {
  CLIENT_EVENT_KEY,
  DEFAULT_SOCKET_ID,
  EVENTS,
  EVENTS_ENUM,
  SERVER_EVENT_KEY,
  SOCKETS,
  SOCKET_INITIALIZED,
  STATE_EVENT_KEY,
  initialClientEvents,
  initialServerEvents,
  initialStateEvents,
} from './socket.constants';

export const isInitialized = (id: string): boolean => SOCKET_INITIALIZED[id] || false;

export const getSocket = (id: string): Socket | null => SOCKETS[id] || null;

export const toggleInitStatus = (id: string): void => {
  SOCKET_INITIALIZED[id] = !SOCKET_INITIALIZED[id];
};

export const getInitStatus = (id: string): boolean => SOCKET_INITIALIZED[id];

export const registerStateEvents = (id: string, events: IStateEvent[], redux: any): void => {
  const socket = getSocket(id);
  events.forEach((evt) => {
    const eventAction = evt.dispatch;
    socket?.on(evt.action.toString(), eventAction(socket, redux.store, redux.next, redux.action));
  });
};

export const registerSocketEvents = (
  id: string,
  client: IClientEvent[],
  server: IServerEvent[],
  state: IStateEvent[],
): void => {
  EVENTS[id] = {
    [CLIENT_EVENT_KEY]: client,
    [SERVER_EVENT_KEY]: server,
    [STATE_EVENT_KEY]: state,
  };
};

export const getSocketEvents = (id: string, key: EVENTS_ENUM): IClientEvent[] | IServerEvent[] | IStateEvent[] =>
  EVENTS[id][key];

export function socketioMiddleware(
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
    if (action.type === `user/reqConnect` && !SOCKET_INITIALIZED[id]) {
      if (!getSocket(id)) {
        SOCKETS[id] = io(`http://${host}:${port}/${namespace}`, {
          transports: ['websocket'],
        });
      }

      const socket = getSocket(id);

      getSocketEvents(id, STATE_EVENT_KEY).forEach((stateEvent) => {
        socket?.on(stateEvent.action, (stateEvent as IStateEvent).dispatch(socket, store, next, action));
      });

      getSocketEvents(id, SERVER_EVENT_KEY).forEach((serverEvent) => {
        socket?.on(serverEvent.action, (data) => (serverEvent as IServerEvent).dispatch(action, data, store.dispatch));
      });

      toggleInitStatus(id);
    }

    const socket = getSocket(id);
    if (socket && getInitStatus(id)) {
      getSocketEvents(id, CLIENT_EVENT_KEY).some((evt) => {
        if (action.type === evt.action) {
          (evt as IClientEvent).dispatch
            ? (evt as IClientEvent).dispatch(socket, store, action)
            : socket.emit(action.type, action.payload);
          return true;
        }
        return false;
      });
    }

    next(action);
  };
}
