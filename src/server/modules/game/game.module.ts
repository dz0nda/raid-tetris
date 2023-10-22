import { SocketService } from '@/server/modules/socket/socket.service';
import { DatabaseModule } from '../database/database.module';
import { GameService } from './game.service';
// import { GameController } from './game.controller'; // Uncomment if you have a GameController

export class GameModule {
  public service: GameService;
  // public controller: GameController; // Uncomment if you have a GameController

  constructor(socket: SocketService) {
    const dbModule = DatabaseModule.getInstance();
    this.service = new GameService(dbModule.service);
    // this.controller = new GameController(this.service, socket); // Uncomment if you have a GameController
  }
}
