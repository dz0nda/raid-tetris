// import { Socket } from 'socket.io-client';

// const randomstring = require('randomstring');

// import { events } from '../../src/shared/events';

// import { RedTetris } from '../../src/server/app';

// import { destroySocket, handleResponse, initSocket } from './helpers/socket';

// describe('# Socket Tests - Game Events', () => {
//   const server = new RedTetris('0.0.0.0', 3003);
//   let socket: Socket;

//   beforeAll(async () => {
//     server.listen();

//     socket = await initSocket(3003);

//     const payload = { name: 'name', room: 'room' };
//     socket.emit(events.REQUEST_LOGIN, payload);
//   });

//   afterAll(async () => {
//     await destroySocket(socket);
//     server.close();
//     // done();
//   });

//   describe('## Owner Events', () => {
//     it('should owner success', async () => {
//       const payload = { newOwner: 'newName' };

//       socket.emit(events.REQUEST_UPDATE_GAME_OWNER, payload);
//       const data = await handleResponse(socket, events.RESPONSE_UPDATE_GAME);
//       expect(data.status).toBe(200);
//     });

//     it('should owner error', async () => {
//       const socketMalicious = await initSocket(3003);
//       const payload = { newOwner: 'newName' };

//       socketMalicious.emit(events.REQUEST_UPDATE_GAME_OWNER, payload);
//       const data = await handleResponse(socketMalicious, events.RESPONSE_UPDATE_GAME_OWNER);

//       console.log(data.message);
//       expect(data.status).toBe(500);
//     });
//   });
// });
