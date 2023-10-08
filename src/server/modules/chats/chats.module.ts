import { SocketService } from '@/server/modules/socket/socket.service';

import { ChatsService } from './chats.service';
import { ChatsController } from './chats.controller';

export class ChatsModule {
  public service: ChatsService;
  public controller: ChatsController;

  constructor(socket: SocketService) {
    this.service = new ChatsService();
    this.controller = new ChatsController(this.service, socket);
  }
}
