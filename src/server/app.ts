/* eslint-disable max-classes-per-file */

// import Io, { Request } from '@/server/server/Io';
import 'reflect-metadata';
import { Socket as SocketIo } from 'socket.io';

import { Route } from '@/server/server/SocketServer';
import Game from '@/server/app/Game';
import { Rooms } from '@/server/app/room/Rooms';
import { Chats } from '@/server/app/chat/Chats';
import { DatabaseModule } from './modules/database/database.module';
// import { Socket } from 'socket.io-client';
import { SocketModule } from './modules/socket/socket.module';
import { Socket } from './modules/socket/socket.entity';

import { Logger } from './modules/utils/utils';

export class RedTetris {
  socket: SocketModule;
  games: { [key: string]: Game };
  rooms: Rooms;
  chats: Chats;
  routes: Route[];
  db: DatabaseModule;

  constructor(host: string, port: number) {
    // super(host, port);
    this.socket = new SocketModule(host, port);
    this.db = new DatabaseModule();
    // this.db.;
    // this.authService = new AuthService(this.server);
    // this.authController = new AuthController(new AuthService(this.server));
    this.games = {};
    this.rooms = new Rooms();
    this.chats = new Chats();
    this.routes = [...this.socket.controller.getDefaultsRoutes()];

    this.router(this.routes);
  }

  public listen() {
    this.socket.service.listen();
  }

  router(routes: any[]) {
    this.socket.service.ioOn((socket: SocketIo) => {
      const clientSocket = new Socket(socket, this.socket.service.io);
      this.socket.service.connect({ socket: clientSocket.value() });

      this.routes.forEach((route) => {
        const { event, handler, auth, schema } = route;

        Logger.info(`Socket ${socket.id} listening on ${event}`);
        socket.on(event as string, (data: any, callback: any) => {
          if (schema.validate(data).error) {
            Logger.error(`Socket ${socket.id} invalid arguments on ${event}`);
            // this.emitToSocket(socket.id, event.res, {
            //   status: 500,
            //   message: 'Invalid arguments',
            // });
          }
          handler({ socket, data }, { io: this.socket.service.io, callback });
        });
      });

      // routes.forEach((route) => {
      //   const { event, handler, auth } = route;
      //   socket.on(event.req, (data: any, callback: any) => {
      //     // console.log(data);
      //     let isLogged = false;
      //     // eslint-disable-next-line no-param-reassign
      //     ({ socket, isLogged } = auth ? auth(socket) : { socket, isLogged: true });
      //     console.log(socket.redTetris, isLogged);
      //     if (!socket || !isLogged) {
      //       this.emitToSocket(socket.id, event.res, {
      //         status: 500,
      //         message: 'Unauthorized',
      //       });

      //       return;
      //     }
      //     // if (schema && schema.validate(data).error) {
      //     //   this.emitToSocket(socket.id, event.res, {
      //     //     status: 500,
      //     //     message: 'Invalid arguments',
      //     //   });

      //     //   return;
      //     // }

      //     handler({ socket, data }, { io: this.io, callback });
      //   });
      // });
    });
  }
}
