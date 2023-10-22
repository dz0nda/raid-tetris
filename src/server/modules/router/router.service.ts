import { Socket as SocketIo } from 'socket.io';

import { Route } from '@/modules/utils/types';
import { Logger } from '@/modules/utils/utils';
import { Socket } from '@/modules/socket/socket.entity';
import { SocketService } from '../socket/socket.service';

export class RouterService {
  private routes: Route[] = [];

  constructor(private readonly socketService: SocketService, routes: Route[] = []) {
    this.addRoutes(routes);
    this.setupSocketRouting();
  }

  public addRoutes(routes: Route[]): void {
    this.routes = [...this.routes, ...routes];
  }

  private setupSocketRouting(): void {
    this.socketService.ioOn((socket: SocketIo) => {
      this.socketService.connect(socket);
      this.routeRequests(socket);
    });
  }

  /**
   * Routes socket requests.
   *
   * @param socketIo - The individual socket instance.
   */
  public routeRequests(socket: SocketIo): void {
    const wrappedSocket = new Socket(socket, this.socketService.io);

    this.routes.forEach((route) => {
      const { event, handler, schema } = route;

      wrappedSocket.value().on(event.req, (data: any, callback: any) => {
        Logger.info(`Socket ${wrappedSocket.getSocketId} sending: ${event.req}`);
        try {
          if (schema && schema.validate(data).error) {
            throw new Error(`Invalid arguments: ${JSON.stringify(data)} -> ${schema.validate(data).error}`);
          } else {
            handler({ socket: wrappedSocket, data }, { io: this.socketService.io, callback });
          }
        } catch (err) {
          Logger.error(`[${event}] Error: ${err}`);
          // wrappedSocket.emitToSocket(wrappedSocket.getSocketId, event.res, {
          //   status: 500,
          //   message: err,
          // });
        }
      });
    });
  }
}
