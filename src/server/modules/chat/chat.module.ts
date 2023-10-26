import { DatabaseModule } from '@/modules/database/database.module';
import { SocketService } from '@/modules/socket/socket.service';

import { ChatService } from './chat.service';
import { ChatsController } from './chat.controller';

/**
 * The ChatModule encapsulates the service and controller for chats.
 */
export class ChatModule {
  public service: ChatService;
  public controller: ChatsController;

  /**
   * Creates an instance of the ChatModule.
   *
   * @param socket - The socket service instance.
   */
  constructor(socket: SocketService) {
    this.service = new ChatService(DatabaseModule.getInstance().service);
    this.controller = new ChatsController(this.service, socket);
  }
}
