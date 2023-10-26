import { Socket as SocketIo } from 'socket.io';
import { IncomingMessage } from 'http';
import session from 'express-session';
import { User } from '../user/user.entity';

interface ExtendedIncomingMessage extends IncomingMessage {
  session?: session.Session & { user: Partial<User> };
}

interface ExtendedSocket extends SocketIo {
  request: ExtendedIncomingMessage;
}

export class Socket {
  private readonly _socket: ExtendedSocket;

  constructor(socket: ExtendedSocket) {
    this._socket = socket;
  }

  public get raw(): ExtendedSocket {
    return this._socket;
  }

  public get id(): string {
    return this._socket.id;
  }

  public get room(): string {
    return this._socket.rooms.values().next().value;
  }
}
