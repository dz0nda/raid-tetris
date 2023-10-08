import { RoomsService } from '../rooms/rooms.service';
import { ChatsService } from '../chats/chats.service';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';

export class AuthModule {
  public service: AuthService;
  public controller: AuthController;

  constructor(roomsService: RoomsService, chatsService: ChatsService) {
    this.service = new AuthService(roomsService, chatsService);
    this.controller = new AuthController(this.service, roomsService, chatsService);
  }
}
