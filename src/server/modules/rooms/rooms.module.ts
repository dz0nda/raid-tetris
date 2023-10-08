import { SocketService } from '@/server/modules/socket/socket.service';

import { RoomsService } from './rooms.service';
import { RoomsController } from './rooms.controller';

export class RoomsModule {
  public service: RoomsService;
  public controller: RoomsController;

  constructor(socket: SocketService) {
    this.service = new RoomsService();
    this.controller = new RoomsController(this.service, socket);
  }
}
