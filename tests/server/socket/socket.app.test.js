// import 'regenerator-runtime/runtime';
import { Socket, io } from 'socket.io-client';

import params from '../../../src/shared/params';
import RedTetris from '../../../src/server/app/RedTetris';

import { initSocket, destroySocket, handleResponse } from '../helpers/socket';

const randomstring = require('randomstring');

const ev = require('../../../src/shared/events');

const { host, port } = params.server;

describe('# Socket Tests - App Events', () => {
  const server = new RedTetris('0.0.0.0', 3001);

  beforeEach(async () => {
    // server.listen({ host, port: 3001 }, () => {
    //   console.log(`Listening on port ${port}!`);
    // });
    server.listen();
    socket = await initSocket(3001);
    // done();
    // console.log(socket)
  });

  afterEach((done) => {
    destroySocket(socket);
    server.close();
    done();
  });

  describe('## Login Events', () => {
    it('should login success', async () => {
      const payload = {
        name: randomstring.generate(7),
        room: randomstring.generate(7),
      };

      socket.emit(ev.REQUEST_LOGIN, payload);
      const data = await handleResponse(socket, ev.RESPONSE_LOGIN);
      expect(data.status).toBe(200);
    });

    it('should login error', async () => {
      const payload = {
        name: randomstring.generate(7),
        room: '',
      };

      socket.emit(ev.REQUEST_LOGIN, payload);

      const data = await handleResponse(socket, ev.RESPONSE_LOGIN);

      expect(data.status).toBe(500);
    });
  });

  describe('## Logout Events', () => {
    it('should logout success', async () => {
      const payload = {
        name: randomstring.generate(7),
        room: randomstring.generate(7),
      };

      socket.emit(ev.REQUEST_LOGIN, payload);
      let data = await handleResponse(socket, ev.RESPONSE_LOGIN);
      expect(data.status).toBe(200);

      socket.emit(ev.REQUEST_LOGOUT, payload);
      data = await handleResponse(socket, ev.RESPONSE_LOGOUT);

      console.log(data);
      expect(data.status).toBe(200);
    });

    it('should logout success - not destroy the room', async () => {
      const room = randomstring.generate(7);
      const socketNew = await initSocket(3001);

      socket.emit(ev.REQUEST_LOGIN, {
        name: randomstring.generate(7),
        room,
      });
      let data = await handleResponse(socket, ev.RESPONSE_LOGIN);
      expect(data.status).toBe(200);

      socketNew.emit(ev.REQUEST_LOGIN, {
        name: randomstring.generate(7),
        room,
      });
      data = await handleResponse(socketNew, ev.RESPONSE_LOGIN);
      expect(data.status).toBe(200);

      socket.emit(ev.REQUEST_LOGOUT, {});
      data = await handleResponse(socket, ev.RESPONSE_LOGOUT);
      expect(data.status).toBe(200);
    });

    it('should logout error', async () => {
      socket.emit(ev.REQUEST_LOGOUT, {});
      const data = await handleResponse(socket, ev.RESPONSE_LOGOUT);
      expect(data.status).toBe(500);
    });
  });
});
