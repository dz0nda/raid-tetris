/* eslint-disable max-classes-per-file */

// import Io, { Request } from '@/server/server/Io';

// import { Socket } from 'socket.io-client';
import { Room } from './room.entity';

export class RoomsService {
  // socket: SocketModule;
  rooms: Record<string, Room>;

  constructor() {
    // this.socket = socket;
    this.rooms = {};
  }

  private _setRoom(id: string, room: string, name: string, pass?: string): Room {
    return (this.rooms[room] = new Room(id, room, name, pass));
  }

  public getRoom(room: string): Room | null {
    return this.rooms[room] || null;
  }

  public getOrCreateRoom(id: string, room: string, name: string, pass?: string): Room {
    return this.getRoom(room) || this._setRoom(id, room, name, pass);
  }

  unsetRoom(room: string): void {
    delete this.rooms[room];
  }
}
