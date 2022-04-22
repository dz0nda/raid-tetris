import 'regenerator-runtime/runtime';

// const { createServer } = require("http");
// const { Server } = require("clientSocket.io");
// const Client = require("clientSocket.io-client");

import { createServer } from 'http';
import { Server } from 'socket.io';
import Client from 'socket.io-client';

import params from '../../../src/shared/params';
import server from '../../../src/server/index';

import { initSocket, destroySocket, handleResponse } from '../helpers/socket';

const randomstring = require('randomstring');

const ev = require('../../../src/shared/events');
import logger from '../../../src/server/utils/logger';

const { host, port } = params.server;

describe('# Socket Tests - App Events', () => {
  let clientSocket, clientSocket2;

  beforeAll((done) => {
    server.listen({ host, port: 3001 }, () => {
      logger.info(`Listening on port 3001!`);
      clientSocket = new Client(`http://localhost:3001`);
      clientSocket.on("connect", () => {
        clientSocket2 = new Client(`http://localhost:3001`);
        clientSocket2.on("connect", done);
      });
    });
  });

  afterAll(() => {
    server.close();
    clientSocket.close();
    clientSocket2.close();
  });


  // beforeAll(async () => {
  //   server.listen({ host, port: 3001 }, async () => {
  //     logger.info(`Listening on port 3001!`);
  //     clientSocket = await initSocket(3001);
  //     console.log(clientSocket);
  //   });
  // });

  // afterAll(() => {
  //   destroySocket(clientSocket);
  //   server.close();
  // });

  describe('## Login Events', () => {
    it('should login success', async () => {
      const payload = {
        name: randomstring.generate(7),
        room: randomstring.generate(7),
      };

      clientSocket.emit(ev.req_LOGIN, payload);
      const data = await handleResponse(clientSocket, ev.res_LOGIN);
      expect(data.status).toBe(200);
    });

    it('should login error', async () => {
      const payload = {
        name: randomstring.generate(7),
        room: '',
      };

      clientSocket.emit(ev.req_LOGIN, payload);

      const data = await handleResponse(clientSocket, ev.res_LOGIN);

      expect(data.status).toBe(500);
    });
  });

  describe('## Logout Events', () => {
    it('should logout success', async () => {
      const payload = {
        name: randomstring.generate(7),
        room: randomstring.generate(7),
      };

      clientSocket.emit(ev.req_LOGIN, payload);
      let data = await handleResponse(clientSocket, ev.res_LOGIN);
      expect(data.status).toBe(200);

      clientSocket.emit(ev.req_LOGOUT, payload);
      data = await handleResponse(clientSocket, ev.res_LOGOUT);
      expect(data.status).toBe(200);
    });

    it('should logout success - not destroy the room', async () => {
      const room = randomstring.generate(7);
      // const socketNew = await initSocket(3001);

      clientSocket.emit(ev.req_LOGIN, {
        name: randomstring.generate(7),
        room,
      });
      let data = await handleResponse(clientSocket, ev.res_LOGIN);
      expect(data.status).toBe(200);

      clientSocket2.emit(ev.req_LOGIN, {
        name: randomstring.generate(7),
        room,
      });
      data = await handleResponse(clientSocket2, ev.res_LOGIN);
      expect(data.status).toBe(200);

      clientSocket.emit(ev.req_LOGOUT, {});
      data = await handleResponse(clientSocket, ev.res_LOGOUT);
      expect(data.status).toBe(200);
    });

    it('should logout error', async () => {
      clientSocket.emit(ev.req_LOGOUT, {});
      const data = await await handleResponse(clientSocket, ev.res_LOGOUT);
      expect(data.status).toBe(500);
    });
  });
});
