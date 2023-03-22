import socketIO from 'socket.io';

import Server from './Server';

export default class Io extends Server {
  constructor(host, port) {
    super(host, port);
    this.io = socketIO(this.server, {
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

  setSocket(socket) {
    this.sockets[socket.id] = socket;
  }

  deleteSocket(id) {
    delete this.sockets[id];
  }

  getSocket(id) {
    return this.sockets[id];
  }

  isConnected(socket) {
    return this.getSocket(socket.id) !== undefined;
  }

  emitToAll(event, data) {
    this.io.emit(event, data);
  }

  emitToSocket(id, event, data) {
    this.getSocket(id).emit(event, data);
  }

  emitToRoom(room, event, data) {
    this.io.in(room).emit(event, data);
  }

  emitToRoomExceptSender(id, room, event, data) {
    this.getSocket(id).to(room).emit(event, data);
  }

  router(routes) {
    this.io.on('connection', (socket) => {
      this.connect({ socket }, { io: this.io });

      this.defaultRoutes.forEach((route) => {
        const { event, handler } = route;
        socket.on(event, (data, callback) => {
          handler({ socket, data }, { io: this.io, callback });
        });
      });

      routes.forEach((route) => {
        const { event, handler, auth, schema } = route;
        socket.on(event.req, (data, callback) => {
          // console.log(data);
          let isLogged = false;
          // eslint-disable-next-line no-param-reassign
          ({ socket, isLogged } = auth ? auth(socket) : { socket, isLogged: true });
          if (!socket) {
            this.emitToSocket(socket.id, event.res, {
              status: 500,
              message: 'Unauthorized',
            });
          }
          if (schema && schema.validate(data).error) {
            this.emitToSocket(socket.id, event.res, {
              status: 500,
              message: 'Invalid arguments',
            });
          }

          handler({ socket, data }, { io: this.io, callback });
        });
      });
    });
  }

  connect(req) {
    this.setSocket(req.socket);
  }

  disconnect(req) {
    this.deleteSocket(req.socket.id);
  }
}
