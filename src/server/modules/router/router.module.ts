import { SocketModule } from '@/modules/socket/socket.module';
import { Route } from '@/server/modules/utils/types';

import { RouterService } from './router.service';

export class RouterModule {
  private serviceInstance: RouterService;

  constructor(socketModule: SocketModule) {
    this.serviceInstance = new RouterService(socketModule.service.io);
  }

  public addRoutes(routes: Route[]): void {
    this.service.addRoutes(routes);
  }

  /**
   * Provides the DatabaseService instance.
   * @returns The DatabaseService instance.
   */
  get service(): RouterService {
    return this.serviceInstance;
  }
}
