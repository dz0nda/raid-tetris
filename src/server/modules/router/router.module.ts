import { SocketModule } from '@/modules/socket/socket.module';

import { RouterService } from './router.service';

export class RouterModule {
  private serviceInstance: RouterService;

  constructor(socketModule: SocketModule) {
    this.serviceInstance = new RouterService(socketModule.service);
  }

  /**
   * Provides the RouterService instance.
   * @returns The RouterService instance.
   */
  get service(): RouterService {
    return this.serviceInstance;
  }
}
