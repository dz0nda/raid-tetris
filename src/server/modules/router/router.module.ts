import { SocketService } from '@/modules/socket/socket.service';

import { RouterService } from './router.service';
import { UserService } from '../user/user.service';

/**
 * RouterModule that initializes the RouterService.
 */
export class RouterModule {
  private readonly serviceInstance: RouterService;

  /**
   * Initializes a new instance of the RouterService class.
   *
   * @param socketService The socket service instance.
   */
  constructor(socketService: SocketService, userService: UserService) {
    this.serviceInstance = new RouterService(socketService, userService);
  }

  /**
   * Provides the RouterService instance.
   *
   * @returns The RouterService instance.
   */
  get service(): RouterService {
    return this.serviceInstance;
  }
}
