import * as socketMiddleware from './src';
import * as EVENTS from './socketIo';
import params from '../../shared/params';

export const { client } = EVENTS;
export const { server } = EVENTS;
export const { state } = EVENTS;

export const { id } = params.socket;
export const middleware = socketMiddleware;
const initialSocket = null;

export default socketMiddleware.socketio(initialSocket, EVENTS.client, EVENTS.server, EVENTS.state, id);
