import params from '../../../src/shared/params';
import * as socketIo from '../../../src/client/middleware/socketIo';

export const socketModule = socketIo;
export const mockMiddleware = socketIo.socketio(params.socket.id);
export const mockSocket = { emit: jest.fn() };
export const { id } = params.socket;

// socketModule.SOCKETS[params.socket.id] = mockSocket;
// socketModule.toggleInitStatus(params.socket.id);
