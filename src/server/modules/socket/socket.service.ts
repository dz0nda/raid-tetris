import { Socket as SocketIo, Server as SocketIoServer } from 'socket.io';

import { DatabaseService } from '../database/database.service';
import { HttpService } from '../http/http.service';
import { SocketEntity } from './socket.entity';
import { Base } from '../utils/service';

export class SocketService extends Base {
  io!: SocketIoServer;

  constructor(private dbService: DatabaseService, httpService: HttpService) {
    super('SocketService');

    this.io = new SocketIoServer(httpService.getHttp(), {
      pingInterval: 5000,
      pingTimeout: 15000,
    });
  }

  /**
   * Create / update a room by its name.
   *
   * @param room - The room object.
   * @returns The room if found, otherwise null.
   */
  async setSocket(socket: SocketEntity): Promise<void> {
    try {
      await this.dbService.set('sockets', socket.id, socket);
    } catch (error) {
      this.err(`Error setting socket: ${(error as Error).message}`);
    }
  }

  /**
   * Fetches a room by its name.
   *
   * @param roomName - The room name.
   * @returns The room if found, otherwise null.
   */
  async getSocket(socketId: string): Promise<SocketEntity | null> {
    try {
      return await this.dbService.get<SocketEntity>('sockets', socketId);
    } catch (error) {
      this.log(`Error getting socket: ${(error as Error).message}`);
      return null;
    }
  }

  /**
   * Fetches a room by its name.
   *
   * @param roomName - The room name.
   * @returns The room if found, otherwise null.
   */
  async deleteSocket(socketId: string): Promise<void> {
    return this.dbService.del('sockets', socketId);
  }

  /*
   ** Events
   */
  public connect(socket: SocketIo) {
    this.log(`Socket ${socket.id} connected.`);
    this.setSocket(new SocketEntity(socket.id));
  }

  public disconnecting(socket: SocketIo) {
    this.log(`Socket ${socket.id} is disconnecting...`);
  }

  public disconnect(socket: SocketIo) {
    this.log(`Socket ${socket.id} diconnected.`);
    this.deleteSocket(socket.id);
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
