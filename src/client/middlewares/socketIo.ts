import { io } from 'socket.io-client';
import * as socketMiddleware from './socketIo/index';
import params from '@/shared/params';

// export const { client } = EVENTS;
// export const { server } = EVENTS;
// export const { state } = EVENTS;

export const { id } = params.socket;
export const middleware = socketMiddleware;
export const initialSocket = io('http://0.0.0.0:3000', {
  autoConnect: false,
  transports: ['websocket'],
});

export default socketMiddleware.socketio();
