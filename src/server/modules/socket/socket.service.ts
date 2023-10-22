import { Socket as SocketIo, Server as SocketIoServer } from 'socket.io';

import { Logger } from '@/server/modules/utils/utils';
import { SocketMap } from './socket-map';
import { DatabaseService } from '../database/database.service';
import { HttpService } from '../http/http.service';

export class SocketService {
  io!: SocketIoServer;
  sockets!: SocketMap;

  constructor(private dbService: DatabaseService, httpService: HttpService) {
    this.io = new SocketIoServer(httpService.getHttp(), {
      pingInterval: 5000,
      pingTimeout: 15000,
    });
    this.sockets = new SocketMap();
  }

  /**
   * Create / update a room by its name.
   *
   * @param room - The room object.
   * @returns The room if found, otherwise null.
   */
  // async setSocket(socket: Socket): Promise<void> {
  //   this.dbService.set('room', , room);
  // }

  // /**
  //  * Fetches a room by its name.
  //  *
  //  * @param roomName - The room name.
  //  * @returns The room if found, otherwise null.
  //  */
  // async getRoom(room: string): Promise<Room | null> {
  //   return this.dbService.get<Room>('room', room);
  // }

  /*
   ** Server
   */
  // public listen() {
  //   this.app.listen(this.port, () => {
  //     Logger.info(`Server listening on port ${this.port}`);
  //   });
  // }

  // public close() {
  //   this.app.close((err: any) => {
  //     Logger.info('server closed');
  //     // process.exit(err ? 1 : 0);
  //   });
  // }

  /*
   ** Events
   */
  public connect(socket: SocketIo) {
    Logger.info(`Socket ${socket.id} connected.`);
    // this.sockets.set(socket.id, socket);
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

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public emitToSocket(id: string, event: string, data: any) {
    this.io.to(id).emit(event, data);
  }
}
