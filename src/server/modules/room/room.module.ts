import { SocketService } from '@/server/modules/socket/socket.service';

import { DatabaseService } from '@/modules/database/database.service';
import { AuthService } from '@/modules/auth/auth.service';
import { GameService } from '@/modules/game/game.service';

import { RoomRepository } from './room.repository';
import { RoomController } from './room.controller';
import { RoomService } from './room.service';

export class RoomModule {
  public readonly service: RoomService;
  public readonly controller: RoomController;

  constructor(dbService: DatabaseService, socket: SocketService, authService: AuthService, gameService: GameService) {
    const roomRepository = new RoomRepository(dbService);
    this.service = new RoomService(roomRepository, gameService);
    this.controller = new RoomController(this.service, socket, authService);
  }
}
