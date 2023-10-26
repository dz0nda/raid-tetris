import { Request, Route } from '@/server/modules/utils/types';

import { SocketService } from './socket.service';

export class SocketController {
  private readonly service: SocketService;
  private readonly routes: Route[];

  /**
   * Initializes the SocketController with the provided SocketService.
   *
   * @param service - The SocketService instance responsible for handling socket events.
   */
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

  /**
   * Provides access to the routes defined in the controller.
   *
   * @returns An array of Route objects associated with the socket events.
   */
  get getRoutes(): Route[] {
    return this.routes;
  }

  /**
   * Handles the 'connect' event.
   *
   * @param req - The incoming socket request.
   */
  private async connect(req: Request<unknown>): Promise<void> {
    this.service.connect(req.socket);
  }

  /**
   * Handles the 'disconnecting' event.
   *
   * @param req - The incoming socket request.
   */
  private async disconnecting(req: Request<unknown>): Promise<void> {
    this.service.disconnecting(req.socket.raw);
  }

  /**
   * Handles the 'disconnect' event.
   *
   * @param req - The incoming socket request.
   */
  private async disconnect(req: Request<unknown>): Promise<void> {
    this.service.disconnect(req.socket.raw);
  }
}
