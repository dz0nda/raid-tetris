import { SocketService } from '@/server/modules/socket/socket.service';

import { GameRepository } from './game.repository';
import { GameService } from './game.service';
import { GameController } from './game.controller';
import { DatabaseModule } from '../database/database.module';

export class GameModule {
  public service: GameService;
  public controller: GameController;

  constructor(socket: SocketService) {
    const dbService = DatabaseModule.getInstance().service;
    const gameRepository = new GameRepository(dbService);
    this.service = new GameService(gameRepository);
    this.controller = new GameController(this.service, socket);
  }
}
