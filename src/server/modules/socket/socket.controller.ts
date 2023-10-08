import { SocketService } from './socket.service';

import { Route } from '@/server/modules/utils/types';

export class SocketController {
  defaultRoutes: Route[];

  constructor(service: SocketService) {
    this.defaultRoutes = [
      {
        event: { req: 'connect' },
        handler: service.connect.bind(this),
      },
      {
        event: { req: 'disconnecting' },
        handler: service.disconnecting.bind(this),
      },
      {
        event: { req: 'disconnect' },
        handler: service.disconnect.bind(this),
      },
    ];
  }

  get getRoutes() {
    return this.defaultRoutes;
  }
}
