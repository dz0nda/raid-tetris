// import 'regenerator-runtime/runtime';

import params from '@/shared/params';
import ev from '@/shared/events';

import { destroySocket, handleResponse, initSocket } from './helpers/socket';
import { Socket } from 'socket.io-client';
import { RedTetris } from '@/server/app';

const randomstring = require('randomstring');

// const ev = require('../../../src/shared/events');

const { host, port } = params.server;

describe('[e2e] Auth', () => {
  let app: RedTetris;
  let socket: Socket;

  // beforeAll(() => {
  //   app = new RedTetris();
  //   app.listen(host, port);
  // });

  // afterAll(() => {
  //   app.close();
  // });

  beforeEach(async () => {
    socket = await initSocket(3000);
  });

  afterEach((done) => {
    destroySocket(socket);
    done();
  });

  describe('Login - Anonymous', () => {
    const username = randomstring.generate(7);
    const room = randomstring.generate(7);

    it('should successfully log in with a username only', async () => {
      const payload = { username };

      socket.emit(ev.REQUEST_LOGIN, payload);
      const data = await handleResponse(socket, ev.RESPONSE_LOGIN);

      expect(data.status).toBe(200);
      expect(data.payload.user.username).toBe(payload.username);
    });

    it('should handle login errors gracefully', async () => {
      // Assuming an invalid payload would cause an error.
      const invalidPayload = { username: '' }; // empty username for instance

      socket.emit(ev.REQUEST_LOGIN, invalidPayload);
      const data = await handleResponse(socket, ev.RESPONSE_LOGIN);

      expect(data.status).toBe(500);
      expect(data.payload).toBeNull();
    });
  });

  describe('Login - Registered', () => {
    const username = randomstring.generate(7);
    const password = randomstring.generate(7);
    const room = randomstring.generate(7);

    it('should successfully log in with a username and password', async () => {
      const loginPayload = { username, password };

      socket.emit(ev.REQUEST_LOGIN, loginPayload);
      const data = await handleResponse(socket, ev.RESPONSE_LOGIN);

      expect(data.status).toBe(200);
      expect(data.payload.user.username).toBe(loginPayload.username);
    });

    it('should handle login errors gracefully', async () => {
      // Assuming an invalid payload would cause an error.
      const invalidPayload = { username: '', password: '' }; // empty username and password for instance

      socket.emit(ev.REQUEST_LOGIN, invalidPayload);
      const data = await handleResponse(socket, ev.RESPONSE_LOGIN);

      expect(data.status).toBe(500);
      expect(data.payload).toBeNull();
    });
  });

  // describe('Logout', () => {
  //   it('should successfully log out a logged-in user', async () => {
  //     // Assuming a previous successful login.
  //     const loginPayload = { username: randomstring.generate(7) };

  //     socket.emit(ev.REQUEST_LOGIN, loginPayload);
  //     await handleResponse(socket, ev.RESPONSE_LOGIN);

  //     const logoutPayload = {}; // Assuming no special data needed for logout
  //     socket.emit(ev.REQUEST_LOGOUT, logoutPayload);
  //     const data = await handleResponse(socket, ev.RESPONSE_LOGOUT);

  //     expect(data.status).toBe(200);
  //     expect(data.payload.user).toBeNull();
  //   });

  //   it('should handle logout errors gracefully', async () => {
  //     // Assuming logging out without logging in first would cause an error.
  //     const logoutPayload = {};
  //     socket.emit(ev.REQUEST_LOGOUT, logoutPayload);
  //     const data = await handleResponse(socket, ev.RESPONSE_LOGOUT);

  //     expect(data.status).toBe(500);
  //     expect(data.payload).toBeNull();
  //   });
  // });
});
