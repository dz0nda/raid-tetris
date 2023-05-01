import { Socket } from 'socket.io-client';

const randomstring = require('randomstring');

import { events } from '../../src/shared/events';

import { RedTetris } from '../../src/server/app/RedTetris';

import { destroySocket, handleResponse, initSocket } from './helpers/socket';

describe('# Socket Tests - Game Events', () => {
  const server = new RedTetris('0.0.0.0', 3002);
  let socket: Socket;

  beforeAll(async () => {
    server.listen();

    socket = await initSocket(3002);

    const payload = { name: 'name', room: 'room' };
    socket.emit(events.REQUEST_LOGIN, payload);
  });

  afterAll(async () => {
    await destroySocket(socket);
    server.close();
    // done();
  });

  describe('## Chat Events', () => {
    it('should handle chat', async () => {
      const payload = {
        text: 'text',
      };

      socket.emit(events.REQUEST_UPDATE_GAME_CHAT, payload);

      const data = await handleResponse(socket, events.RESPONSE_UPDATE_GAME_CHAT);

      expect(data.status).toBe(200);
    });

    it('should not update chat', async () => {
      const socketMalicious = await initSocket(3002);
      const payload = { text: 'text' };

      socketMalicious.emit(events.REQUEST_UPDATE_GAME_CHAT, payload);
      const data = await handleResponse(socketMalicious, events.RESPONSE_UPDATE_GAME_CHAT);
      expect(data.status).toBe(500);
    });
  });
});
