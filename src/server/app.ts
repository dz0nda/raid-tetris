import 'reflect-metadata';
import { Socket as SocketIo, Server as SocketIoServer } from 'socket.io';

import { Route } from '@/server/modules/utils/types';
import { Logger } from './modules/utils/utils';

// import { DatabaseModule } from './modules/database/database.module';
import { SocketModule } from './modules/socket/socket.module';
import { Socket } from './modules/socket/socket.entity';

import { AuthModule } from './modules/auth/auth.modules';
import { ChatsModule } from './modules/chats/chats.module';
import { RoomsModule } from './modules/rooms/rooms.module';

export class RedTetris {
  socket: SocketModule;
  rooms: RoomsModule;
  chats: ChatsModule;
  auth: AuthModule;
  // db: DatabaseModule;
  routes: Route[];

  constructor(host: string, port: number) {
    this.socket = new SocketModule(host, port);
    this.chats = new ChatsModule(this.socket.service);
    this.rooms = new RoomsModule(this.socket.service);
    this.auth = new AuthModule(this.rooms.service, this.chats.service);
    // this.db = new DatabaseModule();

    this.routes = [
      ...this.socket.controller.getRoutes,
      ...this.rooms.controller.getRoutes,
      ...this.chats.controller.getRoutes,
      ...this.auth.controller.getRoutes,
    ];

    this.socket.service.ioOn((socket: SocketIo) => this._router(this.socket.service.io, socket));
  }

  private _router(io: SocketIoServer, socketIo: SocketIo) {
    const socket = new Socket(socketIo, io);
    this.socket.service.connect({ socket: socket.value() });

    this.routes.forEach((route) => {
      const { event, handler, auth, schema } = route;

      Logger.info(`Socket ${socket.getSocketId} listening on ${event.req}`);
      socket.value().on(event.req, (data: any, callback: any) => {
        if (schema && schema.validate(data).error) {
          Logger.err(`[${event}] Error: invalid arguments`);
        }

        try {
          handler({ socket, data }, { io: this.socket.service.io, callback });
        } catch (err) {
          Logger.err(`[${event}] Error: ${err}`);

          socket.emitToSocket(socket.getSocketId, event.res, {
            status: 500,
            message: err,
          });
        }
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
    // });
  }

  public listen() {
    this.socket.service.listen();
  }
}
