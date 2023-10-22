import { SocketService } from './socket.service';

import { Request, Route } from '@/server/modules/utils/types';
import { Logger } from '@/server/modules/utils/utils';

export class SocketController {
  service: SocketService;
  routes: Route[];

  constructor(service: SocketService) {
    this.service = service;
    this.routes = [
      {
        event: { req: 'connection' },
        handler: this.connect.bind(this),
      },
      {
        event: { req: 'disconnecting' },
        handler: this.disconnecting.bind(this),
      },
      {
        event: { req: 'disconnect' },
        handler: this.disconnect.bind(this),
      },
    ];
  }

  get getRoutes() {
    return this.routes;
  }

  connect(req: Request<unknown>) {
    Logger.info(`Socket ${req.socket.getSocketId} connected.`);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  disconnecting(req: any) {
    Logger.info(`Socket ${req.socket.id} disconnecting...`);
  }

  disconnect(req: Request<unknown>) {
    Logger.info(`Socket ${req.socket.getSocketId} disconnected.`);
  }
}
