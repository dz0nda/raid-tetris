// import 'regenerator-runtime/runtime';

import params from '@/shared/params';
import ev from '@/shared/events';

import { destroySocket, handleResponse, initSocket } from '../helpers/socket';
import { Socket } from 'socket.io-client';
import { RedTetris } from '@/server/app';

const randomstring = require('randomstring');

const { host, port } = params.server;

describe('[e2e] Room', () => {
  let app: RedTetris;
  let socket: Socket;
  const name = randomstring.generate(7);

  beforeAll(() => {
    app = new RedTetris();
    app.listen(host, port);
  });

  afterAll(() => {
    app.close();
  });

  beforeEach(async () => {
    socket = await initSocket(3000);
    socket.emit(ev.REQUEST_LOGIN, { name });
  });

  afterEach((done) => {
    handleResponse(socket, ev.RESPONSE_LOGOUT);
    destroySocket(socket);
    done();
  });

  describe('Join Room', () => {
    const room = randomstring.generate(7);
  });
});
