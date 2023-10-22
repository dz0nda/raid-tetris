import { Socket } from '@/server/modules/socket/socket.entity';
import { User } from '../user/user.entity';

export interface Request<T> {
  socket: Socket;
  data: T;
  user?: User;
}

export interface Response {
  io: any;
  callback: () => any;
}

export interface Route {
  event: { req: string; res?: string };
  handler: (req: Request<any>, res?: Response) => void;
  auth?: ((socket: Socket) => { socket: Socket; isLogged: boolean }) | boolean;
  schema?: any | null;
}
