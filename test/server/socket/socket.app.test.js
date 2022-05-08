import 'regenerator-runtime/runtime';
import params from '../../../src/shared/params';
import server from '../../../src/server/index';

import { initSocket, destroySocket, handleResponse } from '../helpers/socket';

const randomstring = require('randomstring');

const ev = require('../../../src/shared/events');
const logger = require('../../../src/server/utils/logger');

const { host, port } = params.server;

describe('# Socket Tests - App Events', () => {
  let socket;

  beforeEach(async () => {
    server.listen({ host, port: 3001 }, () => {
      logger.info(`Listening on port ${port}!`);
    });

    socket = await initSocket(3001);
  });

  afterEach(() => {
    destroySocket(socket);
    server.close();
  });

  describe('## Login Events', () => {
    it('should login success', async () => {
      const payload = {
        name: randomstring.generate(7),
        room: randomstring.generate(7),
      };

      socket.emit(ev.req_LOGIN, payload);
      const data = await handleResponse(socket, ev.res_LOGIN);
      expect(data.status).toBe(200);
    });

    it('should login error', async () => {
      const payload = {
        name: randomstring.generate(7),
        room: '',
      };

      socket.emit(ev.req_LOGIN, payload);

      const data = await handleResponse(socket, ev.res_LOGIN);

      expect(data.status).toBe(500);
    });
  });

  describe('## Logout Events', () => {
    it('should logout success', async () => {
      const payload = {
        name: randomstring.generate(7),
        room: randomstring.generate(7),
      };

      socket.emit(ev.req_LOGIN, payload);
      let data = await handleResponse(socket, ev.res_LOGIN);
      expect(data.status).toBe(200);

      socket.emit(ev.req_LOGOUT, payload);
      data = await handleResponse(socket, ev.res_LOGOUT);
      expect(data.status).toBe(200);
    });

    it('should logout success - not destroy the room', async () => {
      const room = randomstring.generate(7);
      const socketNew = await initSocket(3001);

      socket.emit(ev.req_LOGIN, {
        name: randomstring.generate(7),
        room,
      });
      let data = await handleResponse(socket, ev.res_LOGIN);
      expect(data.status).toBe(200);

      socketNew.emit(ev.req_LOGIN, {
        name: randomstring.generate(7),
        room,
      });
      data = await handleResponse(socketNew, ev.res_LOGIN);
      expect(data.status).toBe(200);

      socket.emit(ev.req_LOGOUT, {});
      data = await handleResponse(socket, ev.res_LOGOUT);
      expect(data.status).toBe(200);
    });

    it('should logout error', async () => {
      socket.emit(ev.req_LOGOUT, {});
      const data = await await handleResponse(socket, ev.res_LOGOUT);
      expect(data.status).toBe(500);
    });
  });
});
