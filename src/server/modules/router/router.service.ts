import { Socket as SocketIo, Server as SocketIoServer } from 'socket.io';

import { Route } from '@/modules/utils/types';
import { Logger } from '@/modules/utils/utils';
import { Socket } from '@/modules/socket/socket.entity';

export class RouterService {
  private routes: Route[] = [];

  constructor(private io: SocketIoServer) {}

  public addRoutes(routes: Route[]): void {
    this.routes = [...this.routes, ...routes];
  }

  /**
   * Routes socket requests.
   *
   * @param socketIo - The individual socket instance.
   */
  public routeRequests(socket: SocketIo): void {
    const wrappedSocket = new Socket(socket, this.io);

    this.routes.forEach((route) => {
      const { event, handler, schema } = route;

      wrappedSocket.value().on(event.req, (data: any, callback: any) => {
        Logger.info(`Socket ${wrappedSocket.getSocketId} sending: ${event.req}`);
        try {
          if (schema && schema.validate(data).error) {
            throw new Error(`Invalid arguments: ${JSON.stringify(data)} -> ${schema.validate(data).error}`);
          } else {
            handler({ socket: wrappedSocket, data }, { io: this.io, callback });
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
