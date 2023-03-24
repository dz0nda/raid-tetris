const appModule = require('../../../src/client/store/middlewares/socketIo');

export const socketModule = appModule.middleware;
export const mockMiddleware = appModule.default;
export const { id } = appModule;
export const mockSocket = { emit: jest.fn() };

socketModule.SOCKETS[id] = mockSocket;
socketModule.toggleInitStatus(id);
