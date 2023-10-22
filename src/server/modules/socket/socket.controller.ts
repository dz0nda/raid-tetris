import { SocketService } from './socket.service';

import { Request, Route } from '@/server/modules/utils/types';

export class SocketController {
  service: SocketService;
  routes: Route[];

  constructor(service: SocketService) {
    this.service = service;
    this.routes = [
      {
        event: { req: 'connect' },
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
    this.service.connect(req.socket.value());
  }

  disconnecting(req: Request<unknown>) {
    this.service.disconnecting(req.socket.value());
  }

  disconnect(req: Request<unknown>) {
    this.service.disconnect(req.socket.value());
  }
}
