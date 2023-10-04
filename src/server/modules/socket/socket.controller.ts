import { SocketService } from './socket.service';

import { Route } from '@/server/modules/utils/types';

export class SocketController {
  defaultRoutes: Route[];

  constructor(service: SocketService) {
    this.defaultRoutes = [
      {
        event: 'connect',
        handler: service.connect.bind(this),
      },
      {
        event: 'disconnecting',
        handler: service.disconnecting.bind(this),
      },
      {
        event: 'disconnect',
        handler: service.disconnect.bind(this),
      },
    ];
  }

  public getDefaultsRoutes() {
    return this.defaultRoutes;
  }
}
