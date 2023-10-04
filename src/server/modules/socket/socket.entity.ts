import { Socket as SocketIo, Server as SocketIoServer } from 'socket.io';

export class Socket {
  private _io: SocketIoServer;
  private _socket: SocketIo;

  constructor(socket: SocketIo, io: SocketIoServer) {
    this._socket = socket;
    this._io = io;
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

  // public emitToAll(event: string, data: any) {

  // }

  // emitToAll(event: any, data: any) {
  //   this.io.emit(event, data);
  // }

  // emitToSocket(id: string, event: any, data: any) {
  //   this.sockets.get(id)?.emit(event, data);
  // }

  public emitToRoom(room: string, event: any, data: any) {
    this._io.in(room).emit(event, data);
  }

  // emitToRoomExceptSender(id: string, room: string, event: any, data: any) {
  //   this.sockets.get(id)?.to(room).emit(event, data);
  // }
}
