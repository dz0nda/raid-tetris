import express from 'express';
import { Socket as SocketIo, Server as SocketIoServer } from 'socket.io';

import * as http from 'http';

import { Logger } from '@/server/modules/utils/utils';
import { SocketMap } from './socket-map';

export class SocketService {
  host: string;
  port: number;
  // app: express.Server;
  app: http.Server;
  io: SocketIoServer;
  sockets: SocketMap;

  constructor(host: string, port: number) {
    this.host = host;
    this.port = port;
    // this.app = express();
    this.app = http.createServer(express());
    this.io = new SocketIoServer(this.app, {
      pingInterval: 5000,
      pingTimeout: 15000,
    });
    this.sockets = new SocketMap();
  }

  /*
   ** Default routes
   */
  connect(req: any) {
    Logger.info(`Socket ${req.socket.id} connected.`);
  }

  disconnecting(req: any) {
    Logger.info(`Socket ${req.socket.id} disconnecting...`);
  }

  disconnect(req: any) {
    Logger.info(`Socket ${req.socket.id} disconnected.`);
  }

  /*
   ** Server
   */
  public listen() {
    this.app.listen(this.port, () => {
      Logger.info(`Server listening on port ${this.port}`);
    });
  }

  public close() {
    this.app.close((err: any) => {
      Logger.info('server closed');
      process.exit(err ? 1 : 0);
    });
  }

  /*
   ** Socket
   */
  public ioOn(callback: (socket: SocketIo) => void) {
    this.io.on('connection', callback);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public emitToRoom(room: string, event: string, data: any) {
    this.io.in(room).emit(event, data);
  }

  public emitToSocket(id: string, event: string, data: any) {
    this.io.to(id).emit(event, data);
}
