import { Socket } from '@/server/modules/socket/socket.entity';

export interface Request {
  socket: Socket;
  data: any;
}

export interface Response {
  io: any;
  callback: () => any;
}

export interface Route {
  event: string | { req: string; res: string };
  handler: (req: Request, res?: Response) => void;
  auth?: ((socket: Socket) => { socket: Socket; isLogged: boolean }) | boolean;
  schema?: any | null;
}
