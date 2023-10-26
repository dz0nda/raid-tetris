import { Route } from '@/modules/utils/types';
import { Logger } from '@/modules/utils/utils';
import { SocketService } from '../socket/socket.service';
import { Socket } from '../socket/socket.helper';
import events from '@/shared/events';
import { Event } from 'socket.io';
import { UserService } from '../user/user.service';

export class RouterService {
  private routes: Route[];

  constructor(private readonly socketService: SocketService, private readonly userService: UserService) {
    this.routes = [];
  }

  /**
   * Adds routes to the router.
   *
   * @param routes - The routes to add.
   */
  public addRoutes(routes: Route[]): void {
    this.routes = [...this.routes, ...routes];
  }

  /**
   * Defines the logic for socket authentication.
   *
   * @returns - The middleware function for socket authentication.
   */
  public socketAuthenticationMiddleware(socket: Socket): (socket: Event, next: (err?: any) => void) => void {
    return async ([event, ...args], next) => {
      const userId = socket.raw.request.session?.user?.id;
      console.log(args);

      // Allow unauthenticated login requests.
      if (!userId && event === events.REQUEST_LOGIN) {
        return next();
      }

      if (!userId) {
        return next(new Error('User not authenticated'));
      }

      const user = await this.userService.getUserById(userId);
      if (!user) {
        return next(new Error('User not found'));
      }

      socket.raw.data.user = user;

      next();
    };
  }

  /**
   * Routes socket requests.
   *
   * @param socketIo - The individual socket instance.
   */
  public routeRequests(): void {
    this.socketService.ioOn((socketIo) => {
      const socket = new Socket(socketIo);
      this.socketService.connect(socket);

      socketIo.use(this.socketAuthenticationMiddleware(socket));

      this.routes.forEach((route) => {
        const { auth, event, handler, schema } = route;

        socketIo.on(event.req, async (data: any, callback: any) => {
          Logger.info(`Socket ${socket.id} sending: ${event.req}`);

          try {
            Logger.info(`FIRING: ${event.req}`);

            // if (schema && schema.validate(data).error) {
            //   throw new Error(`Invalid arguments: ${JSON.stringify(data)} -> ${schema.validate(data).error}`);
            // }

            await handler({ socket, data, user: socket.raw.data.user }, { io: this.socketService.io, callback });
          } catch (err) {
            Logger.error(`[${event.req}] Error: ${err}`);

            this.socketService.emitToSocket(socket.id, event.res || events.REQUEST_UPDATE_PLAYER, {
              status: 500,
              payload: null,
              message: err,
            });
          }
        });
      });
    });
  }
}
