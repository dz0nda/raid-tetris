/* eslint-disable max-classes-per-file */

// import Io, { Request } from '@/server/server/Io';

// import { Socket } from 'socket.io-client';
import { Room } from '@/server/app/room/Room';
import { SocketModule } from '../socket/socket.module';

export class RoomsService {
  socket: SocketModule;
  rooms: Record<string, Room>;

  constructor(socket: SocketModule) {
    this.socket = socket;
    this.rooms = {};
  }

  private _setRoom(room: string, name: string): Room {
    return (this.rooms[room] = new Room(room, name));
  }

  public getRoom(room: string): Room | null {
    return this.rooms[room] || null;
  }

  public getOrCreateRoom(room: string, name: string): Room {
    return this.getRoom(room) || this._setRoom(room, name);
  }

  unsetRoom(room: string): void {
    delete this.rooms[room];
  }

  public login(room: string, socketId: string, name: string): void {
    // const roomObj = this.getOrCreateRoom(room, name);
    // roomObj.addPlayer(socketId, name);
    // this.socket.service.joinRoom(socketId, room);
  }
}
