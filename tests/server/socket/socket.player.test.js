// import params from '../../../src/shared/params';
// import RedTetris from '../../../src/server/app';

// import { destroySocket, handleResponse, initSocket } from '../helpers/socket';
// import { keys } from '../../../src/server/helpers/gameHelper';

// const randomstring = require('randomstring');

// const ev = require('../../../src/shared/events');

// const { host, port } = params.server;

// describe('# Socket Tests - Player Events', () => {
//   const server = new RedTetris('0.0.0.0', 3003);
//   let socket;

//   beforeAll(async () => {
//     server.listen();

//     socket = await initSocket(3003);
//     const payload = { name: randomstring.generate(7), room: randomstring.generate(7) };
//     socket.emit(ev.REQUEST_LOGIN, payload);
//     socket.emit(ev.REQUEST_START_GAME, payload);
//     setTimeout(() => {}, 4);
//   });

//   afterAll((done) => {
//     destroySocket(socket);
//     server.close();
//     done();
//   });

//   describe('## Player Events', () => {
//     it('should handle move', async () => {
//       const payload = {
//         name: socket.id,
//         room: 'room',
//         keyCode: keys.KLEFT,
//       };
//       socket.emit(ev.REQUEST_UPDATE_PLAYER, payload);
//       let data = await handleResponse(socket, ev.RESPONSE_UPDATE_PLAYER);
//       expect(data.status).toBe(200);

//       payload.keyCode = keys.KRIGHT;
//       socket.emit(ev.REQUEST_UPDATE_PLAYER, payload);
//       data = await handleResponse(socket, ev.RESPONSE_UPDATE_PLAYER);
//       expect(data.status).toBe(200);

//       payload.keyCode = keys.KUP;
//       socket.emit(ev.REQUEST_UPDATE_PLAYER, payload);
//       data = await handleResponse(socket, ev.RESPONSE_UPDATE_PLAYER);
//       expect(data.status).toBe(200);

//       payload.keyCode = keys.KDOWN;
//       socket.emit(ev.REQUEST_UPDATE_PLAYER, payload);
//       data = await handleResponse(socket, ev.RESPONSE_UPDATE_PLAYER);
//       expect(data.status).toBe(200);

//       payload.keyCode = keys.KSPACE;
//       socket.emit(ev.REQUEST_UPDATE_PLAYER, payload);
//       data = await handleResponse(socket, ev.RESPONSE_UPDATE_GAME_PLAYERS);
//       expect(data.status).toBe(200);

//       payload.keyCode = keys.KSPACE;
//       socket.emit(ev.REQUEST_UPDATE_PLAYER, payload);
//       data = await handleResponse(socket, ev.RESPONSE_UPDATE_GAME_PLAYERS);
//       expect(data.status).toBe(200);
//     });

//     it('should handle finish', async () => {
//       const payload = {
//         name: socket.id,
//         room: 'room',
//         keyCode: keys.KSPACE,
//       };

//       for (let i = 0; i < 15; i += 1) {
//         socket.emit(ev.REQUEST_UPDATE_PLAYER, payload);
//       }

//       const data = await handleResponse(socket, ev.RESPONSE_START_GAME);
//       expect(data.status).toBe(100);
//     });
//   });
// });
