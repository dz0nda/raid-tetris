import { Socket } from '@/server/modules/socket/socket.helper';
import { User } from '../user/user.entity';

export interface Request<T> {
  socket: Socket;
  data: T;
  user: User;
}

export interface Response {
  io: any;
  callback: () => any;
}

export type AuthLogged = (socketId: string) => Promise<User>;
export type AuthLoggedRoom = (socketId: string, roomId: string) => Promise<User>;

export interface Route {
  event: { req: string; res?: string };
  handler: (req: Request<any>, res?: Response) => Promise<void>;
  auth?: null | AuthLogged | AuthLoggedRoom;
  schema?: any | null;
}
