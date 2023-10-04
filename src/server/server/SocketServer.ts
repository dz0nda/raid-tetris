import express, { Application } from 'express';
import { Socket, Server as SocketIoServer } from 'socket.io';

const http = require('http');

import { Logger } from '@/server/modules/utils/utils';

export interface Request {
  socket: Socket;
  data: any;
}

export interface Response {
  io: any;
  callback: () => {};
}

export interface Route {
  event: string | { req: string; res: string };
  handler: (req: Request, res: Response) => void;
  auth?: ((socket: Socket) => { socket: Socket; isLogged: boolean }) | boolean;
  schema?: any | null;
}

export class SocketServer {
  host: string;
  port: number;
  app: Application;
  server: any;
  io: SocketIoServer;
  sockets: { [key: string]: any };
  defaultRoutes: Route[];

  constructor(host: string, port: number) {
    this.host = host;
    this.port = port;
    this.app = express();
    this.server = http.createServer(this.app);
    this.io = new SocketIoServer(this.server, {
      pingInterval: 5000,
      pingTimeout: 15000,
    });
    this.sockets = {};

    this.defaultRoutes = [
      {
        event: 'connect',
        handler: this.connect.bind(this),
      },
      {
        event: 'disconnecting',
        handler: this.disconnecting.bind(this),
      },
      {
        event: 'disconnect',
        handler: this.disconnect.bind(this),
      },
    ];
  }

  private setSocket(socket: any) {
    this.sockets[socket.id] = socket;
  }

  private deleteSocket(id: string) {
    delete this.sockets[id];
  }

  private getSocket(id: string) {
    return this.sockets[id];
  }

  private getSocketRoom(socket: Socket): string {
    // socket.rooms.forEach((room: string) => {
    //   console.log('room', room);
    //   if (room !== socket.id) {
    //     return room
    //   }
    // });
    for (const room of socket.rooms.values()) {
      if (room !== socket.id) {
        return room;
      }
    }

    throw new Error('Socket is not in a room');
  }

  emitToAll(event: any, data: any) {
    this.io.emit(event, data);
  }

  emitToSocket(id: string, event: any, data: any) {
    this.getSocket(id).emit(event, data);
  }

  emitToRoom(room: string, event: any, data: any) {
    this.io.in(room).emit(event, data);
  }

  emitToRoomExceptSender(id: string, room: string, event: any, data: any) {
    this.getSocket(id).to(room).emit(event, data);
  }

  isLogged(socket: Socket) {
    return { socket, isLogged: socket.rooms.size === 2 ? true : false };
  }

  router(routes: any[]) {
    this.io.on('connection', (socket: any) => {
      this.connect({ socket });

      this.defaultRoutes.forEach((route) => {
        const { event, handler } = route;
        socket.on(event, (data: any, callback: any) => {
          handler({ socket, data }, { io: this.io, callback });
        });
      });

      routes.forEach((route) => {
        const { event, handler, auth } = route;
        socket.on(event.req, (data: any, callback: any) => {
          // console.log(data);
          let isLogged = false;
          // eslint-disable-next-line no-param-reassign
          ({ socket, isLogged } = auth ? auth(socket) : { socket, isLogged: true });
          console.log(socket.redTetris, isLogged);
          if (!socket || !isLogged) {
            this.emitToSocket(socket.id, event.res, {
              status: 500,
              message: 'Unauthorized',
            });

            return;
          }
          // if (schema && schema.validate(data).error) {
          //   this.emitToSocket(socket.id, event.res, {
          //     status: 500,
          //     message: 'Invalid arguments',
          //   });

          //   return;
          // }

          handler({ socket, data }, { io: this.io, callback });
        });
      });
    });
  }

  /*
   ** Default routes
   */
  connect(req: any) {
    this.setSocket(req.socket);
  }

  disconnecting(req: any) {
    // console.log(req.socket.rooms);
  }

  disconnect(req: any) {
    this.deleteSocket(req.socket.id);
  }

  /*
   ** Server
   */
  public listen() {
    this.server.listen(this.port, () => {
      Logger.info(`Server listening on port ${this.port}`);
    });
  }

  public close() {
    this.server.close((err: Error) => {
      Logger.info('server closed');
      process.exit(err ? 1 : 0);
    });
  }
}
