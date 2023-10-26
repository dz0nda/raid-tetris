import { DatabaseModule } from '@/modules/database/database.module';

import { SocketService } from './socket.service';
import { SocketController } from './socket.controller';
import { HttpModule } from '../http/http.module';
import { SocketRepository } from './socket.repository';

export class SocketModule {
  public readonly service: SocketService;
  public readonly controller: SocketController;

  constructor(dbModule: DatabaseModule, httpModule: HttpModule) {
    const socketRepository = new SocketRepository(dbModule.service);
    this.service = new SocketService(socketRepository, httpModule.service);
    this.controller = new SocketController(this.service);
  }
}
