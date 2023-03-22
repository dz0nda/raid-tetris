import * as socketMiddleware from './socketIo/index';
import * as EVENTS from '../events';
import params from '../../../shared/params';

export const { client } = EVENTS;
export const { server } = EVENTS;
export const { state } = EVENTS;

export const { id } = params.socket;
export const middleware = socketMiddleware;
const initialSocket = null;

export default socketMiddleware.socketio(initialSocket, client, server, state, id);
