import 'regenerator-runtime/runtime';
import Client from 'socket.io-client';

import params from '../../../src/shared/params';
import server from '../../../src/server/index';

import { initSocket, destroySocket, handleResponse } from '../helpers/socket';
import { keys } from '../../../src/server/helpers/gameHelper';

const randomstring = require('randomstring');

const ev = require('../../../src/shared/events');
import logger from '../../../src/server/utils/logger';

const { host, port } = params.server;

describe('# Socket Tests - Player Events', () => {
  let clientSocket;

  beforeAll((done) => {
    server.listen({ host, port: 3003 }, () => {
      logger.info(`Listening on port 3001!`);
      clientSocket = new Client(`http://localhost:3003`);
      clientSocket.on("connect", () => {
          const payload = { name: randomstring.generate(7), room: randomstring.generate(7) };
          clientSocket.emit(ev.req_LOGIN, payload);
          clientSocket.emit(ev.req_START_GAME, payload);
          // setTimeout(4);
          done();
      });
    });
  });

  afterAll(() => {
    destroySocket(clientSocket);
    server.close();
  });

  describe('## Player Events', () => {
    it('should handle move', async () => {
      const payload = {
        name: clientSocket.id,
        room: 'room',
        keyCode: keys.KLEFT,
      };
      clientSocket.emit(ev.req_UPDATE_PLAYER, payload);
      let data = await handleResponse(clientSocket, ev.res_UPDATE_PLAYER);
      expect(data.status).toBe(200);

      payload.keyCode = keys.KRIGHT;
      clientSocket.emit(ev.req_UPDATE_PLAYER, payload);
      data = await handleResponse(clientSocket, ev.res_UPDATE_PLAYER);
      expect(data.status).toBe(200);

      payload.keyCode = keys.KUP;
      clientSocket.emit(ev.req_UPDATE_PLAYER, payload);
      data = await handleResponse(clientSocket, ev.res_UPDATE_PLAYER);
      expect(data.status).toBe(200);

      payload.keyCode = keys.KDOWN;
      clientSocket.emit(ev.req_UPDATE_PLAYER, payload);
      data = await handleResponse(clientSocket, ev.res_UPDATE_PLAYER);
      expect(data.status).toBe(200);

      payload.keyCode = keys.KSPACE;
      clientSocket.emit(ev.req_UPDATE_PLAYER, payload);
      data = await handleResponse(clientSocket, ev.res_UPDATE_GAME_PLAYERS);
      expect(data.status).toBe(200);

      payload.keyCode = keys.KSPACE;
      clientSocket.emit(ev.req_UPDATE_PLAYER, payload);
      data = await handleResponse(clientSocket, ev.res_UPDATE_GAME_PLAYERS);
      expect(data.status).toBe(200);
    });

    it('should handle finish', async () => {
      const payload = {
        name: clientSocket.id,
        room: 'room',
        keyCode: keys.KSPACE,
      };

      for (let i = 0; i < 15; i += 1) {
        clientSocket.emit(ev.req_UPDATE_PLAYER, payload);
      }

      const data = await handleResponse(clientSocket, ev.res_START_GAME);
      expect(data.status).toBe(100);
    });
  });
});
