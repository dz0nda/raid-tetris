import { Socket as SocketIo, Server as SocketIoServer } from 'socket.io';

export class SocketEntity {
  id: string;
  user?: string;

  constructor(id: string, user?: string) {
    this.id = id;
    this.user = user;
  }
}

export class Socket {
  private _io: SocketIoServer;
  private _socket: SocketIo;

  constructor(socket: SocketIo, io: SocketIoServer) {
    this._socket = socket;
    this._io = io;
  }

  get getSocketId(): string {
    return this._socket.id;
  }

  set setUsername(username: string) {
    this._socket.data.username = username;
  }

  get getUsername(): string {
    return this._socket.data.username;
  }

  set setRoom(room: string) {
    this._socket.data.room = room;
  }

  get getRoom(): string {
    return this._socket.data.room;
  }

  public value(): SocketIo {
    return this._socket;
  }
}
