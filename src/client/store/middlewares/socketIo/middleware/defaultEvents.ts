import { Socket } from 'socket.io';
import { IStateEvent } from '@client/store/events/event.interface';

/* eslint-disable no-unused-vars */
export const initialStateEvents: IStateEvent[] = [
  {
    action: 'connecting',
    dispatch: (_store, _next, _action) => (_socket: Socket) => {
      console.log('Socket is connecting.');
    },
  },
  {
    action: 'connect',
    dispatch: (_store, _next, _action) => (_socket: Socket) => {
      console.log('Socket connected.');
    },
  },
  {
    action: 'disconnect',
    dispatch: (_store, _next, _action) => (_socket: Socket) => {
      console.log('Socket disconnected.');
    },
  },
  {
    action: 'reconnecting',
    dispatch: (_store, _next, _action) => (_socket: Socket) => {
      console.log('Socket reconnecting.');
    },
  },
];

export default initialStateEvents;
