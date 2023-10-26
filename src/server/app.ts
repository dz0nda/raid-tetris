import 'reflect-metadata';

import { Logger } from './modules/utils/utils';

import { AuthModule } from './modules/auth/auth.modules';
import { RouterModule } from './modules/router/router.module';
import { AppContext } from './modules/app/app.context';
import { UserModule } from './modules/user/user.module';
import { RoomModule } from './modules/room/room.module';
import { GameService } from './modules/game/game.service';

/**
 * RedTetris class represents the core application layer, responsible for
 * managing and initializing primary application services and modules.
 */
export class RedTetris {
  private readonly app = AppContext.getInstance();

  private readonly router: RouterModule;
  private readonly rooms: RoomModule;
  // private readonly games: GameModule;
  // private readonly chats: ChatModule;
  private readonly auth: AuthModule;

  /**
   * Initializes and sets up the core services and modules of the RedTetris application.
   */
  constructor() {
    const userModule = new UserModule(this.app.db.service, this.app.socket.service);

    // Initialize and set up various modules
    // this.chats = new ChatModule(this.app.socket.service);
    // this.games = new GameModule(this.app.socket.service);
    this.auth = new AuthModule(this.app.socket.service, userModule.service);
    this.rooms = new RoomModule(this.app.db.service, this.app.socket.service, this.auth.service, {} as GameService);

    // Setup routes for all initialized modules
    this.router = new RouterModule(this.app.socket.service, userModule.service);
    this.router.service.addRoutes([
      ...this.app.socket.controller.getRoutes,
      ...this.rooms.controller.getRoutes,
      // ...this.chats.controller.getRoutes,
      ...this.auth.controller.routes,
    ]);
    this.router.service.routeRequests();
  }

  /**
   * Starts the RedTetris application on a specific host and port.
   *
   * @param host - The host address.
   * @param port - The port number.
   */
  public listen(host: string, port: number): void {
    this.app.http.service.listen(host, port);
  }

  /**
   * Gracefully closes the RedTetris application and all its services.
   */
  public close(): void {
    this.app.http.service.close();
  }

  /**
   * Executes cleanup routines, closing active connections and resources,
   * before terminating the application.
   */
  public cleanup(): void {
    Logger.info('Cleaning up resources...');

    // Close the Redis connection
    this.app.db.redis.quit();

    // Close the socket.io connection
    this.close();

    Logger.info('Cleanup complete. Exiting.');
    process.exit(0);
  }
}
