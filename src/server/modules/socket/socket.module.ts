import { DatabaseModule } from '@/modules/database/database.module';

import { SocketService } from './socket.service';
import { SocketController } from './socket.controller';
import { HttpModule } from '../http/http.module';

export class SocketModule {
  private static instance: SocketModule;
  // private static host: string;
  // private static port: number;
  private readonly serviceInstance: SocketService;
  public readonly controller: SocketController;

  private constructor() {
    const dbModule = DatabaseModule.getInstance();
    const httpModule = HttpModule.getInstance();
    this.serviceInstance = new SocketService(dbModule.service, httpModule.service);
    this.controller = new SocketController(this.service);
  }

  /**
   * Provides a singleton instance of the SocketModule.
   * @returns The singleton instance of SocketModule.
   */
  public static getInstance(): SocketModule {
    if (!SocketModule.instance) {
      SocketModule.instance = new SocketModule();
    }
    return SocketModule.instance;
  }

  /**
   * Provides the SocketService instance.
   * @returns The SocketService instance.
   */
  get service(): SocketService {
    return this.serviceInstance;
  }
}
