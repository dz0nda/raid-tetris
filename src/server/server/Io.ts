import { Server as SocketServer, Socket } from 'socket.io';

import Server from './Server';

export interface Request {
  socket: Socket & { redTetris?: any };
  data: any;
}

export interface Response {
  io: any;
  callback: () => {};
}

export default class Io extends Server {
  io: any;
  sockets: { [key: string]: any };
  defaultRoutes: { event: string; handler: any }[];

  constructor(host: string, port: number) {
    super(host, port);
    this.io = new SocketServer(this.server, {
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
        event: 'disconnect',
        handler: this.disconnect.bind(this),
      },
    ];
  }

  setSocket(socket: any) {
    this.sockets[socket.id] = socket;
  }

  deleteSocket(id: string) {
    delete this.sockets[id];
  }

  getSocket(id: string) {
    return this.sockets[id];
  }

  isConnected(id: string) {
    return this.getSocket(id) !== undefined;
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

  connect(req: any) {
    this.setSocket(req.socket);
  }

  disconnect(req: any) {
    this.deleteSocket(req.socket.id);
  }
}
