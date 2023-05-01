import params from '../../../src/shared/params';
import RedTetris from '../../../src/server/app/RedTetris';

import { initSocket, destroySocket, handleResponse } from '../helpers/socket';

const ev = require('../../../src/shared/events');

const { host, port } = params.server;

describe('# Socket Tests - Game Events', () => {
  const server = new RedTetris('0.0.0.0', 3002);
  let socket;

  beforeAll(async () => {
    server.listen();

    socket = await initSocket(3002);

    const payload = { name: 'name', room: 'room' };
    socket.emit(ev.REQUEST_LOGIN, payload);
  });

  afterAll((done) => {
    destroySocket(socket);
    server.close();
    done();
  });

  describe('## Start Events', () => {
    it('should start timer success', async () => {
      const payload = {};

      socket.emit(ev.REQUEST_START_GAME, payload);
      const data = await handleResponse(socket, ev.RESPONSE_START_GAME);
      expect(data.status).toBe(100);
    });

    it('should start success', async () => {
      const payload = {};

      socket.emit(ev.REQUEST_START_GAME, payload);
      const data = await handleResponse(socket, ev.RESPONSE_UPDATE_GAME_SETTINGS);
      expect(data.status).toBe(200);
    });

    it('should start error', async () => {
      const socketMalicious = await initSocket(3002);
      const payload = {};

      socketMalicious.emit(ev.REQUEST_START_GAME, payload);
      const data = await handleResponse(socketMalicious, ev.RESPONSE_START_GAME);
      expect(data.status).toBe(500);
    });
  });

  describe('## Owner Events', () => {
    it('should owner success', async () => {
      const payload = { newOwner: 'newName' };

      socket.emit(ev.REQUEST_UPDATE_GAME_OWNER, payload);
      const data = await handleResponse(socket, ev.RESPONSE_UPDATE_GAME);
      expect(data.status).toBe(200);
    });

    it('should owner error', async () => {
      const socketMalicious = await initSocket(3002);
      const payload = { newOwner: 'newName' };

      socketMalicious.emit(ev.REQUEST_UPDATE_GAME_OWNER, payload);
      const data = await handleResponse(socketMalicious, ev.RESPONSE_UPDATE_GAME_OWNER);

      console.log(data.message);
      expect(data.status).toBe(500);
    });
  });

  describe('## Chat Events', () => {
    it('should handle chat', async () => {
      const payload = {
        text: 'text',
      };

      socket.emit(ev.REQUEST_UPDATE_GAME_CHAT, payload);

      const data = await handleResponse(socket, ev.RESPONSE_UPDATE_GAME_CHAT);

      expect(data.status).toBe(200);
    });

    it('should not update chat', async () => {
      const socketMalicious = await initSocket(3002);
      const payload = { text: 'text' };

      socketMalicious.emit(ev.REQUEST_UPDATE_GAME_CHAT, payload);
      const data = await handleResponse(socketMalicious, ev.RESPONSE_UPDATE_GAME_CHAT);
      expect(data.status).toBe(500);
    });
  });
});
