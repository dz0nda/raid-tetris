import { DatabaseService } from '@/modules/database/database.service';
import Game from './game.entity';

export class GameService {
  constructor(private dbService: DatabaseService) {}

  /**
   * Initializes a new game.
   *
   * @returns The initialized game instance.
   */
  initNewGame(): Game {
    return new Game();
  }

  /**
   * Save the current game state to the database.
   *
   * @param gameId - The ID of the game.
   * @param game - The game instance.
   */
  async saveGameState(gameId: string, game: Game): Promise<void> {
    await this.dbService.set('game', gameId, game);
  }

  /**
   * Fetches a game by its ID.
   *
   * @param gameId - The ID of the game.
   * @returns The game if found, otherwise null.
   */
  async getGame(gameId: string): Promise<Game | null> {
    return this.dbService.get<Game>('game', gameId);
  }

  // Add other game-related methods here...
}
