import { Socket } from 'socket.io-client';

const randomstring = require('randomstring');

import { events } from '../../src/shared/events';

import { RedTetris } from '../../src/server/app/RedTetris';
// import Server from '../../src/server/server/Server';

import { destroySocket, handleResponse, initSocket } from './helpers/socket';

describe('# Socket Tests - App Events', () => {
  const server = new RedTetris('0.0.0.0', 3004);
  let socket: Socket;

  beforeAll(async () => {
    server.listen();
    socket = await initSocket(3004);

    const payload = { name: 'name', room: 'room' };
    socket.emit(events.REQUEST_LOGIN, payload);
  });

  afterAll(async () => {
    await destroySocket(socket);
    (server as any).close();
  });

  describe('## Start Events', () => {
    // test('should start timer success', async () => {
    //   const payload = {};

    //   socket.emit(events.REQUEST_START_GAME, payload);
    //   const data = await handleResponse(socket, events.RESPONSE_START_GAME);
    //   expect(data.status).toBe(100);
    // });

    test('should start success', async () => {
      const payload = {};

      socket.emit(events.REQUEST_START_GAME, payload);
      const data = await handleResponse(socket, events.RESPONSE_UPDATE_GAME_SETTINGS);
      expect(data.status).toBe(200);
    });

    test('should start error', async () => {
      const socketMalicious = await initSocket(3004);
      const payload = {};

      socketMalicious.emit(events.REQUEST_START_GAME, payload);
      const data = await handleResponse(socketMalicious, events.RESPONSE_START_GAME);
      expect(data.status).toBe(500);
    });
  });
});
