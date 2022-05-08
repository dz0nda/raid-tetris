import 'regenerator-runtime/runtime';
import params from '../../../src/shared/params';
import server from '../../../src/server/index';

import { initSocket, destroySocket, handleResponse } from '../helpers/socket';

const ev = require('../../../src/shared/events');
const logger = require('../../../src/server/utils/logger');

const { host, port } = params.server;

// server(3000);

describe('# Socket Tests - Game Events', () => {
  let socket;

  beforeAll(async () => {
    server.listen({ host, port: 3002 }, () => {
      logger.info(`Listening on port ${port}!`);
    });

    socket = await initSocket(3002);
    const payload = { name: 'name', room: 'room' };
    socket.emit(ev.req_LOGIN, payload);
  });

  afterAll(() => {
    destroySocket(socket);
    server.close();
  });

  describe('## Start Events', () => {
    it('should start timer success', async () => {
      const payload = {};

      socket.emit(ev.req_START_GAME, payload);
      const data = await handleResponse(socket, ev.res_START_GAME);
      expect(data.status).toBe(100);
    });

    it('should start success', async () => {
      const payload = {};

      socket.emit(ev.req_START_GAME, payload);
      const data = await handleResponse(socket, ev.res_UPDATE_GAME_SETTINGS);
      expect(data.status).toBe(200);
    });

    it('should start error', async () => {
      const socketMalicious = await initSocket(3002);
      const payload = {};

      socketMalicious.emit(ev.req_START_GAME, payload);
      const data = await handleResponse(socketMalicious, ev.res_UPDATE_PLAYER);
      expect(data.status).toBe(500);
    });
  });

  describe('## Owner Events', () => {
    it('should owner success', async () => {
      const payload = { newOwner: 'newName' };

      socket.emit(ev.req_UPDATE_GAME_OWNER, payload);
      const data = await handleResponse(socket, ev.res_UPDATE_GAME);
      expect(data.status).toBe(200);
    });

    it('should owner error', async () => {
      const socketMalicious = await initSocket(3002);
      const payload = { newOwner: 'newName' };

      socketMalicious.emit(ev.req_UPDATE_GAME_OWNER, payload);
      const data = await handleResponse(socketMalicious, ev.res_UPDATE_PLAYER);
      expect(data.status).toBe(500);
    });
  });

  describe('## Chat Events', () => {
    it('should handle chat', async () => {
      const payload = {
        text: 'text',
      };

      socket.emit(ev.req_UPDATE_GAME_CHAT, payload);

      const data = await handleResponse(socket, ev.res_UPDATE_GAME_CHAT);

      expect(data.status).toBe(200);
    });

    it('should not update chat', async () => {
      const socketMalicious = await initSocket(3002);
      const payload = { text: 'text' };

      socketMalicious.emit(ev.req_UPDATE_GAME_CHAT, payload);
      const data = await handleResponse(socketMalicious, ev.res_UPDATE_PLAYER);
      expect(data.status).toBe(500);
    });
  });
});
