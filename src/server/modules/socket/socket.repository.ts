import { DatabaseService } from '@/modules/database/database.service';
import { SocketEntity } from './socket.entity';

export interface ISocketRepository {
  service: DatabaseService;
  setSocket(socket: SocketEntity): Promise<void>;
  getSocket(socketId: string): Promise<SocketEntity | null>;
  deleteSocket(socketId: string): Promise<void>;
}

export class SocketRepository implements ISocketRepository {
  constructor(private readonly dbService: DatabaseService) {}

  /**
   * Get the database service.
   *
   * @returns The database service.
   *
   */
  get service(): DatabaseService {
    return this.dbService;
  }

  /**
   * Create / update a socket by its ID.
   *
   * @param socket - The socket object.
   */
  async setSocket(socket: SocketEntity): Promise<void> {
    return this.dbService.set('socket', socket.id, socket);
  }

  /**
   * Fetches a socket by its id.
   *
   * @param socketId - The socket id.
   * @returns The socket if found, otherwise null.
   */
  async getSocket(socketId: string): Promise<SocketEntity | null> {
    return this.dbService.get<SocketEntity>('socket', socketId);
  }

  /**
   * Deletes a socket by its id.
   *
   * @param socketId - The socket id.
   */
  async deleteSocket(socketId: string): Promise<void> {
    return this.dbService.del('sockets', socketId);
  }
}
