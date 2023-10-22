import 'reflect-metadata';

import { Route } from '@/server/modules/utils/types';
import { Logger } from './modules/utils/utils';

import { SocketModule } from './modules/socket/socket.module';

import { AuthModule } from './modules/auth/auth.modules';
import { ChatsModule } from './modules/chats/chats.module';
import { RoomModule } from './modules/room/room.module';
import { DatabaseModule } from './modules/database/database.module';
import { RouterModule } from './modules/router/router.module';
import { HttpModule } from './modules/http/http.module';

/**
 * The RedTetris class is responsible for initializing and managing the main application modules.
 */
export class RedTetris {
  private http!: HttpModule;
  private socket!: SocketModule;
  private router!: RouterModule;
  private rooms!: RoomModule;
  private chats!: ChatsModule;
  private auth!: AuthModule;
  private db!: DatabaseModule;
  private routes!: Route[];

  /**
   * Initializes the RedTetris application.
   *
   * @param host - The host address.
   * @param port - The port number.
   */
  constructor() {
    this.http = HttpModule.getInstance();
    this.db = DatabaseModule.getInstance();
    this.db.redis.on('error', (error) => {
      Logger.error(`Redis connection error: ${error}`);
      this.cleanup();
    });
    // SocketModule.initialize(host, port);
    this.socket = SocketModule.getInstance();

    this.chats = new ChatsModule(this.socket.service);
    this.rooms = new RoomModule(this.socket.service);
    this.auth = new AuthModule();

    this.router = new RouterModule(this.socket);
    this.router.service.addRoutes([
      ...this.socket.controller.getRoutes,
      ...this.rooms.controller.getRoutes,
      ...this.chats.controller.getRoutes,
      ...this.auth.controller.getRoutes,
    ]);
  }

  /**
   * Starts the application.
   */
  public listen(host: string, port: number): void {
    this.http.service.listen(host, port);
  }

  /**
   * Closes the application.
   */
  public close(): void {
    this.http.service.close();
  }

  /**
   * Cleans up resources and exits the application.
   */
  public cleanup(): void {
    Logger.info('Cleaning up resources...');

    // Close the Redis connection
    this.db.redis.quit();

    // Close the socket.io connection
    this.close();

    Logger.info('Cleanup complete. Exiting.');
    process.exit(0);
  }
}
