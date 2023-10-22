import { SocketService } from '@/server/modules/socket/socket.service';

import { DatabaseModule } from '../database/database.module';

import { RoomService } from './room.service';
import { RoomController } from './room.controller';

export class RoomModule {
  public service: RoomService;
  public controller: RoomController;

  constructor(socket: SocketService) {
    const dbModule = DatabaseModule.getInstance();
    this.service = new RoomService(dbModule.service);
    this.controller = new RoomController(this.service, socket);
  }
}
