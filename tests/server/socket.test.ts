// import 'regenerator-runtime/runtime';

import params from '@/shared/params';
import ev from '@/shared/events';

import { destroySocket, handleResponse, initSocket } from './helpers/socket';
import { Socket } from 'socket.io-client';

const randomstring = require('randomstring');

// const ev = require('../../../src/shared/events');

const { host, port } = params.server;

describe('# Socket Tests - Auth', () => {
  let socket: Socket;

  beforeAll(async () => {
    socket = await initSocket(3000);
  });

  afterAll((done) => {
    destroySocket(socket);
    done();
  });

  // it('[Auth] Login with name and password should succeed', async () => {
  //   const payload = {
  //     name: randomstring.generate(7),
  //     password: randomstring.generate(7),
  //   };

  //   socket.emit(ev.REQUEST_LOGIN, payload);
  //   const data = await handleResponse(socket, ev.RESPONSE_LOGIN);
  //   console.log(data);
  //   expect(data.status).toBe(200);
  //   expect(data.payload.user.name).toBe(payload.name);
  // });

  describe('[Auth] Join Room', () => {
    const name = randomstring.generate(7);
    const room = randomstring.generate(7);

    it('[Auth] Login with name only should succeed', async () => {
      const payload = { name };

      socket.emit(ev.REQUEST_LOGIN, payload);
      const data = await handleResponse(socket, ev.RESPONSE_LOGIN);

      expect(data.status).toBe(200);
      expect(data.payload.user.name).toBe(payload.name);
    });

    // it('[Auth] Join room should succeed', async () => {
    //   const payload = {
    //     name,
    //     room,
    //   };

    //   socket.emit(ev.REQUEST_JOIN_ROOM, payload);
    //   const data = await handleResponse(socket, ev.RESPONSE_JOIN_ROOM);

    //   expect(data.status).toBe(200);
    //   expect(data.payload.room.room).toBe(payload.room);
    // });
  });
});
